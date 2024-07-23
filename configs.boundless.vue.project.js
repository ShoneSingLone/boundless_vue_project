module.exports = {
    "alias": {
        "^/common/": "/static_vue2/common/"
    },
    components: require("./preprocess/vscode.definitions/components.js"),
    scanLodashDefine: require("./preprocess/vscode.definitions/scanLodashDefine.js"),
};