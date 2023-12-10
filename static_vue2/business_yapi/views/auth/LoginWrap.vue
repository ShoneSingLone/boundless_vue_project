<template>
	<div class="login-register-form">
		<h2 class="login-title">YAPI</h2>
		<xTabs v-model="loginWrapActiveKey">
			<xTabPane label="登录" name="1">
				<LoginForm />
			</xTabPane>
			<xTabPane label="注册" name="2">
				<RegForm v-if="stateApp.user.canRegister" />
				<div style="min-height: 200px" v-else>管理员已禁止注册，请联系管理员</div>
			</xTabPane>
		</xTabs>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		inject: ["stateApp"],
		components: {
			LoginForm: () => _.$importVue("@/views/auth/LoginForm.vue"),
			RegForm: () => _.$importVue("@/views/auth/RegForm.vue")
		},
		props: {
			form: {
				type: Object
			},
			canRegister: {
				type: Boolean
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
<style lang="less">
.item-wrapper {
	display: flex;
	button {
		flex: 1;
	}
}
</style>
