/* https://obfuscator.io/ */
var JavaScriptObfuscator = require("javascript-obfuscator");
var fs = require("fs");
var path = require("path");
var target = "seed";

function compression(params) {
	var filePath = name => path.resolve(__dirname, `../../static_vue2/common/libs/${name}.js`);

	var options = {
		/* 参数compact来完成对代码的压缩，默认为true */
		compact: true,
		/* 默认 false。设为 true，表示开启代码控制流展平，这是源代码的一种结构转换，使代码增大且变得难以理解。 */
		// controlFlowFlattening: false,
		/* 和 controlFlowFlattening配合，表示代码控制流展平的概率，此设置对于大代码影响较大，大量的控制流转换会减慢代码速度并增加代码大小。 */
		// controlFlowFlatteningThreshold: 1,
		/* 默认false。设为true，表示将添加随机废代码到被混淆代码中。 */
		/* deadCodeInjection:false, */
		/* 对字符串进行Unicode编码，使之更难辨认 */
		// unicodeEscapeSequence: true,
		/* 参数identifierNamesGenerator来完成对代码的变量名混淆，identifierNamesGenerator有三个参数，分别为mangled(简写字符，如a、b、c、d等)和默认的hexadecimal(十六进制) */
		// identifierNamesGenerator: "mangled"
		// numbersToExpressions: true,
		/* 通过简化启用额外的代码混淆。 */
		// simplify: true,
		/* 删除字符串文字并将其放置在特殊数组中。例如，var m=“Hello World”中的字符串“Hello World”，将被替换为var m=x12c456[0x1]； */
		/* stringArray */
		/* 使用 base64或 rc4对stringArray影响的所有字符串文本进行编码，并插入用于在运行时对其进行解码的特殊代码。 此选项会减慢脚本的速度。 */
		/* stringArrayEncoding:false, */
		// stringArrayShuffle: true,
		/* 将文字字符串拆分为具有splitStringsChunkLength选项值长度的块。 */
		// splitStrings: true,
		// stringArrayThreshold: 1
	};

	options= {
		compact: true,
		identifierNamesGenerator: 'mangled',
	}
	
	var obfuscationResult = JavaScriptObfuscator.obfuscate(fs.readFileSync(filePath(target), "utf-8"), options);

	fs.writeFileSync(filePath(target + ".min"), obfuscationResult.getObfuscatedCode(), "utf-8");
}

compression();
