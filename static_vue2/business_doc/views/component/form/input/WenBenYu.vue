<template>
	<div>
		<xMd :md="md" />
		<xInput type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </xInput>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				textarea: "",
				md: "用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。\n文本域高度可通过 `rows` 属性控制"
			};
		}
	});
}
</script>
<style lang="less"></style>
