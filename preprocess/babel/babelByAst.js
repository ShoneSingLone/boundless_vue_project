const { fs, path, VueLoader, _n } = require("../preprocess.utils");
const babelCore = require("@babel/core");

const sourceFilePath = `static_vue2/common/ui-x/common/xItem.vue`;

(async function () {
	// 读取文件内容
	const SfcFilePath = path.resolve(__dirname, `../..`, sourceFilePath);
	const code = fs.readFileSync(SfcFilePath, "utf-8");
	const { scritpSourceCode, templateSourceCode, styleSourceCode } = VueLoader(code);
	const parsedAst = babelCore.parseSync(scritpSourceCode, {
		parserOpts: { allowReturnOutsideFunction: true }
	});
	const res = babelCore.transformFromAstSync(parsedAst, scritpSourceCode, {
		presets: ["@babel/preset-env"]
	});
	let templateBlock = "";
	if (templateSourceCode) {
		templateSourceCode = `
<template>
    ${templateSourceCode}
</template>
`;
	}
	if (styleSourceCode) {
		styleBlock = `
<style lang="less">
    ${styleSourceCode}
</style>
`;
	}
	const transformedContent = `
${templateBlock}
<script lang="ts">
${res.code}
</script>
${styleBlock}`;

	await _n.asyncWriteFile(
		path.resolve(__dirname, "../../babelFiles", sourceFilePath),
		transformedContent
	);
})();
