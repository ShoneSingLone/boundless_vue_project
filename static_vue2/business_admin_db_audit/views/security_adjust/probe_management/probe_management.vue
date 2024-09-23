<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle v-if="!dialog">
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<template #right>
					<xRow style="display: flex">
						<xItem :configs="queryData.databaseName" />
						<xItem :configs="queryData.databaseType" />
					</xRow>
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
		inject: ["APP"],
		props: {
			dialog: {
				type: Boolean,
				default: false
			}
		},
		async mounted() {
			await this.handleGetOptionsDatabaseType();
			await this.getTableData();
		},
		data(vm) {
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				queryData: defItems({
					databaseName: {
						value: "",
						label: i18n("数据库名")
					},
					databaseType: {
						value: "",
						label: i18n("数据库类型"),
						itemType: "xItemSelect",
						options: []
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
						isHide: vm.dialog,
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
						isHide: vm.dialog,
						disabled: disabledWhenNoSelected,
						async onClick() {
							try {
								await _.$confirm({
									title: "提示",
									content: `是否确认删除吗？`
								});
								const [id] = Array.from(vm.configsTable.data.set);
								const res = await _api.admin_db_audit.xdsAgentDeleteId({ id });
								if (res.code === 1) {
									_.$msgError(res.msg);
								} else {
									_.$msg("删除成功");
								}
							} catch (err) {
								_.$msgError(err);
								console.log("err", err);
							}
						}
					}
				],
				oprBtnArrayRight: [
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
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "databaseName", label: "数据库名" },
						{ prop: "databaseType", label: "数据库类型" },
						{ prop: "databaseIP", label: "IPv4地址" },
						{ prop: "port", label: "数据库端口号" },
						{ prop: "deptName", label: "所属部门" },
						{ prop: "databaseUsername", label: "数据库用户名" },
						{ prop: "description", label: "探针描述" },
						{
							prop: "status",
							label: "状态",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, _opts.admin_db_audit.probeStatus);
							}
						},
						{ prop: "dataSize", label: "数据量/MB" },
						{ prop: "持续时间", label: "持续时间/min" }
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
						pageSize: size,
						pageNum: page,
						databaseType: this.queryData.databaseType.value,
						databaseName: this.queryData.databaseName.value
					};
					const res = await _api.admin_db_audit.xdsAgentPage(queryData);
					const { list, total } = res;
					console.log("🚀 ~ getTableData ~ list:", list);
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
