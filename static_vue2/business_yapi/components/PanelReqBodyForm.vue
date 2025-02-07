<style lang="less"></style>
<template>
	<div>
		<xBtn @click="() => addNewQuery()" class="mt4">添加</xBtn>
		<div class="width100 yapiItemReqBodyParams-table-height x-padding" ref="columns">
			<xTableVir :columns="columns" :data="cptReqBodyForm" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["value"],
		model: {
			prop: "value",
			event: "change"
		},
		data(vm) {
			return {
				form: defItems({
					name: {
						rules: [
							_rules.required(),
							_rules.validator(({ val }) => {
								const items = _.filter(vm.cptReqQuery, item => item.name === val);
								if (items.length > 1) {
									return "参数名重复";
								}
								return "";
							})
						]
					},

					value: {
						itemType: "xItemSelect",
						options: [
							{
								label: "string",
								value: "string"
							},
							{
								label: "number",
								value: "number"
							},
							{
								label: "boolean",
								value: "boolean"
							},
							{
								label: "file",
								value: "file"
							}
						]
					}
				}),
				columns: [
					{
						prop: `name`,
						label: `参数名`,
						cellRenderer({ rowData, rowIndex }) {
							return hxItem({
								configs: vm.form.name,
								value: rowData.name,
								onChange(val) {
									if (!_.isEqual(rowData.name, val)) {
										vm.cptReqBodyForm[rowIndex].name = val;
									}
								}
							});
						}
					},
					{
						prop: `value`,
						label: `类型`,
						cellRenderer({ rowData, rowIndex }) {
							return hxItem({
								configs: vm.form.value,
								value: rowData.value,
								onChange(val) {
									if (!_.isEqual(rowData.value, val)) {
										vm.cptReqBodyForm[rowIndex].value = val;
									}
								}
							});
						}
					},
					{
						prop: `example`,
						label: `示例`,
						cellRenderer({ rowData, rowIndex }) {
							return hxItem({
								configs: vm.form.example,
								value: rowData.example,
								onChange(val) {
									if (!_.isEqual(rowData.example, val)) {
										vm.cptReqBodyForm[rowIndex].example = val;
									}
								}
							});
						}
					},
					{
						prop: `desc`,
						label: `说明`,
						cellRenderer({ rowData, rowIndex }) {
							return hxItem({
								configs: vm.form.desc,
								value: rowData.desc,
								onChange(val) {
									if (!_.isEqual(rowData.desc, val)) {
										vm.cptReqBodyForm[rowIndex].desc = val;
									}
								}
							});
						}
					},
					defTable.colActions({
						width: 80,
						cellRenderer({ rowIndex }) {
							return hxIcon({
								icon: "delete",
								class: "pointer",
								onClick() {
									vm.cptReqBodyForm.splice(rowIndex, 1);
								}
							});
						}
					})
				]
			};
		},
		computed: {
			/* url 参数 */
			cptReqBodyForm: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit("change", val);
				}
			}
		},
		methods: {
			async addNewQuery() {
				const [error] = await _.$validateForm(this.$refs.columns);
				if (error) {
					return;
				}
				this.cptReqBodyForm.push({
					name: "",
					value: "string",
					example: "",
					desc: ""
				});
			}
		}
	});
}
</script>
