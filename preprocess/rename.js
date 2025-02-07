const { _n } = require("@ventose/utils-node");
const path = require("path");
const asyncFs = require("fs").promises;

async function main(params) {
	const [dir, files] = await _n.asyncAllDirAndFile([
		path.resolve(__dirname, "../static_vue2/common")
	]);

	_n.each(files, async i => {
		if (path.extname(i) === ".vue") {
			const name = path.basename(i);
			// console.log(name);
			if (/^x/.test(name) && /(.*).vue$/.test(name)) {
				console.log(i, i.replace("x", "x"));
				await asyncFs.rename(i, i.replace("x", "x"));
			}
		}
	});
}

main();
