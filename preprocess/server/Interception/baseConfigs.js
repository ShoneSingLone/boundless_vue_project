const { _n } = require("@ventose/utils-node");

const YAPI_MOCK_ID = "/mock/240";

/* yapi server host */
// exports.TARGET_SERVER = "http://localhost:3001/";
exports.TARGET_SERVER = "http://10.143.133.216:3001/";
/* yapi 项目地址 */
exports.YAPI_MOCK_ID = YAPI_MOCK_ID;
/*  */
exports.APP_NAME = "azure";
/* 线上访问地址 host */
exports.MAIN_DOMAIN = `console.811rack36.com`;
/* 不需要处理的垃圾链接 */
exports.IS_THE_GARBAGE = url => {
	return _n.some(
		[
			"/static/azure/ghca-dep/1.0.4/lib/module/axios.map",
			"/azure/s/momaintenance/static/tenant_ManageOne_logo.png",
			"getSessionExpireTime",
			"timerRequest",
			"mocloudmarketservice/v3.0/configrations",
			"azure/goku/rest/vdc/v3.0/PAP/user/28708e68a1644661aea3ce8225cdb399/actions",
			"moatlaswebsite/analysis"
		],
		_url => String(url).includes(_url)
	);
};
exports.IS_NEED_PROXY = req => {
	if (String(req._url).includes(YAPI_MOCK_ID)) {
		return true;
	}
};
