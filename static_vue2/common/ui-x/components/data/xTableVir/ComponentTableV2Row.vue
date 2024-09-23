<script lang="ts">
export default async function () {
	const { tableV2RowProps, useTableRow } = _xUtils;

	return defineComponent({
		name: "ComponentTableV2Row",
		props: tableV2RowProps,
		setup(props, { expose, slots, attrs }) {
			const { eventHandlers, isScrolling, measurable, measured, rowRef, onExpand } =
				useTableRow(props);
			expose({ onExpand });

			return function () {
				let $vSlots = this.$vSlots;
				const { columns, columnsStyles, expandColumnKey, depth, rowData, rowIndex, style } =
					this.$vnode.data;
				let ColumnCells = _.map(columns, (column, columnIndex) => {
					const expandable = _.$isArrayFill(rowData.children);
					const cellParams = {
						column,
						columns,
						columnIndex,
						depth,
						style: columnsStyles[column.key],
						rowData,
						rowIndex,
						isScrolling: unref(isScrolling),
						expandIconProps: expandable
							? {
									rowData,
									rowIndex,
									onExpand
								}
							: false
					};
					return $vSlots.cell(cellParams);
				});

				if ($vSlots.row) {
					ColumnCells = $vSlots.row({
						cells: ColumnCells.map(node => {
							if (_.isArray(node) && node.length === 1) {
								return node[0];
							}
							return node;
						}),
						style,
						columns,
						depth,
						rowData,
						rowIndex,
						isScrolling: unref(isScrolling)
					});
				}

				const attrs = {
					role: "row",
					"data-row-index": rowIndex,
					"even-number": rowIndex % 2
				};

				if (unref(measurable)) {
					const { height, ...exceptHeightStyle } = style || {};
					const _measured = unref(measured);
					return hDiv(
						ColumnCells,
						mergeProps4h([
							{
								ref: rowRef,
								class: props.classV2,
								style: _measured ? style : exceptHeightStyle,
								attrs
							},
							attrs,
							unref(eventHandlers)
						])
					);
				}

				return hDiv(
					ColumnCells,
					mergeProps4h([
						attrs,
						{
							ref: rowRef,
							class: props.classV2,
							style: style,
							attrs
						},
						unref(eventHandlers)
					])
				);
			};
		}
	});
}
</script>

<style lang="less"></style>
