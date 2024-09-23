<template>
	<div>
		<xMd :md="md" />
		<xTableVir
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			fixed
			:estimated-row-height="50" />
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
每行高度在渲染过程中动态测量。 因此，视客户端硬件性能，**UI 可能会有抖动**。
建议固定适当的高度, 尽量不要使用这种耗性能的方式展示数据。`,
				selected: {},
				configsTable: defTable({
					onQuery(pagination) {
						const list = _.map(new Array(100), (i, rowIndex) => {
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
							prop: "no",
							label: i18n("No"),
							cellRenderer({ rowIndex }) {
								return hDiv(rowIndex + 1);
							}
						},
						{
							prop: "title",
							label: i18n("每一行内容高度不一样"),
							cellRenderer({ rowData, rowIndex }) {
								const content = Date.now() + rowIndex;
								return hDiv(
									_.map(new Array((rowIndex + 1) % 10), (i, ii) =>
										hDiv([hDiv(rowIndex), hDiv(content), hDiv(ii)])
									)
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
