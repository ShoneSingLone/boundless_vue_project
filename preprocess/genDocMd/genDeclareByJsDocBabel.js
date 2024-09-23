const { fs } = require("../../preprocess/preprocess.utils");
const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");

// 读取 JavaScript 文件内容
// const code = fs.readFileSync('./common.js', 'utf-8');
const code = fs.readFileSync("../../static_vue2/common/libs/common.js", "utf-8");
// 解析 JavaScript 代码为 AST
const ast = parser.parse(code, {
	sourceType: "script" // 指定代码类型，可以是 'script' 或 'module'
});

fs.writeFileSync("./ast.json", JSON.stringify(ast, null, 2));

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
			if (["FunctionExpression", "ArrowFunctionExpression"].includes(right.type)) {
				const functionName = right.id?.name || leftPropertyName;
				console.log("🚀 函数名称:", functionName);
				const parameters = right.params.map(param => param.name);
				console.log("参数列表:", parameters);
				const { leadingComments } = right;
				const leadingCommentText = leadingComments ? leadingComments.map(item => removeSpacesAsterisksAndNewlines(item.value)).join(",") : "";
				console.log("函数前的注释说明:", leadingCommentText);
				const innerComments = right.body.body?.[0]?.leadingComments;
				if (innerComments) {
					console.log(
						"函数内部的注释",
						innerComments.map(comment => comment.value)
					);
				}
			} else {
				console.log("right.type", right.type);
			}
		} else {
			console.log("left.type", left.type, left.name);
		}
	}
});
