<template>
	<xDialog>
		<div class="flex vertical height100">
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="formSearch.userName" />
				<xItem :configs="formSearch.phonenumber" />
			</xTablebar>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const { sys_normal_disable } = await _adminTools.newDicts({
		sys_normal_disable: null
	});

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				formSearch: defItems({
					userName: { value: "", label: "用户名称" },
					phonenumber: { value: "", label: "手机号码" }
				}),
				oprBtnArray: [
					{
						label: i18n("添加用户"),
						isHide() {
							return !vm.$auth.hasPermiOr(["system:role:add"]);
						},

						async onClick() {
							_.$openModal({
								title: i18n("选择用户"),
								url: "@/views/system/user/user.selector.dialog.vue",
								parent: vm,
								row,
								async onSelected({ userIds }) {
									try {
										const res = await _adminTools.api_role_auth_user_select_all(
											{ roleId: row.roleId, userIds: userIds }
										);

										vm.getTableData({ page: 1 });
										_.$msg("取消授权成功");
										this.getTableData();
									} catch (error) {
										if (error) {
											_.$msgError(error?.msg || error);
										}
									}
								}
							});
						}
					},
					{
						label: i18n("取消授权"),
						isHide() {
							return !vm.$auth.hasPermiOr(["system:role:remove"]);
						},
						disabled() {
							return !vm.configsTable.data.set.size;
						},
						async onClick() {
							try {
								await _.$confirm_important(`是否取消选中用户授权数据项？`);
								await _adminTools.api_role_auth_user_cancel_all({
									roleId: row.roleId,
									userIds: Array.from(vm.configsTable.data.set).join(",")
								});
								_.$msg("取消授权成功");
								this.getTableData();
							} catch (error) {
								if (error) {
									_.$msgError(error?.msg || error);
								}
							}
						}
					}
				],
				configsTable: defTable({
					onQuery() {
						vm.getTableData();
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
						{ label: i18n("用户名称"), prop: "userName" },
						{ label: i18n("用户昵称"), prop: "nickName" },
						{ label: i18n("邮箱"), prop: "email" },
						{ label: i18n("手机"), prop: "phonenumber" },
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
											label: i18n("取消授权"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:role:remove"]),
											onClick: async () => {
												try {
													const { roleId, userId } = rowData;
													await _.$confirm_important(
														'确认要取消该用户"' +
															rowData.userName +
															'"角色吗？'
													);
													await _adminTools.api_role_auth_user_cancel({
														roleId,
														userId
													});
													_.$msg("取消授权成功");
													this.getTableData();
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
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				try {
					const userId = row.userId;
					const roleIds = Array.from(this.configsTable.data.set).join(",");
					await _adminTools.api_user_auth_update({
						userId,
						roleIds
					});
					_.$msg("修改成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const { userName, phonenumber } = _.$pickFormValues(this.formSearch);

					const queryData = {
						pageSize: size,
						pageNum: page,
						roleId: row.roleId,
						userName,
						phonenumber
					};

					const { rows, total } =
						await _adminTools.api_role_auth_user_allocated_list(queryData);
					_.$setTableData(this.configsTable, { list: rows, total, set: new Set() });
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
