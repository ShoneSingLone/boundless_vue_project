<script lang="ts">
export default async function () {
	const [Clickoutside] = await Promise.all([_.$importVue("/common/ui-x/directive/clickoutside.vue")]);

	return defineComponent({
		name: "xDropdown",
		componentName: "xDropdown",
		directives: { Clickoutside },
		provide() {
			return {
				dropdown: this
			};
		},
		props: {
			trigger: {
				type: String,
				default: "hover"
			},
			preset: String,
			size: {
				type: String,
				default: ""
			},
			splitButton: Boolean,
			hideOnClick: {
				type: Boolean,
				default: true
			},
			placement: {
				type: String,
				default: "bottom-end"
			},
			visibleArrow: {
				default: true
			},
			showTimeout: {
				type: Number,
				default: 250
			},
			hideTimeout: {
				type: Number,
				default: 150
			},
			tabindex: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				timeout: null,
				visible: false,
				triggerElm: null,
				menuItems: null,
				menuItemsArray: null,
				dropdownElm: null,
				focusing: false,
				listId: `dropdown-menu-${_.$genId()}`
			};
		},

		computed: {
			dropdownSize() {
				return this.size || (this.$xUiConfigs || {}).size;
			}
		},

		mounted() {
			this.$on("menu-item-click", this.handleMenuItemClick);
		},

		watch: {
			visible(val) {
				this.broadcast("xDropdownMenu", "visible", val);
				this.$emit("visible-change", val);
			},
			focusing(val) {
				const selfDefine = this.$el.querySelector(".el-dropdown-selfdefine");
				if (selfDefine) {
					// 自定义
					if (val) {
						selfDefine.className += " focusing";
					} else {
						selfDefine.className = selfDefine.className.replace("focusing", "");
					}
				}
			}
		},

		methods: {
			show() {
				if (this.disabled) return;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(
					() => {
						this.visible = true;
					},
					this.trigger === "click" ? 0 : this.showTimeout
				);
			},
			async hide() {
				if (this.disabled) return;
				await this.removeTabindex();
				if (this.tabindex >= 0) {
					await this.resetTabindex(this.triggerElm);
				}
				clearTimeout(this.timeout);
				this.timeout = setTimeout(
					() => {
						this.visible = false;
					},
					this.trigger === "click" ? 0 : this.hideTimeout
				);
			},
			handleClick() {
				if (this.disabled) return;
				if (this.visible) {
					this.hide();
				} else {
					this.show();
				}
			},
			handleTriggerKeyDown(ev) {
				const keyCode = ev.keyCode;
				if ([38, 40].indexOf(keyCode) > -1) {
					// up/down
					this.removeTabindex();
					this.resetTabindex(this.menuItems[0]);
					this.menuItems[0].focus();
					ev.preventDefault();
					ev.stopPropagation();
				} else if (keyCode === 13) {
					// space enter选中
					this.handleClick();
				} else if ([9, 27].indexOf(keyCode) > -1) {
					// tab || esc
					this.hide();
				}
			},
			handleItemKeyDown(ev) {
				const keyCode = ev.keyCode;
				const target = ev.target;
				const currentIndex = this.menuItemsArray.indexOf(target);
				const max = this.menuItemsArray.length - 1;
				let nextIndex;
				if ([38, 40].indexOf(keyCode) > -1) {
					// up/down
					if (keyCode === 38) {
						// up
						nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
					} else {
						// down
						nextIndex = currentIndex < max ? currentIndex + 1 : max;
					}
					this.removeTabindex();
					this.resetTabindex(this.menuItems[nextIndex]);
					this.menuItems[nextIndex].focus();
					ev.preventDefault();
					ev.stopPropagation();
				} else if (keyCode === 13) {
					// enter选中
					this.triggerElmFocus();
					target.click();
					if (this.hideOnClick) {
						// click关闭
						this.visible = false;
					}
				} else if ([9, 27].indexOf(keyCode) > -1) {
					// tab // esc
					this.hide();
					this.triggerElmFocus();
				}
			},
			async resetTabindex(ele) {
				// 下次tab时组件聚焦元素
				this.removeTabindex();
				ele.setAttribute("tabindex", "0"); // 下次期望的聚焦元素
			},
			async removeTabindex() {
				await _.$ensure(() => this.triggerElm);
				this.triggerElm.setAttribute("tabindex", "-1");
				this.menuItemsArray.forEach(item => {
					item.setAttribute("tabindex", "-1");
				});
			},
			async initAria() {
				await _.$ensure(() => this.triggerElm);
				this.dropdownElm.setAttribute("id", this.listId);
				this.triggerElm.setAttribute("aria-haspopup", "list");
				this.triggerElm.setAttribute("aria-controls", this.listId);

				if (!this.splitButton) {
					// 自定义
					this.triggerElm.setAttribute("role", "button");
					this.triggerElm.setAttribute("tabindex", this.tabindex);
					this.triggerElm.setAttribute("class", (this.triggerElm.getAttribute("class") || "") + " el-dropdown-selfdefine"); // 控制
				}
			},
			async initEvent() {
				let { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this;

				/* 保证触发元素存在 */
				this.triggerElm = await _.$ensure(() => {
					try {
						if (splitButton) {
							return _.$val(this, "$refs.trigger.$el");
						} else {
							return _.$val(this, "$slots.default.0.elm");
						}
					} catch (error) {
						console.error(error);
					}
				});

				let dropdownElm = this.dropdownElm;

				this.triggerElm.addEventListener("keydown", handleTriggerKeyDown); // triggerElm keydown
				dropdownElm.addEventListener("keydown", handleItemKeyDown, true); // item keydown
				// 控制自定义元素的样式
				if (!splitButton) {
					this.triggerElm.addEventListener("focus", () => {
						this.focusing = true;
					});
					this.triggerElm.addEventListener("blur", () => {
						this.focusing = false;
					});
					this.triggerElm.addEventListener("click", () => {
						this.focusing = false;
					});
				}
				if (trigger === "hover") {
					this.triggerElm.addEventListener("mouseenter", show);
					this.triggerElm.addEventListener("mouseleave", hide);
					dropdownElm.addEventListener("mouseenter", show);
					dropdownElm.addEventListener("mouseleave", hide);
				} else if (trigger === "click") {
					this.triggerElm.addEventListener("click", handleClick);
				}
			},
			handleMenuItemClick(command, instance) {
				if (this.hideOnClick) {
					this.visible = false;
				}
				this.$emit("command", command, instance);
			},
			triggerElmFocus() {
				this.triggerElm.focus && this.triggerElm.focus();
			},
			async initDomOperation() {
				this.dropdownElm = this.popperElm;
				this.menuItems = this.dropdownElm.querySelectorAll("[tabindex='-1']");
				this.menuItemsArray = [].slice.call(this.menuItems);

				await this.initEvent();
				await this.initAria();
			}
		},

		render(h) {
			let { hide, splitButton, preset, dropdownSize, disabled } = this;

			const handleMainButtonClick = event => {
				this.$emit("click", event);
				hide();
			};

			let triggerElm = null;
			if (splitButton) {
				triggerElm = h("xBtnGroup", [
					h(
						"xBtn",
						{
							ripple: false,
							preset,
							size: dropdownSize,
							disabled: disabled,
							nativeOn: {
								click: handleMainButtonClick
							}
						},
						[this.$slots.default]
					),
					h(
						"xBtn",
						{
							ref: "trigger",
							preset,
							size: dropdownSize,
							class: "el-dropdown__caret-button",
							disabled: !this.triggerElm || disabled
						},
						[
							h("i", {
								class: "el-dropdown__icon el-icon-arrow-down"
							})
						]
					)
				]);
			} else {
				triggerElm = this.$slots.default;
				const vnodeData = triggerElm[0].data || {};
				let { attrs = {} } = vnodeData;
				if (disabled && !attrs.disabled) {
					attrs.disabled = true;
					vnodeData.attrs = attrs;
				}
			}
			const menuElm = disabled ? null : this.$slots.dropdown;

			return h(
				"div",
				{
					staticClass: "el-dropdown",
					directives: [
						{
							name: "clickoutside",
							value: hide
						}
					],
					attrs: {
						"aria-disabled": disabled
					}
				},
				[triggerElm, menuElm]
			);
		}
	});
}
</script>
<style lang="less"></style>
