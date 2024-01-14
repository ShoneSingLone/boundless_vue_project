const fs = require("fs");
const path = require("path");

exports.serverContorller = function (ctx) {
	const { method, url } = ctx;
	const handler = router[url];
	if (handler) {
		return handler(ctx);
	}
	throw new Error(`[${method}] ${url} not found`);
};
const router = {
	async "/boundless-api/project/all"(ctx) {
		const dirList = await fs.promises.readdir(path.resolve(__dirname, "../../static_vue2"));
		const businessDirList = dirList.filter(item => /^business_/.test(item));
		const targetData = {};

		for (const appDirName of businessDirList) {
			const appDirPath = path.resolve(__dirname, "../../static_vue2", appDirName);
			const appDirList = await fs.promises.readdir(appDirPath);
			targetData[appDirName] = appDirList.filter(item => /.html$/.test(item));
		}
		ctx.body = {
			code: 200,
			data: targetData
		};
	}
};
