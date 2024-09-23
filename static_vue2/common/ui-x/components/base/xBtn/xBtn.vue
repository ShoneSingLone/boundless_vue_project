<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	/* 定制颜色基本上就是 text hover，focus active disabled */
	const { useProps } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		props: {
			configs: {
				type: Object,
				default() {
					return {};
				}
			},
			preset: {
				type: String,
				default: "default"
			},
			size: String,
			icon: {
				type: String,
				default: ""
			},
			type: {
				default() {
					return "button";
				},
				validator(value, props) {
					// The value must match one of these strings
					return ["button", "a"].includes(value);
				},
				type: String
			},
			ripple: {
				type: Boolean,
				default: true
			},
			confirm: {
				type: [Object, Boolean],
				default: false
			},
			loading: Boolean,
			disabled: Boolean,
			plain: Boolean,
			autofocus: Boolean,
			round: Boolean,
			circle: Boolean
		},
		setup() {
			const { cptIsHide, cptIsLoading, cptDisabled } = useProps(this);

			return {
				cptIsHide,
				cptIsLoading,
				cptDisabled
			};
		},
		data() {
			return {
				privateLoading: false
			};
		},
		computed: {
			cptConfirm() {
				if (this.confirm) {
					return this.confirm;
				}
				if (this.configs?.confirm) {
					return this.configs.confirm;
				}
				return false;
			},
			cptIcon() {
				if (this.icon) {
					return this.icon;
				}
				if (this.configs?.icon) {
					return this.configs.icon;
				}
				return "";
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			buttonSize() {
				if (this.configs?.size) {
					return this.configs.size;
				}
				return this.size || this._elFormItemSize || PRIVATE_GLOBAL.x_ui_size;
			},
			buttonDisabled() {
				if (
					this.$options.propsData.hasOwnProperty("disabled")
						? this.disabled
						: (this.elForm || {}).disabled
				) {
					return true;
				}

				if (this.cptDisabled) {
					return true;
				}

				return false;
			},
			cptDisabledTips() {
				// return h("div", { style: { color: "red" } }, [123]);
				if (this.cptDisabled) {
					if (_.isString(this.cptDisabled) || this.cptDisabled.TYPE_IS_VNODE) {
						return this.cptDisabled;
					}
				}
				return "";
			},
			cptLoading() {
				if (this.privateLoading) {
					return true;
				}
				if (this.loading) {
					return true;
				}
				if (this.cptIsLoading) {
					return true;
				}

				return false;
			},
			cptPreset() {
				return this.configs.preset || this.preset;
			},
			cptClassName() {
				const vm = this;
				const setClass = (prefix, value, defaultString = "") =>
					value ? `${prefix}${value}` : defaultString;
				return [
					"xBtn el-button",
					vm?.configs?.class || "",
					/* 颜色 */
					setClass("el-button--", vm.cptPreset),
					/* 大小 */
					setClass("el-button--", vm.buttonSize),
					/* 形状 */
					setClass("is-", vm.cptShape),
					{
						"is-disabled": vm.buttonDisabled,
						"is-loading": vm.cptLoading
					}
				];
			},
			cptShape() {
				for (const prop of ["plain", "round", "circle"]) {
					if (this[prop]) {
						return prop;
					}
				}
				if (this.configs?.shape) {
					return this.configs?.shape;
				}
			}
		},
		methods: {
			calLabel() {
				if (_.isFunction(this.configs?.label)) {
					return this.configs.label.call(this.configs, { xBtn: this });
				}
				if (_.isString(this.configs?.label) || this.configs?.label?.TYPE_IS_VNODE) {
					return this.configs.label;
				}
				return "";
			},
			calChildren() {
				if (_.isFunction(this.$vSlots?.default)) {
					return h("span", this.$vSlots.default());
				}
				if (this.$vSlots?.TYPE_IS_VNODE) {
					return this.$vSlots;
				}
				return this.calLabel();
			},
			getDirectives() {
				let directives = [];
				if (this.ripple) {
					/* ripple 水波纹 */
					directives.push({
						name: "ripple",
						value: {
							duration: 300
						}
					});
				}
				// if (this.cptDisabledTips) {
				// 	/* disabled提示 */
				// 	directives.push({ name: "xtips", value: { content: this.cptDisabledTips, trigger: "hover", placement: "top", style: "--min-width:unset;" } });
				// }

				if (_.$isArrayFill(this.$vnode.data.directives)) {
					directives.push(...this.$vnode.data.directives);
				}
				return directives;
			},
			labelRender(h) {
				return;
			},
			async handleClick(...args) {
				if (this.buttonDisabled || this.privateLoading) {
					return;
				}
				try {
					if (_.isFunction(this.$listeners.click)) {
						this.privateLoading = true;
						await this.$listeners.click.apply(this, args);
					} else if (_.isFunction(this.configs?.onClick)) {
						this.privateLoading = true;
						await this.configs.onClick();
					}
				} catch (error) {
					console.error(error);
				} finally {
					this.privateLoading && (this.privateLoading = false);
				}
			}
		},
		render(h) {
			const vm = this;
			if (this.cptIsHide) {
				return null;
			}

			if (vm.cptConfirm) {
				return h("xBtnWithConfirm", {
					...vm.cptConfirm,
					configs: {
						..._.omit(vm.configs, ["confirm"]),
						preset: vm.preset
					}
				});
			}

			const buttonProps = {
				...(vm.configs.props || {}),
				directives: vm.getDirectives({}),
				onClick() {
					vm.handleClick();
				},
				on: vm.$listeners,
				disabled: vm.buttonDisabled || vm.cptLoading,
				autofocus: vm.autofocus,
				type: vm.type,
				class: vm.cptClassName
			};
			if (vm.configs) {
				/* vNode的变动不会触发render重新执行 template的slot优先级最高*/
				const vChildren = this.$slots.default || vm.calChildren();
				if (this.cptDisabledTips) {
					// buttonProps.attrs = { title: this.cptDisabledTips };
					return h(vm.type || "button", buttonProps, [
						h(
							"xPopover",
							{
								placement: "top-start",
								trigger: "hover",
								content: this.cptDisabledTips
							},
							[
								h(
									"span",
									{ class: ["flex", { middle: vm.cptIcon }], slot: "reference" },
									[
										(() => {
											if (vm.cptLoading) {
												return h("i", {
													class: ["el-icon-loading", { mr4: !!vChildren }]
												});
											} else if (vm.cptIcon) {
												if (/el-/.test(vm.cptIcon)) {
													return h("i", {
														class: [vm.cptIcon, { mr4: !!vChildren }]
													});
												} else {
													return h("xIcon", {
														icon: vm.cptIcon,
														class: [{ mr4: !!vChildren }]
													});
												}
											} else {
												return null;
											}
										})(),
										vChildren
									]
								)
							]
						)
					]);
				} else {
					return h(vm.type || "button", buttonProps, [
						h("span", { class: ["flex", { middle: vm.cptIcon }] }, [
							(() => {
								if (vm.cptLoading) {
									return h("i", {
										class: ["el-icon-loading", { mr4: !!vChildren }]
									});
								} else if (vm.cptIcon) {
									if (/el-/.test(vm.cptIcon)) {
										return h("i", {
											class: [vm.cptIcon, { mr4: !!vChildren }]
										});
									} else {
										return h("xIcon", {
											icon: vm.cptIcon,
											class: [{ mr4: !!vChildren }]
										});
									}
								} else {
									return null;
								}
							})(),
							vChildren
						])
					]);
				}
			}
		}
	});
}
</script>

