// http://wproxy.org/whistle/quickstart.html
// https://wproxy.org/whistle/rules/reqBody.html

// https://github.com/whistle-plugins/whistle.script
// https://github.com/whistle-plugins/examples

/* rules */

// console.811rack36.com/azure script://azureIndex
// console.811rack36.com/yapi/mock/240 http://192.168.137.1:3001/mock/240
// console.811rack36.com / static / azure file://D:\ghca\azure-front_sc\sc\src\static\azure

/* rules */

const fs = require("fs");
const path = require("path");
const YAPI_HOST = "http://locahost:3001/";
const INDEX_HTML_PREFIX = `https://console.811rack36.com/azure/?`;
const INDEX_HTML_PATH = `D://ghca//azure-front_sc//sc//src//static//azure//index.html`;

// console.log(path.resolve("./"));
const MIME = {
	css: "text/css",
	gif: "image/gif",
	html: "text/html",
	ico: "image/x-icon",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	js: "text/javascript",
	json: "application/json",
	pdf: "application/pdf",
	png: "image/png",
	svg: "image/svg+xml",
	swf: "application/x-shockwave-flash",
	tiff: "image/tiff",
	txt: "text/plain",
	wav: "audio/x-wav",
	wma: "audio/x-ms-wma",
	wmv: "video/x-ms-wmv",
	xml: "text/xml"
};

function goYapi(request, res, req) {
	const client = request(
		async svrRes => {
			res.writeHead(svrRes.statusCode, svrRes.headers);
			svrRes.pipe(res);
		},
		{ host: YAPI_HOST }
	);
	req.pipe(client);
}

function goAway(request, res, req) {
	const client = request(async svrRes => {
		res.writeHead(svrRes.statusCode, svrRes.headers);
		svrRes.pipe(res);
	});
	req.pipe(client);
}

function loadLocalAssets(realPath, res) {
	var contentLength = fs.statSync(realPath)?.size;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : "unknown";
	var contentType = MIME[ext] || "text/plain";

	res.writeHead(200, {
		"Content-Type": contentType,
		"Content-Length": contentLength
	});
	var readStream = fs.createReadStream(realPath);
	readStream.pipe(res);
}

exports.handleRequest = async (ctx, request) => {
	const { req, res } = ctx;
	if (String(ctx.fullUrl).includes(INDEX_HTML_PREFIX)) {
		loadLocalAssets(INDEX_HTML_PATH, res);
	} else if (String(ctx.fullUrl).includes(`/mock/`)) {
		console.log("yapi proxy: ", ctx.fullUrl);
		goYapi(request, res, req);
	} else {
		console.log("go away", ctx.fullUrl);
		goAway(request, res, req);
	}
};
