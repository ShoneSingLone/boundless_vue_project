<script lang="ts">
export default async function () {
	const { addResizeListener, removeResizeListener } =
		await _.$importVue("/common/utils/utils.vue");

	return defineComponent({
		name: "TabNav",
		components: {
			xTabBar: () => _.$importVue("/common/ui-x/components/navigation/xTabs/xTabBar.vue")
		},
		inject: ["rootTabs"],
		props: {
			panes: Array,
			currentName: [String, Number],
			editable: Boolean,
			onTabClick: {
				type: Function,
				default: _.$doNoting
			},
			onTabRemove: {
				type: Function,
				default: _.$doNoting
			},
			type: String,
			stretch: Boolean
		},
		data() {
			return {
				scrollable: false,
				navOffset: 0,
				isFocus: false,
				focusable: true
			};
		},
		computed: {
			cptClassTabsNav() {
				return [
					"el-tabs__nav x-tabs__nav",
					`is-${this.rootTabs.tabPosition}`,
					{
						"is-stretch":
							this.stretch && ["top", "bottom"].includes(this.rootTabs.tabPosition)
					}
				];
			},
			renderHeaderOpr() {
				if (this.rootTabs?.slotHeaderOpr) {
					return this.rootTabs.slotHeaderOpr;
				} else {
					return () => null;
				}
			},
			navStyle() {
				const dir = ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "X" : "Y";
				return {
					transform: `translate${dir}(-${this.navOffset}px)`
				};
			},
			sizeName() {
				return ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1
					? "width"
					: "height";
			}
		},

		methods: {
			scrollPrev() {
				const containerSize =
					this.$refs.navScroll[`offset${_.$firstUpperCase(this.sizeName)}`];
				const currentOffset = this.navOffset;

				if (!currentOffset) return;

				let newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;

				this.navOffset = newOffset;
			},
			scrollNext() {
				const navSize = this.$refs.nav[`offset${_.$firstUpperCase(this.sizeName)}`];
				const containerSize =
					this.$refs.navScroll[`offset${_.$firstUpperCase(this.sizeName)}`];
				const currentOffset = this.navOffset;

				if (navSize - currentOffset <= containerSize) return;

				let newOffset =
					navSize - currentOffset > containerSize * 2
						? currentOffset + containerSize
						: navSize - containerSize;

				this.navOffset = newOffset;
			},
			scrollToActiveTab() {
				if (!this.scrollable) return;
				const nav = this.$refs.nav;
				const activeTab = this.$el.querySelector(".is-active");
				if (!activeTab) return;
				const navScroll = this.$refs.navScroll;
				const isHorizontal = ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1;
				const activeTabBounding = activeTab.getBoundingClientRect();
				const navScrollBounding = navScroll.getBoundingClientRect();
				const maxOffset = isHorizontal
					? nav.offsetWidth - navScrollBounding.width
					: nav.offsetHeight - navScrollBounding.height;
				const currentOffset = this.navOffset;
				let newOffset = currentOffset;

				if (isHorizontal) {
					if (activeTabBounding.left < navScrollBounding.left) {
						newOffset =
							currentOffset - (navScrollBounding.left - activeTabBounding.left);
					}
					if (activeTabBounding.right > navScrollBounding.right) {
						newOffset =
							currentOffset + activeTabBounding.right - navScrollBounding.right;
					}
				} else {
					if (activeTabBounding.top < navScrollBounding.top) {
						newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
					}
					if (activeTabBounding.bottom > navScrollBounding.bottom) {
						newOffset =
							currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
					}
				}
				newOffset = Math.max(newOffset, 0);
				this.navOffset = Math.min(newOffset, maxOffset);
			},
			update() {
				if (!this.$refs.nav) return;
				const sizeName = this.sizeName;
				const navSize = this.$refs.nav[`offset${_.$firstUpperCase(sizeName)}`];
				const containerSize = this.$refs.navScroll[`offset${_.$firstUpperCase(sizeName)}`];
				const currentOffset = this.navOffset;

				if (containerSize < navSize) {
					const currentOffset = this.navOffset;
					this.scrollable = this.scrollable || {};
					this.scrollable.prev = currentOffset;
					this.scrollable.next = currentOffset + containerSize < navSize;
					if (navSize - currentOffset < containerSize) {
						this.navOffset = navSize - containerSize;
					}
				} else {
					this.scrollable = false;
					if (currentOffset > 0) {
						this.navOffset = 0;
					}
				}
			},
			changeTab(e) {
				const keyCode = e.keyCode;
				let nextIndex;
				let currentIndex, tabList;
				if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
					// 左右上下键更换tab
					tabList = e.currentTarget.querySelectorAll("[role=tab]");
					currentIndex = Array.prototype.indexOf.call(tabList, e.target);
				} else {
					return;
				}
				if (keyCode === 37 || keyCode === 38) {
					// left
					if (currentIndex === 0) {
						// first
						nextIndex = tabList.length - 1;
					} else {
						nextIndex = currentIndex - 1;
					}
				} else {
					// right
					if (currentIndex < tabList.length - 1) {
						// not last
						nextIndex = currentIndex + 1;
					} else {
						nextIndex = 0;
					}
				}
				tabList[nextIndex].focus(); // 改变焦点元素
				tabList[nextIndex].click(); // 选中下一个tab
				this.setFocus();
			},
			setFocus() {
				if (this.focusable) {
					this.isFocus = true;
				}
			},
			removeFocus() {
				this.isFocus = false;
			},
			visibilityChangeHandler() {
				const visibility = document.visibilityState;
				if (visibility === "hidden") {
					this.focusable = false;
				} else if (visibility === "visible") {
					setTimeout(() => {
						this.focusable = true;
					}, 50);
				}
			},
			windowBlurHandler() {
				this.focusable = false;
			},
			windowFocusHandler() {
				setTimeout(() => {
					this.focusable = true;
				}, 50);
			}
		},

		updated() {
			this.update();
		},

		render(h) {
			const {
				type,
				panes,
				editable,
				stretch,
				onTabClick,
				onTabRemove,
				navStyle,
				scrollable,
				scrollNext,
				scrollPrev,
				changeTab,
				setFocus,
				removeFocus
			} = this;
			const scrollBtn = scrollable
				? [
						h(
							"span",
							{
								class: ["el-tabs__nav-prev", scrollable.prev ? "" : "is-disabled"],
								on: {
									click: scrollPrev
								}
							},
							[h("i", { class: "el-icon-arrow-left" })]
						),
						h(
							"span",
							{
								class: ["el-tabs__nav-next", scrollable.next ? "" : "is-disabled"],
								on: {
									click: scrollNext
								}
							},
							[h("i", { class: "el-icon-arrow-right" })]
						)
					]
				: null;

			const tabs = _.map(panes, (pane, index) => {
				if (!pane) {
					return null;
				}
				let tabName = pane.name || pane.index || index;
				const closable = pane.isClosable || editable;

				pane.index = `${index}`;

				const btnClose = closable
					? h(
							"span",
							{
								class: "el-tabs__close",
								on: {
									click: ev => {
										onTabRemove(pane, ev);
									}
								}
							},
							[h("i", { class: "el-icon-close" })]
						)
					: null;

				const tabLabelContent = pane.$slots.label || pane.label;
				const tabindex = pane.active ? 0 : -1;
				return h(
					"div",
					{
						refInFor: true,
						role: "tab",
						ref: "tabs",
						class: {
							"el-tabs__item": true,
							[`is-${this.rootTabs.tabPosition}`]: true,
							"is-active": pane.active,
							"is-disabled": pane.disabled,
							"is-closable": closable,
							"is-focus": this.isFocus
						},
						id: `tab-${tabName}`,
						key: `tab-${tabName}`,
						ariaControls: `pane-${tabName}`,
						ariaSelected: pane.active,
						tabindex: tabindex,
						onFocus: () => {
							setFocus();
						},
						onBlur: () => {
							removeFocus();
						},
						onClick: ev => {
							removeFocus();
							onTabClick(pane, tabName, ev);
						},
						onKeydown: ev => {
							if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) {
								onTabRemove(pane, ev);
							}
						}
					},
					[tabLabelContent, btnClose]
				);
			});
			return h(
				"div",
				{
					class: [
						"el-tabs__nav-wrap",
						scrollable ? "is-scrollable" : "",
						`is-${this.rootTabs.tabPosition}`
					]
				},
				[
					scrollBtn,
					h(
						"div",
						{
							staticClass: `el-tabs__nav-scroll is-${this.rootTabs.tabPosition}`,
							ref: "navScroll"
						},
						[
							h(
								"div",
								{
									class: this.cptClassTabsNav,
									ref: "nav",
									style: navStyle,
									role: "tablist",
									onKeydown: changeTab
								},
								[
									h("xTabBar", {
										vIf: !type,
										tabs: panes
									}),
									tabs
								]
							),
							this.renderHeaderOpr()
						]
					)
				]
			);
		},

		mounted() {
			addResizeListener(this.$el, this.update);
			document.addEventListener("visibilitychange", this.visibilityChangeHandler);
			window.addEventListener("blur", this.windowBlurHandler);
			window.addEventListener("focus", this.windowFocusHandler);
			setTimeout(() => {
				this.scrollToActiveTab();
			}, 0);
		},

		beforeDestroy() {
			if (this.$el && this.update) removeResizeListener(this.$el, this.update);
			document.removeEventListener("visibilitychange", this.visibilityChangeHandler);
			window.removeEventListener("blur", this.windowBlurHandler);
			window.removeEventListener("focus", this.windowFocusHandler);
		}
	});
}
</script>
