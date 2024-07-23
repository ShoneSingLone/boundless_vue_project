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
								<xItem :configs="formSearch.operIp" />
								<xItem :configs="formSearch.title" />
								<xItem :configs="formSearch.operName" />
								<xItem :configs="formSearch.businessType" />
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
							<xItem :configs="formSearch.operName" />
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
						isHide: () => !vm.$auth.hasPermiOr(["system:operlog:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("清空"),
						isHide: () => !vm.$auth.hasPermiOr(["system:operlog:remove"]),
						async onClick() {
							vm.doDelete("emtpy");
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:operlog:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					operIp: _adminTools.search_form_configs_text({ label: i18n("操作地址") }),
					title: _adminTools.search_form_configs_text({ label: i18n("系统模块") }),
					operName: _adminTools.search_form_configs_text({ label: i18n("操作人员") }),
					businessType: _adminTools.search_form_configs_text({ label: i18n("类型") }),
					status: _adminTools.search_form_configs_text({ label: i18n("状态") }),
					dateRange: _adminTools.search_form_configs_text({ label: i18n("操作时间") }),
					operlogKey: _adminTools.search_form_configs_text({ label: i18n("公告键名") }),
					operlogType: _adminTools.search_form_configs_select({
						label: i18n("系统内置"),
						options: dicts.sys_common_status
					})
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
							by: "operId",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{ label: i18n("日志编号"), prop: "operId" },
						{ label: i18n("系统模块"), prop: "title" },
						{
							label: i18n("操作类型"),
							prop: "businessType",
							cellRenderer: ({ cellData }) =>
								_jsxFns.OptionsToLabel(cellData, dicts.sys_oper_type)
						},
						{ label: i18n("操作人员"), prop: "operName" },
						{ label: i18n("操作地址"), prop: "operIp" },
						{ label: i18n("操作地点"), prop: "operLocation" },
						{
							label: i18n("操作状态"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								_jsxFns.OptionsToLabel(cellData, dicts.sys_common_status)
						},
						{ label: i18n("操作日期"), prop: "operTime" },
						{ label: i18n("消耗时间"), prop: "costTime" }
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
						await _adminTools.api_operlog_clean(operIds);
					} else {
						await _.$confirm_important("是否确认删除数据项？");
						await _adminTools.api_operlog_delete(operIds);
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
					const { operlogName } = this.cptSearchParams;
					operlogName && (queryData.name = operlogName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_operlog_list(queryData);

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
