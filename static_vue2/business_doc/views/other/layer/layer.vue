<template>
	<DocContentOfDemo class="layer-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/layer/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "基于`Layer`[在线地址](https://www.layuiweb.com/doc/modules/layer.html#closeBtn)开发",
				apiString: ``
			};
		}
	};
}
</script>

<style lang="less"></style>
