const { execCmd } = require("../../preprocess/preprocess.utils");
const [APP_NAME] = process.argv.slice(2);

let targetPath = (function () {
	if (!APP_NAME) {
		return "./static_vue2";
	}
	if ("preprocess" === APP_NAME) {
		return "./preprocess";
	} else if ("common" === APP_NAME) {
		return "./static_vue2/common";
	}
	if ("babel" === APP_NAME) {
		return "./babelFiles";
	} else if ("d.ts" === APP_NAME) {
		return "./d.ts";
	} else {
		return "./static_vue2/business_" + APP_NAME;
	}
})();

var cmd = `prettier --write ${targetPath}\n=====================================`;
console.log(cmd);
execCmd(cmd);
