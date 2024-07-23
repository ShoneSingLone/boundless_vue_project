<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {
			selectOptions() {
				return this.options || this?.configs?.options || [];
			}
		},
		mounted() {},
		render() {
			const vm = this;
			let attrs = {};
			if (_.isFunction(_xUtils?.globalConfigs?.xItemSelect?.defaultProps)) {
				attrs = _xUtils.globalConfigs.xItemSelect.defaultProps(vm, vm.$attrs);
			}

			const selectProps = merge_hFnProps([
				{
					attrs,
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.mixin_value = val;
					}
				},
				vm?.$vnode?.data
			]);

			const children = (() => {
				if (vm.configs?.optonsRender) {
					return [vm.configs.optonsRender({ options: vm.selectOptions, vm })];
				} else {
					return _.map(vm.selectOptions, (item, key) => {
						return h("xOption", {
							key: item.value || item.label,
							value: item.value,
							label: item.label,
							disabled: item.disabled || false
						});
					});
				}
			})();

			return h("xSelect", selectProps, children);
		}
	});
}
</script>

<style lang="less"></style>
