const { path, _ } = require("../preprocess.utils");

exports.getI18NContent = function (APP_NAME) {
    /* 通用的 */
    const I18N_COMMON = require(path.resolve(__dirname, "./i18n.common.js"));
    const specialI18nFilePath = `../../static_vue2/business_${APP_NAME}/i18n/all.i18n.js`;
    const I18N_SPECIAL = require(path.resolve(__dirname, specialI18nFilePath));
    let I18N_CONTENT = _.merge(I18N_SPECIAL, I18N_COMMON);
    return I18N_CONTENT;
}; 