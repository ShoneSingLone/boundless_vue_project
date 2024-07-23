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
								<xItem :configs="formSearch.configName" />
								<xItem :configs="formSearch.configKey" />
								<xItem :configs="formSearch.configType" />
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
							<xInput
								v-model="formSearch.configName.value"
								placeholder="请输入参数名称" />
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
		sys_yes_no: null
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
						label: i18n("新增"),
						isHide() {
							return !vm.$auth.hasPermiOr(["system:config:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增参数"),
								url: "@/views/system/config/config.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
								}
							});
						}
					},
					{
						label: i18n("删除"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:config:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:config:export"]),
						async onClick() {}
					},
					{
						label: i18n("刷新缓存"),
						isHide: () => !vm.$auth.hasPermiOr(["system:config:remove"]),
						async onClick() {
							await _adminTools.api_config_refresh_cache();
							dicts = await _adminTools.newDicts(dicts);
							_.$msg(i18n("刷新缓存成功"));
						}
					}
				],
				formSearch: defItems({
					configName: _adminTools.search_form_configs_text({
						label: i18n("参数名称"),
						placeholder: i18n("请输入参数名称")
					}),
					configKey: _adminTools.search_form_configs_text({
						label: i18n("参数键名"),
						placeholder: i18n("请输入参数键名")
					}),
					configType: _adminTools.search_form_configs_select({
						label: i18n("系统内置"),
						placeholder: i18n("系统内置"),
						options: dicts.sys_yes_no
					}),
					dateRange: _adminTools.search_form_date_range({
						label: i18n("创建时间"),
						placeholder: i18n("创建时间")
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
							by: "configId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("参数主键"), prop: "configId" },
						{ label: i18n("参数名称"), prop: "configName" },
						{ label: i18n("参数键名"), prop: "configKey" },
						{ label: i18n("参数键值"), prop: "configValue" },
						{
							label: i18n("系统内置"),
							prop: "configType",
							cellRenderer: ({ cellData }) =>
								_jsxFns.OptionsToLabel(cellData, dicts.sys_yes_no)
						},
						{ label: i18n("备注"), prop: "remark" },
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								return _jsxFns.ActionAndMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:config:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改参数"),
													url: "@/views/system/config/config.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData();
													}
												});
											}
										},
										{
											label: i18n("删除"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:config:remove"]),
											onClick: async () => {
												vm.doDelete(rowData);
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
			cptSelectedconfigIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const configIds = rowData?.configId || this.cptSelectedconfigIdString;
				try {
					await _.$confirm_important(
						'是否确认删除参数编号为"' + configIds + '"的数据项？'
					);
					await _adminTools.api_config_delete(configIds);
					_.$msgSuccess("删除成功");
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
					const { configName } = this.cptSearchParams;
					configName && (queryData.name = configName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_config_list(queryData);

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
