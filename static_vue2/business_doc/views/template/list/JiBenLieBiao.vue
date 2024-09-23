<style lang="less"></style>
<template>
	<div class="x-page-view" style="height: 800px">
		<xPageTitle title="这里是标题，可以直接使用i18n的key" />
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="searchForm.name" />
				<xItem :configs="searchForm.id" />
			</xTablebar>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
		<xCard>
			<xMd :md="doc" />
		</xCard>
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
				doc: `
- 列过滤按钮默认\`true\`
- 查询按钮默认\`true\`
- 重置按钮默认\`false\`，\`isShowReset:true\` 显示重置按钮
- xItem 的 configs 需要配置 \`value\`**(不可使用\`v-model\`形式)**
- xItem 的 configs 需要配置 \`resetValue\`
  - \`resetValue\` 可以是Function
    - this指向当前configs
	- 例如：this.value = Date.now(),每次重置的值会刷新
`,
				searchForm: defItems({
					name: {
						value: "",
						resetValue: "resetValue",
						clearable: true,
						placeholder: i18n("请输入prop")
					},
					id: {
						value: "",
						resetValue() {
							this.value = Date.now();
						},
						clearable: true,
						placeholder: i18n("请输入prop")
					}
				}),
				oprBtnArray: [
					{
						label: "新增",
						icon: "add",
						onClick() {
							return _.$openModal({
								title: "新增",
								url: "@/views/template/list/JiBenLieBiao.dialog.vue",
								parent: vm,
								onOk() {
									console.log("1");
								}
							});
						}
					}
				],

				configsTable: defTable({
					isHideQuery: false,
					isHideFilter: false,
					isShowReset: true,
					onQuery(pagination) {
						return vm.getTableData(pagination);
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
							getConfigs: () => vm.configsTable
						}),
						{ prop: "accessTime", label: "访问时间" },
						{ prop: "clientId", label: "客户端IP" },
						{ prop: "clientMac", label: "客户端MAC" },
						{ prop: "interfaceUrl", label: "URL" }
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
			}
		},
		methods: {
			async getTableData(pagination) {
				try {
					_.$loading(true);
					_.$setTableData(this.configsTable, { list: [{}], total: 1 });
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
