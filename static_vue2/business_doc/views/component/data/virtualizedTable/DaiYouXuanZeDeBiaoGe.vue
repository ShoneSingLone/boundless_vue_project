<template>
	<xTableVir :columns="columns" :data="data" :height="500" fixed />
</template>
<script>
export default async function () {
	return defineComponent({
		setup() {
			const generateColumns = (length = 10, prefix = "column-", props) =>
				Array.from({ length }).map((_, columnIndex) => ({
					...props,
					prop: `${prefix}${columnIndex}`,
					label: `Column ${columnIndex}`,
					width: 150
				}));

			const generateData = (columns, length = 200, prefix = "row-") =>
				Array.from({ length }).map((_, rowIndex) => {
					return columns.reduce(
						(rowData, column, columnIndex) => {
							rowData[column.prop] = `Row ${rowIndex} - Col ${columnIndex}`;
							return rowData;
						},
						{
							id: `${prefix}${rowIndex}`,
							checked: false,
							parentId: null
						}
					);
				});

			const columns = generateColumns(10);

			columns.unshift({
				prop: "selection",
				width: 50,
				cellRenderer: ({ rowData }) => {
					const onChange = value => (rowData.checked = value);

					return h("ElCheckbox", { value: rowData.checked, onChange });
				},
				headerCellRenderer: () => {
					const _data = unref(data);
					const onChange = value =>
						(data.value = _data.map(row => {
							row.checked = value;
							return row;
						}));
					const allSelected = _data.every(row => row.checked);
					const containsChecked = _data.some(row => row.checked);
					return h("ElCheckbox", { value: allSelected, intermediate: containsChecked && !allSelected, onChange });
				}
			});

			const data = ref(generateData(columns, 200));

			return {
				data,
				columns
			};
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
