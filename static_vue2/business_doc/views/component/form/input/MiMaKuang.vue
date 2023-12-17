<template>
	<div>
		<xMd :md="md" />
		<xInput placeholder="请输入密码" v-model="input" show-password></xInput>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				input: "",
				md: "使用`show-password`属性即可得到一个可切换显示隐藏的密码框"
			};
		}
	});
}
</script>
<style lang="less"></style>
