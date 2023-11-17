exports.SERVER_CONFIGS = {
	doc: {
		MOCK_URL_PREFIX: "mock/300"
	}
};

exports.PROXY_OPTIONS = {
	targets: {
		"/mock/(.*)": {
			target: "http://192.168.3.227:3001",
			// target: "http://10.143.133.216:3001",
			secure: false,
			changeOrigin: true
		}
	}
};

