<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xAutoResizer",
		props: _useXui.autoResizerProps,
		setup(props, context) {
			const { slots } = context;
			const ns = _useXui.useNamespace("auto-resizer");
			const { height, width, sizer } = _useXui.useAutoResize(props);
			return function () {
				return h(
					"div",
					{
						ref: sizer,
						class: ns.b()
					},
					[
						slots.default?.({
							height: height.value,
							width: width.value
						})
					]
				);
			};
		}
	});
}
</script>
