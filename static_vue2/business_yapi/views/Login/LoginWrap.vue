<template>
	<div class="login-register-form">
		<h2 class="login-title">YAPI</h2>
		<xTabs v-model="loginWrapActiveKey">
			<xTabPane label="登录" name="1">
				<LoginForm />
			</xTabPane>
			<xTabPane label="注册" name="2">
				<RegForm />
			</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
export default async function () {
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
					return this.$route.query.tab || "1";
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
