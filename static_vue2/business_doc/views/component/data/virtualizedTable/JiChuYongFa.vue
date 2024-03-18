<template>
	<div class="margin16">
		<xMd :md="'让我们演示虚拟化表的性能，4 000行渲染一个基本示例。'" />
		<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" :height="400" fixed />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["totalData"],
		mounted() {
			this.configsTable.onQuery();
		},
		data(props) {
			const vm = this;
			return {
				configsTable: defTable({
					onQuery() {
						_.$setTableData(vm.configsTable, { list: vm.totalData });
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colExpandArrow(),
						defTable.colMultiple({
							by: "id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{ prop: "name", label: i18n("name") },
						{ prop: "age", label: i18n("age") },
						{ prop: "sex", label: i18n("sex") },
						{ prop: "phone", label: i18n("phone") },
						{ prop: "address", label: i18n("address") },
						defTable.colActions({
							width: 120,
							cellRenderer({ rowData }) {
								return _useXui.render.ActionAndMore({
									col: 3,
									children: [
										/* { label: i18n("快速添加规则") }, { label: i18n("添加规则") }, */
										{
											label: i18n("确认"),
											onClick() {
												_.$msgSuccess("确认");
											}
										},
										{
											label: i18n("删除"),
											disabled() {
												return rowData.id % 2;
											},
											confirm: {
												tips: `${i18n("确认删除")} ${rowData.id} ？`,
												onOk() {
													_.$msgSuccess("删除成功");
												}
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
