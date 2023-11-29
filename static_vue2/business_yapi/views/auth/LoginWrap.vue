<template>
	<div class="login-register-form">
		<h2 class="login-title">YAPI</h2>
		<ElTabs v-model="stateApp.user.loginWrapActiveKey">
			<ElTabPane label="登录" name="1">
				<LoginForm />
			</ElTabPane>
			<ElTabPane label="注册" name="2">
				<RegForm v-if="stateApp.user.canRegister" />
				<div style="min-height: 200px" v-else>管理员已禁止注册，请联系管理员</div>
			</ElTabPane>
		</ElTabs>
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
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
