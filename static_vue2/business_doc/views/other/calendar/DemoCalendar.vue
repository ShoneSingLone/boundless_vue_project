<template>
	<DocContentOfDemo class="DemoCollapse-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/calendar/JiChuYongFa.vue" unfold />
		<DemoAndCode title="自定义内容" path="@/views/other/calendar/ZiDingYiNeiRong.vue" unfold />
		<DemoAndCode title="自定义范围" path="@/views/other/calendar/ZiDingYiFanWei.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "## Collapse 折叠面板\n\n通过折叠面板收纳内容区域",
				apiString: `### Attributes
| 参数             | 说明          | 类型      | 可选值        | 默认值  |
|-----------------|-------------- |---------- |------------ |-------- |
| value / v-model | 绑定值         | Date/string/number | —  | —      |
| range           | 时间范围，包括开始时间与结束时间。开始时间必须是周一，结束时间必须是周日，且时间跨度不能超过两个月。 | Array     | —           | —      |
| first-day-of-week | 周起始日	    | Number    | 1 到 7      |  1     |

### dateCell scoped slot 参数
| 参数             | 说明          | 类型      | 可选值        | 默认值  |
|-----------------|-------------- |---------- |------------ |-------- |
| date            | 单元格代表的日期 | Date      | —           | —      |
| data            | { type, isSelected, day}，\`type\` 表示该日期的所属月份，可选值有 prev-month，current-month，next-month；\`isSelected\` 标明该日期是否被选中；\`day\` 是格式化的日期，格式为 yyyy-MM-dd    | Object      | —           | —      |
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
