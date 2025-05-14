<style lang="less"></style>
<template>
	<xBlock class="flex vertical el-card body-height-100" style="height: 400px; width: 100%">
		<xTablebar :configs="configs_taints">
			<template #left>
				<xBtnArray :configs="oprBtnArray" />
			</template>
		</xTablebar>
		<xGap t="8" />
		<xTableVir
			:columns="configs_taints.columns"
			:data="cptConfigsTaintsDataList"
			:row-height="50" />
	</xBlock>
</template>
<script lang="ts">
export default async function ({}) {
	const [{ mixins }] = await _.$importVue(["/common/ui-x/common/ItemMixins.vue"]);
	return defineComponent({
		mixins: [mixins],
		mounted() {},
		data(vm) {
			return {
				form: defItems({}),
				oprBtnArray: [
					{
						label: i18n("添加"),
						onClick() {
							vm.mixin_value.push({
								_uniqueId: _.uniqueId("disk_"),
								key: "",
								value: ""
							});
						}
					}
				],
				configs_taints: defTable({
					isHideFilter: true,
					isHideQuery: true,
					onQuery(pagination) {},
					data: {
						list: []
					},
					columns: [
						{
							prop: "key",
							label: i18n("name"),
							cellRenderer({ rowData, rowIndex }) {
								return hxItem({
									configs: defItem({
										attrs: {
											maxlength: 253
										},
										rules: [_rules.required()]
									}),
									value: rowData.key || "",
									onChange(val) {
										vm.setValue(rowIndex, { key: val });
									}
								});
							}
						},
						{
							prop: "value",
							label: i18n("值"),
							cellRenderer({ rowData, rowIndex }) {
								return hxItem({
									configs: {},
									value: rowData.value || "",
									onChange(val) {
										vm.setValue(rowIndex, { value: val });
									}
								});
							}
						},
						defTable.colActions({
							width: 60,
							cellRenderer({ rowData, rowIndex }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("移除"),
											onClick: async () => {
												vm.removeItem(rowIndex);
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
			cptConfigsTaintsDataList() {
				return _.map(this.mixin_value, row => {
					return {
						...row
					};
				});
			}
		},
		methods: {
			removeItem(index) {
				this.mixin_value.splice(index, 1);
			},
			setValue(index, { key, value, _uniqueId }) {
				console.log("🚀 ~ setValue ~  key, value, _uniqueId :", key, value, _uniqueId);
				const dataList = _.cloneDeep(this.value);
				const OLD_VALUE = _.pick(dataList[index], ["key", "value", "_uniqueId"]);

				const NEW_VALUE = {
					_uniqueId: OLD_VALUE._uniqueId,
					key: _.$valOrDefault(key, OLD_VALUE.key),
					value: _.$valOrDefault(value, OLD_VALUE.value)
				};

				if (!_.isEqual(OLD_VALUE, NEW_VALUE)) {
					dataList[index] = NEW_VALUE;
					this.mixin_value = [...dataList];
				}
			}
		}
	});
}
</script>
