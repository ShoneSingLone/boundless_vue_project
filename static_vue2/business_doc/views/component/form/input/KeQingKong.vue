<template>
	<div>
		<xMd :md="md" />
		<xInput placeholder="请输入内容" v-model="input" clearable> </xInput>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				input: "",
				md: "使用`clearable`属性即可得到一个可清空的输入框"
			};
		}
	});
}
</script>
<style lang="less"></style>
