<template>
	<xForm>
		<xItem label="作为Wrapper" span="full">
			<xItem :configs="form.xItemRadioGroup" />
			<xItem :configs="form.xItemSelect" />
		</xItem>
		<xBtn :configs="btnSubmit" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			const vm = this;
			const options = [
				{
					label: "xItemInput",
					value: "xItemInput"
				},
				{
					label: "xItemSelect",
					value: "xItemSelect"
				}
			];
			return {
				form: defItems({
					xItemRadioGroup: {
						value: "xItemInput",
						isButton: true,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: options
					},
					xItemSelect: {
						value: "xItemInput",
						itemType: "xItemSelect",
						options: options
					}
				}),
				viewMsg: "",
				md: ``
			};
		},
		computed: {
			btnSubmit() {
				const vm = this;
				return {
					label: "提交",
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) {
							_.$msgError("校验未通过");
						} else {
							_.$msgSuccess("成功");
						}
					}
				};
			}
		}
	});
}
</script>
