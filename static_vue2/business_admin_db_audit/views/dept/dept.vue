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
				<xTableVir
					:columns="configsTable.columns"
					:expandedRowKeys.sync="configsTable.data.expandedRowKeys"
					:data="configsTable.data.list" />
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
				depathList: [],
				formSearch: defItems({
					deptCode: { label: "部门编码", value: "" },
					deptName: { label: "部门名", value: "" }
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
							vm.formSearch.deptCode.value = "";
							vm.formSearch.deptName.value = "";
						}
					}
				],
				oprBtnArrayRight: [
					{
						label: "新增",
						preset: "primary",
						icon: "_add",
						onClick() {
							return _.$openModal({
								title: "新建部门",
								url: "@/views/dept/dept.upsert.dialog.vue",
								parent: vm,
								pidOption: vm.pidOption,
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
						list: [],
						expandedRowKeys: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						defTable.colExpandArrow({ width: 60 }),
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "id", label: "部门id" },
						{ prop: "deptName", label: "部门名" },
						{ prop: "deptCode", label: "部门编码" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										/* { label: "添加子部门", icon: "_icon_btn_add_sub_dept", onClick() { vm.$router.push({ path: "/dept/edit", query: { id: rowData.id } }); } }, */
										{
											label: "编辑",
											icon: "_icon_btn_view",
											onClick() {
												_.$openModal({
													title: `修改${rowData.deptName}部门`,
													url: "@/views/dept/dept.upsert.dialog.vue",
													parent: vm,
													row: rowData,
													pidOption: vm.pidOption,
													onOk() {
														console.log("1");
													}
												});
											}
										},
										{
											label: "删除",
											icon: "_delete",
											async onClick() {
												vm.handleXdsDepartmentIdDel(rowData);
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
			},
			pidOption({ depathList = [] }) {
				function handleSetPidList(list = []) {
					let arr = [];
					list.forEach(item => {
						arr.push({
							label: item.deptName,
							value: item.id
						});
						if (item.children && item.children.length > 0) {
							arr = arr.concat(handleSetPidList(item.children));
						}
					});
					return arr;
				}
				return handleSetPidList(depathList);
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
						deptCode: this.formSearch.deptCode.value,
						deptName: this.formSearch.deptName.value
					};
					const { data = [], code } =
						await _api.admin_db_audit.xdsDepartmentPage(queryData);
					if (code === 0) {
						_.$setTableData(this.configsTable, {
							list: data,
							total: data.length
						});
						this.depathList = data;
					} else {
						_.$setTableData(this.configsTable, {
							list: [],
							total: 0
						});
						this.depathList = [];
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			async handleXdsDepartmentIdDel(row) {
				await _.$confirm({
					title: "提示",
					content: `是否确认删除所选部门？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsDepartmentIdDel(row);
				if (code === 0) {
					_.$msg(msg);
					this.getTableData({ page: 1 });
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
