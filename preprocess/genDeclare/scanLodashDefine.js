const { fs, path, VueLoader, _n } = require("../preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");

const Identifier = {};
const files = {
	1: "static_vue2/common/libs/common.ts",
	2: "static_vue2/common/libs/seed.js"
};

const vars = {};
function getPropertyNameName(left, prefix = "") {
	const object = left.object.name;
	if (object !== "_") {
		return;
	}
	const property = left.property.name;
	const _prefix = [object, property, prefix].filter(i => !!i).join(".");
	if (object && property) {
		if (prefix) {
			/* 如果是嵌套的，则手工添加 */
			console.log("如果是嵌套的，则手工添加", _prefix);
			return;
		}
		return _prefix;
	} else {
		if (left.object.type === "MemberExpression") {
			return getPropertyNameName(left.object, _prefix);
		}
	}
}

function removeSpacesAsterisksAndNewlines(inputString) {
	const cleanedString = inputString.replace(/[\s*\r\n]/g, "");
	return cleanedString;
}

module.exports = async function () {
	try {
		await Promise.all(
			_n.map(files, (filePath, fileProp) => {
				return onlyHandleJs(filePath, fileProp);
			})
		);
		console.log("🚀:", "Identifier", JSON.stringify(Object.keys(Identifier), null, 2));
	} catch (error) {
		console.error(error);
	} finally {
		const dTsPath = path.resolve(__dirname, "../../d.ts/types/lodash/custom.by_scan.d.ts");
		await _n.asyncWriteFile(
			dTsPath,
			`import _ = require("./index");
			declare module "./index" {
				interface LoDashStatic {${_n
				.map(vars, (val, prop) => {
					const desc = val[3];
					val[3] = "";
					val.pop();
					return desc || `${prop}:any`;
				})
				.join(";\r\n")}
            }
        }`
		);
		const definitionPath = path.resolve(__dirname, "../../preprocess/vscode.definitions/scanLodashDefine.js");
		await _n.asyncWriteFile(
			definitionPath,
			`module.exports = ${JSON.stringify(
				{
					vars,
					files
				},
				null,
				2
			)};`
		);
	}
};

async function onlyHandleJs(filePath, fileProp) {
	const apiFilePath = path.resolve(__dirname, `../..`, filePath);
	const sourceCode = await fs.promises.readFile(apiFilePath, "utf8");

	const ast = parser.parse(sourceCode, {
		// 指定代码类型，可以是 'script' 或 'module'
		sourceType: "script"
	});

	function handleDefinition(NodePath) {
		/* 说明是_.开头的,立马收集 */
		const {
			node: {
				loc: {
					start: { line, column }
				}
			}
		} = NodePath;

		return [fileProp, line, column];
	}

	function FunctionDeclaration(NodePath) {
		try {
			// 获取函数名称
			const functionName = NodePath.node.id.name;
			const {
				node: {
					loc: {
						start: { line, column }
					}
				}
			} = NodePath;
			const prop = functionName.replace("_.", "");
			// if (prop === "$$tags") debugger;
			Identifier[prop] = [fileProp, line, column, `${prop}: any`];

			const comments = (function () {
				let { trailingComments, leadingComments } = NodePath.node || {};
				return trailingComments || leadingComments || [];
			})();

			const [desc, type] = comments.map(comment => comment.value);
			if (String(type).includes("@typescriptDeclare")) {
				Identifier[functionName][3] = `/*${desc}*/\r\n${functionName}: ${type.replace("@typescriptDeclare", "")}`;
			}
		} catch (error) {
			console.error(error);
			debugger;
		}
	}

	function AssignmentExpression(NodePath) {
		const { node } = NodePath;
		const { left, right } = node;
		if (left.type === "MemberExpression") {
			const functionName = getPropertyNameName(left);
			if (!functionName || right.type === "CallExpression") {
				return;
			}
			const prop = functionName.substring(2);

			vars[prop] = handleDefinition(NodePath);

			if (["FunctionExpression", "ArrowFunctionExpression", "NewExpression", "ObjectExpression"].includes(right.type)) {
				const comments = NodePath.parent?.leadingComments;
				if (comments) {
					const [desc, type] = comments.map(comment => comment.value);
					if (String(type).includes("@typescriptDeclare")) {
						vars[prop][3] = `/*${desc}*/\r\n${prop}: ${type.replace("@typescriptDeclare", "")}`;
					}
				}
			} else if (right.name) {
				/* right.type === "Identifier" */
				console.log("right.name:", right.name);
				const def = Identifier[right.name];
				if (def) {
					vars[prop] = def;
				}
			} else {
				console.log("right.type", right.type);
			}
		} else {
			// console.log("left.type", left.type, left.name);
		}
	}

	traverse(ast, {
		FunctionDeclaration,
		AssignmentExpression
	});
}
