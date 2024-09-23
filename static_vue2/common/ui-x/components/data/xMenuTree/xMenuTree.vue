<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			data: {
				type: Array,
				default: () => []
			},
			render: {
				type: Function
			},
			rowHeight: {
				type: Number,
				default: 32
			}
		},
		render() {
			const vm = this;
			return h("xAutoResizer", {
				$vSlots: {
					default: ({ height }) => {
						if (!height) return null;
						return h("xFixedSizeList", {
							data: vm.data,
							total: vm.data.length,
							height,
							itemSize: vm.rowHeight,
							attrs: {
								defaultRender: vm.render
							},
							layout: "vertical"
						});
					}
				}
			});
		}
	});
}
</script>
