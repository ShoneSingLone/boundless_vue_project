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
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function () {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				form: {
					name: { value: "", label: i18n("name") }
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
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				this.closeModal();
			}
		}
	});
}
</script>

<style lang="less"></style>
