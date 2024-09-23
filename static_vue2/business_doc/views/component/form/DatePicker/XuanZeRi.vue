<template>
	<div>
		<xMd :md="md" />
		<div class="demo-input-size">
			<div class="block">
				<span class="demonstration">默认</span>
				<xDatePicker v-model="value1" type="date" placeholder="选择日期"> </xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">带快捷选项</span>
				<xDatePicker
					v-model="value2"
					align="right"
					type="date"
					placeholder="选择日期"
					:picker-options="pickerOptions">
				</xDatePicker>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "以「日」为基本单位，基础的日期选择控件\n\n基本单位由`type`属性指定。快捷选项需配置`picker-options`对象中的`shortcuts`，禁用日期通过 `disabledDate` 设置，传入函数",
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
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
				value2: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
