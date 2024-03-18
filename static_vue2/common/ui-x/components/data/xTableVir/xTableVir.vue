<script lang="ts">
export default async function () {
	const { emptyRender } = await _.$importVue("/common/ui-x/components/data/xTableVir/xTableEmptyRender.vue");
	_.each(
		{
			ComponentTableV2HeaderRow: "/common/ui-x/components/data/xTableVir/ComponentTableV2HeaderRow.vue",
			ComponentTableV2Grid: "/common/ui-x/components/data/xTableVir/ComponentTableV2Grid.vue",
			ComponentTableV2Row: "/common/ui-x/components/data/xTableVir/ComponentTableV2Row.vue"
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	const {
		identity,
		useEventListener,
		isClient,
		sum,
		tryCall,
		enforceUnit,
		componentToSlot,
		TableV2InjectionKey,
		useNamespace,
		addUnit,
		/* **************** */
		buildProp,
		buildProps,
		tableV2Props
	} = _useXui;

	/* resolveDynamicComponent */
	const { merge_hFnProps } = Vue;
	var _a;

	isClient && ((_a = window == null ? false : window.navigator) == null ? false : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);

	const _global = window;
	const globalKey = "__vueuse_ssr_handlers__";
	_global[globalKey] = _global[globalKey] || {};
	_global[globalKey];

	var __defProp = Object.defineProperty;
	var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
		for (var prop in b || (b = {})) if (hasOwnProperty.call(b, prop)) __defNormalProp(a, prop, b[prop]);
		if (__getOwnPropSymbols)
			for (var prop of __getOwnPropSymbols(b)) {
				if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
			}
		return a;
	};
	const _TransitionPresets = {
		easeInSine: [0.12, 0, 0.39, 0],
		easeOutSine: [0.61, 1, 0.88, 1],
		easeInOutSine: [0.37, 0, 0.63, 1],
		easeInQuad: [0.11, 0, 0.5, 0],
		easeOutQuad: [0.5, 1, 0.89, 1],
		easeInOutQuad: [0.45, 0, 0.55, 1],
		easeInCubic: [0.32, 0, 0.67, 0],
		easeOutCubic: [0.33, 1, 0.68, 1],
		easeInOutCubic: [0.65, 0, 0.35, 1],
		easeInQuart: [0.5, 0, 0.75, 0],
		easeOutQuart: [0.25, 1, 0.5, 1],
		easeInOutQuart: [0.76, 0, 0.24, 1],
		easeInQuint: [0.64, 0, 0.78, 0],
		easeOutQuint: [0.22, 1, 0.36, 1],
		easeInOutQuint: [0.83, 0, 0.17, 1],
		easeInExpo: [0.7, 0, 0.84, 0],
		easeOutExpo: [0.16, 1, 0.3, 1],
		easeInOutExpo: [0.87, 0, 0.13, 1],
		easeInCirc: [0.55, 0, 1, 0.45],
		easeOutCirc: [0, 0.55, 0.45, 1],
		easeInOutCirc: [0.85, 0, 0.15, 1],
		easeInBack: [0.36, 0, 0.66, -0.56],
		easeOutBack: [0.34, 1.56, 0.64, 1],
		easeInOutBack: [0.68, -0.6, 0.32, 1.6]
	};
	__spreadValues(
		{
			linear: identity
		},
		_TransitionPresets
	);

	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	var root = freeGlobal || freeSelf || Function("return this")();
	var symToStringTag$1 = root.Symbol ? root.Symbol.toStringTag : false;

	function getRawTag(value) {
		var isOwn = hasOwnProperty.call(value, symToStringTag$1),
			tag = value[symToStringTag$1];
		try {
			value[symToStringTag$1] = false;
			var unmasked = true;
		} catch (e) {}
		var result = _toString.call(value);
		if (unmasked) {
			if (isOwn) {
				value[symToStringTag$1] = tag;
			} else {
				delete value[symToStringTag$1];
			}
		}
		return result;
	}

	var nullTag = "[object Null]",
		undefinedTag = "[object Undefined]";
	var symToStringTag = root.Symbol ? root.Symbol.toStringTag : false;

	function baseGetTag(value) {
		if (value == null) {
			return value === false ? undefinedTag : nullTag;
		}
		return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : _toString(value);
	}

	function isObjectLike(value) {
		return value != null && typeof value == "object";
	}

	var symbolTag = "[object Symbol]";

	function isSymbol(value) {
		return typeof value == "symbol" || (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	function arrayMap(array, iteratee) {
		var index = -1,
			length = array == null ? 0 : array.length,
			result = Array(length);
		while (++index < length) {
			result[index] = iteratee(array[index], index, array);
		}
		return result;
	}

	var INFINITY$1 = 1 / 0;
	var symbolProto = root.Symbol ? root.Symbol.prototype : false,
		symbolToString = symbolProto ? symbolProto.toString : false;

	function baseToString(value) {
		if (typeof value == "string") {
			return value;
		}
		if (_.isArray(value)) {
			return arrayMap(value, baseToString) + "";
		}
		if (isSymbol(value)) {
			return symbolToString ? symbolToString.call(value) : "";
		}
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
	}

	var reWhitespace = /\s/;

	function trimmedEndIndex(string) {
		var index = string.length;
		while (index-- && reWhitespace.test(string.charAt(index))) {}
		return index;
	}

	var reTrimStart = /^\s+/;

	function baseTrim(string) {
		return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
	}

	function isObject(value) {
		var type = typeof value;
		return value != null && (type == "object" || type == "function");
	}

	var NAN = 0 / 0;
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	var reIsBinary = /^0b[01]+$/i;
	var reIsOctal = /^0o[0-7]+$/i;
	var freeParseInt = parseInt;

	function toNumber(value) {
		if (typeof value == "number") {
			return value;
		}
		if (isSymbol(value)) {
			return NAN;
		}
		if (isObject(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject(other) ? other + "" : other;
		}
		if (typeof value != "string") {
			return value === 0 ? value : +value;
		}
		value = baseTrim(value);
		var isBinary = reIsBinary.test(value);
		return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	var asyncTag = "[object AsyncFunction]",
		funcTag = "[object Function]",
		genTag = "[object GeneratorFunction]",
		proxyTag = "[object Proxy]";

	function isFunction(value) {
		if (!isObject(value)) {
			return false;
		}
		var tag = baseGetTag(value);
		return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var coreJsData = root["__core-js_shared__"];
	var coreJsData$1 = coreJsData;
	var maskSrcKey = (function () {
		var uid = /[^.]+$/.exec((coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO) || "");
		return uid ? "Symbol(src)_1." + uid : "";
	})();

	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}

	var funcProto$1 = Function.prototype;
	var funcToString$1 = funcProto$1.toString;

	function toSource(func) {
		if (func != null) {
			try {
				return funcToString$1.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}

	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	var funcProto = Function.prototype;
	var funcToString = funcProto.toString;
	var reIsNative = RegExp(
		"^" +
			funcToString
				.call(hasOwnProperty)
				.replace(reRegExpChar, "\\$&")
				.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
			"$"
	);

	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) {
			return false;
		}
		var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
		return pattern.test(toSource(value));
	}

	function getValue(object, key) {
		return object == null ? false : object[key];
	}

	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : false;
	}

	function eq(value, other) {
		return value === other || (value !== value && other !== other);
	}

	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		reIsPlainProp = /^\w*$/;

	function isKey(value, object) {
		if (_.isArray(value)) {
			return false;
		}
		var type = typeof value;
		if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
			return true;
		}
		return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
	}

	var nativeCreate = getNative(Object, "create");
	var nativeCreate$1 = nativeCreate;

	function hashClear() {
		this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
		this.size = 0;
	}

	function hashDelete(key) {
		var result = this.has(key) && delete this.__data__[key];
		this.size -= result ? 1 : 0;
		return result;
	}

	var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";

	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate$1) {
			var result = data[key];
			return result === HASH_UNDEFINED$1 ? false : result;
		}
		return hasOwnProperty.call(data, key) ? data[key] : false;
	}

	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate$1 ? data[key] !== false : hasOwnProperty.call(data, key);
	}

	var HASH_UNDEFINED = "__lodash_hash_undefined__";

	function hashSet(key, value) {
		var data = this.__data__;
		this.size += this.has(key) ? 0 : 1;
		data[key] = nativeCreate$1 && value === false ? HASH_UNDEFINED : value;
		return this;
	}

	function Hash(entries) {
		var index = -1,
			length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	function listCacheClear() {
		this.__data__ = [];
		this.size = 0;
	}

	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) {
			if (eq(array[length][0], key)) {
				return length;
			}
		}
		return -1;
	}

	var arrayProto = Array.prototype;
	var splice = arrayProto.splice;

	function listCacheDelete(key) {
		var data = this.__data__,
			index = assocIndexOf(data, key);
		if (index < 0) {
			return false;
		}
		var lastIndex = data.length - 1;
		if (index == lastIndex) {
			data.pop();
		} else {
			splice.call(data, index, 1);
		}
		--this.size;
		return true;
	}

	function listCacheGet(key) {
		var data = this.__data__,
			index = assocIndexOf(data, key);
		return index < 0 ? false : data[index][1];
	}

	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}

	function listCacheSet(key, value) {
		var data = this.__data__,
			index = assocIndexOf(data, key);
		if (index < 0) {
			++this.size;
			data.push([key, value]);
		} else {
			data[index][1] = value;
		}
		return this;
	}

	function ListCache(entries) {
		var index = -1,
			length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	var Map = getNative(root, "Map");
	var Map$1 = Map;

	function mapCacheClear() {
		this.size = 0;
		this.__data__ = {
			hash: new Hash(),
			map: new (Map$1 || ListCache)(),
			string: new Hash()
		};
	}

	function isKeyable(value) {
		var type = typeof value;
		return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
	}

	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}

	function mapCacheDelete(key) {
		var result = getMapData(this, key)["delete"](key);
		this.size -= result ? 1 : 0;
		return result;
	}

	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}

	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}

	function mapCacheSet(key, value) {
		var data = getMapData(this, key),
			size = data.size;
		data.set(key, value);
		this.size += data.size == size ? 0 : 1;
		return this;
	}

	function MapCache(entries) {
		var index = -1,
			length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	var FUNC_ERROR_TEXT$1 = "Expected a function";

	function memoize(func, resolver) {
		if (typeof func != "function" || (resolver != null && typeof resolver != "function")) {
			throw new TypeError(FUNC_ERROR_TEXT$1);
		}
		var memoized = function () {
			var args = arguments,
				key = resolver ? resolver.apply(this, args) : args[0],
				cache2 = memoized.cache;
			if (cache2.has(key)) {
				return cache2.get(key);
			}
			var result = func.apply(this, args);
			memoized.cache = cache2.set(key, result) || cache2;
			return result;
		};
		memoized.cache = new (memoize.Cache || MapCache)();
		return memoized;
	}

	memoize.Cache = MapCache;
	var MAX_MEMOIZE_SIZE = 500;

	function memoizeCapped(func) {
		var result = memoize(func, function (key) {
			if (cache2.size === MAX_MEMOIZE_SIZE) {
				cache2.clear();
			}
			return key;
		});
		var cache2 = result.cache;
		return result;
	}

	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	var reEscapeChar = /\\(\\)?/g;
	var stringToPath = memoizeCapped(function (string) {
		var result = [];
		if (string.charCodeAt(0) === 46) {
			result.push("");
		}
		string.replace(rePropName, function (match, number, quote, subString) {
			result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
		});
		return result;
	});
	var stringToPath$1 = stringToPath;

	function toString(value) {
		return value == null ? "" : baseToString(value);
	}

	function castPath(value, object) {
		if (_.isArray(value)) {
			return value;
		}
		return isKey(value, object) ? [value] : stringToPath$1(toString(value));
	}

	var INFINITY = 1 / 0;

	function toKey(value) {
		if (typeof value == "string" || isSymbol(value)) {
			return value;
		}
		var result = value + "";
		return result == "0" && 1 / value == -INFINITY ? "-0" : result;
	}

	function baseGet(object, path) {
		path = castPath(path, object);
		var index = 0,
			length = path.length;
		while (object != null && index < length) {
			object = object[toKey(path[index++])];
		}
		return index && index == length ? object : false;
	}

	function get(object, path, defaultValue) {
		var result = object == null ? false : baseGet(object, path);
		return result === false ? defaultValue : result;
	}

	var now = function () {
		return root.Date.now();
	};
	var now$1 = now;
	var FUNC_ERROR_TEXT = "Expected a function";
	var nativeMax = Math.max,
		nativeMin = Math.min;

	function debounce(func, wait, options) {
		var lastArgs,
			lastThis,
			maxWait,
			result,
			timerId,
			lastCallTime,
			lastInvokeTime = 0,
			leading = false,
			maxing = false,
			trailing = true;
		if (typeof func != "function") {
			throw new TypeError(FUNC_ERROR_TEXT);
		}
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = "maxWait" in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options ? !!options.trailing : trailing;
		}

		function invokeFunc(time) {
			var args = lastArgs,
				thisArg = lastThis;
			lastArgs = lastThis = false;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}

		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}

		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime,
				timeWaiting = wait - timeSinceLastCall;
			return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
		}

		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === false || timeSinceLastCall >= wait || timeSinceLastCall < 0 || (maxing && timeSinceLastInvoke >= maxWait);
		}

		function timerExpired() {
			var time = now$1();
			if (shouldInvoke(time)) {
				return trailingEdge(time);
			}
			timerId = setTimeout(timerExpired, remainingWait(time));
		}

		function trailingEdge(time) {
			timerId = false;
			if (trailing && lastArgs) {
				return invokeFunc(time);
			}
			lastArgs = lastThis = false;
			return result;
		}

		function cancel() {
			if (timerId !== false) {
				clearTimeout(timerId);
			}
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = false;
		}

		function flush() {
			return timerId === false ? result : trailingEdge(now$1());
		}

		function debounced() {
			var time = now$1(),
				isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === false) {
					return leadingEdge(lastCallTime);
				}
				if (maxing) {
					clearTimeout(timerId);
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === false) {
				timerId = setTimeout(timerExpired, wait);
			}
			return result;
		}

		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}

	!isClient ? false : document.body;
	/*! Element Plus Icons Vue v2.0.6 */
	var export_helper_default = (sfc, props) => {
		let target = sfc.__vccOpts || sfc;
		for (let [key, val] of props) target[key] = val;
		return target;
	};
	var _sfc_main10 = {
		name: "ArrowRight"
	};

	function _sfc_render10(_ctx, _cache, $props, $setup, $data, $options) {
		var _hoisted_110 = {
				viewBox: "0 0 1024 1024",
				xmlns: "http://www.w3.org/2000/svg"
			},
			_hoisted_210 = /* @__PURE__ */ h(
				"path",
				{
					fill: "currentColor",
					d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
				},
				null,
				-1
			),
			_hoisted_310 = [_hoisted_210];
		return h("svg", _hoisted_110, _hoisted_310);
	}

	var arrow_right_default = /* @__PURE__ */ export_helper_default(_sfc_main10, [
		["render", _sfc_render10],
		["__file", "arrow-right.vue"]
	]);
	var _sfc_main236 = {
		name: "SortDown"
	};

	function _sfc_render236(_ctx, _cache, $props, $setup, $data, $options) {
		var _hoisted_1236 = {
				viewBox: "0 0 1024 1024",
				xmlns: "http://www.w3.org/2000/svg"
			},
			_hoisted_2236 = /* @__PURE__ */ h(
				"path",
				{
					fill: "currentColor",
					d: "M576 96v709.568L333.312 562.816A32 32 0 1 0 288 608l297.408 297.344A32 32 0 0 0 640 882.688V96a32 32 0 0 0-64 0z"
				},
				null,
				-1
			),
			_hoisted_3235 = [_hoisted_2236];
		return h("svg", _hoisted_1236, _hoisted_3235);
	}

	var sort_down_default = /* @__PURE__ */ export_helper_default(_sfc_main236, [
		["render", _sfc_render236],
		["__file", "sort-down.vue"]
	]);
	var _sfc_main237 = {
		name: "SortUp"
	};

	function _sfc_render237(_ctx, _cache, $props, $setup, $data, $options) {
		var _hoisted_1237 = {
				viewBox: "0 0 1024 1024",
				xmlns: "http://www.w3.org/2000/svg"
			},
			_hoisted_2237 = /* @__PURE__ */ h(
				"path",
				{
					fill: "currentColor",
					d: "M384 141.248V928a32 32 0 1 0 64 0V218.56l242.688 242.688A32 32 0 1 0 736 416L438.592 118.656A32 32 0 0 0 384 141.248z"
				},
				null,
				-1
			),
			_hoisted_3236 = [_hoisted_2237];
		return h("svg", _hoisted_1237, _hoisted_3236);
	}

	var sort_up_default = /* @__PURE__ */ export_helper_default(_sfc_main237, [
		["render", _sfc_render237],
		["__file", "sort-up.vue"]
	]);

	const EVENT_CODE = {
		tab: "Tab",
		enter: "Enter",
		space: "Space",
		left: "ArrowLeft",
		up: "ArrowUp",
		right: "ArrowRight",
		down: "ArrowDown",
		esc: "Escape",
		delete: "Delete",
		backspace: "Backspace",
		numpadEnter: "NumpadEnter",
		pageUp: "PageUp",
		pageDown: "PageDown",
		home: "Home",
		end: "End"
	};
	const componentSizes = ["", "default", "small", "large"];

	var English = {
		name: "en",
		el: {
			colorpicker: {
				confirm: "OK",
				clear: "Clear",
				defaultLabel: "color picker",
				description: "current color is {color}. press enter to select a new color."
			},
			datepicker: {
				now: "Now",
				today: "Today",
				cancel: "Cancel",
				clear: "Clear",
				confirm: "OK",
				dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
				monthTablePrompt: "Use the arrow keys and enter to select the month",
				yearTablePrompt: "Use the arrow keys and enter to select the year",
				selectedDate: "Selected date",
				selectDate: "Select date",
				selectTime: "Select time",
				startDate: "Start Date",
				startTime: "Start Time",
				endDate: "End Date",
				endTime: "End Time",
				prevYear: "Previous Year",
				nextYear: "Next Year",
				prevMonth: "Previous Month",
				nextMonth: "Next Month",
				year: "",
				month1: "January",
				month2: "February",
				month3: "March",
				month4: "April",
				month5: "May",
				month6: "June",
				month7: "July",
				month8: "August",
				month9: "September",
				month10: "October",
				month11: "November",
				month12: "December",
				week: "week",
				weeks: {
					sun: "Sun",
					mon: "Mon",
					tue: "Tue",
					wed: "Wed",
					thu: "Thu",
					fri: "Fri",
					sat: "Sat"
				},
				weeksFull: {
					sun: "Sunday",
					mon: "Monday",
					tue: "Tuesday",
					wed: "Wednesday",
					thu: "Thursday",
					fri: "Friday",
					sat: "Saturday"
				},
				months: {
					jan: "Jan",
					feb: "Feb",
					mar: "Mar",
					apr: "Apr",
					may: "May",
					jun: "Jun",
					jul: "Jul",
					aug: "Aug",
					sep: "Sep",
					oct: "Oct",
					nov: "Nov",
					dec: "Dec"
				}
			},
			inputNumber: {
				decrease: "decrease number",
				increase: "increase number"
			},
			select: {
				loading: "Loading",
				noMatch: "No matching data",
				noData: "No data",
				placeholder: "Select"
			},
			dropdown: {
				toggleDropdown: "Toggle Dropdown"
			},
			cascader: {
				noMatch: "No matching data",
				loading: "Loading",
				placeholder: "Select",
				noData: "No data"
			},
			pagination: {
				goto: "Go to",
				pagesize: "/page",
				total: "Total {total}",
				pageClassifier: "",
				page: "Page",
				prev: "Go to previous page",
				next: "Go to next page",
				currentPage: "page {pager}",
				prevPages: "Previous {pager} pages",
				nextPages: "Next {pager} pages",
				deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
			},
			dialog: {
				close: "Close this dialog"
			},
			drawer: {
				close: "Close this dialog"
			},
			messagebox: {
				title: "Message",
				confirm: "OK",
				cancel: "Cancel",
				error: "Illegal input",
				close: "Close this dialog"
			},
			upload: {
				deleteTip: "press delete to remove",
				delete: "Delete",
				preview: "Preview",
				continue: "Continue"
			},
			slider: {
				defaultLabel: "slider between {min} and {max}",
				defaultRangeStartLabel: "pick start value",
				defaultRangeEndLabel: "pick end value"
			},
			table: {
				emptyText: "No Data",
				confirmFilter: "Confirm",
				resetFilter: "Reset",
				clearFilter: "All",
				sumText: "Sum"
			},
			tree: {
				emptyText: "No Data"
			},
			transfer: {
				noMatch: "No matching data",
				noData: "No data",
				titles: ["List 1", "List 2"],
				filterPlaceholder: "Enter keyword",
				noCheckedFormat: "{total} items",
				hasCheckedFormat: "{checked}/{total} checked"
			},
			image: {
				error: "FAILED"
			},
			pageHeader: {
				title: "Back"
			},
			popconfirm: {
				confirmButtonText: "Yes",
				cancelButtonText: "No"
			}
		}
	};
	const buildTranslator = locale => (path, option) => translate(path, option, unref(locale));
	const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
	const buildLocaleContext = locale => {
		const lang = computed(() => unref(locale).name);
		const localeRef = isRef(locale) ? locale : ref(locale);
		return {
			lang,
			locale: localeRef,
			t: buildTranslator(locale)
		};
	};
	const localeContextKey = Symbol("localeContextKey");
	const useLocale = localeOverrides => {
		const locale = localeOverrides || inject(localeContextKey, ref());
		return buildLocaleContext(computed(() => locale.value || English));
	};

	const modalStack = [];
	const closeModal = e => {
		if (modalStack.length === 0) return;
		if (e.code === EVENT_CODE.esc) {
			e.stopPropagation();
			const topModal = modalStack[modalStack.length - 1];
			topModal.handleClose();
		}
	};
	if (isClient) useEventListener(document, "keydown", closeModal);

	buildProp({
		type: Boolean,
		default: null
	});
	buildProp({
		type: Function
	});
	const defaultIdInjection = {
		prefix: Math.floor(Math.random() * 1e4),
		current: 0
	};
	const ID_INJECTION_KEY = Symbol("elIdInjection");
	const useIdInjection = () => {
		return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
	};
	const useId = deterministicId => {
		const idInjection = useIdInjection();
		const namespace = _useXui.useGetDerivedNamespace();
		const idRef = computed(() => unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
		return idRef;
	};
	buildProp({
		type: String,
		values: componentSizes,
		required: false
	});
	var SortOrder = /* @__PURE__ */ (SortOrder2 => {
		SortOrder2["ASC"] = "asc";
		SortOrder2["DESC"] = "desc";
		return SortOrder2;
	})(SortOrder || {});
	var Alignment = /* @__PURE__ */ (Alignment2 => {
		Alignment2["CENTER"] = "center";
		Alignment2["RIGHT"] = "right";
		return Alignment2;
	})(Alignment || {});
	var FixedDir = /* @__PURE__ */ (FixedDir2 => {
		FixedDir2["LEFT"] = "left";
		FixedDir2["RIGHT"] = "right";
		return FixedDir2;
	})(FixedDir || {});
	const oppositeOrderMap = {
		["asc"]: "desc",
		["desc"]: "asc"
	};
	const placeholderSign = Symbol("placeholder");
	const calcColumnStyle = (column, fixedColumn, fixed) => {
		const flex = {
			flexGrow: 0,
			flexShrink: 0,
			...(fixed
				? {}
				: {
						flexGrow: column.flexGrow || 0,
						flexShrink: column.flexShrink || 1
					})
		};
		if (!fixed) {
			flex.flexShrink = 1;
		}
		const style = {
			...(column.style ?? {}),
			...flex,
			flexBasis: "auto",
			width: column.width
		};
		if (!fixedColumn) {
			if (column.maxWidth) style.maxWidth = column.maxWidth;
			if (column.minWidth) style.minWidth = column.minWidth;
		}
		return style;
	};

	function useColumns(props, columns2, fixed) {
		const visibleColumns = computed(() => {
			return unref(columns2).filter(column => !column.hidden);
		});
		const fixedColumnsOnLeft = computed(() => unref(visibleColumns).filter(column => column.fixed === "left" || column.fixed === true));
		const fixedColumnsOnRight = computed(() => unref(visibleColumns).filter(column => column.fixed === "right"));
		const normalColumns = computed(() => unref(visibleColumns).filter(column => !column.fixed));
		const mainColumns = computed(() => {
			const ret = [];
			unref(fixedColumnsOnLeft).forEach(column => {
				ret.push({
					...column,
					placeholderSign
				});
			});
			unref(normalColumns).forEach(column => {
				ret.push(column);
			});
			unref(fixedColumnsOnRight).forEach(column => {
				ret.push({
					...column,
					placeholderSign
				});
			});
			return ret;
		});
		const hasFixedColumns = computed(() => {
			return unref(fixedColumnsOnLeft).length || unref(fixedColumnsOnRight).length;
		});
		const columnsStyles = computed(() => {
			const _columns = unref(columns2);
			return _columns.reduce((style, column) => {
				style[column.key] = calcColumnStyle(column, unref(fixed), props.fixed);
				return style;
			}, {});
		});
		const columnsTotalWidth = computed(() => {
			return unref(visibleColumns).reduce((width, column) => width + column.width, 0);
		});
		const getColumn = key => {
			return unref(columns2).find(column => column.key === key);
		};
		const getColumnStyle = key => {
			return unref(columnsStyles)[key];
		};
		const updateColumnWidth = (column, width) => {
			column.width = width;
		};

		function onColumnSorted(e) {
			const { key } = e.currentTarget.dataset;
			if (!key) return;
			const { sortState, sortBy } = props;
			let order = SortOrder.ASC;
			if (_.isPlainObject(sortState)) {
				order = oppositeOrderMap[sortState[key]];
			} else {
				order = oppositeOrderMap[sortBy.order];
			}
			props.onColumnSort?.({ column: getColumn(key), key, order });
		}

		return {
			columns: columns2,
			columnsStyles,
			columnsTotalWidth,
			fixedColumnsOnLeft,
			fixedColumnsOnRight,
			hasFixedColumns,
			mainColumns,
			normalColumns,
			visibleColumns,
			getColumn,
			getColumnStyle,
			updateColumnWidth,
			onColumnSorted
		};
	}

	const useScrollbar = (props, { mainTableRef, leftTableRef, rightTableRef, onMaybeEndReached }) => {
		const scrollPos = ref({ scrollLeft: 0, scrollTop: 0 });

		function doScroll(params) {
			const { scrollTop } = params;
			mainTableRef.value?.scrollTo(params);
			leftTableRef.value?.scrollToTop(scrollTop);
			rightTableRef.value?.scrollToTop(scrollTop);
		}

		function scrollTo(params) {
			scrollPos.value = params;
			doScroll(params);
		}

		function scrollToTop(scrollTop) {
			scrollPos.value.scrollTop = scrollTop;
			doScroll(unref(scrollPos));
		}

		function scrollToLeft(scrollLeft) {
			scrollPos.value.scrollLeft = scrollLeft;
			mainTableRef.value?.scrollTo?.(unref(scrollPos));
		}

		function onScroll(params) {
			scrollTo(params);
			props.onScroll?.(params);
		}

		function onVerticalScroll({ scrollTop }) {
			const { scrollTop: currentScrollTop } = unref(scrollPos);
			if (scrollTop !== currentScrollTop) scrollToTop(scrollTop);
		}

		function scrollToRow(row, strategy = "auto") {
			mainTableRef.value?.scrollToRow(row, strategy);
		}

		watch(
			() => unref(scrollPos).scrollTop,
			(cur, prev) => {
				if (cur > prev) onMaybeEndReached();
			}
		);
		return {
			scrollPos,
			scrollTo,
			scrollToLeft,
			scrollToTop,
			scrollToRow,
			onScroll,
			onVerticalScroll
		};
	};
	const useRow = (props, { mainTableRef, leftTableRef, rightTableRef }) => {
		const inject_xTableVir = inject("inject_xTableVir");
		const isResetting = shallowRef(false);
		const hoveringRowKey = shallowRef(null);
		const expandedRowKeys = ref(props.expandedRowKeys || []);
		const lastRenderedRowIndex = ref(-1);
		const resetIndex = shallowRef(null);
		const rowHeights = ref({});
		const pendingRowHeights = ref({});
		const leftTableHeights = shallowRef({});
		const mainTableHeights = shallowRef({});
		const rightTableHeights = shallowRef({});
		const isDynamic = computed(() => _.isNumber(props.estimatedRowHeight));

		function onRowsRendered(params) {
			props.onRowsRendered?.(params);
			if (params.rowCacheEnd > unref(lastRenderedRowIndex)) {
				lastRenderedRowIndex.value = params.rowCacheEnd;
			}
		}

		function onRowHovered({ hovered, rowKey }) {
			hoveringRowKey.value = hovered ? rowKey : null;
		}

		function onRowExpanded({ expanded, rowData, rowIndex, rowKey }) {
			const _expandedRowKeys = [...expandedRowKeys.value];
			const currentKeyIndex = _expandedRowKeys.indexOf(rowKey);
			if (expanded) {
				if (currentKeyIndex === -1) _expandedRowKeys.push(rowKey);
			} else {
				if (currentKeyIndex > -1) _expandedRowKeys.splice(currentKeyIndex, 1);
			}
			expandedRowKeys.value = _expandedRowKeys;
			inject_xTableVir.$emit("update:expandedRowKeys", _expandedRowKeys);
			inject_xTableVir.onRowExpand?.({
				expanded,
				rowData,
				rowIndex,
				rowKey: rowKey
			});
			props.onExpandedRowsChange?.(_expandedRowKeys);
		}

		const flushingRowHeights = debounce(() => {
			isResetting.value = true;
			rowHeights.value = {
				...unref(rowHeights),
				...unref(pendingRowHeights)
			};
			resetAfterIndex(unref(resetIndex), false);
			pendingRowHeights.value = {};
			resetIndex.value = null;
			mainTableRef.value?.forceUpdate();
			leftTableRef.value?.forceUpdate();
			rightTableRef.value?.forceUpdate();
			inject_xTableVir?.$forceUpdate();
			isResetting.value = false;
		}, 0);

		function resetAfterIndex(index, forceUpdate = false) {
			if (!unref(isDynamic)) return;
			[mainTableRef, leftTableRef, rightTableRef].forEach(tableRef => {
				const table = unref(tableRef);
				if (table) table.resetAfterRowIndex(index, forceUpdate);
			});
		}

		function resetHeights(rowKey2, height, rowIdx) {
			const resetIdx = unref(resetIndex);
			if (resetIdx === null) {
				resetIndex.value = rowIdx;
			} else {
				if (resetIdx > rowIdx) {
					resetIndex.value = rowIdx;
				}
			}
			pendingRowHeights.value[rowKey2] = height;
		}

		function onRowHeightChange({ rowKey: rowKey2, height, rowIndex }, fixedDir) {
			if (!fixedDir) {
				mainTableHeights.value[rowKey2] = height;
			} else {
				if (fixedDir === FixedDir.RIGHT) {
					rightTableHeights.value[rowKey2] = height;
				} else {
					leftTableHeights.value[rowKey2] = height;
				}
			}
			const maximumHeight = Math.max(...[leftTableHeights, rightTableHeights, mainTableHeights].map(records => records.value[rowKey2] || 0));
			if (unref(rowHeights)[rowKey2] !== maximumHeight) {
				resetHeights(rowKey2, maximumHeight, rowIndex);
				flushingRowHeights();
			}
		}

		return {
			hoveringRowKey,
			expandedRowKeys,
			lastRenderedRowIndex,
			isDynamic,
			isResetting,
			rowHeights,
			resetAfterIndex,
			onRowExpanded,
			onRowHovered,
			onRowsRendered,
			onRowHeightChange
		};
	};
	const useData = (props, { expandedRowKeys, lastRenderedRowIndex, resetAfterIndex }) => {
		const depthMap = ref({});
		/* 树形结构 */
		const flattenedData = computed(() => {
			const depths = {};
			const { data: allRows, rowKey } = props;
			const _expandedRowKeys = expandedRowKeys.value;

			if (!_.$isArrayFill(_expandedRowKeys)) {
				/* 如果没有需要展开的数据，直接返回原始数据 */
				return allRows;
			} else {
				const array = [];
				const keysSet = new Set();
				_expandedRowKeys.forEach(x => keysSet.add(x));
				let _AllRows = allRows.slice();
				_AllRows.forEach(x => (depths[x[rowKey]] = 0));
				while (_AllRows.length > 0) {
					const item = _AllRows.shift();
					array.push(item);
					if (keysSet.has(item[rowKey]) && Array.isArray(item.children) && item.children.length > 0) {
						_AllRows = [...item.children, ..._AllRows];
						item.children.forEach(child => (depths[child[rowKey]] = depths[item[rowKey]] + 1));
					}
				}
				depthMap.value = depths;
				return array;
			}
		});
		const data = computed(() => {
			const { data } = props;
			return _.$isArrayFill(expandedRowKeys.value) ? flattenedData.value : data;
		});
		watch(data, (val, prev) => {
			if (val !== prev) {
				lastRenderedRowIndex.value = -1;
				resetAfterIndex(0, true);
			}
		});
		return {
			data,
			depthMap
		};
	};
	const useStyles = (props, { columnsTotalWidth, data, fixedColumnsOnLeft, fixedColumnsOnRight }) => {
		const bodyWidth = computed(() => {
			const { fixed, width, vScrollbarSize } = props;
			const ret = width - vScrollbarSize;
			return fixed ? Math.max(Math.round(unref(columnsTotalWidth)), ret) : ret;
		});
		const headerWidth = computed(() => unref(bodyWidth) + (props.fixed ? props.vScrollbarSize : 0));
		const mainTableHeight = computed(() => {
			const { height = 0, maxHeight = 0, footerHeight: footerHeight2, hScrollbarSize } = props;
			if (maxHeight > 0) {
				const _fixedRowsHeight = unref(fixedRowsHeight);
				const _rowsHeight = unref(rowsHeight);
				const _headerHeight = unref(headerHeight);
				const total2 = _headerHeight + _fixedRowsHeight + _rowsHeight + hScrollbarSize;
				return Math.min(total2, maxHeight - footerHeight2);
			}
			return height - footerHeight2;
		});
		const rowsHeight = computed(() => {
			const { rowHeight, estimatedRowHeight } = props;
			const _data = unref(data);
			if (_.isNumber(estimatedRowHeight)) {
				return _data.length * estimatedRowHeight;
			}
			return _data.length * rowHeight;
		});
		const fixedTableHeight = computed(() => {
			const { maxHeight } = props;
			const tableHeight = unref(mainTableHeight);
			if (_.isNumber(maxHeight) && maxHeight > 0) return tableHeight;
			const totalHeight = unref(rowsHeight) + unref(headerHeight) + unref(fixedRowsHeight);
			return Math.min(tableHeight, totalHeight);
		});
		const mapColumn = column => column.width;
		const leftTableWidth = computed(() => sum(unref(fixedColumnsOnLeft).map(mapColumn)));
		const rightTableWidth = computed(() => sum(unref(fixedColumnsOnRight).map(mapColumn)));
		const headerHeight = computed(() => sum(props.headerHeight));
		const fixedRowsHeight = computed(() => {
			return (props.fixedData?.length || 0) * props.rowHeight;
		});
		const windowHeight = computed(() => {
			return unref(mainTableHeight) - unref(headerHeight) - unref(fixedRowsHeight);
		});
		const rootStyle = computed(() => {
			const { style = {}, height, width } = props;
			return enforceUnit({
				...style,
				height,
				width
			});
		});
		const footerHeight = computed(() => enforceUnit({ height: props.footerHeight }));
		const emptyStyle = computed(() => ({
			top: addUnit(unref(headerHeight)),
			bottom: addUnit(props.footerHeight),
			width: addUnit(props.width)
		}));
		return {
			bodyWidth,
			fixedTableHeight,
			mainTableHeight,
			leftTableWidth,
			rightTableWidth,
			headerWidth,
			rowsHeight,
			windowHeight,
			footerHeight,
			emptyStyle,
			rootStyle,
			headerHeight
		};
	};

	function useTable(props) {
		const inject_xTableVir = inject("inject_xTableVir");
		const mainTableRef = ref();
		const leftTableRef = ref();
		const rightTableRef = ref();
		const {
			columns: columns2,
			columnsStyles,
			columnsTotalWidth,
			fixedColumnsOnLeft,
			fixedColumnsOnRight,
			hasFixedColumns,
			mainColumns,
			onColumnSorted
		} = useColumns(props, toRef(props, "columns"), toRef(props, "fixed"));
		const { scrollTo, scrollToLeft, scrollToTop, scrollToRow, onScroll, onVerticalScroll, scrollPos } = useScrollbar(props, {
			mainTableRef,
			leftTableRef,
			rightTableRef,
			onMaybeEndReached
		});
		const { expandedRowKeys, hoveringRowKey, lastRenderedRowIndex, isDynamic, isResetting, rowHeights, resetAfterIndex, onRowExpanded, onRowHeightChange, onRowHovered, onRowsRendered } = useRow(
			props,
			{ mainTableRef, leftTableRef, rightTableRef }
		);
		const { data, depthMap } = useData(props, {
			expandedRowKeys,
			lastRenderedRowIndex,
			resetAfterIndex
		});
		const { bodyWidth, fixedTableHeight, mainTableHeight, leftTableWidth, rightTableWidth, headerWidth, rowsHeight, windowHeight, footerHeight, emptyStyle, rootStyle, headerHeight } = useStyles(
			props,
			{
				columnsTotalWidth,
				data,
				fixedColumnsOnLeft,
				fixedColumnsOnRight
			}
		);
		const isScrolling = shallowRef(false);
		const containerRef = ref();
		const showEmpty = computed(() => {
			const noData = unref(data).length === 0;
			return _.isArray(props.fixedData) ? props.fixedData.length === 0 && noData : noData;
		});

		function getRowHeight(rowIndex) {
			const { estimatedRowHeight, rowHeight, rowKey: rowKey2 } = props;
			if (!estimatedRowHeight) return rowHeight;
			return unref(rowHeights)[unref(data)[rowIndex][rowKey2]] || estimatedRowHeight;
		}

		function onMaybeEndReached() {
			const { onEndReached } = props;
			if (!onEndReached) return;
			const { scrollTop } = unref(scrollPos);
			const _totalHeight = unref(rowsHeight);
			const clientHeight = unref(windowHeight);
			const heightUntilEnd = _totalHeight - (scrollTop + clientHeight) + props.hScrollbarSize;
			if (unref(lastRenderedRowIndex) >= 0 && _totalHeight === scrollTop + unref(mainTableHeight) - unref(headerHeight)) {
				onEndReached(heightUntilEnd);
			}
		}

		watch(
			() => props.expandedRowKeys,
			val => (expandedRowKeys.value = val),
			{
				deep: true
			}
		);
		return {
			columns: columns2,
			containerRef,
			mainTableRef,
			leftTableRef,
			rightTableRef,
			isDynamic,
			isResetting,
			isScrolling,
			hoveringRowKey,
			hasFixedColumns,
			columnsStyles,
			columnsTotalWidth,
			data,
			expandedRowKeys,
			depthMap,
			fixedColumnsOnLeft,
			fixedColumnsOnRight,
			mainColumns,
			bodyWidth,
			emptyStyle,
			rootStyle,
			headerWidth,
			footerHeight,
			mainTableHeight,
			fixedTableHeight,
			leftTableWidth,
			rightTableWidth,
			showEmpty,
			getRowHeight,
			onColumnSorted,
			onRowHovered,
			onRowExpanded,
			onRowsRendered,
			onRowHeightChange,
			scrollTo,
			scrollToLeft,
			scrollToTop,
			scrollToRow,
			onScroll,
			onVerticalScroll
		};
	}

	const { max, floor } = Math;
	const ACCESS_SIZER_KEY_MAP = {
		column: "columnWidth",
		row: "rowHeight"
	};
	const ACCESS_LAST_VISITED_KEY_MAP = {
		column: "lastVisitedColumnIndex",
		row: "lastVisitedRowIndex"
	};
	const getItemFromCache = (props, index, gridCache, type) => {
		const [cachedItems, sizer, lastVisited] = [gridCache[type], props[ACCESS_SIZER_KEY_MAP[type]], gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]];
		if (index > lastVisited) {
			let offset = 0;
			if (lastVisited >= 0) {
				const item = cachedItems[lastVisited];
				offset = item.offset + item.size;
			}
			for (let i = lastVisited + 1; i <= index; i++) {
				const size = sizer(i);
				cachedItems[i] = {
					offset,
					size
				};
				offset += size;
			}
			gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]] = index;
		}
		return cachedItems[index];
	};
	const TableV2Cell = {
		displayName: "ElTableV2Cell",
		inheritAttrs: false,
		functional: true,
		render: (h, { data: props, slots }) => {
			const { cellData, style } = props;
			const displayText = cellData?.toString?.() || "";
			return h(
				"div",
				{
					class: props.class,
					attrs: {
						title: displayText
					},
					style: style
				},
				[slots.default ? slots.default(props) : displayText]
			);
		}
	};

	const HeaderCell = {
		displayName: "ElTableV2HeaderCell",
		inheritAttrs: false,
		functional: true,
		render: (h, { data: props, slots }) => {
			return slots.default
				? slots.default(props)
				: h(
						"div",
						{
							class: props.classV2,
							attrs: {
								title: props.column?.label
							}
						},
						[props.column?.label]
					);
		}
	};

	const iconProps = buildProps({
		size: {
			type: [Number, String]
		},
		color: {
			type: String
		}
	});

	var _sfc_main$2 = /* @__PURE__ */ defineComponent({
		__name: "icon",
		props: iconProps,
		setup(__props) {
			const props = __props;
			defineComponent({
				name: "ElIcon",
				inheritAttrs: false
			});
			const ns = useNamespace("icon");
			const style = computed(() => {
				const { size, color } = props;
				if (!size && !color) return {};
				return {
					fontSize: _.isUndefined(size) ? false : addUnit(size),
					"--color": color
				};
			});
			return { __sfc: true, props, ns, style };
		}
	});
	var _sfc_render$2 = function render() {
		var _vm = this,
			_c = _vm._self._c,
			_setup = _vm._self._setupProxy;
		return _c(
			"i",
			_vm._b(
				{
					class: _setup.ns.b(),
					style: _setup.style
				},
				"i",
				_vm.$attrs,
				false
			),
			[_vm._t("default")],
			2
		);
	};
	var _sfc_staticRenderFns$2 = [];
	var __component__$2 = /* @__PURE__ */ _useXui.normalizeComponent(_sfc_main$2, _sfc_render$2, _sfc_staticRenderFns$2, false, null, null, null, null);
	var Icon = __component__$2.exports;

	const SortIcon = {
		functional: true,
		render: (h, props) => {
			const { sortOrder } = props;
			return h(
				Icon,
				{
					attrs: {
						size: 14
					},
					class: props.classV2
				},
				[sortOrder === SortOrder.ASC ? h(sort_up_default) : h(sort_down_default)]
			);
		}
	};

	const ComponentMainTable = {
		functional: true,
		render: (h, { data: { mainTableRef, $vSlots, ...rest } }) => {
			return h(
				"ComponentTableV2Grid",
				merge_hFnProps([
					{
						ref: mainTableRef
					},
					rest
				]),
				[$vSlots]
			);
		}
	};

	const ComponentLeftTable = {
		functional: true,
		render: (h, { data: { leftTableRef, $vSlots, ...rest } }) => {
			if (!rest?.columns.length) return;
			return h(
				"ComponentTableV2Grid",
				merge_hFnProps([
					{
						ref: leftTableRef
					},
					rest
				]),
				[$vSlots]
			);
		}
	};

	const ComponentRightTable = {
		functional: true,
		render: (h, { data: { rightTableRef, $vSlots, ...rest } }) => {
			return h(
				"ComponentTableV2Grid",
				merge_hFnProps([
					{
						ref: rightTableRef
					},
					rest
				]),
				[$vSlots]
			);
		}
	};

	const RowRenderer = {
		functional: true,
		render: (h, { data: props }) => {
			let $vSlots = props.$vSlots;
			const {
				columns: columns2,
				columnsStyles,
				depthMap,
				expandColumnKey: expandColumnKey2,
				expandedRowKeys,
				estimatedRowHeight,
				hasFixedColumns,
				hoveringRowKey,
				rowData,
				rowIndex,
				style,
				isScrolling,
				rowProps,
				rowClass,
				rowKey,
				rowEventHandlers,
				ns,
				onRowHovered,
				onRowExpanded
			} = props;
			const rowKls = tryCall(
				rowClass,
				{
					columns: columns2,
					rowData,
					rowIndex
				},
				""
			);
			const additionalProps = tryCall(rowProps, {
				columns: columns2,
				rowData,
				rowIndex
			});
			const _rowKey = rowData[rowKey];
			const depth = depthMap[_rowKey] || 0;
			const canExpand = Boolean(expandColumnKey2);
			const isFixedRow = rowIndex < 0;
			const kls = [
				ns.e("row"),
				rowKls,
				{
					[ns.e(`row-depth-${depth}`)]: canExpand && rowIndex >= 0,
					[ns.is("expanded")]: canExpand && expandedRowKeys.includes(_rowKey),
					[ns.is("hovered")]: !isScrolling && _rowKey === hoveringRowKey,
					[ns.is("fixed")]: !depth && isFixedRow,
					[ns.is("customized")]: Boolean($vSlots.row)
				}
			];

			const onRowHover = hasFixedColumns ? onRowHovered : () => null;

			const _rowProps = merge_hFnProps([
				{
					...additionalProps,
					columns: columns2,
					columnsStyles,
					class: kls,
					depth,
					expandColumnKey: expandColumnKey2,
					estimatedRowHeight: isFixedRow ? false : estimatedRowHeight,
					isScrolling,
					rowIndex,
					rowData,
					rowKey: _rowKey,
					rowEventHandlers,
					style
				},
				{
					on: {
						rowHover: onRowHover,
						rowExpand: onRowExpanded
					}
				}
			]);

			return h("ComponentTableV2Row", _rowProps, [$vSlots]);
		}
	};
	/* 默认cell render */
	const CellRenderer = {
		inheritAttrs: false,
		functional: true,
		render: (h, context) => {
			const { data } = context;
			const {
				columns,
				column,
				columnIndex,
				depth,
				expandIconProps,
				isScrolling,
				rowData,
				rowIndex,
				style,
				expandedRowKeys,
				ns,
				cellProps: _cellProps,
				indentSize,
				iconSize,
				rowKey,
				$vSlots: slots,
				onRowExpanded
			} = data;

			const cellStyle = enforceUnit(style);
			if (column.placeholderSign === placeholderSign) {
				return h("div", {
					class: ns.em("row-cell", "placeholder"),
					style: cellStyle
				});
			}
			/* 从配置项获取cell的render */
			const { cellRenderer, prop, dataGetter } = column;
			const CellComponent = (function () {
				const columnCellRenderer = componentToSlot(cellRenderer);
				if (columnCellRenderer) {
					return columnCellRenderer;
				}
				if (slots?.default) {
					return slots.default;
				}
				return props => h(TableV2Cell, merge_hFnProps([{}, props]));
			})();

			/* 从rowData获取cell数据，可以使用 xxx.xxx.x的字符串方法 */
			const cellData = (() => {
				if (_.isFunction(dataGetter)) {
					return dataGetter({ columns: columns, column, columnIndex, rowData, rowIndex });
				} else {
					return get(rowData, prop || "", "--");
				}
			})();

			const extraCellProps = tryCall(_cellProps, {
				cellData,
				columns: columns,
				column,
				columnIndex,
				rowIndex,
				rowData
			});
			const cellProps = {
				class: ns.e("cell-text"),
				columns: columns,
				column,
				columnIndex,
				cellData,
				isScrolling,
				rowData,
				rowIndex
			};
			const Cell = CellComponent(cellProps);
			const kls = [ns.e("row-cell"), column.class, column.align === Alignment.CENTER && ns.is("align-center"), column.align === Alignment.RIGHT && ns.is("align-right")];
			/*vir table 树形数据*/
			/* 如果有xRowChildren就可以展开 */
			const expandable = _.$isArrayFill(rowData.children);
			const iconStyle = `margin-inline-start: ${depth * indentSize}px;`;
			const isShowIcon = column.prop === "COL_EXPAND_ARROW";

			let iconProps = { style: [iconStyle, `width: ${iconSize}px; height: ${iconSize}px;`].join(" ") };
			if (expandable) {
				const expanded = _.some(expandedRowKeys, key => {
					return _.$isSame(rowData[rowKey], key);
				});

				iconProps = merge_hFnProps([
					iconProps,
					{
						class: {
							[ns.e("expand-icon")]: true,
							"el-icon el-icon-arrow-right ": isShowIcon,
							"el-table__expand-icon--expanded": expanded
						},
						attrs: {
							size: iconSize,
							expanded: expanded,
							expandable: true
						},
						onClick() {
							isShowIcon && expandable && onRowExpanded({ expanded: !expanded, rowData, rowIndex, rowKey: rowData[rowKey] });
						}
					}
				]);
			}

			let IconOrPlaceholder = isShowIcon ? h("i", iconProps) : null;

			return h(
				"div",
				merge_hFnProps([
					{
						class: kls,
						style: cellStyle
					},
					extraCellProps,
					{
						attrs: {
							role: "cell"
						}
					}
				]),
				[IconOrPlaceholder, Cell]
			);
		}
	};

	const HeaderRenderer = {
		functional: true,
		render: (h, { data: { columns: columns2, columnsStyles, headerIndex, style, headerClass, headerProps, ns, $vSlots } }) => {
			const param = {
				columns: columns2,
				headerIndex
			};
			const kls = [
				ns.e("header-row"),
				tryCall(headerClass, param, ""),
				{
					[ns.is("customized")]: Boolean($vSlots.header)
				}
			];
			const extraProps = {
				...tryCall(headerProps, param),
				columnsStyles,
				class: kls,
				columns: columns2,
				headerIndex,
				style
			};

			return h("ComponentTableV2HeaderRow", extraProps, [$vSlots]);
		}
	};
	const HeaderCellRenderer = {
		functional: true,
		render: (h, { data: props, slots }) => {
			const { column, ns, style, onColumnSorted } = props;
			const cellStyle = enforceUnit(style);
			if (column.placeholderSign === placeholderSign) {
				return h("div", {
					class: ns.em("header-row-cell", "placeholder"),
					style: cellStyle
				});
			}
			const { headerCellRenderer, headerClass, sortable } = column;
			const cellProps = {
				...props,
				class: ns.e("header-cell-text")
			};
			const cellRenderer = (function () {
				let render = componentToSlot(headerCellRenderer);
				if (render) {
					return render;
				}
				if (slots?.default) {
					return slots.default;
				}

				return props2 => h(HeaderCell, props2);
			})();
			const vm = getCurrentInstance();
			const Cell = cellRenderer(cellProps, { vm });
			const { sortBy, sortState, headerCellProps } = props;
			let sorting, sortOrder;
			if (sortState) {
				const order = sortState[column.key];
				sorting = Boolean(oppositeOrderMap[order]);
				sortOrder = sorting ? order : SortOrder.ASC;
			} else {
				sorting = column.key === sortBy.key;
				sortOrder = sorting ? sortBy.order : SortOrder.ASC;
			}
			const cellKls = [
				ns.e("header-cell"),
				tryCall(headerClass, props, ""),
				column.align === Alignment.CENTER && ns.is("align-center"),
				column.align === Alignment.RIGHT && ns.is("align-right"),
				sortable && ns.is("sortable")
			];
			const cellWrapperProps = {
				role: "columnheader",
				...tryCall(headerCellProps, props),
				class: cellKls,
				style: cellStyle,
				["data-key"]: column.key,
				["data-prop"]: column.prop
			};

			if (column.sortable) {
				cellWrapperProps.onClick = onColumnSorted;
			}
			return h("div", cellWrapperProps, [
				Cell,
				h(SortIcon, {
					vIf: sortable,
					class: [ns.e("sort-icon"), sorting && ns.is("sorting")],
					attrs: {
						sortOrder: sortOrder
					}
				})
			]);
		}
	};
	const ComponentFooter = {
		displayName: "ElTableV2Footer",
		functional: true,
		render: (h, { data: props, slots }) => {
			return h(
				"div",
				{
					class: props.classV2,
					style: props.styleV2
				},
				[slots.default?.()]
			);
		}
	};

	const ComponentEmpty = {
		displayName: "ComponentEmpty",
		functional: true,
		render: (h, { data: props, slots }) => {
			return h(
				"div",
				{
					class: props.class,
					style: {
						top: "50%",
						transform: "translateY(-50%)",
						position: "relative",
						width: "100%"
					}
				},
				[slots.default ? slots.default() : emptyRender()]
			);
		}
	};

	const ComponentOverlay = {
		displayName: "ComponentOverlay",
		functional: true,
		render: (h, { data: props, slots }) => {
			return h(
				"div",
				{
					class: props.classV2,
					style: props.styleV2
				},
				[slots.default?.()]
			);
		}
	};

	const xTableVir = defineComponent({
		name: "xTableVir",
		props: tableV2Props,
		setup(props, context) {
			const vm = this;
			const { expose } = context;
			const ns = useNamespace("table-v2");
			const {
				columnsStyles,
				fixedColumnsOnLeft,
				fixedColumnsOnRight,
				mainColumns,
				mainTableHeight,
				fixedTableHeight,
				leftTableWidth,
				rightTableWidth,
				data,
				depthMap,
				expandedRowKeys,
				hasFixedColumns,
				hoveringRowKey,
				mainTableRef,
				leftTableRef,
				rightTableRef,
				isDynamic,
				isResetting,
				isScrolling,
				bodyWidth,
				emptyStyle,
				rootStyle,
				headerWidth,
				footerHeight,
				showEmpty,
				scrollTo,
				scrollToLeft,
				scrollToTop,
				scrollToRow,
				getRowHeight,
				onColumnSorted,
				onRowHeightChange,
				onRowHovered,
				onRowExpanded,
				onRowsRendered,
				onScroll,
				onVerticalScroll
			} = useTable(props, vm);
			expose({
				scrollTo,
				scrollToLeft,
				scrollToTop,
				scrollToRow
			});
			provide(TableV2InjectionKey, {
				ns,
				isResetting,
				hoveringRowKey,
				isScrolling
			});
			return function () {
				const vmTable = this;
				const {
					cache: cache2,
					cellProps,
					estimatedRowHeight,
					expandColumnKey,
					fixedData,
					headerHeight,
					headerClass,
					headerProps,
					headerCellProps,
					sortBy,
					sortState,
					rowHeight,
					rowClass,
					rowEventHandlers,
					rowKey,
					rowProps,
					scrollbarAlwaysOn,
					indentSize,
					iconSize,
					useIsScrolling,
					vScrollbarSize,
					width
				} = props;
				const dataUnref = unref(data);
				const mainTableProps = {
					cache: cache2,
					class: ns.e("main"),
					columns: unref(mainColumns),
					data: dataUnref,
					fixedData,
					estimatedRowHeight,
					bodyWidth: unref(bodyWidth),
					headerHeight,
					headerWidth: unref(headerWidth),
					height: unref(mainTableHeight),
					mainTableRef,
					rowKey: rowKey,
					rowHeight,
					scrollbarAlwaysOn,
					scrollbarStartGap: 2,
					scrollbarEndGap: vScrollbarSize,
					useIsScrolling,
					width,
					getRowHeight,
					onRowsRendered,
					onScroll
				};
				const leftColumnsWidth = unref(leftTableWidth);
				const _fixedTableHeight = unref(fixedTableHeight);
				const leftTableProps = {
					cache: cache2,
					class: ns.e("left"),
					columns: unref(fixedColumnsOnLeft),
					data: dataUnref,
					estimatedRowHeight,
					leftTableRef,
					rowHeight,
					bodyWidth: leftColumnsWidth,
					headerWidth: leftColumnsWidth,
					headerHeight,
					height: _fixedTableHeight,
					rowKey: rowKey,
					scrollbarAlwaysOn,
					scrollbarStartGap: 2,
					scrollbarEndGap: vScrollbarSize,
					useIsScrolling,
					width: leftColumnsWidth,
					getRowHeight,
					onScroll: onVerticalScroll
				};
				const rightColumnsWidth = unref(rightTableWidth);
				const rightColumnsWidthWithScrollbar = rightColumnsWidth + vScrollbarSize;

				const rightTableProps = {
					cache: cache2,
					class: ns.e("right"),
					columns: unref(fixedColumnsOnRight),
					data: dataUnref,
					estimatedRowHeight,
					rightTableRef,
					rowHeight,
					bodyWidth: rightColumnsWidthWithScrollbar,
					headerWidth: rightColumnsWidthWithScrollbar,
					headerHeight,
					height: _fixedTableHeight,
					rowKey: rowKey,
					scrollbarAlwaysOn,
					scrollbarStartGap: 2,
					scrollbarEndGap: vScrollbarSize,
					width: rightColumnsWidthWithScrollbar,
					style: `--${unref(ns.namespace)}-table-scrollbar-size: ${vScrollbarSize}px`,
					useIsScrolling,
					getRowHeight,
					onScroll: onVerticalScroll
				};

				const tableRowProps = {
					ns,
					depthMap: unref(depthMap),
					columnsStyles: columnsStyles.value,
					expandColumnKey,
					expandedRowKeys: unref(expandedRowKeys),
					estimatedRowHeight,
					hasFixedColumns: unref(hasFixedColumns),
					hoveringRowKey: unref(hoveringRowKey),
					rowProps,
					rowClass,
					rowKey: rowKey,
					rowEventHandlers,
					onRowHovered,
					onRowExpanded,
					onRowHeightChange
				};
				const tableCellProps = {
					cellProps,
					expandColumnKey,
					indentSize,
					iconSize,
					rowKey: rowKey,
					expandedRowKeys: unref(expandedRowKeys),
					ns
				};
				const tableHeaderProps = {
					ns,
					headerClass,
					headerProps,
					columnsStyles: columnsStyles.value
				};
				const tableHeaderCellProps = {
					ns,
					sortBy,
					sortState,
					headerCellProps,
					onColumnSorted
				};

				const tableSlots = {
					header: props2 => {
						const HeaderRendererProps = merge_hFnProps([props2, tableHeaderProps]);
						return h(HeaderRenderer, HeaderRendererProps, [
							{
								header: vmTable.$vSlots.header,
								cell: cellProps => {
									if (vmTable.$vSlots["header-cell"]) {
										const HeaderCellRendererProps = merge_hFnProps([props2, tableHeaderProps]);
										return h(HeaderCellRenderer, HeaderCellRendererProps, [vmTable.$vSlots["header-cell"](cellProps)]);
									} else {
										const HeaderCellRendererProps = merge_hFnProps([
											cellProps,
											tableHeaderCellProps,
											{
												style: columnsStyles.value[cellProps.column.key]
											}
										]);
										return h(HeaderCellRenderer, HeaderCellRendererProps);
									}
								}
							}
						]);
					},
					row: props => {
						return h(RowRenderer, merge_hFnProps([props, tableRowProps]), [
							{
								row: vmTable.$vSlots.row,
								cell: props_cell => {
									if (vmTable.$vSlots.cell) {
										return h(
											CellRenderer,
											merge_hFnProps([
												props_cell,
												tableCellProps,

												{
													onRowExpanded,
													style: columnsStyles.value[props_cell.column.key]
												}
											]),
											[vmTable.$vSlots.cell(props_cell)]
										);
									} else {
										return h(
											CellRenderer,
											merge_hFnProps([
												props_cell,
												tableCellProps,
												{
													onRowExpanded,
													style: columnsStyles.value[props_cell.column.key]
												}
											])
										);
									}
								}
							}
						]);
					}
				};

				const rootKls = [
					props.classV2,
					ns.b(),
					ns.e("root"),
					{
						[ns.is("dynamic")]: unref(isDynamic)
					}
				];

				const footerProps = {
					vIf: vmTable.$vSlots.footer,
					class: ns.e("footer"),
					style: unref(footerHeight)
				};

				return h(
					"div",
					{
						attrs: { "table-vir": this._uid },
						class: rootKls,
						style: unref(rootStyle)
					},
					[
						createEmptyVNode("ComponentMainTable"),
						h(ComponentMainTable, mainTableProps, [tableSlots]),
						createEmptyVNode("ComponentMainTable"),
						createEmptyVNode("ComponentLeftTable"),
						h(ComponentLeftTable, leftTableProps, [tableSlots]),
						createEmptyVNode("ComponentLeftTable"),
						createEmptyVNode("ComponentRightTable"),
						h(ComponentRightTable, rightTableProps, [tableSlots]),
						createEmptyVNode("ComponentRightTable"),
						createEmptyVNode("ComponentFooter"),
						h(ComponentFooter, footerProps, [{ default: vmTable.$vSlots.footer }]),
						createEmptyVNode("ComponentFooter"),
						createEmptyVNode("ComponentEmpty"),
						h(
							ComponentEmpty,
							{
								vIf: showEmpty.value,
								class: ns.e("empty"),
								style: unref(emptyStyle)
							},
							[{ default: vmTable.$vSlots.empty }]
						),
						createEmptyVNode("ComponentOverlay"),
						h(
							ComponentOverlay,
							{
								vIf: vmTable.$vSlots.overlay,
								class: ns.e("overlay")
							},
							[{ default: vmTable.$vSlots.overlay }]
						),
						createEmptyVNode("ComponentOverlay")
					]
				);
			};
		}
	});

	/* 	exports.TableV2Alignment = Alignment;
	exports.TableV2FixedDir = FixedDir;
	exports.TableV2Placeholder = placeholderSign;
	exports.TableV2SortOrder = SortOrder;
	exports.tableV2Props = tableV2Props;

 */
	let curr = {
		id: 0,
		x: 0,
		grow: 0
	};

	const vmCollection = {};

	const sResizer = id => `.xDataGrid[data-table-resizer-id=${id}]`;
	const sMask = id => `.xDataGrid_mask[data-table-mask=${id}]`;
	const sLine = id => `.xDataGrid_mask[data-table-mask=${id}] .xDataGrid_mask-line`;

	$("body").on("mousedown.colResize", ".el-table-v2__header-cell", function (event) {
		const { offsetX, offsetY, pageX, pageY, target, clientX, screenX } = event;
		const $cell = $(this);
		if ($cell.width() - offsetX < 3) {
			curr.id = $(target).parents(".el-auto-resizer").attr("data-table-resizer-id");
			$(sMask(curr.id)).addClass("active");
			const { left } = $(sResizer(curr.id)).offset();
			$(sLine(curr.id)).css("left", `${clientX - left}px`);
			const prop = $cell.attr("data-key");
			curr = {
				prop,
				id: curr.id,
				x: pageX
			};
		}
	});
	$("body").on("mousemove.colResize", ".xDataGrid_mask.active", function (event) {
		const { offsetX, offsetY, pageX, pageY, target } = event;
		const $target = $(target);
		$target.find(".xDataGrid_mask-line").css("left", `${offsetX}px`);
		curr.grow = pageX - curr.x;
	});

	$("body").on("mouseup.colResize", () => {
		$(`.xDataGrid_mask`).removeClass("active");
		const setPropWidth = vmCollection[curr.id];
		if (setPropWidth) {
			setPropWidth(curr);
		}
		curr = {};
	});

	return defineComponent({
		inheritAttrs: false,
		props: ["columns"],
		provide() {
			return {
				inject_xTableVir: this
			};
		},
		setup() {
			const vm = this;
			onMounted(() => {
				vmCollection[vm._uid] = function setPropWidth({ prop, grow }) {
					if (["checkbox"].includes(prop)) {
						return;
					}
					const index = _.findIndex(vm?.$props?.columns, { prop });
					if (~index) {
						const item = vm.$props.columns[index];
						const width = item.width + grow;
						if (width) {
							item.width = width;
							// vm.$props.columns.splice(index, 1, item);
							vm.$props.columns[index] = item;
							// vm.$forceUpdate();
						}
					}
				};
			});
			onBeforeUnmount(() => {
				delete vmCollection[vm._uid];
			});
		},
		methods: {
			columnAutoWidth({ width, height }) {
				if (!width) {
					return this.$props.columns;
				}
				const currentShouldShow = _.reduce(
					this.$props.columns,
					(columnsForShow, column) => {
						const _column = (() => {
							if (hasOwn(column, "isShow")) {
								if (!column.isShow) {
									/* 明确false,则不显示 */
									return false;
								} else {
									return column;
								}
							} else {
								/* 默认显示 */
								return column;
							}
						})();
						if (_column) {
							columnsForShow.push(_column);
						}
						return columnsForShow;
					},
					[]
				);

				const unsetWidth = {};
				let usedWidth = 0,
					/* 平分剩余的宽度 */
					eachWidth;

				_.each(currentShouldShow, (column, index) => {
					if (column.width) {
						usedWidth += column.width;
					} else {
						/* 没有设置width就会自动分配 */
						unsetWidth[index] = true;
					}
				});
				/* 剩余的宽度 */
				const remainWidth = width - usedWidth;
				const unsetCount = Object.keys(unsetWidth).length;

				if (unsetCount) {
					/* 没有设置宽度的列平分剩余的宽度 */
					eachWidth = Math.floor(remainWidth / unsetCount);
					/* 最小宽度 */
					eachWidth = eachWidth > 80 ? eachWidth : 80;
				}

				return _.map(currentShouldShow, column => {
					if (!hasOwn(column, "width")) {
						_.$val(column, "width", eachWidth);
					}
					return {
						dataKey: column.prop,
						title: column.label,
						key: column.prop,
						...column,
						width: column.width
					};
				});
			},
			getHeight(height) {
				if (hasOwn(this.$attrs, "noscroll")) {
					height = this.$attrs.rowHeight || 50;
				}
				return height;
			}
		},
		render() {
			const vm = this;
			/* @ts-ignore */
			return h("xAutoResizer", {
				staticClass: "xDataGrid",
				attrs: { "data-table-resizer-id": vm._uid },
				$vSlots: {
					default: ({ width, height }) => {
						const xTableVirProps = {
							staticClass: ["xDataGrid_table", vm.$xUiConfigs.size].join(" "),
							attrs: { "data-table": vm._uid },
							width,
							height: this.getHeight(height),
							fixed: true,
							...this.$attrs,
							columns: this.columnAutoWidth({ width, height })
						};
						const divProps = {
							staticClass: "xDataGrid_mask",
							attrs: { "data-table-mask": vm._uid }
						};

						/* 拖动列宽 */
						const vDomLine = h("div", { staticClass: "xDataGrid_mask-line" }, []);
						return [h(xTableVir, xTableVirProps), h("div", divProps, [vDomLine])];
					}
				}
			});
		}
	});
}
</script>

