const useProxy = require("koa2-proxy-middleware"); //引入代理模块
const { appUseKoaAssets } = require("./middleware.appUseKoaAssets");
const {
	appUseSocketMiddleware
} = require("./middleware.appUseSocketMiddleware");
const { appUseHMR } = require("./middleware.appUseHMR");

const proxyOptions = {
	targets: {
		"/mock/(.*)": {
			target: "http://10.143.133.216:3001",
			secure: false,
			changeOrigin: true
		}
	}
};

function appUseProxy(app) {
	app.use(useProxy(proxyOptions));
}

exports.appUseHMR = appUseHMR;
exports.appUseProxy = appUseProxy;
exports.appUseKoaAssets = appUseKoaAssets;
exports.appUseSocketMiddleware = appUseSocketMiddleware;
