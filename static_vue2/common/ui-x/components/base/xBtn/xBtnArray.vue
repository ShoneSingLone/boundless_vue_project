<template>
	<div class="xBtnGroupWrapper flex middle">
		<xBtn v-for="(btn, index) in configs" :configs="btn" :key="index" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		props: ["configs", "row"]
	};
}
</script>
<style lang="less">
.xBtnGroupWrapper {
	display: flex;
}
</style>
