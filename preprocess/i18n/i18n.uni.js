const { path, _n, fs } = require("../preprocess.utils");
const json = require("../../static_vue2/business_internet_portal/i18n/all.i18n.js");

(async () => {
	let target = {};

	try {
		_n.each(json, (lang, langKey) => {
			const chineseCharRegex = /[\u4e00-\u9fa5]/g;
			const isChineseChar = chineseCharRegex.test(langKey);
			if (!isChineseChar) {
				target[langKey] = lang;
			}
		});

		const content = JSON.stringify(target, null, 4);
		const filepath = path.resolve(__dirname, "../../static_vue2/business_internet_portal/i18n/all.i18n.js");
		debugger;
		fs.writeFileSync(filepath, `module.exports = ${content}`);

	} catch (error) {
		console.error(error);
		console.error(`Error processing file ${file}:`, error.message);
	}

})();