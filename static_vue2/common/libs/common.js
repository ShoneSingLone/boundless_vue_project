const isDev = !!localStorage.isDev;

(function () {
	if (isDev) {
		console.log("common.js");
	}


	/**
	 * requestAnimationFrame Throttle
	 */
	_.$rafThrottle = function (fn) {
		let locked = false;
		return function (...args) {
			if (locked) return;
			locked = true;
			window.requestAnimationFrame(_ => {
				fn.apply(this, args);
				locked = false;
			});
		};
	};



	/**
	 * 复制到剪贴板
	 * @param textToCopy
	 */
	/* @typescriptDeclare (textToCopy:string)=>Promise<void> */
	_.$copyToClipboard = function (textToCopy) {
		// navigator clipboard 需要https等安全上下文
		if (navigator.clipboard && window.isSecureContext) {
			// navigator clipboard 向剪贴板写文本
			return navigator.clipboard.writeText(textToCopy);
		} else {
			// 创建text area
			let textArea = document.createElement("textarea");
			textArea.value = textToCopy;
			// 使text area不在viewport，同时设置不可见
			textArea.style.position = "absolute";
			textArea.style.opacity = 0;
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			return new Promise((res, rej) => {
				// 执行复制命令并移除文本框
				document.execCommand('copy') ? res() : rej();
				textArea.remove();
			});
		}
	};

	/**
	 * 名字随机
	 * @param e
	 */
	/* @typescriptDeclare (e:number)=>string */
	_.$ramdomStr = function (e) {
		e = e || 26;
		var t = "abcdefhijkmnprstwxyz0123456789";
		var a = t.length;
		var n = "";
		for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
		return n;
	};
	/**
	 * 打开选择器
	 * @returns
	 */
	/* @typescriptDeclare ()=>Promise<void> */
	_.$openFileSelector = function () {
		let lock = false;
		return new Promise((resolve, reject) => {
			// create input file
			const el = document.createElement("input");
			el.style.display = "none";
			el.setAttribute("type", "file");
			document.body.appendChild(el);

			el.addEventListener(
				"change",
				() => {
					lock = true;
					resolve(el.files);
					// remove dom
					document.body.removeChild(el);
				},
				{ once: true }
			);

			// file blur
			window.addEventListener(
				"focus",
				() => {
					setTimeout(() => {
						if (!lock && el) {
							reject(new Error("onblur"));
							// remove dom
							document.body.removeChild(el);
						}
					}, 300);
				},
				{ once: true }
			);

			// open file select box
			el.click();
		});
	};

	/**
	 * 读取文件为文本
	 * @param {*} file
	 */
	/* @typescriptDeclare (obj:object)=>Promise<string> */
	_.$readFileAsText = async function (file) {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function () {
				resolve(reader.result);
			};
			reader.onerror = reject;
		});
	};

	/**
	 * 下载文本为文件
	 * @param {*} dataString
	 * @param {*} filename
	 */
	/* @typescriptDeclare (obj:object, filename:string)=>Promise<void> */
	_.$downloadTextAsBlob = function (dataString, filename) {
		return new Promise(resolve => {
			var eleLink = document.createElement("a");
			eleLink.download = filename;
			eleLink.style.display = "none";
			var blob = new Blob([dataString], { type: "text/plain;charset=utf-8" });
			eleLink.href = URL.createObjectURL(blob);
			document.body.appendChild(eleLink);
			eleLink.click();
			document.body.removeChild(eleLink);

			resolve();
		});
	};

	/**
	 * 获取对象的值
	 */
	/*@typescriptDeclare (obj:object,key:string)=>string */
	_.$handleSetFormValue = (obj, key) => {
		return obj[`${key}`] || "";
	};
	/**
	 * //将空字符串转换为null
	 * @param str
	 * @return {null|*}
	 */
	/* @typescriptDeclare (str:string)=>null|string */
	_.$translateStrByNull = str => {
		if (str === "") {
			return null;
		}
		return str;
	};
	/**
	 *
	 * @param {*} timestamp 多少时间以前
	 * @returns
	 */
	/* @typescriptDeclare (timestamp:string)=>string */
	_.$timeAgo = function (timestamp) {
		let minutes, hours, days, mouth;
		let year;
		const timeNow = parseInt(String(new Date().getTime() / 1000));
		let seconds = timeNow - timestamp;
		if (seconds > 86400 * 30 * 12) {
			year = parseInt(String(seconds / (86400 * 30 * 12)));
		} else {
			year = 0;
		}
		if (seconds > 86400 * 30) {
			mouth = parseInt(String(seconds / (86400 * 30)));
		} else {
			mouth = 0;
		}
		if (seconds > 86400) {
			days = parseInt(String(seconds / 86400));
		} else {
			days = 0;
		}
		if (seconds > 3600) {
			hours = parseInt(String(seconds / 3600));
		} else {
			hours = 0;
		}
		minutes = parseInt(String(seconds / 60));
		if (year > 0) {
			return year + "年前";
		} else if (mouth > 0 && year <= 0) {
			return mouth + "月前";
		} else if (days > 0 && mouth <= 0) {
			return days + "天前";
		} else if (days <= 0 && hours > 0) {
			return hours + "小时前";
		} else if (hours <= 0 && minutes > 0) {
			return minutes + "分钟前";
		} else if (minutes <= 0 && seconds > 0) {
			if (seconds < 30) {
				return "刚刚";
			} else {
				return seconds + "秒前";
			}
		} else {
			return "刚刚";
		}
	};

	/**
	 * 浅-判断对象值是否相同
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */
	/* @typescriptDeclare (a:object,b:object)=>boolean */
	_.$eqObj = (a, b) => {
		if (Object.keys(a).length !== Object.keys(b).length) {
			return false;
		}
		for (let key in a) {
			if (_.isFunction(a[key])) {
				var _a = a[key].toString();
				var _b = b[key].toString();
				if (_a !== _b) {
					return false;
				}
			} else if (!_.eq(a[key], b[key])) {
				return false;
			}
		}
		return true;
	};

	/** 全局工具函数，共享lodash的全局变量_
	 *  $前缀的是自定义函数
	 */

	(function () {
		/*  */
		window.defTable = options => {
			if (!Vue.hasOwn(options, "isHideFilter")) {
				options.isHideFilter = false;
			}
			if (!Vue.hasOwn(options, "isHideQuery")) {
				options.isHideQuery = false;
			}
			if (!Vue.hasOwn(options, "pagination")) {
				options.pagination = {
					page: 1,
					total: 0,
					size: 10
				};
			}
			if (!Vue.hasOwn(options, "disabled")) {
				options.disabled = false;
			}
			return options;
		};

		function SetAddAll(targetSet, sourceSet) {
			for (const item of sourceSet) {
				targetSet.add(item);
			}
		}

		/* ((((((((((((((((((((((coltypes))))))))))))))))))))))  */
		window.defTable.colMultiple = ({ by, getConfigs, disabled }) => {
			const { h } = Vue;
			const checkbox = {
				prop: "COL_MULTIPLE",
				label: i18n("checkbox"),
				width: 48,
				fixed: "left",
				headerCellRenderer(_props) {
					const tableConfigs = getConfigs();
					const isChecked = tableConfigs.data.list.length > 0 && tableConfigs.data.set.size === tableConfigs.data.list.length;
					const isIndeterminate = tableConfigs.data.set.size > 0 && tableConfigs.data.set.size < tableConfigs.data.list.length;
					const checkBoxProps = {
						indeterminate: isIndeterminate,
						value: isChecked,
						onChange() {
							const old = Array.from(tableConfigs.data.set);
							if (tableConfigs.data.set.size < tableConfigs.data.list.length) {
								_.each(tableConfigs.data.list, i => tableConfigs.data.set.add(i[by]));
								tableConfigs.data.set = new Set(Array.from(tableConfigs.data.set));
							} else {
								_.each(tableConfigs.data.list, i => tableConfigs.data.set.delete(i[by]));
								tableConfigs.data.set = new Set(Array.from(tableConfigs.data.set));
							}

							if (tableConfigs.onSelectedChange) {
								tableConfigs.onSelectedChange(Array.from(tableConfigs.data.set), old);
							}
						}
					};
					const checkBoxVnode = h("elCheckbox", checkBoxProps);
					return h(
						"div",
						{
							class: "flex center width100"
						},
						[checkBoxVnode]
					);
				},
				cellRenderer: params => {
					const { rowData } = params;
					const tableConfigs = getConfigs();
					const isChecked = tableConfigs.data.set.has(rowData[by]);
					let disabledTips = "";
					let isDisabled = (() => {
						if (_.isFunction(disabled)) {
							return disabled(params);
						}
						return false;
					})();

					if (_.isString(isDisabled)) {
						disabledTips = isDisabled;
						isDisabled = !!isDisabled;
					}
					return h(
						"div",
						{
							class: "flex center width100"
						},
						[
							h("elCheckbox", {
								value: isChecked,
								disabled: isDisabled,
								attrs: {
									title: disabledTips
								},
								onChange(value) {
									const old = Array.from(tableConfigs.data.set);

									if (value) {
										tableConfigs.data.set.add(rowData[by]);
									} else {
										tableConfigs.data.set.delete(rowData[by]);
									}
									/* vue2 未对set map 做响应式支持？？？ */
									tableConfigs.data.set = _.clone(tableConfigs.data.set);
									if (tableConfigs.onSelectedChange) {
										tableConfigs.onSelectedChange(Array.from(tableConfigs.data.set), old);
									}
								}
							})
						]
					);
				}
			};
			return checkbox;
		};
		window.defTable.colSingle = ({ by, getConfigs, disabled }) => {
			const { h } = Vue;
			const checkbox = {
				prop: "COL_SINGLE",
				label: i18n("checkbox"),
				width: 48,
				fixed: "left",
				headerCellRenderer(_props) {
					return null;
				},
				cellRenderer: params => {
					const { rowData } = params;
					const tableConfigs = getConfigs();
					const isChecked = tableConfigs.data.set.has(rowData[by]);
					let disabledTips = "";
					let isDisabled = (() => {
						if (_.isFunction(disabled)) {
							return disabled(params);
						}
						return false;
					})();

					if (_.isString(isDisabled)) {
						disabledTips = isDisabled;
						isDisabled = !!isDisabled;
					}

					return h(
						"div",
						{
							class: "flex center width100"
						},
						[
							h("elCheckbox", {
								value: isChecked,
								disabled: isDisabled,
								attrs: {
									title: disabledTips
								},
								onChange(value) {
									const old = Array.from(tableConfigs.data.set);

									const id = rowData[by];
									if (value) {
										tableConfigs.data.set = new Set([id]);
									} else {
										tableConfigs.data.set = new Set();
									}
									if (tableConfigs.onSelectedChange) {
										tableConfigs.onSelectedChange(Array.from(tableConfigs.data.set), old);
									}
								}
							})
						]
					);
				}
			};
			return checkbox;
		};
		window.defTable.colActions = ({ cellRenderer, width, fixed = "right" }) => {
			const columnDefaultConfigs = {
				prop: "COL_ACTIONS",
				label: i18n("checkbox"),
				fixed,
				width,
				headerCellRenderer(_props) {
					return i18n("操作");
				}
			};

			if (cellRenderer) {
				columnDefaultConfigs.cellRenderer = cellRenderer;
			}
			return columnDefaultConfigs;
		};
	})();

	window.defItems = options => {
		return _.reduce(
			options,
			(target, configs, prop) => {
				if (!Vue.hasOwn(configs, "disabled")) {
					configs.disabled = false;
				}
				target[prop] = configs;
				return target;
			},
			{}
		);
	};

	window.defItem = (...args) => {
		let options = _.merge.apply(_, args);
		if (!Vue.hasOwn(options, "disabled")) {
			options.disabled = false;
		}
		return Vue.reactive(options);
	};

	/**
	 * 从jQuery对象中，获取leftTop的数值
	 * @param {*} $ele
	 * @returns
	 */
	/* @typescriptDeclare ($ele:jQuery)=>object */
	_.$getLeftTopFromAbsolute = $ele => {
		const _top = $ele.css("top");
		const _left = $ele.css("left");
		const getNum = x => {
			const match = String(x).match(/^(.*)px$/);
			if (match && match[1]) {
				return Number(match[1]);
			} else {
				return 0;
			}
		};
		const top = getNum(_top);
		const left = getNum(_left);
		return { top, left };
	};
	_.$getLeftTopFromTranslate = $ele => {
		const transform = $ele.css("transform");
		const match = String(transform).match(/^matrix\((.*)\)$/);
		if (!match) {
			return { top: 0, left: 0 };
		}
		if (match && match[1]) {
			const [a, b, c, d, e, f] = String(match[1])
				.split(",")
				.map(i => Number(_.trim(i)));

			return {
				left: a + c + e,
				top: b + d + f
			};
		}
	};

	/***
	 * pathname search
	 * @param urlLike
	 * @param query
	 */
	function transToUrl(urlLike, query) {
		const _url = new URL(String(urlLike).replace("#", ""), location.origin);
		_url.search = new URLSearchParams(query).toString();
		const { pathname, search } = _url;
		return {
			href: `${pathname}${search}`,
			url: _url
		};
	}

	/**
	 * 将一个url转换为VueRouter使用的a标签href
	 * @param {*} urlLike
	 * @param {*} query
	 * @returns
	 */
	/* @typescriptDeclare (urlLike:string, query:object) => string */
	_.$aHashLink = (urlLike, query) => {
		const { url } = transToUrl(urlLike, query);
		const targetUrl = new URL(location.href, location.origin);
		targetUrl.hash = url.href.replace(url.origin, "");
		return targetUrl.href;
	};

	/**
	 * 设置主题
	 * @param {*} theme
	 */
	/* @typescriptDeclare (theme:string)=>void */
	_.$setAppTheme = function (theme) {
		$("html").attr("data-theme", theme || "");
		Vue.prototype.$X_APP_THEME = theme;
		Vue.forceUpdate();
		$(window).trigger("xUiThemeChange", theme);
	};

	/**
	 * 判断两个值是否相等,转换为字符串比较
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */
	/* @typescriptDeclare  (a:any,b:any)=>boolean */
	_.$isSame = (a, b) => {
		return String(a) === String(b);
	};

	_.$isIE = function () {
		return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
	};

	_.$isEdge = function () {
		return !Vue.prototype.$isServer && navigator.userAgent.indexOf("Edge") > -1;
	};

	_.$isFirefox = function () {
		return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
	};

	_.$valueEquals = (a, b) => {
		// see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
		if (a === b) return true;
		if (!(a instanceof Array)) return false;
		if (!(b instanceof Array)) return false;
		if (a.length !== b.length) return false;
		for (let i = 0; i !== a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	};

	_.$scrollIntoView = function (container, selected) {
		/* scrollIntoView api */
		if (!selected) {
			container.scrollTop = 0;
			return;
		}
		const offsetParents = [];
		let pointer = selected.offsetParent;
		while (pointer && container !== pointer && container.contains(pointer)) {
			offsetParents.push(pointer);
			pointer = pointer.offsetParent;
		}
		const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
		const bottom = top + selected.offsetHeight;
		const viewRectTop = container.scrollTop;
		const viewRectBottom = viewRectTop + container.clientHeight;

		if (top < viewRectTop) {
			container.scrollTop = top;
		} else if (bottom > viewRectBottom) {
			container.scrollTop = bottom - container.clientHeight;
		}
	};

	/**
	 * 首字母大写
	 * @param {*} str
	 * @returns
	 */
	/* @typescriptDeclare (str:string)=>string */
	_.$firstUpperCase = function (str) {
		return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
	};

	/**
	 * 判断是否是Mac
	 * @returns
	 */
	/* @typescriptDeclare ()=>boolean */
	_.$isMac = function () {
		return /macintosh|mac os x/i.test(navigator.userAgent);
	};

	/**
	 * 数字 非 NaN
	 * @param {*} value
	 * @returns
	 */
	/* @typescriptDeclare (value:any)=>boolean */
	_.$isNumber = value => {
		return _.isNumber(value) && !_.isNaN(value);
	};

	_.$isKorean = function (text) {
		const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
		return reg.test(text);
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

	/**
	 * 该函数_$trylog接受一个异步函数asyncFn作为参数，通过try-catch语句执行asyncFn并返回结果。如果发生错误，将错误信息和asyncFn的调用信息打印到控制台
	 * @param {*} asyncFn
	 * @returns
	 */
	/* @typescriptDeclare (asyncFn:()=>Promise<any>)=>Promise<any> */
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

	/*  */
	(function () {
		/**
		 * 生成一串随机数，category作为前缀
		 * @param {*} category
		 * @returns
		 */
		/* @typescriptDeclare (category?:string)=>string  */
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
	 * 日期格式化
	 * @param {*} date {date|number}日期或者时间戳
	 * @param {number} type {number} 0:默认YYYY-MM-DD HH:mm:ss 1:YYYY-MM-DD
	 * @returns
	 */
	/* @typescriptDeclare (date:string|number, type?:number)=>string */
	_.$dateFormat = (date = null, type = 0) => {
		let format = "YYYY-MM-DD HH:mm:ss";
		if (!date) {
			return "";
		}
		/* 如果是时间戳 */
		if (typeof date === "number") {
			if (String(date).length === 10) {
				/* Unix 时间戳 (毫秒) */
				date = dayjs.unix(date);
			}
			if (String(date).length === 13) {
				/* Unix 时间戳 (秒) */
				date = dayjs(date);
			}
		}
		date = date || Date.now();
		if (type === 1) {
			format = "YYYY-MM-DD";
			return dayjs(date).format("YYYY-MM-DD");
		}

		if (!type) {
			format = "YYYY-MM-DD HH:mm:ss";
		}
		const label = dayjs(date).format(format);
		const isInvalidDate = label == "Invalid Date";
		return isInvalidDate ? "--" : label;
	};

	/**
	 * value to label
	 */
	/* @typescriptDeclare (value:any, options:any, defaultValue?: any)=>string */
	_.$val2L = (value, options, defaultValue = "") => {
		const item = _.find(options, item => String(item.value) === String(value));
		if (item) {
			return item.label;
		} else {
			return defaultValue;
		}
	};

	/**
	 * name作为前缀的符合name要求的字符串
	 * @param {string} name
	 * @returns string
	 */
	/* @typescriptDeclare (name:string)=>string */
	_.$randomName = name => {
		return name + parseInt((new Date().getTime() % 61439) + 4096).toString(16);
	};

	/**
	 * 判断是否为200，转换为字符串来判断
	 * @param {any} val
	 * @returns boolean
	 */
	/* @typescriptDeclare (val:any)=>boolean */
	_.$is200 = function is200(val) {
		return String(val) === "200";
	};
	/**
	 * 默认检测obj上每一个属性都能通过isInput，如果给定keys，	则只检测keys中的属性
	 * @param {object} obj
	 * @param {string[]} keys
	 * @returns
	 */
	/* @typescriptDeclare (obj:object, keys:string[])=>boolean */
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
	 * 是否已输入
	 * false 0 为真 空数组[]为false
	 * @param {any} val
	 * @returns boolean
	 */
	/* @typescriptDeclare (val:any)=>boolean */
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
	 * 什么都不干的函数
	 * @returns
	 */
	/* @typescriptDeclare ()=>void */
	_.$doNoting = () => null;
	/**
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
	 * 数组至少有一个元素
	 * @param {*} val
	 * @returns
	 */
	/* @typescriptDeclare (val:any[])=>boolean */
	_.$isArrayFill = val => _.isArray(val) && val.length > 0;

	/**
	 * 开发模式下才会在console打印日志
	 */
	const genConsole = type => {
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
	/* @typescriptDeclare  (isLoading?:boolean)=>void*/
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

	/**
	 * 确认信息
	 * @param {*} options
	 * @returns
	 */
	/* @typescriptDeclare (options?:any)=>Promise<any> */
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

	/**
	 * notify 弹窗，成功提示，可复写
	 * @param {*} title
	 * @param {*} options
	 * @returns
	 */
	/* @typescriptDeclare (title:string,options?:any)=>Promise<any> */
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
	/**
	 * notify 弹窗，错误提示，可复写
	 * @param {*} title
	 * @param {*} options
	 * @returns
	 */
	/* @typescriptDeclare (title:string,options?:any)=>Promise<any> */
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

		function $privateSetWindowVmDefaultMethods({ WindowVueCtor, indexPanel, options, layero }) {
			WindowVueCtor.propsData = WindowVueCtor.propsData || {};
			/* 点击$closeWindow 和 X 都会触发关闭 */
			WindowVueCtor.propsData.$closeWindow = () => {
				var close = options.cancel && options.cancel(indexPanel, layero);
				close === false || layer.close(indexPanel);
			};
			WindowVueCtor.propsData.$layerMax = () => layer.full(indexPanel);
			WindowVueCtor.propsData.$layerMin = () => layer.min(indexPanel);
			WindowVueCtor.propsData.$layerRestore = () => layer.restore(indexPanel);
			return new Vue(WindowVueCtor);
		}

		_.$privateLayerSuccessThenMountVueComponent = function (WindowVueCtor, indexPanel, vm, layero, options, id, DIALOG_CACHE, layerVM) {
			if (WindowVueCtor.parent) {
				if (!WindowVueCtor.parent._isVue) {
					console.error(new Error("_.$importVue 的 parent 必须是Vue的实例，当前传入的不是"));
					alert(e);
				}
			}

			// WindowVueCtor.el = `#${id}`;
			vm = $privateSetWindowVmDefaultMethods({ WindowVueCtor, indexPanel, options, layero });
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

		/**
		 * @param {*} title：{stirng}dialog标题
		 * @param {*} WindowVueCtor:Vue组件,通常用_.$importVue引入
		 * @param {*} options:{layer的参数，但是一般用不到，有需要可以自己看源码}
		 * @returns Vue组件实例
		 * hooks vm.onWindowClose事件
		 * @example const vm = await _.$openWindow(...)
		 * vm.onWindowClose = callBackFunction
		 */
		/* @typescriptDeclare (title:string, WindowVueCtor:Vue, options?:object)=>void */
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
								resolve(vm);
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
							cancel: options.cancel || _.$doNoting,
							end(indexPanel) {
								const $layerPanel = $(vm.$el).parents(".layui-layer.layui-layer-page.layer-anim-close");
								$layerPanel.remove();
								vm.$resizeObserver.disconnect();
								vm.$resizeObserver = null;
								delete DIALOG_CACHE[indexPanel];
								vm.$destroy();
								$container.remove();
								$container = null;
								if (vm.onWindowClose) {
									const onWindowClose = vm.onWindowClose;
									onWindowClose();
								}
								vm = null;
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

	/**
	 *
	 * @param {*} fnGetValue 执行此函数，直到返回真值
	 * @param {*} duration 默认为0即不断尝试；若给定时间，未在给定时间内完成，则失败
	 * @returns
	 */
	/* @typescriptDeclare (fnGetValue:()=>Promise<any>, duration:number) =>Promise<any> */
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
					resolve(value);
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
	/**
	 * 从location.search  get val
	 * @param {*} key[]
	 * @returns val[]
	 */
	/* @typescriptDeclare (key:string[])=>string[] */
	_.$urlSearch = keys => {
		const search = new URLSearchParams(location.search);
		return _.map(keys, key => search[key]);
	};
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
		 * @param {any} resolvedURL
		 * @param {any} param1
		 * @returns
		 */

		_.$GenComponentOptions = async function ({ resolvedURL, scritpSourceCode, templateSourceCode, payload }) {
			payload = payload || {};
			try {
				scritpSourceCode = scritpSourceCode.replace("export default", "");
				const isShowTemplate = templateSourceCode && isDev;
				const innerCode = [
					`console.info("${resolvedURL}");`,
					isShowTemplate ? `(()=>\`${templateSourceCode}\`)();` : ``,
					`try{const ${_.camelCase(resolvedURL)} = ${scritpSourceCode};return ${_.camelCase(resolvedURL)}.call({THIS_FILE_URL:"${resolvedURL}"},payload);}catch(e){console.error(e)}`
				].join("\n");
				let scfObjAsyncFn;
				let component = {};

				try {
					scfObjAsyncFn = new Function("payload", `with ({..._,...Vue}){${innerCode};}`);
				} catch (e) {
					console.error(innerCode);
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
					_.THIS_FILE_URL.push(resolvedURL);
					component = await scfObjAsyncFn(fnPayload);
				} catch (e) {
					console.error(scfObjAsyncFn.toString());
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
				console.error(scritpSourceCode);
				console.error(error);
			}
		};

		/**
		 * 全局单例：同步
		 * @param {*} prop win doc
		 * @returns
		 */
		_.$single = new Proxy(
			{},
			{
				get(target, prop) {
					if (!target[prop]) {
						if (prop === "doc") {
							target[prop] = $(window.document);
						}
						if (prop === "body") {
							target[prop] = $(window.document.body);
						}
						if (prop === "win") {
							target[prop] = $(window);
						}
						if (prop === "shadowTemplate") {
							const attrs = {
								style: "opacity: 0;position: fixed;z-index: -1;",
								// style: "opacity: 1;position: fixed;z-index: 1;",
								class: "shadow-template-wrapper"
							};
							target[prop] = $("<div/>", attrs).appendTo(_.$single.body);
						}
						if (prop === "mask") {
							const $mask = $("#x-layer-move");
							if ($mask.length) {
								target[prop] = $mask;
							} else {
								target[prop] = $(`<div id="x-layer-move" class="x-layer-move" />`).appendTo(_.$single.body);
							}
						}
					}
					return target[prop];
				}
			}
		);

		_.$sourceCodeSFC = async function ({ resolvedURL, sourceCode }) {
			/* @descript 非开发模式下，如果已经加载，直接返回，否则每次都获取最新的代码 */
			/* @declare { scritpSourceCode, templateSourceCode, styleSourceCode } */
			if (!isDev && VUE_COMPONENTS_CACHE[resolvedURL]) {
				return VUE_COMPONENTS_CACHE[resolvedURL];
			}

			if (!sourceCode) {
				sourceCode = await _.$loadText(resolvedURL);
			}
			/* 缓存 */
			VUE_COMPONENTS_CACHE[resolvedURL] = VueLoader(sourceCode);
			$appendSfcStyle(VUE_COMPONENTS_CACHE[resolvedURL].styleSourceCode, resolvedURL);
			return VUE_COMPONENTS_CACHE[resolvedURL];
		};

		/**
		 * 利用less添加样式,独立处理资源路径
		 * @param {any} styleSourceCode
		 */
		async function $appendSfcStyle(styleSourceCode, url) {
			/* style */
			if (styleSourceCode) {
				const { render } = await _.$appendScript("/common/libs/less.min.js", "less");
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

		/**
		 * @deprecated 用h函数吧
		 * @param {*} tpl
		 * @param {*} scope
		 * @param  {...any} args
		 * @returns
		 */
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
		 * @param {*} url 文件地址：@为当前app目录，/common为通用目录
		 * @param {*} payload {parent是一个保留字，用于Vue实例的继承关系，这样才可以使用provier和inject}
		 * @example
		 * export default async function ({parent,row,index,otherAnyParams}) {
		 * //这里是_.$importVue引入的SFC文件
		 * 	......
		 * }
		 * @returns
		 */
		/* @typescriptDeclare (url:object|string|any[], payload?:object)=>any|any[] */
		_.$importVue = async function (url, payload = {}) {
			if (_.isPlainObject(url)) {
				/* 直接传入对象 */
				return url;
			}
			if (_.isArray(url)) {
				return Promise.all(_.map(url, _url => _.$importVue(_url)));
			}
			const resolvedURL = _.$resolvePath(url);
			return _.$sfcVueObject({ resolvedURL, payload });
		};

		_.$sfcVueObject = async function ({ resolvedURL, payload, sourceCode }) {
			/* hmr使用sourceCode不用发请求获取源码， */
			payload = payload || {};
			/* 切换页面时的动效 */
			if (_.$importVue?.Nprogress) {
				_.$importVue?.Nprogress.start();
			}
			try {
				/* 源文件加载之后会有缓存，但是payload会有变化 */
				/* 所以只用异步组件不加payload，是可以用hmr，window需要自己重新加载 */
				const { scritpSourceCode, templateSourceCode } = await _.$sourceCodeSFC({ resolvedURL, sourceCode });
				/* script and template*/
				const params = {
					resolvedURL,
					scritpSourceCode,
					templateSourceCode,
					payload
				};
				const ComponentOptions = (await _.$GenComponentOptions(params)) || {};

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
			}
		};

		/**
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
	/**
	 * 设置列表信息
	 * @param {*} tableConfigs
	 * @param {*} param1 如果不是特意保留，每次会清空已选
	 */
	/* @typescriptDeclare (configs:object, payload:{list:any[]; total?:number, selected?:string[], set?:Set<string>}) => void */
	_.$setTableData = function (tableConfigs, { list, total = 0, selected = [], set = new Set() }) {
		if (tableConfigs.data) {
			tableConfigs.data.selected = selected;
			tableConfigs.data.set = set;
			if (list !== undefined && _.isArray(list)) {
				tableConfigs.data.list = list;
			}
		} else {
			throw new Error("table cofigs 必须要有data属性且为对象");
		}

		/* pagination 非 required */
		if (tableConfigs.pagination) {
			tableConfigs.pagination.total = total;
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
	 * @returns 如果都通过，则返回空数组，否则返回
	 * [
	 *  [msg,vm],
	 *  [msg,vm],
	 *  ...
	 * ]的数组元素
	 *  @example
	 * const [error] = await _.$validateForm(this.$el);//这个范围就是整个组件
	 * if (error) {
	 *  return;
	 * }
	 *
	 */
	/* @typescriptDeclare (selector:string)=>Promise<[msg,vm][]> */
	_.$validateForm = async selector => {
		const $target = getTargetBy(selector);
		const errorArray = [];
		for (const dom of $target) {
			const { formItemId } = dom.dataset;
			if (formItemId) {
				const vm = Vue._X_ITEM_VM_S[formItemId];
				let msg;
				if (vm?.validate) {
					msg = await vm.validate();
				} else {
					console.log("miss vm in _X_ITEM_VM_S");
				}
				if (msg) {
					errorArray.push([msg, vm]);
				}
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
	/* @typescriptDeclare (selector:string, attrs:object)=>void */
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
			const { formItemId } = targetDom.dataset || {};
			vm = Vue._X_ITEM_VM_S?.[formItemId || "________No"] || {};
		} catch (error) {
		} finally {
			return vm;
		}
	};
	/**
	 * 从Table 中获取xItem的vm
	 * @param {*} rowIndex
	 * @param {*} colProp
	 * @param {*} selector
	 * @returns
	 */
	/* @typescriptDeclare (rowIndex:number,colProp:string,selector:string)=>object */
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
	 * 数据回填，
	 * @param {*} form {object} xItem formconfigs
	 * @param {*} data {object} 回填数据
	 * @param {*} order {array} 有依赖关系（联动）回填顺序
	 */
	/* @typescriptDeclare ({form,data,order})=>Promise<void> */
	_.$fillBackData = async function ({ form, data, order }) {
		let target;
		while ((target = order.shift())) {
			/* 如果current是prop字符串,等待100毫秒 */
			if (_.isString(target)) {
				const prop = target;
				form[prop].value = data[prop];
				await _.$sleep(32);
			}

			if (_.isPlainObject(target)) {
				const { prop, until } = target;
				await until();
				form[prop].value = data[prop];
			}
		}
	};

	/**
	 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
	 * @param {any} form xItem 配置信息，config带有value属性
	 * @param {any} values
	 */
	/* @typescriptDeclare (form:object,values:object)=>void */
	_.$setValToForm = function setValToForm(form, values) {
		_.each(values, (value, prop) => {
			if (value !== undefined && _.isPlainObject(form[prop])) {
				form[prop].value = value;
			}
		});
	};

	/**
	 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
	 * @param {any} configs
	 * @returns
	 */
	/* @typescriptDeclare (configs:object)=>object */
	_.$pickValueFromConfigs = function (configs) {
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

	/**
	 * 从数组中取第一个元素的value，如果数组为空则返回defaultValue
	 * @param {*} options
	 * @param {*} defaultValue
	 * @returns
	 */
	_.$valFirstOrDefault = (options, defaultValue) => {
		if (defaultValue === undefined) {
			alert("_.$valFirstOrDefault miss defaultValue");
		}
		if (_.$isArrayFill(options)) {
			return options[0].value;
		}
		return defaultValue;
	};

	/*  */
	_.$firstIpFrom = ip => {
		const arr = ip.split(".");
		arr[3] = 0;
		return arr.join(".");
	};

	_.$getIpInRangeAndUseable = function (ipOld, cidr, used) {
		const range = _.$calculateCidrRange(cidr);
		const isIpOldInRange = _.$isIp4InCidr(ipOld)(cidr);
		if (isIpOldInRange) {
			return {
				newValue: ipOld,
				range
			};
		} else {
			let newValue = (function () {
				const [start, end] = range;
				const startInt = _.$ip4ToInt(start);
				const endInt = _.$ip4ToInt(end);

				for (let ipInt = startInt + 1; ipInt <= endInt; ipInt++) {
					const value = _.$intToIp4(ipInt);
					if (!used.includes(value)) {
						return value;
					}
				}
				return ``;
			})();

			return {
				newValue,
				range
			};
		}
	};

	_.$intToIp4 = int => [(int >>> 24) & 0xff, (int >>> 16) & 0xff, (int >>> 8) & 0xff, int & 0xff].join(".");
	_.$ip4ToInt = ip => ip.split(".").reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
	_.$isIp4InCidr = ip => cidr => {
		const [range, bits = 32] = cidr.split("/");
		const mask = ~(2 ** (32 - bits) - 1);
		const inRange = (_.$ip4ToInt(ip) & mask) === (_.$ip4ToInt(range) & mask);
		if (inRange) {
			const [start, end] = _.$calculateCidrRange(cidr);
			return ip !== start && ip !== end;
		}
		return false;
	};
	_.$intToBin = int =>
		(int >>> 0)
			.toString(2)
			.padStart(32, 0)
			.match(/.{1,8}/g)
			.join(".");

	_.$calculateCidrRange = cidr => {
		const [range, bits = 32] = cidr.split("/");
		const mask = ~(2 ** (32 - bits) - 1);
		return [_.$intToIp4(_.$ip4ToInt(range) & mask), _.$intToIp4(_.$ip4ToInt(range) | ~mask)];
	};
})();

(async function () {
	await (async function setI18n() {
		/**
		 * 国际化
		 * @param {*} key
		 * @param {*} payload
		 * @returns
		 */
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

		Vue.prototype.i18n = i18n;
	})();
	/* setup */
	await (async function setVueConfigs() {
		await _.$ensure(() => window.SRC_ROOT_PATH !== undefined);
		_.$importVue.Nprogress = await _.$importVue("/common/libs/Nprogress.vue");
	})();
	// document.title = window.i18n("adminConsole");
	const APP = await _.$importVue(`${SRC_ROOT_PATH}/business_${APP_NAME}/${APP_ENTRY_NAME}.vue`);
	if (isDev) {
		window.HMR_APP = APP;
	}
})();
