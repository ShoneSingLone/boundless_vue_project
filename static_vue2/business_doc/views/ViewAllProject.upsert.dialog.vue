<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.name" />
				<xItem :configs="form.desc" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onSuccess, projectsDB }) {
	const isUpdate = !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		mounted() {},
		data() {
			return {
				form: {
					name: {
						value: "",
						label: i18n("name"),
						disabled: isUpdate,
						rules: [
							_rules.required(),
							_rules.lessThan(50),
							{
								name: "checkDnsList",
								async validator({ val }) {
									if (
										_.some(projectsDB, db => {
											return val === db.id.replace("business_", "");
										})
									) {
										return i18n("项目名称重复");
									}
								},
								trigger: ["change", "input", "blur"]
							}
						]
					},
					desc: {
						value: "",
						label: i18n("描述"),
						type: "textarea",
						disabled: isUpdate,
						rules: [_rules.required(), _rules.lessThan(50)]
					}
				}
			};
		},
		computed: {
			isUpdate() {
				return !!row;
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
				const [error] = await _.$validateForm(this.$el);
				if (!error) {
					_.$loading(true);
					try {
						await _api.doc.projectsUpsert({ create: _.$pickFormValues(this.form) });
						onSuccess();
						this.closeModal();
					} catch (error) {
						console.error(error);
						_.$msgError(error.msg);
					} finally {
						_.$loading(false);
					}
				}
			}
		}
	});
}
</script>
