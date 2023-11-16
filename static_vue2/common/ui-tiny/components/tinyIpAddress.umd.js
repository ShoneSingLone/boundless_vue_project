(function (hooks) {
	"use strict";
	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null, {
			[Symbol.toStringTag]: { value: "Module" }
		});
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== "default") {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(
						n,
						k,
						d.get
							? d
							: {
									enumerable: true,
									get: function () {
										return e[k];
									}
							  }
					);
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}
	var hooks__namespace = /* @__PURE__ */ _interopNamespace(hooks);
	var __defProp = Object.defineProperty;
	var __defProps = Object.defineProperties;
	var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
	var __getOwnPropSymbols = Object.getOwnPropertySymbols;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __propIsEnum = Object.prototype.propertyIsEnumerable;
	var __defNormalProp = (obj, key, value) =>
		key in obj
			? __defProp(obj, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value
			  })
			: (obj[key] = value);
	var __spreadValues = (a, b) => {
		for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
		if (__getOwnPropSymbols)
			for (var prop of __getOwnPropSymbols(b)) {
				if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
			}
		return a;
	};
	var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
	const toString = Object.prototype.toString;
	const hasOwn = Object.prototype.hasOwnProperty;
	const getProto = Object.getPrototypeOf;
	const fnToString = hasOwn.toString;
	const ObjectFunctionString = fnToString.call(Object);
	const class2type = {
		"[object Error]": "error",
		"[object Object]": "object",
		"[object RegExp]": "regExp",
		"[object Date]": "date",
		"[object Array]": "array",
		"[object Function]": "function",
		"[object String]": "string",
		"[object Number]": "number",
		"[object Boolean]": "boolean"
	};
	const isNull = x => x === null || x === void 0;
	const typeOf = obj => (isNull(obj) ? String(obj) : class2type[toString.call(obj)] || "object");
	const isObject = obj => typeOf(obj) === "object";
	const isPlainObject = obj => {
		if (!obj || toString.call(obj) !== "[object Object]") {
			return false;
		}
		const proto = getProto(obj);
		if (!proto) {
			return true;
		}
		const Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
	};
	const isNumber = value => typeof value === "number" && isFinite(value);
	const isNumeric = value => value - parseFloat(value) >= 0;
	const isDate$1 = value => typeOf(value) === "date";
	const each = (obj, handle) => {
		if (typeof handle !== "function") {
			return;
		}
		for (const name in obj) {
			if (hasOwn.call(obj, name)) {
				if (handle(name, obj[name]) === false) {
					break;
				}
			}
		}
	};
	let extend;
	const getObj = (data, names, isExceptRoot) => {
		if (!data || !isPlainObject(data) || !names || typeof names !== "string") {
			return;
		}
		const nameArr = names.split(".");
		let obj = data;
		const len = nameArr.length;
		if (len > 1) {
			const startIndex = isExceptRoot ? 1 : 0;
			for (let i = startIndex; i < len; i++) {
				obj = obj[nameArr[i]];
				if (isNull(obj)) {
					return obj;
				}
			}
			return obj;
		} else {
			return obj[nameArr[0]];
		}
	};
	const setObj = (data, names, value, isMerge) => {
		if (!data || !isPlainObject(data) || !names || typeof names !== "string") {
			return data;
		}
		const nameArr = names.split(".");
		const obj = data;
		let len = nameArr.length;
		let item = nameArr[0];
		if (len > 1) {
			len--;
			let tmpl = obj;
			let name, target;
			for (let i = 0; i < len; i++) {
				name = nameArr[i];
				target = tmpl[name];
				if (target === null || !isPlainObject(target)) {
					tmpl[name] = {};
					target = tmpl[name];
				}
				tmpl = target;
			}
			item = nameArr[len];
			isMerge ? (isPlainObject(tmpl[item]) ? extend(true, tmpl[item], value) : (tmpl[item] = value)) : (tmpl[item] = value);
		} else {
			isMerge ? (isPlainObject(obj[item]) ? extend(true, obj[item], value) : (obj[item] = value)) : (obj[item] = value);
		}
		return obj;
	};
	const copyField = (data, fields, isMerge, isExclude) => {
		const setValue2 = (obj, result, name, key, isMerge2) => {
			const include = key.indexOf(name) === 0;
			const keySplit = key.split(name);
			const hasNextDot = keySplit[1] && keySplit[1].indexOf(".") === 0;
			if (name === key || (include && hasNextDot)) {
				if (name !== key) {
					each(getObj(obj, name), field => {
						setValue2(obj, result, `${name}.${field}`, key);
						return true;
					});
				}
			} else {
				if (fields && !fields.includes(name)) {
					setObj(result, name, getObj(obj, name), isMerge2);
				}
			}
		};
		const innerCopyFields = (obj, fields2, isMerge2, isExclude2) => {
			const result = {};
			if (isExclude2) {
				each(obj, name => fields2.forEach(key => setValue2(obj, result, name, key, isMerge2)));
			} else {
				fields2.forEach(field => setObj(result, field, getObj(obj, field), isMerge2));
			}
			return result;
		};
		if (isPlainObject(data)) {
			return Array.isArray(fields) ? innerCopyFields(data, fields, isMerge, isExclude) : extend(isMerge !== false, {}, data);
		}
		return data;
	};
	const copyArray = arr => {
		return Array.isArray(arr) ? arr.map(item => copyField(item)) : arr;
	};
	const deepCopy = (target, name, deep, copy, src) => {
		let copyIsArray;
		if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
			if (copyIsArray) {
				copyIsArray = false;
				target[name] = copyArray(copy);
			} else {
				const clone = src && isPlainObject(src) ? src : {};
				target[name] = extend(deep, clone, copy);
			}
		} else if (copy !== void 0) {
			try {
				target[name] = copy;
			} catch (e) {}
		}
	};
	extend = function (...args) {
		const length = args.length;
		let target = args[0] || {};
		let i = 1;
		let deep = false;
		if (typeOf(target) === "boolean") {
			deep = target;
			target = args[i] || {};
			i++;
		}
		if (!isObject(target) && typeOf(target) !== "function") {
			target = {};
		}
		for (; i < length; i++) {
			const options = args[i];
			if (options !== null && isObject(options)) {
				const names = Object.keys(options);
				for (const name of names) {
					const src = target[name];
					const copy = options[name];
					if (target !== copy) {
						deepCopy(target, name, deep, copy, src);
					}
				}
			}
		}
		return target;
	};
	const getIEVersion = () => {
		let version2 = 8;
		if (!!document.addEventListener && !!window.performance) {
			version2 = 9;
			if (!!window.atob && !!window.matchMedia) {
				version2 = 10;
				if (!window.attachEvent && !document.all) {
					version2 = 11;
				}
			}
		}
		return version2;
	};
	const isEdge = browser => {
		if (browser.chrome && ~navigator.userAgent.indexOf("Edg")) {
			browser.name = "edge";
			browser.edge = true;
			delete browser.chrome;
		} else if (!document.documentMode && !!window.StyleMedia) {
			browser.name = "edge";
			browser.edge = true;
		}
	};
	const isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
	(() => {
		const browser = {
			name: void 0,
			version: void 0,
			isDoc: typeof document !== "undefined",
			isMobile: false,
			isPC: true,
			isNode: typeof window === "undefined"
		};
		if (isBrowser) {
			const isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
			browser.isMobile = isMobile;
			browser.isPC = !isMobile;
			let matches;
			if (!!window.chrome && (!!window.chrome.webstore || /^Google\b/.test(window.navigator.vendor))) {
				browser.name = "chrome";
				browser.chrome = true;
				matches = navigator.userAgent.match(/chrome\/(\d+)/i);
				browser.version = !!matches && !!matches[1] && parseInt(matches[1], 10);
				matches = void 0;
			} else if (!!document.all || !!document.documentMode) {
				browser.name = "ie";
				browser.version = getIEVersion();
				browser.ie = true;
			} else if (typeof window.InstallTrigger !== "undefined") {
				browser.name = "firefox";
				browser.firefox = true;
			} else if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
				browser.name = "safari";
				browser.safari = true;
			} else if ((!!window.opr && !!window.opr.addons) || !!window.opera) {
				browser.name = "opera";
				browser.opera = true;
			}
			isEdge(browser);
			if (!~["ie", "chrome"].indexOf(browser.name)) {
				const reg = browser.name + "/(\\d+)";
				matches = navigator.userAgent.match(new RegExp(reg, "i"));
				browser.version = !!matches && !!matches[1] && parseInt(matches[1], 10);
				matches = void 0;
			}
			if (browser.isDoc) {
				const bodyEl = document.body || document.documentElement;
				["webkit", "khtml", "moz", "ms", "o"].forEach(core => {
					browser["-" + core] = !!bodyEl[core + "MatchesSelector"];
				});
			}
		}
		return browser;
	})();
	const BigInt = isBrowser ? window.BigInt : global.BigInt;
	function supportBigInt() {
		return typeof BigInt === "function";
	}
	function trimNumber(numStr) {
		let string = numStr.toString().trim();
		let negative = string.startsWith("-");
		if (negative) {
			string = string.slice(1);
		}
		string = string
			.replace(/(\.\d*[^0])0*$/, "$1")
			.replace(/\.0*$/, "")
			.replace(/^0+/, "");
		if (string.startsWith(".")) {
			string = "0".concat(string);
		}
		let trimStr = string || "0";
		let splitNumber = trimStr.split(".");
		let integerStr = splitNumber[0] || "0";
		let decimalStr = splitNumber[1] || "0";
		if (integerStr === "0" && decimalStr === "0") {
			negative = false;
		}
		let negativeStr = negative ? "-" : "";
		return {
			negative,
			negativeStr,
			trimStr,
			integerStr,
			decimalStr,
			fullStr: "".concat(negativeStr).concat(trimStr)
		};
	}
	function isE(number) {
		let str = String(number);
		return !isNaN(Number(str)) && ~str.indexOf("e");
	}
	function validateNumber(num) {
		if (typeof num === "number") {
			return !isNaN(num);
		}
		if (!num) {
			return false;
		}
		return /^\s*-?\d+(\.\d+)?\s*$/.test(num) || /^\s*-?\d+\.\s*$/.test(num) || /^\s*-?\.\d+\s*$/.test(num);
	}
	function getNumberPrecision(number) {
		let numStr = String(number);
		if (isE(number)) {
			let precision = Number(numStr.slice(numStr.indexOf("e-") + 2));
			let decimalMatch = numStr.match(/\.(\d+)/);
			if (decimalMatch === null || decimalMatch === void 0 ? void 0 : decimalMatch[1]) {
				precision += decimalMatch[1].length;
			}
			return precision;
		}
		return ~numStr.indexOf(".") && validateNumber(numStr) ? numStr.length - numStr.indexOf(".") - 1 : 0;
	}
	function num2str(number) {
		let numStr = String(number);
		if (isE(number)) {
			if (number > Number.MAX_SAFE_INTEGER) {
				return String(supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER);
			}
			if (number < Number.MIN_SAFE_INTEGER) {
				return String(supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER);
			}
			numStr = number.toFixed(getNumberPrecision(numStr));
		}
		return trimNumber(numStr).fullStr;
	}
	function pluginDecimal(decimal) {
		if (!decimal.add) {
			Object.assign(decimal, {
				add: decimal.plus,
				lessEquals: decimal.isLessThan,
				equals: decimal.isEqualTo
			});
		}
		return decimal;
	}
	const DecimalCls = {
		CLS: null
	};
	let setDecimalClass;
	function getMiniDecimal(value, decimal) {
		if (!DecimalCls.CLS) {
			setDecimalClass(decimal);
		}
		return pluginDecimal(new DecimalCls.CLS(value));
	}
	class BigIntDecimal {
		constructor(value) {
			if ((!value && value !== 0) || !String(value).trim()) {
				this.empty = true;
				return;
			}
			this.origin = String(value);
			this.negative = void 0;
			this.integer = void 0;
			this.decimal = void 0;
			this.decimalLen = void 0;
			this.empty = void 0;
			this.nan = void 0;
			if (value === "-") {
				this.nan = true;
				return;
			}
			let mergedValue = isE(value) ? Number(value) : value;
			if (typeof mergedValue !== "string") {
				num2str(mergedValue);
			}
			const f = Function;
			const convertBigInt = str => {
				const validStr = str.replace(/^0+/, "") || "0";
				return f(`return BigInt(${validStr})`)();
			};
			if (validateNumber(mergedValue)) {
				const trimRet = trimNumber(mergedValue);
				this.negative = trimRet.negative;
				const numbers = trimRet.trimStr.split(".");
				this.integer = numbers[0].indexOf("e") === -1 ? BigInt(numbers[0]) : numbers[0];
				const decimalStr = numbers[1] || "0";
				this.decimal = convertBigInt(decimalStr);
				this.decimalLen = decimalStr.length;
			} else {
				this.nan = true;
			}
		}
		getDecimalStr() {
			return this.decimal.toString().padStart(this.decimalLen, "0");
		}
		getIntegerStr() {
			return this.integer.toString();
		}
		getMark() {
			return this.negative ? "-" : "";
		}
		alignDecimal(decimalLength) {
			const string = `${this.getMark()}${this.getIntegerStr()}${this.getDecimalStr().padEnd(decimalLength, "0")}`;
			return BigInt(string);
		}
		add(value) {
			if (this.isInvalidate()) {
				return new BigIntDecimal(value);
			}
			const offsetObj = new BigIntDecimal(value);
			if (offsetObj.isInvalidate()) {
				return this;
			}
			const maxDecimalLength = Math.max(this.getDecimalStr().length, offsetObj.getDecimalStr().length);
			const offsetAlignedDecimal = offsetObj.alignDecimal(maxDecimalLength);
			const myAlignedDecimal = this.alignDecimal(maxDecimalLength);
			const valueStr = `${myAlignedDecimal + offsetAlignedDecimal}`;
			const { negativeStr: str, trimStr } = trimNumber(valueStr);
			const hydrateValueStr = `${str}${trimStr.padStart(maxDecimalLength + 1, "0")}`;
			return getMiniDecimal(`${hydrateValueStr.slice(0, -maxDecimalLength)}.${hydrateValueStr.slice(-maxDecimalLength)}`);
		}
		negate() {
			const clone = new BigIntDecimal(this.toString());
			clone.negative = !clone.negative;
			return clone;
		}
		isNaN() {
			return this.nan;
		}
		isEmpty() {
			return this.empty;
		}
		isInvalidate() {
			return this.isEmpty() || this.isNaN();
		}
		lessEquals(target) {
			return this.add(target.negate().toString()).toNumber() <= 0;
		}
		equals(target) {
			return this.toString() === (target && target.toString());
		}
		toNumber() {
			if (this.isNaN()) {
				return NaN;
			}
			return Number(this.toString());
		}
		toString(safe = true) {
			if (!safe) {
				return this.origin;
			}
			if (this.isInvalidate()) {
				return "";
			}
			return trimNumber(`${this.getMark()}${this.getIntegerStr()}.${this.getDecimalStr()}`).fullStr;
		}
	}
	class NumberDecimal {
		constructor(value = "") {
			if ((!value && value !== 0) || !String(value).trim()) {
				this.empty = true;
				return;
			}
			this.origin = "";
			this.number = void 0;
			this.empty = void 0;
			this.origin = String(value);
			this.number = Number(value);
		}
		negate() {
			return new NumberDecimal(-this.toNumber());
		}
		add(value) {
			if (this.isInvalidate()) {
				return new NumberDecimal(value);
			}
			const target = Number(value);
			if (isNaN(target)) {
				return this;
			}
			const number = this.number + target;
			if (number < Number.MIN_SAFE_INTEGER) {
				return new NumberDecimal(Number.MIN_SAFE_INTEGER);
			}
			if (number > Number.MAX_SAFE_INTEGER) {
				return new NumberDecimal(Number.MAX_SAFE_INTEGER);
			}
			const maxPrecision = Math.max(getNumberPrecision(target), getNumberPrecision(this.number));
			return new NumberDecimal(number.toFixed(maxPrecision));
		}
		isNaN() {
			return isNaN(this.number);
		}
		isEmpty() {
			return this.empty;
		}
		isInvalidate() {
			return this.isEmpty() || this.isNaN();
		}
		equals(target) {
			return this.toNumber() === (target && target.toNumber());
		}
		lessEquals(target) {
			return this.add(target.negate().toString()).toNumber() <= 0;
		}
		toNumber() {
			return this.number;
		}
		toString(safe = true) {
			if (!safe) {
				return this.origin;
			}
			if (this.isInvalidate()) {
				return "";
			}
			return num2str(this.number);
		}
	}
	setDecimalClass = function (decimaljs) {
		DecimalCls.CLS = supportBigInt() ? BigIntDecimal : typeof decimaljs === "function" ? decimaljs : NumberDecimal;
	};
	function toFixed(numStr, precision, rounding = 5) {
		if (numStr === "") {
			return "";
		}
		const separatorStr = ".";
		const { negativeStr, integerStr, decimalStr } = trimNumber(numStr);
		const precisionDecimalStr = `${separatorStr}${decimalStr}`;
		const numberWithoutDecimal = `${negativeStr}${integerStr}`;
		if (precision >= 0) {
			const advancedNum = Number(decimalStr[precision]);
			if (advancedNum >= rounding && rounding !== 0) {
				const advancedDecimal = getMiniDecimal(`${integerStr}${separatorStr}${decimalStr}`).add(`0.${fillChar("", precision, true)}${10 - advancedNum}`);
				return toFixed(negativeStr + advancedDecimal.toString(), precision, 0);
			}
			if (precision === 0) {
				return numberWithoutDecimal;
			}
			return `${numberWithoutDecimal}${separatorStr}${fillChar(decimalStr, precision, true).slice(0, precision)}`;
		}
		if (precisionDecimalStr === ".0") {
			return numberWithoutDecimal;
		}
		return `${numberWithoutDecimal}${precisionDecimalStr}`;
	}
	const formatInteger = (value, { secondaryGroupSize = 3, groupSize = 0, groupSeparator = "," }) => {
		const negative = /^-\d+/.test(value);
		let result = negative ? value.slice(1) : value;
		const secSize = secondaryGroupSize || groupSize;
		if (groupSize && result.length > groupSize) {
			let left = result.slice(0, 0 - groupSize);
			const right = result.slice(0 - groupSize);
			left = left.replace(new RegExp(`\\B(?=(\\d{${secSize}})+(?!\\d))`, "g"), groupSeparator);
			result = `${left}${groupSeparator}${right}`;
		}
		return `${negative ? "-" : ""}${result}`;
	};
	const reverseString = str => {
		const arr = [];
		for (let i = 0; i < str.length; i++) {
			arr.push(str[i]);
		}
		return arr.reverse().join("");
	};
	const formatDecimal = (num, { fractionGroupSize = 0, fractionGroupSeparator = "\xA0" }) => {
		const RE = new RegExp(`\\B(?=(\\d{${fractionGroupSize}})+(?!\\d))`, "g");
		return reverseString(reverseString(num).replace(RE, fractionGroupSeparator));
	};
	const formatNumber = (value, format2 = {}) => {
		const { fraction, rounding, prefix = "", decimalSeparator = ".", suffix = "" } = format2;
		let reslut = getMiniDecimal(value);
		if (reslut.isNaN() || !reslut.toString()) {
			return value;
		}
		reslut = toFixed(reslut.toString(), fraction, rounding);
		format2.zeroize === false && reslut.match(/\./) && (reslut = reslut.replace(/\.?0+$/g, ""));
		const number = reslut
			.toString()
			.split(".")
			.slice(0, 2)
			.map((str, index2) => (index2 ? formatDecimal(str, format2) : formatInteger(str, format2)))
			.join(decimalSeparator);
		return `${prefix}${number}${suffix}`;
	};
	const recoverNumber = (number, format2 = {}) => {
		const { prefix = "", suffix = "", decimalSeparator = "." } = format2;
		let result = number;
		if (typeof number === "string") {
			result = number
				.replace(new RegExp(`^${prefix}(.+)${suffix}$`), ($1, $2) => $2)
				.split(decimalSeparator)
				.map(s => s.replace(/[^\d]/g, ""))
				.join(".");
		}
		return Number(result);
	};
	function cached(fn) {
		let cache = /* @__PURE__ */ Object.create(null);
		return function cachedFn(str) {
			const hit = cache[str];
			return hit || (cache[str] = fn(str));
		};
	}
	const hyphenateRE = /\B([A-Z])/g;
	const hyphenate = cached(str => str.replace(hyphenateRE, "-$1").toLowerCase());
	const fillChar = (string, length, append, chr = "0") => {
		if (typeof string === "string" && typeof chr === "string" && isNumber(length)) {
			let len = string.length - length;
			if (len > 0) {
				return append ? string.substr(0, length) : string.substr(len, length);
			} else {
				const appendStr = [];
				len = Math.abs(len) / chr.length;
				for (; len > 0; len--) {
					appendStr.push(chr);
				}
				const s = appendStr.join("");
				return append ? string + s : s + string;
			}
		}
	};
	const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const yyyymmddReg = new RegExp(
		"^(\\d{4})(/|-)(((0)?[1-9])|(1[0-2]))((/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1])))?( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$"
	);
	const mmddyyyyReg = new RegExp(
		"^(((0)?[1-9])|(1[0-2]))(/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1]))?(/|-)?(\\d{4})( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$"
	);
	const iso8601Reg = new RegExp(
		"^(\\d{4})-(((0)?[1-9])|(1[0-2]))-(((0)?[1-9])|([1-2][0-9])|(3[0-1]))T(((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?(Z|([+-])((0)?[0-9]|1[0-9]|20|21|22|23):?([0-5]?[0-9]))$"
	);
	const maxDateValues = {
		YEAR: 9999,
		MONTH: 11,
		DATE: 31,
		HOUR: 23,
		MINUTE: 59,
		SECOND: 59,
		MILLISECOND: 999
	};
	const timezone1 = "-12:00,-11:00,-10:00,-09:30,-08:00,-07:00,-06:00,-05:00,-04:30,-04:00,-03:30,-02:00,-01:00";
	const timezone2 = "-00:00,+00:00,+01:00,+02:00,+03:00,+03:30,+04:00,+04:30,+05:00,+05:30,+05:45,+06:00";
	const timezone3 = "+06:30,+07:00,+08:00,+09:00,+10:00,+10:30,+11:00,+11:30,+12:00,+12:45,+13:00,+14:00";
	const timezones = [].concat(timezone1.split(","), timezone2.split(","), timezone3.split(","));
	const isLeapYear = year => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
	const getDateFromData = ({ year, month, date, hours, minutes, seconds, milliseconds }) => {
		let daysInMonth = daysInMonths[month];
		if (isLeapYear(year) && month === 1) {
			daysInMonth += 1;
		}
		if (date <= daysInMonth) {
			return new Date(year, month, date, hours, minutes, seconds, milliseconds);
		}
	};
	const yyyymmddDateParser = m => {
		if (m.length === 23) {
			const year = Number(m[1]);
			const month = m[3] - 1;
			const date = Number(m[9] || 1);
			const hours = m[15] || 0;
			const minutes = m[17] || 0;
			const seconds = m[20] || 0;
			const milliseconds = m[22] || 0;
			return getDateFromData({
				date,
				year,
				hours,
				month,
				seconds,
				minutes,
				milliseconds
			});
		}
	};
	const mmddyyyyDateParser = m => {
		if (m.length === 22) {
			const year = Number(m[12]);
			const month = m[1] - 1;
			const date = Number(m[6] || 1);
			const hours = m[14] || 0;
			const minutes = m[16] || 0;
			const seconds = m[19] || 0;
			const milliseconds = m[21] || 0;
			return getDateFromData({
				year,
				month,
				date,
				hours,
				minutes,
				seconds,
				milliseconds
			});
		}
	};
	const iso8601DateParser = m => {
		if (m.length !== 25) {
			return;
		}
		const year = Number(m[1]);
		const month = m[2] - 1;
		const date = Number(m[6]);
		const offset = new Date(year, month, date).getTimezoneOffset();
		const hours = m[12] || 0;
		const minutes = m[14] || 0;
		const seconds = m[17] || 0;
		const milliseconds = m[19] || 0;
		let timeZone = m[20];
		const sign = m[21];
		const offsetHours = m[22] || 0;
		const offsetMinutes = m[24] || 0;
		let daysInMonth = daysInMonths[month];
		let actHours;
		let actMinutes;
		if (isLeapYear(year) && month === 1) {
			daysInMonth += 1;
		}
		if (date <= daysInMonth) {
			if (timeZone === "Z") {
				actHours = hours - offset / 60;
				actMinutes = minutes;
			} else {
				if (!timeZone.includes(":")) {
					timeZone = timeZone.substr(0, 3) + ":" + timeZone.substr(3);
				}
				if (!timezones.includes(timeZone)) {
					return;
				}
				actHours = sign === "+" ? hours - offsetHours - offset / 60 : Number(hours) + Number(offsetHours) - offset / 60;
				actMinutes = sign === "+" ? minutes - offsetMinutes : Number(minutes) + Number(offsetMinutes);
			}
			return new Date(year, month, date, actHours, actMinutes, seconds, milliseconds);
		}
	};
	const dateParsers = [
		[yyyymmddReg, yyyymmddDateParser],
		[mmddyyyyReg, mmddyyyyDateParser],
		[iso8601Reg, iso8601DateParser]
	];
	const parseDate = str => {
		for (let i = 0, len = dateParsers.length; i < len; i++) {
			const m = dateParsers[i][0].exec(str);
			if (m && m.length > 0) {
				return dateParsers[i][1](m);
			}
		}
	};
	const matchDateArray = (arr, value, text) => {
		if (text) {
			switch (text) {
				case "yyyy":
				case "yy":
					arr[0] = value;
					break;
				case "M":
				case "MM":
					arr[1] = value - 1;
					break;
				case "d":
				case "dd":
					arr[2] = value;
					break;
				case "h":
				case "hh":
					arr[3] = value;
					break;
				case "m":
				case "mm":
					arr[4] = value;
					break;
				case "s":
				case "ss":
					arr[5] = value;
					break;
				case "S":
				case "SS":
				case "SSS":
					arr[6] = value;
					break;
			}
		}
	};
	const getDateArray = (str, dateFormat) => {
		const arr = [0, -1, 0, 0, 0, 0];
		if (str.length !== dateFormat.length) {
			return arr;
		}
		let valuePos = 0;
		let textPos = 0;
		for (let i = 0, len = str.length; i < len; i++) {
			const charValue = str.substr(i, 1);
			const notNum = isNaN(Number(charValue)) || charValue.trim() === "";
			if ((notNum && charValue === dateFormat.substr(i, 1)) || i === len - 1) {
				let value;
				let text;
				if (notNum) {
					value = str.substring(valuePos, i);
					valuePos = i + 1;
					const end = dateFormat.indexOf(charValue, textPos);
					text = dateFormat.substring(textPos, end === -1 ? dateFormat.length : end);
					textPos = end + 1;
				} else {
					value = str.substring(valuePos, len);
					text = dateFormat.substring(textPos, len);
				}
				if (value.length === text.length || value) {
					matchDateArray(arr, value, text);
				}
			}
		}
		return arr;
	};
	const invalideTime = (time, min, max) => isNaN(time) || time < min || time > max;
	const invalideValue = ({ year, month, date, hours, minutes, seconds, milliseconds }) =>
		invalideTime(year, 0, maxDateValues.YEAR) ||
		invalideTime(month, 0, maxDateValues.MONTH) ||
		invalideTime(date, 0, maxDateValues.DATE) ||
		invalideTime(hours, 0, maxDateValues.HOUR) ||
		invalideTime(minutes, 0, maxDateValues.MINUTE) ||
		invalideTime(seconds, 0, maxDateValues.SECOND) ||
		invalideTime(milliseconds, 0, maxDateValues.MILLISECOND);
	const innerParse = (value, dateFormat) => {
		if (typeof dateFormat === "string") {
			const arr = getDateArray(value, dateFormat);
			const year = Number(arr[0]);
			const month = Number(arr[1]);
			const date = Number(arr[2] || 1);
			const hours = Number(arr[3] || 0);
			const minutes = Number(arr[4] || 0);
			const seconds = Number(arr[5] || 0);
			const milliseconds = Number(arr[6] || 0);
			if (
				invalideValue({
					year,
					month,
					date,
					hours,
					minutes,
					seconds,
					milliseconds
				})
			) {
				return;
			}
			return getDateFromData({
				year,
				date,
				month,
				minutes,
				hours,
				milliseconds,
				seconds
			});
		} else {
			return parseDate(value);
		}
	};
	const toDate$1 = (value, dateFormat, minDate) => {
		let date;
		if (isNumber(value)) {
			date = new Date(value);
		} else if (typeof value === "string") {
			date = innerParse(value, dateFormat);
		}
		if (minDate) {
			const min = (minDate && toDate$1(minDate)) || new Date(1, 1, 1, 0, 0, 0);
			return date && date < min ? min : date;
		}
		return date;
	};
	const getDateWithNewTimezone = (date, otz, ntz) => {
		if (!isDate$1(date) || !isNumeric(otz) || !isNumeric(ntz)) {
			return;
		}
		const otzOffset = -otz * 60;
		const ntzOffset = -ntz * 60;
		const utc = date.getTime() + otzOffset * 6e4;
		return new Date(utc - ntzOffset * 6e4);
	};
	const KEY_CODE = {
		Backspace: 8,
		Tab: 9,
		Clear: 12,
		Enter: 13,
		Shift: 16,
		Control: 17,
		Alt: 18,
		CapsLock: 20,
		Escape: 27,
		Space: 32,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		ArrowLeft: 37,
		ArrowUp: 38,
		ArrowRight: 39,
		ArrowDown: 40,
		Insert: 45,
		Delete: 46,
		Colon: 58,
		Semicolon: 59,
		LessThan: 60,
		Equals: 61,
		GreaterThan: 62,
		QuestionMark: 63,
		AtMark: 64,
		KeyA: 65,
		KeyB: 66,
		KeyC: 67,
		KeyD: 68,
		KeyE: 69,
		KeyF: 70,
		KeyG: 71,
		KeyH: 72,
		KeyI: 73,
		KeyJ: 74,
		KeyK: 75,
		KeyL: 76,
		KeyM: 77,
		KeyN: 78,
		KeyO: 79,
		KeyP: 80,
		KeyQ: 81,
		KeyR: 82,
		KeyS: 83,
		KeyT: 84,
		KeyU: 85,
		KeyV: 86,
		KeyW: 87,
		KeyX: 88,
		KeyY: 89,
		KeyZ: 90,
		Digit0: 48,
		Digit1: 49,
		Digit2: 50,
		Digit3: 51,
		Digit4: 52,
		Digit5: 53,
		Digit6: 54,
		Digit7: 55,
		Digit8: 56,
		Digit9: 57,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		NumLock: 144,
		Numpad0: 96,
		Numpad1: 97,
		Numpad2: 98,
		Numpad3: 99,
		Numpad4: 100,
		Numpad5: 101,
		Numpad6: 102,
		Numpad7: 103,
		Numpad8: 104,
		Numpad9: 105,
		NumpadMultiply: 106,
		NumpadAdd: 107,
		NumpadEnter: 13,
		NumpadSubtract: 109,
		NumpadDecimal: 110,
		NumpadDivide: 111,
		NumpadComma: 190
	};
	const IPTHRESHOLD = { Min: 0, Max: 255, NonNumeric: 25 };
	const TriggerTypes = "date,datetime,time,time-select,week,month,year,years,yearrange,daterange,monthrange,timerange,datetimerange,dates";
	const DATEPICKER = {
		Day: "day",
		Date: "date",
		Dates: "dates",
		Year: "year",
		Years: "years",
		YearRange: "yearrange",
		PanelYearNum: 12,
		Month: "month",
		Week: "week",
		Normal: "normal",
		Today: "today",
		PreMonth: "pre-month",
		NextMonth: "next-month",
		YearI18n: "ui.datepicker.year",
		List: [38, 40, 37, 39],
		YearObj: { 38: -4, 40: 4, 37: -1, 39: 1 },
		WeekObj: { 38: -1, 40: 1, 37: -1, 39: 1 },
		DayObj: { 38: -7, 40: 7, 37: -1, 39: 1 },
		Aviailable: "available",
		Default: "default",
		Current: "current",
		InRange: "in-range",
		StartDate: "start-date",
		EndDate: "end-date",
		Selected: "selected",
		Disabled: "disabled",
		Range: "range",
		fullMonths: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
		fullWeeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		MonhtList: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
		Weeks: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
		PlacementMap: {
			left: "bottom-start",
			center: "bottom",
			right: "bottom-end"
		},
		TriggerTypes: TriggerTypes.split(","),
		DateFormats: {
			year: "yyyy",
			years: "yyyy",
			yearrange: "yyyy",
			month: "yyyy-MM",
			time: "HH:mm:ss",
			week: "yyyywWW",
			date: "yyyy-MM-dd",
			timerange: "HH:mm:ss",
			monthrange: "yyyy-MM",
			daterange: "yyyy-MM-dd",
			datetime: "yyyy-MM-dd HH:mm:ss",
			datetimerange: "yyyy-MM-dd HH:mm:ss"
		},
		Time: "time",
		TimeRange: "timerange",
		IconTime: "icon-time",
		IconDate: "icon-Calendar",
		DateRange: "daterange",
		DateTimeRange: "datetimerange",
		MonthRange: "monthrange",
		TimeSelect: "time-select",
		TimesTamp: "timestamp",
		DateTime: "datetime",
		SelectbaleRange: "selectableRange",
		Start: "09:00",
		End: "18:00",
		Step: "00:30",
		CompareOne: "-1:-1",
		CompareHundred: "100:100",
		selClass: ".selected",
		queryClass: ".tiny-picker-panel__content",
		disableClass: ".time-select-item:not(.disabled)",
		defaultClass: ".default",
		Qurtyli: "li",
		MappingKeyCode: { 40: 1, 38: -1 },
		DatePicker: "DatePicker",
		TimePicker: "TimePicker"
	};
	const fecha = {};
	const digitsReg = ["\\d\\d?", "\\d{3}", "\\d{4}"];
	const twoDigits = digitsReg[0];
	const threeDigits = digitsReg[1];
	const fourDigits = digitsReg[2];
	const word = "[^\\s]+";
	const literal = /\[([^]*?)\]/gm;
	const noop = () => void 0;
	const formats = {
		shortDate: "M/D/yy",
		mediumDate: "MMM d, yyyy",
		longDate: "MMMM d, yyyy",
		fullDate: "dddd, MMMM d, yyyy",
		default: "ddd MMM dd yyyy HH:mm:ss",
		shortTime: "HH:mm",
		mediumTime: "HH:mm:ss",
		longTime: "HH:mm:ss.SSS"
	};
	const shorten = (arr, sLen) => {
		let newArr = [];
		for (let i = 0, len = arr.length; i < len; i++) {
			newArr.push(arr[i].substr(0, sLen));
		}
		return newArr;
	};
	const monthUpdate = arrName => (date, value, i18n) => {
		const index2 = i18n[arrName].indexOf(value.charAt(0).toUpperCase() + value.substr(1).toLowerCase());
		if (~index2) {
			date.month = index2;
		}
	};
	const pad = (val, len) => {
		val = String(val);
		len = len || 2;
		while (val.length < len) {
			val = "0" + val;
		}
		return val;
	};
	const regexEscape = str => str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
	const fullTimeReg = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
	const dayNames = DATEPICKER.fullWeeks;
	const monthNames = DATEPICKER.fullMonths;
	const monthNamesShort = shorten(monthNames, 3);
	const dayNamesShort = shorten(dayNames, 3);
	const parts = ["th", "st", "nd", "rd"];
	fecha.i18n = {
		dayNames,
		monthNames,
		dayNamesShort,
		monthNamesShort,
		amPm: ["am", "pm"],
		doFn: D => D + parts[D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10]
	};
	const formatFlags = {
		D: dateObj => dateObj.getDay(),
		DD: dateObj => pad(dateObj.getDay()),
		Do: (dateObj, i18n) => i18n.doFn(dateObj.getDate()),
		d: dateObj => dateObj.getDate(),
		dd: dateObj => pad(dateObj.getDate()),
		ddd: (dateObj, i18n) => i18n.dayNamesShort[dateObj.getDay()],
		dddd: (dateObj, i18n) => i18n.dayNames[dateObj.getDay()],
		M: dateObj => dateObj.getMonth() + 1,
		MM: dateObj => pad(dateObj.getMonth() + 1),
		MMM: (dateObj, i18n) => i18n.monthNamesShort[dateObj.getMonth()],
		MMMM: (dateObj, i18n) => i18n.monthNames[dateObj.getMonth()],
		yy: dateObj => pad(String(dateObj.getFullYear()), 4).substr(2),
		yyyy: dateObj => pad(dateObj.getFullYear(), 4),
		h: dateObj => dateObj.getHours() % 12 || 12,
		hh: dateObj => pad(dateObj.getHours() % 12 || 12),
		H: dateObj => dateObj.getHours(),
		HH: dateObj => pad(dateObj.getHours()),
		m: dateObj => dateObj.getMinutes(),
		mm: dateObj => pad(dateObj.getMinutes()),
		s: dateObj => dateObj.getSeconds(),
		ss: dateObj => pad(dateObj.getSeconds()),
		S: dateObj => Math.round(dateObj.getMilliseconds() / 100),
		SS: dateObj => pad(Math.round(dateObj.getMilliseconds() / 10), 2),
		SSS: dateObj => pad(dateObj.getMilliseconds(), 3),
		a: (dateObj, i18n) => (dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1]),
		A: (dateObj, i18n) => (dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase()),
		ZZ: dateObj => {
			const offset = dateObj.getTimezoneOffset();
			return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60), 4);
		}
	};
	const parseFlags = {
		d: [
			twoDigits,
			(date, value) => {
				date.day = value;
			}
		],
		Do: [
			twoDigits + word,
			(date, value) => {
				date.day = parseInt(value, 10);
			}
		],
		M: [
			twoDigits,
			(date, value) => {
				date.month = value - 1;
			}
		],
		yy: [
			twoDigits,
			(date, value) => {
				const now = /* @__PURE__ */ new Date();
				const cent = Number(String(now.getFullYear()).substr(0, 2));
				date.year = String(value > 68 ? cent - 1 : cent) + value;
			}
		],
		h: [
			twoDigits,
			(date, value) => {
				date.hour = value;
			}
		],
		m: [
			twoDigits,
			(date, value) => {
				date.minute = value;
			}
		],
		s: [
			twoDigits,
			(date, value) => {
				date.second = value;
			}
		],
		yyyy: [
			fourDigits,
			(date, value) => {
				date.year = value;
			}
		],
		S: [
			"\\d",
			(date, value) => {
				date.millisecond = value * 100;
			}
		],
		SS: [
			"\\d{2}",
			(date, value) => {
				date.millisecond = value * 10;
			}
		],
		SSS: [
			threeDigits,
			(date, value) => {
				date.millisecond = value;
			}
		],
		D: [twoDigits, noop],
		ddd: [word, noop],
		MMM: [word, monthUpdate("monthNamesShort")],
		MMMM: [word, monthUpdate("monthNames")],
		a: [
			word,
			(date, value, i18n) => {
				const val = value.toLowerCase();
				if (val === i18n.amPm[0]) {
					date.isPm = false;
				} else if (val === i18n.amPm[1]) {
					date.isPm = true;
				}
			}
		],
		ZZ: [
			"[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",
			(date, value) => {
				let parts2 = String(value).match(/([+-]|\d\d)/gi);
				let minutes;
				if (parts2) {
					minutes = Number(parts2[1] * 60) + parseInt(parts2[2], 10);
					date.timezoneOffset = parts2[0] === "+" ? minutes : -minutes;
				}
			}
		]
	};
	const fmts = ["A", "DD", "dd", "mm", "hh", "MM", "ss", "hh", "H", "HH"];
	fecha.masks = formats;
	parseFlags.dddd = parseFlags.ddd;
	fmts.forEach(name => {
		if (name === "MM") {
			parseFlags[name] = parseFlags[name.substr(0, 1)];
		} else {
			parseFlags[name] = parseFlags[name.substr(0, 1).toLowerCase()];
		}
	});
	fecha.format = (dateObj, mask, i18nSettings) => {
		const i18n = i18nSettings || fecha.i18n;
		if (typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		if (!isDate$1(dateObj) || isNaN(dateObj.getTime())) {
			throw new Error("Invalid Date in fecha.format");
		}
		mask = fecha.masks[mask] || mask || fecha.masks.default;
		let literals = [];
		mask = mask.replace(literal, ($0, $1) => {
			literals.push($1);
			return "@@@";
		});
		mask = mask.replace(fullTimeReg, $0 => ($0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1)));
		return mask.replace(/@@@/g, () => literals.shift());
	};
	const getNewFormat = (format2, parseInfo) => {
		let literals = [];
		let newFormat = regexEscape(format2).replace(fullTimeReg, $0 => {
			if (parseFlags[$0]) {
				const info = parseFlags[$0];
				parseInfo.push(info[1]);
				return "(" + info[0] + ")";
			}
			return $0;
		});
		newFormat = newFormat.replace(/@@@/g, () => literals.shift());
		return newFormat;
	};
	const getDate = dateInfo => {
		let date;
		const today = /* @__PURE__ */ new Date();
		if (!isNull(dateInfo.timezoneOffset)) {
			dateInfo.minute = Number(dateInfo.minute || 0) - Number(dateInfo.timezoneOffset);
			const { year, month, day, hour, minute, second, millisecond } = dateInfo;
			date = new Date(Date.UTC(year || today.getFullYear(), month || 0, day || 1, hour || 0, minute || 0, second || 0, millisecond || 0));
		} else {
			const { year, month, day, hour, minute, second, millisecond } = dateInfo;
			date = new Date(year || today.getFullYear(), month || 0, day || 1, hour || 0, minute || 0, second || 0, millisecond || 0);
		}
		return date;
	};
	fecha.parse = (dateStr, format2, i18nSettings) => {
		const i18n = i18nSettings || fecha.i18n;
		if (typeof format2 !== "string") {
			throw new TypeError("Invalid format in fecha.parse");
		}
		format2 = fecha.masks[format2] || format2;
		if (dateStr.length > 1e3) {
			return null;
		}
		let dateInfo = {};
		let parseInfo = [];
		format2 = format2.replace(literal, ($0, $1) => {
			return "@@@";
		});
		const newFormat = getNewFormat(format2, parseInfo);
		const matches = dateStr.match(new RegExp(newFormat, "i"));
		if (!matches) {
			return null;
		}
		for (let i = 1, len = matches.length; i < len; i++) {
			parseInfo[i - 1](dateInfo, matches[i], i18n);
		}
		if (dateInfo.isPm === true && !isNull(dateInfo.hour) && Number(dateInfo.hour) !== 12) {
			dateInfo.hour = Number(dateInfo.hour) + 12;
		} else if (dateInfo.isPm === false && Number(dateInfo.hour) === 12) {
			dateInfo.hour = 0;
		}
		return getDate(dateInfo);
	};
	var date_default = fecha;
	const weeks = DATEPICKER.Weeks;
	const months = DATEPICKER.MonhtList;
	const defaultYMD = DATEPICKER.DateFormats.date;
	const getI18nSettings = t2 => ({
		dayNamesShort: weeks.map(week => t2(`ui.datepicker.weeks.${week}`)),
		dayNames: weeks.map(week => t2(`ui.datepicker.weeks.${week}`)),
		monthNamesShort: months.map(month => t2(`ui.datepicker.months.${month}`)),
		monthNames: months.map((month, index2) => t2(`ui.datepicker.month${index2 + 1}`)),
		amPm: ["am", "pm"]
	});
	const isDate = function (date) {
		if (isNull(date)) {
			return false;
		}
		if (isNaN(new Date(date).getTime())) {
			return false;
		}
		if (Array.isArray(date)) {
			return false;
		}
		return true;
	};
	const toDate = date => (isDate(date) ? new Date(date) : null);
	const formatDate = (date, format2, t2) => {
		date = toDate(date);
		if (!date) {
			return "";
		}
		return date_default.format(date, format2 || defaultYMD, getI18nSettings(t2));
	};
	function _extends$2() {
		_extends$2 = Object.assign
			? Object.assign.bind()
			: function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
					return target;
			  };
		return _extends$2.apply(this, arguments);
	}
	var zhCN$1 = {
		"en-US": "English",
		"zh-CN": "\u4E2D\u6587",
		"zh-TW": "\u4E2D\u56FD\u53F0\u6E7E",
		hello: "\u4F60\u597D {name}",
		code: "zh-CN",
		ui: {
			buttonMessage: {
				cancel: "\u53D6\u6D88",
				confirm: "\u786E\u5B9A"
			},
			wizard: {
				previousStep: "\u4E0A\u4E00\u6B65",
				nextStep: "\u4E0B\u4E00\u6B65",
				save: "\u4FDD\u5B58",
				submit: "\u63D0\u4EA4"
			},
			linkMenu: {
				title: "\u6D88\u606F",
				placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u8FC7\u6EE4...",
				sure: "\u786E\u5B9A",
				cancel: "\u53D6\u6D88"
			},
			todoList: {
				add: "\u63D0\u4EA4",
				placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9..."
			},
			alert: {
				error: "\u9519\u8BEF",
				info: "\u6D88\u606F",
				success: "\u6210\u529F",
				title: "\u6D88\u606F\u63D0\u793A",
				warning: "\u8B66\u544A"
			},
			amount: {
				currency: "\u5E01\u79CD",
				amount: "\u91D1\u989D",
				date: "\u65E5\u671F"
			},
			actionMenu: {
				moreText: "\u66F4\u591A"
			},
			base: {
				all: "\u5168\u90E8",
				cancel: "\u53D6\u6D88",
				confirm: "\u786E\u5B9A",
				delete: "\u5220\u9664",
				edit: "\u7F16\u8F91",
				more: "\u66F4\u591A",
				reset: "\u91CD\u7F6E"
			},
			button: {
				cancel: "\u53D6\u6D88",
				confirm: "\u786E\u8BA4"
			},
			cell: {
				placeholder: "\u8BF7\u9009\u62E9"
			},
			cascader: {
				noMatch: "\u65E0\u5339\u914D\u6570\u636E",
				loading: "\u52A0\u8F7D\u4E2D",
				placeholder: "\u8BF7\u9009\u62E9",
				noData: "\u6682\u65E0\u6570\u636E"
			},
			chart: {
				auxiliary: "\u8F85\u52A9",
				emptyText: "\u6682\u65E0\u6570\u636E",
				kName: "\u65E5K",
				other: "\u5176\u4ED6",
				summation: "\u603B\u91CF",
				total: "\u603B\u8BA1",
				value: "\u6570\u503C"
			},
			colorSelectPanel: {
				confirm: "\u9009\u62E9",
				cancel: "\u53D6\u6D88",
				predefine: "\u9884\u5B9A\u4E49\u989C\u8272",
				history: "\u5386\u53F2\u8BB0\u5F55",
				empty: "\u6682\u65E0"
			},
			creditCardForm: {
				submit: "\u63D0\u4EA4"
			},
			crop: {
				cropImage: "\u56FE\u7247\u88C1\u526A",
				croppedImage: "\u88C1\u526A\u540E\u56FE\u50CF"
			},
			datepicker: {
				clear: "\u6E05\u7A7A",
				cancel: "\u53D6\u6D88",
				endDate: "\u7ED3\u675F\u65E5\u671F",
				confirm: "\u786E\u5B9A",
				month: "\u6708",
				endTime: "\u7ED3\u675F\u65F6\u95F4",
				month2: "2 \u6708",
				month1: "1 \u6708",
				month4: "4 \u6708",
				month3: "3 \u6708",
				month6: "6 \u6708",
				month5: "5 \u6708",
				month8: "8 \u6708",
				month7: "7 \u6708",
				month10: "10 \u6708",
				month9: "9 \u6708",
				month12: "12 \u6708",
				month11: "11 \u6708",
				months: {
					feb: "\u4E8C\u6708",
					jan: "\u4E00\u6708",
					apr: "\u56DB\u6708",
					mar: "\u4E09\u6708",
					jun: "\u516D\u6708",
					may: "\u4E94\u6708",
					aug: "\u516B\u6708",
					jul: "\u4E03\u6708",
					oct: "\u5341\u6708",
					sep: "\u4E5D\u6708",
					dec: "\u5341\u4E8C\u6708",
					nov: "\u5341\u4E00\u6708"
				},
				nextYear: "\u540E\u4E00\u5E74",
				nextMonth: "\u4E0B\u4E2A\u6708",
				prevMonth: "\u4E0A\u4E2A\u6708",
				now: "\u6B64\u523B",
				selectDate: "\u9009\u62E9\u65E5\u671F",
				prevYear: "\u524D\u4E00\u5E74",
				startDate: "\u5F00\u59CB\u65E5\u671F",
				selectTime: "\u9009\u62E9\u65F6\u95F4",
				today: "\u4ECA\u5929",
				currentMonth: "\u672C\u6708",
				startTime: "\u5F00\u59CB\u65F6\u95F4",
				week: "\u5468\u6B21",
				weeks: {
					mon: "\u4E00",
					sun: "\u65E5",
					wed: "\u4E09",
					tue: "\u4E8C",
					fri: "\u4E94",
					thu: "\u56DB",
					sat: "\u516D"
				},
				timezone: "\u9009\u62E9\u65F6\u533A",
				year: "\u5E74",
				to: "\u81F3",
				yearMonth: "{year}\u5E74{month}\u6708",
				yearMonthDay: "{year}\u5E74{month}\u6708{day}\u65E5"
			},
			richTextEditor: {
				bold: "\u52A0\u7C97",
				italic: "\u659C\u4F53",
				link: "\u94FE\u63A5",
				unlink: "\u79FB\u9664\u94FE\u63A5",
				highlight: "\u9AD8\u4EAE",
				underline: "\u4E0B\u5212\u7EBF",
				strike: "\u4E2D\u5212\u7EBF",
				subscript: "\u4E0B\u6807",
				superscript: "\u4E0A\u6807",
				code: "\u4EE3\u7801",
				unorderedlist: "\u65E0\u5E8F\u5217\u8868",
				orderedlist: "\u6709\u5E8F\u5217\u8868",
				taskList: "\u4EFB\u52A1\u5217\u8868",
				quote: "\u5F15\u7528",
				codeBlock: "\u4EE3\u7801\u5757",
				formatClear: "\u6E05\u9664\u6807\u8BB0",
				nodeDelete: "\u5220\u9664\u8282\u70B9",
				undo: "\u56DE\u9000",
				redo: "\u524D\u8FDB",
				left: "\u5DE6\u5BF9\u9F50",
				center: "\u5C45\u4E2D",
				right: "\u53F3\u5BF9\u9F50",
				fontSize: "\u5B57\u53F7",
				lineHeight: "\u884C\u9AD8",
				hBox: "\u6BB5\u843D\u6807\u9898",
				img: "\u56FE\u7247",
				color: "\u989C\u8272",
				table: "\u8868\u683C",
				backgroundColor: "\u6587\u5B57\u80CC\u666F\u8272"
			},
			calendar: {
				showType: {
					year: "\u5E74"
				}
			},
			dept: {
				code: "\u7F16\u7801",
				company: "\u516C\u53F8",
				dept1: "\u4E00\u7EA7\u90E8\u95E8",
				dept2: "\u4E8C\u7EA7\u90E8\u95E8",
				dept3: "\u4E09\u7EA7\u90E8\u95E8",
				dept4: "\u56DB\u7EA7\u90E8\u95E8",
				dept5: "\u4E94\u7EA7\u90E8\u95E8",
				dept6: "\u516D\u7EA7\u90E8\u95E8",
				dept7: "\u4E03\u7EA7\u90E8\u95E8",
				dept8: "\u516B\u7EA7\u90E8\u95E8",
				input: "\u53EF\u8F93\u5165\u90E8\u95E8\u7F16\u7801\u6216\u540D\u79F0",
				name: "\u540D\u79F0",
				search: "\u8F85\u52A9\u67E5\u8BE2",
				selected: "\u5DF2\u9009"
			},
			detailpage: {
				saveButtonText: "\u786E\u8BA4",
				cancelButtonText: "\u53D6\u6D88",
				localTips: "\u4E0D\u80FD\u5168\u90E8\u9690\u85CF",
				localTitle: "\u6570\u636E",
				valueTitle: "\u52FE\u9009\u9690\u85CF",
				labelTitle: "\u6587\u672C\u5B57\u6BB5",
				dialogTitle: "\u4E2A\u6027\u5316\u6807\u9898"
			},
			dialogBox: {
				confirm: "\u786E\u5B9A",
				cancel: "\u53D6\u6D88"
			},
			load: {
				dot: "\u52A0\u8F7D\u4E2D"
			},
			exception: {
				build: "\u6A21\u5757\u6B63\u5728\u5EFA\u8BBE\u4E2D",
				busy: "\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u7B49\u4E00\u4E0B",
				noperm: "\u832B\u832B\u5927\u6D77\uFF0C\u627E\u4E0D\u5230\u9875\u9762",
				weaknet: "\u7F51\u7EDC\u4E0D\u7ED9\u529B",
				pcview: "\u8BF7\u5230PC\u4E0A\u67E5\u770B\u6587\u4EF6",
				nodata: "\u4F11\u606F\u4E00\u4E0B",
				create: "\u521B\u5EFA",
				provide: "TINY \u5F00\u53D1\u56E2\u961F\u63D0\u4F9B",
				nodatamf: "\u6682\u65E0\u6570\u636E",
				nopermmf: "\u65E0\u8BBF\u95EE\u6743\u9650",
				weaknetmf: "\u7F51\u7EDC\u5F02\u5E38",
				noresult: "\u65E0\u76F8\u5173\u641C\u7D22\u7ED3\u679C",
				nonews: "\u6682\u65E0\u6700\u65B0\u6D88\u606F",
				pagenoperm: "403:\u65E0\u8BBF\u95EE\u6743\u9650",
				pageweaknet: "\u7F51\u7EDC\u5F02\u5E38",
				pagenothing: "404:\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728",
				pageservererror: "500:\u670D\u52A1\u5668\u5F02\u5E38"
			},
			fileUpload: {
				largefile: "\u6587\u4EF6\u8FC7\u5927\uFF0C\u5C06\u4F1A\u5206\u7247\u4E0A\u4F20\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85!",
				folder: "\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u5C42\u6570\u5DF2\u8D85\u8FC7 5 \u5C42\uFF0C\u5C06\u4E0D\u4F1A\u4E0A\u4F20\u8BE5\u6587\u4EF6",
				init: "\u670D\u52A1\u62A5\u9519\uFF0C\u8BF7\u91CD\u8BD5",
				token: "\u8BF7\u5148\u8FDB\u884C EDM \u9274\u6743\uFF0C\u83B7\u53D6 token",
				exceed: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF1A\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF08{maxSize}MB\uFF09",
				largeFile: "\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236 2G \uFF01\uFF01\uFF01",
				fileSize: "{name}\u5927\u5C0F\u4E0D\u80FD\u5C0F\u4E8E ",
				deleteTip: "\u6309 delete \u952E\u53EF\u5220\u9664",
				downloadFile: "\u4E0B\u8F7D\u6587\u4EF6",
				previewFile: "\u9884\u89C8\u6587\u4EF6",
				updateFile: "\u66F4\u65B0\u6587\u4EF6",
				deleteFile: "\u5220\u9664\u6587\u4EF6",
				empty: "\u662F\u7A7A\u6587\u4EF6\uFF01",
				kiaScanTip:
					"\u62B1\u6B49\uFF0C\u4ECE\u516C\u7F51\u63A5\u5165\u4E0B\u8F7D\u6587\u6863\uFF0C\u9700\u8981\u901A\u8FC7KIA\u68C0\u6D4B\uFF1B\u5F53\u524D\u6587\u6863\u6B63\u5728KIA\u68C0\u6D4B\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u51E0\u5206\u949F\u540E\u518D\u4E0B\u8F7D\uFF01",
				fileNameExceeds: "\u8D85\u8FC7255\u4E2A\u5B57\u7B26\uFF0C\u8BF7\u4FEE\u6539\u6587\u4EF6\u540D\u3002",
				fileName: "\u8BE5\u6587\u4EF6\u540D",
				calcHash: "\u6587\u6863\u6B63\u5728\u8BA1\u7B97\u52A0\u5BC6\u4E2D",
				uploadFile: "\u6587\u4EF6\u4E0A\u4F20",
				downloadAll: "\u5168\u90E8\u4E0B\u8F7D",
				onlySupport: "\u4EC5\u652F\u6301{type}\u683C\u5F0F\u6587\u4EF6",
				fileNotLessThan: "\u6587\u4EF6\u4E0D\u80FD\u5C0F\u4E8E",
				fileNotMoreThan: "\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7",
				notSupport: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF1A\u4E0D\u652F\u6301\u8BE5\u683C\u5F0F\uFF08.{format}\uFF09",
				attachment: "\u9644\u4EF6",
				uploadList: "\u4E0A\u4F20\u5217\u8868",
				numberExceed: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF1A\u6279\u91CF\u4E0A\u4F20\u4E2A\u6570\u8D85\u8FC7\u9650\u5236\uFF08{number}\uFF09"
			},
			uploadList: {
				pictureUploading: "\u56FE\u7247\u4E0A\u4F20\u4E2D",
				uploadFailed: "\u4E0A\u4F20\u5931\u8D25",
				uploading: "\u4E0A\u4F20\u4E2D",
				download: "\u4E0B\u8F7D",
				reUpload: "\u91CD\u65B0\u4E0A\u4F20",
				delete: "\u5220\u9664",
				noAttachments: "\u6682\u65E0\u9644\u4EF6",
				cancel: "\u53D6\u6D88",
				preview: "\u9884\u89C8",
				releaseAndUpload: "\u91CA\u653E\u9F20\u6807\uFF0C\u4E0A\u4F20\u6587\u4EF6",
				dragOrClickImport: "\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u5BFC\u5165",
				shoot: "\u62CD\u6444",
				selectFromAlbum: "\u4ECE\u76F8\u518C\u9009\u62E9",
				uploadFailedAndReupload: "\u4E0A\u4F20\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u65B0\u4E0A\u4F20"
			},
			upload: {
				addPicture: "\u6DFB\u52A0\u56FE\u7247",
				addAudio: "\u6DFB\u52A0\u97F3\u9891",
				addVideo: "\u6DFB\u52A0\u89C6\u9891"
			},
			grid: {
				dataUnchanged: "\u6570\u636E\u672A\u6539\u52A8\uFF01",
				deleteSelectRecord: "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6240\u9009\u8BB0\u5F55\u5417\uFF1F",
				emptyText: "\u6682\u65E0\u6570\u636E",
				error: {
					cellEditRender: "\u6E32\u67D3\u5668 cell-render \u548C edit-render \u4E0D\u80FD\u540C\u65F6\u4F7F\u7528",
					delGetAllRecords: "\u65B9\u6CD5 getAllRecords \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528 getRecordset",
					delGetRecords: "\u65B9\u6CD5 getRecords \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528 getData",
					delLabel: "\u53C2\u6570 label \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528 title",
					delProp: "\u53C2\u6570 prop \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528 field",
					delRevert: "\u65B9\u6CD5 revert \u5DF2\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528 revertData",
					groupFixed: "\u5982\u679C\u4F7F\u7528\u5206\u7EC4\u8868\u5934\uFF0C\u56FA\u5B9A\u5217\u5FC5\u987B\u5728\u5DE6\u53F3\u4E24\u4FA7",
					notDelete: "Delete \u65B9\u6CD5\u4E0D\u5B58\u5728",
					notMouse: "\u865A\u62DF\u6EDA\u52A8\u4E0D\u652F\u6301 mouse-config",
					notQuery: "query \u65B9\u6CD5\u4E0D\u5B58\u5728",
					notResizable: "\u6A2A\u5411\u865A\u62DF\u6EDA\u52A8\u4E0D\u652F\u6301 resizable",
					notSave: "save \u65B9\u6CD5\u4E0D\u5B58\u5728",
					reqModule: "\u7F3A\u5C11 {{name}} \u6A21\u5757",
					rowIdEmpty: "\u53C2\u6570 row-id \u4E0D\u5141\u8BB8\u4E3A\u7A7A",
					scrollOriginal: "\u865A\u62DF\u6EDA\u52A8\u542F\u7528\u540E\u53EA\u80FD\u5BFC\u51FA\u6E90\u6570\u636E\uFF0C\u8BF7\u5C06\u8BBE\u7F6E original=true",
					scrollYHeight: "\u542F\u7528\u865A\u62DF\u6EDA\u52A8\u5FC5\u987B\u8981\u8BBE\u7F6E height \u6216 max-height",
					toolbarId: "\u5DE5\u5177\u680F\u9700\u8981\u8BBE\u7F6E\u552F\u4E00 id",
					treeFixedExpand: "\u6811\u7ED3\u6784\u7684\u56FA\u5B9A\u5217\u4E0E\u5C55\u5F00\u884C\u529F\u80FD\u6709\u51B2\u7A81",
					treeInsert: "\u6811\u7ED3\u6784\u4E0D\u652F\u6301 insert \u64CD\u4F5C",
					treeRemove: "\u6811\u7ED3\u6784\u4E0D\u652F\u6301 remove \u64CD\u4F5C",
					unableInsert: "\u65E0\u6CD5\u63D2\u5165\u5230\u6307\u5B9A\u4F4D\u7F6E",
					dargSelf: "\u4E0D\u5141\u8BB8\u81EA\u5DF1\u7ED9\u81EA\u5DF1\u62D6\u52A8",
					dargFixed: "\u56FA\u5B9A\u5217\u4E0D\u5141\u8BB8\u62D6\u52A8",
					remoteMethod: "\u4E2A\u6027\u5316\u6A21\u677F\u7BA1\u7406\u8FDC\u7AEF\u5B58\u50A8\u9700\u8981\u8BBE\u7F6E multipleHistory.remoteMethod",
					remoteSelectedMethod: "\u4E2A\u6027\u5316\u6A21\u677F\u7BA1\u7406\u8FDC\u7AEF\u5B58\u50A8\u9700\u8981\u8BBE\u7F6E multipleHistory.remoteSelectedMethod",
					chainCallError: "\u5217\u7684\u9ED8\u8BA4\u63D2\u69FD\u4E2D\u5B58\u5728\u8BED\u6CD5\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u3002"
				},
				filter: {
					allFilter: "\u5168\u90E8",
					allSelect: "(\u5168\u9009)",
					endDate: "\u7ED3\u675F\u65E5\u671F",
					startDate: "\u5F00\u59CB\u65E5\u671F",
					dateTips: "\u8BF7\u81F3\u5C11\u8F93\u5165\u4E00\u4E2A\u65E5\u671F",
					clear: "\u6E05\u9664\u5F53\u524D\u5217\u7B5B\u9009",
					clearAll: "\u6E05\u9664\u6240\u6709\u5217\u7B5B\u9009",
					confirmFilter: "\u7B5B\u9009",
					empty: "\u4E3A\u7A7A",
					emptyText: "\u6682\u65E0\u6570\u636E",
					equal: "\u7B49\u4E8E",
					include: "\u5305\u542B",
					prefix: "\u5F00\u5934\u662F",
					resetFilter: "\u91CD\u7F6E",
					unempty: "\u4E0D\u4E3A\u7A7A"
				},
				individuation: {
					cancelBtn: "\u53D6\u6D88",
					colConfigs: {
						visible: "\u663E\u793A",
						invisible: "\u9690\u85CF",
						asc: "\u6B63\u5E8F",
						desc: "\u5012\u5E8F",
						unsorted: "\u672A\u6392\u5E8F",
						frozenLeft: "\u5DE6\u51BB\u7ED3",
						frozenRight: "\u53F3\u51BB\u7ED3",
						unfrozen: "\u672A\u51BB\u7ED3",
						unfreeze: "\u53D6\u6D88\u51BB\u7ED3",
						unsort: "\u53D6\u6D88\u6392\u5E8F"
					},
					toolbar: {
						set: "\u8BBE\u7F6E",
						selected: "\u5DF2\u9009",
						freeze: "\u51BB\u7ED3",
						sort: "\u6392\u5E8F",
						clear: "\u6E05\u7A7A",
						search: "\u641C\u7D22",
						all: "\u5168\u9009"
					},
					columnSet: "\u5217\u8BBE\u7F6E",
					overwriteSave: "\u8986\u76D6\u4FDD\u5B58",
					saveAs: "\u53E6\u5B58\u4E3A",
					saveTemplate: "\u5B58\u6A21\u677F",
					selectTemplate: "\u9009\u62E9\u6A21\u677F",
					hideMsg: "\u81F3\u5C11\u4FDD\u7559\u4E00\u5217\u663E\u793A",
					maxFreezeNumMsg: "\u51BB\u7ED3\u5217\u4E0D\u53EF\u8D85\u8FC76\u9879",
					defaultTemplateName: "\u8BF7\u8F93\u5165\u540D\u79F0\uFF0C\u5982\u672A\u586B\u5199\u7531\u7CFB\u7EDF\u6309\u65F6\u95F4\u751F\u6210",
					reserveTemplateName: "\u5982\u672A\u586B\u5199\u540D\u79F0\u5C06\u4FDD\u7559\u4E4B\u524D\u7684\u540D\u79F0",
					resetBtn: "\u91CD\u7F6E",
					saveBtn: "\u786E\u5B9A",
					tabs: {
						base: {
							title: "\u57FA\u7840\u8BBE\u7F6E",
							tips: "\u70B9\u51FB\u56FE\u6807\u6309\u94AE\u8BBE\u7F6E\u4E2A\u6027\u5316"
						},
						other: {
							title: "\u5176\u4ED6\u8BBE\u7F6E",
							tips: "\u8BBE\u7F6E\u670D\u52A1\u5668\u6392\u5E8F\u6216\u5BA2\u6237\u7AEF\u6392\u5E8F\u3001\u6BCF\u9875\u6761\u6570\u5927\u5C0F\u3002",
							sortType: "\u6392\u5E8F\u7C7B\u578B",
							currPageSort: "\u5F53\u524D\u9875\u6570\u636E\u6392\u5E8F",
							allDataSort: "\u6240\u6709\u6570\u636E\u6392\u5E8F",
							pageSize: "\u6BCF\u9875\u6761\u6570"
						}
					},
					title: "\u4E2A\u6027\u5316\u8BBE\u7F6E",
					switchtitle: "\u6A21\u677F\u7BA1\u7406",
					switchsave: "\u4FDD\u5B58\u914D\u7F6E",
					switchlabel: "\u914D\u7F6E\u5217\u8868\uFF1A",
					switchapply: "\u4F7F\u7528",
					switchedit: "\u7F16\u8F91",
					switchdel: "\u5220\u9664",
					switchconfirm: "\u786E\u8BA4",
					switchonlytemp: "\u4FDD\u5B58\u6A21\u677F",
					switchtempapply: "\u4FDD\u5B58\u5E76\u4F7F\u7528\u6A21\u677F",
					switchtempoverwrite: "\u8986\u76D6\u5E76\u4F7F\u7528\u6A21\u677F",
					switchdelcon: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u6A21\u677F\uFF1F",
					switchdelyes: "\u786E\u5B9A",
					switchdelno: "\u53D6\u6D88",
					switchapplycon: "\u786E\u5B9A\u8981\u4F7F\u7528\u8FD9\u4E2A\u6A21\u677F\uFF1F"
				},
				removeSelectRecord: "\u60A8\u786E\u5B9A\u8981\u79FB\u9664\u6240\u9009\u8BB0\u5F55\u5417\uFF1F",
				saveSuccess: "\u4FDD\u5B58\u6210\u529F",
				selectOneRecord: "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u6761\u8BB0\u5F55\uFF01",
				isSaveMsg: "\u6709\u4FEE\u6539\u7684\u6570\u636E\uFF0C\u662F\u5426\u8981\u4FDD\u5B58\uFF1F"
			},
			hrapprover: {
				approver: "\u6743\u7B7E\u4EBA",
				noselected: "\u6CA1\u6709\u9009\u62E9\u6743\u7B7E\u4EBA",
				noapprover: "\u6CA1\u6709\u6743\u7B7E\u4EBA",
				remark: "\u5907\u6CE8"
			},
			imageViewer: {
				loadErrorAlt: "\u52A0\u8F7D\u5931\u8D25"
			},
			navMenu: {
				moreText: "\u66F4\u591A"
			},
			logout: {
				in: "\u767B\u5F55",
				out: "\u6CE8\u9500"
			},
			page: {
				goto: "\u524D\u5F80",
				item: "\u6761",
				next: "\u4E0B\u4E00\u9875",
				page: "\u6761/\u9875",
				pageClassifier: "\u9875",
				pagesize: "\u6761/\u9875",
				prev: "\u4E0A\u4E00\u9875",
				total: "\u603B\u6761\u6570",
				totals: "\u603B\u8BA1\uFF1A",
				jump: "\u8DF3\u81F3",
				hundredThousand: "10\u4E07+",
				million: "100\u4E07+",
				tenMillion: "1\u5343\u4E07+",
				loadingTotals: "\u52A0\u8F7D\u603B\u6761\u6570\u2026"
			},
			popeditor: {
				cancel: "\u53D6 \u6D88",
				confirm: "\u786E \u8BA4",
				historyLists: "\u5386\u53F2\u6570\u636E\u5217\u8868",
				reset: "\u91CD \u7F6E",
				search: "\u67E5 \u8BE2",
				selectionLists: "\u9009\u62E9\u6570\u636E\u5217\u8868",
				sourceLists: "\u6240\u6709\u6570\u636E\u5217\u8868",
				title: "\u9009\u62E9",
				filterNode: "\u8F93\u5165\u5185\u5BB9\u8FDB\u884C\u7B5B\u9009"
			},
			popupload: {
				fileName: "\u6587\u4EF6\u540D",
				fileSize: "\u6587\u4EF6\u5927\u5C0F",
				fileStatus: "\u6587\u4EF6\u72B6\u6001",
				uploadError: "\u4E0A\u4F20\u5931\u8D25",
				dialogTitle: "\u6587\u4EF6\u4E0A\u4F20",
				cancelButtonText: "\u53D6\u6D88",
				tipsFileText: "\u4E0A\u4F20\u63D0\u793A",
				saveButtonText: "\u5F00\u59CB\u4E0A\u4F20",
				uploadSuccess: "\u4E0A\u4F20\u6210\u529F\uFF01",
				uploadButtonText: "\u9009\u62E9\u6587\u4EF6",
				uploadsButtonText: "\u9009\u62E9\u6279\u91CF\u6587\u4EF6",
				errorTypeTips: "\u4E0A\u4F20\u6587\u4EF6\u7C7B\u578B\u4E0D\u5339\u914D",
				errorNumTips: "\u4E0A\u4F20\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5236,\u5DF2\u53D6\u6D88\u8BE5\u64CD\u4F5C",
				errorSizeTips: "\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236",
				limitUploadFileNumber: "\u4E0A\u4F20\u6587\u4EF6\u6570\u9650\u5236\u4E3A",
				limitUploadFileType: "\u4E0A\u4F20\u6587\u4EF6\u7C7B\u578B\u9650\u5236\u4E3A",
				limitUploadFileSize: "\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7"
			},
			rate: {
				level: {
					average: "\u4E00\u822C",
					excellent: "\u5F88\u597D",
					fair: "\u5DEE",
					good: "\u597D",
					poor: "\u5F88\u5DEE"
				}
			},
			select: {
				loading: "\u52A0\u8F7D\u4E2D",
				noMatch: "\u65E0\u5339\u914D\u6570\u636E",
				noData: "\u6682\u65E0\u76F8\u5173\u6570\u636E",
				placeholder: "\u8BF7\u9009\u62E9"
			},
			search: {
				placeholder: "\u641C\u7D22"
			},
			tabs: {
				moreItem: "\u66F4\u591A"
			},
			tag: {
				add: "\u6DFB\u52A0"
			},
			toggleMenu: {
				placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9\u8FDB\u884C\u7B5B\u9009"
			},
			treeMenu: {
				placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9\u8FDB\u884C\u7B5B\u9009"
			},
			transfer: {
				filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
				hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879",
				noCheckedFormat: "\u5171 {total} \u9879",
				noData: "\u65E0\u6570\u636E",
				noMatch: "\u65E0\u5339\u914D\u6570\u636E",
				titles: ["\u5217\u8868 1", "\u5217\u8868 2"]
			},
			tree: {
				emptyText: "\u6682\u65E0\u6570\u636E",
				switchText: "\u540C\u65F6\u52FE\u9009\u4E0B\u7EA7",
				deleteTip: "\u5220\u9664\u540E\u6570\u636E\u4E0D\u53EF\u6062\u590D\uFF0C\u786E\u5B9A\u5220\u9664\u5417\uFF1F",
				preserveSubnodeTip: "\u8BE5\u8282\u70B9\u5B58\u5728\u4E0B\u7EA7\u8282\u70B9\uFF0C\u662F\u5426\u4FDD\u7559\u4E0B\u7EA7\u8282\u70B9\u6570\u636E\uFF1F",
				preserveSubnodeData: "\u4FDD\u7559\u4E0B\u7EA7\u8282\u70B9\u6570\u636E",
				newNodeTitle: "\u65B0\u589E\u4E0B\u7EA7"
			},
			usercard: {
				address: "\u5730\u5740",
				collapse: "\u6536\u8D77",
				department: "\u90E8\u95E8",
				email: "\u90AE\u7BB1",
				employeeId: "\u5458\u5DE5 ID",
				employee_id: "\u5458\u5DE5 ID",
				empno: "\u5DE5\u53F7",
				expand: "\u5C55\u5F00",
				fax: "\u4F20\u771F",
				internal: "\u5185\u7EBF",
				manager: "\u4E3B\u7BA1",
				mobile: "\u624B\u673A",
				other: "\u5176\u4ED6",
				phone: "\u56FA\u5B9A\u7535\u8BDD",
				timezone: "\u65F6\u533A",
				title: "\u7528\u6237\u4FE1\u606F: {0}",
				travelcode: "\u51FA\u5DEE\u8054\u7CFB\u4FE1\u606F",
				viop: "VIOP",
				zipcode: "\u90AE\u7F16"
			},
			richText: {
				bold: "\u52A0\u7C97",
				italic: "\u503E\u659C",
				underline: "\u4E0B\u5212\u7EBF",
				header: "\u6BB5\u843D\u683C\u5F0F",
				strike: "\u5220\u9664\u7EBF",
				blockquote: "\u5757\u5F15\u7528",
				codeBlock: "\u63D2\u5165\u4EE3\u7801\u6BB5",
				size: "\u5B57\u4F53\u5927\u5C0F",
				listOrdered: "\u7F16\u53F7\u5217\u8868",
				listBullet: "\u9879\u76EE\u5217\u8868",
				header1: "h1",
				header2: "h2",
				align: "\u5BF9\u9F50\u65B9\u5F0F",
				color: "\u5B57\u4F53\u989C\u8272",
				background: "\u80CC\u666F\u989C\u8272",
				image: "\u56FE\u50CF",
				video: "\u89C6\u9891",
				link: "\u6DFB\u52A0\u94FE\u63A5",
				formula: "\u63D2\u5165\u516C\u5F0F",
				clean: "\u6E05\u9664\u683C\u5F0F",
				indent1: "\u5411\u5DE6\u7F29\u8FDB",
				indent2: "\u5411\u53F3\u7F29\u8FDB",
				pickerLabel: "\u6807\u9898\u5927\u5C0F",
				headerPicker1: "\u6807\u9898\u4E00",
				headerPicker2: "\u6807\u9898\u4E8C",
				headerPicker3: "\u6807\u9898\u4E09",
				headerPicker4: "\u6807\u9898\u56DB",
				headerPicker5: "\u6807\u9898\u4E94",
				headerPicker6: "\u6807\u9898\u516D",
				normal: "\u6807\u51C6",
				sizeSmall: "\u5C0F\u53F7",
				sizeLarge: "\u5927\u53F7",
				sizeHuge: "\u8D85\u5927\u53F7",
				alignPicker1: "\u5C45\u5DE6\u5BF9\u9F50",
				alignPicker2: "\u5C45\u4E2D\u5BF9\u9F50",
				alignPicker3: "\u5C45\u53F3\u5BF9\u9F50",
				alignPicker4: "\u4E24\u7AEF\u5BF9\u9F50",
				subScript: "\u4E0B\u6807",
				superScript: "\u4E0A\u6807",
				directionRTL: "\u4ECE\u53F3\u5230\u5DE6",
				font: "\u5B57\u4F53",
				file: "\u6587\u4EF6",
				betterTable: "\u8868\u683C",
				fullscreen: "\u5168\u5C4F",
				insertColumnRight: "\u53F3\u63D2\u5165\u5217",
				insertColumnLeft: "\u5DE6\u63D2\u5165\u5217",
				insertRowUp: "\u4E0A\u63D2\u5165\u884C",
				insertRowDown: "\u4E0B\u63D2\u5165\u884C",
				mergeCells: "\u5408\u5E76\u5355\u5143\u683C",
				unmergeCells: "\u62C6\u5206\u5355\u5143\u683C",
				deleteColumn: "\u5220\u9664\u5F53\u524D\u5217",
				deleteRow: "\u5220\u9664\u5F53\u524D\u884C",
				deleteTable: "\u5220\u9664\u8868\u683C",
				colorPicker: "\u80CC\u666F\u989C\u8272",
				placeholder: "\u5728\u6B64\u5904\u63D2\u5165\u6587\u672C...",
				maxLength: "\u6587\u672C\u957F\u5EA6\u8D85\u8FC7\u9650\u5236\uFF0C\u652F\u6301\u7684\u6700\u5927\u957F\u5EA6\u662F "
			},
			steps: {
				done: "\u5DF2\u5B8C\u6210",
				doing: "\u8FDB\u884C\u4E2D",
				wait: "\u7B49\u5F85\u4E2D"
			},
			actionSheet: {
				cancel: "\u53D6\u6D88"
			},
			image: {
				loadFail: "\u52A0\u8F7D\u5931\u8D25"
			},
			miniPicker: {
				cancel: "\u53D6\u6D88",
				confirm: "\u786E\u5B9A"
			},
			pullRefresh: {
				pullingDown: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0",
				pullingUp: "\u4E0A\u62C9\u5373\u53EF\u5237\u65B0",
				pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0",
				loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0",
				success: "\u5237\u65B0\u6210\u529F",
				failed: "\u5237\u65B0\u5931\u8D25",
				noMore: "\u6CA1\u6709\u66F4\u591A\u4E86"
			},
			currency: {
				defaultCurrency: "\u9ED8\u8BA4\u5E01\u79CD",
				setDefault: "\u8BBE\u4E3A\u9ED8\u8BA4"
			},
			calendarBar: {
				week: {
					0: "\u65E5",
					1: "\u4E00",
					2: "\u4E8C",
					3: "\u4E09",
					4: "\u56DB",
					5: "\u4E94",
					6: "\u516D"
				},
				year: "%s\u5E74",
				yearMonth: "%y\u5E74%m\u6708",
				month: {
					1: "1\u6708",
					2: "2\u6708",
					3: "3\u6708",
					4: "4\u6708",
					5: "5\u6708",
					6: "6\u6708",
					7: "7\u6708",
					8: "8\u6708",
					9: "9\u6708",
					10: "10\u6708",
					11: "11\u6708",
					12: "12\u6708"
				},
				monthAbbr: {
					1: "1",
					2: "2",
					3: "3",
					4: "4",
					5: "5",
					6: "6",
					7: "7",
					8: "8",
					9: "9",
					10: "10",
					11: "11",
					12: "12"
				}
			},
			calendarView: {
				week: {
					0: "\u65E5",
					1: "\u4E00",
					2: "\u4E8C",
					3: "\u4E09",
					4: "\u56DB",
					5: "\u4E94",
					6: "\u516D"
				},
				weekDays: {
					0: "\u5468\u65E5",
					1: "\u5468\u4E00",
					2: "\u5468\u4E8C",
					3: "\u5468\u4E09",
					4: "\u5468\u56DB",
					5: "\u5468\u4E94",
					6: "\u5468\u516D"
				},
				backToday: "\u56DE\u4ECA\u5929",
				new: "\u65B0\u589E",
				noSchedule: "\u6682\u65E0\u65E5\u7A0B",
				year: "\u5E74",
				month: "\u6708",
				dateFormat: "yyyy \u5E74 MM \u6708"
			},
			selectedBox: {
				select: "\u5DF2\u9009\uFF08%s\uFF09",
				allSelect: "\u5DF2\u5168\u9009\uFF08%s\uFF09",
				clear: "\u6E05\u7A7A"
			},
			record: {
				record: "\u5F55\u97F3",
				cancel: "\u53D6\u6D88",
				confirm: "\u786E\u5B9A",
				clickToStartRecording: "\u70B9\u51FB\u5F00\u59CB\u5F55\u97F3",
				clickToResumeRecording: "\u70B9\u51FB\u7EE7\u7EED\u5F55\u97F3"
			},
			dialogSelect: {
				treeSearch: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u5E76\u56DE\u8F66"
			}
		},
		validation: {
			array: {
				len: "%s \u7684\u957F\u5EA6\u5FC5\u987B\u4E3A %s",
				min: "%s \u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E %s",
				max: "%s \u7684\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E %s",
				range: "%s \u7684\u957F\u5EA6\u5FC5\u987B\u4ECB\u4E8E %s \u548C %s \u4E4B\u95F4"
			},
			date: {
				format: "%s \u65E5\u671F %s \u5BF9\u4E8E\u683C\u5F0F %s \u65E0\u6548",
				invalid: "%s \u65E5\u671F %s \u65E0\u6548",
				parse: "\u65E0\u6CD5\u5206\u6790 %s \u65E5\u671F\uFF0C %s \u65E0\u6548"
			},
			default: "%s \u5B57\u6BB5\u6821\u9A8C\u9519\u8BEF",
			enum: "%s \u5FC5\u987B\u662F %s \u4E2D\u7684\u4E00\u4E2A",
			number: {
				len: "%s \u5FC5\u987B\u7B49\u4E8E %s",
				min: "%s \u4E0D\u80FD\u5C0F\u4E8E %s",
				max: "%s \u4E0D\u80FD\u5927\u4E8E %s",
				range: "%s \u5FC5\u987B\u4ECB\u4E8E %s \u548C %s \u4E4B\u95F4"
			},
			pattern: {
				mismatch: "%s \u503C%s \u4E0E\u6A21\u5F0F %s \u4E0D\u5339\u914D"
			},
			required: "\u5FC5\u586B",
			string: {
				len: "%s \u5FC5\u987B\u662F %s \u4E2A\u5B57\u7B26",
				min: "%s \u5FC5\u987B\u81F3\u5C11\u4E3A %s \u4E2A\u5B57\u7B26",
				max: "%s\u4E0D \u80FD\u5927\u4E8E %s \u4E2A\u5B57\u7B26",
				range: "%s \u5FC5\u987B\u4ECB\u4E8E %s \u548C %s \u4E2A\u5B57\u7B26\u4E4B\u95F4"
			},
			types: {
				acceptFile: "\u53EA\u63A5\u53D7\u6587\u4EF6",
				acceptImg: "\u53EA\u63A5\u53D7\u56FE\u7247\u683C\u5F0F",
				array: "\u975E\u6CD5\u6570\u7EC4",
				boolean: "\u975E\u6CD5\u5E03\u5C14\u503C",
				date: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u65E5\u671F\u683C\u5F0F",
				dateTime: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u65E5\u671F\u65F6\u95F4\u683C\u5F0F",
				dateYM: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u65E5\u671F\u683C\u5F0F(yyyy-mm)",
				dateYMD: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u65E5\u671F\u683C\u5F0F(yyyy-MM-dd)",
				digits: "\u975E\u6CD5\u7EAF\u6570\u5B57",
				email: "\u975E\u6CD5\u90AE\u4EF6\u5730\u5740",
				fileSize: "\u6587\u4EF6\u5927\u5C0F\u7684\u683C\u5F0F\u4E0D\u6B63\u786E,\u5E94\u5982 3kb",
				float: "\u975E\u6CD5\u6D6E\u70B9\u6570",
				hex: "\u975E\u6CD5\u5341\u516D\u8FDB\u5236",
				integer: "\u975E\u6CD5\u6574\u6570",
				longDateTime: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u957F\u65E5\u671F\u683C\u5F0F",
				method: "\u5FC5\u987B\u662F\u51FD\u6570\uFF08Function\uFF09",
				number: "\u975E\u6CD5\u6570\u5B57",
				object: "\u975E\u6CD5\u5BF9\u8C61",
				regexp: "\u975E\u6CD5\u6B63\u5219\u8868\u8FBE\u5F0F",
				specialch: "\u53EA\u80FD\u5305\u542B\u6570\u5B57\u3001\u5B57\u6BCD\u3001\u4E0B\u5212\u7EBF\u3001\u6A2A\u6760\u3001\u70B9\u53F7",
				specialch2: "\u53EA\u80FD\u5305\u542B\u6570\u5B57\u3001\u5B57\u6BCD\u3001\u4E0B\u5212\u7EBF\u3001\u6A2A\u6760",
				speczh: "\u53EA\u80FD\u5305\u542B\u6570\u5B57\u3001\u5B57\u6BCD\u3001\u4E0B\u5212\u7EBF\u3001\u6C49",
				string: "\u975E\u6CD5\u5B57\u7B26\u4E32",
				time: "\u4E0D\u7B26\u5408\u89C4\u5219\u7684\u65F6\u95F4\u683C\u5F0F",
				url: "\u975E\u6CD5 URL \u5730\u5740",
				version: "\u975E\u6CD5\u7248\u672C\u683C\u5F0F"
			},
			whitespace: "%s \u4E0D\u80FD\u4E3A\u7A7A"
		}
	};
	var enUS$1 = {
		"en-US": "English",
		"zh-CN": "\u4E2D\u6587",
		"zh-TW": "\u4E2D\u56FD\u53F0\u6E7E",
		hello: "Hello {name}",
		code: "en-US",
		ui: {
			buttonMessage: {
				cancel: "Cancel",
				confirm: "Confirm"
			},
			wizard: {
				previousStep: "LastStep",
				nextStep: "NextStep",
				save: "Save",
				submit: "Submit"
			},
			linkMenu: {
				title: "news",
				placeholder: "Please enter keywords to filter...",
				sure: "Determine",
				cancel: "cancel"
			},
			todoList: {
				add: "Add",
				placeholder: "please input your todo things"
			},
			alert: {
				error: "Error",
				info: "Info",
				success: "Success",
				title: "Message notification",
				warning: "Warning"
			},
			amount: {
				currency: "Currency",
				amount: "Amount",
				date: "Date"
			},
			actionMenu: {
				moreText: "more"
			},
			base: {
				all: "All",
				cancel: "Cancel",
				confirm: "OK",
				delete: "Delete",
				edit: "Edit",
				more: "More",
				reset: "Reset"
			},
			button: {
				cancel: "Cancel",
				confirm: "OK"
			},
			cell: {
				placeholder: "Select"
			},
			cascader: {
				noMatch: "No matching data",
				loading: "Loading",
				placeholder: "Select",
				noData: "No data"
			},
			chart: {
				auxiliary: "Auxiliary",
				emptyText: "No Data",
				kName: "Day K",
				other: "Other",
				summation: "Summation",
				total: "Total",
				value: "Value"
			},
			colorSelectPanel: {
				confirm: "Ok",
				cancel: "Cancel",
				predefine: "Predefine Color",
				history: "History",
				empty: "Empty"
			},
			creditCardForm: {
				submit: "Submit"
			},
			crop: {
				cropImage: "crop image",
				croppedImage: "Post-Crop Image"
			},
			datepicker: {
				clear: "Clear",
				cancel: "Cancel",
				endDate: "End Date",
				confirm: "OK",
				month: "month",
				endTime: "End Time",
				month2: "February",
				month1: "January",
				month4: "April",
				month3: "March",
				month6: "June",
				month5: "May",
				month8: "August",
				month7: "July",
				month10: "October",
				month9: "September",
				month12: "December",
				month11: "November",
				months: {
					feb: "Feb",
					jan: "Jan",
					apr: "Apr",
					mar: "Mar",
					jun: "Jun",
					may: "May",
					aug: "Aug",
					jul: "Jul",
					oct: "Oct",
					sep: "Sep",
					dec: "Dec",
					nov: "Nov"
				},
				nextYear: "Next Year",
				nextMonth: "Next Month",
				prevMonth: "Previous Month",
				now: "Now",
				selectDate: "Select date",
				prevYear: "Previous Year",
				startDate: "Start Date",
				selectTime: "Select time",
				today: "Today",
				currentMonth: "Current Month",
				startTime: "Start Time",
				week: "week",
				weeks: {
					mon: "Mon",
					sun: "Sun",
					wed: "Wed",
					tue: "Tue",
					thu: "Thu",
					sat: "Sat",
					fri: "Fri"
				},
				timezone: "selecting a timezone",
				year: "",
				to: "to",
				yearMonth: "{year} / {month}",
				yearMonthDay: "{year} / {month} / {day}"
			},
			richTextEditor: {
				bold: "bold",
				italic: "italic",
				link: "link",
				unlink: "unlink",
				highlight: "high light",
				underline: "underline",
				strike: "strike",
				subscript: "subscript",
				superscript: "superscript",
				code: "code",
				unorderedlist: "unorderedlist",
				orderedlist: "orderedlist",
				taskList: "taskList",
				quote: "quote",
				codeBlock: "code block",
				formatClear: "format clear",
				nodeDelete: "node delete",
				undo: "undo",
				redo: "redo",
				left: "left",
				center: "center",
				right: "right",
				fontSize: "font size",
				lineHeight: "line height",
				hBox: "h box",
				img: "img",
				color: "color",
				table: "table",
				backgroundColor: "backgroundColor"
			},
			calendar: {
				showType: {
					year: "year"
				}
			},
			dept: {
				code: "Code",
				company: "Company",
				dept1: "First Level Department",
				dept2: "Second Level Department",
				dept3: "Third Level Department",
				dept4: "Fourth Level Department",
				dept5: "Fifth Level Department",
				dept6: "Sixth Level Department",
				dept7: "Seventh Level Department",
				dept8: "Eighth Level Department",
				input: "Input Dept Code or Name is available",
				name: "Name",
				search: "Quick Search",
				selected: "Selected"
			},
			detailpage: {
				saveButtonText: "Confirm",
				cancelButtonText: "Cancel",
				localTips: "Cannot hide all",
				localTitle: "Data",
				valueTitle: "Click to hide",
				labelTitle: "Title",
				dialogTitle: "Personalized title"
			},
			dialogBox: {
				confirm: "confirm",
				cancel: "cancel"
			},
			load: {
				dot: "Loading"
			},
			exception: {
				build: "Building",
				busy: "The network is busy. Please wait",
				noperm: "Not find the page",
				weaknet: "Poor network performance",
				pcview: "View the file on the PC",
				nodata: "Get some rest",
				create: "Create",
				provide: "Provided by the TINY Team DEV",
				nodatamf: "No data",
				nopermmf: "No access",
				weaknetmf: "Network anomaly",
				noresult: "No result",
				nonews: "No latest news",
				pagenoperm: "403:No access",
				pageweaknet: "Network anomaly",
				pagenothing: "404:The page you visited does not exist",
				pageservererror: "500:Server exception"
			},
			fileUpload: {
				largefile: " is too large and will be uploaded in segments. Please wait.",
				folder: " has more than five layers of folders. The file will not be uploaded",
				init: "Service error. Please try again.",
				token: "Perform EDM authentication first and obtain the token",
				exceed: "Failed to upload the file. The file size exceeds the upper limit ({maxSize} MB).",
				largeFile: "The file size exceeds the upper limit by 2 GB !!!",
				fileSize: "The file size of {name} cannot be less than ",
				deleteTip: "Press delete to remove",
				downloadFile: "DownLoad file",
				previewFile: "Preview file",
				updateFile: "Update file",
				deleteFile: "Delete file",
				empty: "is empty!",
				kiaScanTip:
					"Sorry, unable to download. Please pass the KIA test first to download a file using public network. Current document is being checked by the KIA, Please wait a while then redownload.",
				fileNameExceeds: "exceeds 255 characters. Please change the file name.",
				fileName: "The file name",
				calcHash: "Document is calculating encryption",
				uploadFile: "Upload file",
				downloadAll: "Download all",
				onlySupport: "Only support {type} file",
				fileNotLessThan: "The file cannot be less than",
				fileNotMoreThan: "The file cannot be more than",
				notSupport: "File upload failed: The format (.{format}) is not supported.",
				attachment: "Attachment",
				uploadList: "Upload List",
				numberExceed: "Failed to upload the file. The number of files to be uploaded in batches exceeds the upper limit ({number})."
			},
			uploadList: {
				pictureUploading: "Picture uploading",
				uploadFailed: "Upload failed",
				uploading: "Uploading",
				download: "Download",
				reUpload: "Re-upload",
				delete: "Delete",
				noAttachments: "No attachments",
				cancel: "Cancel",
				preview: "Preview",
				releaseAndUpload: "Release the mouse and upload the file",
				dragOrClickImport: "Drag the file here, or click Import",
				shoot: "Shoot",
				selectFromAlbum: "Select from album",
				uploadFailedAndReupload: "Upload failed. Click Upload again"
			},
			upload: {
				addPicture: "Add picture",
				addAudio: "Add audio",
				addVideo: "Add video"
			},
			grid: {
				dataUnchanged: "Data unchanged!",
				deleteSelectRecord: "Are you sure you want to delete the selected record?",
				emptyText: "No Data",
				error: {
					cellEditRender: "The renderer cell-render and edit-render cannot be used together.",
					delGetAllRecords: "The function getAllRecords is deprecated, please use getRecordset.",
					delGetRecords: "The function getRecords is deprecated, please use getData.",
					delLabel: "The property label is deprecated, please use title.",
					delProp: "The property prop is deprecated, please use field.",
					delRevert: "The function revert is deprecated, please use revertData.",
					groupFixed: "If grouping headers are used, fixed columns must be on the left and right sides.",
					notDelete: "delete method not exist.",
					notMouse: "Horizontal virtual scrolling does not support mouse-config.",
					notQuery: "query method not exist.",
					notResizable: "Horizontal virtual scrolling does not support resizable.",
					notSave: "save method not exist.",
					reqModule: "require {{name}} module.",
					rowIdEmpty: "The property row-id is not allowed to be empty.",
					scrollOriginal: "Virtual scrolling can only export source data, please set original=true.",
					scrollYHeight: "You must set the height or max-height to enable virtual scrolling.",
					toolbarId: "Toolbar must have a unique id",
					treeFixedExpand: "The fixed columns of the tree structure conflict with the expanded row.",
					treeInsert: "The tree structure does not support insert operations.",
					treeRemove: "The tree structure does not support remove operations.",
					unableInsert: "Unable to insert to the specified location.",
					dargSelf: "Self dragging is not allowed.",
					dargFixed: "Fixed columns cannot be dragged.",
					remoteMethod: '"remoteMethod" needs to be set for remote storage for personalized template management.',
					remoteSelectedMethod: '"remoteSelectedMethod" needs to be set for remote storage for personalized template management.',
					chainCallError: "There is a syntax error in the default slot for the column, please check."
				},
				filter: {
					allFilter: "All",
					allSelect: "(All)",
					endDate: "End Date",
					startDate: "Start Date",
					dateTips: "Please enter at least one date",
					clear: "Clear Current Filter",
					clearAll: "Clear All Filters",
					confirmFilter: "OK",
					empty: "Is Empty",
					emptyText: "No Data",
					equal: "Equal",
					include: "Include",
					prefix: "Starts With",
					resetFilter: "Reset",
					unempty: "Is not Empty"
				},
				individuation: {
					cancelBtn: "Cancel",
					colConfigs: {
						asc: "Ascending",
						desc: "Descending",
						frozenLeft: "Frozen on the left",
						frozenRight: "Frozen on the right",
						invisible: "Invisible",
						unsorted: "No sortting",
						unfrozen: "Unfrozen",
						visible: "Visible",
						unfreeze: "Unfrozen",
						unsort: "Unsort"
					},
					toolbar: {
						set: "Set",
						selected: "Selected",
						freeze: "Freeze",
						sort: "Sort",
						clear: "Clear",
						search: "Search",
						all: "All"
					},
					columnSet: "Column Setting",
					overwriteSave: "Overwrite Save",
					saveAs: "Save as",
					saveTemplate: "Save Template",
					selectTemplate: "Select Template",
					hideMsg: "Leave one column to show at least.",
					maxFreezeNumMsg: "Maxium number of frozen columns is 6",
					defaultTemplateName: "Please enter a name, if not filled in, it will be generated by the system according to time",
					reserveTemplateName: "If the name is not filled in, the previous name will be retained",
					resetBtn: "Reset",
					saveBtn: "OK",
					tabs: {
						base: {
							title: "Base Setting",
							tips: "Click the icon to set personalized."
						},
						other: {
							allDataSort: "Remote Data Sorting",
							currPageSort: "Current Page Data Sorting",
							pageSize: "Page Size",
							title: "Other Setting",
							tips: "Settings for Sorting and Pagesize.",
							sortType: "Sorting Type"
						}
					},
					title: "Personalized Settings",
					switchtitle: "Template Management",
					switchsave: "Save configuration",
					switchlabel: "List:",
					switchapply: "Apply",
					switchedit: "Edit",
					switchdel: "Delete",
					switchconfirm: "Confirm",
					switchonlytemp: "Save as template only",
					switchtempapply: "Save as template and use",
					switchtempoverwrite: "Overwrite template and use",
					switchdelcon: "Are you sure to delete this template?",
					switchdelyes: "Yes",
					switchdelno: "No",
					switchapplycon: "Are you sure to use this template?"
				},
				removeSelectRecord: "Are you sure you want to remove the selected record?",
				saveSuccess: "Save successfully.",
				selectOneRecord: "Please choose at least one piece of record!",
				isSaveMsg: "There are change records, do you want to save them?"
			},
			hrapprover: {
				approver: "Approver",
				noapprover: "There is no approver",
				noselected: "Select one record!",
				remark: "Remarks"
			},
			imageViewer: {
				loadErrorAlt: "Load Error"
			},
			navMenu: {
				moreText: "more"
			},
			logout: {
				in: "Login",
				out: "Logout"
			},
			page: {
				goto: "Go to",
				item: "",
				next: "Next",
				page: "Records/Page",
				pageClassifier: "",
				pagesize: "Records/Page",
				prev: "Prev",
				total: "Total ",
				totals: "Total: ",
				jump: "Go to",
				hundredThousand: "100K+",
				million: "1M+",
				tenMillion: "10M+",
				loadingTotals: "Loading Totals..."
			},
			popeditor: {
				cancel: "Cancel",
				confirm: "OK",
				historyLists: "History options",
				reset: "Reset",
				search: "Search",
				selectionLists: "Selected Items",
				sourceLists: "Available Items",
				title: "Select",
				filterNode: "input text to filter node"
			},
			popupload: {
				fileName: "File Name",
				fileSize: "File Size",
				fileStatus: "File Status",
				dialogTitle: "File Upload",
				cancelButtonText: "Cancel",
				tipsFileText: "upload hints",
				uploadError: "Upload failure!",
				uploadButtonText: "select file",
				uploadSuccess: "Upload Success!",
				saveButtonText: "Click To Upload",
				uploadsButtonText: "select files",
				errorTypeTips: "Upload file type mismatch",
				errorSizeTips: "Upload file size exceeds limit",
				limitUploadFileType: "Upload file type is limited to",
				limitUploadFileNumber: "Limit the number of uploaded files to",
				limitUploadFileSize: "The size of the uploaded file does not exceed",
				errorNumTips: "The number of uploaded files exceeds the limit. The operation has been cancelled"
			},
			rate: {
				level: {
					average: "Average",
					excellent: "Excellent",
					fair: "Fair",
					good: "Good",
					poor: "Poor"
				}
			},
			select: {
				loading: "Loading",
				noData: "No data",
				noMatch: "No matching data",
				placeholder: "Select"
			},
			search: {
				placeholder: "search"
			},
			tabs: {
				moreItem: "more"
			},
			tag: {
				add: "Add"
			},
			toggleMenu: {
				placeholder: "please input filter content"
			},
			treeMenu: {
				placeholder: "please input filter content"
			},
			transfer: {
				filterPlaceholder: "Enter keyword",
				hasCheckedFormat: "{checked}/{total} checked",
				noData: "No data",
				noMatch: "No matching data",
				noCheckedFormat: "{total} items",
				titles: ["List 1", "List 2"]
			},
			tree: {
				emptyText: "No data",
				switchText: "check easily",
				deleteTip: "Data will be permanently deleted, are you sure you want to proceed with the deletion?",
				preserveSubnodeTip: "This node have child nodes, Would you like to preserve the data of the child nodes?",
				preserveSubnodeData: "To preserve child nodes' data.",
				newNodeTitle: "Add Child Nodes"
			},
			usercard: {
				address: "Address",
				collapse: "Collapse",
				department: "Department",
				email: "email",
				employeeId: "Employee ID",
				employee_id: "Employee ID",
				empno: "Employee Number",
				expand: "Expand",
				fax: "Fax",
				internal: "Internal",
				manager: "Manager",
				mobile: "Mobile",
				other: "Other",
				phone: "Telephone",
				timezone: "Time zone",
				title: "User information: {0}",
				travelcode: "Travel code",
				viop: "VIOP",
				zipcode: "Postal Code"
			},
			richText: {
				bold: "Bold",
				italic: "Tilt",
				underline: "Underline",
				header: "Paragraph Format",
				strike: "Delete Line",
				blockquote: "Block Reference",
				codeBlock: "Insert Code Segment",
				size: "Font Size",
				listOrdered: "No. List",
				listBullet: "Project List",
				header1: "H1",
				header2: "H2",
				align: "Alignment Mode",
				color: "Font Color",
				background: "Background Color",
				image: "Image",
				video: "Video",
				link: "Add Link",
				formula: "Insert Function",
				clean: "Clear Format",
				indent1: "Indent To The Left",
				indent2: "Indent To The Right",
				pickerLabel: "Title Size",
				headerPicker1: "Title 1",
				headerPicker2: "Title 2",
				headerPicker3: "Title 3",
				headerPicker4: "Title 4",
				headerPicker5: "Title 5",
				headerPicker6: "Title 6",
				normal: "Normal",
				sizeSmall: "Small",
				sizeLarge: "Large",
				sizeHuge: "Super Large Size",
				alignPicker1: "Align To The Left",
				alignPicker2: "Align In The Center",
				alignPicker3: "Align To The Right",
				alignPicker4: "Align The Two Ends",
				subScript: "Subscript",
				superScript: "Superscript",
				directionRTL: "Right To Left",
				font: "Font",
				file: "File",
				betterTable: "Table",
				fullscreen: "Fullscreen",
				insertColumnRight: "Insert Column Right",
				insertColumnLeft: "Insert Column Left",
				insertRowUp: "Insert Row Up",
				insertRowDown: "Insert Row Down",
				mergeCells: "Merge Cells",
				unmergeCells: "Split Cells",
				deleteColumn: "Delete Current Column",
				deleteRow: "Delete Current Row",
				deleteTable: "Delete Table",
				colorPicker: "Background Color",
				placeholder: "Insert text here...",
				maxLength: "Text Length exceeds the Limit, max Length config is "
			},
			steps: {
				done: "Completed",
				doing: "Ongoing",
				wait: "Waiting"
			},
			actionSheet: {
				cancel: "Cancel"
			},
			image: {
				loadFail: "Loading failed"
			},
			miniPicker: {
				cancel: "Cancel",
				confirm: "Confirm"
			},
			pullRefresh: {
				pullingDown: "Pull down to refresh",
				pullingUp: "Pull up to refresh",
				pulling: "Pull down to refresh",
				loosing: "Release to refresh",
				success: "Refresh success",
				failed: "Refresh failed",
				noMore: "There is no more"
			},
			currency: {
				defaultCurrency: "Default currency",
				setDefault: "Set as default"
			},
			calendarBar: {
				week: {
					0: "SUN",
					1: "MON",
					2: "TUE",
					3: "WED",
					4: "THU",
					5: "FRI",
					6: "SAT"
				},
				year: "Year %s",
				yearMonth: "%m %y",
				month: {
					1: "January",
					2: "February",
					3: "March",
					4: "April",
					5: "May",
					6: "June",
					7: "July",
					8: "August",
					9: "September",
					10: "October",
					11: "November",
					12: "December"
				},
				monthAbbr: {
					1: "Jan",
					2: "Feb",
					3: "Mar",
					4: "Apr",
					5: "May",
					6: "Jun",
					7: "Jul",
					8: "Aug",
					9: "Sept",
					10: "Oct",
					11: "Nov",
					12: "Dec"
				}
			},
			calendarView: {
				week: {
					0: "SUN",
					1: "MON",
					2: "TUE",
					3: "WED",
					4: "THU",
					5: "FRI",
					6: "SAT"
				},
				weekDays: {
					0: "SUN",
					1: "MON",
					2: "TUE",
					3: "WED",
					4: "THU",
					5: "FRI",
					6: "SAT"
				},
				backToday: "back to today",
				new: "New",
				noSchedule: "No Schedule",
				year: "year",
				month: "month",
				dateFormat: "yyyy-MM"
			},
			selectedBox: {
				select: "Selected (%s)",
				allSelect: "All selected (%s)",
				clear: "Clear"
			},
			record: {
				record: "Record",
				cancel: "Cancel",
				confirm: "Confirm",
				clickToStartRecording: "Click to start recording",
				clickToResumeRecording: "Click to resume recording"
			},
			dialogSelect: {
				treeSearch: "Enter a keyword and press Enter"
			}
		},
		validation: {
			array: {
				len: "must be exactly %s in length",
				min: "cannot be less than %s in length",
				max: "cannot be greater than %s in length",
				range: "must be between %s and %s in length"
			},
			date: {
				format: "date %s is invalid for format %s",
				invalid: "date %s is invalid",
				parse: "date could not be parsed, %s is invalid "
			},
			default: "Validation error on field %s",
			enum: "must be one of %s",
			number: {
				len: "must equal %s",
				min: "cannot be less than %s",
				max: "cannot be greater than %s",
				range: "must be between %s and %s"
			},
			pattern: {
				mismatch: "value %s does not match pattern %s"
			},
			required: "required",
			string: {
				len: "must be exactly %s characters",
				min: "must be at least %s characters",
				max: "cannot be longer than %s characters",
				range: "must be between %s and %s characters"
			},
			types: {
				acceptFile: "not a valid %s",
				acceptImg: "not a valid %s",
				array: "not an %s",
				boolean: "not a %s",
				date: "not a %s",
				dateTime: "not a valid %s",
				dateYM: "not a valid %s",
				dateYMD: "not a valid %s",
				digits: "not a valid %s",
				email: "not a valid %s",
				fileSize: "not a valid %s",
				float: "not a %s",
				hex: "not a valid %s",
				integer: "not an %s",
				longDateTime: "not a valid %s",
				method: "not a %s (function)",
				number: "not a %s",
				object: "not an %s",
				regexp: "not a valid %s",
				specialch: "not a valid %s",
				specialch2: "not a valid %s",
				speczh: "not a valid %s",
				string: "not a %s",
				time: "not a valid %s",
				url: "not a valid %s",
				version: "not a valid %s"
			},
			whitespace: "cannot be empty"
		}
	};
	var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
	function format(string) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}
		if (args.length === 1 && typeof args[0] === "object") {
			args = args[0];
		}
		if (!args || !args.hasOwnProperty) {
			args = {};
		}
		return string.replace(RE_NARGS, function (match, prefix, i, index2) {
			var result;
			if (string[index2 - 1] === "{" && string[index2 + match.length] === "}") {
				return i;
			} else {
				result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null;
				if (result === null || result === void 0) {
					return "";
				}
				return result;
			}
		});
	}
	var lang = zhCN$1;
	var i18nHandler = null;
	var t$1 = function t$12(path, options) {
		if (options === void 0) {
			options = void 0;
		}
		if (i18nHandler) return i18nHandler.apply(this, arguments);
		var array = path.split(".");
		var value = null;
		var current = lang;
		for (var i = 0, j = array.length; i < j; i++) {
			var property = array[i];
			value = current[property] || "";
			if (i === j - 1) return format(value, options);
			if (!value) return "";
			current = value;
		}
		return "";
	};
	var use$1 = function use$12(l) {
		lang = l || lang;
		return lang;
	};
	var language$1 = function language$12() {
		return lang.code;
	};
	var i18n$1 = function i18n$12(fn) {
		i18nHandler = fn || t$1;
		return i18nHandler;
	};
	var extend$1 = extend;
	var initI18n$1 = function initI18n$12(_ref) {
		var app = _ref.app,
			createI18n = _ref.createI18n,
			_ref$messages = _ref.messages,
			messages = _ref$messages === void 0 ? {} : _ref$messages,
			_ref$i18n = _ref.i18n,
			i18n2 = _ref$i18n === void 0 ? {} : _ref$i18n,
			merge = _ref.merge;
		if (typeof merge !== "function") {
			merge = function merge2(_ref2) {
				var lang3 = _ref2.lang,
					i18n3 = _ref2.i18n,
					messages2 = _ref2.messages;
				return extend$1(true, lang3, i18n3.messages, messages2);
			};
		}
		var lang2 = {
			zhCN: zhCN$1,
			enUS: enUS$1
		};
		if (typeof createI18n === "function") {
			var vueI18n = createI18n({
				locale: i18n2.locale || "zhCN",
				messages: merge({
					lang: lang2,
					i18n: i18n2,
					messages
				})
			});
			i18nHandler = function i18nHandler2(key, value) {
				return vueI18n.global.t(key, value);
			};
			return vueI18n;
		}
		if (app && app.config && app.config.globalProperties) {
			app.config.globalProperties.$t = t$1;
		}
		return merge({
			lang: lang2,
			i18n: i18n2,
			messages
		});
	};
	var isVue2 = true;
	var isVue3 = false;
	var index$1$1 = {
		isVue2,
		isVue3,
		use: use$1,
		t: t$1,
		i18n: i18n$1,
		initI18n: initI18n$1,
		extend: extend$1,
		zhCN: zhCN$1,
		enUS: enUS$1
	};
	var vue = /* @__PURE__ */ Object.freeze(
		/* @__PURE__ */ Object.defineProperty(
			{
				__proto__: null,
				default: index$1$1,
				enUS: enUS$1,
				extend: extend$1,
				i18n: i18n$1,
				initI18n: initI18n$1,
				isVue2,
				isVue3,
				language: language$1,
				t: t$1,
				use: use$1,
				zhCN: zhCN$1
			},
			Symbol.toStringTag,
			{
				value: "Module"
			}
		)
	);
	var getNumberFormat = function getNumberFormat2(config) {
		var groupSize = 3;
		var groupSeparator = ",";
		var decimalSeparator = ".";
		if (isPlainObject(config)) {
			return config;
		}
		if (typeof config === "string") {
			var match = config.match(/\d{2}([^\d]?)\d{3}([^\d]?)\d{2}/);
			if (match && match.length === 3) {
				groupSeparator = match[1];
				decimalSeparator = match[2];
			}
		}
		return {
			groupSeparator,
			groupSize,
			decimalSeparator
		};
	};
	var getDateFormat = function getDateFormat2(config) {
		var _config$DateFormat = config.DateFormat,
			DateFormat = _config$DateFormat === void 0 ? "yyyy-MM-dd" : _config$DateFormat,
			_config$TimeFormat = config.TimeFormat,
			TimeFormat = _config$TimeFormat === void 0 ? "HH:mm:ss" : _config$TimeFormat;
		return {
			DateFormat,
			DateTimeFormat: DateFormat + " " + TimeFormat,
			TimeFormat
		};
	};
	var TZRE = /(-|\+)(\d{2}):?(\d{2})$/;
	var getStrTimezone = function getStrTimezone2(value) {
		var localTimeZone = 0 - /* @__PURE__ */ /* @__PURE__ */ new Date().getTimezoneOffset() / 60;
		var match = typeof value === "string" && value.match(TZRE);
		if (match) {
			var minoffset = match[2] * 1 + (match[3] * 1) / 60;
			value = minoffset * (match[1] + "1");
		}
		if (isNumber(value) && value >= -12 && value <= 12) {
			return value;
		}
		return localTimeZone;
	};
	function glob(t2) {
		return function (config) {
			var opt = _extends$2({}, getDateFormat(config), {
				NumberFormat: getNumberFormat(config.NumberFormat),
				DbTimezone: getStrTimezone(config.DbTimezone),
				Timezone: getStrTimezone(config.Timezone)
			});
			var tools2 = {
				getFormatConfig: function getFormatConfig() {
					return opt;
				},
				setFormatConfig: function setFormatConfig(obj) {
					Object.assign(opt, obj);
				},
				getNumberFormat: function getNumberFormat3() {
					return opt.NumberFormat;
				},
				getDateFormat: function getDateFormat3() {
					return {
						DateTimeFormat: opt.DateTimeFormat,
						TimeFormat: opt.TimeFormat,
						Timezone: opt.Timezone,
						DateFormat: opt.DateFormat,
						DbTimezone: opt.DbTimezone
					};
				},
				formatDate: function formatDate$1(value, format2) {
					if (isNull(value)) {
						return value;
					}
					var date = isDate$1(value) ? value : toDate$1(value);
					var dbtimezone = opt.DbTimezone;
					var includeTz = value.match && value.match(TZRE);
					var convers = format2 === false || arguments[2] === false;
					if (includeTz) {
						dbtimezone = getStrTimezone(value);
						date = toDate$1(value.replace("T", " ").slice(0, -5));
					}
					if (!convers) {
						date = this.getDateWithNewTimezone(date, dbtimezone, opt.Timezone);
					}
					return isDate$1(date) ? formatDate(date, format2 || opt.DateFormat, t2) : null;
				},
				formatNumber: function formatNumber$1(value, format2) {
					return formatNumber(value, _extends$2({}, opt.NumberFormat, format2));
				},
				recoverNumber: function recoverNumber$1(value, format2) {
					return recoverNumber(value, _extends$2({}, opt.NumberFormat, format2));
				},
				getDateWithNewTimezone: function getDateWithNewTimezone$1(value, from, to) {
					from = from === 0 ? from : from || opt.DbTimezone;
					to = to === 0 ? to : to || opt.Timezone;
					return getDateWithNewTimezone(value, from, to);
				}
			};
			return tools2;
		};
	}
	vue.use;
	var t = vue.t;
	vue.i18n;
	vue.initI18n;
	vue.extend;
	vue.zhCN;
	vue.enUS;
	var language = vue.language;
	var globalization = glob(t);
	_extends$2({}, index$1$1, {
		language,
		globalization
	});
	var index$2 = "";
	function _extends2() {
		_extends2 = Object.assign
			? Object.assign.bind()
			: function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
					return target;
			  };
		return _extends2.apply(this, arguments);
	}
	var emitter = function emitter2() {
		var listeners = {};
		var on = function on2(event, callback, once) {
			if (once === void 0) {
				once = false;
			}
			if (event && typeof event === "string" && typeof callback === "function") {
				var callbacks = listeners[event] || [];
				listeners[event] = callbacks;
				callbacks.push(callback);
				callback.once = once;
			}
		};
		var emitter22 = {
			emit: function emit(eventName) {
				var _arguments = arguments;
				var callbacks = listeners[eventName];
				if (callbacks) {
					callbacks.forEach(function (callback) {
						return callback.apply(null, [].slice.call(_arguments, 1));
					});
					listeners[eventName] = callbacks.filter(function (callback) {
						return !callback.once;
					});
				}
			},
			on,
			once: function once(event, callback) {
				on(event, callback, true);
			},
			off: function off(event, callback) {
				if (event && typeof event === "string") {
					var callbacks = listeners[event];
					if (typeof callback === "function") {
						listeners[event] = callbacks.filter(function (cb) {
							return cb !== callback;
						});
					} else {
						delete listeners[event];
					}
				} else {
					listeners = {};
				}
			}
		};
		return emitter22;
	};
	var bindFilter = function bindFilter2(props2, attrs) {
		if (attrs === void 0) {
			attrs = {};
		}
		var properties = {};
		for (var name in props2) {
			if (name.indexOf("_") !== 0) {
				properties[name] = props2[name];
			}
		}
		for (var _name in attrs) {
			properties[_name] = attrs[_name];
		}
		return properties;
	};
	var getElementCssClass = function getElementCssClass2(classes, key) {
		if (classes === void 0) {
			classes = {};
		}
		if (typeof key === "object") {
			var keys = Object.keys(key);
			var cls = "";
			keys.forEach(function (k) {
				if (key[k] && classes[k]) cls += classes[k] + " ";
			});
			return cls;
		} else {
			return classes[key] || "";
		}
	};
	var defineAsyncComponent = hooks__namespace.defineAsyncComponent;
	var markRaw = hooks__namespace.markRaw;
	var renderComponent = function renderComponent2(_ref6) {
		var _ref6$view = _ref6.view,
			view = _ref6$view === void 0 ? void 0 : _ref6$view,
			_ref6$component = _ref6.component,
			component = _ref6$component === void 0 ? void 0 : _ref6$component,
			props2 = _ref6.props,
			_ref6$context = _ref6.context,
			attrs = _ref6$context.attrs,
			slots = _ref6$context.slots,
			_ref6$extend = _ref6.extend,
			extend2 = _ref6$extend === void 0 ? {} : _ref6$extend;
		return function () {
			return hooks__namespace.h((view && view.value) || component, _extends2({}, props2, attrs, extend2), slots);
		};
	};
	var rootConfig = function rootConfig2(context) {
		var instance = hooks__namespace.getCurrentInstance();
		context && setInstanceEmitter(instance);
		return instance == null ? void 0 : instance.appContext.config.globalProperties;
	};
	var getComponentName = function getComponentName2() {
		var _instance$type;
		var instance = hooks__namespace.getCurrentInstance();
		var componentName = instance == null ? void 0 : (_instance$type = instance.type) == null ? void 0 : _instance$type.name;
		if (!componentName) {
			var _instance$parent, _instance$parent$type;
			componentName =
				instance == null ? void 0 : (_instance$parent = instance.parent) == null ? void 0 : (_instance$parent$type = _instance$parent.type) == null ? void 0 : _instance$parent$type.name;
		}
		return componentName || "";
	};
	var appContext = function appContext2() {
		var _hooks$getCurrentInst;
		return (
			((_hooks$getCurrentInst = hooks__namespace.getCurrentInstance()) == null ? void 0 : _hooks$getCurrentInst.appContext) || {
				component: function component() {}
			}
		);
	};
	var appProperties = function appProperties2() {
		var instance = hooks__namespace.getCurrentInstance();
		return (instance == null ? void 0 : instance.appContext.config.globalProperties) || {};
	};
	var useRouter = function useRouter2(instance) {
		var _instance;
		if (instance === void 0) {
			instance = hooks__namespace.getCurrentInstance();
		}
		var router = (_instance = instance) == null ? void 0 : _instance.appContext.config.globalProperties.$router;
		var route = router && router.currentRoute.value;
		return {
			route,
			router
		};
	};
	var setInstanceEmitter = function setInstanceEmitter2(instance) {
		var $emitter = emitter();
		if (typeof instance.$emitter === "undefined")
			Object.defineProperty(instance, "$emitter", {
				get: function get() {
					return $emitter;
				}
			});
	};
	var emitEvent = function emitEvent2(vm) {
		var _broadcast = function broadcast(vm2, componentName, eventName, params) {
			var children22 = (vm2.subTree && vm2.subTree.children) || vm2.children;
			Array.isArray(children22) &&
				children22.forEach(function (child) {
					var name = child.type && child.type.componentName;
					var component = child.component;
					if (name === componentName) {
						component.emit(eventName, params);
						component.$emitter && component.$emitter.emit(eventName, params);
					} else {
						_broadcast(child, componentName, eventName, params);
					}
				});
		};
		return {
			dispatch: function dispatch(componentName, eventName, params) {
				var parent22 = vm.parent || vm.root;
				var name = parent22.type && parent22.type.componentName;
				while (parent22 && (!name || name !== componentName)) {
					parent22 = parent22.parent;
					if (parent22) name = parent22.type && parent22.type.componentName;
				}
				if (parent22) {
					var _parent, _parent2$$emitter;
					(_parent = parent22).emit.apply(_parent, [eventName].concat(params));
					parent22.$emitter && (_parent2$$emitter = parent22.$emitter).emit.apply(_parent2$$emitter, [eventName].concat(params));
				}
			},
			broadcast: function broadcast(componentName, eventName, params) {
				_broadcast(vm, componentName, eventName, params);
			}
		};
	};
	var getRealParent = function getRealParent2(vm) {
		if (vm && vm.parent) return vm.parent.type.name === "AsyncComponentWrapper" && vm.parent.parent ? vm.parent.parent : vm.parent;
	};
	var parent = function parent2(vm) {
		return function (handler) {
			var parent22 = getRealParent(vm);
			var level = 0;
			var parentObject = function parentObject2(parent3) {
				return {
					level,
					vm: createVm({}, parent3),
					el: parent3.vnode.el,
					options: parent3.type
				};
			};
			if (typeof handler !== "function") return parent22 ? parentObject(parent22) : {};
			level++;
			while (parent22) {
				if (handler(parentObject(parent22))) break;
				parent22 = getRealParent(parent22);
				level++;
			}
		};
	};
	var children = function children2(vm) {
		return function (handler) {
			if (typeof handler !== "function") return generateChildren(vm.subTree);
			var layer = 1;
			var broadcast = function broadcast2(subTree) {
				if (subTree) {
					var children22 = subTree.children || subTree.dynamicChildren;
					var level = layer++;
					if (Array.isArray(children22)) {
						if (
							children22.some(function (child) {
								return (
									child.component &&
									handler({
										level,
										vm: createVm({}, child.component),
										el: child.el,
										options: child.type,
										isLevel1: true
									})
								);
							})
						)
							return;
						children22.forEach(function (child) {
							return broadcast2(child);
						});
					}
				}
			};
			broadcast(vm.subTree);
		};
	};
	var regEventPrefix = /^on[A-Z]/;
	var generateListeners = function generateListeners2(attrs) {
		var $attrs = {};
		var $listeners = {};
		for (var name in attrs) {
			var event = attrs[name];
			if (regEventPrefix.test(name) && typeof event === "function") {
				$listeners[hyphenate(name.substr(2))] = event;
				continue;
			}
			$attrs[name] = event;
		}
		return {
			$attrs,
			$listeners
		};
	};
	var generateChildren = function generateChildren2(subTree) {
		var children22 = [];
		children22.refs = {};
		if (subTree) {
			var arr = subTree.dynamicChildren || subTree.children;
			if (Array.isArray(arr)) {
				arr.forEach(function (child) {
					if (child.component) {
						var vm = createVm({}, child.component);
						children22.push(vm);
						child.props.ref && (children22.refs[child.props.ref] = vm);
					}
				});
			} else if (subTree.component) {
				children22.push(createVm({}, subTree.component));
			}
		}
		return children22;
	};
	var defineProperties = function defineProperties2(vm, instance, property, filter22) {
		var _loop = function _loop2(name2) {
			if (typeof filter22 === "function" && filter22(name2)) return 1;
			Object.defineProperty(vm, name2, {
				configurable: true,
				enumerable: true,
				get: function get() {
					return instance[property][name2];
				},
				set: function set(value) {
					return (instance[property][name2] = value);
				}
			});
		};
		for (var name in instance[property]) {
			if (_loop(name)) continue;
		}
		return vm;
	};
	var filter = function filter2(name) {
		return name.indexOf("_") === 0;
	};
	var defineInstanceVm = function defineInstanceVm2(vm, instance) {
		defineProperties(vm, instance, "setupState", null);
		defineProperties(vm, instance, "props", filter);
		defineProperties(vm, instance, "ctx", filter);
		return vm;
	};
	var createVm = function createVm2(vm, instance, context) {
		if (context === void 0) {
			context = null;
		}
		var _generateListeners = generateListeners(instance.attrs),
			$attrs = _generateListeners.$attrs,
			$listeners = _generateListeners.$listeners;
		var $emitter = instance.$emitter;
		if (!$emitter) {
			setInstanceEmitter(instance);
			$emitter = instance.$emitter;
		}
		var emit = function emit2() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
			instance.emit.apply(instance, args);
			$emitter.emit.apply(vm, args);
		};
		var $set = function $set2(target, propertyName, value) {
			return (target[propertyName] = value);
		};
		context || defineInstanceVm(vm, instance);
		Object.defineProperties(vm, {
			$attrs: {
				get: function get() {
					return $attrs;
				}
			},
			$children: {
				get: function get() {
					return generateChildren(instance.subTree);
				}
			},
			$constants: {
				get: function get() {
					return instance.props._constants;
				}
			},
			$emit: {
				get: function get() {
					return emit;
				}
			},
			$el: {
				get: function get() {
					return instance.vnode.el;
				}
			},
			$listeners: {
				get: function get() {
					return $listeners;
				}
			},
			$mode: {
				get: function get() {
					return instance._tiny_mode;
				}
			},
			$nextTick: {
				get: function get() {
					return hooks__namespace.nextTick;
				}
			},
			$off: {
				get: function get() {
					return $emitter.off;
				}
			},
			$on: {
				get: function get() {
					return $emitter.on;
				}
			},
			$once: {
				get: function get() {
					return $emitter.once;
				}
			},
			$options: {
				get: function get() {
					return {
						componentName: instance.type.componentName
					};
				}
			},
			$parent: {
				get: function get() {
					return instance.parent && createVm2({}, getRealParent(instance));
				}
			},
			$refs: {
				get: function get() {
					return instance.refs;
				}
			},
			$renderless: {
				get: function get() {
					return instance.props.tiny_renderless;
				}
			},
			$scopedSlots: {
				get: function get() {
					return instance.slots;
				}
			},
			$set: {
				get: function get() {
					return $set;
				}
			},
			$slots: {
				get: function get() {
					return instance.slots;
				}
			},
			$template: {
				get: function get() {
					return instance.props.tiny_template;
				}
			}
		});
		return vm;
	};
	var onBeforeMount = function onBeforeMount2(instance, refs) {
		for (var name in instance.refs) {
			if (Object.prototype.hasOwnProperty.call(instance.refs, name)) {
				refs[name] = instance.refs[name];
			}
		}
	};
	var tools = function tools2(context, mode) {
		var _instance$proxy, _instance$proxy$$root;
		var instance = hooks__namespace.getCurrentInstance();
		var root = instance == null ? void 0 : instance.appContext.config.globalProperties;
		var _useRouter = useRouter(instance),
			route = _useRouter.route,
			router = _useRouter.router;
		var i18n = instance == null ? void 0 : (_instance$proxy = instance.proxy) == null ? void 0 : (_instance$proxy$$root = _instance$proxy.$root) == null ? void 0 : _instance$proxy$$root.$i18n;
		var _emitEvent = emitEvent(instance),
			dispatch = _emitEvent.dispatch,
			broadcast = _emitEvent.broadcast;
		var parentHandler = parent(instance);
		var childrenHandler = children(instance);
		var vm = createVm({}, instance, context);
		var emit = context.emit;
		var refs = {};
		var grandParent = typeof instance.props.tiny_template === "undefined" && getRealParent(instance);
		var parentVm = grandParent ? createVm({}, grandParent) : instance.parent ? createVm({}, instance.parent) : null;
		var setParentAttribute = function setParentAttribute2(_ref7) {
			var _instance$parent2;
			var name = _ref7.name,
				value = _ref7.value;
			var ctx = grandParent ? grandParent.ctx : instance == null ? void 0 : (_instance$parent2 = instance.parent) == null ? void 0 : _instance$parent2.ctx;
			ctx[name] = value;
			parentVm[name] = value;
		};
		var defineInstanceProperties = function defineInstanceProperties2(props2) {
			Object.defineProperties(vm, props2);
			Object.defineProperties(instance == null ? void 0 : instance.ctx, props2);
		};
		var defineParentInstanceProperties = function defineParentInstanceProperties2(props2) {
			parentVm && Object.defineProperties(parentVm, props2);
		};
		hooks__namespace.onBeforeMount(function () {
			return defineInstanceVm(vm, instance);
		});
		hooks__namespace.onMounted(function () {
			return onBeforeMount(instance, refs);
		});
		return {
			framework: "vue3",
			vm,
			emit,
			emitter,
			route,
			router,
			dispatch,
			broadcast,
			parentHandler,
			childrenHandler,
			i18n,
			refs,
			slots: instance == null ? void 0 : instance.slots,
			scopedSlots: instance == null ? void 0 : instance.slots,
			attrs: context.attrs,
			parent: parentVm,
			nextTick: hooks__namespace.nextTick,
			constants: instance == null ? void 0 : instance.props._constants,
			mode,
			isPCMode: mode === "pc",
			isMobileMode: mode === "mobile",
			service: root == null ? void 0 : root.$service,
			getService: function getService() {
				return root == null ? void 0 : root.$getService(vm);
			},
			setParentAttribute,
			defineInstanceProperties,
			defineParentInstanceProperties
		};
	};
	var defineComponent = hooks__namespace.defineComponent;
	var stringifyCssClassObject = function stringifyCssClassObject2(cssClassObject) {
		var allCssClass = [];
		Object.keys(cssClassObject).forEach(function (cssClass) {
			return cssClassObject[cssClass] && allCssClass.push(cssClass);
		});
		return allCssClass.join(" ");
	};
	var stringifyCssClassArray = function stringifyCssClassArray2(cssClassArray) {
		var allCssClass = [];
		cssClassArray.forEach(function (cssClass) {
			if (typeof cssClass === "string") {
				allCssClass.push(cssClass);
			} else if (typeof cssClass === "object") {
				allCssClass.push(stringifyCssClassObject(cssClass));
			}
		});
		return allCssClass.join(" ");
	};
	var stringifyCssClass = function stringifyCssClass2(cssClasses) {
		if (!cssClasses || (Array.isArray(cssClasses) && !cssClasses.length)) return "";
		var allCssClass = [];
		cssClasses.forEach(function (cssClass) {
			if (cssClass) {
				if (typeof cssClass === "string") {
					allCssClass.push(cssClass);
				} else if (Array.isArray(cssClass)) {
					allCssClass.push(stringifyCssClassArray(cssClass));
				} else if (typeof cssClass === "object") {
					allCssClass.push(stringifyCssClassObject(cssClass));
				}
			}
		});
		return allCssClass.join(" ");
	};
	function twJoin() {
		var index2 = 0;
		var argument;
		var resolvedValue;
		var string = "";
		while (index2 < arguments.length) {
			if ((argument = arguments[index2++])) {
				if ((resolvedValue = toValue(argument))) {
					string && (string += " ");
					string += resolvedValue;
				}
			}
		}
		return string;
	}
	function toValue(mix) {
		if (typeof mix === "string") {
			return mix;
		}
		var resolvedValue;
		var string = "";
		for (var k = 0; k < mix.length; k++) {
			if (mix[k]) {
				if ((resolvedValue = toValue(mix[k]))) {
					string && (string += " ");
					string += resolvedValue;
				}
			}
		}
		return string;
	}
	function _extends$1() {
		_extends$1 = Object.assign
			? Object.assign.bind()
			: function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
					return target;
			  };
		return _extends$1.apply(this, arguments);
	}
	function createLruCache(maxCacheSize) {
		if (maxCacheSize < 1) {
			return {
				get: function get() {
					return void 0;
				},
				set: function set() {}
			};
		}
		var cacheSize = 0;
		var cache = /* @__PURE__ */ new Map();
		var previousCache = /* @__PURE__ */ new Map();
		function update(key, value) {
			cache.set(key, value);
			cacheSize++;
			if (cacheSize > maxCacheSize) {
				cacheSize = 0;
				previousCache = cache;
				cache = /* @__PURE__ */ new Map();
			}
		}
		return {
			get: function get(key) {
				var value = cache.get(key);
				if (value !== void 0) {
					return value;
				}
				if ((value = previousCache.get(key)) !== void 0) {
					update(key, value);
					return value;
				}
			},
			set: function set(key, value) {
				if (cache.has(key)) {
					cache.set(key, value);
				} else {
					update(key, value);
				}
			}
		};
	}
	var CLASS_PART_SEPARATOR = "-";
	function createClassUtils(config) {
		var classMap = createClassMap(config);
		function getClassGroupId(className) {
			var classParts = className.split(CLASS_PART_SEPARATOR);
			if (classParts[0] === "" && classParts.length !== 1) {
				classParts.shift();
			}
			return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
		}
		function getConflictingClassGroupIds(classGroupId) {
			return config.conflictingClassGroups[classGroupId] || [];
		}
		return {
			getClassGroupId,
			getConflictingClassGroupIds
		};
	}
	function getGroupRecursive(classParts, classPartObject) {
		var _classPartObject$vali;
		if (classParts.length === 0) {
			return classPartObject.classGroupId;
		}
		var currentClassPart = classParts[0];
		var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
		var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
		if (classGroupFromNextClassPart) {
			return classGroupFromNextClassPart;
		}
		if (classPartObject.validators.length === 0) {
			return void 0;
		}
		var classRest = classParts.join(CLASS_PART_SEPARATOR);
		return (_classPartObject$vali = classPartObject.validators.find(function (_ref) {
			var validator = _ref.validator;
			return validator(classRest);
		})) == null
			? void 0
			: _classPartObject$vali.classGroupId;
	}
	var arbitraryPropertyRegex = /^\[(.+)\]$/;
	function getGroupIdForArbitraryProperty(className) {
		if (arbitraryPropertyRegex.test(className)) {
			var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
			var property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
			if (property) {
				return "arbitrary.." + property;
			}
		}
	}
	function createClassMap(config) {
		var theme = config.theme,
			prefix = config.prefix;
		var classMap = {
			nextPart: /* @__PURE__ */ new Map(),
			validators: []
		};
		var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
		prefixedClassGroupEntries.forEach(function (_ref2) {
			var classGroupId = _ref2[0],
				classGroup = _ref2[1];
			processClassesRecursively(classGroup, classMap, classGroupId, theme);
		});
		return classMap;
	}
	function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
		classGroup.forEach(function (classDefinition) {
			if (typeof classDefinition === "string") {
				var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
				classPartObjectToEdit.classGroupId = classGroupId;
				return;
			}
			if (typeof classDefinition === "function") {
				if (isThemeGetter(classDefinition)) {
					processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
					return;
				}
				classPartObject.validators.push({
					validator: classDefinition,
					classGroupId
				});
				return;
			}
			Object.entries(classDefinition).forEach(function (_ref3) {
				var key = _ref3[0],
					classGroup2 = _ref3[1];
				processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
			});
		});
	}
	function getPart(classPartObject, path) {
		var currentClassPartObject = classPartObject;
		path.split(CLASS_PART_SEPARATOR).forEach(function (pathPart) {
			if (!currentClassPartObject.nextPart.has(pathPart)) {
				currentClassPartObject.nextPart.set(pathPart, {
					nextPart: /* @__PURE__ */ new Map(),
					validators: []
				});
			}
			currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
		});
		return currentClassPartObject;
	}
	function isThemeGetter(func) {
		return func.isThemeGetter;
	}
	function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
		if (!prefix) {
			return classGroupEntries;
		}
		return classGroupEntries.map(function (_ref4) {
			var classGroupId = _ref4[0],
				classGroup = _ref4[1];
			var prefixedClassGroup = classGroup.map(function (classDefinition) {
				if (typeof classDefinition === "string") {
					return prefix + classDefinition;
				}
				if (typeof classDefinition === "object") {
					return Object.fromEntries(
						Object.entries(classDefinition).map(function (_ref5) {
							var key = _ref5[0],
								value = _ref5[1];
							return [prefix + key, value];
						})
					);
				}
				return classDefinition;
			});
			return [classGroupId, prefixedClassGroup];
		});
	}
	var IMPORTANT_MODIFIER = "!";
	function createSplitModifiers(config) {
		var separator = config.separator || ":";
		return function splitModifiers(className) {
			var bracketDepth = 0;
			var modifiers = [];
			var modifierStart = 0;
			for (var index2 = 0; index2 < className.length; index2++) {
				var _char = className[index2];
				if (bracketDepth === 0 && _char === separator[0]) {
					if (separator.length === 1 || className.slice(index2, index2 + separator.length) === separator) {
						modifiers.push(className.slice(modifierStart, index2));
						modifierStart = index2 + separator.length;
					}
				}
				if (_char === "[") {
					bracketDepth++;
				} else if (_char === "]") {
					bracketDepth--;
				}
			}
			var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
			var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
			var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
			return {
				modifiers,
				hasImportantModifier,
				baseClassName
			};
		};
	}
	function sortModifiers(modifiers) {
		if (modifiers.length <= 1) {
			return modifiers;
		}
		var sortedModifiers = [];
		var unsortedModifiers = [];
		modifiers.forEach(function (modifier) {
			var isArbitraryVariant = modifier[0] === "[";
			if (isArbitraryVariant) {
				sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
				unsortedModifiers = [];
			} else {
				unsortedModifiers.push(modifier);
			}
		});
		sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
		return sortedModifiers;
	}
	function createConfigUtils(config) {
		return _extends$1(
			{
				cache: createLruCache(config.cacheSize),
				splitModifiers: createSplitModifiers(config)
			},
			createClassUtils(config)
		);
	}
	var SPLIT_CLASSES_REGEX = /\s+/;
	function mergeClassList(classList, configUtils) {
		var splitModifiers = configUtils.splitModifiers,
			getClassGroupId = configUtils.getClassGroupId,
			getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
		var classGroupsInConflict = /* @__PURE__ */ new Set();
		return classList
			.trim()
			.split(SPLIT_CLASSES_REGEX)
			.map(function (originalClassName) {
				var _splitModifiers = splitModifiers(originalClassName),
					modifiers = _splitModifiers.modifiers,
					hasImportantModifier = _splitModifiers.hasImportantModifier,
					baseClassName = _splitModifiers.baseClassName;
				var classGroupId = getClassGroupId(baseClassName);
				if (!classGroupId) {
					return {
						isTailwindClass: false,
						originalClassName
					};
				}
				var variantModifier = sortModifiers(modifiers).join(":");
				var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
				return {
					isTailwindClass: true,
					modifierId,
					classGroupId,
					originalClassName
				};
			})
			.reverse()
			.filter(function (parsed) {
				if (!parsed.isTailwindClass) {
					return true;
				}
				var modifierId = parsed.modifierId,
					classGroupId = parsed.classGroupId;
				var classId = modifierId + classGroupId;
				if (classGroupsInConflict.has(classId)) {
					return false;
				}
				classGroupsInConflict.add(classId);
				getConflictingClassGroupIds(classGroupId).forEach(function (group) {
					return classGroupsInConflict.add(modifierId + group);
				});
				return true;
			})
			.reverse()
			.map(function (parsed) {
				return parsed.originalClassName;
			})
			.join(" ");
	}
	function createTailwindMerge() {
		for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
			createConfig[_key] = arguments[_key];
		}
		var configUtils;
		var cacheGet;
		var cacheSet;
		var functionToCall = initTailwindMerge;
		function initTailwindMerge(classList) {
			var firstCreateConfig = createConfig[0],
				restCreateConfig = createConfig.slice(1);
			var config = restCreateConfig.reduce(function (previousConfig, createConfigCurrent) {
				return createConfigCurrent(previousConfig);
			}, firstCreateConfig());
			configUtils = createConfigUtils(config);
			cacheGet = configUtils.cache.get;
			cacheSet = configUtils.cache.set;
			functionToCall = tailwindMerge;
			return tailwindMerge(classList);
		}
		function tailwindMerge(classList) {
			var cachedResult = cacheGet(classList);
			if (cachedResult) {
				return cachedResult;
			}
			var result = mergeClassList(classList, configUtils);
			cacheSet(classList, result);
			return result;
		}
		return function callTailwindMerge() {
			return functionToCall(twJoin.apply(null, arguments));
		};
	}
	function fromTheme(key) {
		var themeGetter = function themeGetter2(theme) {
			return theme[key] || [];
		};
		themeGetter.isThemeGetter = true;
		return themeGetter;
	}
	var arbitraryValueRegex = /^\[(.+)\]$/;
	var fractionRegex = /^\d+\/\d+$/;
	var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
	var tshirtUnitRegex = /^(\d+)?(xs|sm|md|lg|xl)$/;
	var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh)/;
	var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
	function isLength(classPart) {
		return !Number.isNaN(Number(classPart)) || stringLengths.has(classPart) || fractionRegex.test(classPart) || isArbitraryLength(classPart);
	}
	function isArbitraryLength(classPart) {
		var _arbitraryValueRegex$;
		var arbitraryValue = (_arbitraryValueRegex$ = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$[1];
		if (arbitraryValue) {
			return arbitraryValue.startsWith("length:") || lengthUnitRegex.test(arbitraryValue);
		}
		return false;
	}
	function isArbitrarySize(classPart) {
		var _arbitraryValueRegex$2;
		var arbitraryValue = (_arbitraryValueRegex$2 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$2[1];
		return arbitraryValue ? arbitraryValue.startsWith("size:") : false;
	}
	function isArbitraryPosition(classPart) {
		var _arbitraryValueRegex$3;
		var arbitraryValue = (_arbitraryValueRegex$3 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$3[1];
		return arbitraryValue ? arbitraryValue.startsWith("position:") : false;
	}
	function isArbitraryUrl(classPart) {
		var _arbitraryValueRegex$4;
		var arbitraryValue = (_arbitraryValueRegex$4 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$4[1];
		return arbitraryValue ? arbitraryValue.startsWith("url(") || arbitraryValue.startsWith("url:") : false;
	}
	function isArbitraryNumber(classPart) {
		var _arbitraryValueRegex$5;
		var arbitraryValue = (_arbitraryValueRegex$5 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$5[1];
		return arbitraryValue ? !Number.isNaN(Number(arbitraryValue)) || arbitraryValue.startsWith("number:") : false;
	}
	function isInteger(classPart) {
		var _arbitraryValueRegex$6;
		var arbitraryValue = (_arbitraryValueRegex$6 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$6[1];
		if (arbitraryValue) {
			return Number.isInteger(Number(arbitraryValue));
		}
		return Number.isInteger(Number(classPart));
	}
	function isArbitraryValue(classPart) {
		return arbitraryValueRegex.test(classPart);
	}
	function isAny() {
		return true;
	}
	function isTshirtSize(classPart) {
		return tshirtUnitRegex.test(classPart);
	}
	function isArbitraryShadow(classPart) {
		var _arbitraryValueRegex$7;
		var arbitraryValue = (_arbitraryValueRegex$7 = arbitraryValueRegex.exec(classPart)) == null ? void 0 : _arbitraryValueRegex$7[1];
		if (arbitraryValue) {
			return shadowRegex.test(arbitraryValue);
		}
		return false;
	}
	function getDefaultConfig() {
		var colors = fromTheme("colors");
		var spacing = fromTheme("spacing");
		var blur2 = fromTheme("blur");
		var brightness = fromTheme("brightness");
		var borderColor = fromTheme("borderColor");
		var borderRadius = fromTheme("borderRadius");
		var borderSpacing = fromTheme("borderSpacing");
		var borderWidth = fromTheme("borderWidth");
		var contrast = fromTheme("contrast");
		var grayscale = fromTheme("grayscale");
		var hueRotate = fromTheme("hueRotate");
		var invert = fromTheme("invert");
		var gap = fromTheme("gap");
		var gradientColorStops = fromTheme("gradientColorStops");
		var inset = fromTheme("inset");
		var margin = fromTheme("margin");
		var opacity = fromTheme("opacity");
		var padding = fromTheme("padding");
		var saturate = fromTheme("saturate");
		var scale = fromTheme("scale");
		var sepia = fromTheme("sepia");
		var skew = fromTheme("skew");
		var space = fromTheme("space");
		var translate = fromTheme("translate");
		var getOverscroll = function getOverscroll2() {
			return ["auto", "contain", "none"];
		};
		var getOverflow = function getOverflow2() {
			return ["auto", "hidden", "clip", "visible", "scroll"];
		};
		var getSpacingWithAuto = function getSpacingWithAuto2() {
			return ["auto", spacing];
		};
		var getLengthWithEmpty = function getLengthWithEmpty2() {
			return ["", isLength];
		};
		var getIntegerWithAuto = function getIntegerWithAuto2() {
			return ["auto", isInteger];
		};
		var getPositions = function getPositions2() {
			return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
		};
		var getLineStyles = function getLineStyles2() {
			return ["solid", "dashed", "dotted", "double", "none"];
		};
		var getBlendModes = function getBlendModes2() {
			return [
				"normal",
				"multiply",
				"screen",
				"overlay",
				"darken",
				"lighten",
				"color-dodge",
				"color-burn",
				"hard-light",
				"soft-light",
				"difference",
				"exclusion",
				"hue",
				"saturation",
				"color",
				"luminosity",
				"plus-lighter"
			];
		};
		var getAlign = function getAlign2() {
			return ["start", "end", "center", "between", "around", "evenly"];
		};
		var getZeroAndEmpty = function getZeroAndEmpty2() {
			return ["", "0", isArbitraryValue];
		};
		var getBreaks = function getBreaks2() {
			return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
		};
		return {
			cacheSize: 500,
			theme: {
				colors: [isAny],
				spacing: [isLength],
				blur: ["none", "", isTshirtSize, isArbitraryLength],
				brightness: [isInteger],
				borderColor: [colors],
				borderRadius: ["none", "", "full", isTshirtSize, isArbitraryLength],
				borderSpacing: [spacing],
				borderWidth: getLengthWithEmpty(),
				contrast: [isInteger],
				grayscale: getZeroAndEmpty(),
				hueRotate: [isInteger],
				invert: getZeroAndEmpty(),
				gap: [spacing],
				gradientColorStops: [colors],
				inset: getSpacingWithAuto(),
				margin: getSpacingWithAuto(),
				opacity: [isInteger],
				padding: [spacing],
				saturate: [isInteger],
				scale: [isInteger],
				sepia: getZeroAndEmpty(),
				skew: [isInteger, isArbitraryValue],
				space: [spacing],
				translate: [spacing]
			},
			classGroups: {
				aspect: [
					{
						aspect: ["auto", "square", "video", isArbitraryValue]
					}
				],
				container: ["container"],
				columns: [
					{
						columns: [isTshirtSize]
					}
				],
				"break-after": [
					{
						"break-after": getBreaks()
					}
				],
				"break-before": [
					{
						"break-before": getBreaks()
					}
				],
				"break-inside": [
					{
						"break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
					}
				],
				"box-decoration": [
					{
						"box-decoration": ["slice", "clone"]
					}
				],
				box: [
					{
						box: ["border", "content"]
					}
				],
				display: [
					"block",
					"inline-block",
					"inline",
					"flex",
					"inline-flex",
					"table",
					"inline-table",
					"table-caption",
					"table-cell",
					"table-column",
					"table-column-group",
					"table-footer-group",
					"table-header-group",
					"table-row-group",
					"table-row",
					"flow-root",
					"grid",
					"inline-grid",
					"contents",
					"list-item",
					"hidden"
				],
				float: [
					{
						float: ["right", "left", "none"]
					}
				],
				clear: [
					{
						clear: ["left", "right", "both", "none"]
					}
				],
				isolation: ["isolate", "isolation-auto"],
				"object-fit": [
					{
						object: ["contain", "cover", "fill", "none", "scale-down"]
					}
				],
				"object-position": [
					{
						object: [].concat(getPositions(), [isArbitraryValue])
					}
				],
				overflow: [
					{
						overflow: getOverflow()
					}
				],
				"overflow-x": [
					{
						"overflow-x": getOverflow()
					}
				],
				"overflow-y": [
					{
						"overflow-y": getOverflow()
					}
				],
				overscroll: [
					{
						overscroll: getOverscroll()
					}
				],
				"overscroll-x": [
					{
						"overscroll-x": getOverscroll()
					}
				],
				"overscroll-y": [
					{
						"overscroll-y": getOverscroll()
					}
				],
				position: ["static", "fixed", "absolute", "relative", "sticky"],
				inset: [
					{
						inset: [inset]
					}
				],
				"inset-x": [
					{
						"inset-x": [inset]
					}
				],
				"inset-y": [
					{
						"inset-y": [inset]
					}
				],
				top: [
					{
						top: [inset]
					}
				],
				right: [
					{
						right: [inset]
					}
				],
				bottom: [
					{
						bottom: [inset]
					}
				],
				left: [
					{
						left: [inset]
					}
				],
				visibility: ["visible", "invisible", "collapse"],
				z: [
					{
						z: [isInteger]
					}
				],
				basis: [
					{
						basis: [spacing]
					}
				],
				"flex-direction": [
					{
						flex: ["row", "row-reverse", "col", "col-reverse"]
					}
				],
				"flex-wrap": [
					{
						flex: ["wrap", "wrap-reverse", "nowrap"]
					}
				],
				flex: [
					{
						flex: ["1", "auto", "initial", "none", isArbitraryValue]
					}
				],
				grow: [
					{
						grow: getZeroAndEmpty()
					}
				],
				shrink: [
					{
						shrink: getZeroAndEmpty()
					}
				],
				order: [
					{
						order: ["first", "last", "none", isInteger]
					}
				],
				"grid-cols": [
					{
						"grid-cols": [isAny]
					}
				],
				"col-start-end": [
					{
						col: [
							"auto",
							{
								span: [isInteger]
							}
						]
					}
				],
				"col-start": [
					{
						"col-start": getIntegerWithAuto()
					}
				],
				"col-end": [
					{
						"col-end": getIntegerWithAuto()
					}
				],
				"grid-rows": [
					{
						"grid-rows": [isAny]
					}
				],
				"row-start-end": [
					{
						row: [
							"auto",
							{
								span: [isInteger]
							}
						]
					}
				],
				"row-start": [
					{
						"row-start": getIntegerWithAuto()
					}
				],
				"row-end": [
					{
						"row-end": getIntegerWithAuto()
					}
				],
				"grid-flow": [
					{
						"grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
					}
				],
				"auto-cols": [
					{
						"auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
					}
				],
				"auto-rows": [
					{
						"auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
					}
				],
				gap: [
					{
						gap: [gap]
					}
				],
				"gap-x": [
					{
						"gap-x": [gap]
					}
				],
				"gap-y": [
					{
						"gap-y": [gap]
					}
				],
				"justify-content": [
					{
						justify: getAlign()
					}
				],
				"justify-items": [
					{
						"justify-items": ["start", "end", "center", "stretch"]
					}
				],
				"justify-self": [
					{
						"justify-self": ["auto", "start", "end", "center", "stretch"]
					}
				],
				"align-content": [
					{
						content: [].concat(getAlign(), ["baseline"])
					}
				],
				"align-items": [
					{
						items: ["start", "end", "center", "baseline", "stretch"]
					}
				],
				"align-self": [
					{
						self: ["auto", "start", "end", "center", "stretch", "baseline"]
					}
				],
				"place-content": [
					{
						"place-content": [].concat(getAlign(), ["baseline", "stretch"])
					}
				],
				"place-items": [
					{
						"place-items": ["start", "end", "center", "baseline", "stretch"]
					}
				],
				"place-self": [
					{
						"place-self": ["auto", "start", "end", "center", "stretch"]
					}
				],
				p: [
					{
						p: [padding]
					}
				],
				px: [
					{
						px: [padding]
					}
				],
				py: [
					{
						py: [padding]
					}
				],
				pt: [
					{
						pt: [padding]
					}
				],
				pr: [
					{
						pr: [padding]
					}
				],
				pb: [
					{
						pb: [padding]
					}
				],
				pl: [
					{
						pl: [padding]
					}
				],
				m: [
					{
						m: [margin]
					}
				],
				mx: [
					{
						mx: [margin]
					}
				],
				my: [
					{
						my: [margin]
					}
				],
				mt: [
					{
						mt: [margin]
					}
				],
				mr: [
					{
						mr: [margin]
					}
				],
				mb: [
					{
						mb: [margin]
					}
				],
				ml: [
					{
						ml: [margin]
					}
				],
				"space-x": [
					{
						"space-x": [space]
					}
				],
				"space-x-reverse": ["space-x-reverse"],
				"space-y": [
					{
						"space-y": [space]
					}
				],
				"space-y-reverse": ["space-y-reverse"],
				w: [
					{
						w: ["auto", "min", "max", "fit", spacing]
					}
				],
				"min-w": [
					{
						"min-w": ["min", "max", "fit", isLength]
					}
				],
				"max-w": [
					{
						"max-w": [
							"0",
							"none",
							"full",
							"min",
							"max",
							"fit",
							"prose",
							{
								screen: [isTshirtSize]
							},
							isTshirtSize,
							isArbitraryLength
						]
					}
				],
				h: [
					{
						h: [spacing, "auto", "min", "max", "fit"]
					}
				],
				"min-h": [
					{
						"min-h": ["min", "max", "fit", isLength]
					}
				],
				"max-h": [
					{
						"max-h": [spacing, "min", "max", "fit"]
					}
				],
				"font-size": [
					{
						text: ["base", isTshirtSize, isArbitraryLength]
					}
				],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [
					{
						font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
					}
				],
				"font-family": [
					{
						font: [isAny]
					}
				],
				"fvn-normal": ["normal-nums"],
				"fvn-ordinal": ["ordinal"],
				"fvn-slashed-zero": ["slashed-zero"],
				"fvn-figure": ["lining-nums", "oldstyle-nums"],
				"fvn-spacing": ["proportional-nums", "tabular-nums"],
				"fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
				tracking: [
					{
						tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryLength]
					}
				],
				leading: [
					{
						leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength]
					}
				],
				"list-style-type": [
					{
						list: ["none", "disc", "decimal", isArbitraryValue]
					}
				],
				"list-style-position": [
					{
						list: ["inside", "outside"]
					}
				],
				"placeholder-color": [
					{
						placeholder: [colors]
					}
				],
				"placeholder-opacity": [
					{
						"placeholder-opacity": [opacity]
					}
				],
				"text-alignment": [
					{
						text: ["left", "center", "right", "justify", "start", "end"]
					}
				],
				"text-color": [
					{
						text: [colors]
					}
				],
				"text-opacity": [
					{
						"text-opacity": [opacity]
					}
				],
				"text-decoration": ["underline", "overline", "line-through", "no-underline"],
				"text-decoration-style": [
					{
						decoration: [].concat(getLineStyles(), ["wavy"])
					}
				],
				"text-decoration-thickness": [
					{
						decoration: ["auto", "from-font", isLength]
					}
				],
				"underline-offset": [
					{
						"underline-offset": ["auto", isLength]
					}
				],
				"text-decoration-color": [
					{
						decoration: [colors]
					}
				],
				"text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
				"text-overflow": ["truncate", "text-ellipsis", "text-clip"],
				indent: [
					{
						indent: [spacing]
					}
				],
				"vertical-align": [
					{
						align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryLength]
					}
				],
				whitespace: [
					{
						whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"]
					}
				],
				break: [
					{
						break: ["normal", "words", "all", "keep"]
					}
				],
				content: [
					{
						content: ["none", isArbitraryValue]
					}
				],
				"bg-attachment": [
					{
						bg: ["fixed", "local", "scroll"]
					}
				],
				"bg-clip": [
					{
						"bg-clip": ["border", "padding", "content", "text"]
					}
				],
				"bg-opacity": [
					{
						"bg-opacity": [opacity]
					}
				],
				"bg-origin": [
					{
						"bg-origin": ["border", "padding", "content"]
					}
				],
				"bg-position": [
					{
						bg: [].concat(getPositions(), [isArbitraryPosition])
					}
				],
				"bg-repeat": [
					{
						bg: [
							"no-repeat",
							{
								repeat: ["", "x", "y", "round", "space"]
							}
						]
					}
				],
				"bg-size": [
					{
						bg: ["auto", "cover", "contain", isArbitrarySize]
					}
				],
				"bg-image": [
					{
						bg: [
							"none",
							{
								"gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
							},
							isArbitraryUrl
						]
					}
				],
				"bg-color": [
					{
						bg: [colors]
					}
				],
				"gradient-from": [
					{
						from: [gradientColorStops]
					}
				],
				"gradient-via": [
					{
						via: [gradientColorStops]
					}
				],
				"gradient-to": [
					{
						to: [gradientColorStops]
					}
				],
				rounded: [
					{
						rounded: [borderRadius]
					}
				],
				"rounded-t": [
					{
						"rounded-t": [borderRadius]
					}
				],
				"rounded-r": [
					{
						"rounded-r": [borderRadius]
					}
				],
				"rounded-b": [
					{
						"rounded-b": [borderRadius]
					}
				],
				"rounded-l": [
					{
						"rounded-l": [borderRadius]
					}
				],
				"rounded-tl": [
					{
						"rounded-tl": [borderRadius]
					}
				],
				"rounded-tr": [
					{
						"rounded-tr": [borderRadius]
					}
				],
				"rounded-br": [
					{
						"rounded-br": [borderRadius]
					}
				],
				"rounded-bl": [
					{
						"rounded-bl": [borderRadius]
					}
				],
				"border-w": [
					{
						border: [borderWidth]
					}
				],
				"border-w-x": [
					{
						"border-x": [borderWidth]
					}
				],
				"border-w-y": [
					{
						"border-y": [borderWidth]
					}
				],
				"border-w-t": [
					{
						"border-t": [borderWidth]
					}
				],
				"border-w-r": [
					{
						"border-r": [borderWidth]
					}
				],
				"border-w-b": [
					{
						"border-b": [borderWidth]
					}
				],
				"border-w-l": [
					{
						"border-l": [borderWidth]
					}
				],
				"border-opacity": [
					{
						"border-opacity": [opacity]
					}
				],
				"border-style": [
					{
						border: [].concat(getLineStyles(), ["hidden"])
					}
				],
				"divide-x": [
					{
						"divide-x": [borderWidth]
					}
				],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [
					{
						"divide-y": [borderWidth]
					}
				],
				"divide-y-reverse": ["divide-y-reverse"],
				"divide-opacity": [
					{
						"divide-opacity": [opacity]
					}
				],
				"divide-style": [
					{
						divide: getLineStyles()
					}
				],
				"border-color": [
					{
						border: [borderColor]
					}
				],
				"border-color-x": [
					{
						"border-x": [borderColor]
					}
				],
				"border-color-y": [
					{
						"border-y": [borderColor]
					}
				],
				"border-color-t": [
					{
						"border-t": [borderColor]
					}
				],
				"border-color-r": [
					{
						"border-r": [borderColor]
					}
				],
				"border-color-b": [
					{
						"border-b": [borderColor]
					}
				],
				"border-color-l": [
					{
						"border-l": [borderColor]
					}
				],
				"divide-color": [
					{
						divide: [borderColor]
					}
				],
				"outline-style": [
					{
						outline: [""].concat(getLineStyles())
					}
				],
				"outline-offset": [
					{
						"outline-offset": [isLength]
					}
				],
				"outline-w": [
					{
						outline: [isLength]
					}
				],
				"outline-color": [
					{
						outline: [colors]
					}
				],
				"ring-w": [
					{
						ring: getLengthWithEmpty()
					}
				],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [
					{
						ring: [colors]
					}
				],
				"ring-opacity": [
					{
						"ring-opacity": [opacity]
					}
				],
				"ring-offset-w": [
					{
						"ring-offset": [isLength]
					}
				],
				"ring-offset-color": [
					{
						"ring-offset": [colors]
					}
				],
				shadow: [
					{
						shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
					}
				],
				"shadow-color": [
					{
						shadow: [isAny]
					}
				],
				opacity: [
					{
						opacity: [opacity]
					}
				],
				"mix-blend": [
					{
						"mix-blend": getBlendModes()
					}
				],
				"bg-blend": [
					{
						"bg-blend": getBlendModes()
					}
				],
				filter: [
					{
						filter: ["", "none"]
					}
				],
				blur: [
					{
						blur: [blur2]
					}
				],
				brightness: [
					{
						brightness: [brightness]
					}
				],
				contrast: [
					{
						contrast: [contrast]
					}
				],
				"drop-shadow": [
					{
						"drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
					}
				],
				grayscale: [
					{
						grayscale: [grayscale]
					}
				],
				"hue-rotate": [
					{
						"hue-rotate": [hueRotate]
					}
				],
				invert: [
					{
						invert: [invert]
					}
				],
				saturate: [
					{
						saturate: [saturate]
					}
				],
				sepia: [
					{
						sepia: [sepia]
					}
				],
				"backdrop-filter": [
					{
						"backdrop-filter": ["", "none"]
					}
				],
				"backdrop-blur": [
					{
						"backdrop-blur": [blur2]
					}
				],
				"backdrop-brightness": [
					{
						"backdrop-brightness": [brightness]
					}
				],
				"backdrop-contrast": [
					{
						"backdrop-contrast": [contrast]
					}
				],
				"backdrop-grayscale": [
					{
						"backdrop-grayscale": [grayscale]
					}
				],
				"backdrop-hue-rotate": [
					{
						"backdrop-hue-rotate": [hueRotate]
					}
				],
				"backdrop-invert": [
					{
						"backdrop-invert": [invert]
					}
				],
				"backdrop-opacity": [
					{
						"backdrop-opacity": [opacity]
					}
				],
				"backdrop-saturate": [
					{
						"backdrop-saturate": [saturate]
					}
				],
				"backdrop-sepia": [
					{
						"backdrop-sepia": [sepia]
					}
				],
				"border-collapse": [
					{
						border: ["collapse", "separate"]
					}
				],
				"border-spacing": [
					{
						"border-spacing": [borderSpacing]
					}
				],
				"border-spacing-x": [
					{
						"border-spacing-x": [borderSpacing]
					}
				],
				"border-spacing-y": [
					{
						"border-spacing-y": [borderSpacing]
					}
				],
				"table-layout": [
					{
						table: ["auto", "fixed"]
					}
				],
				transition: [
					{
						transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
					}
				],
				duration: [
					{
						duration: [isInteger]
					}
				],
				ease: [
					{
						ease: ["linear", "in", "out", "in-out", isArbitraryValue]
					}
				],
				delay: [
					{
						delay: [isInteger]
					}
				],
				animate: [
					{
						animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
					}
				],
				transform: [
					{
						transform: ["", "gpu", "none"]
					}
				],
				scale: [
					{
						scale: [scale]
					}
				],
				"scale-x": [
					{
						"scale-x": [scale]
					}
				],
				"scale-y": [
					{
						"scale-y": [scale]
					}
				],
				rotate: [
					{
						rotate: [isInteger, isArbitraryValue]
					}
				],
				"translate-x": [
					{
						"translate-x": [translate]
					}
				],
				"translate-y": [
					{
						"translate-y": [translate]
					}
				],
				"skew-x": [
					{
						"skew-x": [skew]
					}
				],
				"skew-y": [
					{
						"skew-y": [skew]
					}
				],
				"transform-origin": [
					{
						origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
					}
				],
				accent: [
					{
						accent: ["auto", colors]
					}
				],
				appearance: ["appearance-none"],
				cursor: [
					{
						cursor: [
							"auto",
							"default",
							"pointer",
							"wait",
							"text",
							"move",
							"help",
							"not-allowed",
							"none",
							"context-menu",
							"progress",
							"cell",
							"crosshair",
							"vertical-text",
							"alias",
							"copy",
							"no-drop",
							"grab",
							"grabbing",
							"all-scroll",
							"col-resize",
							"row-resize",
							"n-resize",
							"e-resize",
							"s-resize",
							"w-resize",
							"ne-resize",
							"nw-resize",
							"se-resize",
							"sw-resize",
							"ew-resize",
							"ns-resize",
							"nesw-resize",
							"nwse-resize",
							"zoom-in",
							"zoom-out",
							isArbitraryValue
						]
					}
				],
				"caret-color": [
					{
						caret: [colors]
					}
				],
				"pointer-events": [
					{
						"pointer-events": ["none", "auto"]
					}
				],
				resize: [
					{
						resize: ["none", "y", "x", ""]
					}
				],
				"scroll-behavior": [
					{
						scroll: ["auto", "smooth"]
					}
				],
				"scroll-m": [
					{
						"scroll-m": [spacing]
					}
				],
				"scroll-mx": [
					{
						"scroll-mx": [spacing]
					}
				],
				"scroll-my": [
					{
						"scroll-my": [spacing]
					}
				],
				"scroll-mt": [
					{
						"scroll-mt": [spacing]
					}
				],
				"scroll-mr": [
					{
						"scroll-mr": [spacing]
					}
				],
				"scroll-mb": [
					{
						"scroll-mb": [spacing]
					}
				],
				"scroll-ml": [
					{
						"scroll-ml": [spacing]
					}
				],
				"scroll-p": [
					{
						"scroll-p": [spacing]
					}
				],
				"scroll-px": [
					{
						"scroll-px": [spacing]
					}
				],
				"scroll-py": [
					{
						"scroll-py": [spacing]
					}
				],
				"scroll-pt": [
					{
						"scroll-pt": [spacing]
					}
				],
				"scroll-pr": [
					{
						"scroll-pr": [spacing]
					}
				],
				"scroll-pb": [
					{
						"scroll-pb": [spacing]
					}
				],
				"scroll-pl": [
					{
						"scroll-pl": [spacing]
					}
				],
				"snap-align": [
					{
						snap: ["start", "end", "center", "align-none"]
					}
				],
				"snap-stop": [
					{
						snap: ["normal", "always"]
					}
				],
				"snap-type": [
					{
						snap: ["none", "x", "y", "both"]
					}
				],
				"snap-strictness": [
					{
						snap: ["mandatory", "proximity"]
					}
				],
				touch: [
					{
						touch: [
							"auto",
							"none",
							"pinch-zoom",
							"manipulation",
							{
								pan: ["x", "left", "right", "y", "up", "down"]
							}
						]
					}
				],
				select: [
					{
						select: ["none", "text", "all", "auto"]
					}
				],
				"will-change": [
					{
						"will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
					}
				],
				fill: [
					{
						fill: [colors, "none"]
					}
				],
				"stroke-w": [
					{
						stroke: [isLength, isArbitraryNumber]
					}
				],
				stroke: [
					{
						stroke: [colors, "none"]
					}
				],
				sr: ["sr-only", "not-sr-only"]
			},
			conflictingClassGroups: {
				overflow: ["overflow-x", "overflow-y"],
				overscroll: ["overscroll-x", "overscroll-y"],
				inset: ["inset-x", "inset-y", "top", "right", "bottom", "left"],
				"inset-x": ["right", "left"],
				"inset-y": ["top", "bottom"],
				flex: ["basis", "grow", "shrink"],
				"col-start-end": ["col-start", "col-end"],
				"row-start-end": ["row-start", "row-end"],
				gap: ["gap-x", "gap-y"],
				p: ["px", "py", "pt", "pr", "pb", "pl"],
				px: ["pr", "pl"],
				py: ["pt", "pb"],
				m: ["mx", "my", "mt", "mr", "mb", "ml"],
				mx: ["mr", "ml"],
				my: ["mt", "mb"],
				"font-size": ["leading"],
				"fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
				"fvn-ordinal": ["fvn-normal"],
				"fvn-slashed-zero": ["fvn-normal"],
				"fvn-figure": ["fvn-normal"],
				"fvn-spacing": ["fvn-normal"],
				"fvn-fraction": ["fvn-normal"],
				rounded: ["rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
				"rounded-t": ["rounded-tl", "rounded-tr"],
				"rounded-r": ["rounded-tr", "rounded-br"],
				"rounded-b": ["rounded-br", "rounded-bl"],
				"rounded-l": ["rounded-tl", "rounded-bl"],
				"border-spacing": ["border-spacing-x", "border-spacing-y"],
				"border-w": ["border-w-t", "border-w-r", "border-w-b", "border-w-l"],
				"border-w-x": ["border-w-r", "border-w-l"],
				"border-w-y": ["border-w-t", "border-w-b"],
				"border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
				"border-color-x": ["border-color-r", "border-color-l"],
				"border-color-y": ["border-color-t", "border-color-b"],
				"scroll-m": ["scroll-mx", "scroll-my", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
				"scroll-mx": ["scroll-mr", "scroll-ml"],
				"scroll-my": ["scroll-mt", "scroll-mb"],
				"scroll-p": ["scroll-px", "scroll-py", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
				"scroll-px": ["scroll-pr", "scroll-pl"],
				"scroll-py": ["scroll-pt", "scroll-pb"]
			}
		};
	}
	var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
	var $prefix = "Tiny";
	var $props = {
		tiny_mode: String,
		tiny_mode_root: Boolean,
		tiny_template: [Function, Object],
		tiny_renderless: Function,
		tiny_theme: String,
		tiny_chart_theme: Object
	};
	var props = ["tiny_mode", "tiny_mode_root", "tiny_template", "tiny_renderless", "_constants", "tiny_theme", "tiny_chart_theme"];
	var resolveMode = function resolveMode2(props2, context) {
		var isRightMode = function isRightMode2(mode) {
			return ~["pc", "mobile", "mobile-first"].indexOf(mode);
		};
		var config = rootConfig(context);
		var tinyModeProp = typeof props2.tiny_mode === "string" ? props2.tiny_mode : null;
		var tinyModeInject = hooks__namespace.inject("TinyMode", null);
		var tinyModeGlobal = config.tiny_mode && config.tiny_mode.value;
		if (!isRightMode(tinyModeProp)) tinyModeProp = null;
		if (!isRightMode(tinyModeInject)) tinyModeInject = null;
		if (!isRightMode(tinyModeGlobal)) tinyModeGlobal = null;
		var tinyMode = tinyModeProp || tinyModeInject || tinyModeGlobal || "pc";
		if (props2.tiny_mode_root) {
			hooks__namespace.provide("TinyMode", tinyMode);
		}
		var instance = hooks__namespace.getCurrentInstance();
		Object.defineProperty(instance, "_tiny_mode", {
			value: tinyMode
		});
		return tinyMode;
	};
	var resolveTheme = function resolveTheme2(_ref9) {
		var props2 = _ref9.props,
			context = _ref9.context,
			utils = _ref9.utils;
		var isRightTheme = function isRightTheme2(theme) {
			return ~["tiny", "saas"].indexOf(theme);
		};
		var config = rootConfig(context);
		var tinyThemeProp = typeof props2.tiny_theme === "string" ? props2.tiny_theme : null;
		var tinyThemeInject = hooks__namespace.inject("TinyTheme", null);
		var tinyThemeGlobal = config.tiny_theme && config.tiny_theme.value;
		if (!isRightTheme(tinyThemeProp)) tinyThemeProp = null;
		if (!isRightTheme(tinyThemeInject)) tinyThemeInject = null;
		if (!isRightTheme(tinyThemeGlobal)) tinyThemeGlobal = null;
		var tinyTheme = tinyThemeProp || tinyThemeInject || tinyThemeGlobal || "tiny";
		return (utils.vm.theme = tinyTheme);
	};
	var resolveChartTheme = function resolveChartTheme2(_ref10) {
		var props2 = _ref10.props,
			context = _ref10.context,
			utils = _ref10.utils;
		var config = rootConfig(context);
		var tinyChartProp = typeof props2.tiny_chart_theme === "object" ? props2.tiny_chart_theme : null;
		var tinyChartInject = hooks__namespace.inject("TinyChartTheme", null);
		var tinyChartGlobal = config.tiny_chart_theme && config.tiny_chart_theme.value;
		var tinyChartTheme = tinyChartProp || tinyChartInject || tinyChartGlobal || null;
		return (utils.vm.chart_theme = tinyChartTheme);
	};
	var $setup = function $setup2(_ref11) {
		var props2 = _ref11.props,
			context = _ref11.context,
			template2 = _ref11.template,
			_ref11$extend = _ref11.extend,
			extend2 = _ref11$extend === void 0 ? {} : _ref11$extend;
		var view = hooks__namespace.computed(function () {
			if (typeof props2.tiny_template !== "undefined") return props2.tiny_template;
			var component = template2(resolveMode(props2, context), props2);
			return typeof component === "function" ? defineAsyncComponent(component) : component;
		});
		initComponent();
		return renderComponent({
			view,
			props: props2,
			context,
			extend: extend2
		});
	};
	var mergeClass = function mergeClass2() {
		for (var _len3 = arguments.length, cssClasses = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			cssClasses[_key3] = arguments[_key3];
		}
		return twMerge(stringifyCssClass(cssClasses));
	};
	var design = {
		configKey: Symbol("designConfigKey"),
		configInstance: null
	};
	var setup = function setup2(_ref12) {
		var _globalDesignConfig$c;
		var props2 = _ref12.props,
			context = _ref12.context,
			renderless2 = _ref12.renderless,
			api2 = _ref12.api,
			_ref12$extendOptions = _ref12.extendOptions,
			extendOptions = _ref12$extendOptions === void 0 ? {} : _ref12$extendOptions,
			_ref12$mono = _ref12.mono,
			mono = _ref12$mono === void 0 ? false : _ref12$mono,
			_ref12$classes = _ref12.classes,
			classes = _ref12$classes === void 0 ? {} : _ref12$classes;
		var render2 = typeof props2.tiny_renderless === "function" ? props2.tiny_renderless : renderless2;
		var globalDesignConfig = hooks__namespace.inject(design.configKey, {});
		var designConfig =
			globalDesignConfig == null ? void 0 : (_globalDesignConfig$c = globalDesignConfig.components) == null ? void 0 : _globalDesignConfig$c[getComponentName().replace($prefix, "")];
		var utils = _extends2(
			{
				$prefix,
				t
			},
			tools(context, resolveMode(props2, context)),
			{
				mergeClass,
				designConfig,
				globalDesignConfig
			}
		);
		resolveTheme({
			props: props2,
			context,
			utils
		});
		resolveChartTheme({
			props: props2,
			context,
			utils
		});
		var sdk = render2(props2, hooks__namespace, utils, extendOptions);
		if (typeof (designConfig == null ? void 0 : designConfig.renderless) === "function") {
			Object.assign(sdk, designConfig.renderless(props2, hooks__namespace, utils, sdk));
		}
		var attrs = {
			t,
			vm: utils.vm,
			f: bindFilter,
			a: filterAttrs,
			d: utils.defineInstanceProperties,
			dp: utils.defineParentInstanceProperties,
			gcls: function gcls(key) {
				return getElementCssClass(classes, key);
			},
			m: mergeClass
		};
		attrs.d({
			slots: {
				get: function get() {
					return utils.vm.$slots;
				}
			},
			scopedSlots: {
				get: function get() {
					return utils.vm.$scopedSlots;
				}
			}
		});
		attrs.dp({
			slots: {
				get: function get() {
					return utils.parent.$slots;
				}
			},
			scopedSlots: {
				get: function get() {
					return utils.parent.$scopedSlots;
				}
			}
		});
		initComponent();
		Array.isArray(api2) &&
			api2.forEach(function (name) {
				var value = sdk[name];
				if (typeof value !== "undefined") {
					attrs[name] = value;
					if (!mono) {
						utils.setParentAttribute({
							name,
							value
						});
					}
				}
			});
		return attrs;
	};
	var svg = function svg2(_ref13) {
		var _ref13$name = _ref13.name,
			name = _ref13$name === void 0 ? "Icon" : _ref13$name,
			component = _ref13.component;
		return function (propData) {
			return markRaw(
				defineComponent({
					name: $prefix + name,
					setup: function setup3(props2, context) {
						var _ref14 = context.attrs || {},
							fill = _ref14.fill,
							width = _ref14.width,
							height = _ref14.height,
							customClass = _ref14["custom-class"];
						var mergeProps = Object.assign({}, props2, propData || null);
						var mode = resolveMode(mergeProps, context);
						var isMobileFirst = mode === "mobile-first";
						var tinyTag = {
							"data-tag": isMobileFirst ? "tiny-svg" : null
						};
						var attrs = tinyTag;
						var className = isMobileFirst ? mergeClass("h-4 w-4 inline-block", customClass || "", mergeProps.class || "") : "tiny-svg";
						var extend2 = Object.assign(
							{
								style: {
									fill,
									width,
									height
								},
								class: className,
								isSvg: true
							},
							attrs
						);
						{
							extend2.nativeOn = context.listeners;
						}
						if (name.indexOf("IconRichText") !== -1) {
							{
								extend2.viewBox = "0 0 24 24";
							}
						}
						return renderComponent({
							component,
							props: mergeProps,
							context,
							extend: extend2
						});
					}
				})
			);
		};
	};
	var filterAttrs = function filterAttrs2(attrs, filters, include) {
		var props2 = {};
		var _loop2 = function _loop22(name2) {
			var find = filters.some(function (r) {
				return new RegExp(r).test(name2);
			});
			if ((include && find) || (!include && !find)) {
				props2[name2] = attrs[name2];
			}
		};
		for (var name in attrs) {
			_loop2(name);
		}
		return props2;
	};
	var setupComponent = {};
	var initComponent = function initComponent2() {
		for (var name in setupComponent) {
			var component = setupComponent[name];
			if (typeof component.install === "function") {
				component.install(appContext());
			}
			if (typeof component.init === "function") {
				component.init(appProperties());
			}
		}
		setupComponent = {};
	};
	const isIP6 = str => /^IPv6$/i.test(str);
	const isIP4 = str => /^IPv4$/i.test(str);
	const ipValidator =
		({ props: props2, api: api2 }) =>
		value => {
			let result = true;
			if (props2.type) {
				if (api2.isIP6(props2.type)) {
					result =
						/^(((([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4}))|(((([\da-fA-F]{1,4}):){1,7}:)|((([\da-fA-F]{1,4}):){6}:([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){5}:(([\da-fA-F]{1,4}):)?([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):){0,2}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,3}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,4}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){1}:(([\da-fA-F]{1,4}):){0,5}([\da-fA-F]{1,4}))|(::(([\da-fA-F]{1,4}):){0,6}([\da-fA-F]{1,4}))|(::([\da-fA-F]{1,4})?))|(((([\da-fA-F]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-fA-F]{1,4})::(([\da-fA-F]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-fA-F]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/.test(
							value
						);
				} else if (api2.isIP4(props2.type)) {
					result = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(value);
				}
			}
			return result;
		};
	const getCursorPosition = el => {
		let cursorPos = 0;
		let selectRange = null;
		if (document.selection) {
			selectRange = document.selection.createRange();
			selectRange.moveStart("character", -el.value.length);
			cursorPos = selectRange.text.length;
		}
		if (el.selectionStart || el.selectionStart === "0") {
			cursorPos = el.selectionStart;
		}
		return cursorPos;
	};
	const getValue =
		({ api: api2, props: props2, state }) =>
		() => {
			const valueArr = [];
			let result = "";
			if (api2.isIP6(props2.type)) {
				state.address.forEach(item => {
					if (item.value) {
						item.value = item.value.replace(/[^a-fA-F\d]/g, "");
					}
					item.value && valueArr.push(item.value);
				});
				result = state.address.filter(item => item.value).length === 8 ? valueArr.join(":") : "";
			} else {
				state.address.forEach(item => {
					if (api2.isIP4(props2.type) && item.value) {
						item.value = item.value.replace(/\D/g, "");
					}
					item.value && valueArr.push(item.value);
				});
				result = state.address.filter(item => item.value).length === 4 ? valueArr.join(".") : "";
			}
			return result;
		};
	const setValue =
		({ api: api2, props: props2, state }) =>
		value => {
			if (value) {
				if (api2.ipValidator(value)) {
					if (api2.isIP6(props2.type)) {
						state.address = value.split(":").map(item => ({ value: item }));
						if (state.address.length < 8) {
							let insertIndex = 0;
							state.address.forEach((item, index2) => {
								if (item.value === "") {
									item.value = "0000";
									insertIndex = index2;
								}
							});
							for (var i = 0; i <= 8 - state.address.length; i++) {
								state.address.splice(insertIndex, 0, {
									value: "0000"
								});
							}
						}
					} else {
						state.address = value.split(".").map(item => ({ value: item }));
					}
				}
			} else {
				state.address = api2.isIP6(props2.type) ? new Array(8).fill({ value: "" }) : new Array(4).fill({ value: "" });
			}
		};
	const activeEvent = ({ emit, parent: parent2, state, index: index2, event, type }) => {
		const target = event && event.target ? event.target : parent2.$el.querySelectorAll("input")[index2 || 0];
		type === "focus" && (state.active = true);
		if (!event) {
			if (target && !state.isSelected) {
				state.isSelected = true;
				target[type]();
				setTimeout(() => {
					state.isSelected = false;
				}, 10);
				emit(type, target.value, index2);
			}
		} else {
			!state.isSelected && emit(type, target.value, index2);
		}
	};
	const focus =
		({ emit, parent: parent2, state }) =>
		({ index: index2, event }) => {
			activeEvent({
				emit,
				parent: parent2,
				state,
				index: index2,
				event,
				type: "focus"
			});
		};
	const select =
		({ emit, parent: parent2, state }) =>
		({ index: index2, event }) => {
			activeEvent({
				emit,
				parent: parent2,
				state,
				index: index2,
				event,
				type: "select"
			});
		};
	const inputEvent =
		({ api: api2, componentName, emit, eventName, props: props2 }) =>
		({ item, index: index2 }) => {
			const val = item.value.trim();
			let value = "";
			if (api2.isIP4(props2.type)) {
				if (!index2 && api2.ipValidator(val)) {
					api2.setValue(val);
				} else if (isNaN(val) || val < IPTHRESHOLD.Min || val > IPTHRESHOLD.Max) {
					item.value = "";
				}
			} else {
				if (!index2 && api2.ipValidator(val)) {
					api2.setValue(val);
				} else if (val.length > 4) {
					item.value = item.value.slice(0, 4);
				}
			}
			value = api2.getValue();
			emit("update:modelValue", value, index2);
			api2.dispatch(componentName, eventName, [value]);
		};
	const change =
		({ api: api2, emit }) =>
		() => {
			const value = api2.getValue();
			emit("change", value);
		};
	const blur =
		({ api: api2, componentName, emit, eventName, props: props2, state }) =>
		({ item, index: index2 }) => {
			state.active = false;
			state.isDel = false;
			if (api2.isIP4(props2.type)) {
				item.value = item.value.replace(/\D/g, "");
			}
			emit("blur", item.value, index2);
			api2.dispatch(componentName, eventName, [item.value]);
		};
	const keyup =
		({ api: api2, props: props2 }) =>
		({ item, index: index2, event }) => {
			const { keyCode } = event;
			const value = item.value.trim();
			const nextIndex = index2 + 1;
			if (api2.isIP4(props2.type)) {
				if (isNaN(item.value)) {
					item.value = item.value.replace(/\D/g, "");
					return false;
				}
				if ([KEY_CODE.Tab, KEY_CODE.Space, KEY_CODE.NumpadDecimal, KEY_CODE.NumpadComma].includes(keyCode) && value) {
					api2.select({ index: nextIndex });
					return false;
				}
				if ((value === "0" || value > IPTHRESHOLD.NonNumeric || value.length === 3) && !isNaN(event.key)) {
					api2.focus({ index: nextIndex });
					api2.select({ index: nextIndex });
					return false;
				}
			}
			if (api2.isIP6(props2.type)) {
				if ([KEY_CODE.Tab, KEY_CODE.Space, KEY_CODE.NumpadDecimal, KEY_CODE.NumpadComma].includes(keyCode) && value) {
					api2.select({ index: nextIndex });
					return false;
				}
				if ((value.length === 4 || value === "0000") && (!isNaN(event.key) || (keyCode >= KEY_CODE.KeyA && keyCode <= KEY_CODE.KeyF))) {
					api2.focus({ index: nextIndex });
					api2.select({ index: nextIndex });
					return false;
				}
			}
		};
	const checkError1 = ({ Tab, Space, NumpadDecimal, NumpadComma, keyCode, value }) => [Tab, Space, NumpadDecimal, NumpadComma].includes(keyCode) && value;
	const checkError2 = newValue => newValue && (isNaN(newValue) || newValue > IPTHRESHOLD.Max);
	const checkError3 = ({ isfilterKeyCodes, isSelected, value }) => !isfilterKeyCodes && !isSelected && value === "0";
	const checkError4 = ({ isfilterKeyCodes, isSelected, value, key }) => !isfilterKeyCodes && !isSelected && value + key > IPTHRESHOLD.Max;
	const checkError5 = ({ key, isfilterKeyCodes, value, ctrlKey, keyCode, KeyV }) => isNaN(key) && !isfilterKeyCodes && !(!value && ctrlKey && keyCode === KeyV);
	const isError = ({ key, value, isSelected, isfilterKeyCodes, ctrlKey, keyCode, newValue }) => {
		const { Tab, Space, NumpadDecimal, NumpadComma, KeyV } = KEY_CODE;
		return (
			checkError1({
				Tab,
				Space,
				NumpadDecimal,
				NumpadComma,
				keyCode,
				value
			}) ||
			checkError2(newValue) ||
			checkError3({ isfilterKeyCodes, isSelected, value }) ||
			checkError4({ isfilterKeyCodes, isSelected, value, key }) ||
			checkError5({
				key,
				isfilterKeyCodes,
				value,
				ctrlKey,
				keyCode,
				KeyV
			})
		);
	};
	const keydown =
		({ api: api2, props: props2, state }) =>
		({ item, index: index2, event }) => {
			const { target, key, keyCode, ctrlKey } = event;
			const value = item.value;
			const selectionStart = target.selectionStart;
			const selectionEnd = target.selectionEnd;
			const isSelected = selectionStart !== selectionEnd;
			const cursorPosition = api2.getCursorPosition(target);
			const isfilterKeyCodes = state.filterKeyCodes.includes(keyCode);
			const nextIndex = index2 + 1;
			const lastIndex = index2 - 1;
			const newValue = isSelected && !isfilterKeyCodes && value.substr(0, selectionStart) + key + value.substr(selectionEnd);
			state.isDel = keyCode === KEY_CODE.Backspace || keyCode === KEY_CODE.Delete;
			if (keyCode === KEY_CODE.Backspace && cursorPosition === 0 && !selectionEnd) {
				api2.focus({ index: lastIndex });
				return false;
			}
			if (keyCode === KEY_CODE.ArrowLeft && cursorPosition === 0) {
				api2.focus({ index: lastIndex });
				event.preventDefault();
				return false;
			}
			if (keyCode === KEY_CODE.ArrowRight && cursorPosition === value.length) {
				api2.focus({ index: nextIndex });
				event.preventDefault();
				return false;
			}
			if (
				isError({
					key,
					value,
					isSelected,
					isfilterKeyCodes,
					ctrlKey,
					keyCode,
					newValue,
					api: api2,
					props: props2
				})
			) {
				event.preventDefault();
				return false;
			}
		};
	const getHeightOfSize = (size, isLineHeight = "height") => {
		const sizeMap = {
			medium: "42px",
			small: "36px",
			mini: "24px"
		};
		const sizePX = sizeMap[size];
		return sizePX ? isLineHeight + ":" + sizePX + ";" : "";
	};
	const api = ["state", "focus", "inputEvent", "blur", "keyup", "keydown", "change", "select"];
	const initState = ({ reactive, computed, handleValue, parent: parent2, props: props2 }) => {
		const state = reactive(
			__spreadProps(__spreadValues({}, handleValue.state), {
				active: false,
				isSelected: false,
				filterKeyCodes: [KEY_CODE.AtMark, KEY_CODE.Backspace, KEY_CODE.ArrowLeft, KEY_CODE.ArrowRight, KEY_CODE.Tab, KEY_CODE.Delete],
				formDisabled: computed(() => (parent2.tinyForm || {}).disabled),
				disabled: computed(() => props2.disabled || state.formDisabled),
				heightStyle: computed(() => getHeightOfSize(props2.size)),
				lineHeightStyle: computed(() => getHeightOfSize(props2.size, "line-height")),
				allHeightStyle: computed(() => `${state.heightStyle}${state.lineHeightStyle}`)
			})
		);
		return state;
	};
	const initApi = ({ state, api: api2, dispatch, handleValue, emit, broadcast, parent: parent2, componentName, props: props2, eventName }) => {
		Object.assign(
			api2,
			__spreadProps(__spreadValues({}, handleValue.api), {
				state,
				dispatch,
				broadcast,
				getCursorPosition,
				focus: focus({ emit, props: props2, parent: parent2, state }),
				select: select({ emit, props: props2, parent: parent2, state }),
				blur: blur({
					api: api2,
					componentName,
					emit,
					eventName: eventName.blur,
					props: props2,
					state
				}),
				keyup: keyup({ api: api2, props: props2, parent: parent2 }),
				change: change({ api: api2, emit }),
				keydown: keydown({ api: api2, props: props2, state }),
				inputEvent: inputEvent({
					api: api2,
					emit,
					props: props2,
					componentName,
					eventName: eventName.change
				})
			})
		);
	};
	const useHandleValue = ({ componentName, dispatch, eventName, props: props2, reactive, toRefs, watch }) => {
		const state = reactive({
			address: [],
			isDel: false
		});
		const api2 = {
			isIP6,
			isIP4
		};
		api2.getValue = getValue({ api: api2, props: props2, state });
		api2.setValue = setValue({ api: api2, props: props2, state });
		api2.ipValidator = ipValidator({ api: api2, props: props2 });
		watch(
			() => props2.modelValue,
			value => {
				if (!state.isDel) {
					api2.setValue(value);
					dispatch(componentName, eventName, [value]);
				}
			},
			{ immediate: true }
		);
		return {
			state: toRefs(state),
			api: api2
		};
	};
	const renderless = (props2, { reactive, toRefs, watch, inject, computed }, { $prefix: $prefix2, emit, parent: parent2, broadcast, dispatch }) => {
		const api2 = {};
		const componentName = "FormItem";
		const eventName = {
			change: "form.change",
			blur: "form.blur"
		};
		parent2.tinyForm = parent2.tinyForm || inject("form", null);
		const handleValue = useHandleValue({
			componentName,
			dispatch,
			eventName: eventName.change,
			props: props2,
			reactive,
			toRefs,
			watch
		});
		const state = initState({
			reactive,
			computed,
			handleValue,
			parent: parent2,
			props: props2
		});
		initApi({
			api: api2,
			state,
			handleValue,
			dispatch,
			broadcast,
			emit,
			props: props2,
			parent: parent2,
			componentName,
			eventName
		});
		return api2;
	};
	var _hoisted_1$1 = {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 612 792",
		"xml:space": "preserve"
	};
	var _hoisted_2$1 = /* @__PURE__ */ hooks.createElementVNode(
		"circle",
		{
			cx: "308.501",
			cy: "416.499",
			r: "97.623",
			transform: "translate(-11 -10)"
		},
		null,
		-1
	);
	var _hoisted_3$1 = [_hoisted_2$1];
	function render(_ctx, _cache) {
		return hooks.openBlock(), hooks.createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
	}
	var DotIpv4 = {
		render
	};
	var index$1 = function index2() {
		return svg({
			name: "IconDotIpv4",
			component: DotIpv4
		})();
	};
	function _createForOfIteratorHelperLoose_tiny(o, allowArrayLike) {
		var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
		if (it) return (it = it.call(o)).next.bind(it);
		if (Array.isArray(o) || (it = _unsupportedIterableToArray_tiny(o)) || (allowArrayLike && o && typeof o.length === "number")) {
			if (it) o = it;
			var i = 0;
			return function () {
				if (i >= o.length) return { done: true };
				return { done: false, value: o[i++] };
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray_tiny(o, minLen) {
		if (!o) return;
		if (typeof o === "string") return _arrayLikeToArray_tiny(o, minLen);
		var n = Object.prototype.toString.call(o).slice(8, -1);
		if (n === "Object" && o.constructor) n = o.constructor.name;
		if (n === "Map" || n === "Set") return Array.from(o);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray_tiny(o, minLen);
	}
	function _arrayLikeToArray_tiny(arr, len) {
		if (len == null || len > arr.length) len = arr.length;
		for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
		return arr2;
	}
	var _export_sfc = function _export_sfc2(sfc, props2) {
		var target = sfc.__vccOpts || sfc;
		for (var _iterator = _createForOfIteratorHelperLoose_tiny(props2), _step; !(_step = _iterator()).done; ) {
			var _step$value = _step.value,
				key = _step$value[0],
				val = _step$value[1];
			target[key] = val;
		}
		return target;
	};
	var _sfc_main = defineComponent({
		props: [].concat(props, ["size", "modelValue", "type", "readonly", "disabled", "delimiter"]),
		emits: ["update:modelValue", "change", "blur", "focus", "select", "inputEvent"],
		components: {
			IconDotIpv4: index$1()
		},
		setup: function setup$1(props2, context) {
			return setup({
				props: props2,
				context,
				renderless,
				api
			});
		}
	});
	var _hoisted_1 = {
		class: "tiny-ip-address"
	};
	var _hoisted_2 = ["readonly", "disabled", "onUpdate:modelValue", "onSelect", "onFocus", "onInput", "onBlur", "onKeyup", "onKeydown"];
	var _hoisted_3 = {
		key: 0,
		class: "tiny-ip-address__input__ipv6-delimiter"
	};
	function _sfc_render(_ctx, _cache, $props2, $setup2, $data, $options) {
		return (
			hooks.openBlock(),
			hooks.createElementBlock("div", _hoisted_1, [
				hooks.createElementVNode(
					"ul",
					{
						class: hooks.normalizeClass({
							active: _ctx.state.active,
							disabled: _ctx.state.disabled,
							"tiny-ip-address__input": true
						}),
						style: hooks.normalizeStyle(_ctx.state.heightStyle)
					},
					[
						(hooks.openBlock(true),
						hooks.createElementBlock(
							hooks.Fragment,
							null,
							hooks.renderList(_ctx.state.address, function (item, index2) {
								return (
									hooks.openBlock(),
									hooks.createElementBlock(
										"li",
										{
											key: index2,
											style: hooks.normalizeStyle(_ctx.state.lineHeightStyle)
										},
										[
											hooks.withDirectives(
												hooks.createElementVNode(
													"input",
													{
														style: hooks.normalizeStyle(_ctx.state.allHeightStyle),
														ref_for: true,
														ref: "inputs",
														readonly: _ctx.readonly,
														disabled: _ctx.state.disabled,
														"onUpdate:modelValue": function onUpdateModelValue($event) {
															return (item.value = $event);
														},
														type: "text",
														onSelect: function onSelect($event) {
															return _ctx.select({
																value: item,
																index: index2,
																event: $event
															});
														},
														onFocus: function onFocus($event) {
															return _ctx.focus({
																index: index2,
																event: $event
															});
														},
														onInput: function onInput($event) {
															return _ctx.inputEvent({
																item,
																index: index2
															});
														},
														onChange:
															_cache[0] ||
															(_cache[0] = function () {
																return _ctx.change && _ctx.change.apply(_ctx, arguments);
															}),
														onBlur: function onBlur($event) {
															return _ctx.blur({
																item,
																index: index2
															});
														},
														onKeyup: function onKeyup($event) {
															return _ctx.keyup({
																item,
																index: index2,
																event: $event
															});
														},
														onKeydown: function onKeydown($event) {
															return _ctx.keydown({
																item,
																index: index2,
																event: $event
															});
														},
														tabindex: "1"
													},
													null,
													44,
													_hoisted_2
												),
												[[hooks.vModelText, item.value]]
											),
											index2 < _ctx.state.address.length - 1
												? hooks.renderSlot(
														_ctx.$slots,
														"default",
														{
															key: 0,
															slotScope: {
																state: _ctx.state,
																index: index2,
																item
															}
														},
														function () {
															return [
																_ctx.type === "IPv6" && _ctx.delimiter === "icon-dot-ipv4"
																	? (hooks.openBlock(), hooks.createElementBlock("span", _hoisted_3, ":"))
																	: (hooks.openBlock(),
																	  hooks.createBlock(hooks.resolveDynamicComponent(_ctx.delimiter), {
																			key: 1,
																			class: "tiny-svg-size"
																	  }))
															];
														}
												  )
												: hooks.createCommentVNode("v-if", true)
										],
										4
									)
								);
							}),
							128
						))
					],
					6
				)
			])
		);
	}
	var pc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
	var index = "";
	function _extends() {
		_extends = Object.assign
			? Object.assign.bind()
			: function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];
						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}
					return target;
			  };
		return _extends.apply(this, arguments);
	}
	var template = function template2(mode) {
		return pc;
	};
	var IpAddress = defineComponent({
		name: $prefix + "IpAddress",
		props: _extends({}, $props, {
			size: String,
			modelValue: String,
			type: {
				type: String,
				default: "IPv4",
				validator: function validator(value) {
					return Boolean(~["IPv4", "IPv6"].indexOf(value));
				}
			},
			readonly: Boolean,
			disabled: Boolean,
			delimiter: {
				type: [String, Object],
				default: "icon-dot-ipv4"
			}
		}),
		setup: function setup2(props2, context) {
			return $setup({
				props: props2,
				context,
				template
			});
		}
	});
	var version = "3.11.0";
	IpAddress.model = {
		prop: "modelValue",
		event: "update:modelValue"
	};
	IpAddress.install = function (Vue) {
		Vue.component(IpAddress.name, IpAddress);
	};
	IpAddress.version = version;
	debugger;
	Vue.IpAddress = IpAddress;
	console.log(IpAddress);
	return Vue.IpAddress;
})(window.Vue);
