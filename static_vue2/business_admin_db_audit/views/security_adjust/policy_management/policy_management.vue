<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<template #right>
					<xBtnArray :configs="oprBtnArrayRight" />
				</template>
			</xTablebar>
			<div class="x-page-content-middle mt8">
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
		mounted() {
			this.getTableData();
		},
		data(vm) {
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				oprBtnArray: [
					{
						label: "查看白名单",
						icon: "_refresh",
						// disabled: disabledWhenNoSelected,
						onClick() {
							vm.$router.push({
								path: "/security_adjust/policy_management/white_list",
								query: {
									status: vm.selected?.status,
									id: vm.selected.id
								}
							});
						}
					},
					{
						label: "删除",
						icon: "_btn_delete",
						disabled: disabledWhenNoSelected,
						async onClick() {
							if (vm.selected?.status === 0) {
								_.$msgError("策略状态为等待回复，无法编辑");
								return;
							}
							await _.$confirm({
								title: "提示",
								content: `是否确认删除吗？`
							});
							const { code, msg } = await _api.admin_db_audit.xdsStrategyDeleteId({
								id: vm.selected?.id ?? ""
							});
							if (code === 0) {
								_.$msg(msg);
								// vm.getTableData({page:1});
							} else {
								_.$msgError(msg);
							}
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "添加策略",
						preset: "primary",
						icon: "_add",
						onClick() {
							_.$openModal({
								title: i18n("添加策略"),
								parent: vm,
								url: "@/views/security_adjust/policy_management/policy_management.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					},
					{
						label: "编辑",
						icon: "_edit",
						disabled: disabledWhenNoSelected,
						onClick() {
							_.$openModal({
								title: i18n("编辑策略"),
								row: vm.selected,
								parent: vm,
								url: "@/views/security_adjust/policy_management/policy_management.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
								}
							});
						}
					},
					{
						label: "刷新",
						icon: "_refresh",
						onClick() {
							vm.getTableData({ page: 1 });
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
							prop: "id",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "name", label: "策略名" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "查看规则",
											icon: "_icon_btn_view",
											onClick() {
												vm.$router.push({
													path: "/security_adjust/policy_management/view",
													query: {
														id: rowData.id,
														strategyName: rowData.name,
														status: rowData.status
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
													content: `是否确认删除吗？`
												});
												const { code, msg } =
													await _api.admin_db_audit.xdsStrategyDeleteId({
														id: rowData.id
													});
												if (code === "0") {
													_.$msg(msg);
													// vm.getTableData({page:1});
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
					const res = await _api.admin_db_audit.xdsStrategyPage({
						pageNum: page,
						pageSize: size
					});
					const { list, total } = res.data;
					console.log(list);
					_.$setTableData(this.configsTable, { list, total });
					console.log(res);
				} catch (error) {
					_.$msgError(error);
				}
				_.$loading(false);
			}
		}
	});
}
</script>
