<template>
	<div class="GroupSectionProjectList flex1 flex vertical">
		<xGap t="8" />
		<xTablebar :configs="configsTable">
			<template #left>
				<xBtnArray :configs="oprBtnArray" />
			</template>
			<template #right>
				<xAdvancedSearch
					mountTo="#AdvancedSearch"
					:collapse="isAdvancedSearchCollapse"
					@change="isAdvancedSearchCollapse = !isAdvancedSearchCollapse">
					<xBlock class="mt">
						<xForm col="3">
							<xItem :configs="formQuery.group" />
							<xItem :configs="formQuery.name" />
							<div class="flex end width100" span="full">
								<xBtn :configs="btnRest" class="ml4" />
								<xBtn :configs="btnQuery" class="ml4" />
							</div>
						</xForm>
					</xBlock>
					<template #collapse>
						<div class="flex middle mr8">
							<xItem :configs="formQuery.group" />
							<xItem :configs="formQuery.name" />
							<xBtn :configs="btnQuery" />
						</div>
					</template>
				</xAdvancedSearch>
			</template>
		</xTablebar>
		<div id="AdvancedSearch"></div>
		<div class="x-page-content-middle mt8">
			<xTableVir
				:columns="configsTable.columns"
				:data="cptConfigsTableDataList"
				:slotsRow="customRowRender"
				:rowHeight="rowHeight" />
		</div>
		<!-- <GroupSectionProjectListPrivate /> -->
		<!-- <GroupSectionProjectListNormal /> -->
		<!-- <YapiPlaceholderView view="GroupSectionProjectList" /> -->
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "GroupSection"],
		components: {
			GroupSectionProjectListPrivate: () =>
				_.$importVue(
					"@/views/Api/Group/Section/ProjectList/Private/GroupSectionProjectListPrivate.vue"
				),
			GroupSectionProjectListNormal: () =>
				_.$importVue(
					"@/views/Api/Group/Section/ProjectList/Normal/GroupSectionProjectListNormal.vue"
				)
		},
		mounted() {
			this.configsTable.onQuery();
		},
		data(vm) {
			return {
				rowHeight: 100,
				isAdvancedSearchCollapse: true,
				formQuery: defItems({
					name: {
						value: _.$lStorage?.GroupSectionProjectListFormQuery?.name || "",
						resetValue: "",
						placeholder: i18n("分组、项目的名称或者ID")
					},
					group: {
						value: _.$lStorage?.GroupSectionProjectListFormQuery?.group || [],
						resetValue: [],
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						placeholder: i18n("分组"),
						once() {
							this.options = _.map(vm.APP.groupList, row => {
								return {
									label: row.group_name,
									value: row._id
								};
							});
						}
					}
				}),
				oprBtnArray: [
					{
						label: i18n("添加项目"),
						onClick: vm.openGroupProjectDialog,
						disabled() {
							if (vm.GroupSection.canAddProject) {
								return "";
							} else {
								return h("div", [
									h("div", [i18n(`您没有权限添加项目`)]),
									h("div", [i18n(`请联系该分组组长或管理员`)])
								]);
							}
						}
					}
				],

				configsTable: defTable({
					isHideQuery: true,
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						{
							prop: "group_id",
							label: "所属分组",
							cellRenderer({ rowData, rowIndex }) {
								return hLink({
									label: `${rowData.group_id}-${rowData.group_name}-${rowIndex}`,
									href: _.$aHashLink("/api/group", {
										groupId: rowData.group_id
									})
								});
							}
						},
						{
							prop: "name",
							label: "项目",
							cellRenderer({ rowData }) {
								return hLink({
									label: `${rowData._id}-${rowData.name}`,
									href: _.$aHashLink("/api/project", {
										projectId: rowData._id,
										groupId: rowData.group_id
									})
								});
							}
						},
						{ prop: "desc", label: "描述" }
					],
					async onQuery() {
						_.$loading(true);
						try {
							const {
								data: { list, total }
							} = await _api.yapi.project_page({ page: 0, size: -1 });

							_.$setTableData(vm.configsTable, {
								list: _.map(list, row => {
									const item = _.find(vm.APP.groupList, { _id: row.group_id });
									return {
										...row,
										group_desc: item?.group_desc || "",
										group_name: item?.group_name || ""
									};
								}),
								total
							});
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				})
			};
		},
		computed: {
			cptFormQuery() {
				return _.$pickFormValues(this.formQuery);
			},
			cptConfigsTableDataList() {
				const rows = _.filter(this.configsTable.data.list, row => {
					const { name, group } = this.cptFormQuery;
					_.$lStorage.GroupSectionProjectListFormQuery = { name, group };
					if (name) {
						const regexp = val => new RegExp(val, "ig");
						return _.some([row._id, row.name, row.group_id, row.group_name], val =>
							regexp(name).test(val || "")
						);
					} else if (!_.isEmpty(group)) {
						return _.includes(group, row.group_id);
					} else {
						return true;
					}
				});
				const groupedRowObj = _.groupBy(rows, "group_id");
				return xTableVirNewGroupSortedRows({
					groupedRowObj,
					mergeProp: "group_id"
				});
			},
			btnRest() {
				const vm = this;
				return {
					label: "重置",
					onClick() {
						_.$resetFormValues(`#AdvancedSearch`);
					}
				};
			},
			btnQuery() {
				const vm = this;
				return {
					label: "查询",
					preset: "primary",
					onClick() {
						vm.configsTable.onQuery();
					}
				};
			},
			isShow() {
				return this.$route.query.GroupViewTabName === Vue._yapi_var.TAB_KEY_PROJECT_LIST;
			}
		},
		methods: {
			customRowRender({ cells, columns, depth, isScrolling, rowData, rowIndex, style }) {
				const { rowHeight } = this;
				return xTableVirModifyCellsHeight({
					columns,
					cells,
					rowData,
					rowHeight,
					mergeProp: "group_id",
					calStyle({ rowSpan }) {
						return {
							backgroundColor: "#f8f8f8",
							border: "var(--el-table-border)",
							height: `${rowSpan * rowHeight}px`,
							alignSelf: "flex-start",
							zIndex: rowSpan
						};
					}
				});
			},
			async openGroupProjectDialog() {
				const vm = this;
				return _.$openModal({
					title: i18n("添加项目"),
					url: "@/views/Api/Group/Section/ProjectList/GroupSectionProjectListAddProject.vue",
					parent: vm,
					onOk() {
						vm.APP.updateGroupProjectList();
					}
				});
			}
		},
		watch: {
			"APP.cptGroupId": {
				immediate: true,
				async handler(groupId) {
					if (groupId) {
						try {
							this.APP.updateGroupProjectList();
						} catch (error) {
							_.$msgError(error);
						}
					}
				}
			}
		}
	});
}
</script>

<style lang="less">
.GroupSectionProjectList {
	.GroupSectionProjectList-header {
		background: #eee;
		height: 64px;
		line-height: 40px;
		border-radius: var(--border-radius);
		text-align: right;
		padding: 0 10px;
		font-weight: bold;
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		color: var(--color-title);
		font-weight: 500;
	}
}
</style>
