const { fs, path, _n, APP_NAME_ARRAY } = require("../preprocess.utils");
async function removeDebugger(params) {
	const [, files] = await _n.asyncAllDirAndFile([
		path.resolve(__dirname, "../../static_vue2/business_yapi")
	]);
	_n.each(files, async i => {
		if (path.extname(i) === ".vue") {
			const content = fs.readFileSync(i, "utf-8");
			if (/debugger/.test(content)) {
				const newContent = content.replace(/debugger;?/g, "");
				fs.writeFileSync(i, newContent, "utf-8");
			}
		}
	});
}

APP_NAME_ARRAY.forEach(appName => {
	removeDebugger(appName);
});
