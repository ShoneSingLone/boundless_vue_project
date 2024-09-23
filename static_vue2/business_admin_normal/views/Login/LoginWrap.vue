<template>
	<div class="login-register-form">
		<h2 class="login-title">{{ APP.APP_NAME }}</h2>
		<xTabs v-model="loginWrapActiveKey">
			<xTabPane label="登录" name="login">
				<LoginForm />
			</xTabPane>
			<xTabPane label="注册" name="register">
				<RegForm />
			</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
export default async function ({ tab }) {
	return defineComponent({
		inject: ["APP"],
		components: {
			LoginForm: () => _.$importVue("@/views/Login/LoginForm.vue"),
			RegForm: () => _.$importVue("@/views/Login/RegForm.vue")
		},
		props: {
			form: {
				type: Object
			}
		},
		computed: {
			loginWrapActiveKey: {
				get() {
					return tab || this.$route.query.tab || "login";
				},
				set(tab) {
					this.$router.push({
						path: this.$route.path,
						query: {
							tab: tab
						}
					});
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
