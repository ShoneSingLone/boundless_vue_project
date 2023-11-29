/* https://obfuscator.io/ */
var JavaScriptObfuscator = require("javascript-obfuscator");
var fs = require("fs");
var path = require("path");
var target = "common";

var filePath = name => path.resolve(__dirname, `../../static_vue2/common/libs/${name}.js`);

var obfuscationResult = JavaScriptObfuscator.obfuscate(fs.readFileSync(filePath(target), "utf-8"), {
	/* 参数compact来完成对代码的压缩，默认为true */
	compact: true,
	// controlFlowFlattening: true,
	// controlFlowFlatteningThreshold: 1,
	/* 对字符串进行Unicode编码，使之更难辨认 */
	// unicodeEscapeSequence: true,
	/* 参数identifierNamesGenerator来完成对代码的变量名混淆，identifierNamesGenerator有三个参数，分别为mangled(简写字符，如a、b、c、d等)和默认的hexadecimal(十六进制)，以mangled为例 */
	identifierNamesGenerator: "mangled"
	// numbersToExpressions: true,
	/* 通过简化启用额外的代码混淆。 */
	// simplify: true,
	// stringArrayShuffle: true,
	/* 将文字字符串拆分为具有splitStringsChunkLength选项值长度的块。 */
	// splitStrings: true,
	// stringArrayThreshold: 1
});

fs.writeFileSync(filePath(target + ".min"), obfuscationResult.getObfuscatedCode(), "utf-8");
