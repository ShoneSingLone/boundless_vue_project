const { path, _ } = require("../preprocess.utils");
const [, , , isMo] = process.argv;
console.log("🚀 ~ isMo:", isMo);

exports.getI18NContent = function (APP_NAME) {
	console.log("🚀 ~ APP_NAME:", APP_NAME);
	/* 通用的 */
	let I18N_COMMON = require(path.resolve(__dirname, "./i18n.common.js"));
	if (isMo === "mo") {
		let I18N_COMMON_MO = require(path.resolve(__dirname, "./i18n.common.mo.js"));
		I18N_COMMON = _.merge(I18N_COMMON_MO, I18N_COMMON);
	}

	const specialI18nFilePath = `../../static_vue2/business_${APP_NAME}/i18n/all.i18n.js`;
	const I18N_SPECIAL = require(path.resolve(__dirname, specialI18nFilePath));
	let I18N_CONTENT = _.merge(I18N_SPECIAL, I18N_COMMON);
	return I18N_CONTENT;
};
