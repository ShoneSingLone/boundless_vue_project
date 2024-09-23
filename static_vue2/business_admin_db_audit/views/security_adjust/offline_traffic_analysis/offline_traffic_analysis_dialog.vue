<template>
	<xDialog style="--xDialog-wrapper-width: 70vw">
		<xRow>
			<xCol style="--xItem-wrapper-width: 220px; --xItem-label-width: 68px">
				<div class="flex">
					<div class="mess">文件路径:D/</div>
					<xGap f />
					<xBtnArray :configs="oprBtnArray" style="margin-left: 20px" />
				</div>
			</xCol>
		</xRow>
		<div class="mt8" style="height: 200px">
			<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
		</div>
		<xPagination :configs="configsTable" />
	</xDialog>
</template>

<script>
export default async function () {
	return {
		name: "offline_traffic_analysis_dialog",
		data() {
			return {
				formSearch: defItems({
					部门id: { label: "", value: "", placeholder: "请输入" }
				}),
				oprBtnArray: [
					{ label: "全部导出", icon: "", preset: "primary", onClick() {} },
					{ label: "生成报表", icon: "", preset: "primary", onClick() {} }
				],
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						defTable.colSingle({
							by: "id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "文件路径", label: "访问时间" },
						{ prop: "上传状态", label: "客户端IP" },
						{ prop: "结果", label: "客户端MAC" },
						{ prop: "结果", label: "服务端主机名" },
						{ prop: "结果", label: "用户名" },
						{ prop: "结果", label: "端口号" },
						{ prop: "结果", label: "数据库IP" },
						{ prop: "结果", label: "数据库MAC" },
						{ prop: "结果", label: "数据库实例" }
					]
				})
			};
		}
	};
}
</script>

<style scoped lang="less">
.mess {
	font-weight: 400;
	font-size: 14px;
	color: #333333;
}
</style>
