const fs = require("fs");
const path = require("path");

const target_dir = process.argv[2];

(async function () {
	const rootPath = path.resolve(__dirname, `../${target_dir}`);
	const componentDirPath = path.resolve(rootPath, "components/common");
	const componentDirArray = await fs.promises.readdir(componentDirPath);
	const components = componentDirArray
		/* 以x开头，以.vue结尾 */
		.filter(name => /^x/.test(name) && /(.*).vue$/.test(name))
		.map(name => String(name).match(/(.*).vue/)[1]);
	const _SPE = "/*由makeComponentList生成，不要修改*/";
	const targetFilePath = path.resolve(rootPath, "useXui.vue");
	console.log("🚀:", "components", JSON.stringify(components, null, 2), targetFilePath);
	let targetContent_Old = await fs.promises.readFile(targetFilePath, "utf-8");
	targetContent_Old = targetContent_Old.split(_SPE);
	targetContent_Old[1] = `const ALL_COMPONENTS = ${JSON.stringify(components)}; `;
	const targetContent_New = targetContent_Old.join(_SPE);

	await fs.promises.writeFile(targetFilePath, targetContent_New, "utf-8");
})();
