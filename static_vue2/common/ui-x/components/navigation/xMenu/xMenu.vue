<style lang="less">
.el-menu-item {
	font-size: 14px;
	color: var(--xMenu-color, var(--el-text-color-primary));
	padding: 0 20px;
	cursor: pointer;
	-webkit-transition:
		border-color 0.3s,
		background-color 0.3s,
		color 0.3s;
	transition:
		border-color 0.3s,
		background-color 0.3s,
		color 0.3s;
	box-sizing: border-box;
	* {
		vertical-align: middle;
	}

	i {
		color: var(--el-text-color-secondary);
	}

	&.is-disabled {
		opacity: 0.25;
		cursor: not-allowed;
		background: 0 0 !important;
	}

	[class^="el-icon-"] {
		margin-right: 5px;
		width: 24px;
		text-align: center;
		font-size: 18px;
		vertical-align: middle;
	}

	&.is-active {
		color: var(--xMenu-color-is-active, var(--el-color-primary));
		i {
			color: inherit;
		}
	}
}
</style>

<script lang="ts">
export default async function () {
	const { on, off, hasClass, addClass, removeClass, ARIA_UTILS: Utils } = _xUtils;

	class SubMenu {
		domNode;
		parent;
		subMenuItems;
		subIndex;
		constructor(parent, domNode) {
			this.domNode = domNode;
			this.parent = parent;
			this.subMenuItems = [];
			this.subIndex = 0;
			this.init();
		}

		init() {
			this.subMenuItems = this.domNode.querySelectorAll("li");
			this.addListeners();
		}

		gotoSubIndex(idx) {
			if (idx === this.subMenuItems.length) {
				idx = 0;
			} else if (idx < 0) {
				idx = this.subMenuItems.length - 1;
			}
			this.subMenuItems[idx].focus();
			this.subIndex = idx;
		}

		addListeners() {
			const keys = Utils.keys;
			const parentNode = this.parent.domNode;
			Array.prototype.forEach.call(this.subMenuItems, el => {
				el.addEventListener("keydown", event => {
					let prevDef = false;
					switch (event.keyCode) {
						case keys.down:
							this.gotoSubIndex(this.subIndex + 1);
							prevDef = true;
							break;
						case keys.up:
							this.gotoSubIndex(this.subIndex - 1);
							prevDef = true;
							break;
						case keys.tab:
							Utils.triggerEvent(parentNode, "mouseleave");
							break;
						case keys.enter:
						case keys.space:
							prevDef = true;
							event.currentTarget.click();
							break;
					}
					if (prevDef) {
						event.preventDefault();
						event.stopPropagation();
					}
					return false;
				});
			});
		}
	}

	class MenuItem {
		domNode;
		submenu;
		constructor(domNode) {
			this.domNode = domNode;
			this.submenu = null;
			this.init();
		}

		init() {
			this.domNode.setAttribute("tabindex", "0");
			let menuChild = this.domNode.querySelector(".el-menu");
			if (menuChild) {
				this.submenu = new SubMenu(this, menuChild);
			}
			this.addListeners();
		}

		addListeners() {
			const keys = Utils.keys;
			this.domNode.addEventListener("keydown", event => {
				let prevDef = false;
				switch (event.keyCode) {
					case keys.down:
						Utils.triggerEvent(event.currentTarget, "mouseenter");
						this.submenu && this.submenu.gotoSubIndex(0);
						prevDef = true;
						break;
					case keys.up:
						Utils.triggerEvent(event.currentTarget, "mouseenter");
						this.submenu &&
							this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
						prevDef = true;
						break;
					case keys.tab:
						Utils.triggerEvent(event.currentTarget, "mouseleave");
						break;
					case keys.enter:
					case keys.space:
						prevDef = true;
						event.currentTarget.click();
						break;
				}
				if (prevDef) {
					event.preventDefault();
				}
			});
		}
	}

	class Menubar {
		domNode;
		constructor(domNode) {
			this.domNode = domNode;
			this.init();
		}
		init() {
			let menuChildren = this.domNode.childNodes;
			[].filter
				.call(menuChildren, child => child.nodeType === 1)
				.forEach(child => {
					new MenuItem(child); // eslint-disable-line
				});
		}
	}

	return defineComponent({
		name: "ElMenu",
		render(h) {
			const component = h(
				"ul",
				{
					role: "menubar",
					style: {
						backgroundColor: this.backgroundColor || ""
					},
					class: {
						"el-menu--horizontal": this.mode === "horizontal",
						"el-menu--collapse": this.collapse,
						"el-menu": true
					},
					children: this.$slots.default
				},
				+this.collapse
			);
			if (this.collapseTransition) {
				return h("el-menu-collapse-transition", {
					children: component
				});
			} else {
				return component;
			}
		},
		componentName: "ElMenu",
		provide() {
			return {
				rootMenu: this
			};
		},
		components: {
			"el-menu-collapse-transition": {
				functional: true,
				render(createElement, context) {
					const data = {
						props: {
							mode: "out-in"
						},
						on: {
							beforeEnter(el) {
								el.style.opacity = 0.2;
							},
							enter(el) {
								addClass(el, "el-opacity-transition");
								el.style.opacity = 1;
							},
							afterEnter(el) {
								removeClass(el, "el-opacity-transition");
								el.style.opacity = "";
							},
							beforeLeave(el) {
								if (!el.dataset) el.dataset = {};
								if (hasClass(el, "el-menu--collapse")) {
									removeClass(el, "el-menu--collapse");
									el.dataset.oldOverflow = el.style.overflow;
									el.dataset.scrollWidth = el.clientWidth;
									addClass(el, "el-menu--collapse");
								} else {
									addClass(el, "el-menu--collapse");
									el.dataset.oldOverflow = el.style.overflow;
									el.dataset.scrollWidth = el.clientWidth;
									removeClass(el, "el-menu--collapse");
								}
								el.style.width = el.scrollWidth + "px";
								el.style.overflow = "hidden";
							},
							leave(el) {
								addClass(el, "horizontal-collapse-transition");
								el.style.width = el.dataset.scrollWidth + "px";
							}
						}
					};
					return createElement("transition", data, context.children);
				}
			}
		},
		props: {
			mode: {
				type: String,
				default: "vertical"
			},
			defaultActive: {
				type: String,
				default: ""
			},
			defaultOpeneds: Array,
			uniqueOpened: Boolean,
			router: Boolean,
			menuTrigger: {
				type: String,
				default: "hover"
			},
			collapse: Boolean,
			backgroundColor: String,
			backgroundHoverColor: String,
			textColor: String,
			activeTextColor: String,
			collapseTransition: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				activeIndex: this.defaultActive,
				openedMenus:
					this.defaultOpeneds && !this.collapse ? this.defaultOpeneds.slice(0) : [],
				items: {},
				submenus: {}
			};
		},
		computed: {
			hoverBackground() {
				if (this.backgroundHoverColor) {
					return this.backgroundHoverColor;
				}
				return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : "";
			},
			isMenuPopup() {
				return this.mode === "horizontal" || (this.mode === "vertical" && this.collapse);
			}
		},
		watch: {
			defaultActive(value) {
				if (!this.items[value]) {
					this.activeIndex = null;
				}
				this.updateActiveIndex(value);
			},
			defaultOpeneds(value) {
				if (!this.collapse) {
					this.openedMenus = value;
				}
			},
			collapse(value) {
				if (value) this.openedMenus = [];
				this.broadcast("ElSubmenu", "toggle-collapse", value);
			}
		},
		methods: {
			updateActiveIndex(val) {
				const item =
					this.items[val] ||
					this.items[this.activeIndex] ||
					this.items[this.defaultActive];
				if (item) {
					this.activeIndex = item.index;
					this.initOpenedMenu();
				} else {
					this.activeIndex = null;
				}
			},
			getMigratingConfig() {
				return {
					props: {
						theme: "theme is removed."
					}
				};
			},
			getColorChannels(color) {
				color = color.replace("#", "");
				if (/^[0-9a-fA-F]{3}$/.test(color)) {
					color = color.split("");
					for (let i = 2; i >= 0; i--) {
						color.splice(i, 0, color[i]);
					}
					color = color.join("");
				}
				if (/^[0-9a-fA-F]{6}$/.test(color)) {
					return {
						red: parseInt(color.slice(0, 2), 16),
						green: parseInt(color.slice(2, 4), 16),
						blue: parseInt(color.slice(4, 6), 16)
					};
				} else {
					return {
						red: 255,
						green: 255,
						blue: 255
					};
				}
			},
			mixColor(color, percent) {
				let { red, green, blue } = this.getColorChannels(color);
				if (percent > 0) {
					// shade given color
					red *= 1 - percent;
					green *= 1 - percent;
					blue *= 1 - percent;
				} else {
					// tint given color
					red += (255 - red) * percent;
					green += (255 - green) * percent;
					blue += (255 - blue) * percent;
				}
				return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
			},
			addItem(item) {
				this.$set(this.items, item.index, item);
			},
			removeItem(item) {
				delete this.items[item.index];
			},
			addSubmenu(item) {
				this.$set(this.submenus, item.index, item);
			},
			removeSubmenu(item) {
				delete this.submenus[item.index];
			},
			openMenu(index, indexPath) {
				let openedMenus = this.openedMenus;
				if (openedMenus.indexOf(index) !== -1) return;
				// 将不在该菜单路径下的其余菜单收起
				// collapse all menu that are not under current menu item
				if (this.uniqueOpened) {
					this.openedMenus = openedMenus.filter(index => {
						return indexPath.indexOf(index) !== -1;
					});
				}
				this.openedMenus.push(index);
			},
			closeMenu(index) {
				const i = this.openedMenus.indexOf(index);
				if (i !== -1) {
					this.openedMenus.splice(i, 1);
				}
			},
			handleSubmenuClick(submenu) {
				const { index, indexPath } = submenu;
				let isOpened = this.openedMenus.indexOf(index) !== -1;
				if (isOpened) {
					this.closeMenu(index);
					this.$emit("close", index, indexPath);
				} else {
					this.openMenu(index, indexPath);
					this.$emit("open", index, indexPath);
				}
			},
			handleItemClick(item) {
				const { index, indexPath } = item;
				const oldActiveIndex = this.activeIndex;
				const hasIndex = item.index !== null;
				if (hasIndex) {
					this.activeIndex = item.index;
				}
				this.$emit("select", index, indexPath, item);
				if (this.mode === "horizontal" || this.collapse) {
					this.openedMenus = [];
				}
				if (this.router && hasIndex) {
					this.routeToItem(item, error => {
						this.activeIndex = oldActiveIndex;
						if (error) {
							// vue-router 3.1.0+ push/replace cause NavigationDuplicated error
							// https://github.com/ElemeFE/element/issues/17044
							if (error.name === "NavigationDuplicated") return;
							console.error(error);
						}
					});
				}
			},
			// 初始化展开菜单
			// initialize opened menu
			initOpenedMenu() {
				const index = this.activeIndex;
				const activeItem = this.items[index];
				if (!activeItem || this.mode === "horizontal" || this.collapse) return;
				let indexPath = activeItem.indexPath;

				// 展开该菜单项的路径上所有子菜单
				// expand all submenus of the menu item
				indexPath.forEach(index => {
					let submenu = this.submenus[index];
					submenu && this.openMenu(index, submenu.indexPath);
				});
			},
			routeToItem(item, onError) {
				let route = item.route || item.index;
				try {
					this.$router.push(route, () => {}, onError);
				} catch (e) {
					console.error(e);
				}
			},
			open(index) {
				const { indexPath } = this.submenus[index.toString()];
				indexPath.forEach(i => this.openMenu(i, indexPath));
			},
			close(index) {
				this.closeMenu(index);
			}
		},
		mounted() {
			this.initOpenedMenu();
			this.$on("item-click", this.handleItemClick);
			this.$on("submenu-click", this.handleSubmenuClick);
			if (this.mode === "horizontal") {
				new Menubar(this.$el); // eslint-disable-line
			}
			this.$watch("items", this.updateActiveIndex);
		}
	});
}
</script>
