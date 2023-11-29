<script>
export default async function () {
	const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
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
							valid ||= allowedValues.includes(val);
						}
						if (validator) valid ||= validator(val);
						if (!valid && allowedValues.length > 0) {
							const allowValuesText = [...new Set(allowedValues)].map(value => JSON.stringify(value)).join(", ");
							warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
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
	const mutable = val => val;

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
		return fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option, key)]));
	};
	const definePropType = val => val;
	const defaultNamespace = "el";
	const namespaceContextKey = Symbol("namespaceContextKey");
	const useGetDerivedNamespace = namespaceOverrides => {
		const derivedNamespace = namespaceOverrides || inject(namespaceContextKey, ref(defaultNamespace));
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
		const be = (blockSuffix, element) => (blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "");
		const em = (element, modifier) => (element && modifier ? _bem(namespace.value, block, "", element, modifier) : "");
		const bm = (blockSuffix, modifier) => (blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "");
		const bem = (blockSuffix, element, modifier) => (blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "");
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
		default: () => mutable([])
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
			default: () => mutable([])
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
			default: 50
		},
		rowWidth: requiredNumberType,
		rowHeight: {
			type: Number,
			default: 50
		},
		height: requiredNumberType,
		width: requiredNumberType
	});

	var columnsStyles = {
		type: definePropType(Object),
		required: true
	};

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
			const { columns: columns2, onRowHeightChange, rowKey: rowKey2, rowIndex, style } = props;
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
			const { onRowExpand, rowData, rowIndex, rowKey: rowKey2 } = props;
			onRowExpand?.({
				expanded,
				rowData,
				rowIndex,
				rowKey: rowKey2
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

	const createGrid = ({
		name,
		clearCache,
		getColumnPosition,
		getColumnStartIndexForOffset,
		getColumnStopIndexForStartIndex,
		getEstimatedTotalHeight: getEstimatedTotalHeight2,
		getEstimatedTotalWidth: getEstimatedTotalWidth2,
		getColumnOffset,
		getRowOffset,
		getRowPosition,
		getRowStartIndexForOffset,
		getRowStopIndexForStartIndex,
		initCache,
		injectToInstance,
		validateProps
	}) => {
		return defineComponent({
			name: name || "ElVirtualList",
			props: virtualizedGridProps,
			emits: [ITEM_RENDER_EVT, SCROLL_EVT],
			components: {
				/* 循环引用 => 异步加载 */
				ComponentVirtualScrollBar: () => _.$importVue("/common/ui-x/components/data/xTableVir/ComponentVirtualScrollBar.vue")
			},
			setup(props, { emit, expose, slots }) {
				const ns = useNamespace("vl");
				validateProps(props);
				const instance = getCurrentInstance();
				const cache2 = ref(initCache(props, instance));
				injectToInstance?.(instance, cache2);
				const windowRef = ref();
				const hScrollbar = ref();
				const vScrollbar = ref();
				const innerRef = ref(null);
				const states = ref({
					isScrolling: false,
					scrollLeft: _.isNumber(props.initScrollLeft) ? props.initScrollLeft : 0,
					scrollTop: _.isNumber(props.initScrollTop) ? props.initScrollTop : 0,
					updateRequested: false,
					xAxisScrollDir: FORWARD,
					yAxisScrollDir: FORWARD
				});
				const getItemStyleCache = useCache();
				const parsedHeight = computed(() => Number.parseInt(`${props.height}`, 10));
				const parsedWidth = computed(() => Number.parseInt(`${props.width}`, 10));
				const columnsToRender = computed(() => {
					const { totalColumn, totalRow, columnCache } = props;
					const { isScrolling, xAxisScrollDir, scrollLeft } = unref(states);
					if (totalColumn === 0 || totalRow === 0) {
						return [0, 0, 0, 0];
					}
					const startIndex = getColumnStartIndexForOffset(props, scrollLeft, unref(cache2));
					const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, unref(cache2));
					const cacheBackward = !isScrolling || xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
					const cacheForward = !isScrolling || xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;
					return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)), startIndex, stopIndex];
				});
				const rowsToRender = computed(() => {
					const { totalColumn, totalRow, rowCache } = props;
					const { isScrolling, yAxisScrollDir, scrollTop } = unref(states);
					if (totalColumn === 0 || totalRow === 0) {
						return [0, 0, 0, 0];
					}
					const startIndex = getRowStartIndexForOffset(props, scrollTop, unref(cache2));
					const stopIndex = getRowStopIndexForStartIndex(props, startIndex, scrollTop, unref(cache2));
					const cacheBackward = !isScrolling || yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
					const cacheForward = !isScrolling || yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;
					return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)), startIndex, stopIndex];
				});
				const estimatedTotalHeight = computed(() => getEstimatedTotalHeight2(props, unref(cache2)));
				const estimatedTotalWidth = computed(() => getEstimatedTotalWidth2(props, unref(cache2)));
				const windowStyle = computed(() => [
					{
						position: "relative",
						overflow: "hidden",
						WebkitOverflowScrolling: "touch",
						willChange: "transform"
					},
					{
						direction: props.direction,
						height: _.isNumber(props.height) ? `${props.height}px` : props.height,
						width: _.isNumber(props.width) ? `${props.width}px` : props.width
					},
					props.styleV2 ?? {}
				]);
				const innerStyle = computed(() => {
					const width = `${unref(estimatedTotalWidth)}px`;
					const height = `${unref(estimatedTotalHeight)}px`;
					return {
						height,
						pointerEvents: unref(states).isScrolling ? "none" : void 0,
						width
					};
				});
				const emitEvents = () => {
					const { totalColumn, totalRow } = props;
					if (totalColumn > 0 && totalRow > 0) {
						const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = unref(columnsToRender);
						const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = unref(rowsToRender);
						emit(ITEM_RENDER_EVT, {
							columnCacheStart,
							columnCacheEnd,
							rowCacheStart,
							rowCacheEnd,
							columnVisibleStart,
							columnVisibleEnd,
							rowVisibleStart,
							rowVisibleEnd
						});
					}
					const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = unref(states);
					emit(SCROLL_EVT, {
						xAxisScrollDir,
						scrollLeft,
						yAxisScrollDir,
						scrollTop,
						updateRequested
					});
				};
				const onScroll = e => {
					const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget;
					const _states = unref(states);
					if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) {
						return;
					}
					let _scrollLeft = scrollLeft;
					if (isRTL(props.direction)) {
						switch (getRTLOffsetType()) {
							case RTL_OFFSET_NAG:
								_scrollLeft = -scrollLeft;
								break;
							case RTL_OFFSET_POS_DESC:
								_scrollLeft = scrollWidth - clientWidth - scrollLeft;
								break;
						}
					}
					states.value = {
						..._states,
						isScrolling: true,
						scrollLeft: _scrollLeft,
						scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
						updateRequested: true,
						xAxisScrollDir: getScrollDir(_states.scrollLeft, _scrollLeft),
						yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop)
					};
					nextTick(() => resetIsScrolling());
					onUpdated();
					emitEvents();
				};
				const onVerticalScroll = (distance, totalSteps) => {
					const height = unref(parsedHeight);
					const offset = ((estimatedTotalHeight.value - height) / totalSteps) * distance;
					scrollTo({
						scrollTop: Math.min(estimatedTotalHeight.value - height, offset)
					});
				};
				const onHorizontalScroll = (distance, totalSteps) => {
					const width = unref(parsedWidth);
					const offset = ((estimatedTotalWidth.value - width) / totalSteps) * distance;
					scrollTo({
						scrollLeft: Math.min(estimatedTotalWidth.value - width, offset)
					});
				};
				const { onWheel } = useGridWheel(
					{
						atXStartEdge: computed(() => states.value.scrollLeft <= 0),
						atXEndEdge: computed(() => states.value.scrollLeft >= estimatedTotalWidth.value - unref(parsedWidth)),
						atYStartEdge: computed(() => states.value.scrollTop <= 0),
						atYEndEdge: computed(() => states.value.scrollTop >= estimatedTotalHeight.value - unref(parsedHeight))
					},
					(x, y) => {
						hScrollbar.value?.onMouseUp?.();
						vScrollbar.value?.onMouseUp?.();
						const width = unref(parsedWidth);
						const height = unref(parsedHeight);
						scrollTo({
							scrollLeft: Math.min(states.value.scrollLeft + x, estimatedTotalWidth.value - width),
							scrollTop: Math.min(states.value.scrollTop + y, estimatedTotalHeight.value - height)
						});
					}
				);
				const scrollTo = ({ scrollLeft = states.value.scrollLeft, scrollTop = states.value.scrollTop }) => {
					scrollLeft = Math.max(scrollLeft, 0);
					scrollTop = Math.max(scrollTop, 0);
					const _states = unref(states);
					if (scrollTop === _states.scrollTop && scrollLeft === _states.scrollLeft) {
						return;
					}
					states.value = {
						..._states,
						xAxisScrollDir: getScrollDir(_states.scrollLeft, scrollLeft),
						yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop),
						scrollLeft,
						scrollTop,
						updateRequested: true
					};
					nextTick(() => resetIsScrolling());
					onUpdated();
					emitEvents();
				};
				const scrollToItem = (rowIndex = 0, columnIdx = 0, alignment = AUTO_ALIGNMENT) => {
					const _states = unref(states);
					columnIdx = Math.max(0, Math.min(columnIdx, props.totalColumn - 1));
					rowIndex = Math.max(0, Math.min(rowIndex, props.totalRow - 1));
					const scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
					const _cache = unref(cache2);
					const estimatedHeight = getEstimatedTotalHeight2(props, _cache);
					const estimatedWidth = getEstimatedTotalWidth2(props, _cache);
					scrollTo({
						scrollLeft: getColumnOffset(props, columnIdx, alignment, _states.scrollLeft, _cache, estimatedWidth > props.width ? scrollBarWidth2 : 0),
						scrollTop: getRowOffset(props, rowIndex, alignment, _states.scrollTop, _cache, estimatedHeight > props.height ? scrollBarWidth2 : 0)
					});
				};
				const getItemStyle = (rowIndex, columnIndex) => {
					const { columnWidth, direction: direction2, rowHeight } = props;
					const itemStyleCache = getItemStyleCache.value(clearCache && columnWidth, clearCache && rowHeight, clearCache && direction2);
					const key = `${rowIndex},${columnIndex}`;
					if (hasOwn(itemStyleCache, key)) {
						return itemStyleCache[key];
					} else {
						const [, left] = getColumnPosition(props, columnIndex, unref(cache2));
						const _cache = unref(cache2);
						const rtl = isRTL(direction2);
						const [height, top] = getRowPosition(props, rowIndex, _cache);
						const [width] = getColumnPosition(props, columnIndex, _cache);
						itemStyleCache[key] = {
							position: "absolute",
							left: rtl ? void 0 : `${left}px`,
							right: rtl ? `${left}px` : void 0,
							top: `${top}px`,
							height: `${height}px`,
							width: `${width}px`
						};
						return itemStyleCache[key];
					}
				};
				const resetIsScrolling = () => {
					states.value.isScrolling = false;
					nextTick(() => {
						getItemStyleCache.value(-1, null, null);
					});
				};
				onMounted(() => {
					if (!isClient) return;
					const { initScrollLeft, initScrollTop } = props;
					const windowElement = unref(windowRef);
					if (windowElement) {
						if (_.isNumber(initScrollLeft)) {
							windowElement.scrollLeft = initScrollLeft;
						}
						if (_.isNumber(initScrollTop)) {
							windowElement.scrollTop = initScrollTop;
						}
					}
					emitEvents();
				});
				const onUpdated = () => {
					const { direction: direction2 } = props;
					const { scrollLeft, scrollTop, updateRequested } = unref(states);
					const windowElement = unref(windowRef);
					if (updateRequested && windowElement) {
						if (direction2 === RTL) {
							switch (getRTLOffsetType()) {
								case RTL_OFFSET_NAG: {
									windowElement.scrollLeft = -scrollLeft;
									break;
								}
								case RTL_OFFSET_POS_ASC: {
									windowElement.scrollLeft = scrollLeft;
									break;
								}
								default: {
									const { clientWidth, scrollWidth } = windowElement;
									windowElement.scrollLeft = scrollWidth - clientWidth - scrollLeft;
									break;
								}
							}
						} else {
							windowElement.scrollLeft = Math.max(0, scrollLeft);
						}
						windowElement.scrollTop = Math.max(0, scrollTop);
					}
				};
				const { resetAfterColumnIndex, resetAfterRowIndex, resetAfter } = instance.proxy;
				expose({
					windowRef,
					innerRef,
					getItemStyleCache,
					scrollTo,
					scrollToItem,
					states,
					resetAfterColumnIndex,
					resetAfterRowIndex,
					resetAfter
				});
				const renderScrollbars = () => {
					const { scrollbarAlwaysOn, scrollbarStartGap, scrollbarEndGap, totalColumn, totalRow } = props;
					const width = unref(parsedWidth);
					const height = unref(parsedHeight);
					const estimatedWidth = unref(estimatedTotalWidth);
					const estimatedHeight = unref(estimatedTotalHeight);
					const { scrollLeft, scrollTop } = unref(states);
					const horizontalScrollbar = h("ComponentVirtualScrollBar", {
						ref: hScrollbar,
						alwaysOn: scrollbarAlwaysOn,
						startGap: scrollbarStartGap,
						endGap: scrollbarEndGap,
						class: ns.e("horizontal"),
						clientSize: width,
						layout: "horizontal",
						onScroll: onHorizontalScroll,
						ratio: (width * 100) / estimatedWidth,
						scrollFrom: scrollLeft / (estimatedWidth - width),
						total: totalRow,
						visible: true
					});
					const verticalScrollbar = h("ComponentVirtualScrollBar", {
						ref: vScrollbar,
						alwaysOn: scrollbarAlwaysOn,
						startGap: scrollbarStartGap,
						endGap: scrollbarEndGap,
						class: ns.e("vertical"),
						clientSize: height,
						layout: "vertical",
						onScroll: onVerticalScroll,
						ratio: (height * 100) / estimatedHeight,
						scrollFrom: scrollTop / (estimatedHeight - height),
						total: totalColumn,
						visible: true
					});
					return {
						horizontalScrollbar,
						verticalScrollbar
					};
				};
				const renderItems = () => {
					const $vSlots = this.$vSlots;
					const [columnStart, columnEnd] = unref(columnsToRender);
					const [rowStart, rowEnd] = unref(rowsToRender);
					const { data, totalColumn, totalRow, useIsScrolling, itemKey } = props;
					const children = [];
					if (totalRow > 0 && totalColumn > 0) {
						for (let row = rowStart; row <= rowEnd; row++) {
							for (let column = columnStart; column <= columnEnd; column++) {
								if (_.isFunction($vSlots.default)) {
									const params = {
										columnIndex: column,
										data,
										key: itemKey({
											columnIndex: column,
											data,
											rowIndex: row
										}),
										isScrolling: useIsScrolling ? unref(states).isScrolling : void 0,
										style: getItemStyle(row, column),
										rowIndex: row
									};
									const child = $vSlots.default(params);
									children.push(child);
								}
							}
						}
					}
					return children;
				};
				const renderInner = () => {
					const Inner = props.innerElement;
					const children = renderItems();
					return [
						createEmptyVNode("renderInner: " + Inner),
						h(
							Inner,
							{
								style: unref(innerStyle),
								ref: innerRef
							},
							(function () {
								if (_.isString(Inner)) {
									return children;
								} else {
									return { default: () => children };
								}
							})()
						),
						createEmptyVNode("renderInner: " + Inner)
					];
				};
				const renderWindow = () => {
					const Container = props.containerElement;
					const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();
					const Inner = renderInner();
					return h(
						"div",
						{
							key: 0,
							class: ns.e("wrapper"),
							role: props.role
						},
						[
							createEmptyVNode("renderWindow: " + Container),
							h(
								Container,
								{
									class: props.classV2,
									style: unref(windowStyle),
									onScroll,
									onWheel,
									ref: windowRef
								},
								(function () {
									if (_.isString(Container)) {
										return Inner;
									} else {
										return { default: () => Inner };
									}
								})()
							),
							createEmptyVNode("renderWindow: " + Container),
							horizontalScrollbar,
							verticalScrollbar
						]
					);
				};
				return renderWindow;
			}
		});
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
			if (hasReachedEdge(xOffset, yOffset) && hasReachedEdge(xOffset + x, yOffset + y)) return;
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
	const enforceUnit = style => {
		if (_.isArray(style)) {
			style = _.merge.apply(_, [{}, ...style]);
		}
		["width", "maxWidth", "minWidth", "height"].forEach(key => {
			style[key] = addUnit(style[key]);
		});
		return style;
	};
	const componentToSlot = ComponentLike => (isVNode(ComponentLike) ? props => h(ComponentLike, props) : ComponentLike);

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
		if (getCurrentScope()) {
			onScopeDispose(fn);
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

	const defaultWindow = isClient ? window : void 0;

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
				cleanup();
				if (!el) return;
				el.addEventListener(event, listener, options);
				cleanup = () => {
					el.removeEventListener(event, listener, options);
					cleanup = noop;
				};
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
				const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(entry.target);
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

	const autoResizerProps = buildProps({
		disableWidth: Boolean,
		disableHeight: Boolean,
		onResize: {
			type: definePropType(Function)
		}
	});

	var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
	var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
	var __objRest = (source, exclude) => {
		var target = {};
		for (var prop in source) if (hasOwnProperty.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
		if (source != null && __getOwnPropSymbols$f)
			for (var prop of __getOwnPropSymbols$f(source)) {
				if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop)) target[prop] = source[prop];
			}
		return target;
	};

	/*****************************************/
	Vue._useXui = {
		globalConfigs: {},
		resolveUnref,
		identity,
		tryOnScopeDispose,
		tryOnMounted,
		unrefElement,
		useEventListener,
		useSupported,
		autoResizerProps,
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
		createGrid,
		noop,
		mutable,
		ScrollbarDirKey,
		renderThumbStyle,
		/* **************** */
		definePropType,
		buildProp,
		buildProps,
		columns,
		virtualizedScrollbarProps,
		virtualizedGridProps,
		tableV2HeaderProps,
		tableV2GridProps,
		tableV2Props,
		/* ************** */
		ITEM_RENDER_EVT,
		SCROLLBAR_MIN_SIZE,
		DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
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
		RTL_OFFSET_POS_DESC
	};
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
