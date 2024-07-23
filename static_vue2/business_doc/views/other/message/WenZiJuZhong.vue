<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn :plain="true" @click="openCenter">文字居中</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `使用 \`center\` 属性让文字水平居中。`
			};
		},
		methods: {
			openCenter() {
				_.$msg({
					message: "居中的文字",
					center: true
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
