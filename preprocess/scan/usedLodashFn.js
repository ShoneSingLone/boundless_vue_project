const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");
const pathD = _n.getPathD(__dirname);

const targetDir = pathD(`../../static_vue2`);

const record = {};
const usedFile = new Set();

async function scanFile(fileurl) {
	const content = await fs.promises.readFile(fileurl, "utf-8");
	let reg = /_\.([^)|^(|^)|^\.|^\s|^=|^,]*)\(/g;
	let execResult;
	while ((execResult = reg.exec(content))) {
		let [, fnName] = execResult;
		record[fnName] = record[fnName] || { count: 0, files: new Set() };
		record[fnName].count++;
		record[fnName].files.add(fileurl);
		if (path.extname(fileurl) !== ".vue") usedFile.add(fileurl);
	}
}

// scanFile(`D:/Users/SSL/Documents/ghca_code/m2o/static_vue2/business_doc/entry.vue`);

(async () => {
	const [, files] = await _n.asyncAllDirAndFile([targetDir]);
	let file;
	while ((file = files.pop())) {
		if (
			[
				"common.js",
				"echarts.min.js",
				"index.js",
				"jquery-3.7.0.min.js",
				"less.js",
				"lodash.js"
			].includes(path.basename(file))
		) {
			continue;
		}

		if ([`.js`, ".vue", ".ts"].includes(path.extname(file))) {
			await scanFile(file);
		}
	}

	Array.from(usedFile).map(name => {
		console.log(path.basename(name));
	});

	await fs.promises.writeFile(
		`./usedLodashFn.json`,
		JSON.stringify(
			_n.filter(
				_n.sortBy(
					_n.map(record, ({ count, files }, prop) => {
						return { prop, count, files: Array.from(files) };
					}),
					["count"]
				),
				({ prop }) => !/^\$/.test(prop)
			),
			null,
			2
		)
	);
})();
