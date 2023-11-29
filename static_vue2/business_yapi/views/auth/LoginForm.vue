<template>
	<form>
		<!-- 用户名 -->
		<xItem :configs="configsForm.email" autocomplete="email" @keypress.enter="login" />
		<xGap t="20" />
		<!-- 密码 -->
		<xItem :configs="configsForm.password" autocomplete="current-password" @keypress.enter="login" />
		<xGap t="20" />
		<div class="item-wrapper">
			<xBtn :configs="configsSubmit" />
		</div>
	</form>
</template>
<script>
export default async function () {
	const RULES = await _.$importVue("/common/utils/rules.vue");
	return defineComponent({
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
						onKeypress(e) {
							debugger;
						},
						rules: [RULES.required("", ["blur"]), RULES.email()],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_MailOutlined",
									style: Vue._var.stylesLoginFormIcon
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
						rules: [RULES.required(i18n("请输入密码"), ["blur"])],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_LockOutlined",
									style: Vue._var.stylesLoginFormIcon
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
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
					}
				}
			};
		},
		methods: {
			async login() {
				const vm = this;
				try {
					if (!(await itemsInvalid(vm.$el))) {
						const formData = pickValueFrom(vm.configsForm);
						const res = await API.user.loginActions(formData);
						await stateApp._refreshUserInfo(res.data);
						_.$lStorage["x_token"] = res.data.x_token;
						xU.notification.success("登录成功! ");
						vm.$router.push("/group");
					} else {
						console.error("未通过验证");
					}
				} catch (e) {
					console.error(e);
					xU.notification.error(e.message);
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
