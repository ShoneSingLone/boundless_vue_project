<template>
	<DocContentOfDemo class="dropdown-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/dialog/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "基于`Vue-popper`开发",
				apiString: `### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|onCancel |取消按钮点击事件,返回为\`真值\`则不会关闭modal|-------------------|-------------|--------|
`
			};
		}
	};
}
</script>

<style lang="less">
.popover-demo {
}
</style>
