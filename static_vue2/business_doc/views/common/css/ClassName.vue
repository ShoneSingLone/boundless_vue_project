<template>
	<div>
		<xCard header="css主题设定">
			<xMd :md="md" />
		</xCard>
		<xCard header="x-loading" class="x-loading mt">
			<xMd>
				<pre>
```css
.x-loading{}
```
            </pre
				>
			</xMd>
		</xCard>
		<xCard header="x-disabled" class="x-disabled mt">
			<xMd>
				<pre>
```css
.x-disabled{}
```
            </pre
				>
			</xMd></xCard
		>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `
通过在html节点\`data-theme="tiny"\`指定默认主题
\`\`\`html
<html lang="zh-CN" data-theme="tiny">
\`\`\`

\`\`\`js
// 默认
PRIVATE_GLOBAL_app_theme = $("html").attr("data-theme")
\`\`\`

| 主题 | 说明 |
| --- | --- |
| tiny | 极简 |
| light | 明亮 |

## Event

| 事件名 | 说明 |
| --- | --- |
| x_ui_theme_change | 主题切换事件 |

\`\`\`js
$(window).on("x_ui_theme_change", function(e, theme) {
  console.log(theme)
});
\`\`\`
`
			};
		}
	});
}
</script>
<style lang="less"></style>
