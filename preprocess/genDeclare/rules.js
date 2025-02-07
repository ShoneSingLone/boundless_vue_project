const { fs, path, VueLoader, _ } = require("../preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");
module.exports = async function () {
	let rulesDeclare = [];
	const apiFilePath = path.resolve(__dirname, `../../static_vue2/common/utils/rules.vue`);
	const code = fs.readFileSync(apiFilePath, "utf-8");
	const { scritpSourceCode } = VueLoader(code);

	const ast = parser.parse(scritpSourceCode, {
		sourceType: "module"
	});

	function getPropertyNameName(left, prefix = "") {
		const object = left.object.name;
		const property = left.property.name;
		const _prefix = [object, property, prefix].filter(i => !!i).join(".");
		if ("window._rules" === _prefix) {
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
				rulesDeclare = _.map(right.properties, propertie => {
					let comments = propertie.leadingComments;
					let rule_declare = `${propertie.key.name}(args?:any):object`;

					if (comments) {
						comments = comments.map(comment => comment.value);
						const desc = _.first(comments);
						const typeDefine = _.last(comments);
						if (desc) {
							rule_declare = `/*${desc}\n*/\n${rule_declare}`;
						}
						if (String(typeDefine).includes("@typescriptDeclare")) {
							rule_declare = `${propertie.key.name}:${String(typeDefine).replace("@typescriptDeclare", "")}`;
						}
						if (desc !== typeDefine) {
							rule_declare = `/*${desc}\n*/${rule_declare}`;
						}
					}
					return rule_declare;
				});
			} else {
				console.log("left.type", left.type, left.name);
			}
		}
	});

	await fs.promises.writeFile(
		path.resolve(__dirname, `../../d.ts/types/business/_rules/index.d.ts`),
		`export type t_rules = {
		${rulesDeclare.join("\r\n")}
	};`,
		"utf-8"
	);
};
