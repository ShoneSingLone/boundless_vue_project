const [action, APP_NAME] = process.argv.slice(2);
const makeApi = require("./api");
const makeOpts = require("./opts");
const makeReg = require("./reg");
const makeRules = require("./rules");
const makeComponents = require("./components");
const makeGlobalLodash = require("./globalLodash");
if (action === "api") {
	makeApi(APP_NAME);
} else if (action === "opts") {
	makeOpts(APP_NAME);
} else if (action === "rules") {
	makeRules();
} else if (action === "reg") {
	makeReg();
} else if (action === "components") {
	makeComponents();
} else if (action === "_") {
	makeGlobalLodash();
} else {
	makeRules();
	makeReg();
	makeComponents();
	makeGlobalLodash();
}
