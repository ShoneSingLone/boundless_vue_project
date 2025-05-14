<template>
	<xDialog style="--xDialog-wrapper-width: 1024px">
		<div class="mb">
			<xBtn :configs="btnSelectFile" />
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({}) {
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
				uploaded: {}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "unset"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnSelectFile() {
				const vm = this;

				return {
					label: i18n("选择文件"),
					icon: "el-icon-upload",
					async onClick() {
						try {
							const i18nJson = await vm.getJson();
							const zhCnAll = {};
							const enUsAll = {};
							_.each(i18nJson, ([zhCn, enUs], key) => {
								zhCnAll[key] = zhCn;
								enUsAll[key] = enUs;
							});

							_.$downloadTextAsBlob(
								`window.i18n.options = ${JSON.stringify(zhCnAll)}`,
								"zh-CN.js"
							);
							_.$downloadTextAsBlob(
								`window.i18n.options = ${JSON.stringify(enUsAll)}`,
								"en-US.js"
							);
						} catch (error) {
							console.error(error);
						}
					}
				};
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
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
				const [file] = await _.$openFileSelector();
				if (!file) {
					return;
				}
				let i18nString = await _.$readFileAsText(file);
				const parseJson = new Function(`return ${i18nString.split("module.exports =")[1]}`);
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
