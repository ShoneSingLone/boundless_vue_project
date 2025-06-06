const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const { _n } = require("@ventose/utils-node");
var exec = require("child_process").exec;

const DIRS_ARRAY = fs.readdirSync(path.resolve(__dirname, `../static_vue2`));

const APP_NAME_ARRAY = DIRS_ARRAY.reduce((target, dirname) => {
	const [, appName] = String(dirname).match(/business_(.*)/) || [];
	if (appName) {
		target.push(appName);
	}
	return target;
}, []);

exports.APP_NAME_ARRAY = APP_NAME_ARRAY;


function $val(item, prop, val, options = {}) {
	item = item || {};
	const isVue2 = item && item._isVue;
	const fnVue$set = item && item.$set;

	if (typeof prop != "string") {
		throw new Error("prop must be a string");
	}
	const propArray = prop.split(".");
	let key = "";
	let nextItem = item;

	/* 如果有输入 */
	if (val !== undefined) {
		setVal(isVue2, key, propArray, nextItem, val);
	}

	/* 明确是删除属性 */
	if (val == undefined && options && options.delete) {
		delVal(isVue2, key, propArray, nextItem, val);
	} else {
		return getVal(isVue2, key, propArray, nextItem);
	}

	function setVal() {
		while ((key = propArray.shift())) {
			/* 如果是最后一项，就赋值后退出 */
			if (propArray.length === 0) {
				if (isVue2 && fnVue$set) {
					fnVue$set(nextItem, key, val);
				} else {
					nextItem[key] = val;
				}
				return;
			} else {
				/* 继续循环，如果中间有undefined，添加中间项 */
				const _nextItem = nextItem[key];
				if (!_nextItem) {
					if (isVue2 && fnVue$set) {
						fnVue$set(nextItem, key, {});
					} else {
						nextItem[key] = {};
					}
				}
				nextItem = nextItem[key];
			}
		}
	}

	function delVal() {
		while ((key = propArray.shift())) {
			/* 如果是最后一项，就赋值后退出 */
			if (propArray.length === 0) {
				if (isVue2) {
					fnVue$set(nextItem, key, val);
				} else {
					if (Array.isArray(nextItem)) {
						nextItem.splice(key, 1);
					} else {
						delete nextItem[key];
					}
				}
				return;
			} else {
				/* 继续循环，如果中间有undefined，添加中间项 */
				const _nextItem = nextItem[key];
				if (!_nextItem) {
					if (isVue2) {
						fnVue$set(nextItem, key, {});
					} else {
						nextItem[key] = {};
					}
				}
				nextItem = nextItem[key];
			}
		}
	}

	function getVal() {
		while ((key = propArray.shift())) {
			const _nextItem = nextItem[key];
			if (!_nextItem) {
				return nextItem[key];
			} else {
				if (propArray.length === 0) {
					return _nextItem;
				} else {
					nextItem = nextItem[key];
				}
			}
		}
		return nextItem;
	}
	return item;
}
exports.$val = $val;

function log(message, options = {}) {
	message = stdDecode(message);
	console.log(message);
	if (options.log) {
		options.log(message);
	}
	return message;
}
exports.log = log;

async function execLog(cmd, options) {
	const log = content => {
		content = iconv.decode(content, "utf-8");
		console.log(
			"=================================\n",
			content,
			"\n================================="
		);
		return content.replace("\r", "").replace("\n", "");
	};

	return new Promise((resolve, reject) => {
		const result = exec(cmd, { maxBuffer: 1024 * 2000, encoding: "gbk" });
		result.stdout.on("data", data => {
			resolve(log(data));
		});
		result.stderr.on("data", data => {
			resolve(log(data));
		});
	});
}
exports.execLog = execLog;
function execCmd(cmd, options) {
	let startTime = Date.now();
	return new Promise((resolve, reject) => {
		const result = exec(cmd, { maxBuffer: 1024 * 2000, encoding: "gbk" });
		result.stdout.on("data", msg => log(msg, options));
		result.stderr.on("data", msg => log(msg, options));
		result.on("close", code => {
			const msg = `\n${cmd}\n=spend time ${(Date.now() - startTime) / 1000}s`;
			log(msg, options);
			resolve();
		});
	});
}

exports.execCmd = execCmd;

const stdDecode = content => {
	content = iconv.decode(content, "gbk");
	return content.replace("\r", "").replace("\n", "");
};


const NEW_LINE = "\r\n";

exports.VueLoader = function (sourceCodeString) {
	function getSource(source, pickType) {
		try {
			var regex = new RegExp(`<${pickType}[^(>|())]*>`);
			var openingTag = source.match(regex);
			var targetSource = "";
			if (!openingTag) {
				return [targetSource, {}];
			} else {
				openingTag = openingTag[0];
				targetSource = source.slice(
					source.indexOf(openingTag) + openingTag.length,
					source.lastIndexOf("</" + pickType + ">")
				);
			}
			/* TODO: jsx解析*/
			if (["template", "setup-render"].includes(pickType)) {
				targetSource = targetSource.replace(/`/g, "\\`");
			}
			return [targetSource];
		} catch (error) {
			console.error(error);
		}
	}

	function splitCode() {
		const [scritpSourceCode] = getSource(sourceCodeString, "script");
		const [templateSourceCode] = getSource(sourceCodeString, "template");
		const [styleSourceCode] = getSource(sourceCodeString, "style");
		const [setupRenderSourceCode, { scope }] = getSource(sourceCodeString, "setup-render");
		return {
			scritpSourceCode,
			templateSourceCode,
			styleSourceCode,
			setupRenderSourceCode
		};
	}

	return splitCode();
};

exports.$val = $val;
exports._ = _;
exports.fs = fs;
exports.path = path;
exports.iconv = iconv;
exports.NEW_LINE = NEW_LINE;
exports._n = _n;
exports.stdDecode = stdDecode;
