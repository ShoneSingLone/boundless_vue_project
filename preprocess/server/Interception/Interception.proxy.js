const fs = require("fs");
const axios = require("axios");
const https = require("https");
const { _n } = require("@ventose/utils-node");
const { YAPI_MOCK_ID, TARGET_SERVER, IS_NEED_PROXY } = require("./baseConfigs");

const pathD = _n.getPathD(__dirname);

const isProxy = true;

const ffUrl = url => {
	return String(url)
		.split("/")
		.filter(i => !!i)
		.join("/");
};

/* NOTICE:一个回车引发的血案，反引号的回车实际是\n，会加在字符串里面，拼接的URL就是错误的 */
const filterURL = url => {
	const urlArray = url.split(YAPI_MOCK_ID);
	const _url = ffUrl(`${YAPI_MOCK_ID}${urlArray[1]}`);
	const targetURL = `${TARGET_SERVER}${_url}`;
	console.log("TARGET_URL:", targetURL);
	return targetURL;
};
exports.filterURL = filterURL;
exports.ffUrl = ffUrl;

const xauthTokenPath = pathD("./x-auth-token.txt");

let xAuthToken = fs.readFileSync(xauthTokenPath, "utf-8");

async function asyncGetXAuthToken(url) {
	url = url || `https://160.106.2.41:26335/v3/auth/tokens`;
	try {
		const axiosOptions = {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false
			}),
			method: "post",
			url,
			data: {
				auth: {
					identity: {
						methods: ["password"],
						password: {
							user: {
								name: "bss_admin",
								password: "HC%ManageOne52#zkhst",
								domain: {
									name: "mo_bss_admin"
								}
							}
						}
					},
					scope: {
						domain: {
							name: "mo_bss_admin"
						}
					}
				}
			}
		};
		//console.log("🚀:", "axiosOptions", JSON.stringify(axiosOptions, null, 2));
		try {
			const res = await axios(axiosOptions);
			const headers = res.headers;
			xAuthToken = headers["x-subject-token"];
		} catch (error) {
			console.log(
				"🚀 ~ file: Interception.proxy.js ~ line 66 ~ asyncGetXAuthToken ~ error",
				error
			);
		}
		if (!xAuthToken) {
			throw new Error("获取token出错，可能是网络不通，vpn有问题");
		} else {
			fs.writeFileSync(xauthTokenPath, xAuthToken);
		}
	} catch (error) {
		console.error(error);
	} finally {
		return xAuthToken || "no-X-Auth-Token";
	}
}

exports.asyncGetXAuthToken = asyncGetXAuthToken;

async function getResponse(params) {
	params.data = params.data || {};
	try {
		const method = String(params.method).toUpperCase();
		const requestOptions = {
			method: method,
			url: params.url,
			headers: _n.omit(params.headers, ["host"])
		};

		if (/^https/.test(requestOptions.url)) {
			requestOptions.httpsAgent = new https.Agent({
				rejectUnauthorized: false
			});
		}

		if (["PUT", "POST", "DELETE", "PATCH"].includes(method)) {
			requestOptions.data = params.data;
		}

		if (xAuthToken) {
			requestOptions.headers["X-Auth-Token"] = xAuthToken;
		} else {
			requestOptions.headers["X-Auth-Token"] = await asyncGetXAuthToken(
				params.urlGetToken
			);
		}

		let _res = await axios(requestOptions);

		/* 可能之前的token过期了，获取之后再试一次 */
		if (typeof _res?.data === "string") {
			requestOptions.headers["X-Auth-Token"] = await asyncGetXAuthToken(
				params.urlGetToken
			);
			_res = await axios(requestOptions);
		}

		return {
			_res,
			headers: _res.headers,
			body: JSON.stringify(_res.data),
			contentType: _res.headers["content-type"]
		};
	} catch (e) {
		console.error(e);
	}
}
exports.getResponse = getResponse;

exports.requestProxyHandler = async function (req) {
	if (IS_NEED_PROXY(req)) {
		const params = {
			url: filterURL(req._url),
			method: req._method,
			headers: req._headers,
			data: req._postData ? JSON.parse(req._postData) : {}
		};
		return await getResponse(params);
	}
	return {
		headers: "",
		body: "",
		contentType: ""
	};
};
