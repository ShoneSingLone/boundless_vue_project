const anxin = {
	_URL_PREFIX: "/mock/300"
	// _URL_PREFIX: "luopan"
};

exports.SERVER_PORT = 3002;
exports.SERVER_CONFIGS = {
	anxin_m: anxin,
	anxin,
	moRancher: {
		_URL_PREFIX: "moRancher"
	},
	jh: {
		_URL_PREFIX: "mock/312"
	},
	doc: {
		_URL_PREFIX: ""
	},
	yapi: {
		_URL_PREFIX: "local/yapi"
	}
};

const yapiURL = "http://localhost:3001";
// const yapiURL = "http://10.143.133.216:3001/";
exports.PROXY_OPTIONS = {
	targets: {
		"/local/yapi/(.*)": {
			target: "http://localhost:3001",
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/local/yapi", "");
			}
		},
		"/api/(.*)": {
			target: yapiURL,
			secure: false,
			changeOrigin: true
		},
		"/mock/api/(.*)": {
			target: yapiURL,
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/mock/api", "/api");
			}
		},
		"/luopan/(.*)": {
			target: "http://192.168.3.166:443",
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/luopan", "");
			}
		},
		"/moRancher/(.*)": {
			target: "https://192.168.3.132:8558",
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/moRancher", "");
			}
		},
		"/mock/(.*)": {
			target: yapiURL,
			secure: false,
			changeOrigin: true
		}
	}
};
