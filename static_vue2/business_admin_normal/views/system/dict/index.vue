<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xDrawer :title="cptDrawerTitle" :visible.sync="drawer" size="80%">
			<DictDataList v-if="drawer" :dictType="currentTypeRow" />
		</xDrawer>
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
								<xItem :configs="formSearch.dictName" />
								<xItem :configs="formSearch.dictType" />
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
							<xInput
								v-model="formSearch.dictName.value"
								placeholder="请输入字典名称" />
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
		sys_normal_disable: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		setup() {},
		components: {
			DictDataList: () => _.$importVue("@/views/system/dict/DictDataList.vue")
		},
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
							return !vm.$auth.hasPermiOr(["system:dict:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增字典"),
								url: "@/views/system/dict/dict.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
								}
							});
						}
					},
					{
						label: i18n("删除"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:dict:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:dict:export"]),
						async onClick() {}
					},
					{
						label: i18n("刷新缓存"),
						isHide: () => !vm.$auth.hasPermiOr(["system:dict:remove"]),
						async onClick() {
							await _adminTools.api_dict_type_refresh_cache();
							dicts = await _adminTools.newDicts(dicts);
						}
					}
				],
				formSearch: defItems({
					dictName: _adminTools.search_form_configs_text({
						label: "字典名称",
						placeholder: i18n("请输入字典名称")
					}),
					dictType: _adminTools.search_form_configs_text({
						label: "字典编码",
						placeholder: i18n("请输入字典编码")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("字典状态"),
						options: dicts.sys_normal_disable
					}),
					dateRange: _adminTools.search_form_date_range({
						label: "创建时间",
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
							by: "dictId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("字典编号"), prop: "dictId" },
						{ label: i18n("字典名称"), prop: "dictName" },
						{
							label: i18n("字典类型"),
							prop: "dictType",
							cellRenderer: ({ cellData, rowData }) => {
								return _jsxFns.Link({
									label: cellData,
									onClick(e) {
										e.stopPropagation();
										e.preventDefault();
										vm.currentTypeRow = rowData;
										vm.drawer = true;
										// _.$openModal( { title: i18n("新增字典"), url: "@/views/system/dict/dict.data.list.dialog.vue", onClick() { vm.getTableData({ page: 1 }); } }, { fullscreen: true } );
									}
								});
							}
						},
						{
							label: i18n("状态"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								_jsxFns.OptionsToLabel(cellData, dicts.sys_normal_disable)
						},
						{
							label: i18n("备注"),
							prop: "remark"
						},
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
												!vm.$auth.hasPermiOr(["system:dict:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改字典"),
													url: "@/views/system/dict/dict.upsert.dialog.vue",
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
												!vm.$auth.hasPermiOr(["system:dict:remove"]),
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
			cptDrawerTitle() {
				// return `${i18n("字典标签")}-${this.currentTypeRow?.dictName}`;
				return this.currentTypeRow?.dictName;
			},
			cptSearchParams() {
				return _.$pickFormValues(this.formSearch);
			},
			cptSelecteddictIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const dictIds = rowData?.dictId || this.cptSelecteddictIdString;
				try {
					await _.$confirm_important('是否确认删除字典编号为"' + dictIds + '"的数据项？');
					await _adminTools.api_dict_type_delete(dictIds);
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
					const { dictName } = this.cptSearchParams;
					dictName && (queryData.name = dictName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_dict_type_list(queryData);

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
