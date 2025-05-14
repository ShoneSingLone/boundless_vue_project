<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs", "readonly"],
		computed: {
			cptReadonly() {
				return this.readonly;
			},
			selectOptions() {
				return this.options || _.$val(this, "configs.options") || [];
			}
		},
		mounted() {},
		render() {
			const vm = this;
			let attrs = {};
			if (_.isFunction(_.$val(_xUtils, "globalConfigs.xItemSelect.defaultProps"))) {
				attrs = _xUtils.globalConfigs.xItemSelect.defaultProps(vm, vm.$attrs);
			}

			const selectProps = mergeProps4h([
				{
					attrs,
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.mixin_value = val;
					}
				},
				_.$val(vm, "$vnode.data")
			]);

			const children = (() => {
				if (_.$val(vm, "configs.optonsRender")) {
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

			if (vm.cptReadonly) {
				const item = _.find(vm.selectOptions, { value: vm.mixin_value });
				return hDiv([_.$val(item, "label") || vm.mixin_value]);
			}

			return h("xSelect", selectProps, children);
		}
	});
}
</script>
