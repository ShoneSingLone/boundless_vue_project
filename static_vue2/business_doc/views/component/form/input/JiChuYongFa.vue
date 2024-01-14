<template>
	<div>
		<xMd :md="input" />
		<xInput v-model="input" placeholder="请输入内容"></xInput>
	</div>
</template>
<script lang="ts">
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
