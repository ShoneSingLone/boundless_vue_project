const { APP_NAME_ARRAY, _, execCmd } = require("../preprocess.utils");
// const { execLog, APP_NAME_ARRAY, _ } = require("./preprocess.utils");
const [hooksName, msgPath] = process.argv.slice(2);
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();
// const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;
/* if (!commitRE.test(msg)) {
	console.log(msg);
	process.exit(1);
} */

(async () => {
	/* https://www.jianshu.com/p/b2fec735e7cf */
	// const msg = await execLog(`git show -s --format=%s`);
	const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,500}/;

	let isFail = !commitRE.test(msg);

	if (!isFail) {
		const [, , scope] = String(msg).match(commitRE);
		const sepcial = ["xUI", "common"];
		const allowBusiness = [...sepcial, ...APP_NAME_ARRAY];
		const [isNameOk, businessName] = (() => {
			let businessName = _.find(APP_NAME_ARRAY, business => {
				return scope.includes(business);
			});
			if (businessName) {
				return [true, businessName];
			}

			/* 不需要lint */
			let isAllow = _.some(sepcial, business => {
				return scope.includes(business);
			});

			if (isAllow) {
				return [true, ""];
			}
			return [false];
		})();

		if (!isNameOk) {
			console.log(`${scope} 不在允许范围内：（查看static_vue2文件夹下的business_*******）`);
			console.table(allowBusiness);
			process.exit(1);
		}

		if (businessName) {
			await execCmd(`pnpm lint ${businessName}`);
			await execCmd(`git add .`);
		}
	}

	if (isFail) {
		isFail = !/Merge branch/.test(msg);
	}

	if (isFail) {
		console.log(`git commit message 格式错误:（本校验规则在 preprocess/githooks/commit-msg.js 中定义）
/^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release)(\(.+\))?: .{1,500}/

按照如下格式填写:
	特性(BUSINESS_NAME):描述(1-500个字符)
`);
		process.exit(1);
	}
	// process.exit(1);
})();
