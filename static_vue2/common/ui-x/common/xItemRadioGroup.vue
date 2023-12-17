<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["value", "configs"],
		data() {
			return {
				col: 4
			};
		},
		computed: {
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
				return this.configs?.minWidth || 200;
			},
			options() {
				return this.configs?.options || [];
			},
			cptGroupProps() {
				return merge_hFnProps([
					{ attrs: this.$attrs },
					{
						staticClass: "xItemRadioGroup",
						attrs: {
							on: this.mixin_listeners,
							col: 4
						}
					}
				]);
			},
			vDomItems() {
				/*el-radio-button*/
				const tag = this.configs?.type || "el-radio";
				return _.map(this.options, ({ value, label }) =>
					h("div", {}, [
						h(
							tag,
							{
								label: value,
								key: value,
								value: this.mixin_value,
								disabled: this.cptDisabled,
								nativeOn: {
									click: () => {
										if (!this.cptDisabled) {
											this.mixin_value = value;
										}
									}
								}
							},
							[label]
						)
					])
				);
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
			return h("xAutoResizer", {}, [
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
			]);
		}
	};
}
</script>

<style lang="less">
.xForm.xItemRadioGroup {
	.xFormItem {
		min-height: var(--ui-height);
		margin-top: unset;
		&.grid-column1 {
			align-items: center;
		}
		// &+.xFormItem{ }
	}

	.el-radio__input.is-checked + .el-radio__label {
		color: var(--ui-primary);
	}
}
</style>
