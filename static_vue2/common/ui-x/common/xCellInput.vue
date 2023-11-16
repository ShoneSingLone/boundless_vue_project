<script>
export default async function () {
	const { useCellArgs } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		setup() {
			onMounted(() => {
				if (this.configs?.col?.componentOptions?.props) {
					this.$watch(
						"configs.col.componentOptions.props",
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

			const { innerComponentConfigs, privateModel } = useCellArgs({
				vm: this,
				itemType: "xItemInput",
				cellConfigs: this.configs?.col?.componentOptions
			});
			this.innerComponentConfigs = innerComponentConfigs;

			return function () {
				_.$val(innerComponentConfigs, "payload", _.merge(innerComponentConfigs.payload, this.configs));
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