<style lang="less">
.el-button,
a.el-button {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	background: #fff;
	border: 1px solid #dcdfe6;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	/* 列表当中 jsxFn link 左对齐 */
	&.text-align-left {
		text-align: left;
	}
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	-webkit-transition: 0.1s;
	transition: 0.1s;
	font-weight: 500;
	padding: 12px 20px;
	font-size: 14px;
	border-radius: var(--border-radius);

	&.el-button--primary {
		color: #fff;
		background-color: var(--el-color-primary);
		border-color: var(--el-color-primary);
	}

	&.el-button--primary:focus,
	&.el-button--primary:hover {
		background: var(--el-color-primary-hover);
		border-color: var(--el-color-primary-hover);
		color: #fff;
	}

	&.el-button--primary.is-active,
	&.el-button--primary:active {
		background: var(--el-color-primary-active);
		border-color: var(--el-color-primary-active);
		color: #fff;
	}

	&.el-button--primary:active {
		outline: 0;
	}

	&.el-button--primary.is-disabled,
	&.el-button--primary.is-disabled:active,
	&.el-button--primary.is-disabled:focus,
	&.el-button--primary.is-disabled:hover {
		color: #fff;
		background-color: var(--el-color-primary-light-5);
		border-color: var(--el-color-primary-light-5);
	}

	&.el-button--primary.is-plain {
		color: var(--el-color-primary);
		background: #ecf5ff;
		border-color: #b3d8ff;
	}

	&.el-button--primary.is-plain:focus,
	&.el-button--primary.is-plain:hover {
		background: var(--el-color-primary);
		border-color: var(--el-color-primary);
		color: #fff;
	}

	&.el-button--primary.is-plain:active {
		background: var(--el-color-primary-active);
		border-color: var(--el-color-primary-active);
		color: #fff;
		outline: 0;
	}

	&.el-button--primary.is-plain.is-disabled,
	&.el-button--primary.is-plain.is-disabled:active,
	&.el-button--primary.is-plain.is-disabled:focus,
	&.el-button--primary.is-plain.is-disabled:hover {
		color: #8cc5ff;
		background-color: #ecf5ff;
		border-color: #d9ecff;
	}

	&.el-button--success {
		color: #fff;
		background-color: var(--el-color-success);
		border-color: var(--el-color-success);
	}

	&.el-button--success:focus,
	&.el-button--success:hover {
		background: #85ce61;
		border-color: #85ce61;
		color: #fff;
	}

	&.el-button--success.is-active,
	&.el-button--success:active {
		background: #5daf34;
		border-color: #5daf34;
		color: #fff;
	}

	&.el-button--success:active {
		outline: 0;
	}

	&.el-button--success.is-disabled,
	&.el-button--success.is-disabled:active,
	&.el-button--success.is-disabled:focus,
	&.el-button--success.is-disabled:hover {
		color: #fff;
		background-color: #b3e19d;
		border-color: #b3e19d;
	}

	&.el-button--success.is-plain {
		color: var(--el-color-success);
		background: #f0f9eb;
		border-color: #c2e7b0;
	}

	&.el-button--success.is-plain:focus,
	&.el-button--success.is-plain:hover {
		background: var(--el-color-success);
		border-color: var(--el-color-success);
		color: #fff;
	}

	&.el-button--success.is-plain:active {
		background: #5daf34;
		border-color: #5daf34;
		color: #fff;
		outline: 0;
	}

	&.el-button--success.is-plain.is-disabled,
	&.el-button--success.is-plain.is-disabled:active,
	&.el-button--success.is-plain.is-disabled:focus,
	&.el-button--success.is-plain.is-disabled:hover {
		color: #a4da89;
		background-color: #f0f9eb;
		border-color: var(--el-color-success-light-8);
	}

	&.el-button--warning {
		color: #fff;
		background-color: var(--el-color-warning);
		border-color: var(--el-color-warning);
	}

	&.el-button--warning:focus,
	&.el-button--warning:hover {
		background: #ebb563;
		border-color: #ebb563;
		color: #fff;
	}

	&.el-button--warning.is-active,
	&.el-button--warning:active {
		background: #cf9236;
		border-color: #cf9236;
		color: #fff;
	}

	&.el-button--warning:active {
		outline: 0;
	}

	&.el-button--warning.is-disabled,
	&.el-button--warning.is-disabled:active,
	&.el-button--warning.is-disabled:focus,
	&.el-button--warning.is-disabled:hover {
		color: #fff;
		background-color: #f3d19e;
		border-color: #f3d19e;
	}

	&.el-button--warning.is-plain {
		color: var(--el-color-warning);
		background: #fdf6ec;
		border-color: #f5dab1;
	}

	&.el-button--warning.is-plain:focus,
	&.el-button--warning.is-plain:hover {
		background: var(--el-color-warning);
		border-color: var(--el-color-warning);
		color: #fff;
	}

	&.el-button--warning.is-plain:active {
		background: #cf9236;
		border-color: #cf9236;
		color: #fff;
		outline: 0;
	}

	&.el-button--warning.is-plain.is-disabled,
	&.el-button--warning.is-plain.is-disabled:active,
	&.el-button--warning.is-plain.is-disabled:focus,
	&.el-button--warning.is-plain.is-disabled:hover {
		color: #f0c78a;
		background-color: #fdf6ec;
		border-color: var(--el-color-warning-light-8);
	}

	&.el-button--danger {
		color: #fff;
		background-color: var(--el-color-error);
		border-color: var(--el-color-error);
	}

	&.el-button--danger:focus,
	&.el-button--danger:hover {
		background: #f78989;
		border-color: #f78989;
		color: #fff;
	}

	&.el-button--danger.is-active,
	&.el-button--danger:active {
		background: #dd6161;
		border-color: #dd6161;
		color: #fff;
	}

	&.el-button--danger:active {
		outline: 0;
	}

	&.el-button--danger.is-disabled,
	&.el-button--danger.is-disabled:active,
	&.el-button--danger.is-disabled:focus,
	&.el-button--danger.is-disabled:hover {
		color: #fff;
		background-color: #fab6b6;
		border-color: #fab6b6;
	}

	&.el-button--danger.is-plain {
		color: var(--el-color-error);
		background: #fef0f0;
		border-color: #fbc4c4;
	}

	&.el-button--danger.is-plain:focus,
	&.el-button--danger.is-plain:hover {
		background: var(--el-color-error);
		border-color: var(--el-color-error);
		color: #fff;
	}

	&.el-button--danger.is-plain:active {
		background: #dd6161;
		border-color: #dd6161;
		color: #fff;
		outline: 0;
	}

	&.el-button--danger.is-plain.is-disabled,
	&.el-button--danger.is-plain.is-disabled:active,
	&.el-button--danger.is-plain.is-disabled:focus,
	&.el-button--danger.is-plain.is-disabled:hover {
		color: #f9a7a7;
		background-color: #fef0f0;
		border-color: var(--el-color-error-light-8);
	}

	&.el-button--info {
		color: #fff;
		background-color: var(--el-text-color-secondary);
		border-color: var(--el-text-color-secondary);
	}

	&.el-button--info:focus,
	&.el-button--info:hover {
		background: #a6a9ad;
		border-color: #a6a9ad;
		color: #fff;
	}

	&.el-button--info.is-active,
	&.el-button--info:active {
		background: #82848a;
		border-color: #82848a;
		color: #fff;
	}

	&.el-button--info:active {
		outline: 0;
	}

	&.el-button--info.is-disabled,
	&.el-button--info.is-disabled:active,
	&.el-button--info.is-disabled:focus,
	&.el-button--info.is-disabled:hover {
		color: #fff;
		background-color: #c8c9cc;
		border-color: #c8c9cc;
	}

	&.el-button--info.is-plain {
		color: var(--el-text-color-secondary);
		background: var(--el-color-info-light-9);
		border-color: #d3d4d6;
	}

	&.el-button--info.is-plain:focus,
	&.el-button--info.is-plain:hover {
		background: var(--el-text-color-secondary);
		border-color: var(--el-text-color-secondary);
		color: #fff;
	}

	&.el-button--info.is-plain:active {
		background: #82848a;
		border-color: #82848a;
		color: #fff;
		outline: 0;
	}

	&.el-button--info.is-plain.is-disabled,
	&.el-button--info.is-plain.is-disabled:active,
	&.el-button--info.is-plain.is-disabled:focus,
	&.el-button--info.is-plain.is-disabled:hover {
		color: #bcbec2;
		background-color: var(--el-color-info-light-9);
		border-color: #e9e9eb;
	}

	&.el-button--text,
	&.el-button--text.is-disabled,
	&.el-button--text.is-disabled:focus,
	&.el-button--text.is-disabled:hover,
	&.el-button--text:active {
		border-color: transparent;
	}

	&.el-button--medium {
		padding: 10px 20px;
		line-height: 15px;
		font-size: 14px;
		border-radius: var(--border-radius);
	}

	&.el-button--mini,
	&.el-button--small {
		line-height: 12px;
		font-size: 12px;
		border-radius: var(--border-radius--small);
	}

	&.el-button--medium.is-round {
		padding: 10px 20px;
	}

	&.el-button--medium.is-circle {
		padding: 10px;
	}

	&.el-button--small,
	&.el-button--small.is-round {
		padding: 9px 15px;
	}

	&.el-button--small.is-circle {
		padding: 9px;
	}

	&.el-button--mini,
	&.el-button--mini.is-round {
		padding: 7px 15px;
	}

	&.el-button--mini.is-circle {
		padding: 7px;
	}

	&.el-button--text {
		color: var(--el-color-primary);
		background: 0 0;
		padding-left: 0;
		padding-right: 0;
	}

	&.el-button--text:focus,
	&.el-button--text:hover {
		color: var(--el-color-primary-hover);
		border-color: transparent;
		background-color: transparent;
	}

	&.el-button--text:active {
		color: var(--el-color-primary-active);
		background-color: transparent;
	}
}

