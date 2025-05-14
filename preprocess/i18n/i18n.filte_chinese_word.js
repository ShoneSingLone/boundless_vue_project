const { _n, fs, path } = require("../preprocess.utils");
const [APP_NAME] = process.argv.slice(2);

const { ALL_I18N_USED_IN } = require("./i18n.utils");
const allI18n = ALL_I18N_USED_IN(APP_NAME);

(async () => {
	let NEED_TO_TRANS = {};
	_n.each(allI18n, (value, prop) => {
		const chineseCharRegex = /[\u4e00-\u9fa5]/g;
		const isChineseChar = chineseCharRegex.test(prop);
		if (isChineseChar) {
			NEED_TO_TRANS[prop] = value;
		}
	});
	fs.writeFileSync(
		path.resolve(__dirname, "i18n.replace_zh_word_to_en/zhJSON.js"),
		`module.exports = ${JSON.stringify(NEED_TO_TRANS, null, 4)}`
	);
})();

