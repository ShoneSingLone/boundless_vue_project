<template>
	<div class="AppLayoutHeader">
		<xIcon img="@/assets/svg/icon_report.svg" style="width: 48px; height: 48px" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {};
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
}
</style>
