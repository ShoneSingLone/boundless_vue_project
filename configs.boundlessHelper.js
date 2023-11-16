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
        _api: "static_vue2/business_doc/utils/api.vue",
        _opts: "static_vue2/business_doc/utils/opts.vue",
        _reuse: "static_vue2/business_doc/utils/reuse.vue",
    }
};