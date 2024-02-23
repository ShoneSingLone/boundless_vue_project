const fs = require("fs");
const path = require("path");
const YAPI_HOST = "http://locahost:3001/";
const INDEX_HTML_PREFIX = ``;
const INDEX_HTML_PATH = ``;


const MIME = {
	"css": "text/css",
	"gif": "image/gif",
	"html": "text/html",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"js": "text/javascript",
	"json": "application/json",
	"pdf": "application/pdf",
	"png": "image/png",
	"svg": "image/svg+xml",
	"swf": "application/x-shockwave-flash",
	"tiff": "image/tiff",
	"txt": "text/plain",
	"wav": "audio/x-wav",
	"wma": "audio/x-ms-wma",
	"wmv": "video/x-ms-wmv",
	"xml": "text/xml"
};

function goYapi(request, res, req) {
	const client = request(async (svrRes) => {
		res.writeHead(svrRes.statusCode, svrRes.headers);
		svrRes.pipe(res);
	}, { host: YAPI_HOST });
	req.pipe(client);
}

function goAway(request, res, req) {
	const client = request(async (svrRes) => {
		res.writeHead(svrRes.statusCode, svrRes.headers);
		svrRes.pipe(res);
	});
	req.pipe(client);
}

function loadLocalAssets(realPath, res) {
	var contentLength = fs.statSync(realPath)?.size;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';
	var contentType = MIME[ext] || "text/plain";

	res.writeHead(200, {
		'Content-Type': contentType,
		'Content-Length': contentLength
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