(async function useIdbKeyVal() {
	var camelizeRE = /\/|\.|_|-(\w)/g;
	const $$id = id => document.getElementById(id);
	const $$tags = tagName => document.getElementsByTagName(tagName);
	const last = arr => (arr.length ? arr[arr.length - 1] : false);

	function camelCase(str) {
		return str.replace(camelizeRE, function (_, c) {
			return c ? c.toUpperCase() : "";
		});
	}

	const $idb = (function idb_keyval() {
		function promisifyRequest(request) {
			return new Promise((resolve, reject) => {
				request.oncomplete = request.onsuccess = () => resolve(request.result);
				request.onabort = request.onerror = () => reject(request.error);
			});
		}
		function createStore(dbName, storeName) {
			const request = indexedDB.open(dbName);
			request.onupgradeneeded = () =>
				request.result.createObjectStore(storeName);
			const dbp = promisifyRequest(request);
			return (txMode, callback) =>
				dbp.then(db =>
					callback(db.transaction(storeName, txMode).objectStore(storeName))
				);
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
				return eachCursor(store, cursor => items.push(cursor.key)).then(
					() => items
				);
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
		const { srcRoot, appName, appEntryName, appVersion } =
			$$id("src-root").dataset;

		window.SRC_ROOT_PATH = srcRoot || "";
		window.APP_NAME = appName || "";
		window.APP_ENTRY_NAME = appEntryName || "entry";
		window.APP_VERSION = appVersion || "";
		window.I18N_LANGUAGE =
			localStorage["X-Language"] || $$tags("html")[0].lang || "zh-CN";
	})();

	function ajax(url) {
		return new Promise((resolve, reject) => {
			var oReq = new XMLHttpRequest();

			oReq.addEventListener("progress", updateProgress);
			oReq.addEventListener("load", transferComplete);
			oReq.addEventListener("error", transferFailed);
			oReq.addEventListener("abort", transferCanceled);

			oReq.open("GET", `${url}?_t=${Date.now()}`);
			oReq.send();

			// 服务端到客户端的传输进程（下载）
			function updateProgress(oEvent) {
				if (oEvent.lengthComputable && oEvent.total) {
					var percentComplete = (oEvent.loaded / oEvent.total) * 100;
					console.log(
						"🚀 ~ updateProgress ~ percentComplete:",
						percentComplete
					);
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

	const $val = (item, prop, val) => {
		item = item || {};
		const isVue2 = item._isVue;
		const fnVue$set = item.$set;
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

	/**
	 * @name resolvePath
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */

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
			resolvedURL = String(url).replace(
				/^@/,
				`${SRC_ROOT_PATH}/business_${APP_NAME}`
			);
		}
		if (/^\/common\//.test(url)) {
			/* common 通用 */
			resolvedURL = `${SRC_ROOT_PATH}${url}`;
		}
		$resolvePath.cache[url] = resolvedURL;
		return resolvedURL;
	}
	$resolvePath.cache = {};

	/*  */
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

	async function $appendScript(url) {
		const id = camelCase(url);
		let $script = $$id(id);
		if (!$script) {
			$script = document.createElement("script");
			$script.id = id;
			const innerHtml = await _$loadText(url);
			const body = $$tags("body")[0];
			body.appendChild($script);
			$script.innerHTML = innerHtml;
		}
	}

	function $resolveCssAssetsPath(styleSourceCode) {
		/* 替换路径 */
		styleSourceCode = styleSourceCode.replace(
			/\/common\/(assets|libs|ui-element)/g,
			path => $resolvePath(path)
		);
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
			"firstPage",
			$resolveCssAssetsPath(`
		html,
		body,
		#app {
			height: 100%;
			width: 100%;
		}
		.x-loading {
			min-height: 48px;
			position: relative;
			filter: blur(1px);
			overflow: hidden;
			pointer-events: none;
		}

		.x-loading::before {
			pointer-events: none;
			content: " ";
			display: block;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			position: absolute;
			background: url(/common/assets/svg/x-loading.svg) center
				no-repeat;
			z-index: 9999999999;
		}`)
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

		await Promise.all([
			$appendScript("/common/libs/jquery-3.7.0.min.js"),
			$appendScript("/common/libs/lodash.js"),
			$appendScript("/common/libs/dayjs.js"),
			$appendScript("/common/libs/vue.js")
		]);

		(function () {
			if (window._CURENT_IS_MOBILE) {
				function setRemBase() {
					const wWidth = $(window).width();
					const rate = wWidth / 375;
					const unit = (16 * rate) / 16;
					$("html").css("font-size", unit + "px");
				}
				$(window).on("resize", setRemBase);
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
		await Promise.all([
			$appendStyle("/common/libs/layer/theme/default/layer.css"),
			$appendScript("/common/libs/layer/layer.js"),
			$appendScript("/common/libs/common.js")
		]);
		/*  */
		if (window.ONLY_USE_IN_DEV_MODEL) {
			window.ONLY_USE_IN_DEV_MODEL();
		}
	})();
})();
