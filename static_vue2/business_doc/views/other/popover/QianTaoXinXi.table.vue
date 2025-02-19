<template>
	<div style="height: 300px; width: 500px">
		<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		mounted() {
			_.$setTableData(this.configsTable, {
				list: [
					{
						date: "2016-05-02",
						name: "上海市普陀区金沙江路",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					}
				]
			});
		},
		data(vm) {
			return {
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {},
					data: {
						set: new Set(),
						list: [],
						expandedRowKeys: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "date", label: "date" },
						{ prop: "name", label: "name" },
						{ prop: "address", label: "address" },
						defTable.colActions({
							width: 120,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										/* { label: "添加子部门", icon: "_icon_btn_add_sub_dept", onClick() { vm.$router.push({ path: "/dept/edit", query: { id: rowData.id } }); } }, */
										{
											label: "编辑",
											icon: "edit"
										},
										{
											label: "删除",
											icon: "delete",
											onClick() {
												return _.$confirm({
													title: "提示",
													content: `是否删除所选数据？`
												});
											}
										}
									]
								});
							}
						})
					]
				})
			};
		}
	});
}
</script>
<style lang="less"></style>
