<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		computed: {
			isShowPassword() {
				return !!this.configs?.isPwd;
			},
			isNumber() {
				return !!this.configs?.isNumber;
			}
		},
		render(h) {
			const vm = this;
			let tag = "xInput";
			if (this.isNumber) {
				tag = "xInputNumber";
			}
			let attrs = {
				...vm.$attrs,
				showWordLimit: "",
				showPassword: vm.isShowPassword,
				autocomplete: "on",
				type: vm.$attrs.type || vm.configs?.type || "text"
			};
			if (_.isFunction(_xUtils?.globalConfigs?.xItemInput?.defaultProps)) {
				attrs = _xUtils.globalConfigs.xItemInput.defaultProps(this, attrs);
			}

			if (vm.configs?.type === "textarea") {
				attrs.rows = 4;
			}

			/* 前面是下拉的形式 */
			if (vm.configs?.inputType === "select_input") {
				const inputProps = _.merge(
					{
						$vSlots: {
							prepend() {
								return h("xItem", {
									configs: {
										itemType: "xItemSelect",
										options: vm.configs.selectOptions || {},
										value: vm.configs.selectValue || {},
										onEmitValue({ val }) {
											vm.configs.selectValue = val;
											vm.$emit("configschange", vm.configs);
											if (_.isFunction(vm.configs.onSelectChange)) {
												vm.configs.onSelectChange({ val });
											} else {
												vm.xItem.$emit("selectChange", val);
											}
										}
									},
									style: `--xItem-wrapper-width:106px`
								});
							}
						}
					},
					mergeProps4h([
						{
							attrs,
							on: vm.mixin_listeners,
							/* configs,value */
							onInput(val) {
								vm.mixin_value = val;
							}
						},
						this?.$vnode?.data
					])
				);
				return h(tag, inputProps);
			}

			return h(
				tag,
				mergeProps4h([
					{
						attrs,
						on: vm.mixin_listeners,
						/* configs,value */
						onInput(val) {
							vm.mixin_value = val;
						}
					},
					this?.$vnode?.data
				])
			);
		}
	});
}
</script>

<style lang="less"></style>
