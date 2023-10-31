const fs = require("fs");
const path = require("path");

(async function () {
	const rootPath = path.resolve(__dirname, `..`);
	const componentDirPath = path.resolve(
		rootPath,
		"static_vue2/common/libs/highlightstyles"
	);
	const componentDirArray = await fs.promises.readdir(componentDirPath);
	/* 以x开头，以.vue结尾 */
	const cssArray = componentDirArray
		.filter(name => /(.*).css$/.test(name))
		.map(name => String(name).match(/(.*).css/)[1]);

	const targetLessFile = path.resolve(rootPath, "highlightCss.less");
	const targetCssOptionns = path.resolve(rootPath, "highlightCssOptions.text");
	console.log(
		"🚀:",
		"components",
		JSON.stringify(cssArray, null, 2),
		targetLessFile
	);

	await fs.promises.writeFile(targetLessFile, "", "utf-8");
	await fs.promises.writeFile(targetCssOptionns, "", "utf-8");

	for await (const cssName of cssArray) {
		const targetContent_Old = await fs.promises.readFile(
			path.resolve(componentDirPath, cssName + ".css"),
			"utf-8"
		);
		const targetContent_New = `.${cssName} {
            ${targetContent_Old}
        }`;
		await fs.promises.appendFile(targetCssOptionns, `${cssName}\n`, "utf-8");
		await fs.promises.appendFile(targetLessFile, targetContent_New, "utf-8");
	}
})();
