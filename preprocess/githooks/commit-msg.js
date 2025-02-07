const { APP_NAME_ARRAY, _, execCmd } = require("../preprocess.utils");
// const { execLog, APP_NAME_ARRAY, _ } = require("./preprocess.utils");
const [hooksName, msgPath] = process.argv.slice(2);
console.log("🚀 ~ hooksName, msgPath:", hooksName, msgPath);
if (!msgPath) {
	process.exit(1);
}
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();
// const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;
/* if (!commitRE.test(msg)) {
	console.log(msg);
	process.exit(1);
} */

(async () => {
	/* https://www.jianshu.com/p/b2fec735e7cf */
	// const msg = await execLog(`git show -s --format=%s`);
	const commitRE =
		/^(sync|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,500}/;

	let isFail = !commitRE.test(msg);
	if (!isFail) {
		const [, type, scope] = String(msg).match(commitRE);
		const sepcial = ["xUI", "common", "sync", "readme"];
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
		isFail = !/Merge /.test(msg);
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
