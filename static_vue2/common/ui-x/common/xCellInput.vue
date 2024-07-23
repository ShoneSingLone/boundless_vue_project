<script lang="ts">
export default async function () {
	const { useCellArgs } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		setup() {
			const { innerComponentConfigs, privateModel } = useCellArgs({
				vm: this,
				itemType: "xItemInput",
				cellConfigs: this.configs?.col?.componentOptions
			});
			this.innerComponentConfigs = innerComponentConfigs;
			return function () {
				_.$val(
					innerComponentConfigs,
					"payload",
					_.merge(innerComponentConfigs.payload, this.configs)
				);
				return h("xItem", {
					configs: innerComponentConfigs,
					value: privateModel.value,
					size: "mini"
				});
			};
		}
	};
}
</script>
