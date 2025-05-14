<style lang="less">
.ProjectInterfaceSectionInterfaceList {
}
</style>
<template>
	<div class="height100 flex vertical ProjectInterfaceSectionInterfaceList">
		<xTablebar
			style="--xItem-wrapper-width: 424px; --xItem-label-width: 100px"
			:configs="inject_project_interface_section.configsTable">
			<template #left>
				<xBtnArray :configs="oprBtnArray" />
			</template>
			<!-- 名称或者路径 -->
			<template #right>
				<xItem :configs="inject_project_interface_section.form.path" />
				<xBtn
					preset="primary"
					@click="inject_project_interface_section.configsTable.onQuery({ page: 1 })"
					>查询</xBtn
				>
			</template>
		</xTablebar>
		<div id="AdvancedSearch"></div>
		<div class="x-page-content-middle mt8 flex horizon">
			<xTableVir
				:columns="inject_project_interface_section.configsTable.columns"
				:data="inject_project_interface_section.configsTable.data.list"
				:slotsRow="customRowRender"
				:rowHeight="rowHeight" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_project_interface_section"],
		data() {
			return {
				rowHeight: 100,
				isAdvancedSearchCollapse: true
			};
		},
		computed: {
			cptIsCheckedRow() {
				return this.inject_project_interface_section.configsTable.data.set.size === 0;
			},
			oprBtnArray() {
				const vm = this;
				return [
					{
						label: "添加接口",
						onClick: vm.addInterface
					},
					{
						label: "修改Tags",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.modifyInterfaceTags
					},
					{
						label: "切换代理",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.changeProxy
					},
					{
						label: "切换维护人",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.switchingMaintenancePersonnel
					},
					{
						label: "复制接口",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.copyInterface
					},
					{
						label: "重置备份",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.resetBackupData
					},
					{
						label: "删除",
						preset: "danger",
						disabled: () => vm.cptIsCheckedRow,
						onClick: vm.deleteInterface
					}
				];
			},
			btnRest() {
				return {
					label: "重置",
					onClick: () => {
						return this.inject_project_interface_section.resetFilter();
					}
				};
			}
		},
		watch: {},
		methods: {
			customRowRender({ cells, columns, depth, isScrolling, rowData, rowIndex, style }) {
				const { rowHeight } = this;
				return xTableVirModifyCellsHeight({
					columns,
					cells,
					rowData,
					rowHeight,
					mergeProp: "catid",
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

			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.inject_project_interface_section.form);
			},
			async addInterface() {
				return _.$openModal({
					title: "添加接口",
					url: "@/components/YapiDialogUpsertInterface.vue",
					parent: this,
					project_id: this.APP.cptProjectId,
					get_interface_list: this.inject_project.get_interface_list
				});
			},
			async modifyInterfaceTags() {
				return _.$openModal({
					title: "修改Tags",
					url: "@/components/ModifyInterfaceTags.dialog.vue",
					parent: this,
					allInterface: this.inject_project_interface_section.configsTable.data.list,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			},
			async changeProxy() {
				_.$openModal({
					title: i18n("切换代理"),
					url: "@/components/YapiChangeProxyDialog.vue",
					parent: this,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			},
			async switchingMaintenancePersonnel() {
				_.$openModal({
					title: i18n("切换维护人"),
					url: "@/components/YapiSwitchingMaintenancePersonnel.vue",
					parent: this,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			},
			async resetBackupData() {
				_.$openModal({
					title: i18n("重置备份"),
					url: "@/components/YapiResetBackupData.dialog.vue",
					parent: this,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			},
			async deleteInterface() {
				try {
					await _.$confirm_important("是否删除当前选择的接口？");
					_.$loading(true);
					const res = await _api.yapi.interface_del_by_ids(
						Array.from(this.inject_project_interface_section.configsTable.data.set)
					);
					this.inject_project.get_interface_list();
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			async copyInterface() {
				_.$openModal({
					title: i18n("复制接口到所选项目"),
					url: "@/components/YapiCoypInterface.dialog.vue",
					parent: this,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			}
		}
	});
}
</script>
