const msgPath = process.env.HUSKY_GIT_PARAMS;
console.log("🚀:", "process.argv", process.env, process.args);
const msg = require("fs").readFileSync(msgPath, "utf-8").trim();
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;
if (!commitRE.test(msg)) {
	console.log(msg);
	process.exit(1);
}
