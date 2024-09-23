const { fs, path, VueLoader, _n } = require("../../preprocess/preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");


const METHOD_DECLARES = [];

function traverseAssignmentExpression(AssignmentExpressionNode) {
	if (AssignmentExpressionNode.node.left.type === 'MemberExpression') {
		if ("Vue" === AssignmentExpressionNode.node.left.object.name) {
			if ("_adminTools" === AssignmentExpressionNode.node.left.property.name) {

				handleProperties(AssignmentExpressionNode.container.expression.right.properties);

			}
		}
	}
}
function handleProperties(IdentifierNode) {
	IdentifierNode.forEach(item => {
		const functionName = item.key.name;
		const params = item.params.map(param => param.name).join(",");
		const comments = (function () {
			let { trailingComments, leadingComments } = item || {};
			return trailingComments || leadingComments || [];
		})();
		const [desc, type] = comments.map(comment => comment.value);
		let content = `/** ${params}\r\n${desc}*/\r\n${functionName}: any`;
		if (String(type).includes("@typescriptDeclare")) {
			content = `/** ${params}\r\n${desc}*/\r\n${functionName}: ${type.replace("@typescriptDeclare", "")}`;
		}
		console.log("🚀 ~ handleProperties ~ content:", content);
		METHOD_DECLARES.push(content);
	});
}
async function genDeclare(APP_NAME) {
	try {

		// 读取文件内容

		const apiFilePath = path.resolve(__dirname, `../../static_vue2/common/type_admin/use_admin/tools.vue`);
		const code = fs.readFileSync(apiFilePath, "utf-8");
		const { scritpSourceCode } = VueLoader(code);

		// 解析代码为 AST
		const ast = parser.parse(scritpSourceCode, {
			// 指定代码类型，可以是 'script' 或 'module'
			sourceType: "module"
		});

		fs.promises.writeFile(path.resolve(__dirname, "./ast.json"), JSON.stringify(ast, null, 2));

		traverse(ast, {
			AssignmentExpression: traverseAssignmentExpression
		});

		const adminConsoleDefinePath = path.resolve(__dirname, `../../d.ts/types/business/_AdminConsole/index.d.ts`);

		const adminConsoleDefineContent = `
export type t_adminTools = {
	${METHOD_DECLARES.join(";\r\n")}
};`;

		await _n.asyncWriteFile(adminConsoleDefinePath, adminConsoleDefineContent, "utf-8");

	} catch (error) {
		console.error(`🚀 ${APP_NAME} miss api`);
	}
}


module.exports = genDeclare;
