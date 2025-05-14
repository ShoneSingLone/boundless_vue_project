<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.name" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const isUpdate = !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		mounted() {},
		data() {
			return {
				form: defItems({
					name: {
						value: "",
						label: i18n("name"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.lessThan(50)]
					}
				})
			};
		},
		computed: {
			isUpdate() {
				return !!row;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("OK"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				this.closeModal();
			}
		}
	});
}
</script>
