const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");

const allI18n = require(`./i18n/aws_ecs/i18n`);
const pathD = _n.getPathD(__dirname);

const sourceCodeDir = pathD(`../src/static/aws_ecs`);
const needToTrans = {};
async function scanFile(fileurl) {
	if (String(fileurl).indexOf("codedemo") > -1) {
		return;
	}
	const content = await fs.promises.readFile(fileurl, "utf-8");
	const allMatched = String(content).match(/_\$t\("([^\(.]*?)"\)/g);
	//   console.log(allMatched);
	_n.each(allMatched, matched => {
		const [_, prop] = String(matched).match(/_\$t\("([^\(.]*?)"\)/);
		// console.log(_, prop);
		const _has = allI18n[prop];
		if (!_has || _n.some(_has, prop => !prop)) {
			if (needToTrans[prop]?.length > 0) {
				needToTrans[prop] = [...needToTrans[prop], fileurl];
			} else {
				needToTrans[prop] = [fileurl];
			}
		}
	});
}

/* scanFile( `` ); */

(async () => {
	const [dirs, files] = await _n.asyncAllDirAndFile([sourceCodeDir]);
	let file;
	while ((file = files.pop())) {
		if ([`.js`, ".html"].includes(path.extname(file))) {
			await scanFile(file);
		}
	}
	await fs.promises.writeFile(
		`./needToTrans_${Date.now()}_.json`,
		`{
  ${_n
		.map(needToTrans, (fileurl, prop) => {
			if (fileurl.length > 1) {
				return `/*\n${fileurl.join("\n")}\n*/\n"${prop}":["aaaaa","aaaaa"],`;
			} else {
				return `"${prop}":["aaaaa","aaaaa"],`;
			}
		})
		.join("\n")}
  }`
	);
})();
