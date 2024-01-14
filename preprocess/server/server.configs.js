
exports.SERVER_PORT = 3002;
exports.SERVER_CONFIGS = {
	doc: {
		_URL_PREFIX: ""
	},
	yapi: {
		_URL_PREFIX: "local/yapi"
	}
};

const yapiURL = "http://localhost:3001";
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
		"/mock/(.*)": {
			target: yapiURL,
			secure: false,
			changeOrigin: true
		}
	}
};