<style lang="less">
.xDataGrid_table {
	&.small {
		.el-table-v2__row-cell {
			font-size: 12px;
		}
	}
}

.xDataGrid {
	position: relative;
	//outline: 1px solid red;

	.el-table-v2__header-cell {
		// outline: 1px solid blue;
		position: relative;

		&::after {
			position: absolute;
			content: " ";
			right: 0;
			height: 100%;
			width: 2px;
			top: 0;
			bottom: 0;
			cursor: col-resize;
		}

		display: flex;
		font-size: 13px;
		align-items: center;
		padding: 0 8px;
		height: 100%;
		// user-select: none;
		overflow: hidden;
		background-color: var(--el-table-header-bg-color);
		color: var(--el-table-header-text-color);
		// font-weight: 700;

		&.is-align-center {
			justify-content: center;
			text-align: center;
		}

		&.is-align-right {
			justify-content: flex-end;
			text-align: right;
		}

		&.is-sortable {
			cursor: pointer;
		}

		&:hover {
			.el-icon {
				display: block;
			}
		}
	}

	.xDataGrid_mask {
		position: absolute;
		display: none;

		&.active {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: transparent;
			opacity: 0.5;
			z-index: 1;

			&:hover {
				cursor: col-resize;
			}

			.xDataGrid_mask-line {
				position: absolute;
				top: 0;
				width: 1px;
				border-left: 1px dashed gray;
				bottom: 0;
				left: 0;
			}
		}
	}
}

