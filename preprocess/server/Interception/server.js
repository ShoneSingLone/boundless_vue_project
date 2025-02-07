const { IS_THE_GARBAGE, YAPI_MOCK_ID, TARGET_SERVER } = require("./baseConfigs");
const { _n } = require("@ventose/utils-node");
const Koa = require("koa");
const asyncfs = require("fs/promises");
const path = require("path");
const app = new Koa();
const static = require("koa-static");
var bodyParser = require("koa-bodyparser");
const { ffUrl, getResponse, filterURL } = require("../Interception.proxy");

const port = 3000;
const runServer = async () => {
	return new Promise(r => {
		app.use(bodyParser());

		app.use(static(_n.pathR(__dirname, "../src")));

		app.use(async ctx => {
			ctx.request.url = String(ctx.request.url).replace(YAPI_MOCK_ID, "");
			console.log("server access: ", ctx.request.url);
			if (IS_THE_GARBAGE(ctx.request.url)) {
				ctx.body = { code: 0 };
				return;
			}
			async function handleAfterReadLocalFileFail() {
				const originUrl = ctx.request.url;
				ctx.request.url = `${YAPI_MOCK_ID}${ctx.request.url.replace("/azure", "")}`;
				try {
					const sub = ffUrl(`${YAPI_MOCK_ID}/v3/auth/tokens`);
					const response = await getResponse({
						url: filterURL(ctx.request.url, `${TARGET_SERVER}`),
						method: ctx.request.method,
						headers: ctx.request.headers,
						data: ctx.request.body || {},
						urlGetToken: `${TARGET_SERVER}${sub}`
					});
					if (response && response._res) {
						ctx.body = response._res.data;
						return true;
					}
				} catch (error) {
					ctx.request.url = originUrl;
					const res = await handleAfterProxyFail();
					return res;
				}
			}

			async function handleAfterProxyFail(params) {
				try {
					/* 静态资源 */
					responsePath = path.resolve(__dirname, "../src", ctx.request.url.substring(1));
					const body = await asyncfs.readFile(responsePath);
					if (body) {
						ctx.body = body;
						return true;
					}
				} catch (error) {
					console.log("miss static", responsePath);
				}
			}

			try {
				const AppPathMatch = String(ctx.request.url).match(/\/(\w+[^\/])/g);
				/* app主路径 */
				if (_n.isArray(AppPathMatch) && AppPathMatch.length === 1) {
					const APP_PATH = AppPathMatch[0].substring(1).split("?")[0];

					if (APP_PATH === "azure") {
						const body = await asyncfs.readFile(
							_n.pathR(__dirname, `../src/static/${APP_PATH}/index.html`),
							"utf-8"
						);
						ctx.body = body;
						return;
					}
				}
			} catch (error) {
				console.log("🚀:", "error", ctx.request.method, ctx.request.url);
				console.error(error);
				ctx.body = ctx.request.method + ctx.request.url;
				ctx.status = 404;
				return;
			}
			/* request API */

			/* API 请求 */
			let responsePath;
			try {
				responsePath = ctx.request.url.substring(1).split("?")[0];
				responsePath = path.resolve(__dirname, responsePath);
				// console.log( "🚀:", "responsePath", JSON.stringify(responsePath, null, 2) );
				const response = await asyncfs.readFile(responsePath, "utf-8");
				if (_n.isString(response)) {
					ctx.body = JSON.parse(response);
					return;
				}
			} catch (error) {
				const res = await handleAfterReadLocalFileFail();
				if (res) {
					return res;
				}
			}

			ctx.status = 404;
			ctx.body = { msg: "miss" };
		});

		app.listen(port).on("listening", stream => {
			console.log("someone connected!");
			r(stream);
		});
	});
};

exports.runServer = runServer;
exports.port = port;

runServer();