.el-button + .el-button {
	margin-left: 8px;
}

.el-button:focus,
.el-button:hover {
	color: var(--el-color-primary);
	border-color: #c6e2ff;
	background-color: #ecf5ff;
}

.el-button:active {
	color: var(--el-color-primary-active);
	border-color: var(--el-color-primary-active);
	outline: 0;
}

.el-button::-moz-focus-inner {
	border: 0;
}

.el-button [class*="el-icon-"] + span {
	margin-left: 5px;
}

.el-button.is-plain:focus,
.el-button.is-plain:hover {
	background: #fff;
	border-color: var(--el-color-primary);
	color: var(--el-color-primary);
}

.el-button.is-active,
.el-button.is-plain:active {
	color: var(--el-color-primary-active);
	border-color: var(--el-color-primary-active);
}

.el-button.is-plain:active {
	background: #fff;
	outline: 0;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
	background-image: none;
	background-color: #fff;
	border-color: var(--el-border-color-lighter);
}

.el-button.is-disabled.el-button--text {
	background-color: transparent;
}

.el-button.is-disabled.is-plain,
.el-button.is-disabled.is-plain:focus,
.el-button.is-disabled.is-plain:hover {
	background-color: #fff;
	border-color: var(--el-border-color-lighter);
	color: var(--el-text-color-disabled);
}

