const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");
const pathD = _n.getPathD(__dirname);

const targetDir = pathD(`../../static_vue2`);

const record = new Set();
const usedFile = new Set();

async function scanFile(fileurl) {
	const content = await fs.promises.readFile(fileurl, "utf-8");
	let reg = /[<|"]el[-]?(.*)\s*[^>]>?/ig;
	let execResult;
	while ((execResult = reg.exec(content))) {
		let [full] = execResult;
		record.add((full).split(/\s/)[0])
	}
}

// scanFile(`/Users/shone/workspace/m2o/static_vue2/common/ui-x/common/xItemSelect.vue`);
const main = async () => {
	const [, files] = await _n.asyncAllDirAndFile([targetDir]);
	let file;
	while ((file = files.pop())) {
		if ([".vue"].includes(path.extname(file))) {
			await scanFile(file);
		}
	}


	await fs.promises.writeFile(
		`./usedElementUI.json`,
		JSON.stringify(
			Array.from(record),
			null,
			2
		)
	);
}
main();
