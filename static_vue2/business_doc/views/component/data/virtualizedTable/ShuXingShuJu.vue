<template>
	<div>
		<xMd :md="md" />
		<div>configsTable.data.expandedRowKeys: {{ configsTable.data.expandedRowKeys }}</div>
		<xTableVir
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			fixed
			:expandedRowKeys.sync="configsTable.data.expandedRowKeys" />
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
				md: `虚拟表也可以在树状结构中呈现数据。 点击箭头图标，你可以展开或折叠树节点。\n\n如果有\`children\`就可以展开\n\n\`rowKey\`默认为id，展开根据id字段`,
				selected: {},
				configsTable: defTable({
					onQuery() {
						const list = _.map(new Array(20), (i, rowIndex) => {
							return {
								id: rowIndex,
								column1: `row_${rowIndex + 1}`,
								column2: `row_${rowIndex + 1}`,
								column3: `row_${rowIndex + 1}`,
								children: _.map(new Array(20), (i, subRowIndex) => {
									return {
										parentId: rowIndex,
										id: `${rowIndex}-${subRowIndex}`,
										column1: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column2: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column3: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										children: _.map(new Array(2), (i, thirdRowIndex) => {
											return {
												parentId: rowIndex,
												id: `${rowIndex}-${subRowIndex}-${thirdRowIndex}`,
												column1: `third_sub_row_${rowIndex + 1}_${subRowIndex + 1}_${thirdRowIndex + 1}`,
												column2: `third_sub_row_${rowIndex + 1}_${subRowIndex + 1}_${thirdRowIndex + 1}`,
												column3: `third_sub_row_${rowIndex + 1}_${subRowIndex + 1}_${thirdRowIndex + 1}`
											};
										})
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
						expandedRowKeys: [0, "0-0"]
					},
					columns: [
						defTable.colExpandArrow({ width: 60 }),
						{ prop: "column1", label: i18n("column1") },
						{ prop: "column2", label: i18n("column2") },
						{ prop: "column3", label: i18n("column3") }
					]
				})
			};
		}
	});
}
</script>
