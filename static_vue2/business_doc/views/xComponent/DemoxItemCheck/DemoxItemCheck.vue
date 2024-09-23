<template>
	<DocContentOfDemo class="DemoAffix">
		<xMd :md="md" />
		<DemoAndCode
			title="基础用法"
			path="@/views/xComponent/DemoxItemCheck/DemoxItemCheck/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="xItemCheckUse:blockCheck"
			path="@/views/xComponent/DemoxItemCheck/DemoxItemCheck/XItemCheckUseBlockCheck.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "# xItemCheck \r\r多选组件，类似checkbox，但是可以扩展展示效果。",
				apiString: `## xItemCheck
`
			};
		}
	};
}
</script>

<style lang="less"></style>