.el-button.is-loading {
	position: relative;
	pointer-events: none;
}

.el-button.is-loading:before {
	pointer-events: none;
	content: "";
	position: absolute;
	left: -1px;
	top: -1px;
	right: -1px;
	bottom: -1px;
	border-radius: inherit;
	background-color: rgba(255, 255, 255, 0.35);
}

.el-button.is-round {
	border-radius: 20px;
	padding: 12px 23px;
}

.el-button.is-circle {
	border-radius: 50%;
	padding: 12px;
}

.el-button-group {
	display: inline-block;
	vertical-align: middle;
}

.el-button-group::after,
.el-button-group::before {
	display: table;
	content: "";
}

.el-button-group::after {
	clear: both;
}

.el-button-group > .el-button {
	float: left;
	position: relative;
}

.el-button-group > .el-button + .el-button {
	margin-left: 0;
}

.el-button-group > .el-button.is-disabled {
	z-index: 1;
}

.el-button-group > .el-button:first-child {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.el-button-group > .el-button:last-child {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.el-button-group > .el-button:first-child:last-child {
	border-radius: var(--border-radius);
}

.el-button-group > .el-button:first-child:last-child.is-round {
	border-radius: 20px;
}

.el-button-group > .el-button:first-child:last-child.is-circle {
	border-radius: 50%;
}

.el-button-group > .el-button:not(:first-child):not(:last-child) {
	border-radius: 0;
}

.el-button-group > .el-button:not(:last-child) {
	margin-right: -1px;
}

.el-button-group > .el-button.is-active,
.el-button-group > .el-button:not(.is-disabled):active,
.el-button-group > .el-button:not(.is-disabled):focus,
.el-button-group > .el-button:not(.is-disabled):hover {
	z-index: 1;
}

.el-button-group > .el-dropdown > .el-button {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--primary:first-child {
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--primary:last-child {
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--primary:not(:first-child):not(:last-child) {
	border-left-color: rgba(255, 255, 255, 0.5);
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success:first-child {
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success:last-child {
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--success:not(:first-child):not(:last-child) {
	border-left-color: rgba(255, 255, 255, 0.5);
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning:first-child {
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning:last-child {
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--warning:not(:first-child):not(:last-child) {
	border-left-color: rgba(255, 255, 255, 0.5);
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger:first-child {
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger:last-child {
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--danger:not(:first-child):not(:last-child) {
	border-left-color: rgba(255, 255, 255, 0.5);
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info:first-child {
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info:last-child {
	border-left-color: rgba(255, 255, 255, 0.5);
}

.el-button-group .el-button--info:not(:first-child):not(:last-child) {
	border-left-color: rgba(255, 255, 255, 0.5);
	border-right-color: rgba(255, 255, 255, 0.5);
}

.el-button {
	&.xItem-wrapper {
		width: unset;
		margin-bottom: 0;
	}
	/* default */
	--el-button-text-color: var(--el-text-color-regular);
	--el-button-border-color: var(--el-border-color);
	--el-button-bg-color: var(--el-fill-color-blank);
	/* hover;focus */
	--el-button-hover-text-color: var(--el-color-primary);
	--el-button-hover-border-color: var(--el-color-primary);
	--el-button-hover-bg-color: var(--el-color-primary-light-9);
	/* active */
	--el-button-active-text-color: var(--el-color-primary-active);
	--el-button-active-border-color: var(--el-color-primary-active);
	--el-button-active-bg-color: var(--el-color-primary-light-9);
	/* disabled */
	--el-button-disabled-text-color: var(--el-disabled-text-color);
	--el-button-disabled-border-color: var(--el-border-color-light);
	--el-button-disabled-bg-color: var(--el-fill-color-blank);

	&.el-button--blue {
		--el-button-text-color: var(--el-color-white);
		--el-button-border-color: var(--el-color-primary);
		--el-button-bg-color: var(--el-color-primary);
		--el-button-hover-text-color: var(--el-color-white);
		--el-button-hover-border-color: var(--el-color-primary-hover);
		--el-button-hover-bg-color: var(--el-color-primary-hover);
		--el-button-active-text-color: var(--el-color-white);
		--el-button-active-border-color: var(--el-color-primary-active);
		--el-button-active-bg-color: var(--el-color-primary-active);
		--el-button-disabled-text-color: var(--el-color-white);
		--el-button-disabled-border-color: var(--el-color-primary-light-5);
		--el-button-disabled-bg-color: var(--el-color-primary-light-5);
	}

	color: var(--el-button-text-color);
	border: 1px solid var(--el-button-border-color);
	background: var(--el-button-bg-color);
	transition: transform 0.1s ease-in-out;
	outline: unset;

	&:focus,
	&:hover {
		color: var(--el-button-hover-text-color);
		border-color: var(--el-button-hover-border-color);
		background-color: var(--el-button-hover-bg-color);
		transform: scale(1.01);
		.xIcon {
			color: var(--el-button-hover-text-color);
		}
	}

	&:active {
		color: var(--el-button-active-text-color);
		border-color: var(--el-button-active-border-color);
		background-color: var(--el-button-active-bg-color);
		transform: scale(0.99);
	}

	&.is-disabled,
	&.is-disabled:focus,
	&.is-disabled:hover {
		color: var(--el-button-disabled-text-color);
		border-color: var(--el-button-disabled-border-color);
		background: var(--el-button-disabled-bg-color);
	}

	&.el-button--text {
		color: var(--el-color-primary);
		background: 0 0;
		padding-left: 0;
		padding-right: 0;
		border-color: transparent;
		background-color: transparent;

		&:focus,
		&:hover,
		&:active {
			border-color: transparent;
			background-color: transparent;
		}

		&:focus,
		&:hover {
			color: var(--el-color-primary-hover);
		}

		&:active {
			color: var(--el-color-primary-active);
		}

		&.is-disabled,
		&.is-disabled:focus,
		&.is-disabled:hover,
		&:active {
			border-color: transparent;
		}

		&.is-disabled {
			color: var(--el-button-disabled-text-color);
			background-color: transparent;
		}
	}
}

.vertical {
	> .xBtn + .xBtn {
		margin-top: 10px;
		margin-left: unset;
	}
}
</style>
