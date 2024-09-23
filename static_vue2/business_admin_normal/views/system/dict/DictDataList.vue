<style lang="less"></style>
<template>
	<xPageContent>
		<xTablebar :configs="configsTable">
			<template #left>
				<xBtnArray :configs="oprBtnArray" />
			</template>
			<template #right>
				<!-- {{ dictType }} -->
				<xAdvancedSearch
					mountTo="#DictDataListDialog"
					:collapse="isAdvancedSearchCollapse"
					@change="handleAdvancedSearchCollapse">
					<xBlock class="mt">
						<xForm>
							<xItem :configs="formSearch.dictType" />
							<xItem :configs="formSearch.dictLabel" />
							<xItem :configs="formSearch.status" />
							<div class="flex end width100" span="2">
								<xBtn @click="resetSearchForm">重置</xBtn>
								<xBtn preset="primary" @click="getTableData({ page: 1 })"
									>查询</xBtn
								>
							</div>
						</xForm>
					</xBlock>
					<template #collapse>
						<xInput v-model="formSearch.dictType.value" placeholder="请输入标签名称" />
						<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
					</template>
				</xAdvancedSearch>
			</template>
		</xTablebar>
		<div id="DictDataListDialog"></div>
		<div class="x-page-content-middle mt8 flex horizon">
			<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
		</div>
		<xPagination :configs="configsTable" />
	</xPageContent>
</template>
<script lang="ts">
export default async function () {
	let dicts = {
		sys_normal_disable: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		props: ["dictType"],
		setup() {},
		components: {},
		async mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
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
								title: i18n("新增标签"),
								url: "@/views/system/dict/DictDataList.upsert.dialog.vue",
								DICT_TYPE: vm.dictType,
								onClick() {
									vm.getTableData({ page: 1 });
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
					}
				],
				formSearch: defItems({
					dictLabel: _adminTools.search_form_configs_text({
						label: "标签标签",
						placeholder: i18n("请输入标签名称")
					}),
					dictType: _adminTools.search_form_configs_text({
						label: "标签名称",
						placeholder: i18n("请输入标签编码")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("标签状态"),
						options: dicts.sys_normal_disable
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
							by: "dictCode",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("标签编码"), prop: "dictCode" },
						{
							label: i18n("标签标签"),
							prop: "dictLabel",
							cellRenderer({ rowData }) {
								return hVal2Tag(rowData.dictValue, vm.cptCurrentOptions);
							}
						},
						{ label: i18n("标签键值"), prop: "dictValue" },
						{ label: i18n("标签排序"), prop: "dictSort" },
						{
							label: i18n("状态"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_normal_disable)
						},
						{
							label: i18n("备注"),
							prop: "remark"
						},
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:dict:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改标签"),
													url: "@/views/system/dict/DictDataList.upsert.dialog.vue",
													DICT_TYPE: vm.dictType,
													row: rowData,
													onClick() {
														vm.getTableData({ page: 1 });
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
			cptCurrentOptions() {
				return _.map(this.configsTable.data.list, i => {
					return {
						...i,
						label: i.dictLabel,
						value: i.dictValue
					};
				});
			},
			cptSearchParams() {
				return _.$pickFormValues(this.formSearch);
			},
			cptSelecteddictCodeString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const dictCodes = rowData?.dictCode || this.cptSelecteddictCodeString;
				try {
					await _.$confirm_important(
						'是否确认删除标签编号为"' + dictCodes + '"的数据项？'
					);
					await _adminTools.api_dict_data_delete(dictCodes);
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
						pageNum: page,
						dictType: this.dictType.dictType
					};
					const { dictLabel } = this.cptSearchParams;
					dictLabel && (queryData.name = dictLabel);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_dict_data_list(queryData);
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
