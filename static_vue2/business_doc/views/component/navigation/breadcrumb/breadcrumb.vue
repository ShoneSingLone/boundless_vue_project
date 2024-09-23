<template>
	<DocContentOfDemo class="dropdown-demo">
		<xMd :md="'## Breadcrumb 面包屑\n\n显示当前页面的路径，快速返回之前的任意页面。'" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/navigation/breadcrumb/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="图标分隔符"
			path="@/views/component/navigation/breadcrumb/TuBiaoFenGeFu.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | 斜杠'/' |
| separator-class | 图标分隔符 class | string | — | - |

### Breadcrumb Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to        | 路由跳转对象，同 \`vue-router\` 的 \`to\` | string/object | — | — |
| replace   | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean | — | false |`
			};
		}
	};
}
</script>

<style lang="less"></style>
