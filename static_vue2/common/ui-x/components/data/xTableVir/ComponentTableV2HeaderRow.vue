<script lang="ts">
export default async function () {
	const { tableV2HeaderRowProps } = _useXui;

	return defineComponent({
		name: "ComponentTableV2HeaderRow",
		props: tableV2HeaderRowProps,
		setup(props) {
			return function () {
				let $vSlots = this.$vSlots;
				const { columns, columnsStyles, headerIndex, style } = props;
				let Cells = columns.map((column, columnIndex) => {
					return $vSlots.cell({
						columns: columns,
						column,
						columnIndex,
						headerIndex,
						style: columnsStyles[column.key]
					});
				});
				if ($vSlots.header) {
					Cells = $vSlots.header({
						cells: Cells.map(node => {
							if (_.isArray(node) && node.length === 1) {
								return node[0];
							}
							return node;
						}),
						columns: columns,
						headerIndex
					});
				}
				return h(
					"div",
					{
						class: props.classV2,
						style: style,
						attrs: {
							role: "row"
						}
					},
					[Cells]
				);
			};
		}
	});
}
</script>

<style lang="less"></style>
