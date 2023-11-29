<template>
	<div class="margin16">
		<Md :md="'让我们演示虚拟化表的性能，用10列和1 000行渲染一个基本示例。'" />
		<xTableVir :columns="columns" :data="data" :width="700" :height="400" fixed />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		setup(props) {
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
							parentId: null
						}
					);
				});

			const columns = generateColumns(10);
			const data = generateData(columns, 1000);

			return { data, columns };
		}
	});
}
</script>
