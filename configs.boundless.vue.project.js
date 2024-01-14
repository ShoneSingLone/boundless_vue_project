module.exports = {
    "alias": {
        "^/common/": "/static_vue2/common/"
    },
    components: require("./preprocess/vscode.definitions/components.js"),
    globalLodash: require("./preprocess/vscode.definitions/globalLodash.js"),
};