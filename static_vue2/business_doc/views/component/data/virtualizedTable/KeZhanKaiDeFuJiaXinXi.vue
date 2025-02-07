<template>
	<div>
		<xMd :md="md" />
		<div>configsTable.data.expandedRowKeys: {{ configsTable.data.expandedRowKeys }}</div>
		<xTableVir
			fixed
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			:expandedRowKeys.sync="configsTable.data.expandedRowKeys"
			:estimated-row-height="100"
			:slotsRow="customRowRender"
			:expandColumnKey="'detail'" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		mounted() {
			this.configsTable.onQuery();
		},
		data() {
			const vm = this;
			return {
				md: `使用动态高度渲染，您也可以在表格中显示详细的视图。
> 有【动态高度行】一样的性能弊端，行高尽量设置高一点，使可视区域内的行数尽量少，这样可以减少计算量`,
				selected: {},
				configsTable: defTable({
					onQuery() {
						const list = _.map(new Array(2000), (i, rowIndex) => {
							return {
								id: rowIndex,
								column1: `row_${rowIndex + 1}`,
								column2: `row_${rowIndex + 1}`,
								column3: `row_${rowIndex + 1}`,
								/* children关键字用于子级数据 */
								children: _.map(new Array(1), (i, subRowIndex) => {
									return {
										parentId: rowIndex,
										id: `${rowIndex}-${subRowIndex}`,
										column1: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column2: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column3: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										/* 特定字段用于展示 */
										detail: true
									};
								})
							};
						});

						_.$setTableData(vm.configsTable, {
							list,
							total: list.length
						});
					},
					data: {
						list: [],
						expandedRowKeys: [0, 1]
					},
					columns: [
						defTable.colExpandArrow({
							width: 30
						}),
						{ prop: "column1", label: i18n("column1") },
						{ prop: "column2", label: i18n("column2") },
						{ prop: "column3", label: i18n("column3") }
					]
				})
			};
		},
		methods: {
			customCellRenderer({ rowData, column }) {
				return hDiv({ style: { width: "100px" } }, rowData[column.prop] + "asdfasdfas");
			},
			customRowRender(props) {
				const { cells, rowData } = props;
				if (rowData.detail) {
					/* 带有特定样式类div作为 wrapper */
					return hTableExpandRow([
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData)),
						hDiv(JSON.stringify(rowData))
					]);
				} else {
					return cells;
				}
			}
		}
	});
}
</script>