.el-table-v2 {
	--el-table-border-color: var(--el-border-color-lighter);
	--el-table-border: 1px solid var(--el-table-border-color);
	--el-table-text-color: var(--el-text-color-regular);
	--el-table-header-text-color: var(--el-text-color-primary);
	--el-table-row-hover-bg-color: var(--el-fill-color-light);
	--el-table-current-row-bg-color: var(--ui-primary-light-9);
	--el-table-header-bg-color: var(--el-border-color-lighter);
	--el-table-fixed-box-shadow: var(--el-box-shadow-light);
	--el-table-bg-color: var(--el-fill-color-blank);
	--el-table-tr-bg-color: var(--el-fill-color-blank);
	--el-table-expanded-cell-bg-color: var(--el-fill-color-blank);
	--el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
	--el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
}

.el-vl__wrapper {
	position: relative;
}

.el-vl__wrapper:hover .el-virtual-scrollbar,
.el-vl__wrapper.always-on .el-virtual-scrollbar {
	opacity: 1;
}

.el-vl__window {
	scrollbar-width: none;
}

.el-vl__window::-webkit-scrollbar {
	display: none;
}

.el-virtual-scrollbar {
	opacity: 0;
	transition: opacity 0.34s ease-out;
}

.el-virtual-scrollbar.always-on {
	opacity: 1;
}

