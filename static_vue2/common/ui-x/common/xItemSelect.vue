<template>
	<xSelect v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
		<xOption v-for="item in selectOptions" :key="item.value || item.label" :value="item.value" :label="item.label" :disabled="item.disabled || false"> </xOption>
	</xSelect>
</template>

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
			if (_.isFunction(_useXui?.globalConfigs?.xItemSelect?.defaultProps)) {
				attrs = _useXui.globalConfigs.xItemSelect.defaultProps(vm, vm.$attrs);
			}

			return h(
				"xSelect",
				merge_hFnProps([
					{
						attrs,
						on: vm.mixin_listeners,
						/* configs,value */
						onChange(val) {
							debugger;
							vm.mixin_value = val;
						}
					},
					vm?.$vnode?.data
				]),
				_.map(vm.selectOptions, (item, key) => {
					return h("xOption", {
						key: item.value || item.label,
						value: item.value,
						label: item.label,
						disabled: item.disabled || false
					});
				})
			);
		}
	});
}
</script>

<style lang="less"></style>
