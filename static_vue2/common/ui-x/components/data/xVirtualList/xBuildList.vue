<script lang="ts">
export default async function () {
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

	return {
		createList,
		getScrollDir,
		isHorizontal,
		getRTLOffsetType,
		useWheel,
		SMART_ALIGNMENT,
		AUTO_ALIGNMENT,
		CENTERED_ALIGNMENT,
		START_ALIGNMENT,
		END_ALIGNMENT
	};
}
</script>
