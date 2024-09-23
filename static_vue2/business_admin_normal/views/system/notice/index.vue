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
								<xItem :configs="formSearch.noticeName" />
								<xItem :configs="formSearch.noticeKey" />
								<xItem :configs="formSearch.noticeType" />
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
								v-model="formSearch.noticeName.value"
								placeholder="请输入公告名称" />
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
		sys_notice_type: null,
		sys_notice_status: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		setup() {},
		async mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				currentTypeRow: {},
				drawer: false,
				isAdvancedSearchCollapse: true,
				deptId: "",
				/*  */
				oprBtnArray: [
					{
						label: i18n("新增"),
						isHide() {
							return !vm.$auth.hasPermiOr(["system:notice:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增公告"),
								url: "@/views/system/notice/notice.upsert.dialog.vue",
								onClick() {
									vm.getTableData();
								}
							});
						}
					},
					{
						label: i18n("删除"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["system:notice:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["system:notice:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					noticeName: _adminTools.search_form_configs_text({
						label: i18n("公告名称"),
						placeholder: i18n("请输入公告名称")
					}),
					noticeKey: _adminTools.search_form_configs_text({
						label: i18n("公告键名"),
						placeholder: i18n("请输入公告键名")
					}),
					noticeType: _adminTools.search_form_configs_select({
						label: i18n("系统内置"),
						placeholder: i18n("系统内置"),
						options: dicts.sys_notice_status
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
							by: "noticeId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("序号"), prop: "noticeId" },
						{ label: i18n("公告标题"), prop: "noticeTitle" },
						{
							label: i18n("公告类型"),
							prop: "noticeType",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_notice_type)
						},
						{
							label: i18n("状态"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_notice_status)
						},
						{
							label: i18n("创建者"),
							prop: "createBy"
						},
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:notice:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改公告"),
													url: "@/views/system/notice/notice.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData();
													}
												});
											}
										},
										{
											label: i18n("删除"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["system:notice:remove"]),
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
			cptSelectednoticeIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			async doDelete(rowData) {
				const noticeIds = rowData?.noticeId || this.cptSelectednoticeIdString;
				try {
					await _.$confirm_important(
						'是否确认删除公告编号为"' + noticeIds + '"的数据项？'
					);
					await _adminTools.api_notice_delete(noticeIds);
					_.$msg(i18n("删除成功"));
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
					const { noticeName } = this.cptSearchParams;
					noticeName && (queryData.name = noticeName);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_notice_list(queryData);

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
