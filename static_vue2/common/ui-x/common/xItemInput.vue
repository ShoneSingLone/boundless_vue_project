<script>
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

			let tag = "el-input";
			if (this.isNumber) {
				tag = "el-input-number";
			}

			let attrs = {
				showWordLimit: "",
				showPassword: vm.isShowPassword,
				autocomplete: "on",
				type: vm.$attrs.type || vm.configs?.type || "text"
			};
			if (_.isFunction(Vue?.useXui?.globalConfigs?.xItemInput?.defaultProps)) {
				attrs = Vue.useXui.globalConfigs.xItemInput.defaultProps(this, attrs);
			}

			if (vm.configs?.type === "textarea") {
				attrs.rows = 4;
			}

			return h(
				tag,
				merge_hFnProps([
					{ on: vm.mixin_listeners },
					this?.$options?.propsData || {},
					this?.$vnode?.data || {},
					this?.$vnode?.data?.attrs || {},
					attrs,
					{
						value: vm.mixin_value,
						onInput(val) {
							vm.mixin_value = val;
						}
					},
					{ attrs: vm.$attrs }
				]),
				[]
			);
		}
	});
}
</script>

<style lang="less"></style>
