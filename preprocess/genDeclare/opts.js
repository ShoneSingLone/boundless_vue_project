const { fs, path, VueLoader, _n } = require("../preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");
async function genAppOpts(APP_NAME) {
	try {

		let propertyName,
			optsDeclare = [];

		// 读取文件内容
		const optsFilePath = path.resolve(__dirname, `../../static_vue2/business_${APP_NAME}/utils/opts.vue`);
		const code = fs.readFileSync(optsFilePath, "utf-8");
		const { scritpSourceCode } = VueLoader(code);

		// 解析代码为 AST
		const ast = parser.parse(scritpSourceCode, {
			sourceType: "module" // 指定代码类型，可以是 'script' 或 'module'
		});

		// fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 2));

		// 去除空格、* 号、\r、\n
		function removeSpacesAsterisksAndNewlines(inputString) {
			const cleanedString = inputString.replace(/[\s*\r\n]/g, "");
			return cleanedString;
		}

		function FunctionDeclaration(path) {
			try {
				// 获取函数名称
				const functionName = path.node.id.name;
				// 获取参数列表
				const parameters = path.node.params.map(param => param.name);
				// 获取函数前的注释说明
				const { leadingComments } = path.node;
				const leadingCommentText = leadingComments ? leadingComments.map(item => removeSpacesAsterisksAndNewlines(item.value)).join(",") : "";
				// 获取函数内部的注释
				const innerComments = path.node.body.body[0].leadingComments;
				console.log("Function Name:", functionName);
				console.log("Parameters:", parameters);
				console.log("Leading Comments:", leadingCommentText);
				if (innerComments) {
					console.log(
						"Inner Comments:",
						innerComments.map(comment => comment.value)
					);
				}
			} catch (error) {
				console.error(error);
				debugger;
			}
		}

		function getPropertyNameName(left, prefix = "") {
			const object = left.object.name;
			const property = left.property.name;
			const _prefix = [object, property, prefix].filter(i => !!i).join(".");
			if (object && property) {
				if (prefix && "window._opts" === [object, property].join(".")) {
					propertyName = prefix;
					return _prefix;
				} else {
					return "";
				}
			} else {
				if (left.object.type === "MemberExpression") {
					return getPropertyNameName(left.object, _prefix);
				}
			}
		}

		traverse(ast, {
			// FunctionDeclaration,
			AssignmentExpression(NodePath) {
				const { node } = NodePath;
				const { left, right } = node;
				if (left.type === "MemberExpression") {
					const leftPropertyName = getPropertyNameName(left);
					if (!leftPropertyName) {
						return;
					}

					optsDeclare = _n.map(right.properties, propertie => {
						const comments = propertie.leadingComments;
						const dts = `${propertie.key.name}:t_options[]`;
						if (comments) {
							const [desc] = comments.map(comment => comment.value);
							if (desc) {
								return `/*${desc}*/\r\n${dts}`;
							}
						}
						return dts;
					});
				} else {
					console.log("left.type", left.type, left.name);
				}
			}
		});
		await _n.asyncWriteFile(
			path.resolve(__dirname, `../../d.ts/types/business/_opts/${propertyName}.d.ts`),
			`type t_options = {
		label: string;
		value: any;
		[prop: string]: any;
	};
export type t_${propertyName} = {
${optsDeclare.join("\r\n")}
};`,
			"utf-8"
		);

		const dirs = await fs.promises.readdir(path.resolve(__dirname, `../../d.ts/types/business/_opts`));
		const alloptsFile = dirs.filter(dir => dir !== "index.d.ts").map(dir => dir.replace(".d.ts", ""));
		const importArray = alloptsFile.map(propertyName => {
			return `import {t_${propertyName}} from "./${propertyName}.d";`;
		});
		const declareArray = alloptsFile.map(propertyName => {
			return `${propertyName}:t_${propertyName};`;
		});

		await _n.asyncWriteFile(
			path.resolve(__dirname, `../../d.ts/types/business/_opts/index.d.ts`),
			`${importArray.join("\r\n")}\r\nexport type t_opts = {\r\n\t${declareArray.join("\r\n")}
};`
		);

	} catch (error) {
		console.error(`🚀 ${APP_NAME} miss opts`);
	}
};



module.exports = ({ APP_NAME, APP_NAME_ARRAY }) => {
	if (APP_NAME) {
		genAppOpts(APP_NAME);
	} else {
		APP_NAME_ARRAY.forEach(appName => {
			genAppOpts(appName);
		});
	}
};