.el-vg__wrapper {
	position: relative;
}

.el-table-v2 {
	* {
		// outline: 1px solid grey;
	}

	font-size: 14px;
}

.el-table-v2 * {
	box-sizing: border-box;
}

.el-table-v2__root {
	position: relative;
}

.el-table-v2__root:hover .el-table-v2__main .el-virtual-scrollbar {
	opacity: 1;
}

.el-table-v2__main {
	display: flex;
	flex-direction: column-reverse;
	position: absolute;
	overflow: hidden;
	top: 0;
	background-color: var(--el-bg-color);
	left: 0;
}

.el-table-v2__main .el-vl__horizontal,
.el-table-v2__main .el-vl__vertical {
	z-index: 2;
}

.el-table-v2__left {
	display: flex;
	flex-direction: column-reverse;
	position: absolute;
	overflow: hidden;
	top: 0;
	background-color: var(--el-bg-color);
	left: 0;
	box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.06);
}

.el-table-v2__left .el-virtual-scrollbar {
	opacity: 0;
}

.el-table-v2__left .el-vl__horizontal,
.el-table-v2__left .el-vl__vertical {
	z-index: -1;
}

.el-table-v2__right {
	display: flex;
	flex-direction: column-reverse;
	position: absolute;
	overflow: hidden;
	top: 0;
	background-color: var(--el-bg-color);
	right: 0;
	box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.06);
}

