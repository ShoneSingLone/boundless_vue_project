const { fs, path, _n, APP_NAME_ARRAY } = require("../preprocess.utils");
const target_dir = process.argv[2];
async function removeDebugger(_target_dir) {
	const [, files] = await _n.asyncAllDirAndFile([
		path.resolve(__dirname, `../../static_vue2/business_${_target_dir}`)
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

/* 如果提供了目标目录，则只处理该目录；否则，遍历 APP_NAME_ARRAY 中的所有目录。 */
if (target_dir) {
	removeDebugger(target_dir);
} else {
	APP_NAME_ARRAY.forEach(removeDebugger);
}
