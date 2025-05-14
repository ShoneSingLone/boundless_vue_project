<template>
	<xForm col="1">
		<!-- 用户名 -->
		<xItem :configs="configsForm.username" autocomplete="username" @keypress.enter="login" />
		<!-- 密码 -->
		<xItem
			:configs="configsForm.password"
			autocomplete="current-password"
			@keypress.enter="login" />
		<!-- 验证码 -->
		<xItem :configs="configsForm.code" @keypress.enter="login" />
		<!-- 记住我 -->
		<xItem :configs="configsForm.rememberMe" />
		<div class="width100">
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
			const rememberMe = _.$lStorage.rememberMe === "true" ? true : false;
			const username = rememberMe ? _.$lStorage.username || "" : "";
			const password = rememberMe ? _.$lStorage.password || "" : "";

			return {
				captchaEnabled: false,
				codeUrl: "",
				configsForm: {
					username: defItem({
						value: username,
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => i18n("账号:tony"),
						onEmitValue({ val }) {
							_.$lStorage.username = val;
						},
						rules: [_rules.required("", ["blur"])],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_MailOutlined",
									style: window._var_admin_normal.stylesLoginFormIcon
								});
							}
						}
					}),
					password: defItem({
						value: password,
						isPwd: true,
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => i18n("密码:123456"),
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
									style: window._var_admin_normal.stylesLoginFormIcon
								});
							}
						}
					}),
					rememberMe: defItem({
						value: rememberMe,
						itemType: "xItemCheck",
						options: [i18n("记住我")],
						onEmitValue({ val }) {
							_.$lStorage.rememberMe = val;
						}
					}),
					code: defItem({
						isHide() {
							return !vm.captchaEnabled;
						},
						value: "",
						size: "large",
						/* render的时候重新获取 */
						placeholder: () => i18n("验证码"),
						onEnter(e) {
							vm.login();
						},
						rules: [_rules.required()],
						$vSlots: {
							prefix() {
								return h("xIcon", {
									icon: "_icon_varify_token",
									style: window._var_admin_normal.stylesLoginFormIcon
								});
							}
						},
						itemSlots: {
							afterController() {
								return h(
									"div",
									{
										class: "login-code flex middle pointer",
										onClick() {
											vm.getCode();
										}
									},
									[
										h("img", {
											class: "login-code-img ml",
											attrs: {
												src: vm.codeUrl
											}
										})
									]
								);
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
		mounted() {
			_.$setDocTitle(i18n("登录"));
			this.getCode();
		},
		methods: {
			async getCode() {
				const res = await _api.adminNormal.captchaImage();
				this.captchaEnabled = !!res.captchaEnabled;
				if (this.captchaEnabled) {
					this.codeUrl = "data:image/gif;base64," + res.img;
					this.uuid = res.uuid;
				}
			},
			async login() {
				const vm = this;
				_.$loading(true);
				try {
					const formData = _.$pickFormValues(vm.configsForm);

					if (!formData.rememberMe) {
						_.$lStorage.username = "";
						_.$lStorage.password = "";
					}
					const [error] = await _.$validateForm(vm.$el);
					if (error) {
						console.error("未通过验证");
					} else {
						const username = formData.username.trim();
						const password = formData.password;
						const code = formData.code;
						const uuid = this.uuid;
						const res = await _api.adminNormal.login({
							username,
							password,
							code,
							uuid
						});
						this.token = res.token;
						if (res.token) {
							_.$lStorage.x_token = res.token;
							_.$msg("登录成功! ");
							this.$router.push({
								path: "/",
								query: {
									...this.$route.query
								}
							});
						}
					}
				} catch (e) {
					console.error(e);
					_.$msgError(e?.msg);
					vm.getCode();
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
<style lang="less">
.login-code-img {
	height: 32px;
}
</style>
