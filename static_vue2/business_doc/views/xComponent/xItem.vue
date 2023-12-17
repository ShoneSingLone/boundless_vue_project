<template>
	<div>
		<DemoAndCode title="基础用法" path="@/views/xComponent/xItem/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				apiString: "--xItem-label-width 修改"
			};
		}
	};
}
</script>

<style lang="less"></style>
