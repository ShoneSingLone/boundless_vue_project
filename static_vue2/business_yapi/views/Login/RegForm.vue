<template>
	<xForm ref="form">
		<!-- 用户名 -->
		<xItem :configs="configsForm.email" autocomplete="email" />
		<div class="ml16">
			<xBtn :configs="configsGetCode" />
		</div>

		<xItem span="full" :configs="configsForm.code" autocomplete="email" />
		<xItem span="full" :configs="configsForm.userName" autocomplete="userName" />
		<!-- 密码 -->
		<xItem span="full" :configs="configsForm.password" autocomplete="current-password" />
		<!-- 确认密码 -->
		<xItem span="full" :configs="configsForm.confirm" autocomplete="current-password" />
		<div class="item-wrapper" span="full">
			<xBtn :configs="configsSubmit" />
		</div>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			form: {
				type: Object
			},
			history: {
				type: Object
			},
			regActions: {
				type: Function
			}
		},
		setup() {
			return {};
		},
		data() {
			const vm = this;
			return {
				configsForm: {
					userName: defItem({
						value: _.$lStorage.reg_userName || "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: i18n("用户名，显示给其他人看"),
						rules: [_rules.required(i18n("请输入用户名!")["blur"])],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_UserOutlined",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					}),
					email: defItem({
						value: _.$lStorage.reg_email || "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: i18n("E-mail，登录和收邮件用"),
						rules: [_rules.required(i18n("请输入Email!")), _rules.email()],
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
						value: _.$lStorage.reg_password || "",
						isPwd: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: i18n("密码"),
						rules: [_rules.required(i18n("请输入密码"), ["update"])],
						onValidateFail: thisConfigs => {
							console.log(thisConfigs.itemTips);
						},
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_LockOutlined",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					}),
					confirm: defItem({
						value: _.$lStorage.reg_confirm || "",
						isPwd: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: i18n("请再次输入密码!"),
						rules: [
							_rules.required(i18n("请再次输入密码!")),
							{
								validator: async ({ val }) => {
									if (vm.configsForm.password.value !== val) {
										return i18n("两次输入的密码不一致!");
									}
									return "";
								},
								trigger: ["update"]
							}
						],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_LockOutlined",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					}),
					code: defItem({
						value: _.$lStorage.reg_code || "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: i18n("邮箱验证码"),
						rules: [_rules.required(i18n("请输入邮箱收到的验证码"))],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_verifyCode",
									style: Vue._yapi_var.stylesLoginFormIcon
								});
							}
						}
					})
				}
			};
		},
		computed: {
			configsGetCode() {
				const vm = this;
				return {
					size: "large",
					// preset: "blue",
					label: i18n("获取验证码"),
					disabled() {
						return !_reg.email().test(vm.configsForm.email.value);
					},
					async onClick() {
						try {
							const { data } = await _api.yapi.postNewVarifyCode(vm.configsForm.email.value);
							if (data) {
								_.$msgSuccess(data.msg);
								vm.$router.push({ path: "/group" });
							}
						} catch (e) {
							_.$msgError(e.message);
						}
					}
				};
			},
			/* 提交 */
			configsSubmit() {
				const vm = this;
				return {
					size: "large",
					preset: "blue",
					class: "login-button flex center login-form-button",
					label: i18n("注册"),
					async onClick() {
						const formData = _.$pickValueFromConfigs(vm.configsForm);
						_.each(formData, (val, key) => {
							_.$lStorage[`reg_${key}`] = val;
						});

						try {
							const [error] = await _.$validateForm(vm.$refs.form);
							if (error) {
								console.error("未通过验证");
							} else {
								const res = await _api.yapi.postUserReg(formData);
								_.$msgSuccess(i18n("注册成功"));
								vm.$router.push({ path: "/group" });
							}
						} catch (e) {
							_.$msgError(e.message);
						}
					}
				};
			}
		}
	});
}
</script>
<style lang="less"></style>
