<template>
	<DocContentOfDemo class="layer-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/move/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "基于`xLayer`",
				apiString: ``
			};
		}
	};
}
</script>

<style lang="less"></style>
