<script lang="ts">
export default async function () {
	const [Popper, xMenuMixin, { Transition }] = await _.$importVue([
		"/common/libs/VuePopper/VuePopper.vue",
		"/common/ui-x/components/navigation/xMenu/xMenuMixin.vue",
		"/common/utils/hooks.vue"
	]);

	const poperMixins = {
		props: {
			transformOrigin: {
				type: [Boolean, String],
				default: false
			},
			offset: Popper.props.offset,
			boundariesPadding: Popper.props.boundariesPadding,
			popperOptions: Popper.props.popperOptions
		},
		data: Popper.data,
		methods: Popper.methods,
		beforeDestroy: Popper.beforeDestroy,
		deactivated: Popper.deactivated
	};

	return defineComponent({
		name: "ElSubmenu",
		componentName: "ElSubmenu",
		mixins: [xMenuMixin, poperMixins],
		components: {
			xCollapseTransition: {
				name: "ElCollapseTransition",
				functional: true,
				render(h, { children }) {
					const data = {
						on: new Transition()
					};

					return h("transition", data, children);
				}
			}
		},
		props: {
			index: {
				type: String,
				required: true
			},
			showTimeout: {
				type: Number,
				default: 300
			},
			hideTimeout: {
				type: Number,
				default: 300
			},
			popperClass: String,
			disabled: Boolean,
			popperAppendToBody: {
				type: Boolean,
				default: undefined
			}
		},
		data() {
			return {
				popperJS: null,
				timeout: null,
				items: {},
				submenus: {},
				mouseInChild: false
			};
		},
		watch: {
			opened(val) {
				if (this.isMenuPopup) {
					this.$nextTick(_ => {
						this.updatePopper();
					});
				}
			}
		},
		computed: {
			// popper option
			appendToBody() {
				return this.popperAppendToBody === undefined
					? this.isFirstLevel
					: this.popperAppendToBody;
			},
			menuTransitionName() {
				return this.rootMenu.collapse ? "el-zoom-in-left" : "el-zoom-in-top";
			},
			opened() {
				return this.rootMenu.openedMenus.indexOf(this.index) > -1;
			},
			active() {
				if (this.rootMenu.defaultActive) {
					return _.some(this.items, item => item.href === this.rootMenu.defaultActive);
				}
				let isActive = false;
				const submenus = this.submenus;
				const items = this.items;
				Object.keys(items).forEach(index => {
					if (items[index].active) {
						isActive = true;
					}
				});
				Object.keys(submenus).forEach(index => {
					if (submenus[index].active) {
						isActive = true;
					}
				});
				return isActive;
			},
			hoverBackground() {
				return this.rootMenu.hoverBackground;
			},
			backgroundColor() {
				return this.rootMenu.backgroundColor || "";
			},
			activeTextColor() {
				return this.rootMenu.activeTextColor || "";
			},
			textColor() {
				return this.rootMenu.textColor || "";
			},
			mode() {
				return this.rootMenu.mode;
			},
			isMenuPopup() {
				return this.rootMenu.isMenuPopup;
			},
			titleStyle() {
				if (this.mode !== "horizontal") {
					return {
						color: this.textColor
					};
				}
				return {
					borderBottomColor: this.active
						? this.rootMenu.activeTextColor
							? this.activeTextColor
							: ""
						: "transparent",
					color: this.active ? this.activeTextColor : this.textColor
				};
			},
			isFirstLevel() {
				let isFirstLevel = true;
				let parent = this.$parent;
				while (parent && parent !== this.rootMenu) {
					if (
						["ElSubmenu", "ElMenuItemGroup"].indexOf(parent.$options.componentName) > -1
					) {
						isFirstLevel = false;
						break;
					} else {
						parent = parent.$parent;
					}
				}
				return isFirstLevel;
			}
		},
		methods: {
			handleCollapseToggle(value) {
				if (value) {
					this.initPopper();
				} else {
					this.doDestroy();
				}
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
			handleClick() {
				const { rootMenu, disabled } = this;
				if (
					(rootMenu.menuTrigger === "hover" && rootMenu.mode === "horizontal") ||
					(rootMenu.collapse && rootMenu.mode === "vertical") ||
					disabled
				) {
					return;
				}
				this.dispatch("ElMenu", "submenu-click", this);
			},
			handleMouseenter(event, showTimeout = this.showTimeout) {
				if (
					!("ActiveXObject" in window) &&
					event.type === "focus" &&
					!event.relatedTarget
				) {
					return;
				}
				const { rootMenu, disabled } = this;
				if (
					(rootMenu.menuTrigger === "click" && rootMenu.mode === "horizontal") ||
					(!rootMenu.collapse && rootMenu.mode === "vertical") ||
					disabled
				) {
					return;
				}
				this.dispatch("ElSubmenu", "mouse-enter-child");
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.rootMenu.openMenu(this.index, this.indexPath);
				}, showTimeout);
				if (this.appendToBody) {
					this.$parent.$el.dispatchEvent(new MouseEvent("mouseenter"));
				}
			},
			handleMouseleave(deepDispatch = false) {
				const { rootMenu } = this;
				if (
					(rootMenu.menuTrigger === "click" && rootMenu.mode === "horizontal") ||
					(!rootMenu.collapse && rootMenu.mode === "vertical")
				) {
					return;
				}
				this.dispatch("ElSubmenu", "mouse-leave-child");
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					!this.mouseInChild && this.rootMenu.closeMenu(this.index);
				}, this.hideTimeout);
				if (this.appendToBody && deepDispatch) {
					if (this.$parent.$options.name === "ElSubmenu") {
						this.$parent.handleMouseleave(true);
					}
				}
			},
			handleTitleMouseenter() {
				if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
				const title = this.$refs["submenu-title"];
				title && (title.style.backgroundColor = this.rootMenu.hoverBackground);
			},
			handleTitleMouseleave() {
				if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
				const title = this.$refs["submenu-title"];
				title && (title.style.backgroundColor = this.rootMenu.backgroundColor || "");
			},
			updatePlacement() {
				this.currentPlacement =
					this.mode === "horizontal" && this.isFirstLevel
						? "bottom-start"
						: "right-start";
			},
			initPopper() {
				this.referenceElm = this.$el;
				this.popperElm = this.$refs.menu;
				this.updatePlacement();
			}
		},
		created() {
			this.$on("toggle-collapse", this.handleCollapseToggle);
			this.$on("mouse-enter-child", () => {
				this.mouseInChild = true;
				clearTimeout(this.timeout);
			});
			this.$on("mouse-leave-child", () => {
				this.mouseInChild = false;
				clearTimeout(this.timeout);
			});
		},
		mounted() {
			this.parentMenu.addSubmenu(this);
			this.rootMenu.addSubmenu(this);
			this.initPopper();
		},
		beforeDestroy() {
			this.parentMenu.removeSubmenu(this);
			this.rootMenu.removeSubmenu(this);
		},
		render(h) {
			const {
				active,
				opened,
				paddingStyle,
				titleStyle,
				backgroundColor,
				rootMenu,
				currentPlacement,
				menuTransitionName,
				mode,
				disabled,
				popperClass,
				$slots,
				$vSlots,
				isFirstLevel
			} = this;

			const children = (() => {
				if ($slots.default) {
					return $slots.default;
				}

				if (_.isFunction($vSlots.default)) {
					return $vSlots.default();
				}
			})();
			const title = (() => {
				if ($slots.title) {
					return $slots.title;
				}

				if (_.isFunction($vSlots.title)) {
					return $vSlots.title();
				}
			})();

			const popupMenu = h("transition", {
				name: menuTransitionName,
				children: h("div", {
					ref: "menu",
					class: [`el-menu--${mode}`, popperClass, opened ? "" : "display-none"],
					onMouseenter: $event => this.handleMouseenter($event, 100),
					onMouseleave: () => this.handleMouseleave(true),
					onFocus: $event => this.handleMouseenter($event, 100),
					children: h("ul", {
						role: "menu",
						class: ["el-menu el-menu--popup", `el-menu--popup-${currentPlacement}`],
						style: {
							backgroundColor: rootMenu.backgroundColor || ""
						},
						children
					})
				})
			});
			const inlineMenu = h("xCollapseTransition", {
				children: h("ul", {
					role: "menu",
					class: {
						"el-menu el-menu--inline": true,
						"display-none": !opened
					},
					style: {
						backgroundColor: rootMenu.backgroundColor || ""
					},
					children
				})
			});
			const submenuTitleIcon =
				(rootMenu.mode === "horizontal" && isFirstLevel) ||
				(rootMenu.mode === "vertical" && !rootMenu.collapse)
					? "el-icon-arrow-down"
					: "el-icon-arrow-right";
			return h("li", {
				class: {
					"el-submenu": true,
					"is-active": active,
					"is-opened": opened,
					"is-disabled": disabled
				},
				role: "menuitem",
				"aria-haspopup": "true",
				"aria-expanded": opened,
				onMouseenter: this.handleMouseenter,
				onMouseleave: () => this.handleMouseleave(false),
				onFocus: this.handleMouseenter,
				children: [
					h("div", {
						class: "el-submenu__title",
						ref: "submenu-title",
						onClick: this.handleClick,
						onMouseenter: this.handleTitleMouseenter,
						onMouseleave: this.handleTitleMouseleave,
						style: [
							paddingStyle,
							titleStyle,
							{
								backgroundColor
							}
						],
						children: [
							title,
							h("i", {
								class: ["el-submenu__icon-arrow", submenuTitleIcon]
							})
						]
					}),
					this.isMenuPopup ? popupMenu : inlineMenu
				]
			});
		}
	});
}
</script>
