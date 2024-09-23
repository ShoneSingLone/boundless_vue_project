<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="formSearch.menuName" />
				<xItem :configs="formSearch.status" />
			</xTablebar>
			<div class="x-page-content-middle mt8 flex horizon">
				<xTableVir
					:columns="configsTable.columns"
					:data="configsTable.data.list"
					:expandedRowKeys.sync="configsTable.data.expandedRowKeys"
					rowKey="menuId" />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { sys_normal_disable } = await _adminTools.newDicts({
		sys_normal_disable: null
	});

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
							return !vm.$auth.hasPermiOr(["system:menu:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增菜单"),
								url: "@/views/system/menu/menu.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					}
				],
				formSearch: defItems({
					menuName: _adminTools.search_form_configs_text({
						label: "菜单名称",
						placeholder: i18n("请输入菜单名称")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("状态"),
						options: sys_normal_disable
					})
				}),
				configsTable: defTable({
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: [],
						expandedRowKeys: []
					},
					columns: [
						defTable.colExpandArrow({ width: 60 }),
						{ label: i18n("菜单名称"), prop: "menuName" },
						{
							label: i18n("图标"),
							prop: "icon",
							cellRenderer: ({ cellData }) => {
								if (cellData === "#") {
									return "";
								}
								return h("xIcon", {
									icon: `_${cellData}`
								});
							}
						},
						{ label: i18n("排序"), prop: "orderNum" },
						{ label: i18n("权限标识"), prop: "perms" },
						{ label: i18n("组件路径"), prop: "component" },
						{
							label: i18n("状态"),
							prop: "status",
							cellRenderer: ({ cellData }) => hVal2Tag(cellData, sys_normal_disable)
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
								const userIsAdmin = rowData.menuId === 1;
								if (userIsAdmin) {
									return null;
								}
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:menu:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改菜单"),
													url: "@/views/system/menu/menu.upsert.dialog.vue",
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
												!vm.$auth.hasPermiOr(["system:menu:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("新增菜单"),
													url: "@/views/system/menu/menu.upsert.dialog.vue",
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
												!vm.$auth.hasPermiOr(["system:menu:remove"]),
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
			cptSelectedmenuIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const menuIds = rowData?.menuId || this.cptSelectedmenuIdString;
				try {
					await _.$confirm_important('是否确认删除菜单编号为"' + menuIds + '"的数据项？');
					const { code, msg } = await _adminTools.api_menu_delete(menuIds);
					if (code === 200) {
						_.$msg(i18n("删除成功"));
					} else {
						_.$msgError(msg);
					}
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
			async handleStatusChange({ menuName, menuId, status }) {
				let text = status === "0" ? "启用" : "停用";
				try {
					await _.$confirm_important('确认要"' + text + '""' + menuName + '"用户吗？');
					await _adminTools.api_menu_change_status({ menuId, status });
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
					const { data } = await _adminTools.api_menu_list(this.cptSearchParams);
					const { TREE } = _.$arrayToTree({ data, id: "menuId", rootId: 0 });
					_.$setTableData(this.configsTable, {
						list: TREE
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
