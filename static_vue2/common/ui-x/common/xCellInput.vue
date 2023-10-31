<template>
	<xItem :configs="innerComponentConfigs" :value="privateModel" size="mini" />
</template>

<script>
export default async function () {
	const { useCellArgs } = await _.$importVue(
		"/common/ui-x/common/ItemMixins.vue"
	);
	return {
		setup() {
			onMounted(() => {
				if (this.configs?.col?.xCellInput?.props) {
					this.$watch(
						"configs.col.xCellInput.props",
						(options, oldOptions) => {
							const a = JSON.stringify(options);
							const b = JSON.stringify(oldOptions);
							if (a !== b) {
								this.innerComponentConfigs.props = options || [];
							}
						},
						{ immediate: true }
					);
				}
			});
			return useCellArgs({
				vm: this,
				itemType: "xCellInput",
				cellConfigs: this.configs?.col?.xCellInput
			});
		}
	};
}
</script>
