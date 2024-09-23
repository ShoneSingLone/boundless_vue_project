<template>
	<div>
		<xMd :md="md" />
		<xCalendar v-model="value"> </xCalendar>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "显示日期\n\n设置 `value` 来指定当前显示的月份。如果 `value` 未指定，则显示当月。`value` 支持 `v-model` 双向绑定。",
				value: 0
			};
		},
		methods: {
			formatTooltip(val) {
				return val / 100;
			}
		}
	});
}
</script>
<style lang="less"></style>
