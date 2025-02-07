<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<!--				<template #left>-->
				<!--					<xRow style="display: flex">-->
				<!--						<xItem :configs="queryData.IPRange" />-->
				<!--						<xItem label="端口范围">-->
				<!--							<xItem :configs="queryData.startPort" />-->
				<!--							<x-divider style="width: 100px" class="line" />-->
				<!--							<xItem :configs="queryData.endPort" />-->
				<!--						</xItem>-->
				<!--					</xRow>-->
				<!--				</template>-->
				<template #right>
					<xBtnArray :configs="oprBtnArrayRight" style="margin-left: 30px" />
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
		name: "database_management",
		inject: ["APP"],
		async mounted() {
			// await this.handleGetOptionsDatabaseType();
			await this.getTableData();
		},
		data(vm) {
			const that = this;
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				queryData: defItems({
					IPRange: {
						value: "127.0.0.1/24",
						label: i18n("IP范围"),
						placeholder: "127.0.0.1/24",
						rules: [_rules.isValidCIDR()]
					},
					startPort: {
						value: 0,
						label: "",
						itemType: "xItemInput",
						rules: [
							_rules.validator(({ val }) => {
								const reg = /^\d+$/;
								if (!reg.test(val)) {
									return "请输入数字!";
								}
								if (val < 0 || val > 65535) {
									return "请输入正确的端口号";
								}
								return "";
							})
						]
					},
					endPort: {
						value: 65535,
						itemType: "xItemInput",
						rules: [
							_rules.validator(({ val }) => {
								const reg = /^\d+$/;
								if (!reg.test(val)) {
									return "请输入数字!";
								}
								if (val < 0 || val > 65535) {
									return "请输入正确的端口号";
								}
								return "";
							})
						]
					}
				}),
				oprBtnArray: [
					{
						label: "添加",
						preset: "primary",
						icon: "_add",
						onClick() {
							_.$openModal({
								title: i18n("探针新增"),
								url: "@/views/security_adjust/probe_management/probe_management.upsert.dialog.vue",
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
							if (vm.selected?.status === 0) {
								_.$msgError("探针状态为等待回复，无法编辑");
								return;
							}
							// 探针状态:0等待回复 1正常运行 2异常状态
							_.$openModal({
								title: i18n("探针新增"),
								url: "@/views/security_adjust/probe_management/probe_management.upsert.dialog.vue",
								parent: vm,
								row: vm.selected,
								onClick() {
									// vm.getTableData();
								}
							});
						}
					},
					{
						label: "删除",
						icon: "_btn_delete",
						disabled: disabledWhenNoSelected,
						async onClick() {
							try {
								await _.$confirm({
									title: "提示",
									content: `是否确认删除吗？`
								});
								const [id] = Array.from(that.configsTable.data.set);
								const res = await _api.admin_db_audit.xdsAgentDeleteId({ id });
							} catch (err) {
								console.log("err", err);
							}
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "更新配置",
						icon: "_refresh",
						onClick() {
							_.$openModal({
								title: "关联探针",
								url: "@/views/security_adjust/database_management/database_management_update_dialog.vue",
								parent: vm,
								onOk() {
									console.log("1");
								}
							});
						}
					},
					{
						label: "开始检索",
						icon: "_refresh",
						preset: "primary",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					}
				],
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					// isHidePagination: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					// pagination: {
					// 	page: 1,
					// 	total: 0,
					// 	size: 10
					// },
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
						{ prop: "databaseType", label: "数据库类型" },
						{ prop: "databaseIP", label: "IPv4地址" },
						{ prop: "databasePort", label: "数据库端口号" },
						{ prop: "agentId", label: "关联探针ID" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "配置探针",
											icon: "_icon_btn_view",
											disabled: !rowData.agentId,
											onClick() {
												_.$openModal({
													title: "关联探针",
													url: "@/views/security_adjust/database_management/database_management_dialog.vue",
													row: rowData,
													parent: vm,
													onOk() {
														console.log("1");
													}
												});
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
			cptPortValue() {
				return [this.queryData.startPort.value, this.queryData.endPort.value];
			},
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
			handleChangeStartPort(value) {},
			async handleGetOptionsDatabaseType() {
				this.queryData.databaseType.options =
					await _api.admin_db_audit.xdsOptionsDatabaseType();
				this.queryData.databaseType.options.unshift({ label: "全部", value: "" });
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const queryData = {
						IPRange: this.queryData.IPRange.value,
						startPort: this.queryData.startPort.value,
						endPort: this.queryData.endPort.value
					};
					const res = await _api.admin_db_audit.xdsDatabaseAssetsPage(queryData);
					const { data, total } = res;
					console.log("res", data);
					_.$setTableData(this.configsTable, { list: data });
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
