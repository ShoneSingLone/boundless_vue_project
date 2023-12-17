const { vueVaribles } = require("./configs.boundlessHelper.yapi");
module.exports = {
    "alias": {
        "^/common/": "/static_vue2/common/"
    },
    "analysis": {
        findFilesInclude: "static_vue2/**/*.vue",
        businessPrefix: "static_vue2/business_",
        commonPrefix: "static_vue2/common/",
    },
    "globalVaribles": {
        _: 'static_vue2/common/libs/common.js',
    },
    vueVaribles: {
        ...vueVaribles,
        _reg: "static_vue2/common/utils/regexp.vue",
        _hooks: "static_vue2/common/utils/hooks.vue",
        _rules: "static_vue2/common/utils/rules.vue",
    }
};