.el-table-v2__right .el-virtual-scrollbar {
	opacity: 0;
}

.el-table-v2__right .el-vl__horizontal,
.el-table-v2__right .el-vl__vertical {
	z-index: -1;
}

.el-table-v2__header-row {
	-webkit-padding-end: var(--el-table-scrollbar-size);
	padding-inline-end: var(--el-table-scrollbar-size);
}

.el-table-v2__row {
	-webkit-padding-end: var(--el-table-scrollbar-size);
	padding-inline-end: var(--el-table-scrollbar-size);
}

.el-table-v2__header-wrapper {
	overflow: hidden;
}

.el-table-v2__header {
	background-color: var(--el-table-header-bg-color);
	position: relative;
	overflow: hidden;
}

.el-table-v2__footer {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}

.el-table-v2__empty {
	position: absolute;
	left: 0;
}

.el-table-v2__overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 9999;
}

.el-table-v2__header-row {
	display: flex;
	border-bottom: var(--el-table-border);
}

.el-table-v2__sort-icon {
	transition:
		opacity,
		display var(--el-transition-duration);
	opacity: 0.6;
	display: none;
}

.el-table-v2__sort-icon.is-sorting {
	display: block;
	opacity: 1;
}

.el-table-v2__row {
	border-bottom: var(--el-table-border);
	display: flex;
	align-items: center;
	transition: background-color var(--el-transition-duration);
}

.el-table-v2__row.is-hovered {
	background-color: var(--el-table-row-hover-bg-color);
}

.el-table-v2__row:hover {
	background-color: var(--el-table-row-hover-bg-color);
}

.el-table-v2__row-cell {
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	padding: 0 8px;
}

.el-table-v2__row-cell.is-align-center {
	justify-content: center;
	text-align: center;
}

.el-table-v2__row-cell.is-align-right {
	justify-content: flex-end;
	text-align: right;
}

.el-table-v2__expand-icon {
	margin: 0 4px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.el-table-v2__expand-icon svg {
	transition: transform var(--el-transition-duration);
}

.el-table-v2__expand-icon.is-expanded svg {
	transform: rotate(90deg);
}

.el-table-v2:not(.is-dynamic) .el-table-v2__cell-text {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.el-table-v2.is-dynamic .el-table-v2__row {
	overflow: hidden;
	align-items: stretch;
}

.el-table-v2.is-dynamic .el-table-v2__row .el-table-v2__row-cell {
	word-break: break-all;
}
</style>
