<script>
export default async function () {
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
				type: String,
				default: "button"
			},
			ripple: {
				type: Boolean,
				default: true
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
			cptIcon() {
				if (this.icon) {
					return this.icon;
				}
				if (this.configs?.icon) {
					return this.configs.icon;
				}
				return "";
			},
			cptUseRipple() {
				if (this.ripple) {
					return {
						name: "ripple",
						value: {
							duration: 300
						}
					};
				}
				return {};
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			buttonSize() {
				if (this.configs?.size) {
					return this.configs.size;
				}
				return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
			},
			buttonDisabled() {
				if (this.$options.propsData.hasOwnProperty("disabled") ? this.disabled : (this.elForm || {}).disabled) {
					return true;
				}

				if (this.cptDisabled) {
					return true;
				}

				return false;
			},
			cptDisabledTips() {
				if (this.cptDisabled) {
					if (_.isString(this.cptDisabled) || this.cptDisabled.TYPE_IS_VNODE) {
						return this.cptDisabled;
					}
				}
				return "";
			},
			cptLabel() {
				if (_.isFunction(this.configs?.label)) {
					return this.configs.label();
				}
				if (_.isString(this.configs?.label)) {
					return this.configs.label;
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
				return [
					vm?.configs?.class || "",
					"el-button",
					/* 颜色 */
					vm.cptPreset ? "el-button--" + vm.cptPreset : "",
					/* 大小 */
					vm.buttonSize ? "el-button--" + vm.buttonSize : "",
					/* 形状 */
					{
						"is-disabled": vm.buttonDisabled,
						"is-loading": vm.cptLoading,
						"is-plain": vm.plain,
						"is-round": vm.round,
						"is-circle": vm.cptCircle
					}
				];
			},
			cptCircle() {
				return this.circle || this.configs.circle;
			},
			cptChildren() {
				if (_.isFunction(this.$vSlots?.default)) {
					return h("span", this.$vSlots.default());
				}
				if (this.$vSlots?.TYPE_IS_VNODE) {
					return this.$vSlots;
				}
				return this.cptLabel;
			}
		},
		methods: {
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
			//
			return h(
				"button",
				{
					directives: [
						vm.cptUseRipple,
						{
							name: "xtips",
							value: {
								placement: "top",
								content: vm.cptDisabledTips
							}
						}
					],
					onClick() {
						vm.handleClick();
					},
					on: vm.$listeners,
					disabled: vm.buttonDisabled || vm.cptLoading,
					autofocus: vm.autofocus,
					type: vm.type,
					class: vm.cptClassName
				},
				[
					h("i", { vIf: vm.cptLoading, class: "el-icon-loading" }),
					h("i", { vIf: !vm.cptLoading && vm.cptIcon, class: vm.cptIcon }),
					/* vNode的变动不会触发render重新执行 */
					vm.cptChildren || this.$slots.default
				]
			);
		}
	});
}
</script>

<style lang="less">
.el-button {
	/* default */
	--el-button-text-color: var(--el-text-color-regular);
	--el-button-border-color: var(--el-border-color);
	--el-button-bg-color: var(--el-fill-color-blank);
	/* hover;focus */
	--el-button-hover-text-color: var(--ui-primary);
	--el-button-hover-border-color: var(--ui-primary);
	--el-button-hover-bg-color: var(--el-color-primary-light-9);
	/* active */
	--el-button-active-text-color: var(--ui-primary-active);
	--el-button-active-border-color: var(--ui-primary-active);
	--el-button-active-bg-color: var(--el-color-primary-light-9);
	/* disabled */
	--el-button-disabled-text-color: var(--el-disabled-text-color);
	--el-button-disabled-border-color: var(--el-border-color-light);
	--el-button-disabled-bg-color: var(--el-fill-color-blank);

	&.el-button--blue {
		--el-button-text-color: var(--el-color-white);
		--el-button-border-color: var(--ui-primary);
		--el-button-bg-color: var(--ui-primary);
		--el-button-hover-text-color: var(--el-color-white);
		--el-button-hover-border-color: var(--ui-primary-hover);
		--el-button-hover-bg-color: var(--ui-primary-hover);
		--el-button-active-text-color: var(--el-color-white);
		--el-button-active-border-color: var(--ui-primary-active);
		--el-button-active-bg-color: var(--ui-primary-active);
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
		color: var(--ui-primary);
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
			color: var(--ui-primary-hover);
		}

		&:active {
			color: var(--ui-primary-active);
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
