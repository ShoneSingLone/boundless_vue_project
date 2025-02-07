<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	var _xUtils = {};
	const ITEM_RENDER_EVT = "itemRendered";
	const SCROLL_EVT = "scroll";
	const FORWARD = "forward";
	const BACKWARD = "backward";
	const AUTO_ALIGNMENT = "auto";
	const SMART_ALIGNMENT = "smart";
	const START_ALIGNMENT = "start";
	const CENTERED_ALIGNMENT = "center";
	const END_ALIGNMENT = "end";
	const HORIZONTAL = "horizontal";
	const VERTICAL = "vertical";
	const RTL = "rtl";
	const RTL_OFFSET_NAG = "negative";
	const RTL_OFFSET_POS_ASC = "positive-ascending";
	const RTL_OFFSET_POS_DESC = "positive-descending";
	const ScrollbarDirKey = { [HORIZONTAL]: "left", [VERTICAL]: "top" };
	const TableV2InjectionKey = Symbol("tableV2");
	const SCROLLBAR_MIN_SIZE = 20;
	const BAR_MAP = {
		vertical: {
			offset: "offsetHeight",
			scroll: "scrollTop",
			scrollSize: "scrollHeight",
			size: "height",
			key: "vertical",
			axis: "Y",
			client: "clientY",
			direction: "top"
		},
		horizontal: {
			offset: "offsetWidth",
			scroll: "scrollLeft",
			scrollSize: "scrollWidth",
			size: "width",
			key: "horizontal",
			axis: "X",
			client: "clientX",
			direction: "left"
		}
	};

	const epPropKey = "__epPropKey";
	const isEpProp = val => _.isPlainObject(val) && !!val[epPropKey];
	const buildProp = (prop, key) => {
		if (!_.isPlainObject(prop) || isEpProp(prop)) return prop;
		const { values, required, default: defaultValue, type, validator } = prop;
		const _validator =
			values || validator
				? val => {
						let valid = false;
						let allowedValues = [];
						if (values) {
							allowedValues = Array.from(values);
							if (hasOwn(prop, "default")) {
								allowedValues.push(defaultValue);
							}
							valid || (valid = allowedValues.includes(val));
						}
						if (validator) valid || (valid = validator(val));
						if (!valid && allowedValues.length > 0) {
							const allowValuesText = [...new Set(allowedValues)]
								.map(value => JSON.stringify(value))
								.join(", ");
							warn(
								`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`
							);
						}
						return valid;
					}
				: void 0;
		const epProp = {
			type,
			required: !!required,
			validator: _validator,
			[epPropKey]: true
		};
		if (hasOwn(prop, "default")) epProp.default = defaultValue;
		return epProp;
	};

	function fromPairs(pairs) {
		var index = -1,
			length = pairs == null ? 0 : pairs.length,
			result = {};
		while (++index < length) {
			var pair = pairs[index];
			result[pair[0]] = pair[1];
		}
		return result;
	}

	const buildProps = props => {
		return fromPairs(
			Object.entries(props).map(([key, option]) => [key, buildProp(option, key)])
		);
	};
	const definePropType = val => val;
	const defaultNamespace = "el";
	const namespaceContextKey = Symbol("namespaceContextKey");
	const useGetDerivedNamespace = (namespaceOverrides = "") => {
		const derivedNamespace =
			namespaceOverrides || inject(namespaceContextKey, ref(defaultNamespace));
		const namespace = computed(() => {
			return unref(derivedNamespace) || defaultNamespace;
		});
		return namespace;
	};

	const noop = () => {};
	const statePrefix = "is-";
	const _bem = (namespace, block, blockSuffix, element, modifier) => {
		let cls = `${namespace}-${block}`;
		if (blockSuffix) {
			cls += `-${blockSuffix}`;
		}
		if (element) {
			cls += `__${element}`;
		}
		if (modifier) {
			cls += `--${modifier}`;
		}
		return cls;
	};

	function renderThumbStyle({ move, size, bar }, layout2) {
		const style = {};
		const translate2 = `translate${bar.axis}(${move}px)`;
		style[bar.size] = size;
		style.transform = translate2;
		style.msTransform = translate2;
		style.webkitTransform = translate2;
		if (layout2 === "horizontal") {
			style.height = "100%";
		} else {
			style.width = "100%";
		}
		return style;
	}

	/**
	 * css 变量命名
	 */
	const useNamespace = (block, namespaceOverrides) => {
		const namespace = useGetDerivedNamespace(namespaceOverrides);
		const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
		const e = element => (element ? _bem(namespace.value, block, "", element, "") : "");
		const m = modifier => (modifier ? _bem(namespace.value, block, "", "", modifier) : "");
		const be = (blockSuffix, element) =>
			blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
		const em = (element, modifier) =>
			element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
		const bm = (blockSuffix, modifier) =>
			blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
		const bem = (blockSuffix, element, modifier) =>
			blockSuffix && element && modifier
				? _bem(namespace.value, block, blockSuffix, element, modifier)
				: "";
		const is = (name, ...args) => {
			const state = args.length >= 1 ? args[0] : true;
			return name && state ? `${statePrefix}${name}` : "";
		};
		const cssVar = object => {
			const styles = {};
			for (const key in object) {
				if (object[key]) {
					styles[`--${namespace.value}-${key}`] = object[key];
				}
			}
			return styles;
		};
		const cssVarBlock = object => {
			const styles = {};
			for (const key in object) {
				if (object[key]) {
					styles[`--${namespace.value}-${block}-${key}`] = object[key];
				}
			}
			return styles;
		};
		const cssVarName = name => `--${namespace.value}-${name}`;
		const cssVarBlockName = name => `--${namespace.value}-${block}-${name}`;

		return {
			namespace,
			b,
			e,
			m,
			be,
			em,
			bm,
			bem,
			is,
			cssVar,
			cssVarName,
			cssVarBlock,
			cssVarBlockName
		};
	};

	/*****************/

	var columns = {
		type: definePropType(Array),
		required: true
	};
	var fixedDataType = {
		type: definePropType(Array)
	};
	var dataType = {
		...fixedDataType,
		required: true
	};
	var expandColumnKey = String;
	var expandKeys = {
		type: definePropType(Array),
		default: () => []
	};
	var requiredNumber = {
		type: Number,
		required: true
	};
	var rowKey = {
		type: definePropType([String, Number, Symbol]),
		default: "id"
	};
	var styleType = {
		type: definePropType(Object)
	};

	const itemSize = buildProp({
		type: definePropType([Number, Function]),
		required: true
	});
	const estimatedItemSize = buildProp({
		type: Number
	});
	const cache = buildProp({
		type: Number,
		default: 2
	});
	const direction = buildProp({
		type: String,
		values: ["ltr", "rtl"],
		default: "ltr"
	});
	const initScrollOffset = buildProp({
		type: Number,
		default: 0
	});
	const total = buildProp({
		type: Number,
		required: true
	});
	const layout = buildProp({
		type: String,
		values: ["horizontal", "vertical"],
		default: VERTICAL
	});
	const virtualizedProps = buildProps({
		className: {
			type: String,
			default: ""
		},
		containerElement: {
			type: definePropType([String, Object]),
			default: "div"
		},
		data: {
			type: definePropType(Array),
			default: () => []
		},
		direction,
		height: {
			type: [String, Number],
			required: true
		},
		innerElement: {
			type: [String, Object],
			default: "div"
		},
		styleV2: {
			type: definePropType([Object, String, Array])
		},
		useIsScrolling: {
			type: Boolean,
			default: false
		},
		width: {
			type: [Number, String],
			required: false
		},
		perfMode: {
			type: Boolean,
			default: true
		},
		scrollbarAlwaysOn: {
			type: Boolean,
			default: false
		},
		defaultRender: {
			type: Function
		}
	});

	const virtualizedListProps = buildProps({
		cache,
		estimatedItemSize,
		layout,
		initScrollOffset,
		total,
		itemSize,
		...virtualizedProps
	});

	const scrollbarSize = {
		type: Number,
		default: 6
	};
	const startGap = { type: Number, default: 0 };
	const endGap = { type: Number, default: 2 };
	const virtualizedScrollbarProps = buildProps({
		alwaysOn: Boolean,
		classV2: String,
		layout,
		total,
		ratio: {
			type: Number,
			required: true
		},
		clientSize: {
			type: Number,
			required: true
		},
		scrollFrom: {
			type: Number,
			required: true
		},
		scrollbarSize,
		startGap,
		endGap,
		visible: Boolean
	});

	var requiredNumberType = {
		type: Number,
		required: true
	};
	var tableV2HeaderProps = buildProps({
		classV2: String,
		columns,
		fixedHeaderData: {
			type: definePropType(Array)
		},
		headerData: {
			type: definePropType(Array),
			required: true
		},
		headerHeight: {
			type: definePropType([Number, Array]),
			default: 40
		},
		rowWidth: requiredNumberType,
		rowHeight: {
			type: Number,
			default: 40
		},
		height: requiredNumberType,
		width: requiredNumberType
	});

	var columnsStyles = {
		type: definePropType(Object),
		required: true
	};

	const virtualizedGridProps = buildProps({
		columnCache: cache,
		columnWidth: itemSize,
		estimatedColumnWidth: estimatedItemSize,
		estimatedRowHeight: estimatedItemSize,
		initScrollLeft: initScrollOffset,
		initScrollTop: initScrollOffset,
		itemKey: {
			type: definePropType(Function),
			default: ({ columnIndex, rowIndex }) => `${rowIndex}:${columnIndex}`
		},
		rowCache: cache,
		rowHeight: itemSize,
		totalColumn: total,
		totalRow: total,
		hScrollbarSize: scrollbarSize,
		vScrollbarSize: scrollbarSize,
		scrollbarStartGap: startGap,
		scrollbarEndGap: endGap,
		role: String,
		...virtualizedProps
	});

	var tableV2RowProps = buildProps({
		classV2: String,
		columns,
		columnsStyles,
		depth: Number,
		expandColumnKey,
		estimatedRowHeight: {
			...virtualizedGridProps.estimatedRowHeight,
			default: void 0
		},
		isScrolling: Boolean,
		onRowExpand: {
			type: definePropType(Function)
		},
		onRowHover: {
			type: definePropType(Function)
		},
		onRowHeightChange: {
			type: definePropType(Function)
		},
		rowData: {
			type: definePropType(Object),
			required: true
		},
		rowEventHandlers: {
			type: definePropType(Object)
		},
		rowIndex: {
			type: Number,
			required: true
		},
		rowKey,
		styleV2: {
			type: definePropType(Object)
		}
	});

	var tableV2GridProps = buildProps({
		columns,
		data: dataType,
		fixedData: fixedDataType,
		estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
		width: requiredNumber,
		height: requiredNumber,
		headerWidth: requiredNumber,
		headerHeight: tableV2HeaderProps.headerHeight,
		bodyWidth: requiredNumber,
		rowHeight: requiredNumber,
		cache: virtualizedListProps.cache,
		useIsScrolling: Boolean,
		scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
		scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
		scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,
		classV2: String,
		styleV2: styleType,
		containerStyle: styleType,
		getRowHeight: {
			type: definePropType(Function),
			required: true
		},
		rowKey: tableV2RowProps.rowKey,
		onRowsRendered: {
			type: definePropType(Function)
		},
		onScroll: {
			type: definePropType(Function)
		}
	});
	var tableV2Props = buildProps({
		/* Vue2 不支持class style作为props传入 */
		classV2: String,
		styleV2: {
			type: definePropType(Object)
		},
		cache: tableV2GridProps.cache,
		estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
		rowKey,
		headerClass: {
			type: definePropType([String, Function])
		},
		headerProps: {
			type: definePropType([Object, Function])
		},
		headerCellProps: {
			type: definePropType([Object, Function])
		},
		headerHeight: tableV2HeaderProps.headerHeight,
		footerHeight: {
			type: Number,
			default: 0
		},
		rowClass: {
			type: definePropType([String, Function])
		},
		rowProps: {
			type: definePropType([Object, Function])
		},
		rowHeight: {
			type: Number,
			default: 50
		},
		cellProps: {
			type: definePropType([Object, Function])
		},
		columns,
		data: dataType,
		dataGetter: {
			type: definePropType(Function)
		},
		fixedData: fixedDataType,
		expandColumnKey: tableV2RowProps.expandColumnKey,
		expandedRowKeys: expandKeys,
		defaultExpandedRowKeys: expandKeys,
		fixed: Boolean,
		width: requiredNumber,
		height: requiredNumber,
		maxHeight: Number,
		useIsScrolling: Boolean,
		indentSize: {
			type: Number,
			default: 12
		},
		iconSize: {
			type: Number,
			default: 12
		},
		hScrollbarSize: virtualizedGridProps.hScrollbarSize,
		vScrollbarSize: virtualizedGridProps.vScrollbarSize,
		scrollbarAlwaysOn: virtualizedScrollbarProps.alwaysOn,
		sortBy: {
			type: definePropType(Object),
			default: () => ({})
		},
		sortState: {
			type: definePropType(Object),
			default: void 0
		},
		onColumnSort: {
			type: definePropType(Function)
		},
		onExpandedRowsChange: {
			type: definePropType(Function)
		},
		onEndReached: {
			type: definePropType(Function)
		},
		onRowExpand: tableV2RowProps.onRowExpand,
		onScroll: tableV2GridProps.onScroll,
		onRowsRendered: tableV2GridProps.onRowsRendered,
		rowEventHandlers: tableV2RowProps.rowEventHandlers
	});

	const isStringNumber = val => {
		if (!_.isString(val)) {
			return false;
		}
		return !Number.isNaN(Number(val));
	};

	function addUnit(value, defaultUnit = "px") {
		if (!value) return "";
		if (_.isNumber(value) || isStringNumber(value)) {
			return `${value}${defaultUnit}`;
		} else if (_.isString(value)) {
			return value;
		}
	}

	const useCache = () => {
		const vm = getCurrentInstance();
		const props = vm.proxy.$props;
		return computed(() => {
			const _getItemStyleCache = (_, __, ___) => ({});
			return props.perfMode ? memoize(_getItemStyleCache) : memoizeOne(_getItemStyleCache);
		});
	};
	const useTableRow = props => {
		const { isScrolling } = inject(TableV2InjectionKey);
		const measured = ref(false);
		const rowRef = ref();
		const measurable = computed(() => {
			return _.isNumber(props.estimatedRowHeight) && props.rowIndex >= 0;
		});
		const doMeasure = (isInit = false) => {
			const $rowRef = unref(rowRef);
			if (!$rowRef) return;
			const {
				columns: columns2,
				onRowHeightChange,
				rowKey: rowKey2,
				rowIndex,
				style
			} = props;
			const { height } = $rowRef.getBoundingClientRect();
			measured.value = true;
			nextTick(() => {
				if (isInit || height !== Number.parseInt(style.height)) {
					const firstColumn = columns2[0];
					const isPlaceholder = firstColumn?.placeholderSign === placeholderSign;
					onRowHeightChange?.(
						{
							rowKey: rowKey2,
							height,
							rowIndex
						},
						firstColumn && !isPlaceholder && firstColumn.fixed
					);
				}
			});
		};
		const eventHandlers = computed(() => {
			const { rowData, rowIndex, rowKey: rowKey2, onRowHover } = props;
			const handlers = props.rowEventHandlers || {};
			const eventHandlers2 = {};
			Object.entries(handlers).forEach(([eventName, handler]) => {
				if (_.isFunction(handler)) {
					eventHandlers2[eventName] = event => {
						handler({
							event,
							rowData,
							rowIndex,
							rowKey: rowKey2
						});
					};
				}
			});
			if (onRowHover) {
				[
					{
						name: "onMouseleave",
						hovered: false
					},
					{
						name: "onMouseenter",
						hovered: true
					}
				].forEach(({ name, hovered }) => {
					const existedHandler = eventHandlers2[name];
					eventHandlers2[name] = event => {
						onRowHover({
							event,
							hovered,
							rowData,
							rowIndex,
							rowKey: rowKey2
						});
						existedHandler?.(event);
					};
				});
			}
			return eventHandlers2;
		});
		const onExpand = expanded => {
			const { onRowExpand, rowData, rowIndex, rowKey } = props;
			onRowExpand?.({
				expanded,
				rowData,
				rowIndex,
				rowKey
			});
		};
		onMounted(() => {
			if (unref(measurable)) {
				doMeasure(true);
			}
		});
		return {
			isScrolling,
			measurable,
			measured,
			rowRef,
			eventHandlers,
			onExpand
		};
	};

	const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }, onWheelDelta) => {
		let frameHandle = null;
		let xOffset = 0;
		let yOffset = 0;
		const hasReachedEdge = (x, y) => {
			const xEdgeReached = (x <= 0 && atXStartEdge.value) || (x >= 0 && atXEndEdge.value);
			const yEdgeReached = (y <= 0 && atYStartEdge.value) || (y >= 0 && atYEndEdge.value);
			return xEdgeReached && yEdgeReached;
		};
		const onWheel = e => {
			cAF(frameHandle);
			let x = e.deltaX;
			let y = e.deltaY;
			if (Math.abs(x) > Math.abs(y)) {
				y = 0;
			} else {
				x = 0;
			}
			if (e.shiftKey && y !== 0) {
				x = y;
				y = 0;
			}
			if (hasReachedEdge(xOffset, yOffset) && hasReachedEdge(xOffset + x, yOffset + y))
				return;
			xOffset += x;
			yOffset += y;
			e.preventDefault();
			frameHandle = rAF(() => {
				onWheelDelta(xOffset, yOffset);
				xOffset = 0;
				yOffset = 0;
			});
		};
		return {
			hasReachedEdge,
			onWheel
		};
	};

	const useTableGrid = props => {
		const headerRef = ref();
		const bodyRef = ref();
		const totalHeight = computed(() => {
			const { data, rowHeight, estimatedRowHeight } = props;
			if (estimatedRowHeight) {
				return;
			}
			return data.length * rowHeight;
		});
		const fixedRowHeight = computed(() => {
			const { fixedData, rowHeight } = props;
			return (fixedData?.length || 0) * rowHeight;
		});
		const headerHeight = computed(() => sum(props.headerHeight));
		const gridHeight = computed(() => {
			const { height } = props;
			return Math.max(0, height - unref(headerHeight) - unref(fixedRowHeight));
		});
		const hasHeader = computed(() => {
			return unref(headerHeight) + unref(fixedRowHeight) > 0;
		});
		const itemKey = ({ data, rowIndex }) => data[rowIndex][props.rowKey];

		function onItemRendered({ rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd }) {
			props.onRowsRendered?.({
				rowCacheStart,
				rowCacheEnd,
				rowVisibleStart,
				rowVisibleEnd
			});
		}

		function resetAfterRowIndex(index, forceUpdate2) {
			bodyRef.value?.resetAfterRowIndex(index, forceUpdate2);
		}

		function scrollTo(leftOrOptions, top) {
			const header$ = unref(headerRef);
			const body$ = unref(bodyRef);
			if (!header$ || !body$) return;
			if (_.isPlainObject(leftOrOptions)) {
				header$.scrollToLeft(leftOrOptions.scrollLeft);
				body$.scrollTo(leftOrOptions);
			} else {
				header$.scrollToLeft(leftOrOptions);
				body$.scrollTo({
					scrollLeft: leftOrOptions,
					scrollTop: top
				});
			}
		}

		function scrollToTop(scrollTop) {
			unref(bodyRef)?.scrollTo({
				scrollTop
			});
		}

		function scrollToRow(row, strategy) {
			unref(bodyRef)?.scrollToItem(row, 1, strategy);
		}

		function forceUpdate() {
			unref(bodyRef)?.$forceUpdate();
			unref(headerRef)?.$forceUpdate();
		}

		return {
			bodyRef,
			forceUpdate,
			fixedRowHeight,
			gridHeight,
			hasHeader,
			headerHeight,
			headerRef,
			totalHeight,
			itemKey,
			onItemRendered,
			resetAfterRowIndex,
			scrollTo,
			scrollToTop,
			scrollToRow
		};
	};

	const sumReducer = (sum2, num) => sum2 + num;

	const sum = listLike => {
		return _.isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
	};
	const tryCall = (fLike, params, defaultRet = {}) => {
		return _.isFunction(fLike) ? fLike(params) : fLike ?? defaultRet;
	};
	const enforceUnit = (style = {}) => {
		if (_.isArray(style)) {
			style = _.merge.apply(_, [{}, ...style]);
		}
		["width", "maxWidth", "minWidth", "height"].forEach(key => {
			style[key] = addUnit(style[key]);
		});
		return style;
	};
	const componentToSlot = ComponentLike =>
		isVNode(ComponentLike) ? props => h(ComponentLike, props) : ComponentLike;

	function castArray() {
		if (!arguments.length) {
			return [];
		}
		var value = arguments[0];
		return _.isArray(value) ? value : [value];
	}

	const isClient = typeof window !== "undefined";
	const rAF = fn => (isClient ? window.requestAnimationFrame(fn) : setTimeout(fn, 16));
	const cAF = handle => (isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle));

	const getScrollDir = (prev, cur) => (prev < cur ? FORWARD : BACKWARD);
	const isRTL = dir => dir === RTL;

	var safeIsNaN =
		Number.isNaN ||
		function ponyfill(value) {
			return typeof value === "number" && value !== value;
		};

	function isEqual(first, second) {
		if (first === second) {
			return true;
		}
		if (safeIsNaN(first) && safeIsNaN(second)) {
			return true;
		}
		return false;
	}

	function areInputsEqual(newInputs, lastInputs) {
		if (newInputs.length !== lastInputs.length) {
			return false;
		}
		for (var i = 0; i < newInputs.length; i++) {
			if (!isEqual(newInputs[i], lastInputs[i])) {
				return false;
			}
		}
		return true;
	}

	function memoizeOne(resultFn, isEqual2) {
		if (isEqual2 === void 0) {
			isEqual2 = areInputsEqual;
		}
		var cache2 = null;

		function memoized() {
			var newArgs = [];
			for (var _i = 0; _i < arguments.length; _i++) {
				newArgs[_i] = arguments[_i];
			}
			if (cache2 && cache2.lastThis === this && isEqual2(newArgs, cache2.lastArgs)) {
				return cache2.lastResult;
			}
			var lastResult = resultFn.apply(this, newArgs);
			cache2 = {
				lastResult,
				lastArgs: newArgs,
				lastThis: this
			};
			return lastResult;
		}

		memoized.clear = function clear() {
			cache2 = null;
		};
		return memoized;
	}

	function resolveUnref(r) {
		return typeof r === "function" ? r() : unref(r);
	}

	function identity(arg) {
		return arg;
	}

	function tryOnScopeDispose(fn) {
		if (Vue.getCurrentScope()) {
			Vue.onScopeDispose(fn);
			return true;
		}
		return false;
	}

	function tryOnMounted(fn, sync = true) {
		if (getCurrentInstance()) onMounted(fn);
		else if (sync) fn();
		else nextTick(fn);
	}

	function unrefElement(elRef) {
		var _a2;
		const plain = resolveUnref(elRef);
		return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
	}

	const defaultWindow = window;

	function useEventListener(...args) {
		let target;
		let event;
		let listener;
		let options;
		if (_.isString(args[0])) {
			[event, listener, options] = args;
			target = defaultWindow;
		} else {
			[target, event, listener, options] = args;
		}
		if (!target) return noop;
		let cleanup = noop;
		const stopWatch = watch(
			() => unrefElement(target),
			el => {
				try {
					cleanup();
					if (!el) return;
					el.addEventListener(event, listener, options);
					cleanup = () => {
						el.removeEventListener(event, listener, options);
						cleanup = noop;
					};
				} catch (error) {}
			},
			{ immediate: true, flush: "post" }
		);
		const stop = () => {
			stopWatch();
			cleanup();
		};
		tryOnScopeDispose(stop);
		return stop;
	}

	function useSupported(callback, sync = false) {
		const isSupported = ref();
		const update = () => (isSupported.value = Boolean(callback()));
		update();
		tryOnMounted(update, sync);
		return isSupported;
	}

	function useResizeObserver(target, callback, options = {}) {
		const _a2 = options,
			{ window: window2 = defaultWindow } = _a2,
			observerOptions = __objRest(_a2, ["window"]);
		let observer;
		const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
		const cleanup = () => {
			if (observer) {
				observer.disconnect();
				observer = void 0;
			}
		};
		const stopWatch = watch(
			() => unrefElement(target),
			el => {
				cleanup();
				if (isSupported.value && window2 && el) {
					observer = new ResizeObserver(callback);
					observer.observe(el, observerOptions);
				}
			},
			{ immediate: true, flush: "post" }
		);
		const stop = () => {
			cleanup();
			stopWatch();
		};
		tryOnScopeDispose(stop);
		return {
			isSupported,
			stop
		};
	}

	const useAutoResize = props => {
		const sizer = ref();
		const width$ = ref(0);
		const height$ = ref(0);
		let resizerStopper;
		onMounted(() => {
			resizerStopper = useResizeObserver(sizer, ([entry]) => {
				const { width, height } = entry.contentRect;
				const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(
					entry.target
				);
				const left = Number.parseInt(paddingLeft) || 0;
				const right = Number.parseInt(paddingRight) || 0;
				const top = Number.parseInt(paddingTop) || 0;
				const bottom = Number.parseInt(paddingBottom) || 0;
				width$.value = width - left - right;
				height$.value = height - top - bottom;
			}).stop;
		});
		onBeforeUnmount(() => {
			resizerStopper?.();
		});
		watch([width$, height$], ([width, height]) => {
			props.onResize?.({
				width,
				height
			});
		});
		return {
			sizer,
			width: width$,
			height: height$
		};
	};

	const tableV2HeaderRowProps = buildProps({
		classV2: String,
		columns,
		columnsStyles,
		headerIndex: Number,
		styleV2: { type: definePropType(Object) }
	});

	var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
	var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
	var __objRest = (source, exclude) => {
		var target = {};
		for (var prop in source)
			if (hasOwnProperty.call(source, prop) && exclude.indexOf(prop) < 0)
				target[prop] = source[prop];
		if (source != null && __getOwnPropSymbols$f)
			for (var prop of __getOwnPropSymbols$f(source)) {
				if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop))
					target[prop] = source[prop];
			}
		return target;
	};

	class ElementPlusError extends Error {
		constructor(m) {
			super(m);
			this.name = "ElementPlusError";
		}
	}

	function throwError(scope, m) {
		throw new ElementPlusError(`[${scope}] ${m}`);
	}

	var ARIA_UTILS = (() => {
		var aria = aria || {};

		aria.Utils = aria.Utils || {};

		/**
		 * @desc Set focus on descendant nodes until the first focusable element is
		 *       found.
		 * @param element
		 *          DOM node for which to find the first focusable descendant.
		 * @returns
		 *  true if a focusable element is found and focus is set.
		 */
		aria.Utils.focusFirstDescendant = function (element) {
			for (var i = 0; i < element.childNodes.length; i++) {
				var child = element.childNodes[i];
				if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
					return true;
				}
			}
			return false;
		};

		/**
		 * @desc Find the last descendant node that is focusable.
		 * @param element
		 *          DOM node for which to find the last focusable descendant.
		 * @returns
		 *  true if a focusable element is found and focus is set.
		 */

		aria.Utils.focusLastDescendant = function (element) {
			for (var i = element.childNodes.length - 1; i >= 0; i--) {
				var child = element.childNodes[i];
				if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
					return true;
				}
			}
			return false;
		};

		/**
		 * @desc Set Attempt to set focus on the current node.
		 * @param element
		 *          The node to attempt to focus on.
		 * @returns
		 *  true if element is focused.
		 */
		aria.Utils.attemptFocus = function (element) {
			if (!aria.Utils.isFocusable(element)) {
				return false;
			}
			aria.Utils.IgnoreUtilFocusChanges = true;
			try {
				element.focus();
			} catch (e) {}
			aria.Utils.IgnoreUtilFocusChanges = false;
			return document.activeElement === element;
		};

		aria.Utils.isFocusable = function (element) {
			if (
				element.tabIndex > 0 ||
				(element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
			) {
				return true;
			}

			if (element.disabled) {
				return false;
			}

			switch (element.nodeName) {
				case "A":
					return !!element.href && element.rel !== "ignore";
				case "INPUT":
					return element.type !== "hidden" && element.type !== "file";
				case "BUTTON":
				case "SELECT":
				case "TEXTAREA":
					return true;
				default:
					return false;
			}
		};

		/**
		 * 触发一个事件
		 * mouseenter, mouseleave, mouseover, keyup, change, click 等
		 * @param  {Element} elm
		 * @param  {String} name
		 * @param  {*} opts
		 */
		aria.Utils.triggerEvent = function (elm, name, ...opts) {
			let eventName;

			if (/^mouse|click/.test(name)) {
				eventName = "MouseEvents";
			} else if (/^key/.test(name)) {
				eventName = "KeyboardEvent";
			} else {
				eventName = "HTMLEvents";
			}
			const evt = document.createEvent(eventName);

			evt.initEvent(name, ...opts);
			elm.dispatchEvent ? elm.dispatchEvent(evt) : elm.fireEvent("on" + name, evt);

			return elm;
		};

		aria.Utils.keys = {
			tab: 9,
			enter: 13,
			space: 32,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			esc: 27
		};

		return aria.Utils;
	})();

	/*****************************************/
	const DEFAULT_DELAY = 200;
	const DEFAULT_DISTANCE = 0;
	/*****************************************/

	(function () {
		const getOffsetTop = el => {
			let offset = 0;
			let parent = el;

			while (parent) {
				offset += parent.offsetTop;
				parent = parent.offsetParent;
			}

			return offset;
		};

		const getOffsetTopDistance = (el, containerEl) => {
			return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
		};

		_xUtils = {
			DEFAULT_DELAY,
			DEFAULT_DISTANCE,
			getOffsetTop,
			getOffsetTopDistance,
			getScrollOptions(el, instance) {
				const attributes = {
					delay: {
						type: Number,
						default: DEFAULT_DELAY
					},
					distance: {
						type: Number,
						default: DEFAULT_DISTANCE
					},
					disabled: {
						type: Boolean,
						default: false
					},
					immediate: {
						type: Boolean,
						default: true
					},
					up: {
						type: Boolean,
						default: false
					}
				};

				return Object.entries(attributes).reduce((acm, [name, option]) => {
					const { type, default: defaultValue } = option;
					const attrVal = el.getAttribute(`infinite-scroll-${name}`);
					let value = _.$isInput(attrVal) ? attrVal : defaultValue;
					value = value === "false" ? false : value;
					value = type(value);
					acm[name] = Number.isNaN(value) ? defaultValue : value;
					return acm;
				}, {});
			},
			RepeatClick: {
				bind(el, binding, vnode) {
					let interval = null;
					let startTime;
					const maxIntervals = _.$isMac() ? 100 : 200;
					const handler = () => vnode.context[binding.expression].apply();
					const clear = () => {
						if (Date.now() - startTime < maxIntervals) {
							handler();
						}
						clearInterval(interval);
						interval = null;
					};

					$(el).on("mousedown", e => {
						if (e.button !== 0) return;
						startTime = Date.now();
						$(document).one("mouseup", clear);
						clearInterval(interval);
						interval = setInterval(handler, maxIntervals);
					});
				}
			},
			ARIA_UTILS,
			on: (el, eventName, handler) => {
				$(el).on(eventName, handler);
			},
			off: (el, eventName, handler) => {
				$(el).off(eventName, handler);
			},
			addClass: (el, className) => {
				$(el).addClass(className);
			},
			hasClass: (el, className) => {
				$(el).hasClass(className);
			},
			removeClass: (el, className) => {
				$(el).removeClass(className);
			},
			virtualizedListProps,
			useGetDerivedNamespace,
			globalConfigs: {},
			resolveUnref,
			identity,
			tryOnScopeDispose,
			tryOnMounted,
			unrefElement,
			useEventListener,
			useSupported,
			tableV2HeaderRowProps,
			useResizeObserver,
			useAutoResize,
			useTableRow,
			isEqual,
			areInputsEqual,
			memoizeOne,
			getScrollDir,
			isRTL,
			rAF,
			cAF,
			isClient,
			castArray,
			sumReducer,
			sum,
			tryCall,
			enforceUnit,
			componentToSlot,
			TableV2InjectionKey,
			useTableGrid,
			useGridWheel,
			useCache,
			useNamespace,
			isStringNumber,
			addUnit,
			noop,
			ScrollbarDirKey,
			renderThumbStyle,
			/* **************** */
			definePropType,
			buildProp,
			buildProps,
			columns,
			virtualizedGridProps,
			virtualizedScrollbarProps,
			tableV2HeaderProps,
			tableV2GridProps,
			tableV2Props,
			/* ************** */
			ITEM_RENDER_EVT,
			SCROLLBAR_MIN_SIZE,
			SCROLL_EVT,
			FORWARD,
			BACKWARD,
			AUTO_ALIGNMENT,
			SMART_ALIGNMENT,
			START_ALIGNMENT,
			CENTERED_ALIGNMENT,
			END_ALIGNMENT,
			HORIZONTAL,
			VERTICAL,
			BAR_MAP,
			RTL,
			RTL_OFFSET_NAG,
			RTL_OFFSET_POS_ASC,
			RTL_OFFSET_POS_DESC,
			getStyle(element, styleName) {
				var _a2;
				if (!isClient || !element || !styleName) return "";
				let key = Vue.camelize(styleName);
				if (key === "float") key = "cssFloat";
				try {
					const style = element.style[key];
					if (style) return style;
					const computed =
						(_a2 = document.defaultView) == null
							? void 0
							: _a2.getComputedStyle(element, "");
					return computed ? computed[key] : "";
				} catch (e) {
					return element.style[key];
				}
			},
			isScroll(el, isVertical) {
				if (!isClient) return false;
				const key = {
					undefined: "overflow",
					true: "overflow-y",
					false: "overflow-x"
				}[String(isVertical)];
				const overflow = _xUtils.getStyle(el, key);
				return ["scroll", "auto", "overlay"].some(s => overflow.includes(s));
			},
			getScrollContainer(el, isVertical) {
				if (!isClient) return;
				let parent = el;
				while (parent) {
					if ([window, document, document.documentElement].includes(parent))
						return window;
					if (_xUtils.isScroll(parent, isVertical)) return parent;
					parent = parent.parentNode;
				}
				return parent;
			},
			throwError,
			useElementBounding(target, options = {}) {
				const {
					reset = true,
					windowResize = true,
					windowScroll = true,
					immediate = true
				} = options;
				const height = Vue.ref(0);
				const bottom = Vue.ref(0);
				const left = Vue.ref(0);
				const right = Vue.ref(0);
				const top = Vue.ref(0);
				const width = Vue.ref(0);
				const x = Vue.ref(0);
				const y = Vue.ref(0);

				function update() {
					const el = unrefElement(target);
					if (!el) {
						if (reset) {
							height.value = 0;
							bottom.value = 0;
							left.value = 0;
							right.value = 0;
							top.value = 0;
							width.value = 0;
							x.value = 0;
							y.value = 0;
						}
						return;
					}
					const rect = el.getBoundingClientRect();
					height.value = rect.height;
					bottom.value = rect.bottom;
					left.value = rect.left;
					right.value = rect.right;
					top.value = rect.top;
					width.value = rect.width;
					x.value = rect.x;
					y.value = rect.y;
				}

				useResizeObserver(target, update);
				Vue.watch(
					() => unrefElement(target),
					ele => !ele && update()
				);
				if (windowScroll)
					useEventListener("scroll", update, { capture: true, passive: true });
				if (windowResize) useEventListener("resize", update, { passive: true });
				tryOnMounted(() => {
					if (immediate) update();
				});
				return {
					height,
					bottom,
					left,
					right,
					top,
					width,
					x,
					y,
					update
				};
			},
			useWindowSize(options = {}) {
				const {
					initialWidth = Infinity,
					initialHeight = Infinity,
					listenOrientation = true,
					includeScrollbar = true
				} = options;
				const width = Vue.ref(initialWidth);
				const height = Vue.ref(initialHeight);
				const update = () => {
					if (defaultWindow) {
						if (includeScrollbar) {
							width.value = defaultWindow.innerWidth;
							height.value = defaultWindow.innerHeight;
						} else {
							width.value = defaultWindow.document.documentElement.clientWidth;
							height.value = defaultWindow.document.documentElement.clientHeight;
						}
					}
				};
				update();
				tryOnMounted(update);
				useEventListener("resize", update, { passive: true });
				if (listenOrientation)
					useEventListener("orientationchange", update, { passive: true });
				return { width, height };
			},
			normalizeComponent(
				scriptExports,
				render,
				staticRenderFns,
				functionalTemplate,
				injectStyles,
				scopeId,
				moduleIdentifier,
				shadowMode
			) {
				var options =
					typeof scriptExports === "function" ? scriptExports.options : scriptExports;
				if (render) {
					options.render = render;
					options.staticRenderFns = staticRenderFns;
					options._compiled = true;
				}
				if (functionalTemplate) {
					options.functional = true;
				}
				if (scopeId) {
					options._scopeId = "data-v-" + scopeId;
				}
				var hook;
				if (moduleIdentifier) {
					hook = function (context) {
						context =
							context ||
							(this.$vnode && this.$vnode.ssrContext) ||
							(this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext);
						if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
							context = __VUE_SSR_CONTEXT__;
						}
						if (injectStyles) {
							injectStyles.call(this, context);
						}
						if (context && context._registeredComponents) {
							context._registeredComponents.add(moduleIdentifier);
						}
					};
					options._ssrRegister = hook;
				} else if (injectStyles) {
					hook = shadowMode
						? function () {
								injectStyles.call(
									this,
									(options.functional ? this.parent : this).$root.$options
										.shadowRoot
								);
							}
						: injectStyles;
				}
				if (hook) {
					if (options.functional) {
						options._injectStyles = hook;
						var originalRender = options.render;
						options.render = function renderWithStyleInjection(h, context) {
							hook.call(context);
							return originalRender(h, context);
						};
					} else {
						var existing = options.beforeCreate;
						options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
					}
				}
				return {
					exports: scriptExports,
					options
				};
			}
		};
		PRIVATE_GLOBAL._xUtils = _xUtils;
	})();
	/*****************************************/
}
</script>
