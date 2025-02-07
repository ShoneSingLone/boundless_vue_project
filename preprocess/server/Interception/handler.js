const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const { requestProxyHandler: getRequestResourceResponse } = require("./Interception.proxy");
const { _n } = require("@ventose/utils-node");
const { APP_NAME, MAIN_DOMAIN } = require("./baseConfigs");
const pathD = _n.getPathD(__dirname);

const proxyHandlerPath = pathD("./Interception.proxy.js");

delete require.cache[proxyHandlerPath];

async function getAppIndex(req, appName) {
	return req.respond({
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		contentType: "text/html",
		body: await fs.readFileSync(pathD(`../src/static/${appName}/framework/index.html`))
	});
}

async function getStaticResourceResponse(req, TARGET_FILE_PATH) {
	const TYPE = req._resourceType;
	if (TARGET_FILE_PATH.indexOf("CMP-FONT-ICON") > -1) {
		console.log("");
	}

	const type_map = {
		font: {
			contentType: () => {
				return `font/${path.extname(TARGET_FILE_PATH).substring(1)}`;
			},
			body: () => {
				const body = fs.readFileSync(TARGET_FILE_PATH, "utf-8");
				return body;
			}
		},
		/* 请求 html text */
		xhr: {
			contentType: () => "text/html",
			body: () => {
				const body = fs.readFileSync(TARGET_FILE_PATH, "utf-8");
				return body;
			}
		},
		document: {
			contentType: () => "text/html",
			body: () => fs.readFileSync(TARGET_FILE_PATH, "utf-8")
		},
		script: {
			contentType: () => "application/javascript",
			body: () => {
				const body = fs.readFileSync(TARGET_FILE_PATH, "utf-8");
				return body;
			}
		},
		stylesheet: {
			contentType: () => "text/css; charset=utf-8",
			body: () => fs.readFileSync(TARGET_FILE_PATH, "utf-8")
		},
		image: {
			contentType: () => "text/plain",
			body: () => Buffer.from(fs.readFileSync(TARGET_FILE_PATH))
		},
		other: {
			contentType: () => "text/plain",
			body: () => Buffer.from(fs.readFileSync(TARGET_FILE_PATH))
		}
	};

	let type = {};
	try {
		type = type_map[TYPE];
		type.contentType = type.contentType();
		type.body = type.body();
	} catch (error) {
		console.log("🚀 miss TYPE: ", JSON.stringify(TYPE, null, 2));
		type.body = false;
	}
	return type;
}

async function proxyLocalFile(req) {
	let isContinue = true;
	let res = {
		body: "",
		headers: "",
		contentType: ""
	};

	const regexp = new RegExp(`${MAIN_DOMAIN}\/static(.*)`);
	/* 静态资源的目录 */
	const matchedStaticResourceArray = String(req._url).match(regexp);

	let matchFilePath = matchedStaticResourceArray && matchedStaticResourceArray[1];
	if (matchFilePath) {
		let body = "";
		matchFilePath = (() => {
			const matched = matchFilePath.match(/\?(.*)[=]?/g);
			let sp = "";
			if (_n.isArray(matched) && matched.length === 1) {
				sp = matched[0];
			}
			if (sp) {
				return String(matchFilePath).split(sp)[0];
			}
			return matchFilePath;
		})();

		const TARGET_FILE_PATH = _n.pathR(__dirname, `../src/static/${matchFilePath}`);

		res = await getStaticResourceResponse(req, TARGET_FILE_PATH);
	} else {
		/* else if (_.startsWith(req._url, "data:")) {
		res = {
			body: req._url,
			contentType: String(req._url).match(/data:(.*);/)[1]
		};
	}  */
		res = await getRequestResourceResponse(req);
	}

	try {
		if (res?.body) {
			await req.respond({
				status: 200,
				/* mock data 提供headers */
				headers: res.headers || {
					"Access-Control-Allow-Origin": "*"
				},
				contentType: res.contentType,
				body: res.body
			});
			isContinue = false;
		} else {
			throw new Error("miss");
		}
	} catch (error) {
		const _url = String(req._url);
		if (/Error: miss/.test(error.stack)) {
			console.log("本地无法提供 ", _url.length > 200 ? _url.substring(0, 200) : _url);
		} else {
			console.log("error🚀", error);
		}
		if (
			~_url.indexOf(`moatlaswebsite/analysis`) ||
			~_url.indexOf(`rest/mocloudmarketservice`)
		) {
			await req.respond({
				status: 200,
				/* mock data 提供headers */
				headers: res.headers || {
					"Access-Control-Allow-Origin": "*"
				},
				contentType: "text/html",
				body: "miss"
			});
			isContinue = false;
			return;
		}
		isContinue = true;
	}

	return isContinue;
}

exports.handleRequest = async req => {
	let isContinue = true;
	/* console.log(req._url); */
	const isIndexPageArray = String(req._url).match(
		new RegExp(`\/${MAIN_DOMAIN}\/${APP_NAME}(.*)`)
	);
	/* app entry 入口*/
	if (isIndexPageArray && isIndexPageArray[1] && /^\/\?agencyId/.test(isIndexPageArray[1])) {
		await getAppIndex(req, APP_NAME);
		isContinue = false;
	} else {
		/* document，stylesheet，image，media，font，script，texttrack，xhr，fetch，eventsource，websocket，manifest，other */
		isContinue = await proxyLocalFile(req);
	}

	return isContinue;
};
