<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		computed: {},
		render(h) {
			const vm = this;

			return h(
				"xIpAddress",
				mergeProps4h([
					{
						attrs: vm.$attrs,
						on: vm.mixin_listeners
						/* configs,value */
					},
					this?.$vnode?.data
				])
			);
		}
	});
}
</script>

<style lang="less"></style>
