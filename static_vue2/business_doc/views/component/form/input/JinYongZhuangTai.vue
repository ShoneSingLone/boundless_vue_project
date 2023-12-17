<template>
	<div>
		<xMd :md="input" />
		<xInput placeholder="请输入内容" v-model="input" :disabled="true"> </xInput>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				input: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
