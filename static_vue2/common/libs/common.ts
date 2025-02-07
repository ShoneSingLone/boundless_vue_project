(function () {
	const IS_DEV = !!localStorage.isDev;

	if (IS_DEV) {
		console.log("common.js");
	}

	const PRIVATE_GLOBAL = new Proxy(
		{},
		{
			set(privateGlobal, prop, val) {
				if (privateGlobal[prop]) {
					alert(`PRIVATE_GLOBAL ${prop} 重复`);
				} else {
					privateGlobal[prop] = val;
					return true;
				}
			}
		}
	);

	/* @typescriptDeclare (paramName: any): string */
	_.$getRawQueryParamFromSearch = function getRawQueryParamFromSearch(paramName) {
		// 获取查询字符串部分
		let search = location.search;
		if (search.startsWith("?")) {
			search = search.slice(1);
		}
		// 分割成多个参数对
		let pairs = search.split("&");
		for (let pair of pairs) {
			let [key, value] = pair.split("=");
			if (key === paramName) {
				// 直接返回原始值，不进行解码
				return value;
			}
		}
		return null;
	};

	/**
	 * 构造树型结构数据
	 * @param {*} data 数据源
	 * @param {*} idProp id字段 默认 'id'
	 * @param {*} pidProp 父节点字段 默认 'parentId'
	 * @param {*} childrenProp 孩子节点字段 默认 'children'
	 */
	/* @typescriptDeclare (params: { data: any[]; id?: string; pid?: string; children?: string; label?: string; value?: string; rootId?: any }) => { TREE: any[]; CHILDREN_MAP: any; NODES_OBJ: any } */
	_.$arrayToTree = function ({ data, id, pid, children, label, value, rootId }) {
		data = _.cloneDeep(data);

		let ID = id || "id";
		let PID = pid || "parentId";
		let CHILDREN = children || "children";
		let LABEL = label || "label";
		let VALUE = value || "value";
		let ROOT_ID = _.$isInput(rootId) ? rootId : null;

		const CHILDREN_MAP = {};
		const NODES_OBJ = {};
		const TREE = [];
		/* 收集数据，平铺 */
		_.each(data, node => {
			node.label = node[LABEL];
			node.value = node[VALUE];
			let pid = node[PID];

			CHILDREN_MAP[pid] = CHILDREN_MAP[pid] || [];

			NODES_OBJ[node[ID]] = node;
			CHILDREN_MAP[pid].push(node);
		});
		/* 筛选出根节点 */
		_.each(data, node => {
			let pid = node[PID];
			if (pid == ROOT_ID) {
				TREE.push(node);
			}
		});
		/* 适配子节点 */
		_.each(TREE, function adaptToChildren(targetTree) {
			if (CHILDREN_MAP[targetTree[ID]] !== null) {
				targetTree[CHILDREN] = CHILDREN_MAP[targetTree[ID]];
			}
			if (targetTree[CHILDREN]) {
				_.each(targetTree[CHILDREN], adaptToChildren);
			}
		});
		return { TREE, CHILDREN_MAP, NODES_OBJ };
	};

	_.$updateCol = function (tableConfigs, prop, value) {
		const index = _.findIndex(tableConfigs.columns, { prop });
		let item = tableConfigs.columns[index];
		item = _.merge(item, value);
		tableConfigs.columns.splice(index, 1, item);
	};

	/* @ts-ignore @declared*/
	_.$pickFromArray = function (columns, propsArray, prop = "prop") {
		/* @ts-ignore */
		if (!_.$isArrayFill(propsArray) || !_.$isArrayFill(columns)) {
			alert("pickFromArray miss props array");
		}
		return _.reduce(
			columns,
			(target, v) => {
				/* @ts-ignore */
				if (propsArray.includes(v[prop])) {
					/* @ts-ignore */
					target[v[prop]] = v;
				}
				return target;
			},
			{}
		);
	};

	_.$percent = function (num, total) {
		if (_.isNumber(num) && _.isNumber(total)) {
			if (total > 0) {
				return Math.round((num / total) * 100);
			}
		} else {
			return 0;
		}
	};
	// coerce truthy value to array
	_.$coerceTruthyValueToArray = function (val) {
		if (Array.isArray(val)) {
			return val;
		} else if (val) {
			return [val];
		} else {
			return [];
		}
	};

	_.$flatNodes = (data, leafOnly) => {
		return data.reduce((res, node) => {
			if (node.isLeaf) {
				res.push(node);
			} else {
				!leafOnly && res.push(node);
				res = res.concat(_.$flatNodes(node.children, leafOnly));
			}
			return res;
		}, []);
	};

	_.$isDef = val => val !== undefined && val !== null;

	/**
	 * 倒序遍历树结构，可以用pop移除节点
	 * @param tree traverse
	 * @param handler(currentNode,nodeParenteList) 返回false则break
	 * @param options
	 */
	/* @typescriptDeclare (tree:any[],handler:any,options?:{children:string})=>void */
	_.$traverse = function (tree, handler, options, propString = "") {
		const childrenName = options?.children || "children";
		if (!_.isEmpty(tree)) {
			let len = tree.length - 1;
			let i = len;

			while (i > -1) {
				const node = tree[i];
				const isBreak = handler(node, tree, `${propString}.${i}`) === false;

				if (isBreak) {
					break;
				} else {
					const index = _.findIndex(tree, node);
					if (~index) {
						if (!_.isEmpty(node[childrenName])) {
							node[childrenName] = _.$traverse(
								node[childrenName],
								handler,
								options,
								`${propString}.${i}.${childrenName}`
							);
						}
					}
				}
				i--;
			}
		} else {
			_.$traverse([tree], handler, options);
		}
		return tree;
	};

	_.$setDocTitle = title => title && (document.title = title);

	/**
	 * 获取文件MD5，注意这里谷歌浏览器有最大文件限制当文件大于2G时浏览器无法读取文件
	 * @param {*} file
	 * @returns
	 */
	/* @typescriptDeclare (file:File)=>Promise<string> */
	_.$md5 = async function (file) {
		return new Promise(async (resolve, reject) => {
			const SparkMD5 = await _.$appendScript("/common/libs/spark-md5.js", "SparkMD5");
			const fileReader = new FileReader();
			fileReader.onload = e => {
				const fileMd5 = SparkMD5.ArrayBuffer.hash(e.target.result);
				resolve(fileMd5);
			};
			fileReader.onerror = reject;
			fileReader.readAsArrayBuffer(file);
		});
	};

	/**
	 * 该函数用于将字节大小转换为可读性更好的格式，如KB、MB、GB等
	 * @param {*} bytes
	 * @returns
	 */
	/* @typescriptDeclare (bytes:number)=>string */
	_.$bytesToSize = function (bytes) {
		if (!bytes) return "0 KB";
		var k = 1024;
		var sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		const unit = sizes[i - 1] || "Byte";
		return (bytes / Math.pow(k, i)).toPrecision(3) + " " + unit;
	};

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
				document.execCommand("copy") ? res() : rej();
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
	 * 打开文件选择器
	 * @returns
	 */
	/* @typescriptDeclare (options:{accept?:string,multiple?:boolean})=>Promise<File[]> */
	_.$openFileSelector = function (options = {}) {
		/* 可选文件的过滤 */
		let { accept, multiple } = options;
		accept = accept || "*";
		multiple = multiple || false;

		let lock = false;
		return new Promise(resolve => {
			try {
				// create input file
				let el = document.createElement("input");
				el.style.display = "none";
				el.setAttribute("type", "file");
				el.setAttribute("accept", accept);
				if (multiple) {
					el.setAttribute("multiple", multiple);
				}
				document.body.appendChild(el);

				let $el = $(el);

				$el.one("change.openFileSelector", function handleOk() {
					lock = true;
					resolve(el.files);
					$el.remove();
					$el = null;
					el = null;
				});

				const handleCancel = _.debounce(() => {
					if (!lock && el) {
						resolve([]);
						$el.remove();
						$el = null;
						el = null;
					}
				}, 1000 * 1);
				_.$single.win.one("focus.openFileSelector", handleCancel);

				el.click();
			} catch (error) {
				resolve([]);
				console.error(error);
			}
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

	(function handle_download_upload() {
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
	})();

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
	 * 判断对象值是否相同,将Function转为字符串比较
	 * 执行深比较来确定两个值是否相等。对于对象和数组，它会递归地比较它们的属性和元素，而不仅仅是检查引用是否相同。
	 * @param {*} a
	 * @param {*} b
	 * @returns
	 */
	/* @typescriptDeclare (a:object,b:object)=>boolean */
	_.$isEqualByObjVal = (a, b) => {
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
			} else if (!_.isEqual(a[key], b[key])) {
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

			if (_.isArray(options.columns)) {
				options.columns.push({
					/* TODO: 最后一列的数据被吞了？*/
				});
			}
			return options;
		};

		/* ((((((((((((((((((((((coltypes))))))))))))))))))))))  */
		window.defTable.colExpandArrow = (options = {}) => {
			const { h } = Vue;
			const normal = () => h("div");
			let width = options.width || 24;
			let fixed = options.fixed || "";
			let headerCellRenderer = options.headerCellRenderer || normal;
			let cellRenderer = options.cellRenderer || normal;

			return {
				prop: "COL_EXPAND_ARROW",
				label: i18n("COL_EXPAND_ARROW"),
				width,
				fixed,
				headerCellRenderer,
				cellRenderer
			};
		};
		window.defTable.colMultiple = ({ by, getConfigs, disabled, isHide }) => {
			const { h } = Vue;
			const checkbox = {
				prop: "COL_MULTIPLE",
				label: i18n("checkbox"),
				width: 48,
				fixed: "left",
				headerCellRenderer(_props) {
					const tableConfigs = getConfigs();
					const isChecked =
						tableConfigs.data.list.length > 0 &&
						tableConfigs.data.set.size === tableConfigs.data.list.length;
					const isIndeterminate =
						tableConfigs.data.set.size > 0 &&
						tableConfigs.data.set.size < tableConfigs.data.list.length;
					const checkBoxProps = {
						indeterminate: isIndeterminate,
						value: isChecked,
						onChange() {
							const old = Array.from(tableConfigs.data.set);
							if (tableConfigs.data.set.size < tableConfigs.data.list.length) {
								_.each(tableConfigs.data.list, i =>
									tableConfigs.data.set.add(_.$val(i, by))
								);
								tableConfigs.data.set = new Set(Array.from(tableConfigs.data.set));
							} else {
								_.each(tableConfigs.data.list, i =>
									tableConfigs.data.set.delete(_.$val(i, by))
								);
								tableConfigs.data.set = new Set(Array.from(tableConfigs.data.set));
							}

							if (_.isFunction(tableConfigs.onSelectedChange)) {
								tableConfigs.onSelectedChange(
									Array.from(tableConfigs.data.set),
									old
								);
							}
						}
					};
					const checkBoxVnode = h("xCheckbox", checkBoxProps);
					return h(
						"div",
						{
							class: "flex center width100"
						},
						[checkBoxVnode]
					);
				},
				cellRenderer: params => {
					let cptIsHide = (() => {
						if (_.isFunction(isHide)) {
							return isHide(params);
						}
						return false;
					})();

					if (cptIsHide) {
						return null;
					}

					const { rowData } = params;
					const tableConfigs = getConfigs();
					const isChecked = tableConfigs.data.set.has(_.$val(rowData, by));
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
							h("xCheckbox", {
								value: isChecked,
								disabled: isDisabled,
								attrs: {
									title: disabledTips
								},
								onChange(value) {
									const old = Array.from(tableConfigs.data.set);

									if (value) {
										tableConfigs.data.set.add(_.$val(rowData, by));
									} else {
										tableConfigs.data.set.delete(_.$val(rowData, by));
									}
									/* vue2 未对set map 做响应式支持？？？ */
									tableConfigs.data.set = _.clone(tableConfigs.data.set);
									if (tableConfigs.onSelectedChange) {
										tableConfigs.onSelectedChange(
											Array.from(tableConfigs.data.set),
											old
										);
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
					const isChecked = tableConfigs.data.set.has(_.$val(rowData, by));
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
							h("xCheckbox", {
								value: isChecked,
								disabled: isDisabled,
								attrs: {
									title: disabledTips
								},
								onChange(value) {
									const old = Array.from(tableConfigs.data.set);

									const id = _.$val(rowData, by);
									if (value) {
										tableConfigs.data.set = new Set([id]);
									} else {
										tableConfigs.data.set = new Set();
									}
									if (tableConfigs.onSelectedChange) {
										tableConfigs.onSelectedChange(
											Array.from(tableConfigs.data.set),
											old
										);
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
				label: i18n("操作"),
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

	((/* checkvalue return true or false */) => {
		_.$isHttp = url => {
			return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
		};

		/**
		 * 数组至少有一个元素
		 * @param {*} val
		 * @returns
		 */
		/* @typescriptDeclare (val:any[])=>boolean */
		_.$isArrayFill = val => _.isArray(val) && val.length > 0;

		/**
		 *
		 * @param {*} path
		 * @returns
		 */
		_.$isExternal = function (path) {
			return /^(https?:|mailto:|tel:)/.test(path);
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
	})();

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

	(() => {
		/**
		 * 将一个url转换为VueRouter使用的a标签href
		 * @param {*} urlLike
		 * @param {*} query
		 * @returns
		 */
		/* @typescriptDeclare (urlLike:string, query?:object) => string */
		_.$aHashLink = (urlLike, query = {}) => {
			const { url } = transToUrl(urlLike, query);
			const targetUrl = new URL(location.href, location.origin);
			targetUrl.hash = url.href.replace(url.origin, "");
			return targetUrl.href;
		};
		Vue.prototype.$aHashLink = _.$aHashLink;
	})();

	/**
	 * 设置主题
	 * @param {*} theme
	 */
	/* @typescriptDeclare (theme:string)=>void */
	_.$setAppTheme = function (theme) {
		$("html").attr("data-theme", theme || "");
		$(window).trigger("x_ui_theme_change", theme);
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
		const top =
			selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
		const bottom = top + selected.offsetHeight;
		const viewRectTop = container.scrollTop;
		const viewRectBottom = viewRectTop + container.clientHeight;

		if (top < viewRectTop) {
			container.scrollTo({
				top: top,
				behavior: "smooth"
			});
			// container.scrollTop = top;
		} else if (bottom > viewRectBottom) {
			container.scrollTo({
				top: bottom - container.clientHeight,
				behavior: "smooth"
			});
			// container.scrollTop = bottom - container.clientHeight;
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
			if (_.isPlainObject(value) || _.isArray(value)) {
				_localStorage[prop] = JSON.stringify(value);
			} else {
				_localStorage[prop] = value;
			}
			return true;
		},
		get(_localStorage, prop) {
			const objString = _localStorage[prop];
			const normal = () => {
				if (_.$isInput(objString)) {
					return objString;
				}
				return objString;
			};

			try {
				if (/^[{|\[]/.test(objString)) {
					return JSON.parse(objString);
				}
				return normal();
			} catch (error) {
				return normal();
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
	/* @typescriptDeclare (date?:string|number, type?:number)=>string */
	_.$dateFormat = (date = null, type = 0) => {
		let format = "YYYY-MM-DD HH:mm:ss";
		date = date || Date.now();
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
		if (type === 1) {
			format = "YYYY-MM-DD";
		}
		if (type === 2) {
			format = "YYYYMMDDHHmmss";
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
	_.$randomName = (name, length = 16) => {
		return name + parseInt((new Date().getTime() % 61439) + 4096).toString(length);
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
	 * 如果fn是可执行的函数，则执行：用call方法
	 * @param fn
	 * @param params
	 * @returns
	 */
	/* @typescriptDeclare (fn: any, params: any) => any */
	_.$execfnify = function (fn, params) {
		if (_.isFunction(fn)) {
			return fn.call(null, params);
		}
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
	/* @typescriptDeclare (vm:any, fn:Function, wait:number)=>any */
	_.$asyncDebounce = (vm, func, delay = 1000) => {
		let timer;
		let promise;
		let _resolve, _reject;
		return async function (...args) {
			const runFn = () => {
				return setTimeout(() => {
					func.apply(vm, args).then(_resolve, _reject);
				}, delay);
			};

			if (timer) {
				/* 重新计时 */
				clearTimeout(timer);
				timer = runFn();
			}
			if (promise) {
				return promise;
			} else {
				promise = new Promise((resolve, reject) => {
					_resolve = resolve;
					_reject = reject;

					timer = runFn();
				});
				return promise;
			}
		};
	};
	const windowConsole = window.console;
	/**
	 * 开发模式下才会在console打印日志
	 */
	const genConsole = type => {
		if (IS_DEV || localStorage.mustShowLog) {
			return windowConsole[type].bind(windowConsole);
		}
		return () => null;
	};

	console.table = genConsole("table");
	console.log = genConsole("log");
	console.warn = genConsole("warn");
	console.info = genConsole("info");
	console.time = genConsole("time");
	console.timeEnd = genConsole("timeEnd");

	/**
	 * 全局loading单例
	 * - 注意，一定要保证成对出现，不然一直loading
	 * @param {boolean} isLoading true 为loaidng false关闭
	 * @param {string} selector 目标选择器，不指定就默认为body
	 *
	 * @TODO: 超时关闭并提示
	 */
	/* @typescriptDeclare  (isLoading?:boolean,selector?:string)=>void*/
	_.$loading = function loading(isLoading = false, selector = "body") {
		function closeLoading(selector) {
			_.$loading.count--;
			if (_.$loading.count < 1) {
				/* 延迟取消 */
				var timmer = setTimeout(() => {
					if (_.$loading.count < 1) {
						$(selector).removeClass("x-loading");
					} else {
						clearTimeout(timmer);
					}
				}, 400);
				_.$loading.count = 0;
			}
		}

		_.$loading.count = _.$loading.count || 0;
		if (isLoading) {
			/* 已经有loading */
			if (!_.$loading.count) {
				$(selector).addClass("x-loading");
			}
			_.$loading.count++;
			// loadingTimeout();
		} else {
			closeLoading(selector);
		}
		/* try { throw new Error(); } catch (error) { try { const msg = error.stack .split("\n") .map(row => { const res = /at (.[^\(\[]*) \(/.exec(row); if (res && res[1]) { return res[1]; } }) .filter(row => !!row); console.log(isLoading ? "open x-loading" : "close x-loading", msg.join("\n=>")); } catch (error) {} } */
	};

	/**
	 * 确认信息
	 * @param {*} options {
	 * title:string,
	 * content:vNode or string
	 * }
	 * @returns
	 */
	/* @typescriptDeclare (options?:any)=>Promise<any> */
	_.$confirm = (options = {}) => {
		return new Promise(async (resolve, reject) => {
			if (_.isString(options)) {
				options = {
					content: options
				};
			}
			const isDelete = !!options.isDelete;
			let title = options.title || i18n("info");
			let content = options.content || "";
			if (isDelete) {
				const _title = title || i18n("删除");
				title = function () {
					const { h } = Vue;
					return h("div", { staticClass: "flex middle start warning-color" }, [
						h("i", {
							icon: "delete",
							staticClass: "el-alert__icon el-icon-warning",
							staticStyle: "color:var(--xAlert-error-light-color)"
						}),
						h("span", { staticClass: "ml4" }, [_title])
					]);
				};
			}
			const modalVm = await _.$openModal({
				title,
				url: "/common/ui-x/msg/WindowConfirm.vue",
				style: options.style,
				resolve,
				reject,
				content,
				isDelete
			});

			/* 在弹窗中，可以获取到modalVm，调用forceUpdate，强制刷新弹窗内容 */
			if (_.isFunction(options.setModalVm)) {
				options.setModalVm({ modalVm });
			}

			modalVm.$on("hook:beforeDestroy", () => {
				/* 如果点击关闭按钮，不会主动调用promise的终态 */
				if (modalVm.isClickCloseIcon) {
					reject();
				}
			});
			return modalVm;
		});
	};

	/**
	 * 删除前的弹窗提示
	 * @param {*} options
	 * @returns
	 */
	/* @typescriptDeclare (options?:any)=>Promise<any> */
	_.$confirm_important = (options = {}) => {
		if (_.isString(options)) {
			options = {
				content: options
			};
		}
		options.title = options.title || i18n("提示");
		options.isDelete = true;
		return _.$confirm(options);
	};

	/**
	 * notify 弹窗，成功提示，可复写
	 * @param {*} title
	 * @param {*} options
	 * @returns
	 */
	/* @typescriptDeclare (title:string,options?:any)=>Promise<any> */
	_.$msgSuccess = msg => {
		return _.$notify.success({
			title: i18n("提示"),
			message: msg
		});
	};

	(function () {
		/**
		 * notify 弹窗，错误提示，可复写
		 * @param {*} title
		 * @param {*} options
		 * @returns
		 */
		/* @typescriptDeclare (title:string,options?:any)=>Promise<any> */
		_.$msgError = tipsInfo => {
			if (!tipsInfo) {
				return;
			}
			console.log("🚀 ERROR: ", tipsInfo);
			/*如果返回的是一個對象，且对象status为200，则不提示*/
			if (_.isPlainObject(tipsInfo)) {
				/* @ts-ignore */
				if (tipsInfo.status === 200) {
					return;
				}
				/* @ts-ignore */
				if (_.isString(tipsInfo.error)) {
					/* @ts-ignore */
					tipsInfo = tipsInfo.error;
					/* @ts-ignore */
				} else if (_.isString(tipsInfo.responseJSON?.detailArgs)) {
					/* @ts-ignore */
					tipsInfo = tipsInfo.responseJSON.detailArgs;
					/* @ts-ignore */
				} else if (_.isString(tipsInfo.responseText)) {
					/* @ts-ignore */
					tipsInfo = tipsInfo.responseText;
					/* @ts-ignore */
				} else if (_.isString(tipsInfo.message)) {
					/* @ts-ignore */
					tipsInfo = tipsInfo.message;
				} else if (_.isString(tipsInfo.msg)) {
					/* @ts-ignore */
					tipsInfo = tipsInfo.msg;
				}
			} else {
				try {
					const _msg = JSON.parse(_msg);
					if (_msg?.responseJSON?.detailArgs) {
						tipsInfo = _msg?.responseJSON?.detailArgs;
					} else if (_msg?.responseText) {
						tipsInfo = _msg.responseText;
					} else if (_msg?.message) {
						tipsInfo = _msg.message;
					}
				} catch (error) {}
			}

			return _.$notify.error({
				title: i18n("错误"),
				message: tipsInfo
			});
		};
	})();
	/*  */
	(function () {
		/**
		 * @deprecated 推荐使用_.$openModal
		 * @param {*} title：{stirng}dialog标题
		 * @param {*} WindowVueCtor:Vue组件,通常用_.$importVue引入
		 * @param {*} options:{layer的参数，但是一般用不到，有需要可以自己看源码}
		 * @returns Vue组件实例
		 * hooks vm.onWindowClose事件
		 * @example const vm = await _.$openWindow_deprecated(...)
		 * vm.onWindowClose = callBackFunction
		 */
		/* @typescriptDeclare (title:string, WindowVueCtor:Vue, options?:object)=>void */
		_.$openWindow_deprecated = async (title, WindowVueCtor, options = {}) => {
			return _.$openModal({
				title: title,
				_VueCtor: WindowVueCtor,
				...options
			});
		};
	})();

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
			if (
				_.$val(window, globalName) &&
				$globalVar[globalName] === _.$val(window, globalName)
			) {
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
		const searchParams = new URLSearchParams(location.search);
		const res = _.map(keys, key => searchParams.get(key));
		return res;
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
				const [setupRenderSourceCode, { scope }] = getSource(
					sourceCodeString,
					"setup-render"
				);
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

		_.$GenComponentOptions = async function ({
			resolvedURL,
			scritpSourceCode,
			templateSourceCode,
			payload
		}) {
			try {
				payload = payload || {};
				scritpSourceCode = scritpSourceCode || "";
				scritpSourceCode = scritpSourceCode.replace("export default", "");
				const isShowTemplate = templateSourceCode && IS_DEV;
				const innerCode = [
					`console.info("${resolvedURL}");`,
					isShowTemplate ? `(()=>\`${templateSourceCode}\`)();` : ``,
					`try{const ${_.camelCase(
						resolvedURL
					)} = ${scritpSourceCode};return ${_.camelCase(
						resolvedURL
					)}.call({THIS_FILE_URL:"${resolvedURL}"},payload);}catch(e){console.error(e)}`
				].join("\n");
				let scfObjAsyncFn;
				let component = {};

				try {
					scfObjAsyncFn = new Function(
						"payload",
						"PRIVATE_GLOBAL",
						`with ({...PRIVATE_GLOBAL,..._,...Vue,}){${innerCode};}`
					);
				} catch (e) {
					console.error(innerCode);
					throw e;
				}
				const fnPayload = new Proxy(payload, {
					get(obj, prop) {
						if (prop === "PRIVATE_GLOBAL") {
							return PRIVATE_GLOBAL;
						}
						if (obj[prop] !== undefined) {
							return obj[prop];
						}
						return Vue[prop];
					}
				});
				component = await scfObjAsyncFn(fnPayload, PRIVATE_GLOBAL);
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
		_.$GenComponentOptions.optionsSets = new Set();

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
								target[prop] = $(
									`<div id="x-layer-move" class="x-layer-move" />`
								).appendTo(_.$single.body);
							}
						}
					}
					return target[prop];
				}
			}
		);

		/**
		 * 用less 处理css样式
		 * @param styleSourceCode
		 */
		_.$preprocessCssByless = async function (styleSourceCode) {
			const { render } = await _.$appendScript("/common/libs/min/less.js", "less");
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
			return cssContent;
		};

		_.$sourceCodeSFC = async function ({ resolvedURL, sourceCode }) {
			const init = () => {
				$appendSfcStyle(VUE_COMPONENTS_CACHE[resolvedURL].styleSourceCode, resolvedURL);
			};
			/* @descript 非开发模式下，如果已经加载，直接返回，否则每次都获取最新的代码 */
			/* @declare { scritpSourceCode, templateSourceCode, styleSourceCode } */
			if (!IS_DEV && VUE_COMPONENTS_CACHE[resolvedURL]) {
				init();
				return VUE_COMPONENTS_CACHE[resolvedURL];
			}

			if (!sourceCode) {
				sourceCode = await _.$loadText(resolvedURL);
			}
			/* 缓存 */
			VUE_COMPONENTS_CACHE[resolvedURL] = VueLoader(sourceCode);
			init();
			return VUE_COMPONENTS_CACHE[resolvedURL];
		};

		/**
		 * 利用less添加样式,独立处理资源路径
		 * @param {any} styleSourceCode
		 */
		async function $appendSfcStyle(styleSourceCode, url) {
			/* style */
			if (styleSourceCode) {
				let cssContent = await _.$preprocessCssByless(styleSourceCode);
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
			_.$importVue.urlSets.add(url);
			return _.$sfcVueObject({ resolvedURL, payload });
		};
		_.$importVue.urlSets = new Set();

		_.$sfcVueObject = async function ({ resolvedURL, payload, sourceCode }) {
			/* hmr使用sourceCode不用发请求获取源码， */
			payload = payload || {};
			/* 切换页面时的动效 _.$importVue.Nprogress*/
			_.$importVue?.Nprogress?.start?.();
			try {
				/* 源文件加载之后会有缓存，但是payload会有变化 */
				/* 所以只用异步组件不加payload，是可以用hmr，window需要自己重新加载 */
				const { scritpSourceCode, templateSourceCode } = await _.$sourceCodeSFC({
					resolvedURL,
					sourceCode
				});
				/* script and template*/
				const params = {
					resolvedURL,
					scritpSourceCode,
					templateSourceCode,
					payload: {
						...Vue,
						...payload
					}
				};
				const ComponentOptions = (await _.$GenComponentOptions(params)) || {};

				if (payload?.parent) {
					ComponentOptions.parent = payload?.parent;
				}
				ComponentOptions.FILE_URL = resolvedURL;
				if (_.isFunction(ComponentOptions.onLoadSFC)) {
					ComponentOptions.onLoadSFC();
				}
				return ComponentOptions;
			} catch (error) {
				if (error == 404) {
					return {
						FILE_URL: resolvedURL,
						render(h) {
							return h(
								"div",
								{ class: "x-padding x-card" },
								["Source Code File Not Found", resolvedURL, 404].map(
									(content, index) => h(`h${index + 1}`, content)
								)
							);
						}
					};
				} else {
					return { FILE_URL: resolvedURL };
				}
			} finally {
				_.$importVue?.Nprogress?.done?.();
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
	/* @typescriptDeclare (tableConfigs: any, { list, total:number, selected, set: Set }: any)=>void */
	_.$setTableData = function (tableConfigs, { list, total = 0, selected = [], set = new Set() }) {
		if (tableConfigs.data) {
			Vue.set(tableConfigs.data, "selected", selected);
			Vue.set(tableConfigs.data, "set", set);
			if (_.isArray(list)) {
				Vue.set(tableConfigs.data, "list", list);
			}
		} else {
			throw new Error("table cofigs 必须要有data属性且为对象");
		}

		/* pagination 非 required */
		if (tableConfigs.pagination) {
			tableConfigs.pagination.total = total;
		}
	};

	function xItemWrapperBy(selector) {
		const $wrapper = (() => {
			if (_.isString(selector)) {
				return $(selector);
			}
			/* const type = Vue.toRawType(xItemFormConfigsArray); if (/^HTML/.test(type)) { } */
			if (selector.outerHTML) {
				/* 如果是HTML元素，则获取Vue实例的configs */
				return $(selector);
			}

			if (selector.$el) {
				return $(selector.$el);
			}
		})();

		if (!$wrapper || $wrapper.length == 0) {
			throw new Error("selector不是可用的dom元素");
		}

		return $wrapper;
	}

	function xItemConfigsBy(selector) {
		const vmConfigsArray = [];
		const $domArray = xItemDomBy(selector);
		for (const dom of $domArray) {
			const { formItemId } = dom.dataset;
			if (formItemId) {
				const vm = Vue._X_ITEM_VM_S[formItemId];
				if (vm) {
					vmConfigsArray.push(vm.configs);
				}
			}
		}
		return vmConfigsArray;
	}

	function xItemDomBy(selector) {
		let $wrapper = xItemWrapperBy(selector);
		const $target = (function () {
			if ($wrapper) {
				let $target = $wrapper.find(`[data-form-item-id^=x_form_id_]`);
				if ($target.length === 0) {
					return $wrapper;
				}
				return $target;
			} else {
				return [];
			}
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
		const $target = xItemDomBy(selector);
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
		_.$setTableData(refTable.configs, {
			list: _.filter(refTable.configs.data.list, (row, index) =>
				filterFn({
					row,
					index
				})
			)
		});
	};
	/**
	 * 修改xItem的属性
	 * @param {*} selector
	 * @param {*} attrs
	 */
	/* @typescriptDeclare (selector:string, attrs:object)=>void */
	_.$modifyItemsAttrs = async (selector, attrs) => {
		const $doms = xItemDomBy(selector);
		for (const dom of $doms) {
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
			let $wrapper = xItemWrapperBy(selector);
			if ($wrapper) {
				const itemSelector = `.el-table__body-wrapper [data-row-index=${rowIndex}][data-col-prop=${colProp}]`;
				const targetDom = $wrapper.find(itemSelector);
				const { formItemId } = targetDom?.[0].dataset || {};
				vm = Vue._X_ITEM_VM_S?.[formItemId || "________No"] || {};
			}
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
	((/* 处理表单相关 */) => {
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
		 * 重置表单的值，前提是configs里面有resetValue
		 * @param xItemFormConfigsArray
		 */
		_.$resetFormValues = function (xItemFormConfigsArray) {
			xItemFormConfigsArray = xItemConfigsBy(xItemFormConfigsArray);
			_.each(xItemFormConfigsArray, configs => {
				if (_.isFunction(configs.resetValue)) {
					configs.resetValue();
				} else if (Vue.hasOwn(configs, "value") && Vue.hasOwn(configs, "resetValue")) {
					configs.value = _.cloneDeep(configs.resetValue);
				}
			});
		};
		/**
		 * 适用于xItem不使用v-mode，form的configs带有value form.xxx.value, {xxx:"value"}
		 * @param {any} xItemFormConfigs xItem 配置信息，config带有value属性
		 * @param {any} values
		 */
		/* @typescriptDeclare (form:object,values:object)=>void */
		_.$setFormValues = function (xItemFormConfigs, values) {
			_.each(values, (value, prop) => {
				/* 允许null，代表使用configs.value */
				if (value !== undefined && _.isPlainObject(xItemFormConfigs[prop])) {
					xItemFormConfigs[prop].value = value;
				}
			});
		};
		_.$setFormValuesDelay = function (xItemFormConfigs, values, delay = 100) {
			setTimeout(() => {
				_.$setFormValues(xItemFormConfigs, values);
			}, delay);
		};

		/**
		 * 从 cofnigs 中获取value 返回 {xxx:value,...}形式的对象
		 * @param {any} xItemFormConfigs
		 * @returns
		 */
		/* @typescriptDeclare (configs:object)=>object */
		_.$pickFormValues = function (xItemFormConfigs) {
			return _.reduce(
				xItemFormConfigs,
				(_params, configs, prop) => {
					if (configs.value !== undefined) {
						_params[prop] = configs.value;
					}
					if (configs.selectValue !== undefined) {
						_params[`${prop}_selectValue`] = configs.selectValue;
					}
					return _params;
				},
				{}
			);
		};

		/**
		 * 获取多个国际化label
		 * @param {*} langArray
		 * @returns
		 */
		_.$newI18nMany = async function (langArray = ["zh-CN", "en-US"]) {
			const i18nArray = await Promise.all(_.map(langArray, lang => _.$newI18n({ lang })));
			return (...args) => _.map(i18nArray, _i18n => _i18n.apply(_, args));
		};

		/**
		 * 从xItemConfigs 获取value对应的options item
		 * @param {*} xItemConfigs
		 * @returns
		 */
		_.$getSelectedItemFrom = function (xItemConfigs) {
			const { options, value } = xItemConfigs;
			if (_.$isArrayFill(options) && _.$isInput(value)) {
				const item = _.find(options, { value });
				if (item) {
					return item;
				}
			}
			console.error("getSelectedItemFrom miss options or value");
			return { value: "", label: "", labelKey: "" };
		};

		/**
		 * 只要value不是undefined，就返回value，否则用默认值
		 * @param value
		 * @param defaultValue
		 * @returns
		 */
		/* @typescriptDeclare (value: any, defaultValue: any) => any */
		_.$valOrDefault = function (value, defaultValue) {
			if (value === undefined) {
				return defaultValue;
			} else {
				return value;
			}
		};

		/**
		 * 从数组中取第一个元素的value，如果数组为空则返回defaultValue
		 * @param {*} options
		 * @param {*} defaultValue
		 * @returns
		 */
		_.$getFirstOrDefaultValue = function (options, defaultValue) {
			if (defaultValue === undefined) {
				alert("_.$getFirstOrDefaultValue miss defaultValue");
			}
			if (_.$isArrayFill(options)) {
				return options[0].value;
			}
			return defaultValue;
		};

		/*  */
		_.$getIpInRangeAndUseable = function (ipOld, cidr, used = []) {
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
	})();

	(function () {
		/* 将一个由点分隔的四个数字组成的字符串转换成一个整数 */
		function D(e) {
			var t, o, n;
			if (!e) return 0;
			if (4 !== (t = e.split(".")).length) return false;
			for (o = 0, n = 0; n < 4; n++) o = 256 * o + parseInt(t[n], 10);
			return o;
		}

		/* 将一个整数转换为由四个十进制数字组成的字符串 */
		function L(e) {
			var t = 0,
				o = "",
				n = 16777216;
			for (t = 0; t < 4; t++)
				(o = 0 === t ? o : o + "."),
					(o += parseInt(e / n)),
					(e -= parseInt(e / n) * n),
					(n /= 256);
			return o;
		}
	})();

	_.$intToIp4 = int =>
		[(int >>> 24) & 0xff, (int >>> 16) & 0xff, (int >>> 8) & 0xff, int & 0xff].join(".");
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
	_.$intToBin = int => {
		return (int >>> 0)
			.toString(2)
			.padStart(32, 0)
			.match(/.{1,8}/g)
			.join(".");
	};

	_.$calculateCidrRange = cidr => {
		const [range, bits = 32] = cidr.split("/");
		const mask = ~(2 ** (32 - bits) - 1);
		return [_.$intToIp4(_.$ip4ToInt(range) & mask), _.$intToIp4(_.$ip4ToInt(range) | ~mask)];
	};
})();

(function () {
	class RequestCacheManager {
		constructor() {
			this.cache = {};
		}

		async cachedRequest(url, data, method = "GET", cacheDuration = 10000) {
			const key = JSON.stringify([url, data, method]);
			let entry = this.cache[key];
			const clearCacheEntry = () => {
				if (entry?.clearTimer) clearTimeout(entry.clearTimer);
				entry.clearTimer = setTimeout(() => {
					delete this.cache[key];
				}, cacheDuration);
			};

			if (entry && entry.response) {
				clearCacheEntry();
				return entry.response;
			} else {
				entry = this.cache[key] = { deep: [], status: "pending" };
				return new Promise((resolve, reject) => {
					entry.deep.push({ resolve, reject });

					if (entry.status === "pending") {
						const fetchData = async () => {
							try {
								const response = await _.$ajax[method.toLowerCase()](url, { data });
								entry.response = response;
								entry.status = "resolved";
								clearCacheEntry();
								entry.deep.forEach(({ resolve }) => resolve(response));
							} catch (error) {
								entry.status = "rejected";
								entry.deep.forEach(({ reject }) => reject(error));
								clearCacheEntry();
							}
						};
					}

					fetchData();
				});
			}
		}
	}
});
