<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xPageHeader @back="goBack" class="mb">
				<template #content>
					<div class="flex middle">
						<span>|</span>
						<div class="flex ml">{{ cptHeaderContent }}</div>
					</div>
				</template>
			</xPageHeader>
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
		async mounted() {
			this.id = this.$route.query.id;
			await this.handleGetXdsOptionsRuleStatus();
			await this.handleGetXdsOptionsPredicate();
			await this.handleGetXdsOptionsRisk();
			await this.getTableData();
		},
		data(vm) {
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				predicate: [],
				Risk: [],
				RuleStatus: [],
				id: "",
				oprBtnArray: [
					{
						label: "删除",
						icon: "_btn_delete",
						disabled: disabledWhenNoSelected,
						onClick() {}
					}
				],
				oprBtnArrayRight: [
					{
						label: "添加策略",
						preset: "primary",
						icon: "_add",
						// disabled: vm.$route.query.status === "0",
						onClick() {
							_.$openModal({
								title: i18n("添加策略"),
								parent: vm,
								url: "@/views/security_adjust/policy_management/policy_management_view.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
								}
							});
						}
					},
					{
						label: "刷新",
						preset: "primary",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					}
				],
				configsTable: defTable({
					isHideQuery: true,
					isHidePagination: true,
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
						{ prop: "strategyName", label: "策略名" },
						{ prop: "priority", label: "优先级" },
						{
							prop: "riskLevel",
							label: "风险等级",
							cellRenderer({ rowData }) {
								const item =
									vm.Risk.find(item => item.value == rowData.riskLevel) ?? {};
								return hSpan(item.label);
							}
						},
						{
							prop: "expressions",
							label: "表达式",
							cellRenderer({ rowData }) {
								return h("xBtn", {
									configs: {
										preset: "text",
										label: "查看表达式",
										async onClick() {
											_.$openModal({
												title: i18n("表达式详情"),
												row: rowData,
												url: "@/views/security_adjust/policy_management/policy_management_view.upsert.dialog.vue",
												onClick() {
													vm.getTableData();
												}
											});
										}
									}
								});
							}
						},

						// {
						// 	prop: "status",
						// 	label: "配置状态",
						// 	cellRenderer({ rowData }) {
						// 		const item =
						// 			vm.RuleStatus.find(
						// 				item => Number(item.value) === rowData.status
						// 			) ?? {};
						// 		return hSpan(item.label);
						// 	}
						// },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										// {
										// 	label: "编辑",
										// 	icon: "_icon_btn_view",
										// 	// disabled: rowData.status !== 1,
										// 	onClick() {
										// 		_.$openModal({
										// 			title: i18n("修改规则"),
										// 			row: rowData,
										// 			parent: vm,
										// 			url: "@/views/security_adjust/policy_management/policy_management_view.upsert.dialog.vue",
										// 			onClick() {
										// 				vm.getTableData();
										// 			}
										// 		});
										// 	}
										// },
										{
											label: "删除",
											icon: "_delete",
											// disabled: rowData.status !== 1,
											async onClick() {
												await _.$confirm({
													title: "提示",
													content: `是否确认删除所选规则吗？`
												});
												const { code, msg } =
													await _api.admin_db_audit.xdsRuleDeleteId(
														rowData
													);
												if (code === 0) {
													_.$msgSuccess(msg);
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
			cptHeaderContent() {
				return `策略类型名: ${this.$route.query.strategyName}`;
			}
		},
		methods: {
			async handleGetXdsOptionsRisk() {
				this.Risk = await _api.admin_db_audit.xdsOptionsRisk();
			},
			async handleGetXdsOptionsRuleStatus() {
				this.RuleStatus = await _api.admin_db_audit.xdsOptionsRuleStatus();
			},
			async handleGetXdsOptionsPredicate() {
				this.predicate = await _api.admin_db_audit.xdsOptionsPredicate();
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const {
						data: { list: res, total = 0 }
					} = await _api.admin_db_audit.xdsStrategyPageId({
						id: this.id,
						pageNum: page,
						pageSize: size
					});

					_.$setTableData(this.configsTable, { list: res, total });
					console.log(res);
				} catch (error) {
					_.$msgError(error);
				}
				_.$loading(false);
			},
			goBack() {
				this.$router.push({ path: "/security_adjust/policy_management" });
			}
		}
	});
}
</script>
