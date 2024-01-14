(async function useIdbKeyVal() {
	var camelizeRE = /\/|\.|_|-(\w)/g;
	/**
	 * document.getElementById
	 * @param {*} id
	 * @returns
	 */
	/* @typescriptDeclare $id(id: string)=> HTMLElement */
	function $$id(id) {
		return document.getElementById(id);
	}

	/**
	 * document.getElementsByTagName
	 * @param {*} tagName
	 * @returns
	 */
	/* @typescriptDeclare (tagName: string)=> HTMLElement[] */
	function $$tags(tagName) {
		return document.getElementsByTagName(tagName);
	}
	function last(arr) {
		return arr.length ? arr[arr.length - 1] : false;
	}

	function camelCase(str = "") {
		return (
			str &&
			str.replace(camelizeRE, function (_, c) {
				return c ? c.toUpperCase() : "";
			})
		);
	}

	/**
	 * indexedDB 简单封装，类似jQuery get set，异步函数
	 * @param {*} key
	 * @param {*} value
	 * @param {*} customStore
	 * @returns
	 */
	/* @typescriptDeclare (key: string, value: any, customStore?: (txMode: string)=>IDBObjectStore)=>Promise<any> */
	const $idb = (function idb_keyval() {
		function promisifyRequest(request) {
			return new Promise((resolve, reject) => {
				request.oncomplete = request.onsuccess = () => resolve(request.result);
				request.onabort = request.onerror = () => reject(request.error);
			});
		}
		function createStore(dbName, storeName) {
			const request = indexedDB.open(dbName);
			request.onupgradeneeded = () => request.result.createObjectStore(storeName);
			const dbp = promisifyRequest(request);
			return (txMode, callback) => dbp.then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)));
		}
		let defaultGetStoreFunc;
		function defaultGetStore() {
			if (!defaultGetStoreFunc) {
				defaultGetStoreFunc = createStore("keyval-store", "keyval");
			}
			return defaultGetStoreFunc;
		}
		function get(key, customStore = defaultGetStore()) {
			return customStore("readonly", store => promisifyRequest(store.get(key)));
		}
		function set(key, value, customStore = defaultGetStore()) {
			return customStore("readwrite", store => {
				store.put(value, key);
				return promisifyRequest(store.transaction);
			});
		}
		function del(key, customStore = defaultGetStore()) {
			return customStore("readwrite", store => {
				store.delete(key);
				return promisifyRequest(store.transaction);
			});
		}
		function clear(customStore = defaultGetStore()) {
			return customStore("readwrite", store => {
				store.clear();
				return promisifyRequest(store.transaction);
			});
		}
		function eachCursor(store, callback) {
			store.openCursor().onsuccess = function () {
				if (!this.result) return;
				callback(this.result);
				this.result.continue();
			};
			return promisifyRequest(store.transaction);
		}
		function keys(customStore = defaultGetStore()) {
			return customStore("readonly", store => {
				if (store.getAllKeys) {
					return promisifyRequest(store.getAllKeys());
				}
				const items = [];
				return eachCursor(store, cursor => items.push(cursor.key)).then(() => items);
			});
		}
		return {
			get,
			set,
			keys,
			clear,
			del
		};
	})();

	(function loadBaseInfo() {
		const srcRootDom = $$id("src-root");
		const { src } = srcRootDom;
		const srcRoot = src.replace("/common/libs/seed.js", "");

		const { appName, appEntryName, appVersion } = srcRootDom.dataset;
		if (!appName) {
			alert("miss APP_NAME");
		}
		window.SRC_ROOT_PATH = srcRoot || "";
		window.APP_NAME = appName || "";
		window.APP_ENTRY_NAME = appEntryName || "entry";
		window.APP_VERSION = appVersion || "";
		window.I18N_LANGUAGE = localStorage["X-Language"] || $$tags("html")[0].lang || "zh-CN";
	})();

	function ajax(url) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();

			xhr.addEventListener("progress", updateProgress);
			xhr.addEventListener("load", transferComplete);
			xhr.addEventListener("error", transferFailed);
			xhr.addEventListener("abort", transferCanceled);

			xhr.open("GET", `${url}?_t=${Date.now()}`);
			xhr.send();

			// 服务端到客户端的传输进程（下载）
			function updateProgress(oEvent) {
				if (oEvent.lengthComputable && oEvent.total) {
					var percentComplete = (oEvent.loaded / oEvent.total) * 100;
					/* TODO: progress*/
				} else {
					// 总大小未知时不能计算进程信息
				}
			}

			function transferComplete({ currentTarget }) {
				resolve(currentTarget.responseText);
			}

			function transferFailed(evt) {
				console.log("An error occurred while transferring the file.");
			}

			function transferCanceled(evt) {
				console.log("The transfer has been canceled by the user.");
			}
		});
	}

	/**
	 * 用"xx.xx.xx"的字符串，安全get、set对象的值，如果是vue2，则用$set保证响应
	 * @param {any} item
	 * @param {any} prop
	 * @param {any} val
	 * @returns
	 */
	/* @typescriptDeclare (item: object, prop: string, val?: any)=> any */
	function $val(item, prop, val) {
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
						Vue?.set && Vue?.set(nextItem, key, val);
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
	}

	/**
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */
	/* @typescriptDeclare (url: string)=>string */
	function $resolvePath(url) {
		let resolvedURL = $resolvePath.cache[url];
		if (resolvedURL) {
			return resolvedURL;
		}
		resolvedURL = url;
		try {
			if (_?.THIS_FILE_URL) {
				let parentURL = last(_.THIS_FILE_URL);
				const parentResolvedURL = $resolvePath.cache[parentURL];
				if (parentResolvedURL) {
					parentURL = parentResolvedURL.split("/");
					if (/^\.\//.test(url)) {
						parentURL[parentURL.length - 1] = String(url).replace("./", "");
						url = parentURL.join("/");
					}

					if (/^\.\.\//.test(url)) {
						parentURL[parentURL.length - 1] = String(url).replace("./", "");
						url = parentURL.join("/");
					}
				}
			}
		} catch (error) {}

		if (/^@/.test(url)) {
			/* 业务代码 */
			resolvedURL = String(url).replace(/^@/, `${SRC_ROOT_PATH}/business_${APP_NAME}`);
		}
		if (/^\/common\//.test(url)) {
			/* common 通用 */
			resolvedURL = `${SRC_ROOT_PATH}${url}`;
		}
		$resolvePath.cache[url] = resolvedURL;
		return resolvedURL;
	}
	$resolvePath.cache = {};

	/**
	 * @description 加载纯文本,包括vue js css html,
	 * @param {any} url
	 * @returns
	 */
	async function $loadText(url) {
		return new Promise(async (resolve, reject) => {
			const key = camelCase(url);
			if ($loadText.pendding[key]) {
				$loadText.pendding[key].push({ resolve, reject });
			} else {
				$loadText.pendding[key] = [{ resolve, reject }];
				try {
					const _url = $resolvePath(url);
					const res = await ajax(_url);
					$loadText.pendding[key].forEach(({ resolve }) => resolve(res));
				} catch (error) {
					$loadText.pendding[key].forEach(({ reject }) => reject(error));
				} finally {
					delete $loadText.pendding[key];
				}
			}
		});
	}
	$loadText.pendding = {};

	const $loadTextCacheify = async function (url) {
		const key = camelCase(url);
		let res = await $idb.get(key);
		if (!res) {
			res = await $loadText(url);
			await $idb.set(key, res);
		}
		return res;
	};

	const _$loadText = (function () {
		/* 预设APP_VERSION 开启缓存 */
		if (!localStorage.isDev && APP_VERSION) {
			return $loadTextCacheify;
		}
		return $loadText;
	})();

	/**
	 * 该函数用于在网页中动态添加脚本文件。它接受一个URL参数和一个全局名称参数，根据URL创建一个id，并检查是否已存在具有该id的script元素。如果不存在，它会创建一个新的script元素，设置其id和src属性，并添加到页面的body元素中。如果URL参数中包含路径，则使用该路径作为src属性值；否则，通过调用另一个函数获取脚本内容。无论使用哪种方式，加载脚本的过程都是异步的。如果指定了全局名称参数，则返回通过该名称访问到的值。
	 *
	 * @param {any} url
	 * @param {string} [globalName=""]
	 * @returns
	 */
	/* @typescriptDeclare (url:string,globalName:string)=>any */
	async function $appendScript(url, globalName = "") {
		const id = camelCase(url);
		let $script = $$id(id);
		if (!$script) {
			$script = document.createElement("script");
			$script.id = id;
			if (window._SCRIPT_USE_SRC) {
				await new Promise(resolve => {
					$script.src = $resolvePath(url);
					$script.onload = function (event) {
						console.log("event.currentTarget.id", event.currentTarget.id);
						resolve(event.currentTarget.id);
					};
					const body = $$tags("body")[0];
					body.appendChild($script);
				});
			} else {
				const innerHtml = await _$loadText(url);
				$script.innerHTML = innerHtml;
				const body = $$tags("body")[0];
				body.appendChild($script);
			}
		}

		if (globalName) {
			return $val(window, globalName);
		}
	}

	/**
	 * 替换less文件里的路径
	 * @param {any} styleSourceCode
	 * @returns
	 */
	function $resolveCssAssetsPath(styleSourceCode) {
		/* 替换路径 */
		styleSourceCode = styleSourceCode.replace(/\/common\/(assets|libs|ui-element|ui-tiny)/g, path => $resolvePath(path));
		/* 当前业务app 的相对地址*/
		styleSourceCode = styleSourceCode.replace(/\/@\//g, $resolvePath("@/"));
		return styleSourceCode;
	}

	async function $appendStyle(url, styleSourceCode = "") {
		const innerHtml = await (async function () {
			if (!styleSourceCode) {
				styleSourceCode = await _$loadText(url);
				styleSourceCode = $resolveCssAssetsPath(styleSourceCode);
			}
			/* 如果是移动端，会替换px为rem html的font-size:1px; */

			if (window._CURENT_IS_MOBILE) {
				const pxReg = /([-+]?[0-9]*\.?[0-9]+)px/g;
				styleSourceCode = styleSourceCode.replace(pxReg, (full, num) => {
					return `${num}rem`;
				});
			}

			return styleSourceCode;
		})();

		if (!innerHtml) {
			return;
		}
		const id = camelCase(url);
		let $style = $$id(id);
		if (!$style) {
			$style = document.createElement("style");
			$style.id = id;
			const body = $$tags("body")[0];
			body.appendChild($style);
		}
		$style.innerHTML = innerHtml;
	}

	(function () {
		$appendStyle(
			"xLoadingStyle",
			$resolveCssAssetsPath(`
		html, body, #app { height: 100%; width: 100%; }

		.x-loading { min-height: 48px; position: relative; // filter: blur(1px); overflow: hidden; pointer-events: none; }
		
		.x-loading::before { pointer-events: none; content: " "; display: block; top: 0; bottom: 0; right: 0; left: 0; position: absolute; background: url(/common/assets/svg/x-loading.svg) center no-repeat; z-index: 9999999999; }
		`)
		);
	})();

	(async function bootstrap() {
		await (async function clearAssetsCacheByAppVersion() {
			if (APP_VERSION !== (await $idb.get("APP_VERSION"))) {
				await $idb.clear();
				await $idb.set("APP_VERSION", APP_VERSION);
				window.APP_VERSION = APP_VERSION;
			}
		})();

		await Promise.all([$appendScript("/common/libs/jquery-3.7.0.min.js"), $appendScript("/common/libs/lodash.js")]);
		await Promise.all([$appendScript("/common/libs/dayjs.js"), $appendScript("/common/libs/vue.js")]);

		(function () {
			Vue.prototype.$X_APP_THEME = $("html").attr("data-theme");
		})();

		(function () {
			if (window._CURENT_IS_MOBILE) {
				$("meta[name='viewport'").attr("content", "width=device-width, initial-scale=1.0, user-scalable=no");
				function setRemBase() {
					const wWidth = $(window).width();
					const rate = wWidth / 375;
					const unit = (16 * rate) / 16;
					$("html").css("font-size", unit + "px");
				}
				$(window).on("resize", setRemBase).on("orientationchange", setRemBase);

				setRemBase();
			}
		})();

		_.$$tags = $$tags;
		_.$$id = $$id;
		_.$val = $val;
		_.$appendScript = $appendScript;
		_.$appendStyle = $appendStyle;
		_.$resolveCssAssetsPath = $resolveCssAssetsPath;
		_.$idb = $idb;
		_.$resolvePath = $resolvePath;
		_.$loadText = _$loadText;

		/* dep jQuery */
		await Promise.all([$appendStyle("/common/libs/layer/theme/default/layer.css"), $appendScript("/common/libs/layer/layer.js"), $appendScript("/common/libs/common.js")]);
		/*  */
		if (isDev) {
			window.ONLY_USE_IN_DEV_MODEL && window.ONLY_USE_IN_DEV_MODEL();
		}
	})();
})();
