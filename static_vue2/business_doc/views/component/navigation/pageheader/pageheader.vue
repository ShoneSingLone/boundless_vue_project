<template>
	<DocContentOfDemo class="pageheader-demo">
		<xMd
			:md="'## PageHeader 页头 \n\n如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。'" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/navigation/pageheader/JiChuYongFa.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |------------------------------ | ------ |
| title     | 标题           | string    |  —                            | 返回   |
| content   | 内容           | string    |  —                            | —      |


### Events
| 事件名称   | 说明           | 回调参数   |
|---------- |-------------- |---------- |
| back      | 点击左侧区域触发 | —        |

### Slots
| 事件名称    | 说明         |
|---------- |------------- |
| title     | 标题内容      |
| content   | 内容         |
`
			};
		}
	};
}
</script>

<style lang="less">
.pageheader-demo {
}
</style>
