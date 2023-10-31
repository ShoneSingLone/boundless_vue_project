<template>
	<xBtn class="xItem-wrapper" preset="blue" @click="() => $emit('click')">
		{{ i18n("inquire") }}
	</xBtn>
</template>

<script>
export default async function () {
	/* 列表上面的查询按钮 */
	return {};
}
</script>

<style lang="less"></style>
