<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.password" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
					password: {
						value: "",
						label: "用户密码",
						msg: `请输入"${row.userName}"的新密码`,
						rules: [
							_rules.required(),
							{
								async validator({ val }) {
									if (/<|>|"|'|\||\\/.test(val)) {
										return "不能包含非法字符：< > \" ' \\\ |";
									}
									return "";
								},
								trigger: ["change"]
							}
						],
						isPwd: true
					}
				})
			};
		},
		computed: {
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
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					await _adminTools.api_user_reset_password({
						userId: row.userId,
						password: formData.password
					});
					_.$msg("修改成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			}
		}
	});
}
</script>
