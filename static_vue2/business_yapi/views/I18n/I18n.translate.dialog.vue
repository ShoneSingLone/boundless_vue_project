<template>
	<xDialog style="--xDialog-wrapper-width: 1024px">
		<div class="mb">
			<xBtn :configs="btnTranslateIt" />
		</div>
		<xAlert v-if="cptTips" show-icon :closable="false" type="success"> {{ cptTips }}</xAlert>
		<div style="height: 500px">
			<xTableVir class="mt" :columns="configsTable.columns" :data="configsTable.data.list" />
		</div>
		<template #footer>
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ refreshTableData, listData }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_i18n"],
		props: useDialogProps(),
		data() {
			return {
				count: 0,
				errorCount: 0,
				configsTable: defTable({
					data: {
						set: new Set(),
						list: listData || []
					},
					columns: [
						{
							label: i18n("No."),
							prop: "_id",
							width: 60,
							cellRenderer({ rowIndex }) {
								return hDiv([rowIndex + 1]);
							}
						},
						{
							label: i18n("prop"),
							prop: "key",
							width: 300
						},
						{
							label: i18n("中文"),
							prop: "zhCn"
						},
						{
							label: i18n("English"),
							prop: "enUs"
						}
					],
					onQuery: null
				})
			};
		},
		computed: {
			cptTips() {
				if (this.count || this.errorCount) {
					return `
Total：${listData.length} 
已尝试：${this.count + this.errorCount}
成功更新: ${this.count} 个，失败: ${this.errorCount} 个`;
				} else {
					return "";
				}
			},

			labelStyle() {
				return {
					"--xItem-label-width": "unset"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnTranslateIt() {
				const vm = this;
				return {
					label: `批量翻译_enUs`,
					icon: "el-icon-upload",
					onClick() {
						return vm.translate();
					}
				};
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						refreshTableData();
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			async translate() {
				let i18n;
				let newRows = [];
				let dataList = _.cloneDeep(listData);
				while ((i18n = dataList.pop())) {
					try {
						const { dst } = await this.inject_i18n.translate({ query: i18n.zhCn });
						i18n.enUs = dst;
						await _api.yapi.i18nUpsertOne({ i18n });
						newRows.push(i18n);
						_.$setTableData(this.configsTable, {
							list: newRows
						});
						this.count++;
					} catch (error) {
						this.errorCount++;
						console.error(error);
					}
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
