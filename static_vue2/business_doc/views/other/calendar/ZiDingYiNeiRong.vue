<template>
	<div class="ZiDingYiNeiRong">
		<xMd :md="md" />
		<xCalendar>
			<template #dateCell="{ date, data }">
				<p :class="data.isSelected ? 'is-selected' : ''">
					{{ data.day.split("-").slice(1).join("-") }} {{ data.isSelected ? "✔️" : "" }}
				</p>
			</template>
		</xCalendar>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过设置名为 `dateCell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。在 `scoped-slot` 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。详情解释参考下方的 API 文档。"
			};
		}
	});
}
</script>
<style lang="less">
.ZiDingYiNeiRong {
	.is-selected {
		color: #1989fa;
	}
}
</style>
