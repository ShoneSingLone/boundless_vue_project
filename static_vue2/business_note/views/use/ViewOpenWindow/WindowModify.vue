<template>
	<xDialog>
		<!-- '--xItem-label-width': "144px" -->
		<xCard class="mt10">
			<form ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</form>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script>
export default async function () {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				form: {
					name: { value: "", label: i18n("名称") }
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cpt_formData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				this.$closeWindow();
			}
		}
	});
}
</script>

<style lang="less"></style>
