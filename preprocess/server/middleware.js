const { execCmd } = require("../preprocess.utils");
const os = require("os");
const useProxy = require("koa2-proxy-middleware"); //引入代理模块
const { appUseKoaAssets } = require("./middleware.appUseKoaAssets");
const { appUseSocketMiddleware } = require("./middleware.appUseSocketMiddleware");
const { appUseHMR } = require("./middleware.appUseHMR");
const { PROXY_OPTIONS, SERVER_PORT } = require("./server.configs");
const { Router } = require("./server.router");
const { openBrowser } = require("./plugins.openBrowser");
const bodyparser = require("koa-bodyparser");

function appUseProxy(app) {
	/* 代理 */
	app.use(useProxy(PROXY_OPTIONS));
	/* 解析参数 */
	app.use(bodyparser());
	/* 路由*/
	const router = Router();
	app.use(router.routes());
	app.use(router.allowedMethods());
}


function openInBrowser(lan) {
	if (openInBrowser.timer) {
		clearTimeout(openInBrowser.timer);
	}

	openInBrowser.timer = setTimeout(() => {
		let title = `🚀: auto open broswer chrome`;
		try {
			openBrowser(lan, { app: ["chrome"] });

			console.log(title);
		} catch (error) {
			console.log(title, error);

		}
	}, 2000 * 1);
}

let server;

function appRun(app) {
	server = app.listen(SERVER_PORT);
	server.on("error", async (error) => {
		console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀", `端口${SERVER_PORT}被占用`);
		server.close();
		await execCmd(`kill-port ${SERVER_PORT}`);
		appRun(app, SERVER_PORT);
	});

	app.LOCALHOST_PORT = `http://localhost:${SERVER_PORT}/`;
	const line = "=====================================";
	console.log(`${line}\n${app.LOCALHOST_PORT}`);
	console.log(line);

	const content = JSON.stringify(os.networkInterfaces());
	const contentArray = content.split(`",`).filter(s => s.match(/"address":"(.*)/));
	let lan;
	contentArray.forEach(s => {
		const res = s.match(/address":"192.(.*)/);
		if (res) {
			const url = `http://192.${res[1]}:${SERVER_PORT}/#/all`;
			console.log(`${url}/\n${line}`);

			if (!lan) {
				/* 第一个是局域网地址 */
				lan = url;
			}
			try {
				openInBrowser(lan);
			} catch (error) {
				console.log("openInBrowser error:", error);
			}
		}
	});
}

exports.appUseHMR = appUseHMR;
exports.appUseProxy = appUseProxy;
exports.appUseKoaAssets = appUseKoaAssets;
exports.appUseSocketMiddleware = appUseSocketMiddleware;
exports.appRun = appRun;
