<script>
export default async function () {
	const { useNamespace, useAutoResize, autoResizerProps } = useXui;

	return defineComponent({
		name: "xAutoResizer",
		props: autoResizerProps,
		setup(props, context) {
			const { slots } = context;
			const ns = useNamespace("auto-resizer");
			const { height, width, sizer } = useAutoResize(props);
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
