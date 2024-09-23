<template>
	<DocContentOfDemo>
		<DemoAndCode
			title="基础用法"
			path="@/views/xComponent/DemoxItemCronExpression/JiChuYongFa.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### `
			};
		}
	};
}
</script>

<style lang="less"></style>
