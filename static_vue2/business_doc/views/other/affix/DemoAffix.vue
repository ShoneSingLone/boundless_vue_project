<template>
	<DocContentOfDemo class="DemoAffix">
		<xMd :md="md" />
		<div style="height: 800px; width: 100%" />
		<DemoAndCode title="基础用法" path="@/views/other/affix/JiChuYongFa.vue" unfold />
		<div style="height: 800px; width: 100%" />
		<DemoAndCode title="指定容器" path="@/views/other/affix/ZhiDingRongQi.vue" unfold />
		<div style="height: 800px; width: 100%" />
		<DemoAndCode title="固定位置" path="@/views/other/affix/GuDingWeiZhi.vue" unfold />
		<div style="height: 800px; width: 100%" />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "# Affix 固钉\r\r将页面元素固定在特定可视区域。",
				apiString: `## Affix API

### Affix Attributes

| Name       | Description                      | Type                       | Default | Required |
| ---------- | -------------------------------- | -------------------------- | ------- | -------- |
| \`offset\`   | offset distance.                 | ^[number]                  | \`0\`     | No       |
| \`position\` | position of affix.               | ^[enum]\`'top' \| 'bottom'\` | \`'top'\` | No       |
| \`target\`   | target container. (CSS selector) | ^[string]                  | —       | No       |
| \`z-index\`  | \`z-index\` of affix               | ^[number]                  | \`1\`   | No       |

### Affix Events

| Name     | Description                        | Type                                                                |
| -------- | ---------------------------------- | ------------------------------------------------------------------- |
| \`change\` | triggers when fixed state changed. | ^[Function]\`(fixed: boolean) => void\`                               |
| \`scroll\` | triggers when scrolling.           | ^[Function]\`(value: { scrollTop: number, fixed: boolean }) => void\` |

### Affix Exposes

| Method       | Description                 | Type                    |
| ------------ | --------------------------- | ----------------------- |
| \`update\`     | update affix state manually | ^[Function]\`() => void\` |
| \`updateRoot\` | update rootRect info        | ^[Function]\`() => void\` |

### Affix Slots

| Name      | Description                |
| --------- | -------------------------- |
| \`default\` | customize default content. |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
