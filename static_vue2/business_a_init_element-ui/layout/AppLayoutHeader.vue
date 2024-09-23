<template>
	<div class="AppLayoutHeader">
		<!-- <xIcon img="@/assets/svg/icon_report.svg" style="width: 48px; height: 48px" /> -->
		<xGap f />
		<!-- <xInput v-model="APP.searchKey" style="width: 200px" placeholder="Search"></xInput> -->
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {};
		},
		computed: {},
		mounted() {}
	});
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	padding-right: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
}
</style>
