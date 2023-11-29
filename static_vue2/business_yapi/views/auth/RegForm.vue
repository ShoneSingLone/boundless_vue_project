<template>
	<form ref="form">
		<!-- 用户名 -->
		<xItem :configs="configsForm.userName" autocomplete="userName" />
		<xGap t="20" />
		<xItem :configs="configsForm.email" autocomplete="email" />
		<xGap t="20" />
		<!-- 密码 -->
		<xItem :configs="configsForm.password" autocomplete="current-password" />
		<xGap t="20" />
		<!-- 确认密码 -->
		<xItem :configs="configsForm.confirm" autocomplete="current-password" />
		<xGap t="20" />
		<div class="item-wrapper">
			<xBtn :configs="configsSubmit" />
		</div>
	</form>
</template>
<script>
export default async function () {
	const { THIS_FILE_URL } = this;
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
			return {
				cptRouter,
				Methods_App: stateApp
			};
		},
		data() {
			const vm = this;
			return {
				configsForm: {
					userName: defItem({
						value: "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => xI("用户名"),
						rules: [FormRules.required(xI("请输入用户名!")[EVENT_TYPE.blur])],
						$vSlots: {
							prefix: () => <xIcon icon="UserOutlined" style={stylesLoginFormIcon.icon} />
						}
					}),
					email: defItem({
						value: "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => xI("Email"),
						rules: [FormRules.required(xI("请输入Email!")[EVENT_TYPE.blur]), FormRules.email()],
						$vSlots: {
							prefix: () => <xIcon icon="MailOutlined" style={stylesLoginFormIcon.icon} />
						}
					}),
					password: defItem({
						value: "",
						isPassword: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => xI("密码"),
						rules: [FormRules.required(xI("请输入密码"), [EVENT_TYPE.update])],
						onValidateFail: thisConfigs => {
							console.log(thisConfigs.itemTips);
						},
						$vSlots: {
							prefix: () => <xIcon icon="LockOutlined" style={stylesLoginFormIcon.icon} />
						}
					}),
					confirm: defItem({
						value: "",
						isPassword: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => xI("请再次输入密码!"),
						rules: [
							FormRules.required(xI("请再次输入密码!"), [EVENT_TYPE.blur]),
							newRule({
								validator: async confirm => {
									if (vm.configsForm.password.value !== confirm) {
										return xI("两次输入的密码不一致!");
									}
									return "";
								},
								trigger: [EVENT_TYPE.update]
							})
						],
						$vSlots: {
							prefix: () => <xIcon icon="LockOutlined" style={stylesLoginFormIcon.icon} />
						}
					})
				},
				configsSubmit: {
					size: "large",
					type: "primary",
					class: "login-button flex center login-form-button",
					text: () => xI("注册"),
					async onClick() {
						try {
							if (!(await itemsInvalid(vm.$refs.form))) {
								const res = await API.user.regActions(pickValueFrom(vm.configsForm));
								xU.notification.success(xI('"注册成功"'));

								cptRouter.value.go("/group");
							} else {
								console.error("未通过验证");
							}
						} catch (e) {
							xU.notification.error(e.message);
						}
					}
				}
			};
		},
		methods: {}
	});
}
</script>
<style lang="less"></style>
