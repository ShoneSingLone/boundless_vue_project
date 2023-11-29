(function () {
	/* lodash 主要是纯函数 $前缀的是自定义函数*/
	window.defItem = (...args) => {
		let options = _.merge.apply(_, args);

		if (!Vue.hasOwn(options, "disabled")) {
			options.disabled = false;
		}
		return Vue.reactive(options);
	};

	/* 数字 非 NaN */
	_.$isNumber = value => {
		return _.isNumber(value) && !_.isNaN(value);
	};

	/* 返回元素不为空的数组 */
	_.$filterSomeInput = arr => {
		return _.filter(arr, item => {
			return _.some(item, val => {
				return _.$isInput(val);
			});
		});
	};
	_.$filterAllInput = arr => {
		return _.filter(arr, item => {
			return _.every(item, val => {
				return _.$isInput(val);
			});
		});
	};

	_.$trylog = asyncFn => {
		try {
			return asyncFn();
		} catch (error) {
			console.error(asyncFn.toString());
			console.error(error);
		}
	};

	_.$lStorage = new Proxy(localStorage, {
		set(_localStorage, prop, value) {
			if (_.isPlainObject(value)) {
				_localStorage[prop] = JSON.stringify(value);
			} else {
				_localStorage[prop] = value;
			}
			return true;
		},
		get(_localStorage, prop) {
			const objString = _localStorage[prop];
			try {
				return JSON.parse(objString);
			} catch (error) {
				if (objString === "undefined") {
					return false;
				}
				return objString || false;
			}
		}
	});

	/**
	 * @name _.$ajax
	 * 请求API的工具函数
	 * _.$ajax.get
	 * _.$ajax.post
	 *
	 */
	_.$ajax = (() => {
		/*
		 *
		 * @param {any} { type, url, options, success: resolve, error: reject }
		 * @returns
		 * */
		function configs(API_OPTIONS) {
			let { type, url, options, success: resolve, error: reject } = API_OPTIONS;

			const data = (isUseBodyParams => {
				if (isUseBodyParams) {
					if (options.query) {
						url = (() => {
							if (options.query) {
								if (_.isString(options.query)) {
									return url + "?" + options.query;
								}
								if (_.isPlainObject(options.query)) {
									return url + "?" + _.map(options.query, (value, key) => `${key}=${encodeURIComponent(value)}`).join("&");
								}
							}
						})();
					}
					return JSON.stringify(options.data || {});
				} else {
					if (_.isString(options.data)) {
						return options.data;
					}
					if (_.isPlainObject(options.data)) {
						return _.map(options.data, (value, key) => `${key}=${encodeURIComponent(value)}`).join("&");
					}
				}
			})(["POST", "PUT"].includes(_.toUpper(type)));

			const headers = _.merge({ "X-Language": localStorage["X-Language"] }, options.headers);

			const errorCodeArray = [400, 404, 500, 555];
			return {
				headers,
				dataType: "json",
				url,
				type,
				data,
				contentType: "application/json",
				dataType: "JSON",
				success(response) {
					if (_.isPlainObject(response)) {
						if (response?.code) {
							if (errorCodeArray.includes(response.code)) {
								reject(response.body);
								return;
							}
						}
						if (response?.status) {
							if (errorCodeArray.includes(response.status)) {
								const { body, message } = response || {};
								reject(body || message);
								return;
							}
						}
					}
					return resolve(response);
				},
				error(response) {
					if (401 === response.status) {
						//超时了
						let locationUrl = response.getResponseHeader("Location");
						location.assign(locationUrl);
					} else {
						if (errorCodeArray.includes(response.status)) {
							reject(response?.responseJSON?.message || JSON?.stringify(response?.responseJSON, null, 2));
						} else {
							reject(response);
						}
					}
				}
			};
		}

		const urlWrapper = url => `${window.MOCK_URL_PREFIX || ""}${url}`;

		const $ajax = {
			post: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs({
							type: "POST",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			},
			get: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs({
							type: "GET",
							url: urlWrapper(url),
							options,
							timeout: 1000 * 60,
							success: resolve,
							error: reject
						})
					);
				});
			},
			put: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs({
							type: "put",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			}
		};

		return $ajax;
	})();
	/*  */
	(function () {
		/**
		 * @name _.$genId
		 * 生成一串随机数，category作为前缀
		 * @param {any} category
		 * @returns
		 */
		_.$genId = function (category) {
			if (_.$genId.idCount > _.$genId.ID_COUNT_MAX) {
				_.$genId.idCount = 1;
				_.$genId.DATE_NOW = Date.now();
			}
			return `${category}_${_.$genId.DATE_NOW}_${_.$genId.idCount++}`;
		};
		_.$genId.idCount = 1;
		_.$genId.ID_COUNT_MAX = 40000;
		_.$genId.DATE_NOW = Date.now();
	})();

	/**
	 * @name _.$dateFormat
	 * 日期格式化
	 * @param {any} date 为long类型
	 * @param {any} type 为格式化参数
	 * @returns
	 */
	_.$dateFormat = (date = null, type = 0) => {
		if (!date) {
			return "";
		}
		date = date || Date.now();
		if (!type) {
			return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
		}
		if (type === 1) {
			return dayjs(date).format("YYYY-MM-DD");
		}
		return dayjs(date).format(type);
	};

	/**
	 * value to label
	 * @param {*} value
	 * @param {*} options
	 * @returns
	 */
	_.$val2L = (value, options) => {
		const item = _.find(options, item => String(item.value) === String(value));
		if (item) {
			return item.label;
		} else {
			return "";
		}
	};

	/**
	 * @name _.$randomName
	 * name作为前缀的符合name要求的字符串
	 * @param {any} name
	 * @returns string
	 */
	_.$randomName = name => {
		return name + parseInt((new Date().getTime() % 61439) + 4096).toString(16);
	};

	_.$is200 = function is200(val) {
		return String(val) === "200";
	};
	/**
	 * 默认检测obj上每一个属性都能通过isInput，如果给定keys，	则只检测keys中的属性
	 * @param {*} obj
	 * @param {*} keys
	 * @returns
	 */
	_.$isEveryInput = function (obj, keys = []) {
		if (Object.keys(obj).length > 0) {
			if (_.$isArrayFill(keys)) {
				return _.every(keys, key => {
					return _.$isInput(obj[key]);
				});
			} else {
				return _.every(Object.entries(obj), ([key, value]) => {
					return _.$isInput(value);
				});
			}
		}
		return false;
	};

	/**
	 * @name _.$isInput
	 * 是否已输入
	 * false 0 为真 空数组[]为false
	 * @param {any} val
	 * @returns boolean
	 */
	_.$isInput = function (val) {
		if (_.isArray(val)) {
			return val.length > 0;
		}
		if (!!val) return true;
		if (val === 0) return true;
		if (val === false) return true;
		return false;
	};

	/**
	 * @name _.$doNoting
	 * 啥都不干的函数
	 */
	_.$doNoting = () => {};

	/**
	 * @name _.$sleep
	 * 异步函数，延时 记得用await
	 * @param {any} timeout
	 * @returns
	 */
	_.$sleep = timeout => new Promise(r => setTimeout(r, timeout));

	/**
	 *
	 * @param {*} vm 绑定当前实例
	 * @param {*} fn
	 * @param {*} wait time
	 * @returns
	 */
	_.$asyncDebounce = (vm, fn, wait = 1000) => {
		fn.queue = [];
		fn.timmer = null;
		return function (...args) {
			const vm = this;
			fn.bindFn = fn.bind(vm);
			if (fn.timmer) {
				clearTimeout(fn.timmer);
			}
			fn.timmer = setTimeout(async () => {
				try {
					const res = await fn.bindFn.apply(vm, args);
					_.each(fn.queue, r => r(res));
					fn.queue = [];
				} catch (error) {
					console.error(error);
				} finally {
					fn.queue = [];
				}
			}, wait);
			return new Promise(resolve => {
				fn.queue.push(resolve);
			});
		}.bind(vm);
	};
	/**
	 * @name _.$isArrayFill
	 * @param {any} val
	 * @returns
	 */
	_.$isArrayFill = val => _.isArray(val) && val.length > 0;

	/**
	 * 开发模式下才会在console打印日志
	 */
	const genConsole = type => {
		const isDev = !!localStorage.isDev;
		const mustShowLog = localStorage.mustShowLog;
		if (isDev || mustShowLog) {
			return console[type].bind(console);
		}
		return () => null;
	};
	console.log = genConsole("log");
	console.warn = genConsole("warn");
	console.info = genConsole("info");

	/**
	 * 全局loading单例
	 * true 为loaidng false关闭
	 * 注意，一定要保证成对出现，不然一直loading
	 * @param {any} isLoading
	 * TODO: 超时关闭并提示
	 */
	_.$loading = function loading(isLoading = false) {
		_.$loading.count = _.$loading.count || 0;
		if (isLoading) {
			/* 已经有loading */
			if (!_.$loading.count) {
				// _.$loading.index = layer.load(1);
				$("body").addClass("x-loading");
			}
			_.$loading.count++;
			// loadingTimeout();
		} else {
			closeLoading();
		}
	};

	function closeLoading() {
		_.$loading.count--;
		if (_.$loading.count < 1) {
			/* 延迟取消 */
			var timmer = setTimeout(() => {
				if (_.$loading.count < 1) {
					$("body").removeClass("x-loading");
				} else {
					clearTimeout(timmer);
				}
				// layer.close(_.$loading.index);
			}, 400);
			_.$loading.count = 0;
		}
	}

	const loadingTimeout = _.debounce(function loadingTimeout() {
		if (!!_.$loading.count) {
			layer.close(_.$loading.index);
			_.$loading.count = 0;
			_.$msgError(i18n("超时"));
		}
	}, 1000 * 3);

	_.$confirm = (options = {}) => {
		return new Promise(async (resolve, reject) => {
			const isDelete = !!options.isDelete;
			let title = options.title || i18n("info");
			let content = options.content || "";

			if (isDelete) {
				title = `<div class="flex middle start warning-color">
				<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5387"><path d="M950.065894 189.657494h-209.662838V114.013358A114.663104 114.663104 0 0 0 625.945135 0h-227.821534a114.663104 114.663104 0 0 0-114.457921 114.013358v75.644136h-208.602725A38.88218 38.88218 0 0 0 36.522746 228.060914a38.129842 38.129842 0 0 0 38.540209 38.403419h56.664707v606.281593a151.596046 151.596046 0 0 0 151.869624 151.288271h456.80577a151.596046 151.596046 0 0 0 151.869624-151.288271V265.335827h56.664707a38.847983 38.847983 0 0 0 38.540209-38.369223 36.283195 36.283195 0 0 0-37.411702-37.30911zM360.746097 112.850655a38.88218 38.88218 0 0 1 38.540208-38.40342h227.821534A38.88218 38.88218 0 0 1 665.648047 112.850655v75.644135H360.746097z m456.737376 758.69837a75.780924 75.780924 0 0 1-75.917713 75.644136H284.794186a75.780924 75.780924 0 0 1-75.95191-75.644136V265.267433h608.709591zM398.123601 416.589901a38.847983 38.847983 0 0 0-38.540208 38.369223v303.705049a38.88218 38.88218 0 0 0 38.540208 38.40342 38.129842 38.129842 0 0 0 38.540209-38.40342v-303.705049a38.129842 38.129842 0 0 0-38.540209-38.369223z m228.95004 0a38.847983 38.847983 0 0 0-38.540208 38.369223v303.705049a38.88218 38.88218 0 0 0 38.540208 38.40342 38.129842 38.129842 0 0 0 38.540209-38.40342v-303.705049a39.634518 39.634518 0 0 0-38.574406-38.369223z" p-id="5388"></path></svg>
				<span class="ml4">${title}</span>
				</div>`;
			}

			const WindowConfirm = await _.$importVue("/common/ui-x/msg/WindowConfirm.vue", {
				onOk: resolve,
				onCancel: reject,
				content,
				isDelete
			});
			_.$openWindow(title, WindowConfirm, { offset: "200px" });
		});
	};

	_.$delConfirm = (options = {}) => {
		options.title = options.title || i18n("delete");
		options.isDelete = true;
		return _.$confirm(options);
	};

	/*  */
	/*  */
	_.$msgInfo = title => {
		return ELEMENT.Message({
			message: title,
			type: "info",
			duration: 0
		});
	};
	/*  */
	_.$msgSuccess = title => {
		return new Promise(resolve => {
			layer.msg(
				title,
				{
					time: 2000,
					icon: 1
				},
				resolve
			);
		});
	};
	/*  */
	_.$msgError = (title, options) =>
		new Promise(resolve => {
			if (!title) {
				resolve();
				return;
			}
			/*如果返回的是一個對象，且对象status为200，则不提示*/
			if (_.isPlainObject(title)) {
				if (title.status === 200) {
					return;
				}
			}
			if (title?.error) {
				title = String(title.error);
			}
			if (title?.message) {
				title = String(title.message);
			}

			if (!_.isString(title)) {
				try {
					title = JSON.stringify(title);
				} catch (e) {
					console.error(e);
				}
			}
			console.error(title);
			layer.msg(
				title,
				{
					time: 1000 * 5,
					icon: 2,
					...options
				},
				resolve
			);
		});
	/*  */
	(function () {
		const DIALOG_CACHE = {};

		$(window).on(
			"resize.dialogResetLayout",
			_.debounce(function () {
				_.each(DIALOG_CACHE, dialogResetLayout => {
					dialogResetLayout();
				});
			}, 300)
		);

		_.$privateSetWindowVmDefaultMethods = function (WindowVueCtor, indexPanel) {
			WindowVueCtor.propsData = WindowVueCtor.propsData || {};
			WindowVueCtor.propsData.$closeWindow = () => layer.close(indexPanel);
			WindowVueCtor.propsData.$layerMax = () => layer.full(indexPanel);
			WindowVueCtor.propsData.$layerMin = () => layer.min(indexPanel);
			WindowVueCtor.propsData.$layerRestore = () => layer.restore(indexPanel);
			return new Vue(WindowVueCtor);
		};

		_.$privateLayerSuccessThenMountVueComponent = function (WindowVueCtor, indexPanel, vm, layero, options, id, DIALOG_CACHE, layerVM) {
			if (WindowVueCtor.parent) {
				if (!WindowVueCtor.parent._isVue) {
					console.error(new Error("_.$importVue 的 parent 必须是Vue的实例，当前传入的不是"));
					alert(e);
				}
			}

			// WindowVueCtor.el = `#${id}`;
			vm = _.$privateSetWindowVmDefaultMethods(WindowVueCtor, indexPanel);
			/* 在window内可以直接调用 */
			vm.$bus = _.merge({ layero, indexPanel }, WindowVueCtor?.bus || {});

			vm.layero = layero;
			vm.indexPanel = indexPanel;

			options.beforeMount && options.beforeMount(vm);
			vm.$mount(`#${id}`);
			options.mounted && options.mounted(vm);

			/* resize之后调用offset重新布局 */
			if (options.fullscreen) {
				/* 全屏 */
				DIALOG_CACHE[indexPanel] = () => layer.full(indexPanel);
				DIALOG_CACHE[indexPanel]();
			}
			/* resize之后调用offset重新布局 */
			layerVM.offset();
			setTimeout(() => {
				layerVM.offset();
				(function () {
					vm.$resizeObserver = new ResizeObserver(entries => {
						// const entry = _.first(entries);
						//
						layerVM.offset();
					});
					vm.$resizeObserver.observe(vm.$el);
				})();
			}, 64);
			return vm;
		};

		_.$openWindow = async (title, WindowVueCtor, options = {}) => {
			if (!WindowVueCtor) {
				throw new Error("openWindow WindowVueCtor is null ");
			}
			/* 保留，取消layer自己的btns */
			options.btn = options.btn || null;
			return new Promise(resolve => {
				const id = `layer-open-${Date.now()}`;
				let $container = $(`<div/>`, {
					id
				});
				$container.appendTo($("body"));
				let vm;

				layer.open(
					_.merge(
						{
							type: 1,
							title: [title],
							area: ["", ""],
							content: $container,
							// offset: ['600px','600px'],
							btn: [i18n("confirm"), i18n("cancel")],
							afterAppendBody({ layerVM }) {
								// const $ele = $(`#layui-layer${layer.index}`);
								// layerVM.layero.addClass("opacity0");
							},
							success(layero, indexPanel, layerVM) {
								vm = _.$privateLayerSuccessThenMountVueComponent(WindowVueCtor, indexPanel, vm, layero, options, id, DIALOG_CACHE, layerVM);
							},
							yes(indexPanel, layero) {
								if (_.isFunction(options._yes)) {
									options._yes(indexPanel, layero, {
										vm
									});
								} else {
									layer.close(indexPanel);
								}
							},
							cancel: _.$doNoting,
							end(indexPanel) {
								const $layerPanel = $(vm.$el).parents(".layui-layer.layui-layer-page.layer-anim-close");
								$layerPanel.remove();
								vm.$resizeObserver.disconnect();
								vm.$resizeObserver = null;
								delete DIALOG_CACHE[indexPanel];
								vm.$destroy();
								$container.remove();
								$container = null;
								vm = null;
								resolve();
							}
						},
						options
					)
				);
			});
		};
	})();

	const logEnsure = _.debounce(function () {
		console.log("🚀:", "$ensure", _.$ensure.collection);
	}, 1000);

	/* 等待fnGetValue为真值，duration为0就不断尝试，若不在给定时间内完成，则失败 */
	_.$ensure = async (fnGetValue, duration = 0) => {
		var fnString = fnGetValue.toString();
		_.$ensure.collection.add(fnString);
		logEnsure();
		return new Promise(async (resolve, reject) => {
			var timer;
			if (duration) {
				timer = setTimeout(() => {
					reject(new Error("enSure fail"));
				}, duration);
			}
			let exeFnGetValue = async function () {
				const value = await fnGetValue();
				if (value) {
					exeFnGetValue = null;
					if (timer) {
						clearTimeout(timer);
					}
					resolve();
					_.$ensure.collection.delete(fnString);
					logEnsure();
					return;
				} else {
					setTimeout(exeFnGetValue, 64);
				}
			};
			exeFnGetValue.count = 1;
			exeFnGetValue();
		});
	};
	_.$ensure.collection = new Set();

	/**
	 * @deprecated _.$appendScript可以缓存，不用每次都重新加载
	 * @description 动态方式添加js，在pendding阶段的调用都会等待
	 * @param {any} globalName
	 * @param {any} url
	 * @returns
	 */
	async function $globalVar(globalName, url) {
		url = _.$resolvePath(url);
		return new Promise(async resolve => {
			if (_.$val(window, globalName) && $globalVar[globalName] === _.$val(window, globalName)) {
				return resolve(_.$val(window, globalName));
			}
			if ($globalVar[globalName] === "IS_PENDDING") {
				await _.$ensure(() => $globalVar[globalName] === _.$val(window, globalName));
				return resolve(_.$val(window, globalName));
			}
			const id = _.camelCase(url);
			$globalVar[globalName] = "IS_PENDDING";
			let $script = _.$$id(id);
			if (!$script) {
				$script = document.createElement("script");
				$script.id = id;
				const body = _.$$tags("body")[0];
				body.appendChild($script);
				$script.onload = () => {
					$globalVar[globalName] = _.$val(window, globalName);
					resolve(_.$val(window, globalName));
				};
				$script.src = url;
			}
		});
	}

	_.$globalVar = $globalVar;
	/*  */
	_.$location = {
		hash(key, val) {
			const path = location.hash.replace(/^#/, "");
			const search = new URLSearchParams(path);
			if (val) {
				if (search.has(key)) {
					search.set(key, val);
				} else {
					search.append(key, val);
				}
				const hash = search.toString();
				location.hash = decodeURIComponent(hash);
			} else {
				return search.get(key);
			}
		}
	};
	/*  */
	(function () {
		const VUE_COMPONENTS_CACHE = {};

		function VueLoader(sourceCodeString) {
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
		}

		/**
		 *
		 * @param {any} url
		 * @param {any} param1
		 * @returns
		 */
		async function GenComponentOptions(url, { scritpSourceCode, templateSourceCode, payload }) {
			payload = payload || {};
			try {
				scritpSourceCode = scritpSourceCode.replace("export default", "");
				const isShowTemplate = templateSourceCode && localStorage.isDev;
				const innerCode = [
					`console.info("${url}");`,
					isShowTemplate ? `(()=>\`${templateSourceCode}\`)();` : ``,
					`try{const ${_.camelCase(url)} = ${scritpSourceCode};return ${_.camelCase(url)}.call({THIS_FILE_URL:"${url}"},payload);}catch(e){console.error(e)}`
				].join("\n");
				let scfObjAsyncFn;
				let component = {};

				try {
					scfObjAsyncFn = new Function("payload", `with (Vue){${innerCode};}`);
				} catch (e) {
					console.warn(innerCode);
					throw e;
				}
				const fnPayload = new Proxy(payload, {
					get(obj, prop) {
						if (obj[prop] !== undefined) {
							return obj[prop];
						}
						return Vue[prop];
					}
				});
				try {
					_.THIS_FILE_URL.push(url);
					component = await scfObjAsyncFn(fnPayload);
				} catch (e) {
					console.warn(scfObjAsyncFn.toString());
					throw e;
				} finally {
					_.THIS_FILE_URL.pop();
				}
				/* 可以不返回对象，只执行外层 wrapper层的function */
				/* template */
				if (templateSourceCode) {
					component.template = templateSourceCode;
				}
				return component;
			} catch (error) {
				console.error(error);
			}
		}

		_.$GenComponentOptions = GenComponentOptions;

		/**
		 *
		 * @returns { scritpSourceCode, templateSourceCode, styleSourceCode }
		 */
		async function SourceCode_SFC(url) {
			/* 非开发模式下，如果已经加载，直接返回，否则每次都获取最新的代码 */
			if (!localStorage.isDev && VUE_COMPONENTS_CACHE[url]) {
				return VUE_COMPONENTS_CACHE[url];
			} else {
				/* 缓存 */
				const scfSourceCode = await _.$loadText(url);
				VUE_COMPONENTS_CACHE[url] = VueLoader(scfSourceCode);
				$appendSfcStyle(VUE_COMPONENTS_CACHE[url].styleSourceCode, url);
				return VUE_COMPONENTS_CACHE[url];
			}
		}

		_.$SourceCode_SFC = SourceCode_SFC;

		/**
		 * 利用less添加样式,独立处理资源路径
		 *
		 * @param {any} styleSourceCode
		 */
		async function $appendSfcStyle(styleSourceCode, url) {
			/* style */
			if (styleSourceCode) {
				await _.$appendScript("/common/libs/less.js");
				const { render } = window.less;
				let cssContent = await new Promise(resolve => {
					render(_.$resolveCssAssetsPath(styleSourceCode), {}, (error, cssContent) => {
						if (error) {
							console.error(styleSourceCode);
							console.error(error);
							resolve({ css: "" });
						} else {
							resolve(cssContent.css);
						}
					});
				});
				_.$appendStyle(url, cssContent);
			}
		}

		_.$vNode = function $vNode(tpl, scope, ...args) {
			try {
				const { render } = Vue.compile(tpl);
				return render.apply(scope, args);
			} catch (error) {
				console.error(error);
				return null;
			}
		};
		/**
		 * 加载自定义的SFC vue 文件
		 * @param {*} url
		 * @param {*} payload
		 * @returns
		 */
		_.$importVue = async function (url, payload = {}) {
			if (_.isArray(url)) {
				return Promise.all(_.map(url, _url => _.$importVue(_url)));
			}
			const resolvedURL = _.$resolvePath(url);
			// localStorage.isDev && console.time(url);
			if (url === "ANY") {
				url = "/common/any.vue";
			}
			/* 切换页面时的动效 */
			if (_.$importVue?.Nprogress) {
				_.$importVue?.Nprogress.start();
			}
			try {
				const { scritpSourceCode, templateSourceCode } = await _.$SourceCode_SFC(resolvedURL);
				/* script and template*/
				const ComponentOptions =
					(await _.$GenComponentOptions(url, {
						scritpSourceCode,
						templateSourceCode,
						payload
					})) || {};
				if (payload?.parent) {
					ComponentOptions.parent = payload?.parent;
				}
				ComponentOptions.FILE_URL = resolvedURL;
				return ComponentOptions;
			} catch (error) {
				console.error(error);
			} finally {
				if (_.$importVue?.Nprogress) {
					_.$importVue?.Nprogress.done();
				}
				// localStorage.isDev && console.timeEnd(url);
			}
		};

		/**
		 * @name _.$newRoute
		 * 生成VueRouter 的 route
		 * path 与name相同，也不要使用 /:id这种不方便找对应的组件
		 * @param {*} path 必须是完成路径 比如 /a /a/b /a/b/c
		 * @param {*} componentPath
		 * @param {*} options
		 * @returns
		 */
		_.$newRoute = function (path, componentPath, options = {}) {
			return {
				name: path,
				path,
				component: () => _.$importVue(componentPath),
				...options
			};
		};
	})();
	/*  */
	_.$setPagination = function (configs, pagination) {
		if (pagination) {
			configs.pagination = _.merge({}, configs.pagination, pagination);
		}
		return configs.pagination;
	};
	/*  */
	_.$setTableData = function (configs, { list, total, selected = [] }) {
		if (configs.data) {
			if (selected !== undefined && _.isArray(selected)) {
				configs.data.selected = selected;
			}
			if (list !== undefined && _.isArray(list)) {
				configs.data.list = list;
			}
		} else {
			throw new Error("table cofigs 必须要有data属性且为对象");
		}

		if (configs.pagination) {
			configs.pagination.count = total || 0;
		}
	};

	function getWrapperBy(selector) {
		if (_.isString(selector)) {
			return $(selector);
		}

		if (selector.innerHTML) {
			return $(selector);
		}

		if (selector.$el) {
			return $(selector.$el);
		}
		if (!$wrapper || $wrapper.length == 0) {
			throw new Error("selector不是可用的dom元素");
		}
	}

	function getTargetBy(selector) {
		let $wrapper = getWrapperBy(selector);

		const $target = (function () {
			let $target = $wrapper.find(`[data-form-item-id^=x_form_id_]`);

			if ($target.length === 0) {
				return $wrapper;
			}
			return $target;
		})();

		return $target;
	}

	/**
	 * TODO: isHide的元素不需要校验
	 *
	 * @param {any} selector  满足jQuery能选出来就行 form#表单的包裹元素，校验元素内的所有控件
	 * @returns 如果都通过返回空数组，否则返回
	 * [
	 *  [msg,vm],
	 *  [msg,vm],
	 *  ...
	 * ]的数组元素
	 *  @example
	 * const [error] = await _.$validateForm("this.$el");//这个范围就是整个组件
	 * if (error) {
	 *  return;
	 * }
	 *
	 */
	_.$validateForm = async selector => {
		const $target = getTargetBy(selector);
		const errorArray = [];
		for (const dom of $target) {
			const { formItemId } = dom.dataset;
			const vm = Vue._X_ITEM_VM_S[formItemId];
			const msg = await vm.validate();
			if (msg) {
				errorArray.push([msg, vm]);
			}
		}
		if (errorArray.length > 0) {
			return errorArray;
		} else {
			return [];
		}
	};

	_.$hideRow = async (refTable, filterFn) => {
		_.$setTableData(refTable.configs, { list: _.filter(refTable.configs.data.list, (row, index) => filterFn({ row, index })) });
	};
	/**
	 * 修改xItem的属性
	 * @param {*} selector
	 * @param {*} attrs
	 */
	_.$modifyItemsAttrs = async (selector, attrs) => {
		const $target = getTargetBy(selector);
		for (const dom of $target) {
			const { formItemId } = dom.dataset || {};
			const vm = Vue._X_ITEM_VM_S?.[formItemId || "________No"];
			_.each(attrs, (val, key) => {
				if (vm && key === "disabled" && Vue.hasOwn(vm.privateState, "isDisabled")) {
					vm.privateState.isDisabled = val ? "disabled" : "";
				} else {
					if (vm?.configs) {
						Vue.set(vm.configs, key, val);
					}
				}
			});
		}
	};

	_.$getVmById = id => {
		let vm = {};
		try {
			const targetDom = document.querySelector(`#${id}`);
			debugger;
			const { formItemId } = targetDom.dataset || {};
			vm = Vue._X_ITEM_VM_S?.[formItemId || "________No"] || {};
		} catch (error) {
		} finally {
			return vm;
		}
	};
	/* 从Table 中获取xItem的vm */
	_.$getCellItemVm = (rowIndex, colProp, selector) => {
		let vm = {};
		try {
			let $wrapper = getWrapperBy(selector);
			const itemSelector = `.el-table__body-wrapper [data-row-index=${rowIndex}][data-col-prop=${colProp}]`;
			const targetDom = $wrapper.find(itemSelector);
			const { formItemId } = targetDom?.[0].dataset || {};
			vm = Vue._X_ITEM_VM_S?.[formItemId || "________No"] || {};
		} catch (error) {
		} finally {
			return vm;
		}
	};
	/**
	 * 从指定selector范围的xTable 表中获取rowIndex colProp 对应xItem的实例
	 * @param selector
	 * @param rowIndex
	 * @param colProp
	 * @returns {*|{}}
	 */
	_.$CellItem = function ({ selector, rowIndex, colProp }) {
		return new Proxy(_.$getCellItemVm(rowIndex, colProp, selector), {
			get(obj, prop) {
				if (prop === "_$item") {
					return value => {
						if (value === undefined) {
							value = obj.p_value;
						}
						return obj?.configs?.options?.find(i => i.value === value) || {};
					};
				}
				return obj[prop];
			}
		});
	};

	/**
	 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
	 * @param {any} form xItem 配置信息，config带有value属性
	 * @param {any} values
	 */
	_.$setValToForm = function setValToForm(form, values) {
		_.each(values, (value, prop) => {
			if (value !== undefined && _.isPlainObject(form[prop])) {
				form[prop].value = value;
			}
		});
	};

	/*  */
	/**
	 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
	 * @param {any} configs
	 * @returns
	 */
	_.$pickValueFromConfigs = function pickValueFromConfigs(configs) {
		return _.reduce(
			configs,
			(_params, configs, prop) => {
				if (configs.value !== undefined) {
					_params[prop] = configs.value;
				}
				return _params;
			},
			{}
		);
	};
	/*  */
	_.$valFirstOrDefault = (options, defaultValue) => {
		if (defaultValue === undefined) {
			alert("_.$valFirstOrDefault miss defaultValue");
		}
		if (_.$isArrayFill(options)) {
			return options[0].value;
		}
		return defaultValue;
	};
})();

(async function () {
	await (async function setI18n() {
		const i18n = function (key, payload) {
			/!*使用 {变量名} 赋值*!/;
			_.templateSettings.interpolate = /{([\s\S]+?)}/g;
			let temp = window.i18n.options[key];
			/* 可能是嵌套对象的形式 */
			if (!temp) {
				temp = _.$val(window.i18n.options, key);
			}
			return _.template(temp)(payload) || key;
		};
		/* 国际化 */
		window.i18n = i18n;
		await _.$appendScript(`@/i18n/${I18N_LANGUAGE}.js`);
		Vue.prototype.$i18n = i18n;
		Vue.prototype.i18n = i18n;
	})();
	/* setup */
	await (async function setVueConfigs() {
		Vue.prototype.$genId = _.$genId;
		await _.$ensure(() => window.SRC_ROOT_PATH !== undefined);
		_.$importVue.Nprogress = await _.$importVue("/common/libs/Nprogress.vue");
	})();

	// document.title = window.i18n("adminConsole");
	const APP = await _.$importVue(`${SRC_ROOT_PATH}/business_${APP_NAME}/${APP_ENTRY_NAME}.vue`);
	if (localStorage.isDev) {
		window.APP = APP;
	}
})();
