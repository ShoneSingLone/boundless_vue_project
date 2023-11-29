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
			},
			cptTag() {
				let tag = "el-input";
				if (this.isNumber) {
					tag = "el-input-number";
				}
				return tag;
			},
			cptProps() {
				const vm = this;
				debugger;
				let attrs = {
					...vm.$attrs,
					showWordLimit: "",
					showPassword: vm.isShowPassword,
					autocomplete: "on",
					type: vm.$attrs.type || vm.configs?.type || "text"
				};
				if (_.isFunction(Vue?.useXui?.globalConfigs?.xItemInput?.defaultProps)) {
					attrs = Vue._useXui.globalConfigs.xItemInput.defaultProps(this, attrs);
				}

				if (vm.configs?.type === "textarea") {
					attrs.rows = 4;
				}
				const props = merge_hFnProps([
					this?.$vnode?.data || {},
					vm.configs,
					{
						attrs,
						on: vm.mixin_listeners,
						/* configs,value */
						onInput(val) {
							vm.mixin_value = val;
						}
					}
				]);
				return props;
			}
		},
		render(h) {
			return h(this.cptTag, this.cptProps);
		}
	});
}
</script>

<style lang="less"></style>
