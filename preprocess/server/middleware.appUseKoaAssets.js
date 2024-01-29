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
			ctx.path = "/business_doc/doc.html";
		}
		try {
			let [targetPath, extname] = (function () {
				let targetPath = app.pathResolve(ctx.path.replace(/^\/(static)?/, "../../static_vue2/"));
				let extname = path.extname(targetPath);
				/* 如果没有明确的文件后缀，添加html尝试返回页面 */
				if (!extname) {
					extname = ".html";
					targetPath += extname;
				}

				if (fs.existsSync(targetPath)) {
					/* static_vue2 */
					return [targetPath, extname];
				}

				if (String(ctx.path).includes(`static/framework/`)) {
					targetPath = app.pathResolve("../../static_other/framework", String(ctx.path).split(`static/framework/`)[1]);
				}

				if (fs.existsSync(targetPath)) {
					/* '/static/framework/2.0/mo.console.ui.js' */
					return [targetPath, extname];
				}

				const pathArray = String(ctx.path).split("/");
				if (pathArray[1] === "static") {
					const _path = pathArray.slice(3);
					targetPath = app.pathResolve("../../static_vue2/", _path.join("/"));
				}

				if (fs.existsSync(targetPath)) {
					/* "/static/rccwl/common/libs/seed.js" */
					return [targetPath, extname];
				}


				const [isUseMoMockJsonData, _path] = (function () {
					const whiteList = ['/rest/product/v3.0/apply/products'];
					/*  mo数据*/
					if (whiteList.includes(ctx.path)) {
						return [true, pathArray.slice(1)];
					}

					/* 项目数据 */
					if (/business_mo_/.test(pathArray[2])) {
						return [true, pathArray.slice(4)];
					}

					return [false];
				})();

				if (isUseMoMockJsonData && _path) {
					/* "/static/business_mo_rancher_sc/moRancher.html/rest/momaintenance/custom/login" */
					targetPath = app.pathResolve("../../static_other/mock_mo_json", _path.join("/"));
				}
				if (fs.existsSync(targetPath)) {
					return [targetPath, "application/json"];
				}
				console.error("NOT FOUND");
				console.error(targetPath);
				return ["", ""];
			})();

			const basename = path.basename(targetPath);

			if (targetPath && extname) {
				if (extname === ".html") {
					async function handleIndexHtml() {
						ctx.status = 200;
						ctx.set("Content-Type", mime.lookup(targetPath));
						const indexHtmlString = await fs.promises.readFile(decodeURIComponent(targetPath), "utf-8");
						const $ = cheerio.load(indexHtmlString);
						/* 首页注入 hmr 代码 */
						let scriptBlockString = await fs.promises.readFile(app.pathResolve("./hmr.socket.io.script_block.vue"), "utf-8");
						scriptBlockString = scriptBlockString.replace("LOCALHOST_PORT", app.LOCALHOST_PORT);

						socketIoString = await fs.promises.readFile(app.pathResolve("./hmr.socket.io.script_block.socket.io.js"), "utf-8");

						scriptBlockString = scriptBlockString.replace(`/* window.io */`, socketIoString);

						$("#app").after(scriptBlockString);

						const APP_NAME = basename.replace(extname, "");

						const { _URL_PREFIX } = SERVER_CONFIGS[APP_NAME] || {};

						/* 配置 yapi mock 地址 */
						if (_URL_PREFIX) {
							$("#app").after(`<script only-use-in-dev-model>window._URL_PREFIX="${_URL_PREFIX}";</script>`);
						}
						console.log("🚀 middleware.appUseKoaAssets.js handleIndexHtml:", APP_NAME, _URL_PREFIX);

						ctx.body = $.html();
					}
					try {
						return await handleIndexHtml();
					} catch (error) {
						console.error(error);
						console.log("🚀:", "handleIndexHtml fail");
					}
				}

				try {
					async function hanldeAssets() {
						ctx.status = 200;
						const contentType = mime.lookup(targetPath) || extname;
						ctx.set("Content-Type", contentType);
						ctx.body = fs.createReadStream(targetPath);
					}
					return await hanldeAssets();
				} catch (error) {
					console.log("🚀:", "hanldeAssets fail");
				}
			}

			/*  [assetsPath, assetsName] = String(ctx.path).match((/^\/rest\/(.*)/)) || []; let isDone = false; if (assetsPath) { ctx.status = 200; ctx.set("Content-Type", "application/json"); ctx.body = { code: "200", data: {}, vmConfigInfos: [{ regionName: "4", cloudInfraName: "3", cloudInfraId: "2", regionId: 1 }] }; isDone = await (async () => { const HANDLER_MAP = { conditions: handleConditions, saleInfo: handleSaleInfo, selled: handleSelled, one_price: handleOnePrice, syncDBData: handleSyncDBData }; const handler = HANDLER_MAP[assetsName]; if (handler) { return await handler({ buildingCollection, ctx }); } else { return false; } })(); } */
			next();
			console.log("miss: ", targetPath);
		} catch (error) {
			console.error(error);
		}
	});
};
