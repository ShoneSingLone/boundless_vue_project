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

			return h(
				tag,
				merge_hFnProps([
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
