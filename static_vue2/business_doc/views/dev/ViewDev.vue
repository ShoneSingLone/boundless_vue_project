<template>
	<div class="page-view view-icon">
		<xPageContent>
			<MarkdownIt :md="description" />
			<DemoAndCode title="基本用法" path="@/views/use/ViewIcon/base.vue" />
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				description: `## 说明
- 目前，热替换只针对 \`NEED_HMR\` 属性为真值的 \`.vue\` 后缀的文件

- 原理是通过 \`$importVue\` 重新加载源文件

- \`DemoAndCode\` 组件 有 \`rerun\` 功能 未通过 \`$importVue\` 加载组件，所以引用的组件无效 `
			};
		}
	};
}
</script>

<style lang="less"></style>
