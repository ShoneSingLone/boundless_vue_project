<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xRow>
				<xCol style="--xItem-wrapper-width: 220px; --xItem-label-width: 68px">
					<xCard>
						<div class="flex">
							<xItem :configs="item" v-for="item in formSearch" :key="item.label" />
							<xGap f />
							<xBtnArray :configs="oprBtnArray" />
						</div>
					</xCard>
				</xCol>
			</xRow>
			<div class="flex end mt mb">
				<xBtnArray :configs="oprBtnArrayRight" />
			</div>
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
			return {
				formSearch: defItems({
					部门id: { label: "部门id", value: "" },
					部门名: { label: "部门名", value: "" }
				}),
				oprBtnArray: [
					{ label: "查询", icon: "_icon_query", preset: "primary", onClick() {} },
					{ label: "重置", icon: "_icon_reset", onClick() {} }
				],
				oprBtnArrayRight: [
					{
						label: "新增",
						preset: "primary",
						icon: "_add",
						onClick() {
							vm.$router.push({
								path: "/dept/edit"
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
						{ prop: "部门id", label: "部门id" },
						{ prop: "部门名", label: "部门名" },
						{ prop: "员工数", label: "员工数" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "添加子部门",
											icon: "_icon_btn_add_sub_dept",
											onClick() {
												vm.$router.push({
													path: "/dept/edit",
													query: { id: rowData.id }
												});
											}
										},
										{
											label: "编辑",
											icon: "_icon_btn_view",
											onClick() {
												vm.$router.push({
													path: "/dept/edit",
													query: { id: rowData.id }
												});
											}
										},
										{
											label: "删除",
											icon: "_delete",
											async onClick() {}
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
