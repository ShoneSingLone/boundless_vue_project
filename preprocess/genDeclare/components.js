const { fs, path, _, _n } = require("../preprocess.utils");

module.exports = async function () {
	const target = {};
	const [, files] = await _n.asyncAllDirAndFile([path.resolve(__dirname, "../../static_vue2")]);
	console.log(files.length);
	_n.each(files, async i => {
		if (path.extname(i) === ".vue") {
			const basename = path.basename(i).replace(".vue", "");
			target[basename] = target[basename] || [];
			const [, uri] = i.split("static_vue2");
			target[basename].push(`static_vue2${uri}`);
		}
	});
	await _n.asyncWriteFile(
		path.resolve(__dirname, "../../preprocess/vscode.definitions/components.js"),
		`
    module.exports = ${JSON.stringify(target, null, 4)};
`
	);
};
