<style lang="less">
.xForm.xItemCheck {
	.xFormItem {
		min-height: var(--ui-height);
		margin-top: unset;
		&.grid-column1 {
			align-items: center;
		}

		.xItemCheck-item-wrapper {
			--icon-width: 32px;

			position: relative;
			overflow: hidden;
			color: var(--el-button-hover-text-color);
			border-color: var(--el-button-hover-border-color);
			background-color: var(--el-button-hover-bg-color);
			transform: scale(1.01);
			width: calc(100% - var(--ui-half));
			margin-bottom: var(--ui-half);
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			.xIcon.icon_check,
			.xItemCheck-selected-icon-wrapper {
				display: none;
			}

			&.el-button--xItemCheck-selected {
				.xItemCheck-selected-icon-wrapper {
					display: block;
					width: var(--icon-width);
					height: var(--icon-width);
					transform: rotate(45deg);
					position: absolute;
					top: -24px;
					right: -16px;
					background-color: var(--el-button-hover-text-color);
				}

				.xIcon.icon_check {
					display: block;
					position: absolute;
					color: var(--el-color-white);
					top: 0;
					right: 0;
					width: 8px;
					height: 8px;
				}
			}
		}
	}
}
</style>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["value", "configs", "options"],
		data() {
			return {
				col: 4
			};
		},
		computed: {
			cptPrivateSet: {
				get() {
					return new Set(this.mixin_value || []);
				},
				set(newSet) {
					this.mixin_value = Array.from(newSet);
				}
			},
			cptFormStyle() {
				return {
					width: `${this.col * this.minWidth}px`
				};
			},
			cptDisabled() {
				if (hasOwn(this.$attrs, "disabled")) {
					return this.$attrs.disabled;
				}
				return false;
			},
			minWidth() {
				return this.configs?.minWidth || 80;
			},
			selectOptions() {
				return this.options || this.configs?.options || [];
			},
			cptGroupProps() {
				return merge_hFnProps([
					{ attrs: this.$attrs },
					{
						staticClass: "xItemCheck",
						attrs: {
							on: this.mixin_listeners,
							col: 4
						}
					}
				]);
			},
			vDomItems() {
				const vm = this;
				/*el-radio-button*/
				const renderOption = this.configs?.renderOption;
				return _.map(this.selectOptions, item => {
					let { value, label } = item;
					if (renderOption) {
						label = renderOption.call(vm.configs, item);
					}

					return h(
						"xBtn",
						{
							label: value,
							key: value,
							value: this.mixin_value,
							disabled: this.cptDisabled,
							staticClass: "xItemCheck-item-wrapper flex middle",
							preset: this.cptPrivateSet.has(value) ? "xItemCheck-selected" : "",
							nativeOn: {
								click: () => {
									if (!this.cptDisabled) {
										if (this.cptPrivateSet.has(value)) {
											this.cptPrivateSet.delete(value);
										} else {
											this.cptPrivateSet.add(value);
										}
										this.cptPrivateSet = this.cptPrivateSet;
									}
								}
							}
						},
						[
							label,
							h("div", {
								staticClass: "xItemCheck-selected-icon-wrapper"
							}),
							h("xIcon", {
								icon: "icon_check"
							})
						]
					);
				});
			}
		},
		methods: {
			getCol(width, col) {
				if (col === 1) {
					return 1;
				}
				const _minWidth = width / col;
				if (_minWidth > this.minWidth) {
					return col;
				} else {
					return this.getCol(width, col - 1);
				}
			}
		},
		render() {
			return h(
				"xAutoResizer",
				{
					staticClass: "xItemCheck"
				},
				[
					{
						default: ({ width, height }) => {
							if (width) {
								const col = this.getCol(width, Math.ceil(width / this.minWidth));
								if (this.col != col) {
									this.col = col;
								}
								return h(
									"xForm",
									{
										...this.cptGroupProps,
										style: this.cptFormStyle,
										col: this.col
									},
									this.vDomItems
								);
							}
						}
					}
				]
			);
		}
	};
}
</script>
