<style lang="less"></style>
<template>
	<xDialog>
		<xForm ref="form" :style="labelStyle" col="1"> </xForm>
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
			return {};
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
						id,
						resBackupJson: ""
					};
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
