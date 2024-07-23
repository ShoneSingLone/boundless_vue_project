<template>
	<xDialog style="--xDialog-wrapper-width: 500px">
		<xForm col="1">
			<xItem :configs="form.appId" />
			<xItem :configs="form.appKey" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ onResponse }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_i18n"],
		props: useDialogProps(),
		data() {
			const vm = this;
			return {
				form: defItems({
					appId: {
						label: i18n("appId"),
						value: _.$lStorage.translateAppId || "",
						onEmitValue({ val }) {
							_.$lStorage.translateAppId = val + "";
						},
						rules: [_rules.required()]
					},
					appKey: {
						label: i18n("appKey"),
						value: _.$lStorage.appKey || "",
						onEmitValue({ val }) {
							_.$lStorage.appKey = val;
						},
						rules: [_rules.required()]
					}
				})
			};
		},
		computed: {
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						await onResponse(vm.cptFormData);
						vm.closeModal();
					}
				};
			}
		},
		methods: {}
	});
}
</script>
<style lang="less"></style>
