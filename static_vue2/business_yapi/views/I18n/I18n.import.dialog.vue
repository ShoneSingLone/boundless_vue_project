<template>
	<xDialog style="--xDialog-wrapper-width: 1024px">
		<div class="mb">
			<xBtn :configs="btnSelectFile" />
		</div>
		<xAlert v-if="cptTips" show-icon :closable="false" type="success"> {{ cptTips }}</xAlert>
		<xTableVir class="mt" :columns="configsTable.columns" :data="configsTable.data.list" />

		<!-- <xForm col="1"> <xItem :configs="form.content" style="min-height: 300px" /> </xForm> -->
		<template #footer>
			<xBtn :configs="btnOk" />
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ refreshTableData, listData }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {},
		data() {
			return {
				count: 0,
				errorCount: 0,
				uploaded: {},
				form: defItems({
					content: {
						value: "",
						rules: [_rules.required()],
						type: "textarea",
						itemType: "YapiItemMonaco"
					}
				}),
				configsTable: defTable({
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						{
							label: i18n("No."),
							prop: "_id",
							width: 60,
							cellRenderer({ rowIndex }) {
								return h("div", [rowIndex + 1]);
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
					return `已存在: ${this.errorCount} 个，成功导入: ${this.count} 个`;
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
				return _.$pickValueFromConfigs(this.form);
			},
			btnSelectFile() {
				const vm = this;

				if (vm.configsTable.data.list.length) {
					return {
						label: `导入${vm.configsTable.data.list.length}条数据`,
						icon: "el-icon-upload",
						onClick() {
							vm.upload();
						}
					};
				}
				return {
					label: i18n("选择文件"),
					icon: "el-icon-upload",
					async onClick() {
						try {
							const i18nJson = await vm.getJson();
							vm.configsTable.data.list = _.map(i18nJson, ([zhCn, enUs], key) => {
								return {
									key,
									zhCn,
									enUs
								};
							});
						} catch (error) {
							console.error(error);
						}
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
			async upload() {
				const vm = this;
				let i18nItem;
				while ((i18nItem = vm.configsTable.data.list.pop())) {
					try {
						const thisItem = _.find(listData, { key: i18nItem.key });
						if (thisItem) {
							throw new Error("已存在");
						}
						await _api.yapi.i18nUpsertOne({ i18n: i18nItem });
						vm.count++;
					} catch (error) {
						console.error(error);
						// _.$msgError(error);
						vm.errorCount++;
					}
				}
			},
			async getJson() {
				const files = await _.$openFileSelector();
				let i18nString = await _.$readFileAsText(files[0]);
				this.form.content.value = i18nString;
				const parseJson = new Function(`return ${i18nString}`);
				return parseJson();
			},

			async upsertOne() {
				try {
					const res = await _api.ctyun.restCtyunV10KeyPairImport({
						..._MoCfContext.commonParams(),
						...this.cptFormData
					});
					if (res?.code === 200) {
						refreshTableData && refreshTableData();
						this.closeModal();
					}
				} catch (error) {
					_.$msgError(error);
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
