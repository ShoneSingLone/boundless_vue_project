const mime = require("mime-types");
const bodyparser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const SERVER_CONFIGS = require("./server.configs");

exports.appUseKoaAssets = function (app) {
	/**
	 * Koa Middlewares
	 */

	app.use(bodyparser());

	/* 处理静态资源 */
	app.use(async (ctx, next) => {
		if (ctx.path === "/") {
			ctx.path = "/doc.html";
		}
		try {
			const targetPath = app.pathResolve(
				ctx.path.replace(/^\/(static)?/, "static_vue2/")
			);

			const extname = path.extname(targetPath);
			const basename = path.basename(targetPath);

			async function handleIndexHtml() {
				ctx.status = 200;
				ctx.set("Content-Type", mime.lookup(targetPath));
				const indexHtmlString = await fs.promises.readFile(targetPath, "utf-8");
				const $ = cheerio.load(indexHtmlString);
				/* 首页注入 hmr 代码 */
				const scriptBlockString = await fs.promises.readFile(
					app.pathResolve("preprocess/server/hmr.socket.io.script_block.vue"),
					"utf-8"
				);
				$("#src-root").after(scriptBlockString);

				const APP_NAME = basename.replace(extname, "");
				const { MOCK_URL_PREFIX } = SERVER_CONFIGS[APP_NAME] || {};
				if (MOCK_URL_PREFIX) {
					$("#src-root").after(
						`<script only-use-in-dev-model>window.MOCK_URL_PREFIX=localStorage.isDev?"${MOCK_URL_PREFIX}":"";</script>`
					);
				}
				console.log(
					"🚀 middleware.appUseKoaAssets.js handleIndexHtml:",
					APP_NAME,
					MOCK_URL_PREFIX
				);
				ctx.body = $.html();
			}

			async function hanldeAssets() {
				ctx.status = 200;
				ctx.set("Content-Type", mime.lookup(targetPath));
				ctx.body = fs.createReadStream(targetPath);
			}

			if (extname === ".html") {
				try {
					return await handleIndexHtml();
				} catch (error) {
					console.error(error);
					console.log("🚀:", "handleIndexHtml fail");
				}
			}

			try {
				return await hanldeAssets();
			} catch (error) {
				console.log("🚀:", "hanldeAssets fail");
			}
			/*  [assetsPath, assetsName] = String(ctx.path).match((/^\/rest\/(.*)/)) || []; let isDone = false; if (assetsPath) { ctx.status = 200; ctx.set("Content-Type", "application/json"); ctx.body = { code: "200", data: {}, vmConfigInfos: [{ regionName: "4", cloudInfraName: "3", cloudInfraId: "2", regionId: 1 }] }; isDone = await (async () => { const HANDLER_MAP = { conditions: handleConditions, saleInfo: handleSaleInfo, selled: handleSelled, one_price: handleOnePrice, syncDBData: handleSyncDBData }; const handler = HANDLER_MAP[assetsName]; if (handler) { return await handler({ buildingCollection, ctx }); } else { return false; } })(); } */
			next();
			console.log("miss: ", targetPath);
		} catch (error) {
			console.error(error);
		}
	});
};
