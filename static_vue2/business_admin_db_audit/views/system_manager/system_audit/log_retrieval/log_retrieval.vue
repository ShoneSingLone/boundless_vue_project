<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #left>
					<xAdvancedSearch
						mountTo="#AdvancedSearch"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm col="5">
								<xItem
									:configs="item"
									v-for="item in formSearch"
									:key="item.label" />
								<div class="flex end width100" span="full">
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
									<xBtn @click="resetSearchForm">重置</xBtn>
								</div>
							</xForm>
						</xBlock>
						<template #collapse>
							<xInput
								v-model="formSearch.访问时间.value"
								placeholder="请输入参数名称"
								style="width: 200px" />
							<xGap r="8" />
							<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
							<xGap r />
						</template>
					</xAdvancedSearch>
				</template>
				<template #right>
					<xBtnArray :configs="oprBtnArrayRight" />
				</template>
			</xTablebar>
			<div id="AdvancedSearch"></div>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		async mounted() {
			await this.getTableData();
		},
		data(vm) {
			return {
				isAdvancedSearchCollapse: true,
				oprBtnArrayRight: [
					{ label: "全部导出", icon: "_add", onClick() {} },
					{ label: "生成图表", icon: "_edit", onClick() {} },
					{ label: "报表备份", icon: "_add", onClick() {} }
				],
				formSearch: defItems({
					访问时间: { label: "访问时间", value: "" },
					客户端IP: { label: "客户端IP", value: "" },
					客户端MAC: { label: "客户端MAC", value: "" },
					URL: { label: "URL", value: "" },
					服务端IP: { label: "服务端IP", value: "" },
					服务端MAC: { label: "服务端MAC", value: "" },
					服务端主机名: { label: "服务端主机名", value: "" },
					服务端用户名: { label: "服务端用户名", value: "" },
					服务端端口号: { label: "服务端端口号", value: "" },
					数据库IP: { label: "数据库IP", value: "" },
					数据库MAC: { label: "数据库MAC", value: "" },
					风险等级: { label: "风险等级", value: "" },
					匹配策略: { label: "匹配策略", value: "" },
					数据库实例: { label: "数据库实例", value: "" },
					操作内容: { label: "操作内容", value: "" },
					表: { label: "表", value: "" },
					列: { label: "列", value: "" },
					响应状态: { label: "响应状态", value: "" },
					响应行数: { label: "响应行数", value: "" }
				}),
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
						{ prop: "序号", label: "序号1" },
						{ prop: "访问时间", label: "访问时间" },
						{ prop: "客户端IP", label: "客户端IP" },
						{ prop: "客户端MAC", label: "客户端MAC" },
						{ prop: "URL", label: "URL" },
						{ prop: "服务端IP", label: "服务端IP" },
						{ prop: "服务端MAC", label: "服务端MAC" },
						{ prop: "服务端主机名", label: "服务端主机名" },
						{ prop: "用户名", label: "用户名" },
						{ prop: "端口号", label: "端口号" },
						{ prop: "数据库IP", label: "数据库IP" },
						{ prop: "数据库MAC", label: "数据库MAC" },
						defTable.colActions({
							width: 160,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "查看",
											icon: "_icon_btn_view",
											onClick() {
												vm.$router.push({
													path: "/system_manager/system_audit/log_retrieval/view",
													query: { id: rowData.id }
												});
											}
										},
										{
											label: "导出",
											icon: "_icon_btn_export",
											async onClick() {
												_.$openModal({
													title: i18n("系统提示"),
													url: "@/views/system_manager/system_audit/log_retrieval/log_retrieval_export.dialog.vue",
													rowData,
													onClick() {
														vm.getTableData();
													}
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
		},
		computed: {
			selected() {
				const selectedIds = Array.from(this.configsTable.data.set);
				if (_.$isArrayFill(selectedIds)) {
					const [selectedId] = selectedIds;
					const selected = _.find(this.configsTable.data.list, { id: selectedId });
					return selected;
				}
				return {};
			}
		},
		methods: {
			async getTableData(pagination) {
				try {
					_.$loading(true);

					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const queryData = {
						pageSize: size,
						pageNum: page
					};
					const res = await _api.admin_db_audit.xdsAuditLogPage(queryData);
					const { list, total } = res;
					console.log("🚀 ~ getTableData ~ list:", list);
					_.$setTableData(this.configsTable, { list, total });
					_.$setTableData(this.configsTable, {
						list: [
							{
								id: "asdfasdfasdf",
								ipv4: "192.168.0.1",
								ipv6: "fe08:8800",
								port: "4396",
								remarks: "探针1",
								status: "running",
								active: true
							}
						],
						total: 200
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.formSearch);
			}
		}
	});
}
</script>
