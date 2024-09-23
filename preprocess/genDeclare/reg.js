const { fs, path, VueLoader, _n } = require("../preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");
module.exports = async function () {
	let regDeclare = [];
	const regFilePath = path.resolve(__dirname, `../../static_vue2/common/utils/regexp.vue`);
	const code = fs.readFileSync(regFilePath, "utf-8");
	const { scritpSourceCode } = VueLoader(code);

	const ast = parser.parse(scritpSourceCode, {
		sourceType: "module"
	});

	function getPropertyNameName(left, prefix = "") {
		const object = left.object.name;
		const property = left.property.name;
		const _prefix = [object, property, prefix].filter(i => !!i).join(".");
		if ("window._reg" === _prefix) {
			return _prefix;
		} else {
			return "";
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
				regDeclare = _n.map(right.properties, propertie => {
					const comments = propertie.leadingComments;
					const dts = `${propertie.key.name}(args?:any):RegExp`;
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
		path.resolve(__dirname, `../../d.ts/types/business/_reg/index.d.ts`),
		`export type t_reg = {
		${regDeclare.join("\r\n")}
	};`,
		"utf-8"
	);
};
