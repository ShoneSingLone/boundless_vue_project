const { path, _, _n, fs } = require("../../preprocess.utils");
const { matchReg } = require("../i18n.utils");
const [APP_NAME] = process.argv.slice(2);

const zhJson = require("./zhJSON");
const enJson = require("./enJson");

const sourceCodeDir = path.resolve(__dirname, `../../../static_vue2/business_${APP_NAME}`);
const { ALL_I18N_CONTENT_IN, ALL_I18N_CONTENT_UPDATE } = require("../i18n.utils");
const allI18n = ALL_I18N_CONTENT_IN(APP_NAME);


// const sourceCodeDir = pathD(`../../static_vue2`);

(async () => {
	let [, files] = await _n.asyncAllDirAndFile([
		path.resolve(__dirname, "../../../static_vue2/common"),
		sourceCodeDir
	]);

	files = files.filter((file) => {
		return /\.(js|vue|html)$/.test(path.extname(file));
	});
	let file;
	while (files.length) {
		file = files.pop();
		if (file.includes("opts")) {
			continue;
		}
		console.log("🚀 ~ file:", file, files.length);
		let isNeedReplace = false;
		try {
			const content = fs.readFileSync(file, "utf-8");
			// 进行匹配和替换
			const replaceMatched = (match, manySuffix, quote, word) => {

				let may_zh_string_prop = word;

				const chineseCharRegex = /[\u4e00-\u9fa5]/g;
				/* 正则 匹配到中文字符，但是没有找到对应的 i18n 值，并且不是中文字符 */
				const isChineseChar = chineseCharRegex.test(word);
				if (isChineseChar) {
					isNeedReplace = true;
					const [i18n_zh] = zhJson[word] || [];
					if (i18n_zh) {
						_n.some(enJson, ([prop_is_en_i18n_zh, i18n_en], english_prop) => {
							if (prop_is_en_i18n_zh === i18n_zh) {
								delete allI18n[may_zh_string_prop];
								console.log('🚀:', 'delete', JSON.stringify(may_zh_string_prop, null, 2));
								may_zh_string_prop = english_prop;
								/* 有可以配置的数据 */
								allI18n[may_zh_string_prop] = [i18n_zh, i18n_en];
								return true;
							}
						});
					}
					return `i18n${manySuffix || ''}(${quote}${may_zh_string_prop}${quote})`;
				} else {
					return match;
				}
			};
			const result = String(content).replace(matchReg, replaceMatched);
			if (isNeedReplace) {
				fs.writeFileSync(file, result);
			}
		} catch (error) {
			console.error(error);
			console.error(`Error processing file ${file}:`, error.message);
		}
	}
	const content = `module.exports = ${JSON.stringify(allI18n, null, 2)}`;
	debugger;
	ALL_I18N_CONTENT_UPDATE(APP_NAME, content);
	debugger;
})();
