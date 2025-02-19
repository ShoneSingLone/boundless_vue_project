<template>
	<DocContentOfDemo class="dropdown-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/timeline/JiChuYongFa.vue" unfold />
		<DemoAndCode
			title="⾃定义节点样式"
			path="@/views/other/timeline/ZiDingYiJieDianYangShi.vue"
			unfold />
		<DemoAndCode
			title="⾃定义时间戳"
			path="@/views/other/timeline/ZiDingYiShiJianChuo.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "## Timeline 时间线",
				apiString: `### Timeline Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| reverse | 指定节点排序方向，默认为正序 | boolean | — | false |

### Timeline-item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| timestamp     | 时间戳 | string  | - | — |
| hide-timestamp  | 是否隐藏时间戳 | boolean | — | false |
| placement | 时间戳位置 | string | top / bottom | bottom |
| type | 节点类型 | string | primary / success / warning / danger / info | - |
| color | 节点颜色 | string | hsl / hsv / hex / rgb | - |
| size | 节点尺寸 | string | normal / large | normal |
| icon | 节点图标 | string | — | - |

### Timeline-Item Slot
| name | 说明 |
|------|--------|
| — | Timeline-Item 的内容 |
| dot | 自定义节点 |
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
