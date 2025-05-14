<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="formSearch.deptName" />
				<xItem :configs="formSearch.status" />
			</xTablebar>
			<div class="x-page-content-middle mt8 flex horizon">
				<xTableVir
					:columns="configsTable.columns"
					:data="configsTable.data.list"
					:expandedRowKeys.sync="configsTable.data.expandedRowKeys"
					rowKey="deptId" />
			</div>
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
							return !vm.$auth.hasPermiOr(["system:dept:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增部门"),
								url: "@/views/system/dept/dept.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					}
				],
				formSearch: defItems({
					deptName: _adminTools.search_form_configs_text({
						label: "部门名称",
						placeholder: i18n("input_department_name")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("status_info"),
						options: dicts.sys_normal_disable
					})
				}),
				configsTable: defTable({
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						list: [],
						expandedRowKeys: []
					},
					columns: [
						defTable.colExpandArrow({ width: 60 }),
						{ label: i18n("部门名称"), prop: "deptName" },
						{ label: i18n("排序"), prop: "orderNum" },
						{
							label: i18n("status_info"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_normal_disable)
						},
						{
							label: i18n("创建时间"),
							prop: "createTime",
							cellRenderer: ({ cellData }) => _adminTools.parseTime(cellData)
						},
						/*  */
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								const isLevel0 = rowData.deptId === 100;
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											disabled: () => isLevel0,
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:dept:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改部门"),
													url: "@/views/system/dept/dept.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData({ page: 1 });
													}
												});
											}
										},
										{
											label: i18n("新增"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:dept:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("新增部门"),
													url: "@/views/system/dept/dept.upsert.dialog.vue",
													row: rowData,
													isAppend: true,
													onClick() {
														vm.getTableData({ page: 1 });
													}
												});
											}
										},
										{
											label: i18n("删除"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:dept:remove"]),
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
			cptSelecteddeptIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const deptIds = rowData?.deptId;
				try {
					await _.$confirm_important('是否确认删除"' + deptIds + '"的数据项？');
					await _adminTools.api_dept_delete(deptIds);
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
			async handleStatusChange({ deptName, deptId, status }) {
				let text = status === "0" ? "启用" : "停用";
				try {
					await _.$confirm_important('确认要"' + text + '""' + deptName + '"用户吗？');
					await _adminTools.api_dept_change_status({ deptId, status });
					_.$msg(`${text}成功`);
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			},
			async getTableData() {
				try {
					_.$loading(true);
					const { data } = await _adminTools.api_dept_list(this.cptSearchParams);
					const { TREE } = _.$arrayToTree({
						data,
						id: "deptId",
						label: "deptName",
						rootId: 0
					});

					_.$setTableData(this.configsTable, {
						list: TREE
					});

					const expandedRowKeys = [];
					_.$traverse(TREE, node => {
						if (_.$isArrayFill(node.children)) {
							expandedRowKeys.push(node.deptId);
						}
					});
					this.configsTable.data.expandedRowKeys = expandedRowKeys;
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
