const { execCmd } = require("../preprocess.utils");
const [APP_NAME] = process.argv.slice(2);

/* 同一个项目多个脚本 */
(async function () {
	await execCmd(`pnpm i18n ${APP_NAME}`);
	await execCmd(`pnpm d.ts opts ${APP_NAME}`);
	await execCmd(`pnpm d.ts api ${APP_NAME}`);
})();
