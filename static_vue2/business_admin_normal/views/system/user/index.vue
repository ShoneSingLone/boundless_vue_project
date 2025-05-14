<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<div class="flex height100">
				<xBlock class="department-tree mr" :bodyStyle="{ height: '100%' }">
					<AdminDepartmentTree :roleId="APP.user.roleId" @change="handleDeptChange" />
				</xBlock>
				<div class="flex flex1 vertical">
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
										<xItem :configs="formSearch.userName" />
										<xItem :configs="formSearch.phonenumber" />
										<xItem :configs="formSearch.status" />
										<xItem :configs="formSearch.dateRange" />
										<div class="flex end width100" span="2">
											<xBtn @click="resetSearchForm">重置</xBtn>
											<xBtn
												preset="primary"
												@click="getTableData({ page: 1 })"
												>查询</xBtn
											>
										</div>
									</xForm>
								</xBlock>
								<template #collapse>
									<xInput
										v-model="formSearch.userName.value"
										placeholder="请输入用户名称" />
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
								</template>
							</xAdvancedSearch>
						</template>
					</xTablebar>
					<div id="AdvancedSearch"></div>
					<div class="x-page-content-middle mt8 flex horizon">
						<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
					</div>
					<xPagination :configs="configsTable" />
				</div>
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { sys_normal_disable, sys_user_sex } = await _adminTools.newDicts({
		sys_normal_disable: null,
		sys_user_sex: null
	});

	return defineComponent({
		inject: ["APP"],
		setup() {},
		components: {
			AdminDepartmentTree: () =>
				_.$importVue("/common/type_admin/components/AdminDepartmentTree.vue")
		},
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
							return !vm.$auth.hasPermiOr(["system:user:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增用户"),
								url: "@/views/system/user/user.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					},
					{
						label: i18n("delete_action"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:user:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导入"),
						isHide: () => !vm.$auth.hasPermiOr(["system:user:import"]),
						async onClick() {}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:user:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					userName: _adminTools.search_form_configs_text({
						label: "用户名称",
						placeholder: i18n("请输入用户名称")
					}),
					phonenumber: _adminTools.search_form_configs_text({
						label: "手机号码",
						placeholder: i18n("请输入手机号码")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("用户状态"),
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
							by: "userId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("用户编号"), prop: "userId" },
						{ label: i18n("用户名称"), prop: "userName" },
						{ label: i18n("用户昵称"), prop: "nickName" },
						{ label: i18n("部门"), prop: "dept.deptName" },
						{ label: i18n("手机号码"), prop: "phonenumber" },
						{
							label: i18n("status_info"),
							prop: "status",
							cellRenderer({ cellData, rowData }) {
								const userIsAdmin = rowData.userId === 1;
								if (userIsAdmin) {
									return hVal2Tag(cellData, sys_normal_disable);
									// return hSpan( { class: "text-gray" }, i18n("超级管理员"));
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
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								const userIsAdmin = rowData.userId === 1;
								if (userIsAdmin) {
									return null;
								}

								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:user:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改用户"),
													url: "@/views/system/user/user.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData({ page: 1 });
													}
												});
											}
										},
										{
											label: i18n("delete_action"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:user:remove"]),
											onClick: async () => {
												vm.doDelete(rowData);
											}
										},
										{
											label: i18n("重置密码"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:user:resetPwd"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("重置密码"),
													url: "@/views/system/user/user.newPwd.dialog.vue",
													row: rowData
												});
											}
										},
										{
											label: i18n("分配角色"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:user:edit"]),
											onClick: async () => {
												_.$openModal(
													{
														title: i18n("分配角色"),
														url: "@/views/system/user/user.auth.dialog.vue",
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
			cptSelectedUserIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const userIds = rowData?.userId || this.cptSelectedUserIdString;
				try {
					await _.$confirm_important('是否确认删除用户编号为"' + userIds + '"的数据项？');
					await _adminTools.api_user_delete(userIds);
					_.$msg(i18n("delete_success_info"));
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
			async handleStatusChange({ userName, userId, status }) {
				let text = status === "0" ? "启用" : "停用";
				try {
					await _.$confirm_important('确认要"' + text + '""' + userName + '"用户吗？');

					await _adminTools.api_user_change_status({ userId, status });
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
					const { userName } = this.cptSearchParams;
					userName && (queryData.name = userName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_user_list(queryData);

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
