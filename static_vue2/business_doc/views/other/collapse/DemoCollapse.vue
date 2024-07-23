<template>
	<DocContentOfDemo class="DemoCollapse-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/collapse/JiChuYongFa.vue" unfold />
		<DemoAndCode
			title="手风琴效果"
			path="@/views/other/collapse/ShouFengQinXiaoGuo.vue"
			unfold />
		<DemoAndCode
			title="自定义面板标题"
			path="@/views/other/collapse/ZiDingYiMianBanBiaoTi.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "## Collapse 折叠面板\n\n通过折叠面板收纳内容区域",
				apiString: `### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为\`string\`，否则为\`array\`) | string / array | — | — |
| accordion | 是否手风琴模式 | boolean | — | false |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 \`activeNames\` 类型为\`string\`，否则为\`array\`) | (activeNames: array / string) |

### Collapse Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name      | 唯一标志符      | string/number | —     | —    |
| title     | 面板标题        | string        | —     | —    |
| disabled  | 是否禁用        | boolean       | —     | —    |
`
			};
		}
	};
}
</script>

<style lang="less">
.DemoCollapse-demo {
}
</style>
