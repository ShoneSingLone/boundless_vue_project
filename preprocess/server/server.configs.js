exports.SERVER_CONFIGS = {
	doc: {
		MOCK_URL_PREFIX: ""
	},
	yapi: {
		MOCK_URL_PREFIX: "/mock"
	}
};

exports.PROXY_OPTIONS = {
	targets: {
		"/mock/api/(.*)": {
			target: "http://localhost:3001",
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/mock/api", "/api");
			}
		},
		"/api/(.*)": {
			target: "http://localhost:3001",
			secure: false,
			changeOrigin: true,
			pathRewrite(url, req) {
				return url.replace("/api", "/api");
			}
		},
		"/mock/(.*)": {
			target: "http://localhost:3001",
			secure: false,
			changeOrigin: true
		}
	}
};
