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
			this.getTableData();
		},
		data(vm) {
			const disabledWhenNoSelected = () => {
				return !vm.configsTable.data.set.size;
			};
			return {
				id: "",
				oprBtnArray: [
					{
						label: "刷新",
						icon: "_refresh",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "新增表项",
						preset: "primary",
						icon: "_add",
						onClick() {
							_.$openModal({
								title: i18n("新增表项"),
								parent: vm,
								url: "@/views/security_adjust/policy_management/policy_management_white_list.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
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
							prop: "id",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "value", label: "IPv4" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "编辑",
											icon: "_edit",
											disabled: rowData.status === 0,
											parent: vm,
											async onClick() {
												_.$openModal({
													title: i18n("修改表项"),
													row: rowData,
													url: "@/views/security_adjust/policy_management/policy_management_white_list.upsert.dialog.vue",
													onClick() {
														vm.getTableData();
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
													content: `是否确认删除所选数据？`
												});
												const { code, msg } =
													await _api.admin_db_audit.xdsWhitelistId({
														id: rowData.id
													});
												if (code === 0) {
													_.$msg(msg);
												} else {
													_.$msgError(msg);
												}
												vm.getTableData({ page: 1 });
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
				return `白名单`;
			}
		},
		methods: {
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const res = await _api.admin_db_audit.xdsWhitelistPage({
						pageNum: page,
						pageSize: size
						// id:this.id
					});
					const { list, total } = res.data;
					console.log(list);
					_.$setTableData(this.configsTable, { list, total });
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
