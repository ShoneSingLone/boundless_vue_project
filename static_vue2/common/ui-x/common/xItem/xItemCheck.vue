<style lang="less">
.xForm.xItemCheck {
	.xFormItem {
		min-height: var(--ui-height);
		margin-top: unset;
		&.grid-column1 {
			align-items: center;
		}
	}
}

.xItemCheck-item-wrapper {
	&.itemUse-BlockCheck {
		--icon-width: 32px;

		&.is-group-item {
			width: calc(100% - var(--ui-half));
		}
		position: relative;
		overflow: hidden;
		color: var(--el-button-hover-text-color);
		border-color: var(--el-button-hover-border-color);
		background-color: var(--el-button-hover-bg-color);
		transform: scale(1.01);
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
</style>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	/* cptConfigs isGroup 为是否多选 */
	return {
		mixins: [mixins],
		props: ["value", "cptConfigs", "options", "disabled"],
		data() {
			return {
				col: 4
			};
		},
		computed: {
			cptPrivateSet: {
				get() {
					try {
						return new Set(this.mixin_value || []);
					} catch (error) {
						return new Set(this.mixin_value ? [this.cptDefaultItem.value] : []);
					}
				},
				set(newSetOrVal) {
					if (this.cptConfigs.isGroup) {
						this.mixin_value = Array.from(newSetOrVal);
					} else {
						this.mixin_value = !!newSetOrVal.size;
					}
				}
			},
			cptFormStyle() {
				return {
					width: `${this.col * this.minWidth}px`
				};
			},
			cptDisabled() {
				if (this.disabled) {
					return true;
				}
				if (hasOwn(this.$attrs, "disabled")) {
					return this.$attrs.disabled;
				}
				return false;
			},
			minWidth() {
				return this.cptConfigs?.minWidth || 80;
			},
			selectOptions() {
				return this.options || this.cptConfigs?.options || [];
			},
			cptGroupProps() {
				return mergeProps4h([
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
			cptRenderOption() {
				return this.cptConfigs?.renderOption;
			},
			cptItemRederer() {
				if (this.cptConfigs?.xItemCheckUse === "blockCheck") {
					return this.itemUseBlockCheck;
				}
				return this.itemUseDefault;
			},
			cptDefaultItem() {
				let item = _.first(this.cptConfigs?.options);
				if (!_.isPlainObject(item)) {
					if (item) {
						item = {
							value: item,
							label: item
						};
					} else {
						item = {
							value: "NO_LABEL",
							label: ""
						};
					}
				}
				return item;
			}
		},
		methods: {
			cptCheckItemArray() {
				return _.map(this.selectOptions, this.cptItemRederer);
			},
			setPrivateSet(itemValue, isChecked) {
				if (!this.cptDisabled) {
					if (isChecked) {
						this.cptPrivateSet.add(itemValue);
					} else {
						this.cptPrivateSet.delete(itemValue);
					}
					this.cptPrivateSet = this.cptPrivateSet;
				}
			},
			/* itemUse 各种类型 */
			itemUseDefault(item) {
				item = item || this.cptDefaultItem;
				const checkboxProps = {
					value: this.cptPrivateSet.has(item.value),
					label: item.label,
					onChange: isChecked => {
						this.setPrivateSet(item.value, isChecked);
					}
				};

				if (this.disabled) {
					checkboxProps.disabled = true;
				}

				/* @ts-ignore */
				return h("xCheckbox", checkboxProps);
			},
			itemUseBlockCheck(item) {
				const vm = this;
				let { value, label } = item || vm.cptDefaultItem;
				if (vm.cptRenderOption) {
					label = vm.cptRenderOption.call(vm.cptConfigs, item);
				}
				return h(
					"xBtn",
					{
						label: label,
						key: value,
						disabled: this.cptDisabled,
						class: {
							"xItemCheck-item-wrapper flex middle itemUse-BlockCheck": true,
							"is-group-item": this.cptConfigs.isGroup
						},
						preset: this.cptPrivateSet.has(value) ? "xItemCheck-selected" : "",
						nativeOn: {
							click: () => {
								const isChecked = !this.cptPrivateSet.has(value);
								this.setPrivateSet(value, isChecked);
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
			},
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
			},
			/* **************renderer************** */
			rendererGroupItems() {
				return h(
					"xAutoResizer",
					{
						staticClass: "xItemCheck"
					},
					[
						{
							default: ({ width, height }) => {
								if (width) {
									const col = this.getCol(
										width,
										Math.ceil(width / this.minWidth)
									);
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
										this.cptCheckItemArray()
									);
								}
							}
						}
					]
				);
			},
			rendererGroupItem() {
				return h("div", [this.cptItemRederer()]);
			}
		},
		render() {
			if (this.cptConfigs?.isGroup) {
				/* 多选 value 为数组，元素为配置的value */
				return this.rendererGroupItems();
			} else {
				/* 单选 value 为true 或者 false */
				return this.rendererGroupItem();
			}
		}
	};
}
</script>
