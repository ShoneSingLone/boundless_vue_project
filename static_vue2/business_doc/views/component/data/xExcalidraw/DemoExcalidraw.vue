<template>
	<DocContentOfDemo>
		<DemoAndCode title="基础用法" path="@/views/component/data/xExcalidraw/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: ` `
			};
		}
	};
}
</script>

<style lang="less"></style>
