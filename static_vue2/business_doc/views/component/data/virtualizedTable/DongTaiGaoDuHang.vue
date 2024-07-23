<template>
	<div>
		<xMd :md="md" />
		<xTableVir
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			fixed
			:estimated-row-height="40" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		mounted() {
			this.configsTable.onQuery();
		},
		data() {
			const vm = this;
			return {
				md: `虚拟表能够呈现具有动态高度的行数。 如果您正在处理数据并不确定内容大小， 此功能对于调整到内容高度的渲染行是理想的。 要启用此功能，请传递 \`estimated-row-height\` 属性。 估计高度越接近实际内容，渲染体验就越顺。

> ## TIP
每行高度在渲染过程中动态测量。 因此，如果您试图显示大量数据， UI 可能会 抖动。`,
				selected: {},
				configsTable: defTable({
					onQuery(pagination) {
						const list = _.map(new Array(2000), (i, rowIndex) => {
							return {
								id: rowIndex,
								title: `row_${rowIndex + 1}`
							};
						});

						_.$setTableData(vm.configsTable, {
							list,
							total: list.length
						});
					},
					onSelectedChange(newValue, oldValue) {
						const row = _.find(
							vm.configsTable.data.list,
							item => item.id === newValue[0]
						);
						if (row) {
							vm.selected = row;
						} else {
							vm.selected = {};
						}
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colSingle({
							by: "id",
							getConfigs: () => {
								return vm.configsTable;
							},
							disabled({ rowData, rowIndex }) {
								if (rowIndex % 2) {
									return i18n("如果是字符串且为真值，会用作禁用的提示");
								}
								return "";
							}
						}),
						{
							prop: "title",
							label: i18n("title"),
							cellRenderer({ rowData, rowIndex }) {
								return h(
									"div",
									{ class: "flex vertical" },
									_.map(new Array(rowIndex % 10), () => {
										return h("span", {}, rowData.title);
									})
								);
							}
						}
					]
				})
			};
		}
	});
}
</script>
