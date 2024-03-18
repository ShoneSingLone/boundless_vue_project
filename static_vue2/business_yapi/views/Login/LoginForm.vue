<template>
	<xForm col="1">
		<!-- 用户名 -->
		<xItem :configs="configsForm.email" autocomplete="email" @keypress.enter="login" />
		<!-- 密码 -->
		<xItem :configs="configsForm.password" autocomplete="current-password" @keypress.enter="login" />
		<div class="item-wrapper">
			<xBtn :configs="configsSubmit" />
		</div>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: {
			form: { type: Object },
			history: { type: Object },
			isLDAP: { type: Boolean }
		},
		data(vm) {
			return {
				configsForm: {
					email: defItem({
						value: _.$lStorage.email || "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => i18n("Email"),
						onEmitValue({ val }) {
							_.$lStorage.email = val;
						},
						rules: [_rules.required("", ["blur"]), _rules.email()],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_MailOutlined",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					}),
					password: defItem({
						value: _.$lStorage.password || "",
						isPwd: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => i18n("密码"),
						onEmitValue({ val }) {
							_.$lStorage.password = val;
						},
						onEnter(e) {
							vm.login();
						},
						rules: [_rules.required(i18n("请输入密码"), ["blur"])],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_LockOutlined",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					})
				},
				configsSubmit: {
					label: i18n("登录"),
					preset: "blue",
					size: "large",
					class: "login-button flex center login-form-button",
					onClick: vm.login
				}
			};
		},
		methods: {
			async login() {
				const vm = this;
				try {
					const [error] = await _.$validateForm(vm.$el);
					if (error) {
						console.error("未通过验证");
					} else {
						const formData = _.$pickValueFromConfigs(vm.configsForm);
						const res = await _api.yapi.userLogin(formData);
						if (res?.data?.x_token) {
							_.$lStorage.x_token = res?.data?.x_token;
							_.$msgSuccess("登录成功! ");
							await this.APP.refreshUserInfo();
						}
					}
				} catch (e) {
					console.error(e);
					_.$msgError(e.message);
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
