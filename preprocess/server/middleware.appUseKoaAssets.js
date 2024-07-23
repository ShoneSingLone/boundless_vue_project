const { fs, path, _, execCmd } = require("../preprocess.utils");
const mime = require("mime-types");
const cheerio = require("cheerio");
const { APP_CONFIGS } = require("./server.configs");

execCmd(`npm run vsws`);

exports.appUseKoaAssets = function (app) {
	/**
	 * Koa Middlewares
	 */

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
					const whiteList = [
						'/rest/product/v3.0/apply/products',
						"/rest/momaintenance/custom/login",
						"/rest/momaintenance/v1/timerRequest/announcements",
						"/rest/task/v3.0/timerRequest/tasks",
						"/goku/silvan/rest/v2.0/license",
						"/rest/me"
					];
					let url;
					/*  mo数据*/
					if (url = _.find(whiteList, url => ctx.path.includes(url))) {
						return [true, [url.slice(1)]];
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

						let APP_NAME = basename.replace(extname, "");

						const businessItem = _.find(pathArray, name => {
							return /business_(.*)/.test(name);
						});

						if (APP_NAME === 'index' && businessItem) {
							const [, name] = String(businessItem).match(/business_(.*)/);
							APP_NAME = name;
						}

						const { _URL_PREFIX_4_DEV } = APP_CONFIGS[APP_NAME] || {};

						/* 配置 yapi mock 地址 */
						if (_URL_PREFIX_4_DEV) {
							$("#app").after(`<script only-use-in-dev-model="">
							let _URL_PREFIX_4_DEV = "";
							Object.defineProperty(window, "_URL_PREFIX_4_DEV", {
								get() {
									return _URL_PREFIX_4_DEV||"${_URL_PREFIX_4_DEV}"
								},
								set(newValue) {
									_URL_PREFIX_4_DEV = newValue
									console.log("🚀 ~ set ~ _URL_PREFIX_4_DEV in only-use-in-dev-model:", _URL_PREFIX_4_DEV);
								},
							});
						</script>`);
						} else {
							$("#app").after(`<script only-use-in-dev-model="">
							if (location.hostname === "localhost") {
								Object.defineProperty(window, "_URL_PREFIX_MO", {
									get() {
										return "use_yapi_proxy"
									},
									set(newValue) {
										debugger;
									},
								});
							}
						</script>`);
						}
						console.log("🚀 middleware.appUseKoaAssets.js APP_CONFIGS:", APP_NAME, _URL_PREFIX_4_DEV);

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
			// console.log("middleware.appUseKoaAssets", this);
		} catch (error) {
			console.error(error);
		}
	});
};
