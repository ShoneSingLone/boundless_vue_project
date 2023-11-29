
exports.SERVER_CONFIGS = {
	doc: {
		MOCK_URL_PREFIX: ""
	}
};

exports.PROXY_OPTIONS = {
	targets: {
		"/mock/(.*)": {
			target: "http://192.168.3.227:3001",
			secure: false,
			changeOrigin: true
		}
	}
};
