const { path, _, _n, fs } = require("../preprocess.utils");
const axios = require("axios");

const pathD = _n.getPathD(__dirname);

const [APP_NAME] = process.argv.slice(2);

const { getI18NContent } = require("./i18n.utils");
const allI18n = getI18NContent(APP_NAME);
let needToTrans = {};

const sourceCodeDir = pathD(`../../static_vue2/business_${APP_NAME}`);
async function scanFile(fileurl) {
	if (String(fileurl).indexOf("codedemo") > -1) {
		return;
	}
	const content = await fs.promises.readFile(fileurl, "utf-8");

	/* "" */
	needToTrans = matchTarget(needToTrans, {
		content,
		fileurl,
		regTest: () => /i18n\("([^\(.]*?)"\)/g,
		regMatch: () => /i18n\("([^\(.]*?)"\)/
	});
	/* '' */
	needToTrans = matchTarget(needToTrans, {
		content,
		fileurl,
		regTest: () => /i18n\('([^\(.]*?)'\)/g,
		regMatch: () => /i18n\('([^\(.]*?)'\)/
	});
	/* `` */
	needToTrans = matchTarget(needToTrans, {
		content,
		fileurl,
		regTest: () => /i18n\(`([^\(.]*?)`\)/g,
		regMatch: () => /i18n\(`([^\(.]*?)`\)/
	});
}

(async () => {
	/* 	await scanFile(pathD(`./i18n.dev.test.js`));
		console.log('🚀:', '', JSON.stringify(needToTrans, null, 2));
		return;
	 */
	const [dirs, files] = await _n.asyncAllDirAndFile([
		pathD(`../../static_vue2/common`),
		sourceCodeDir
	]);
	let file;
	while ((file = files.pop())) {
		if ([`.js`, ".html", ".vue"].includes(path.extname(file))) {
			await scanFile(file);
		}
	}

	const targetCodeDir = pathD(`../../static_vue2/business_${APP_NAME}/i18n/unset.i18n.json`);
	let content = await Promise.all(
		_n.map(needToTrans, async (fileurl, prop) => {
			let item = {
				zhCn: prop,
				enUs: "unset_unset_unset_unset_unset_unset"
			};
			const res = await axios({
				url: "http://10.143.133.216:3001/api/i18n/get",
				method: "post",
				data: {
					key: prop
				}
			});
			if (res?.data?.data?.key) {
				item = res?.data?.data;
			}

			const keyvalString = (() => {
				try {
					let a = {};
					a[prop] = [item.zhCn, item.enUs];
					let b = JSON.stringify(a);
					return b.slice(1, b.length - 1);
				} catch (error) {
					return item.zhCn;
				}
			})();

			if (fileurl.length > 1) {
				return `/*\n${fileurl.join("\n")}\n*/\n${keyvalString},`;
			} else {
				return `\n${keyvalString},`;
			}
		})
	);

	content = content.join("\n");

	await fs.promises.writeFile(targetCodeDir, `{${content}}`);
})();

function matchTarget(_needToTrans = {}, { content, fileurl, regTest, regMatch }) {
	let allMatched = String(content).match(regTest());
	//   console.log(allMatched);
	_n.each(allMatched, matched => {
		const [_, prop] = String(matched).match(regMatch());
		// console.log(_, prop);
		const _has = allI18n[prop];
		if (!_has || _n.some(_has, prop => !prop)) {
			if (_needToTrans[prop]?.length > 0) {
				_needToTrans[prop] = [..._needToTrans[prop], fileurl];
			} else {
				_needToTrans[prop] = [fileurl];
			}
		}
	});
	return _needToTrans;
}
