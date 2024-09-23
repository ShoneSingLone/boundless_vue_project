const { execCmd } = require("../preprocess.utils");
const _ = require("lodash");

(async () => {
	await execCmd(`npm run update_index_html_version`);
	await execCmd(`git add */**.html`);
	/* 开发测试 禁止commit */
	// console.log("🚀 ~ 开发测试 禁止commit: 开发测试 禁止commit");
	// process.exit(1);
})();
