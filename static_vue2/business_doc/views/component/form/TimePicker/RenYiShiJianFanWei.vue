<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<xTimePicker
				is-range
				v-model="value1"
				range-separator="至"
				start-placeholder="开始时间"
				end-placeholder="结束时间"
				placeholder="选择时间范围">
			</xTimePicker>
			<xTimePicker
				is-range
				arrow-control
				v-model="value2"
				range-separator="至"
				start-placeholder="开始时间"
				end-placeholder="结束时间"
				placeholder="选择时间范围">
			</xTimePicker>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可选择任意的时间范围\n\n添加`is-range`属性即可选择时间范围，同样支持`arrow-control`属性。",
				value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
				value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
			};
		}
	});
}
</script>
<style lang="less"></style>
