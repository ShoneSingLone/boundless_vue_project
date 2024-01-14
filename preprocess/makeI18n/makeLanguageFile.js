const { fs, path, _, val } = require("../preprocess.utils");

const [APP_NAME] = process.argv.slice(2);

/* 通用的 */
const I18N_COMMON = require(path.resolve(__dirname, "./i18n.common.js"));

/* 对应语言文件 */
const LANGUAGE_FILE_ORDER = ["zh-CN", "en-US"];

const specialI18nFilePath = `../../static_vue2/business_${APP_NAME}/i18n/i18n.all.js`;
const I18N_SPECIAL = require(path.resolve(__dirname, specialI18nFilePath));

let I18N_CONTENT = _.merge(I18N_SPECIAL, I18N_COMMON);
const logPropsSet = new Set();

try {
	LANGUAGE_FILE_ORDER.forEach((fileName, index) => {
		const targetContent = {};
		function TraversalObject(i18nContent, prePropArray = []) {
			_.each(i18nContent, (objOrLabelArray, prop) => {
				prePropArray.push(prop);
				if (_.isPlainObject(objOrLabelArray)) {
					//递归遍历
					TraversalObject(objOrLabelArray, prePropArray);
				} else {
					const props = prePropArray.join(".");
					logPropsSet.add(props);
					const currentLabel = objOrLabelArray[index];
					val(targetContent, props, currentLabel);
				}
				prePropArray.pop();
			});
		}

		TraversalObject(I18N_CONTENT);
		const content = JSON.stringify(targetContent);
		const targetFilePath = `../../static_vue2/business_${APP_NAME}/i18n/${fileName}.js`;
		fs.writeFileSync(path.resolve(__dirname, targetFilePath), `window.i18n.options = ${content}`);
	});
	console.log("🚀:", logPropsSet.keys());
} catch (err) {
	console.log("err", err);
}
