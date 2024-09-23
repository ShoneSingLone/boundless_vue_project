<template>
	<div>
		<xPageHeader @back="goBack" content="详情页面" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		methods: {
			goBack() {
				console.log("go back");
			}
		}
	});
}
</script>
<style lang="less"></style>
