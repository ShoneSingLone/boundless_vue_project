const { _n } = require("@ventose/utils-node");

const YAPI_MOCK_ID = "/mock/240";

/* yapi server host */
exports.TARGET_SERVER = "";
/* yapi 项目地址 */
exports.YAPI_MOCK_ID = YAPI_MOCK_ID;
/*  */
exports.APP_NAME = "";
/* 线上访问地址 host */
exports.MAIN_DOMAIN = ``;
/* 不需要处理的垃圾链接 */
exports.IS_THE_GARBAGE = url => {
	return _n.some(
		[
		],
		_url => String(url).includes(_url)
	);
};
exports.IS_NEED_PROXY = req => {
	if (String(req._url).includes(YAPI_MOCK_ID)) {
		return true;
	}
};
