const { PROXY_TARGETS, APP_CONFIGS, SERVER_PORT } = require("../../../PRIVATE_CONFIGS.js");


/* 
exports.APP_CONFIGS = {
    // index.html 里面的 data-app-name="app_name"
    app_name: {
        // 自定义前缀请求前缀:app_request_prefix/mock/666
        _URL_PREFIX_4_DEV: "app_request_prefix"
    },
};

exports.PROXY_TARGETS = {
    "(.*)/app_request_prefix/(.*)": {
        target: `http://other_server_url:port`,
        secure: false,
        changeOrigin: true,
        pathRewrite(url, req) {
        //如果用yapi就可以只使用一个配置
        //会截取app_request_prefix后面的/mock/666，
            const [, target] = url.split("app_request_prefix");
            return `${target}`;
        }
    },
};
*/

exports.SERVER_PORT = SERVER_PORT || 3002;
exports.APP_CONFIGS = APP_CONFIGS;
exports.PROXY_OPTIONS = {
    targets: PROXY_TARGETS
};

