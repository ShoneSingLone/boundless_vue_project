const { fs, path, _, val } = require("../preprocess.utils");
const { getI18NContent } = require("./i18n.utils");
const [APP_NAME] = process.argv.slice(2);

const I18N_CONTENT = getI18NContent(APP_NAME);
const LOG_PROPS_SET = new Set();
/* 对应语言文件 */
const LANGUAGE_FILE_ORDER = ["zh-CN", "en-US"];

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
					LOG_PROPS_SET.add(props);
					const currentLabel = objOrLabelArray[index];
					val(targetContent, props, currentLabel);
				}
				prePropArray.pop();
			});
		}
		TraversalObject(I18N_CONTENT);
		const content = JSON.stringify(targetContent);
		const targetFilePath = `../../static_vue2/business_${APP_NAME}/i18n/${fileName}.js`;
		fs.writeFileSync(
			path.resolve(__dirname, targetFilePath),
			`window.i18n.options = ${content}`
		);
	});
	console.log("🚀count: ", LOG_PROPS_SET.size);
} catch (err) {
	console.log("err", err);
}
