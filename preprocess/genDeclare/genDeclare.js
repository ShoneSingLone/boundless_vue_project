const { fs, path, VueLoader, _n, APP_NAME_ARRAY } = require("../preprocess.utils");
const [action, APP_NAME] = process.argv.slice(2);
const makeApi = require("./api");
const makeOpts = require("./opts");
const makeReg = require("./reg");
const makeRules = require("./rules");
const makeComponents = require("./components");
const makeGlobalLodash = require("./globalLodash");
if (action === "api") {
	makeApi({ APP_NAME });
} else if (action === "opts") {
	makeOpts({ APP_NAME });
} else if (action === "rules") {
	makeRules();
} else if (action === "reg") {
	makeReg();
} else if (action === "components") {
	makeComponents();
} else if (action === "_") {
	makeGlobalLodash();
} else {
	console.log("makeApi");
	makeApi({ APP_NAME_ARRAY });
	console.log("makeOpts");
	makeOpts({ APP_NAME_ARRAY });
	console.log("makeRules");
	makeRules();
	console.log("makeReg");
	makeReg();
	console.log("makeComponents");
	makeComponents();
	console.log("makeGlobalLodash");
	makeGlobalLodash();
}
