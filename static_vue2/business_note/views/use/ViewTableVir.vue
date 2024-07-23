<template>
	<div class="x-page-view">
		<xPageContent>
			<xTableVir :columns="columns" :data="data" />
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		setup() {
			const generateColumns = (length = 10, prefix = "column-", props) =>
				Array.from({ length }).map((_, columnIndex) => ({
					...props,
					prop: `${prefix}${columnIndex}`,
					label: `Column ${columnIndex}`,
					width: 150,
					flexGrow: 1,
					___cellRenderer({ cellData }) {
						return cellData;
					}
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
			const data = generateData(columns, 200);

			return {
				columns: ref(columns),
				data
			};
		}
	};
}
</script>

<style lang="less"></style>
