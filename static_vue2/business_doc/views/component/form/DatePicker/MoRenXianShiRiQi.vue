<template>
	<div>
		<xMd :md="md" />
		<div class="block">
			<p>组件值：{{ value }}</p>
			<xDatePicker
				v-model="value"
				type="daterange"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:default-time="['00:00:00', '23:59:59']">
			</xDatePicker>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `在选择日期范围时，指定起始日期和结束日期的默认时刻。

:::demo 选择日期范围时，默认情况下，起始日期和结束日期的时间部分均为当天的 0 点 0 分 0 秒。通过\`default-time\`可以分别指定二者的具体时刻。\`default-time\`接受一个数组，其中的值为形如\`12:00:00\`的字符串，第一个值控制起始日期的时刻，第二个值控制结束日期的时刻。`,

				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
