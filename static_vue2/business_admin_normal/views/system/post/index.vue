<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<template #right>
					<xAdvancedSearch
						mountTo="#AdvancedSearch"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm>
								<xItem :configs="formSearch.postName" />
								<xItem :configs="formSearch.postCode" />
								<xItem :configs="formSearch.status" />
								<div class="flex end width100" span="2">
									<xBtn @click="resetSearchForm">重置</xBtn>
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
								</div>
							</xForm>
						</xBlock>
						<template #collapse>
							<xInput
								v-model="formSearch.postName.value"
								placeholder="请输入岗位名称" />
							<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
						</template>
					</xAdvancedSearch>
				</template>
			</xTablebar>
			<div id="AdvancedSearch"></div>
			<div class="x-page-content-middle mt8 flex horizon">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	let dicts = {
		sys_normal_disable: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		setup() {},
		components: {},
		async mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				isAdvancedSearchCollapse: true,
				deptId: "",
				/*  */
				oprBtnArray: [
					{
						label: i18n("新增"),
						isHide() {
							return !vm.$auth.hasPermiOr(["system:post:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增岗位"),
								url: "@/views/system/post/post.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					},
					{
						label: i18n("delete_action"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:post:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:post:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					postName: _adminTools.search_form_configs_text({
						label: "岗位名称",
						placeholder: i18n("请输入岗位名称")
					}),
					postCode: _adminTools.search_form_configs_text({
						label: "岗位编码",
						placeholder: i18n("请输入岗位编码")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("岗位状态"),
						options: dicts.sys_normal_disable
					})
				}),
				configsTable: defTable({
					isHideQuery: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "postId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("岗位编号"), prop: "postId" },
						{ label: i18n("岗位编码"), prop: "postCode" },
						{ label: i18n("岗位名称"), prop: "postName" },
						{ label: i18n("显示顺序"), prop: "postSort" },
						{
							label: i18n("status_info"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_normal_disable)
						},
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								const userIsAdmin = rowData.postId === 1;
								if (userIsAdmin) {
									return null;
								}

								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:post:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改岗位"),
													url: "@/views/system/post/post.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData({ page: 1 });
													}
												});
											}
										},
										{
											label: i18n("delete_action"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:post:remove"]),
											onClick: async () => {
												vm.doDelete(rowData);
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
			cptSearchParams() {
				return _.$pickFormValues(this.formSearch);
			},
			cptSelectedpostIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const postIds = rowData?.postId || this.cptSelectedpostIdString;
				try {
					await _.$confirm_important('是否确认删除岗位编号为"' + postIds + '"的数据项？');
					await _adminTools.api_post_delete(postIds);
					_.$msg(i18n("delete_success_info"));
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			},
			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.formSearch);
			},
			handleDeptChange(deptId) {
				this.deptId = deptId;
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);

					const queryData = {
						pageSize: size,
						pageNum: page
					};
					const { postName } = this.cptSearchParams;
					postName && (queryData.name = postName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_post_list(queryData);

					_.$setTableData(this.configsTable, {
						list: _.map(rows, row => row),
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			deptId() {
				this.getTableData();
			}
		}
	});
}
</script>
