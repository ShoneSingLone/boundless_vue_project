<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<span>头上一片晴天，心中一个想念</span>
		<xDivider content-position="left">少年包青天</xDivider>
		<span>饿了别叫妈, 叫饿了么</span>
		<xDivider />
		<i class="el-icon-mobile-phone" />
		<span>为了无法计算的价值</span>
		<xDivider content-position="right">阿里云</xDivider>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { md: "可以在分割线上自定义文案内容。" };
		}
	});
}
</script>
