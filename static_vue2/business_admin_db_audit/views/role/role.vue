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
	const isAdmin = row => row.id === 1;
	return defineComponent({
		inject: ["APP"],
		mounted() {
			this.getTableData();
		},
		data(vm) {
			return {
				formSearch: defItems({
					roleName: { label: "角色名", value: "" }
				}),
				oprBtnArray: [
					{
						label: "搜索",
						icon: "_icon_query",
						preset: "primary",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					},
					{
						label: "重置",
						icon: "_icon_reset",
						onClick() {
							vm.formSearch.roleName.value = "";
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "新建角色",
						preset: "primary",
						icon: "_add",
						onClick() {
							return _.$openModal({
								title: "新建角色",
								url: "@/views/role/role.upsert.dialog.vue",
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
						{ prop: "roleName", label: "角色名称" },
						{ prop: "roleCode", label: "角色编码" },
						defTable.colActions({
							width: 260,
							cellRenderer({ rowData }) {
								if (isAdmin(rowData)) {
									return null;
								}

								return hBtnWithMore({
									children: [
										{
											label: "编辑",
											icon: "_icon_btn_view",
											onClick() {
												_.$openModal({
													title: "修改角色",
													url: "@/views/role/role.upsert.dialog.vue",
													parent: vm,
													row: rowData,
													onOk() {
														console.log("1");
													}
												});
											}
										},
										{
											label: "权限配置",
											icon: "_icon_configs",

											async onClick() {
												return _.$openModal({
													title: "权限配置",
													url: "@/views/role/role.auth.dialog.vue",
													parent: vm,
													row: rowData,
													onOk() {
														console.log("1");
													}
												});
											}
										},
										{
											label: "删除",
											icon: "_delete",
											disabled: rowData.status === 0,

											async onClick() {
												await _.$confirm({
													title: "提示",
													content: `是否确认删除所选角色？`
												});
												const { code, msg } =
													await _api.admin_db_audit.xdsRoleId({
														id: rowData.id
													});
												if (code === 0) {
													_.$msg(msg);
													vm.getTableData({ page: 1 });
												} else {
													_.$msgError(msg);
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
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const queryData = {
						pageSize: size,
						pageNum: page,
						roleName: this.formSearch.roleName.value
					};
					const { data = {} } = await _api.admin_db_audit.xdsRolePage(queryData);
					const { list, total } = data;
					console.log("🚀 ~ getTableData ~ list:", data);
					_.$setTableData(this.configsTable, { list, total });
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
