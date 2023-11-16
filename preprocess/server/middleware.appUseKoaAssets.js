const mime = require("mime-types");
const bodyparser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { SERVER_CONFIGS } = require("./server.configs");

exports.appUseKoaAssets = function (app) {
	/**
	 * Koa Middlewares
	 */

	app.use(bodyparser());

	/* 处理静态资源 */
	app.use(async (ctx, next) => {


		const pathArray = ctx.path.split("/");

		if (pathArray.join("") === "") {
			ctx.path = "/doc.html";
		}
		try {
			let targetPath = app.pathResolve(
				ctx.path.replace(/^\/(static)?/, "../../static_vue2/")
			);
			let extname = path.extname(targetPath);
			/* 如果没有明确的文件后缀，添加html尝试返回页面 */
			if (!extname) {
				extname = ".html";
				targetPath += extname;
			}

			const basename = path.basename(targetPath);

			async function handleIndexHtml() {
				ctx.status = 200;
				ctx.set("Content-Type", mime.lookup(targetPath));
				const indexHtmlString = await fs.promises.readFile(targetPath, "utf-8");
				const $ = cheerio.load(indexHtmlString);
				/* 首页注入 hmr 代码 */
				let scriptBlockString = await fs.promises.readFile(
					app.pathResolve("./hmr.socket.io.script_block.vue"),
					"utf-8"
				);
				scriptBlockString = scriptBlockString.replace("LOCALHOST_PORT", app.LOCALHOST_PORT);


				socketIoString = await fs.promises.readFile(
					app.pathResolve("./hmr.socket.io.script_block.socket.io.js"),
					"utf-8"
				);

				scriptBlockString = scriptBlockString.replace(`/* window.io */`, socketIoString);

				$("#app").after(scriptBlockString);

				const APP_NAME = basename.replace(extname, "");

				const { MOCK_URL_PREFIX } = SERVER_CONFIGS[APP_NAME] || {};

				/* 配置 yapi mock 地址 */
				if (MOCK_URL_PREFIX) {
					$("#app").after(
						`<script only-use-in-dev-model>window.MOCK_URL_PREFIX="${MOCK_URL_PREFIX}";</script>`
					);
				}
				console.log("🚀 middleware.appUseKoaAssets.js handleIndexHtml:", APP_NAME, MOCK_URL_PREFIX);

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
