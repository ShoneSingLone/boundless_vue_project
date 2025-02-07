<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [Clickoutside] = await Promise.all([
		_.$importVue("/common/ui-x/directive/clickoutside.vue")
	]);

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
				return this.size || PRIVATE_GLOBAL.x_ui.size;
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
					this.triggerElm.setAttribute(
						"class",
						(this.triggerElm.getAttribute("class") || "") + " el-dropdown-selfdefine"
					); // 控制
				}
			},
			async initEvent() {
				let {
					trigger,
					show,
					hide,
					handleClick,
					splitButton,
					handleTriggerKeyDown,
					handleItemKeyDown
				} = this;

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
				triggerElm = h("xBtnGroup", { staticClass: "xDropdown" }, [
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
							h("xIcon", {
								icon: "arrow-down"
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
					staticClass: "el-dropdown xBtnGroup",
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
<style lang="less">
.el-button-group.xDropdown {
	display: inline-flex;
	align-items: center;
	.xBtn {
		&.el-button.el-button--primary.el-button--medium {
			height: 37px;
		}
	}
}

.el-dropdown .el-dropdown-selfdefine:focus:active,
.el-dropdown .el-dropdown-selfdefine:focus:not(.focusing),
.el-message__closeBtn:focus,
.el-message__content:focus,
.el-popover:focus,
.el-popover:focus:active,
.el-popover__reference:focus:hover,
.el-popover__reference:focus:not(.focusing),
.el-rate:active,
.el-rate:focus,
.el-tooltip:focus:hover,
.el-tooltip:focus:not(.focusing),
.el-upload-list__item.is-success:active,
.el-upload-list__item.is-success:not(.focusing):focus {
	outline-width: 0;
}

.el-dropdown-menu,
.el-menu--collapse .el-submenu .el-menu {
	z-index: 10;
	-webkit-box-shadow: var(--normal-box-shadow);
}

.el-dropdown {
	display: inline-block;
	position: relative;
	color: var(--el-text-color-regular);
	font-size: 14px;

	&.xBtnGroup {
		display: inline-flex;
		align-items: center;
		/* 按钮下拉 */
		height: 32px;

		.xDropdown {
			height: 100%;
			.xBtn {
				height: 100%;
			}
		}
	}

	.el-button-group {
		display: flex;

		.el-button {
			float: none;
		}
	}

	.el-dropdown__caret-button {
		padding-left: 5px;
		padding-right: 5px;
		position: relative;
		border-left: none;

		&:hover:not(.is-disabled)::before {
			top: 0;
			bottom: 0;
		}

		&::before {
			content: "";
			position: absolute;
			display: block;
			width: 1px;
			top: 5px;
			bottom: 5px;
			left: 0;
			background: rgba(255, 255, 255, 0.5);
		}

		&.el-button--default {
			&::before {
				background: rgba(220, 223, 230, 0.5);
			}
		}

		.el-dropdown__icon {
			padding-left: 0;
		}
	}
}

.el-dropdown__icon {
	font-size: 12px;
	margin: 0 3px;
}

.el-dropdown [disabled] {
	cursor: not-allowed;
	color: #bbb;
}

.el-dropdown-menu {
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px 0;
	margin: 5px 0;
	background-color: #fff;
	border: 1px solid var(--el-border-color-lighter);
	border-radius: var(--border-radius);
	box-shadow: var(--normal-box-shadow);
}

.el-dropdown-menu__item {
	list-style: none;
	line-height: 36px;
	padding: 0 20px;
	margin: 0;
	font-size: 14px;
	color: var(--el-text-color-regular);
	cursor: pointer;
	outline: 0;

	i {
		margin-right: 5px;
	}
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
	background-color: #ecf5ff;
	color: var(--el-color-primary-hover);
}

.el-dropdown-menu__item--divided {
	position: relative;
	margin-top: 6px;
	border-top: 1px solid var(--el-border-color-lighter);
	&:before {
		content: "";
		height: 6px;
		display: block;
		margin: 0 -20px;
		background-color: #fff;
	}
}

.el-dropdown-menu__item {
	&.is-disabled {
		cursor: default;
		color: #bbb;
		pointer-events: none;
	}
}

.el-dropdown-menu--medium {
	padding: 6px 0;
	&.el-dropdown-menu__item {
		line-height: 30px;
		padding: 0 17px;
		font-size: 14px;
	}

	.el-dropdown-menu__item {
		&.el-dropdown-menu__item--divided {
			margin-top: 6px;
			&:before {
				height: 6px;
				margin: 0 -17px;
			}
		}
	}
}

.el-dropdown-menu--small {
	padding: 6px 0;
	.el-dropdown-menu__item {
		line-height: 27px;
		padding: 0 15px;
		font-size: 13px;
		&.el-dropdown-menu__item--divided {
			margin-top: 4px;
			&:before {
				height: 4px;
				margin: 0 -15px;
			}
		}
	}
}

.el-dropdown-menu--mini {
	padding: 3px 0;
	.el-dropdown-menu__item {
		line-height: 24px;
		padding: 0 10px;
		font-size: 12px;
		&.el-dropdown-menu__item--divided {
			margin-top: 3px;
			&:before {
				height: 3px;
				margin: 0 -10px;
			}
		}
	}
}
</style>
