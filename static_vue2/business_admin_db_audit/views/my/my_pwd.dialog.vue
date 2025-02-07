<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.oldPwd" />
				<xItem :configs="form.newPwd" />
				<xItem :configs="form.repwd" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function () {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		mounted() {},
		data(vm) {
			return {
				form: {
					oldPwd: {
						value: "",
						label: i18n("旧密码"),
						isPwd: true,
						rules: [_rules.required()]
					},
					newPwd: {
						value: "",
						label: i18n("新密码"),
						isPwd: true,
						rules: [_rules.required()]
					},
					repwd: {
						value: "",
						label: i18n("确认密码"),
						isPwd: true,
						rules: [
							_rules.required(),
							_rules.validator(({ val }) => {
								if (val !== vm.form.newPwd.value) {
									return i18n("两次输入的密码不一致");
								}
								return "";
							})
						]
					}
				}
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
				try {
					_.$loading(true);
					const { code, msg } = await _api.admin_db_audit.xdsUserChangePwd({
						oldPwd: this.form.oldPwd.value,
						newPwd: this.form.newPwd.value
					});
					if (code === 0) {
						this.closeModal();
					} else {
						_.$msgError(msg);
					}
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
