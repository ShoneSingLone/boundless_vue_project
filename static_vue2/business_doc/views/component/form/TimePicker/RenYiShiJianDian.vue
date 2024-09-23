<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<xTimePicker
				v-model="value1"
				:picker-options="{
					selectableRange: '18:30:00 - 20:30:00'
				}"
				placeholder="任意时间点">
			</xTimePicker>
			<xTimePicker
				arrow-control
				v-model="value2"
				:picker-options="{
					selectableRange: '18:30:00 - 20:30:00'
				}"
				placeholder="任意时间点">
			</xTimePicker>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可以选择任意时间\n\n使用 xTimePicker 标签，通过`selectableRange`限制可选时间范围。提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。",

				value1: new Date(2016, 9, 10, 18, 40),
				value2: new Date(2016, 9, 10, 18, 40)
			};
		}
	});
}
</script>
<style lang="less"></style>
