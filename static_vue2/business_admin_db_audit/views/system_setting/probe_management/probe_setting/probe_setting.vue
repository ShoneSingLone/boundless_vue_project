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
					{ label: "应用", icon: "_application", onClick() {} },
					{ label: "刷新", icon: "_refresh", onClick() {} },
					{
						label: "删除",
						icon: "_btn_delete",
						disabled: disabledWhenNoSelected,
						onClick() {}
					}
				],
				oprBtnArrayRight: [
					{ label: "添加", preset: "primary", icon: "_add", onClick() {} },
					{
						label: "编辑",
						icon: "_edit",
						disabled: disabledWhenNoSelected,
						onClick() {
							vm.$router.push({
								path: "/system_setting/probe_management/probe_setting/edit",
								query: { id: vm.selected.id }
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
						{ prop: "ipv4", label: "Pv4地址" },
						{ prop: "ipv6", label: "Pv6地址" },
						{ prop: "port", label: "端口" },
						{ prop: "remarks", label: "描述" },
						{
							prop: "status",
							label: "状态",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, _opts.admin_db_audit.status);
							}
						},
						{
							prop: "active",
							label: "启用/关闭",
							cellRenderer({ cellData, rowData }) {
								return hDiv({ class: "flex middle center" }, [
									h("xSwitch", {
										class: "mr",
										value: cellData,
										onInput(isActive) {
											rowData.active = isActive;
										}
									}),
									cellData ? "已启用" : "已关闭"
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
			async getTableData(pagination) {
				try {
					_.$loading(true);
					// const { page, size } = _.$setPagination(this.configsTable, pagination);
					// const queryData = { pageSize: size, pageNo: page };
					// const { records, total } = await _api.mo_vdun_oc.adminVdunV10FlavorList(queryData);
					_.$setTableData(this.configsTable, {
						list: [
							{
								id: "asdfasdfasdf",
								ipv4: "192.168.0.1",
								ipv6: "fe08:8800",
								port: "4396",
								remarks: "探针1",
								status: "running",
								active: true
							}
						],
						total: 200
					});
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
