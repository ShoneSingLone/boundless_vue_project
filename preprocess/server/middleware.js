const os = require("os");
const useProxy = require("koa2-proxy-middleware"); //引入代理模块
const { appUseKoaAssets } = require("./middleware.appUseKoaAssets");
const {
	appUseSocketMiddleware
} = require("./middleware.appUseSocketMiddleware");
const { appUseHMR } = require("./middleware.appUseHMR");
const { PROXY_OPTIONS } = require("./server.configs");

function appUseProxy(app) {
	app.use(useProxy(PROXY_OPTIONS));
}

function appRun(app, port = 3000) {
	app.listen(port)
		.on("error", () => {
			console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', `端口${port}被占用`);
			appRun(app, ++port);
		});

	app.LOCALHOST_PORT = `http://localhost:${port}`;
	const line = "🚀=====================================";
	console.log(`${line}\n🚀${app.LOCALHOST_PORT}`);

	const content = JSON.stringify(os.networkInterfaces());
	const contentArray = content.split(`",`).filter(s => s.match(/"address":"(.*)/));
	contentArray.forEach(s => {
		const res = s.match(/address":"192.(.*)/);
		if (res) {
			console.log(`🚀http://192.${res[1]}:${port}/\n${line}`);
		}
	});
}

exports.appUseHMR = appUseHMR;
exports.appUseProxy = appUseProxy;
exports.appUseKoaAssets = appUseKoaAssets;
exports.appUseSocketMiddleware = appUseSocketMiddleware;
exports.appRun = appRun;
