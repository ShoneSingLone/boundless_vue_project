<style lang="less">
#ProjectInterfaceSection {
	width: 1px;
}
</style>

<template>
	<section id="ProjectInterfaceSection" class="page-view flex1">
		<xPageContent>
			<xTableVir :columns="cptColumns" :data="configsTable.rowData" fixed />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_interface"],
		setup(props) {
			const configsTable = reactive({
				selected: new Set(),
				rowData: []
			});

			const cptColumns = computed(() => {
				const checkbox = {
					prop: "checkbox",
					label: i18n("checkbox"),
					width: 48,
					fixed: true,
					headerCellRenderer(_props) {
						const isChecked = configsTable.rowData.length > 0 && configsTable.selected.size === configsTable.rowData.length;
						const isIndeterminate = configsTable.selected.size > 0 && configsTable.selected.size < configsTable.rowData.length;
						return h(
							"div",
							{
								class: "flex center width100"
							},
							[
								h("elCheckbox", {
									indeterminate: isIndeterminate,
									value: isChecked,
									onChange() {
										if (configsTable.selected.size < configsTable.rowData.length) {
											configsTable.selected = new Set(_.map(configsTable.rowData, i => i._id));
										} else {
											configsTable.selected = new Set();
										}
									}
								})
							]
						);
					},
					cellRenderer: ({ rowData }) => {
						const isChecked = configsTable.selected.has(rowData._id);
						return h(
							"div",
							{
								class: "flex center width100"
							},
							[
								h("elCheckbox", {
									value: isChecked,
									onChange(value) {
										if (value) {
											configsTable.selected.add(rowData._id);
										} else {
											configsTable.selected.delete(rowData._id);
										}
									}
								})
							]
						);
					}
				};

				const catid = {
					prop: "catid",
					label: i18n("接口分类"),
					width: 150
				};

				const title = {
					prop: "title",
					label: i18n("接口名称")
				};

				const method = {
					prop: "method",
					label: i18n("请求方法"),
					width: 100
				};

				const path = {
					prop: "path",
					label: i18n("接口路径")
				};

				const status = {
					prop: "status",
					label: i18n("状态"),
					width: 150
				};

				const isProxy = {
					prop: "isProxy",
					label: i18n("转发"),
					width: 150
				};
				const isUseBackup = {
					prop: "isUseBackup",
					label: i18n("启用备份数据"),
					width: 100
				};

				const maintainer = {
					prop: "tag",
					label: i18n("维护人"),
					width: 150
				};
				const tag = {
					prop: "tag",
					label: i18n("Tags"),
					width: 250
				};

				return [checkbox, catid, title, method, path, status, maintainer, isProxy, isUseBackup, tag];
			});

			return {
				cptColumns,
				configsTable
			};
		},
		data() {
			return {
				data: []
			};
		},
		watch: {
			"inject_interface.allInterface": {
				immediate: true,
				handler(allInterface) {
					this.configsTable.rowData = allInterface;
				}
			}
		}
	});
}
</script>
