<template>
	<div>
		<xMd :md="md" />
		<xForm class="container">
			<div class="block">
				<span class="demonstration">默认</span>
				阿斯顿发生的发生大发是
				<xDatePicker v-model="value1" type="time-select" placeholder="选择日期时间">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">带快捷选项</span>
				<xDatePicker
					v-model="value2"
					type="datetime"
					placeholder="选择日期时间"
					align="right"
					:picker-options="pickerOptions">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">设置默认时间</span>
				<xDatePicker
					v-model="value3"
					type="datetime"
					placeholder="选择日期时间"
					default-time="12:00:00">
				</xDatePicker>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。",

				pickerOptions: {
					shortcuts: [
						{
							text: "今天",
							onClick(picker) {
								picker.$emit("pick", new Date());
							}
						},
						{
							text: "昨天",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24);
								picker.$emit("pick", date);
							}
						},
						{
							text: "一周前",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
								picker.$emit("pick", date);
							}
						}
					]
				},
				value1: "",
				value2: "",
				value3: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
