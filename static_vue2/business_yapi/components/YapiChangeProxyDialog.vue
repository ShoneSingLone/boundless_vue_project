<style lang="less"></style>
<template>
	<xDialog>
		<xForm ref="form" :style="labelStyle" col="1">
			<xItem :configs="form.isProxy" />
			<xItem :configs="form.witchEnv" v-if="form.isProxy.value" />
			<xItem :configs="form.res_body_type" span="full" v-else />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ selected, callBack }) {
	/* 必要，混入"closeModal", "layerMax", "layerMin", "layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data() {
			return {
				form: {
					isProxy: {
						value: false,
						label: i18n("是否开启转发"),
						itemType: "xItemSwitch"
					},
					witchEnv: {
						value: "",
						label: i18n("转发环境"),
						itemType: "YapiItemProxyEnv"
					},
					res_body_type: {
						value: "backup",
						label: i18n("响应类型"),
						itemType: "xItemRadioGroup",
						minWidth: 80,
						tips: `如果没有使用转发，选择备份会直接返回备份的JSON数据`,
						options: [
							{ label: "备份", value: "backup" },
							{ label: "form", value: "form", isForm: true },
							{ label: "json", value: "json" },
							{ label: "file", value: "file" },
							{ label: "raw", value: "raw" }
						]
					}
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						let id;
						while ((id = selected.pop())) {
							await vm.update(id);
						}

						vm.inject_project.getInterfaceList();
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			async update(id) {
				_.$loading(true);
				try {
					const params = {
						id
					};

					if (this.cptFormData.isProxy) {
						params.isProxy = true;
						params.witchEnv = this.cptFormData.witchEnv;
					} else {
						params.isProxy = false;
						params.res_body_type = this.cptFormData.res_body_type;
					}

					return await _api.yapi.interface_up(params);
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
