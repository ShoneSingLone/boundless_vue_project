<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<template #right>
					<xAdvancedSearch
						mountTo="#AdvancedSearch"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm>
								<xItem :configs="formSearch.ipaddr" />
								<xItem :configs="formSearch.userName" />
								<xItem :configs="formSearch.status" />
								<xItem :configs="formSearch.dateRange" />
								<div class="flex end width100" span="2">
									<xBtn @click="resetSearchForm">重置</xBtn>
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
								</div>
							</xForm>
						</xBlock>
						<template #collapse>
							<xItem :configs="formSearch.userName" />
							<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
						</template>
					</xAdvancedSearch>
				</template>
			</xTablebar>
			<div id="AdvancedSearch"></div>
			<div class="x-page-content-middle mt8 flex horizon">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	let dicts = {
		sys_oper_type: null,
		sys_common_status: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		setup() {},
		async mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				currentTypeRow: {},
				drawer: false,
				isAdvancedSearchCollapse: true,
				deptId: "",
				/*  */
				oprBtnArray: [
					{
						label: i18n("删除"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["monitor:logininfor:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("清空"),
						isHide: () => !vm.$auth.hasPermiOr(["monitor:logininfor:remove"]),
						async onClick() {
							vm.doDelete("emtpy");
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["monitor:logininfor:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					ipaddr: _adminTools.search_form_configs_text({ label: i18n("登录地址") }),
					userName: _adminTools.search_form_configs_text({ label: i18n("用户名称") }),
					status: _adminTools.search_form_configs_select({
						label: i18n("状态"),
						options: dicts.sys_common_status
					}),
					dateRange: _adminTools.search_form_configs_text({ label: i18n("登录时间") })
				}),
				configsTable: defTable({
					isHideQuery: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "infoId",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{ label: i18n("访问编号"), prop: "infoId" },
						{ label: i18n("用户名称"), prop: "userName" },
						{ label: i18n("登录地址"), prop: "ipaddr" },
						{ label: i18n("登录地点"), prop: "loginLocation" },
						{ label: i18n("浏览器"), prop: "browser" },
						{ label: i18n("操作系统"), prop: "os" },
						{
							label: i18n("登录状态"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								_jsxFns.OptionsToLabel(cellData, dicts.sys_common_status)
						},
						{ label: i18n("操作信息"), prop: "msg" },
						{ label: i18n("登录日期"), prop: "loginTime" },
						defTable.colActions({
							width: 100,
							cellRenderer({ rowData }) {
								const isLevel0 = rowData.deptId === 100;
								return _jsxFns.ActionAndMore({
									col: 3,
									children: [
										{
											label: i18n("解锁"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:logininfor:unlock"]),
											onClick: async () => {
												try {
													const { userName } = rowData;
													await _.$confirm_important(
														`${i18n("确认解锁用户")}${userName}`
													);
													await _adminTools.api_logininfor_unlock(
														userName
													);
													_.$msg(i18n("解锁用户成功"));
													vm.getTableData();
												} catch (error) {
													if (error) {
														_.$msgError(error?.msg || error);
													}
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
		},
		computed: {
			cptSearchParams() {
				return _.$pickFormValues(this.formSearch);
			},
			cptSelectedoperIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const operIds = rowData?.operId || this.cptSelectedoperIdString;
				try {
					if (rowData === "emtpy") {
						await _.$confirm_important("确定清空数据？");
						await _adminTools.api_logininfor_clean(operIds);
					} else {
						await _.$confirm_important("是否确认删除数据项？");
						await _adminTools.api_logininfor_delete(operIds);
					}
					_.$msg(i18n("删除成功"));
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
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
			},
			handleDeptChange(deptId) {
				this.deptId = deptId;
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);

					const queryData = {
						pageSize: size,
						pageNum: page
					};
					const { logininforName } = this.cptSearchParams;
					logininforName && (queryData.name = logininforName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_logininfor_list(queryData);

					_.$setTableData(this.configsTable, {
						list: _.map(rows, row => row),
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			deptId() {
				this.getTableData();
			}
		}
	});
}
</script>
