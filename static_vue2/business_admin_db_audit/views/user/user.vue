<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xCard class="card-as-condition-panel mb">
				<div class="flex">
					<xItem :configs="item" v-for="item in formSearch" :key="item.label" />
					<xGap f />
					<xBtnArray :configs="oprBtnArray" />
				</div>
			</xCard>
			<div class="flex mt mb">
				<xGap f />
				<xBtnArray :configs="oprBtnArrayRight" />
			</div>
			<div class="x-page-content-middle">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		async mounted() {
			await this.handleGetXdsOptionsUserStatus();
			await this.getTableData();
		},
		data(vm) {
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				userStatus: [],
				roleAll: [],
				formSearch: defItems({
					name: { label: "用户名", value: "" },
					roleCode: {
						label: "角色",
						value: "",
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data = [] } = await _api.admin_db_audit.xdsRoleAll();
							vm.roleAll = _.map(data, ({ id, roleName }) => ({
								label: roleName,
								value: id
							}));
							this.options = vm.roleAll;
							this.options.unshift({ label: "全部", value: "" });
						}
					},
					sex: {
						label: "性别",
						value: "",
						itemType: "xItemSelect",
						options: [
							{ label: "全部", value: "" },
							{ label: "男", value: "1" },
							{ label: "女", value: "2" }
						]
					},
					phone: { label: "电话", value: "" }
				}),
				oprBtnArray: [
					{
						label: "搜索",
						icon: "_icon_query",
						preset: "primary",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "新建账号",
						preset: "primary",
						icon: "_add",
						onClick() {
							return _.$openModal({
								title: "新建用户",
								url: "@/views/user/user.upsert.dialog.vue",
								parent: vm,
								onOk() {
									console.log("1");
								}
							});
						}
					}
				],
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						defTable.colSingle({
							by: "id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "nickName", label: "姓名" },
						{ prop: "id", label: "用户id" },
						{ prop: "phone", label: "联系电话" },
						{
							prop: "sex",
							label: "性别",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, _opts.admin_db_audit.sex);
							}
						},
						{ prop: "name", label: "用户账号" },
						{
							prop: "roleId",
							label: "用户角色",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, vm.roleAll);
							}
						},
						{
							prop: "status",
							label: "状态",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, vm.userStatus);
							}
						},
						{
							prop: "active",
							label: "操作",
							width: 280,
							cellRenderer({ cellData, rowData }) {
								return hDiv({ class: "flex middle center" }, [
									hxBtn({
										configs: {
											preset: "text",
											label: "编辑",
											icon: "_edit",
											onClick() {
												return _.$openModal({
													title: "编辑用户",
													url: "@/views/user/user.upsert.dialog.vue",
													parent: vm,
													row: rowData,
													onOk() {
														console.log("1");
													}
												});
											}
										}
									}),
									hxBtn({
										configs: {
											preset: "text",
											label: "删除",
											icon: "_btn_delete",
											disabled: rowData.status === 0,
											onClick() {
												return vm.deleteUser(rowData);
											}
										}
									}),
									hxBtn({
										configs: {
											preset: "text",
											label: "重置密码",
											onClick() {
												return vm.handleResetPassword(rowData);
											}
										}
									})
								]);
							}
						}
					]
				})
			};
		},
		computed: {
			selected() {
				const selectedIds = Array.from(this.configsTable.data.set);
				if (_.$isArrayFill(selectedIds)) {
					const [selectedId] = selectedIds;
					const selected = _.find(this.configsTable.data.list, { id: selectedId });
					return selected;
				}
				return {};
			}
		},
		methods: {
			async handleResetPassword(row) {
				await _.$confirm({
					title: "提示",
					content: `是否确认重置密码？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsUserResetPwd({
					...row
				});
				if (code === 0) {
					_.$msgSuccess(msg);
					this.getTableData();
				} else {
					_.$msgError(msg);
				}
			},
			async handleGetXdsOptionsUserStatus() {
				this.userStatus = await _api.admin_db_audit.xdsOptionsUserStatus();
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const obj = _.clone(_.$pickFormValues(this.formSearch));
					// Object.keys(obj).forEach(key => {
					//   if (obj[key]===''){
					//     obj[key] = null;
					//   }
					// })
					const queryData = {
						pageSize: size,
						pageNum: page,
						...obj
					};
					const { data = {} } = await _api.admin_db_audit.xdsUserPage(queryData);
					const { list = [], total = 0 } = data;
					_.$setTableData(this.configsTable, {
						list,
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			async deleteUser(userInfo) {
				try {
					await _.$confirm_important(`确认删除用户${userInfo.name}？`);
					const { code, msg } = await _api.admin_db_audit.xdsUserId(userInfo.id);
					if (code === 0) {
						_.$msgSuccess(msg);
						this.getTableData();
					} else {
						_.$msgError(msg);
					}
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			}
		}
	});
}
</script>
