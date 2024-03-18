<template>
	<xDialog style="--xDialog-wrapper-width: 800px">
		<xForm col="1">
			<xItem :configs="form.key" />
			<xItem :configs="form.zhCn" />
			<xItem :configs="form.enUs" />
			<xItem :configs="form.desc" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ refreshTableData, rowData }) {
	rowData = rowData || {};
	const isUpdate = !!rowData._id;
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_i18n"],
		props: useDialogProps(),
		mounted() {
			if (isUpdate) {
				this.fillbackData();
			}
		},
		data() {
			const vm = this;
			return {
				count: 0,
				errorCount: 0,
				uploaded: {},
				form: defItems({
					key: { label: i18n("prop"), value: "", rules: [_rules.required()] },
					zhCn: {
						label: i18n("中文"),
						type: "textarea",
						value: "",
						rules: [_rules.required()]
					},

					enUs: {
						label: i18n("English"),
						type: "textarea",
						value: "",
						disabled() {
							return !_.$isInput(vm.cptFormData.zhCn);
						},
						itemSlots: {
							afterController() {
								const btnProps = {
									class: "ml8",
									configs: {
										label: i18n("translate"),
										preset: "blue",
										async onClick() {
											try {
												const { dst } = await vm.inject_i18n.translate({
													query: vm.cptFormData.zhCn
												});
												vm.form.enUs.value = dst;
											} catch (error) {
												_.$msgError(error);
											}
										}
									}
								};

								return h("xBtn", btnProps);
							}
						}
					},
					desc: {
						label: i18n("描述"),
						value: "",
						type: "textarea"
					}
				})
			};
		},
		computed: {
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;

						const i18n = {
							...rowData,
							...vm.cptFormData
						};
						await _api.yapi.i18nUpsertOne({ i18n });
						refreshTableData();
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			fillbackData() {
				_.$fillBackData({
					form: this.form,
					data: {
						key: rowData.key || "",
						zhCn: rowData.zhCn || "",
						enUs: rowData.enUs || "",
						desc: rowData.desc || ""
					},
					order: ["key", "zhCn", "enUs", "desc"]
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
