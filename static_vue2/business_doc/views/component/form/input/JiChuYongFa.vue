<template>
	<div>
		<Md :md="input" />
		<xInput v-model="input" placeholder="请输入内容"></xInput>
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
