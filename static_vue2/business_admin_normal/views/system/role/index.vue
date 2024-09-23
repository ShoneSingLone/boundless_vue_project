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
								<xItem :configs="formSearch.roleName" />
								<xItem :configs="formSearch.roleKey" />
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
								v-model="formSearch.roleName.value"
								placeholder="请输入角色名称" />
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
							return !vm.$auth.hasPermiOr(["system:role:add"]);
						},
						async onClick() {
							_.$openModal(
								{
									title: i18n("新增角色"),
									url: "@/views/system/role/role.upsert.dialog.vue",
									onClick() {
										vm.getTableData({ page: 1 });
									}
								},
								{
									fullscreen: true
								}
							);
						}
					},
					{
						label: i18n("删除"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:role:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导入"),
						isHide: () => !vm.$auth.hasPermiOr(["system:role:import"]),
						async onClick() {}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:role:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					roleName: _adminTools.search_form_configs_text({
						label: "角色名称",
						placeholder: i18n("请输入角色名称")
					}),
					roleKey: _adminTools.search_form_configs_text({
						label: "权限字符",
						placeholder: i18n("请输入权限字符")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("角色状态"),
						options: sys_normal_disable
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
							by: "roleId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("角色编号"), prop: "roleId" },
						{ label: i18n("角色名称"), prop: "roleName" },
						{ label: i18n("权限字符"), prop: "roleKey" },
						{ label: i18n("显示顺序"), prop: "roleSort" },
						{
							label: i18n("状态"),
							prop: "status",
							cellRenderer({ cellData, rowData }) {
								const userIsAdmin = rowData.roleId === 1;
								if (userIsAdmin) {
									return hVal2Tag(cellData, sys_normal_disable);
								}

								return h("xSwitch", {
									value: cellData,
									activeValue: "0",
									inactiveValue: "1",
									onChange(status) {
										return vm.handleStatusChange({ ...rowData, status });
									}
								});
							}
						},
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								const userIsAdmin = rowData.roleId === 1;
								if (userIsAdmin) {
									return null;
								}

								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:role:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改角色"),
													url: "@/views/system/role/role.upsert.dialog.vue",
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
												!vm.$auth.hasPermiOr(["system:role:remove"]),
											onClick: async () => {
												vm.doDelete(rowData);
											}
										},
										{
											label: i18n("数据权限"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:role:edit"]),
											onClick: async () => {
												_.$openModal(
													{
														title: i18n("数据权限"),
														url: "@/views/system/user/user.auth.dialog.vue",
														row: rowData
													},
													{
														fullscreen: true
													}
												);
											}
										},
										{
											label: i18n("分配用户"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:role:edit"]),
											onClick: async () => {
												_.$openModal(
													{
														title: i18n("分配用户"),
														url: "@/views/system/role/role.add.user.dialog.vue",
														row: rowData
													},
													{
														fullscreen: true
													}
												);
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
			cptSelectedroleIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const roleIds = rowData?.roleId || this.cptSelectedroleIdString;
				try {
					await _.$confirm_important('是否确认删除角色编号为"' + roleIds + '"的数据项？');
					await _adminTools.api_role_delete(roleIds);
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
			async handleStatusChange({ roleName, roleId, status }) {
				let text = status === "0" ? "启用" : "停用";
				try {
					await _.$confirm_important('确认要"' + text + '""' + roleName + '"用户吗？');
					await _adminTools.api_role_change_status({ roleId, status });
					_.$msg(`${text}成功`);
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);

					const queryData = {
						pageSize: size,
						pageNum: page
					};
					const { roleName } = this.cptSearchParams;
					roleName && (queryData.name = roleName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_role_list(queryData);

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
