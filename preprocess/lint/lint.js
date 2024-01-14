const { log } = require("../../preprocess/preprocess.utils");
var exec = require("child_process").exec;
const [APP_NAME] = process.argv.slice(2);
let startTime = Date.now();

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
const result = exec(cmd, { maxBuffer: 1024 * 2000, encoding: "gbk" });
result.stdout.on("data", log);
result.stderr.on("data", log);
result.on("close", code => {
	console.log(`🚀 lint ${targetPath} ${(Date.now() - startTime) / 1000}s code:${code}`);
});
