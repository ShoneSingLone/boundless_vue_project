const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const { _n } = require("@ventose/utils-node");

const stdDecode = content => {
	content = iconv.decode(content, "gbk");
	return content.replace("\r", "").replace("\n", "");
};

exports.log = data => {
	console.log(stdDecode(data));
};

var val = (item, prop, val) => {
	item = item || {};
	const isVue2 = item._isVue;
	const fnVue$set = item.$set;
	if (!_.isString(prop)) {
		throw new Error("prop must be a string");
	}
	const propArray = prop.split(".");
	let key = "";
	let nextItem = item;

	const setVal = () => {
		while ((key = propArray.shift())) {
			/* 如果是最后一项，就赋值后退出 */
			if (propArray.length === 0) {
				if (isVue2) {
					fnVue$set(nextItem, key, val);
				} else {
					nextItem[key] = val;
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
	};

	const getVal = () => {
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
	};

	/* 如果有输入 */
	if (val !== undefined) {
		setVal(isVue2, key, propArray, nextItem, val);
	} else {
		return getVal(isVue2, key, propArray, nextItem);
	}
	return item;
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
				targetSource = source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf("</" + pickType + ">"));
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

exports.val = val;
exports._ = _;
exports.fs = fs;
exports.path = path;
exports.iconv = iconv;
exports.NEW_LINE = NEW_LINE;
exports._n = _n;
exports.stdDecode = stdDecode;
