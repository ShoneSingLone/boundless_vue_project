<template>
	<div>
		<xMd :md="md" />
		<xTableVir
			:columns="columns"
			:data="data"
			:height="400"
			fixed
			:slotsRow="customRowRender"
			:rowHeight="rowHeight" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const dataGenerator = (_, index) => ({
				id: `random-id-${++index}`,
				group: index % 10,
				name: `Tom_${index}`
			});
			const columns = [
				{
					prop: "no",
					label: "no",
					align: "center",
					cellRenderer: ({ rowIndex }) => {
						return rowIndex + 1;
					}
				},
				{
					prop: "group",
					label: "Group",
					align: "center",
					cellRenderer: ({ cellData: name, rowIndex }) => {
						return h("xTag", [name, "-", rowIndex]);
					}
				},
				{
					prop: "name",
					label: "Name",
					align: "center",
					cellRenderer: ({ cellData: name }) => {
						return h("xTag", [name]);
					}
				}
			];
			/* 处理数据 */
			/* 分组 */
			const needMergeColumnProp = "group";
			const groupedRowObj = _.groupBy(
				Array.from({ length: 100 }).map(dataGenerator),
				needMergeColumnProp
			);
			/* rowHeight需要保持一致，所以不要妄图动态行高，都是计算量 */
			const rowHeight = 50;
			return {
				md: `**rowHeight**需要保持一致，所以不要妄图使用动态行高，都是计算量`,
				rowHeight,
				columns,
				data: xTableVirNewGroupSortedRows({
					groupedRowObj,
					mergeProp: needMergeColumnProp
				}),
				customRowRender({ cells, columns, depth, isScrolling, rowData, rowIndex, style }) {
					return xTableVirModifyCellsHeight({
						mergeProp: "group",
						columns,
						cells,
						rowData,
						rowHeight,
						calStyle({ rowSpan }) {
							return {
								backgroundColor: "var(--el-color-primary-light-3)",
								height: `${rowSpan * rowHeight}px`,
								alignSelf: "flex-start",
								zIndex: rowSpan
							};
						}
					});
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
