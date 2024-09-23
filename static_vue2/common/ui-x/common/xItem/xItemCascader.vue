<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {},
		mounted() {},
		render() {
			const vm = this;

			const cascaderProps = mergeProps4h([
				{
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.mixin_value = val;
					}
				},
				vm?.$vnode?.data
			]);

			return h("xCascader", cascaderProps);
		}
	});
}
</script>

<style lang="less"></style>
