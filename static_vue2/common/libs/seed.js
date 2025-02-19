(async function useIdbKeyVal() {
	const ResolvePathCache = {};
	const IS_DEV = !!localStorage.isDev;
	const COMMON_LIBS = IS_DEV ? "/common/libs" : "/common/libs/min";
	const camelizeRE = /\/|\.|_|-(\w)/g;
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
		str = String(str).replaceAll("@", "");
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
			return (txMode, callback) =>
				dbp.then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)));
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

	/* 默认的loading样式 */
	let LOADING_IMAGE_NAME = "x-loading";
	/* 默认的loading样式 */
	(function loadBaseInfo() {
		const srcRootDom = $$id("src-root");
		const { src } = srcRootDom;
		const [srcRoot] = src.split("/common/libs");

		const {
			appName /*应用名称 */,
			appEntryName /* 入口名称 */,
			appVersion,
			loadingImg,
			appPrefix = "business_",
			noNprogress /* 无加载伪进度条 */
		} = srcRootDom.dataset;

		if (!appName) {
			alert("miss APP_NAME");
		}

		window.APP_PREFIX = appPrefix;
		window.SRC_ROOT_PATH = srcRoot || "";
		window.APP_NAME = appName || "";
		window.APP_ENTRY_NAME = appEntryName || "entry";
		window.APP_NO_NPROGRESS = !!noNprogress;
		/* empty */
		window.APP_VERSION = "" || appVersion || "";
		/* empty */
		let I18N_LANGUAGE = localStorage["X-Language"] || $$tags("html")[0].lang || "zh-CN";
		if (!["zh-CN", "en-US"].includes(I18N_LANGUAGE)) {
			console.error(`I18N_LANGUAGE is not valid ${I18N_LANGUAGE}`);
			I18N_LANGUAGE = "zh-CN";
		}
		localStorage["X-Language"] = I18N_LANGUAGE;
		window.I18N_LANGUAGE = I18N_LANGUAGE;
		LOADING_IMAGE_NAME = $resolvePath($resolveSvgIcon(loadingImg || "x-loading"));
	})();

	function execXHR(url) {
		return new Promise((resolve, reject) => {
			try {
				var xhr = new XMLHttpRequest();

				/* "loadend" "loadstart" "timeout" */
				xhr.onprogress = updateProgress;
				xhr.onload = transferComplete;
				xhr.onerror = transferFailed;
				xhr.onabort = transferCanceled;
				xhr.open("GET", `${url}?_t=${Date.now()}`);
				xhr.send();

				// 服务端到客户端的传输进程（下载）
				function updateProgress(oEvent) {
					if (oEvent.lengthComputable && oEvent.total) {
						/* TODO: progress*/
						// var percentComplete = (oEvent.loaded / oEvent.total) * 100;
					} else {
						// 总大小未知时不能计算进程信息
					}
				}

				function transferComplete({ currentTarget }) {
					if (currentTarget.status === 404) {
						reject(404);
					} else {
						resolve(currentTarget.responseText);
					}
				}

				function transferFailed(evt) {
					console.log("An error occurred while transferring the file.");
				}

				function transferCanceled(evt) {
					console.log("The transfer has been canceled by the user.");
				}
			} catch (error) {
				debugger;
			}
		});
	}
	/*  */

	/**
	 * 用"xx.xx.xx"的字符串，安全get、set对象的值，如果是vue2，则用$set保证响应
	 */
	/* @typescriptDeclare (item: object, prop: string, val?: any)=> any */
	function $val(item, prop, val, options = {}) {
		item = item || {};
		const isVue2 = item._isVue;
		const fnVue$set = item.$set;

		if (typeof prop != "string") {
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
		const delVal = () => {
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
		}
		if (val == undefined && options?.delete) {
			delVal(isVue2, key, propArray, nextItem, val);
		} else {
			return getVal(isVue2, key, propArray, nextItem);
		}
		return item;
	}

	/*  */

	function $resolveSvgIcon(cptIconName) {
		if (/^http/.test(cptIconName)) {
			return cptIconName;
		}

		let url = `/common/assets/svg/${cptIconName}.svg`;
		if (/^_/.test(cptIconName)) {
			const iconName = String(cptIconName).replace(/^_/, "");
			url = `@/assets/svg/${iconName}.svg`;
		}
		return url;
	}

	/**
	 * 依赖全局变量SRC_ROOT_PATH
	 * 返回静态资源路径
	 * @param {any} url
	 * @returns
	 */
	/* @typescriptDeclare (url: string)=>string */
	function $resolvePath(url) {
		if (/^http/.test(url)) {
			return url;
		}
		let lodash = window._;
		let resolvedURL = ResolvePathCache[url];
		if (resolvedURL) {
			return resolvedURL;
		}
		resolvedURL = url;
		try {
			if (lodash?.THIS_FILE_URL) {
				let parentURL = last(lodash.THIS_FILE_URL);
				const parentResolvedURL = ResolvePathCache[parentURL];
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
		} catch (error) {
			console.error(error);
		}

		if (/^@/.test(url)) {
			/* 业务代码 */
			resolvedURL = String(url).replace(/^@/, `${SRC_ROOT_PATH}/${APP_PREFIX}${APP_NAME}`);
		}
		if (/^\/common\//.test(url)) {
			/* common 通用 */
			resolvedURL = `${SRC_ROOT_PATH}${url}`;
		}
		ResolvePathCache[url] = resolvedURL;
		return resolvedURL;
	}

	/**
	 * @description 加载纯文本,包括vue js css html,
	 * @param {any} url
	 * @returns
	 */
	async function $loadText(url) {
		url = $resolvePath(url);
		return new Promise(async (resolve, reject) => {
			const key = camelCase(url);
			let collection = $loadText.pending[key];

			if ((typeof collection) === 'string') {
				return resolve(collection);
			}

			if (!collection) {
				$loadText.pending[key] = collection = [];
			}

			if (Array.isArray(collection) && collection.length) {
				/* 如果是数组，且已经发送请求 */
				$loadText.pending[key].push({ resolve, reject });
			} else {
				$loadText.pending[key] = [{ resolve, reject }];
				try {
					/* 保证只运行一次请求 */
					const res = await execXHR(url);
					const OLD_RESOLVE = $loadText.pending[key];
					if (Array.isArray(OLD_RESOLVE)) {
						OLD_RESOLVE.forEach(({ resolve }) => resolve(res));
					} else {
						debugger;
					}
					$loadText.pending[key] = res;
				} catch (error) {
					$loadText.pending[key].forEach(({ reject }) => reject(error));
				}
			}
		});
	}
	$loadText.pending = {};

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
	 * 异步加载脚本代码，但是按顺序执行
	 * @param {*} FRAMWORK_DEEPS
	 * @returns
	 */
	const _$asyncLoadOrderAppendScrips = async function (FRAMWORK_DEEPS) {
		console.time("框架基本依赖");
		return new Promise(async resolve => {
			const scripts = await Promise.all(
				FRAMWORK_DEEPS.map(async ([url, , callback]) => {
					const innerHtml = await _$loadText(url);
					return { url, innerHtml, callback };
				})
			);

			const body = $$tags("body")[0];
			for (const { url, innerHtml, callback } of scripts) {
				const id = camelCase(url);
				const $script = document.createElement("script");
				$script.id = id;
				$script.innerHTML = innerHtml;
				body.appendChild($script);
				if (typeof callback === "function") {
					await callback();
				}
			}
			console.timeEnd("框架基本依赖");
			resolve();
		});
	};

	var $ensure = (() => {
		const logEnsure = () => null;

		/**
		 *
		 * @param {*} fnGetValue 执行此函数，直到返回真值
		 * @param {*} duration 默认为0即不断尝试；若给定时间，未在给定时间内完成，则失败
		 * @returns
		 */
		/* @typescriptDeclare (fnGetValue:(()=>Promise<any>)|(()=>any), duration?:number) =>Promise<any> */
		$ensure = async (fnGetValue, duration = 0, gap = 64) => {
			const fnString = fnGetValue.toString();
			return new Promise((resolve, reject) => {
				let timer;
				let exeCount = 0;

				const checkValue = async () => {
					const value = await fnGetValue();
					logEnsure(fnString, ++exeCount);
					if (value) {
						clearTimeout(timer);
						resolve(value);
					} else {
						timer = setTimeout(checkValue, gap);
					}
				};

				if (duration) {
					setTimeout(() => {
						clearTimeout(timer);
						logEnsure(fnString, exeCount);
						reject(new Error("ensure timeout"));
					}, duration);
				}

				checkValue();
			});
		};
		return $ensure;
	})();


	/**
	 * 该函数用于在网页中动态添加脚本文件。它接受一个URL参数和一个全局名称参数，根据URL创建一个id，并检查是否已存在具有该id的script元素。如果不存在，它会创建一个新的script元素，设置其id和src属性，并添加到页面的body元素中。如果URL参数中包含路径，则使用该路径作为src属性值；否则，通过调用另一个函数获取脚本内容。无论使用哪种方式，加载脚本的过程都是异步的。如果指定了全局名称参数，则返回通过该名称访问到的值。
	 *
	 * @param {any} url
	 * @param {string} [globalName=""]
	 * @returns
	 */
	/* @typescriptDeclare (url:string,globalName:string)=>any */
	async function $appendScript(url, globalName = "", _SCRIPT_USE_SRC = false) {
		try {
			const id = camelCase(url);
			if ($appendScript.loaded[id]) {
				if (globalName) {
					await $ensure(() => window[globalName]);
					return window[globalName];
				}
			} else {
				$appendScript.loaded[id] = true;
			}
			let $script = $$id(id);
			if (!$script) {
				$script = document.createElement("script");
				$script.id = id;
				if (_SCRIPT_USE_SRC) {
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
		} catch (error) {
			console.error(error);
		}
	}
	$appendScript.loaded = {};

	/**
	 * 替换less文件里的路径
	 * @param {any} styleSourceCode
	 * @returns
	 */
	function $resolveCssAssetsPath(styleSourceCode) {
		/* 替换路径 */
		styleSourceCode = styleSourceCode.replace(
			/\/common\/(assets|libs|ui-element|ui-tiny)/g,
			path => $resolvePath(path)
		);
		/* 当前业务app 的相对地址*/
		styleSourceCode = styleSourceCode.replace(/\/@\//g, $resolvePath("@/"));
		return styleSourceCode;
	}

	/**
	 * @param {any} url
	 * @param {any} styleSourceCode
	 * @param {any} options {userLink:Boolean 如果为true，则使用Link方式引入，这样文件里面的相对路径是相对css文件，否则会缓存文本放在style元素里面，路径是相对页面，有这个差异}
	 * @returns
	 */
	/* @typescriptDeclare (url:string,styleSourceCode?:string,options?:any)=>any */
	async function $appendStyle(url, styleSourceCode = "", options = {}) {
		const { useLink = false } = options;
		const id = camelCase(url);

		if (useLink) {
			try {
				let $link = $$id(id);
				if (!$link) {
					$link = document.createElement("link");
					$link.id = id;
					$link.rel = "stylesheet";
					const body = $$tags("head")[0];
					body.appendChild($link);
				}
				$link.href = $resolvePath(url);
			} catch (error) {
			} finally {
				return id;
			}
		}

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
			return id;
		}
		let $style = $$id(id);
		if (!$style) {
			$style = document.createElement("style");
			$style.id = id;
			const body = $$tags("body")[0];
			body.appendChild($style);
		}
		$style.innerHTML = innerHtml;
		return id;
	}

	(async function bootstrap() {
		(async () => {
			const search = new URLSearchParams(location.search);
			if (search.get("useVconsole")) {
				const VConsole = await $appendScript("/common/libs/vconsole.min.js", "VConsole");
				window._vConsole = new VConsole();
			}
		})();

		await (async (/* clearAssetsCacheByAppVersion */) => {
			/* 如果没有配置或者配置了并且和缓存的版本不一致，则清除缓存 */
			const NO_CACHE = !APP_VERSION;
			const NOT_MATCH = APP_VERSION && (APP_VERSION !== (await $idb.get("APP_VERSION")));

			if (IS_DEV || NO_CACHE || NOT_MATCH) {
				await $idb.clear();
				await $idb.set("APP_VERSION", APP_VERSION);
				window.APP_VERSION = APP_VERSION;
			}


			/* 预加载，等vue加载后赋值 */
			_$loadText(`@/i18n/${I18N_LANGUAGE}.js`);

			await _$asyncLoadOrderAppendScrips([
				[COMMON_LIBS + "/jquery/jquery-3.7.0.min.js", null, () => $("body").addClass("x-app-body")],
				[COMMON_LIBS + "/lodash.js", null, () => {
					_.$$tags = $$tags;
					_.$$id = $$id;
					_.$val = $val;
					_.$ensure = $ensure;
					_.$appendScript = $appendScript;
					_.$appendStyle = $appendStyle;
					_.$resolveCssAssetsPath = $resolveCssAssetsPath;
					_.$idb = $idb;
					_.$resolveSvgIcon = $resolveSvgIcon;
					_.$resolvePath = $resolvePath;
					_.$loadText = _$loadText;
					_.$asyncLoadOrderAppendScrips = _$asyncLoadOrderAppendScrips;
					/**
					 * 创建i18n 函数，可同时存在不同语言options的i18n对象
					 * @param {*} lang zh-CN,对应i18n文件夹下的文件
					 * @returns
					 */
					/* @typescriptDeclare (options: { lang: "zh-CN" | "en-US" }) => Promise<any> */
					_.$newI18n = async function ({ lang }) {
						/* @/i18n/zh-CN.js */
						/* @/i18n/en-US.js */
						let langOptionsString = await _.$loadText(`@/i18n/${lang}.js`);
						langOptionsString = langOptionsString.replace("window.i18n.options = ", "");
						const getLangOptionsFn = new Function(`return ${langOptionsString};`);
						const langOptions = getLangOptionsFn();
						const i18n = function (key, payload) {
							if (key.length > 64) {
								alert(`i18n key: 【${key}】 长度超过64，过长，建议重命名`);
							}
							/!*使用 {变量名} 赋值*!/;
							_.templateSettings.interpolate = /{([\s\S]+?)}/g;
							let temp = $val(langOptions, key);
							if (_.isString(temp)) {
								return _.template(temp)(payload);
							} else {
								return key;
							}
						};
						i18n.langOptions = langOptions;

						return i18n;
					};

					if (IS_DEV || NO_CACHE || NOT_MATCH) {
						try {
							/* index.html页面带有preload的数据会首先加载并缓存，后续需要的时候直接使用 */
							const preloadString = document.getElementById("preload")?.innerHTML || false;
							if (preloadString) {
								const getPreload = new Function(preloadString);
								const preloadArray = getPreload();
								preloadArray.forEach(url => $loadText(url));
							}
						} catch (error) { }
					}
				}
				],
				[COMMON_LIBS + "/dayjs.js"],
				[COMMON_LIBS + "/vue.js", null, async () => {
					/**
					 *  国际化
					 * @param {*} key
					 * @param {*} payload
					 * @returns
					*/
					const i18n = await _.$newI18n({ lang: I18N_LANGUAGE });
					/* vue加载之后才能使用国际化属性 */
					window.i18n = i18n;
					Vue.prototype.i18n = i18n;
				}],
				[COMMON_LIBS + "/common.ts"],
				[COMMON_LIBS + "/common.$.ajax.ts"]
			]);

			if (IS_DEV) {
				window.ONLY_USE_IN_DEV_MODEL && window.ONLY_USE_IN_DEV_MODEL();
			}
			Vue.prototype._ = _;

			if (window._CURENT_IS_MOBILE) {
				$("meta[name='viewport'").attr(
					"content",
					"width=device-width, initial-scale=1.0, user-scalable=no"
				);
				function setRemBase() {
					const wWidth = $(window).width();
					const rate = wWidth / 375;
					const unit = (16 * rate) / 16;
					$("html").css("font-size", unit + "px");
				}
				$(window).on("resize", setRemBase).on("orientationchange", setRemBase);
				setRemBase();
			}

			/* 在计算rem之后添加样式，否则会有闪烁 */
			$appendStyle(
				"xLoadingStyle",
				`html, body, #app { height: 100%; width: 100%; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.spin {animation: spin 2s linear infinite;}
.x-loading { min-height: 48px; position: relative; // filter: blur(1px); overflow: hidden; pointer-events: none; }
.x-loading::before { animation: spin 2s linear infinite;pointer-events: none; content: " "; display: block; top: 0; bottom: 0; right: 0; left: 0; position: absolute; background: url(${LOADING_IMAGE_NAME}) center/32px no-repeat; z-index: 9999999999; }
`
			);
		})();
		
		/* setup */
		!APP_NO_NPROGRESS &&
			(_.$importVue.Nprogress = await _.$importVue("/common/libs/Nprogress.vue"));
		console.time("APP");
		console.log("APP start");
		const APP = await _.$importVue(
			`${SRC_ROOT_PATH}/${APP_PREFIX}${APP_NAME}/${APP_ENTRY_NAME}.vue`
		);
		console.log("APP end");
		console.timeEnd("APP");
		if (IS_DEV) {
			window.HMR_APP = APP;
		}
	})();
})();
