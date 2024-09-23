<template>
	<DocContentOfDemo class="icon-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/component/data/chart/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		provide() {
			return {
				DemoDescriptions: this
			};
		},
		data() {
			return {
				md: ``,
				apiString: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
