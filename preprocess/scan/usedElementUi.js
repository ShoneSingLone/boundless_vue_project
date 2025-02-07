const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");
const pathD = _n.getPathD(__dirname);

const targetDir = pathD(`../../static_vue2`);

const record = new Set();
const usedFile = new Set();

async function scanFile(fileurl) {
	const content = await fs.promises.readFile(fileurl, "utf-8");
	let reg = /[<|"]el[-]?(.*)\s*[^>]>?/gi;
	let execResult;
	let hasEle = false;
	while ((execResult = reg.exec(content))) {
		hasEle = true;
		let [full] = execResult;
		await fs.promises.appendFile(`./result.usedElementUI`, full + "\r", "utf-8");
	}
	hasEle &&
		(await fs.promises.appendFile(
			`./result.usedElementUI`,
			`\n\n\n=========>>>>>>>>>>>>>>>>>>>>>>${fileurl}\n\n\n=========>>>>>>>>>>>>>>>>>>>>>>\n\n\n`,
			"utf-8"
		));
}

// scanFile(`/Users/shone/workspace/m2o/static_vue2/common/ui-x/common/xItemSelect.vue`);
const main = async () => {
	const [, files] = await _n.asyncAllDirAndFile([targetDir]);
	let file;
	await fs.promises.writeFile(`./result.usedElementUI`, "");
	while ((file = files.pop())) {
		if ([".vue"].includes(path.extname(file))) {
			await scanFile(file);
		}
	}
};
main();
