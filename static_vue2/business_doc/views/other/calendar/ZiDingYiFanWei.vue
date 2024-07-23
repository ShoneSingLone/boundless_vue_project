<template>
	<div>
		<xMd :md="md" />
		<xCalendar :range="['2019-03-04', '2019-03-24']"> </xCalendar>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置 `range` 属性指定日历的显示范围。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。"
			};
		}
	});
}
</script>
<style lang="less"></style>
