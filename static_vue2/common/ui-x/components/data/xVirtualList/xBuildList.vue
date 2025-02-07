<script lang="ts">
export default async function () {
	const { max, floor } = Math;
	const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;

	const ACCESS_SIZER_KEY_MAP = {
		column: "columnWidth",
		row: "rowHeight"
	};
	const ACCESS_LAST_VISITED_KEY_MAP = {
		column: "lastVisitedColumnIndex",
		row: "lastVisitedRowIndex"
	};
	const getItemFromCache = (props, index, gridCache, type) => {
		const [cachedItems, sizer, lastVisited] = [
			gridCache[type],
			props[ACCESS_SIZER_KEY_MAP[type]],
			gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]
		];

		let offset = 0;
		if (lastVisited >= 0) {
			const item = cachedItems[lastVisited];
			offset = item.offset + item.size;
		}
		for (let i = lastVisited + 1; i <= index; i++) {
			console.log("🚀 ~ getItemFromCache ~ i:", i);
			/* getColumnWidth getRowHeight*/
			const size = sizer(i);
			cachedItems[i] = { offset, size };
			offset += size;
		}
		gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]] = index;
		return cachedItems[index];
	};

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
	const LTR = "ltr";
	const RTL = "rtl";
	const RTL_OFFSET_NAG = "negative";
	const RTL_OFFSET_POS_ASC = "positive-ascending";
	const RTL_OFFSET_POS_DESC = "positive-descending";
	const ScrollbarDirKey = { [HORIZONTAL]: "left", [VERTICAL]: "top" };
	const SCROLLBAR_MIN_SIZE = 20;
	const LayoutKeys = {
		[HORIZONTAL]: "deltaX",
		[VERTICAL]: "deltaY"
	};

	const getScrollDir = (prev, cur) => (prev < cur ? FORWARD : BACKWARD);

	const isHorizontal = dir => dir === LTR || dir === RTL || dir === HORIZONTAL;

	const getOffset = (
		{ height, total: total2, itemSize: itemSize2, layout: layout2, width },
		index,
		alignment,
		scrollOffset
	) => {
		debugger;
		const size = isHorizontal(layout2) ? width : height;
		const lastItemOffset = Math.max(0, total2 * itemSize2 - size);
		const maxOffset = Math.min(lastItemOffset, index * itemSize2);
		const minOffset = Math.max(0, (index + 1) * itemSize2 - size);
		if (alignment === SMART_ALIGNMENT) {
			if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
				alignment = AUTO_ALIGNMENT;
			} else {
				alignment = CENTERED_ALIGNMENT;
			}
		}
		switch (alignment) {
			case START_ALIGNMENT: {
				return maxOffset;
			}
			case END_ALIGNMENT: {
				return minOffset;
			}
			case CENTERED_ALIGNMENT: {
				const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
				if (middleOffset < Math.ceil(size / 2)) {
					return 0;
				} else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
					return lastItemOffset;
				} else {
					return middleOffset;
				}
			}
			case AUTO_ALIGNMENT:
			default: {
				if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
					return scrollOffset;
				} else if (scrollOffset < minOffset) {
					return minOffset;
				} else {
					return maxOffset;
				}
			}
		}
	};

	let cachedRTLResult = null;
	function getRTLOffsetType(recalculate = false) {
		if (cachedRTLResult === null || recalculate) {
			const outerDiv = document.createElement("div");
			const outerStyle = outerDiv.style;
			outerStyle.width = "50px";
			outerStyle.height = "50px";
			outerStyle.overflow = "scroll";
			outerStyle.direction = "rtl";
			const innerDiv = document.createElement("div");
			const innerStyle = innerDiv.style;
			innerStyle.width = "100px";
			innerStyle.height = "100px";
			outerDiv.appendChild(innerDiv);
			document.body.appendChild(outerDiv);
			if (outerDiv.scrollLeft > 0) {
				cachedRTLResult = RTL_OFFSET_POS_DESC;
			} else {
				outerDiv.scrollLeft = 1;
				if (outerDiv.scrollLeft === 0) {
					cachedRTLResult = RTL_OFFSET_NAG;
				} else {
					cachedRTLResult = RTL_OFFSET_POS_ASC;
				}
			}
			document.body.removeChild(outerDiv);
			return cachedRTLResult;
		}
		return cachedRTLResult;
	}

	const useWheel = ({ atEndEdge, atStartEdge, layout: layout2 }, onWheelDelta) => {
		let frameHandle;
		let offset = 0;
		const hasReachedEdge = offset2 => {
			const edgeReached =
				(offset2 < 0 && atStartEdge.value) || (offset2 > 0 && atEndEdge.value);
			return edgeReached;
		};
		const onWheel = e => {
			_xUtils.cAF(frameHandle);
			const newOffset = e[LayoutKeys[layout2.value]];
			if (hasReachedEdge(offset) && hasReachedEdge(offset + newOffset)) return;
			offset += newOffset;
			if (!_.$isFirefox()) {
				e.preventDefault();
			}
			frameHandle = _xUtils.rAF(() => {
				onWheelDelta(offset);
				offset = 0;
			});
		};
		return {
			hasReachedEdge,
			onWheel
		};
	};

	const createList = ({
		name,
		getOffset,
		getItemSize,
		getItemOffset,
		getEstimatedTotalSize,
		getStartIndexForOffset,
		getStopIndexForStartIndex,
		initCache,
		clearCache,
		validateProps
	}) => {
		return defineComponent({
			name: name || "ElVirtualList",
			props: _xUtils.virtualizedListProps,
			emits: [ITEM_RENDER_EVT, SCROLL_EVT],
			components: {
				/* 循环引用 => 异步加载 */
				ComponentVirtualScrollBar: () =>
					_.$importVue(
						"/common/ui-x/components/data/xTableVir/ComponentVirtualScrollBar.vue"
					)
			},
			setup(props, { emit, expose }) {
				validateProps(props);
				const instance = getCurrentInstance();
				const ns_vl = _xUtils.useNamespace("vl");
				const dynamicSizeCache = ref(initCache(props, instance));
				const getItemStyleCache = _xUtils.useCache();
				const windowRef = ref();
				const innerRef = ref();
				const scrollbarRef = ref();
				const states = ref({
					isScrolling: false,
					/* 滚动方向 */
					scrollDir: "forward",
					scrollOffset: _.isNumber(props.initScrollOffset) ? props.initScrollOffset : 0,
					updateRequested: false,
					isScrollbarDragging: false,
					scrollbarAlwaysOn: props.scrollbarAlwaysOn
				});
				const itemsToRender = computed(() => {
					const { total: total2, cache: cache2 } = props;
					const { isScrolling, scrollDir, scrollOffset } = unref(states);
					if (total2 === 0) {
						return [0, 0, 0, 0];
					}
					const startIndex = getStartIndexForOffset(
						props,
						scrollOffset,
						unref(dynamicSizeCache)
					);
					const stopIndex = getStopIndexForStartIndex(
						props,
						startIndex,
						scrollOffset,
						unref(dynamicSizeCache)
					);
					const cacheBackward =
						!isScrolling || scrollDir === BACKWARD ? Math.max(1, cache2) : 1;
					const cacheForward =
						!isScrolling || scrollDir === FORWARD ? Math.max(1, cache2) : 1;
					return [
						Math.max(0, startIndex - cacheBackward),
						Math.max(0, Math.min(total2 - 1, stopIndex + cacheForward)),
						startIndex,
						stopIndex
					];
				});
				const estimatedTotalSize = computed(() =>
					getEstimatedTotalSize(props, unref(dynamicSizeCache))
				);
				const _isHorizontal = computed(() => isHorizontal(props.layout));
				const windowStyle = computed(() => [
					{
						position: "relative",
						[`overflow-${_isHorizontal.value ? "x" : "y"}`]: "scroll",
						WebkitOverflowScrolling: "touch",
						willChange: "transform"
					},
					{
						direction: props.direction,
						height: _.isNumber(props.height) ? `${props.height}px` : props.height,
						width: _.isNumber(props.width) ? `${props.width}px` : props.width
					},
					props.style
				]);
				const innerStyle = computed(() => {
					const size = unref(estimatedTotalSize);
					const horizontal = unref(_isHorizontal);
					return {
						height: horizontal ? "100%" : `${size}px`,
						pointerEvents: unref(states).isScrolling ? "none" : void 0,
						width: horizontal ? `${size}px` : "100%"
					};
				});
				const clientSize = computed(() =>
					_isHorizontal.value ? props.width : props.height
				);
				const { onWheel } = useWheel(
					{
						atStartEdge: computed(() => states.value.scrollOffset <= 0),
						atEndEdge: computed(
							() => states.value.scrollOffset >= estimatedTotalSize.value
						),
						layout: computed(() => props.layout)
					},
					offset => {
						var _a2, _b;
						(_b = (_a2 = scrollbarRef.value).onMouseUp) == null ? void 0 : _b.call(_a2);
						scrollTo(
							Math.min(
								states.value.scrollOffset + offset,
								estimatedTotalSize.value - clientSize.value
							)
						);
					}
				);
				const emitEvents = () => {
					const { total: total2 } = props;
					if (total2 > 0) {
						const [cacheStart, cacheEnd, visibleStart, visibleEnd] =
							unref(itemsToRender);
						emit(ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd);
					}
					const { scrollDir, scrollOffset, updateRequested } = unref(states);
					emit(SCROLL_EVT, scrollDir, scrollOffset, updateRequested);
				};
				const scrollVertically = e => {
					const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
					const _states = unref(states);
					if (_states.scrollOffset === scrollTop) {
						return;
					}
					const scrollOffset = Math.max(
						0,
						Math.min(scrollTop, scrollHeight - clientHeight)
					);
					states.value = {
						..._states,
						isScrolling: true,
						scrollDir: getScrollDir(_states.scrollOffset, scrollOffset),
						scrollOffset,
						updateRequested: false
					};
					nextTick(resetIsScrolling);
				};
				const scrollHorizontally = e => {
					const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
					const _states = unref(states);
					if (_states.scrollOffset === scrollLeft) {
						return;
					}
					const { direction: direction2 } = props;
					let scrollOffset = scrollLeft;
					if (direction2 === RTL) {
						switch (getRTLOffsetType()) {
							case RTL_OFFSET_NAG: {
								scrollOffset = -scrollLeft;
								break;
							}
							case RTL_OFFSET_POS_DESC: {
								scrollOffset = scrollWidth - clientWidth - scrollLeft;
								break;
							}
						}
					}
					scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
					states.value = {
						..._states,
						isScrolling: true,
						scrollDir: getScrollDir(_states.scrollOffset, scrollOffset),
						scrollOffset,
						updateRequested: false
					};
					nextTick(resetIsScrolling);
				};
				const onScroll = e => {
					unref(_isHorizontal) ? scrollHorizontally(e) : scrollVertically(e);
					emitEvents();
				};
				const onScrollbarScroll = (distanceToGo, totalSteps) => {
					const offset =
						((estimatedTotalSize.value - clientSize.value) / totalSteps) * distanceToGo;
					scrollTo(Math.min(estimatedTotalSize.value - clientSize.value, offset));
				};
				const scrollTo = offset => {
					offset = Math.max(offset, 0);
					if (offset === unref(states).scrollOffset) {
						return;
					}
					states.value = {
						...unref(states),
						scrollOffset: offset,
						scrollDir: getScrollDir(unref(states).scrollOffset, offset),
						updateRequested: true
					};
					nextTick(resetIsScrolling);
				};
				const scrollToItem = (idx, alignment = AUTO_ALIGNMENT) => {
					const { scrollOffset } = unref(states);
					idx = Math.max(0, Math.min(idx, props.total - 1));
					scrollTo(
						getOffset(props, idx, alignment, scrollOffset, unref(dynamicSizeCache))
					);
				};
				const getItemStyle = idx => {
					const { direction: direction2, itemSize: itemSize2, layout: layout2 } = props;
					const itemStyleCache = getItemStyleCache.value(
						clearCache && itemSize2,
						clearCache && layout2,
						clearCache && direction2
					);
					let style;
					if (hasOwn(itemStyleCache, String(idx))) {
						style = itemStyleCache[idx];
					} else {
						const offset = getItemOffset(props, idx, unref(dynamicSizeCache));
						const size = getItemSize(props, idx, unref(dynamicSizeCache));
						const horizontal = unref(_isHorizontal);
						const isRtl = direction2 === RTL;
						const offsetHorizontal = horizontal ? offset : 0;
						itemStyleCache[idx] = style = {
							position: "absolute",
							left: isRtl ? void 0 : `${offsetHorizontal}px`,
							right: isRtl ? `${offsetHorizontal}px` : void 0,
							top: !horizontal ? `${offset}px` : 0,
							height: !horizontal ? `${size}px` : "100%",
							width: horizontal ? `${size}px` : "100%"
						};
					}
					return style;
				};
				const resetIsScrolling = () => {
					states.value.isScrolling = false;
					nextTick(() => {
						getItemStyleCache.value(-1, null, null);
					});
				};
				const resetScrollTop = () => {
					const window2 = windowRef.value;
					if (window2) {
						window2.scrollTop = 0;
					}
				};
				onMounted(() => {
					const { initScrollOffset } = this;
					const windowElement = unref(windowRef);
					if (_.isNumber(initScrollOffset) && windowElement) {
						if (unref(_isHorizontal)) {
							windowElement.scrollLeft = initScrollOffset;
						} else {
							windowElement.scrollTop = initScrollOffset;
						}
					}
					emitEvents();
				});

				onUpdated(() => {
					const { direction, layout } = props;
					const { scrollOffset, updateRequested } = unref(states);
					const windowElement = unref(windowRef);
					if (updateRequested && windowElement) {
						if (layout === HORIZONTAL) {
							if (direction === RTL) {
								switch (getRTLOffsetType()) {
									case RTL_OFFSET_NAG: {
										windowElement.scrollLeft = -scrollOffset;
										break;
									}
									case RTL_OFFSET_POS_ASC: {
										windowElement.scrollLeft = scrollOffset;
										break;
									}
									default: {
										const { clientWidth, scrollWidth } = windowElement;
										windowElement.scrollLeft =
											scrollWidth - clientWidth - scrollOffset;
										break;
									}
								}
							} else {
								windowElement.scrollLeft = scrollOffset;
							}
						} else {
							windowElement.scrollTop = scrollOffset;
						}
					}
				});
				const api = {
					ns: ns_vl,
					clientSize,
					estimatedTotalSize,
					windowStyle,
					windowRef,
					innerRef,
					innerStyle,
					itemsToRender,
					scrollbarRef,
					states,
					getItemStyle,
					onScroll,
					onScrollbarScroll,
					onWheel,
					scrollTo,
					scrollToItem,
					resetScrollTop
				};
				expose({
					windowRef,
					innerRef,
					getItemStyleCache,
					scrollTo,
					scrollToItem,
					resetScrollTop,
					states
				});
				return api;
			},
			render() {
				const ctx = this;
				const {
					className,
					clientSize,
					containerElement,
					data,
					getItemStyle,
					innerElement,
					itemsToRender,
					innerStyle,
					layout,
					total,
					onScroll,
					onScrollbarScroll,
					onWheel,
					states,
					useIsScrolling,
					windowStyle,
					ns,
					defaultRender
				} = ctx;

				const [start, end] = itemsToRender;
				const Container = containerElement;
				const Inner = innerElement;
				const children = [];
				if (total > 0) {
					for (let i = start; i <= end; i++) {
						children.push(
							defaultRender({
								data,
								key: i,
								index: i,
								isScrolling: useIsScrolling ? states.isScrolling : void 0,
								style: getItemStyle(i)
							})
						);
					}
				}
				const InnerNode = [
					h(
						Inner,
						{
							style: innerStyle,
							ref: "innerRef"
						},
						!_.isString(Inner)
							? {
									default: () => children
								}
							: children
					)
				];
				const scrollProps = {
					ref: "scrollbarRef",
					clientSize,
					layout: layout,
					onScroll: onScrollbarScroll,
					ratio: (clientSize * 100) / this.estimatedTotalSize,
					scrollFrom: states.scrollOffset / (this.estimatedTotalSize - clientSize),
					total: total
				};
				const scrollbar = h("ComponentVirtualScrollBar", scrollProps);
				const listContainer = h(
					Container,
					{
						class: [ns.e("window"), className],
						style: windowStyle,
						onScroll,
						onWheel,
						ref: "windowRef",
						key: 0
					},
					_.isString(Container) ? [InnerNode] : { default: () => [InnerNode] }
				);
				return h(
					"div",
					{
						key: 0,
						class: [ns.e("wrapper"), states.scrollbarAlwaysOn ? "always-on" : ""]
					},
					[listContainer, scrollbar]
				);
			}
		});
	};

	const createGrid = ({
		name,
		clearCache,
		getColumnPosition,
		getColumnStartIndexForOffset,
		getColumnStopIndexForStartIndex,
		getEstimatedTotalHeight,
		getEstimatedTotalWidth,
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
			props: _xUtils.virtualizedGridProps,
			emits: [ITEM_RENDER_EVT, SCROLL_EVT],
			components: {
				/* 循环引用 => 异步加载 */
				ComponentVirtualScrollBar: () =>
					_.$importVue(
						"/common/ui-x/components/data/xTableVir/ComponentVirtualScrollBar.vue"
					)
			},
			setup(props, { emit, expose, slots }) {
				const ns = _xUtils.useNamespace("vl");
				validateProps(props);
				const instance = getCurrentInstance();
				const cache2 = ref(initCache(props, instance));
				injectToInstance?.(instance, cache2);
				const inject_xTableVir = inject("inject_xTableVir");
				/* 一帧 16ms */
				const EXPERIENCE_VALUE = 18;
				/** 动态列表高度变化后触发重新计算高度 */
				inject_xTableVir.updateTableByScroll = _.debounce(() => {
					/* 如果不是动态高度，就不需要重新计算， */
					if (!inject_xTableVir.isDynamic) {
						return;
					}
					const pos = {
						scrollLeft: states.value.scrollLeft,
						scrollTop: states.value.scrollTop,
						isForce: true
					};

					const _pos = {
						...pos
					};

					pos.scrollLeft++;
					pos.scrollTop++;

					scrollTo(pos);
					setTimeout(() => {
						scrollTo(_pos);
					}, EXPERIENCE_VALUE);
				}, EXPERIENCE_VALUE);

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
				const getItemStyleCache = _xUtils.useCache();
				const parsedHeight = computed(() => Number.parseInt(`${props.height}`, 10));
				const parsedWidth = computed(() => Number.parseInt(`${props.width}`, 10));
				const columnsToRender = computed(() => {
					const { totalColumn, totalRow, columnCache } = props;
					const { isScrolling, xAxisScrollDir, scrollLeft } = unref(states);
					if (totalColumn === 0 || totalRow === 0) {
						return [0, 0, 0, 0];
					}
					const startIndex = getColumnStartIndexForOffset(
						props,
						scrollLeft,
						unref(cache2)
					);
					const stopIndex = getColumnStopIndexForStartIndex(
						props,
						startIndex,
						scrollLeft,
						unref(cache2)
					);
					const cacheBackward =
						!isScrolling || xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
					const cacheForward =
						!isScrolling || xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;
					return [
						Math.max(0, startIndex - cacheBackward),
						Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)),
						startIndex,
						stopIndex
					];
				});
				const rowsToRender = computed(() => {
					const { totalColumn, totalRow, rowCache } = props;
					const { isScrolling, yAxisScrollDir, scrollTop } = unref(states);
					if (totalColumn === 0 || totalRow === 0) {
						return [0, 0, 0, 0];
					}
					const startIndex = getRowStartIndexForOffset(props, scrollTop, unref(cache2));
					const stopIndex = getRowStopIndexForStartIndex(
						props,
						startIndex,
						scrollTop,
						unref(cache2)
					);
					const cacheBackward =
						!isScrolling || yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
					const cacheForward =
						!isScrolling || yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;
					return [
						Math.max(0, startIndex - cacheBackward),
						Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)),
						startIndex,
						stopIndex
					];
				});
				const estimatedTotalHeight = computed(() =>
					getEstimatedTotalHeight(props, unref(cache2))
				);
				const estimatedTotalWidth = computed(() =>
					getEstimatedTotalWidth(props, unref(cache2))
				);
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
					props.styleV2 || {}
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
						const [
							columnCacheStart,
							columnCacheEnd,
							columnVisibleStart,
							columnVisibleEnd
						] = unref(columnsToRender);
						const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] =
							unref(rowsToRender);
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
					const {
						scrollLeft,
						scrollTop,
						updateRequested,
						xAxisScrollDir,
						yAxisScrollDir
					} = unref(states);
					emit(SCROLL_EVT, {
						xAxisScrollDir,
						scrollLeft,
						yAxisScrollDir,
						scrollTop,
						updateRequested
					});
				};
				const onScroll = e => {
					const {
						clientHeight,
						clientWidth,
						scrollHeight,
						scrollLeft,
						scrollTop,
						scrollWidth
					} = e.currentTarget;
					const _states = unref(states);
					if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) {
						return;
					}
					let _scrollLeft = scrollLeft;
					if (_xUtils.isRTL(props.direction)) {
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
				const { onWheel } = _xUtils.useGridWheel(
					{
						atXStartEdge: computed(() => states.value.scrollLeft <= 0),
						atXEndEdge: computed(
							() =>
								states.value.scrollLeft >=
								estimatedTotalWidth.value - unref(parsedWidth)
						),
						atYStartEdge: computed(() => states.value.scrollTop <= 0),
						atYEndEdge: computed(
							() =>
								states.value.scrollTop >=
								estimatedTotalHeight.value - unref(parsedHeight)
						)
					},
					(x, y) => {
						hScrollbar.value?.onMouseUp?.();
						vScrollbar.value?.onMouseUp?.();
						const width = unref(parsedWidth);
						const height = unref(parsedHeight);
						scrollTo({
							scrollLeft: Math.min(
								states.value.scrollLeft + x,
								estimatedTotalWidth.value - width
							),
							scrollTop: Math.min(
								states.value.scrollTop + y,
								estimatedTotalHeight.value - height
							)
						});
					}
				);
				const scrollTo = ({
					scrollLeft = states.value.scrollLeft,
					scrollTop = states.value.scrollTop,
					isForce = false
				}) => {
					scrollLeft = Math.max(scrollLeft, 0);
					scrollTop = Math.max(scrollTop, 0);
					const _states = unref(states);
					if (
						!isForce &&
						scrollTop === _states.scrollTop &&
						scrollLeft === _states.scrollLeft
					) {
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
					const scrollBarWidth2 = _xUtils.getScrollBarWidth(ns.namespace.value);
					const _cache = unref(cache2);
					const estimatedHeight = getEstimatedTotalHeight(props, _cache);
					const estimatedWidth = getEstimatedTotalWidth(props, _cache);

					scrollTo({
						scrollLeft: getColumnOffset(
							props,
							columnIdx,
							alignment,
							_states.scrollLeft,
							_cache,
							estimatedWidth > props.width ? scrollBarWidth2 : 0
						),
						scrollTop: getRowOffset(
							props,
							rowIndex,
							alignment,
							_states.scrollTop,
							_cache,
							estimatedHeight > props.height ? scrollBarWidth2 : 0
						)
					});
				};
				const getItemStyle = (rowIndex, columnIndex) => {
					const { columnWidth, direction: direction2, rowHeight } = props;

					const itemStyleCache = getItemStyleCache.value(
						clearCache && columnWidth,
						clearCache && rowHeight,
						clearCache && direction2
					);
					const key = `${rowIndex},${columnIndex}`;
					if (hasOwn(itemStyleCache, key)) {
						return itemStyleCache[key];
					} else {
						const [, left] = getColumnPosition(props, columnIndex, unref(cache2));
						const _cache = unref(cache2);
						const rtl = _xUtils.isRTL(direction2);
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
									windowElement.scrollLeft =
										scrollWidth - clientWidth - scrollLeft;
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
					const {
						scrollbarAlwaysOn,
						scrollbarStartGap,
						scrollbarEndGap,
						totalColumn,
						totalRow
					} = props;
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
										isScrolling: useIsScrolling
											? unref(states).isScrolling
											: void 0,
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
							(() => {
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
							class: `${ns.e("wrapper")} render-window-${Container}`,
							role: props.role
						},
						[
							h(
								Container,
								{
									class: props.classV2,
									style: unref(windowStyle),
									onScroll,
									onWheel,
									ref: windowRef
								},
								(() => {
									if (_.isString(Container)) {
										return Inner;
									} else {
										return { default: () => Inner };
									}
								})()
							),
							horizontalScrollbar,
							verticalScrollbar
						]
					);
				};
				return renderWindow;
			}
		});
	};

	const bs = (props, gridCache, low, high, offset, type) => {
		while (low <= high) {
			const mid = low + floor((high - low) / 2);
			const currentOffset = getItemFromCache(props, mid, gridCache, type).offset;
			if (currentOffset === offset) {
				return mid;
			} else if (currentOffset < offset) {
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}
		return max(0, low - 1);
	};

	const es = (props, gridCache, idx, offset, type) => {
		const total2 = type === "column" ? props.totalColumn : props.totalRow;
		let exponent = 1;
		while (idx < total2 && getItemFromCache(props, idx, gridCache, type).offset < offset) {
			idx += exponent;
			exponent *= 2;
		}
		return bs(props, gridCache, floor(idx / 2), min(idx, total2 - 1), offset, type);
	};

	const findItem = (props, gridCache, offset, type) => {
		const [cache2, lastVisitedIndex] = [
			gridCache[type],
			gridCache[ACCESS_LAST_VISITED_KEY_MAP[type]]
		];
		const lastVisitedItemOffset = lastVisitedIndex > 0 ? cache2[lastVisitedIndex].offset : 0;
		if (lastVisitedItemOffset >= offset) {
			return bs(props, gridCache, 0, lastVisitedIndex, offset, type);
		}
		return es(props, gridCache, max(0, lastVisitedIndex), offset, type);
	};

	const getEstimatedTotalHeight = (
		{ totalRow },
		{ estimatedRowHeight, lastVisitedRowIndex, row }
	) => {
		let sizeOfVisitedRows = 0;
		if (lastVisitedRowIndex >= totalRow) {
			lastVisitedRowIndex = totalRow - 1;
		}
		if (lastVisitedRowIndex >= 0) {
			const item = row[lastVisitedRowIndex];
			sizeOfVisitedRows = item.offset + item.size;
		}
		const unvisitedItems = totalRow - lastVisitedRowIndex - 1;
		const sizeOfUnvisitedItems = unvisitedItems * estimatedRowHeight;
		return sizeOfVisitedRows + sizeOfUnvisitedItems;
	};
	const getEstimatedTotalWidth = (
		{ totalColumn },
		{ column, estimatedColumnWidth, lastVisitedColumnIndex }
	) => {
		let sizeOfVisitedColumns = 0;
		if (lastVisitedColumnIndex > totalColumn) {
			lastVisitedColumnIndex = totalColumn - 1;
		}
		if (lastVisitedColumnIndex >= 0) {
			const item = column[lastVisitedColumnIndex];
			sizeOfVisitedColumns = item.offset + item.size;
		}
		const unvisitedItems = totalColumn - lastVisitedColumnIndex - 1;
		const sizeOfUnvisitedItems = unvisitedItems * estimatedColumnWidth;
		return sizeOfVisitedColumns + sizeOfUnvisitedItems;
	};

	let scrollBarWidth;

	const isClient = typeof window !== "undefined";

	const getScrollBarWidth = namespace => {
		var _a2;
		if (!isClient) return 0;
		if (scrollBarWidth !== void 0) return scrollBarWidth;
		const outer = document.createElement("div");
		outer.className = `${namespace}-scrollbar__wrap`;
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.position = "absolute";
		outer.style.top = "-9999px";
		document.body.appendChild(outer);
		const widthNoScroll = outer.offsetWidth;
		outer.style.overflow = "scroll";
		const inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);
		const widthWithScroll = inner.offsetWidth;
		(_a2 = outer.parentNode) == null ? void 0 : _a2.removeChild(outer);
		scrollBarWidth = widthNoScroll - widthWithScroll;
		return scrollBarWidth;
	};

	return {
		createList,
		createGrid,
		getScrollDir,
		getScrollBarWidth,
		getItemFromCache,
		getOffset,
		getRTLOffsetType,
		useWheel,
		isHorizontal,
		findItem,
		getEstimatedTotalHeight,
		getEstimatedTotalWidth,
		/*  */
		DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
		SMART_ALIGNMENT,
		AUTO_ALIGNMENT,
		CENTERED_ALIGNMENT,
		START_ALIGNMENT,
		END_ALIGNMENT
	};
}
</script>
