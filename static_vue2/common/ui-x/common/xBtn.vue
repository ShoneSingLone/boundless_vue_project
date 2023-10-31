<script>
export default async function () {
	/* 定制颜色基本上就是 text hover，focus active disabled */

	const PRESET = {
		blue: `
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
`
	};

	return {
		NEED_HMR: localStorage.isDev,
		props: ["configs"],
		data() {
			return {
				isLoading: false
			};
		},
		computed: {
			cpt_style() {
				const type = (() => {
					if (this.configs?.preset) {
						return this.configs.preset;
					}
					if (this.$attrs?.preset) {
						return this.$attrs.preset;
					}
					return {};
				})();

				return PRESET[type] || {};
			},
			cpt_isHide() {
				if (_.isFunction(this.configs?.isHide)) {
					return this.configs.isHide();
				}
				if (_.isBoolean(this.configs?.isHide)) {
					return this.configs.isHide;
				}
				return this.$attrs.isHide !== undefined;
			},
			cpt_disabled() {
				if (this.$attrs.disabled) {
					return this.$attrs.disabled;
				}
				if (_.isFunction(this.configs?.disabled)) {
					return this.configs.disabled();
				}
				if (_.isBoolean(this.configs?.disabled)) {
					return this.configs.disabled;
				}

				if (this.configs?.disabled !== undefined) {
					return this.configs.disabled;
				}

				return false;
			},
			cpt_labe() {
				if (_.isFunction(this.configs?.label)) {
					return this.configs.label;
				}
				if (_.isString(this.configs?.label)) {
					return this.configs.label;
				}
				if (_.isArray(this.$slots?.default)) {
					return this.$slots.default;
				}
				if (this.configs?.label !== undefined) {
					return this.configs.label;
				}

				return "";
			}
		},
		methods: {
			labelRender(h) {
				return;
			},
			async handleClick(...args) {
				try {
					this.isLoading = true;
					if (_.isFunction(this.$listeners.click)) {
						await this.$listeners.click.apply(this, args);
					}
					if (_.isFunction(this.configs?.onClick)) {
						await this.configs.onClick();
					}
				} catch (error) {
					console.error(error);
				} finally {
					this.isLoading = false;
				}
			}
		},
		render(h) {
			if (this.cpt_isHide) {
				return null;
			}

			return h(
				"el-button",
				{
					directives: [
						{
							name: "ripple",
							rawName: "v-ripple",
							value: {
								duration: 300
							},
							expression: "{duration:300}"
						}
					],
					staticClass: "xBtn",
					style: this.cpt_style,
					props: {
						key: this.cpt_labe,
						disabled: this.cpt_disabled
					},
					attrs: {
						...this.$attrs,
						loading: this.isLoading
					},
					on: {
						click: this.handleClick
					}
				},
				[this.cpt_labe]
			);
		}
	};
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
}

.xBtn {
	&.el-button {
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
}

.vertical {
	> .xBtn + .xBtn {
		margin-top: 10px;
		margin-left: unset;
	}
}
</style>
