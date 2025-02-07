const { fs, path, VueLoader, _n } = require("../../preprocess/preprocess.utils");
const babelCore = require("@babel/core");

const sourceFilePath = `static_vue2/common/ui-x/common/xItem.vue`;

(async function () {
	// 读取文件内容
	const SfcFilePath = path.resolve(__dirname, `../..`, sourceFilePath);
	const code = fs.readFileSync(SfcFilePath, "utf-8");
	const { scritpSourceCode, templateSourceCode, styleSourceCode } = VueLoader(code);
	const res = await babelCore.transformAsync(scritpSourceCode, { presets: ["ES2015"] });

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
