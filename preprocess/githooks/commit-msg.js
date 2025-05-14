const { APP_NAME_ARRAY, _, execCmd, fs, path } = require("../preprocess.utils");
// const { execLog, APP_NAME_ARRAY, _ } = require("./preprocess.utils");
const [hooksName, COMMIT_EDITMSG_FILE_PATH] = process.argv.slice(2);
if (!COMMIT_EDITMSG_FILE_PATH) {
	process.exit(1);
}
const COMMIT_EDITMSG = fs.readFileSync(COMMIT_EDITMSG_FILE_PATH, "utf-8").trim();

// const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;
/* if (!commitRE.test(msg)) {
	console.log(msg);
	process.exit(1);
} */

(async () => {
	if ("deploy======================" === COMMIT_EDITMSG) {
		/* 不做校验 */
		return;
	}
	/* https://www.jianshu.com/p/b2fec735e7cf */
	// const msg = await execLog(`git show -s --format=%s`);
	const commitRE =
		/^(sync|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,500}/;

	let isFail = !commitRE.test(COMMIT_EDITMSG);
	if (!isFail) {
		const [, type, scope] = String(COMMIT_EDITMSG).match(commitRE);
		const sepcial = ["xUI", "common", "sync", "readme", "i18n", "githooks"];
		const allowBusiness = [...sepcial, ...APP_NAME_ARRAY];
		const [isNameOk, businessName] = (() => {
			/* 不需要lint */
			let jusetCommitOnly = _.some(sepcial, business => {
				return scope.includes(business) || type === business;
			});

			if (jusetCommitOnly) {
				return [true, ""];
			}

			let businessName = _.find(APP_NAME_ARRAY, business => {
				return scope.includes(business);
			});

			if (businessName) {
				return [true, businessName];
			}

			return [false];
		})();

		if (!isNameOk) {
			console.log(`${scope} 不在允许范围内：（查看static_vue2文件夹下的business_*******）`);
			console.table(allowBusiness);
			process.exit(1);
		}
	}

	if (isFail) {
		isFail = !/Merge /.test(COMMIT_EDITMSG);
	}

	if (isFail) {
		console.log(`git commit message 格式错误:（本校验规则在 preprocess/githooks/commit-msg.js 中定义）
/^(sync|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release)(\(.+\))?: .{1,500}/

按照如下格式填写:
	特性(BUSINESS_NAME):描述(1-500个字符)
`);
		process.exit(1);
	}
	/* 开发测试 禁止commit */
	// process.exit(1);
})();
