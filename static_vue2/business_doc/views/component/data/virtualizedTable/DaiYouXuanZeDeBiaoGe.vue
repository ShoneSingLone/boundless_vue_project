<template>
	<div>
		<div class="flex middle">
			<div>selected: {{ selected }}</div>
			<xGap l />
			<div>configsTable.data.set: {{ Array.from(configsTable.data.set) }}</div>
		</div>
		<xMd :md="md" />"
		<xTableVir
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			fixed />
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
				md: `
得益于Typescript，可以使用以下特性： \`defTable.colSingle\` 单选 \`defTable.colMultiple\` 多选
\`\`\`js
defTable.colSingle({
	by: "id",// 通过id进行单选
	getConfigs: () => {
		/* 返回当前列表的配置索引 */
		return vm.configsTable;
	},
	disabled({ rowData, rowIndex }) {
		/* 判断是否禁用，布尔值true则禁用， */
		if (rowIndex % 2) {
			/* 如果是字符串且为真值，会用作禁用的提示 */
			return i18n("如果是字符串且为真值，会用作禁用的提示");
		}
		return "";
	}
})
\`\`\`
`,
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
						{ prop: "title", label: i18n("title") }
					]
				})
			};
		}
	});
}
</script>
