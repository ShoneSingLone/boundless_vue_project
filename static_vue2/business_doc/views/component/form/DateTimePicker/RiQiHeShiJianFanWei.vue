<template>
	<div>
		<xMd :md="md" />
		<xForm class="container">
			<div class="block">
				<span class="demonstration">默认</span>
				<xDatePicker
					v-model="value1"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">带快捷选项</span>
				<xDatePicker
					v-model="value2"
					type="datetimerange"
					:picker-options="pickerOptions"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right">
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
				md: "设置`type`为`datetimerange`即可选择日期和时间范围",

				pickerOptions: {
					shortcuts: [
						{
							text: "最近一周",
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
								picker.$emit("pick", [start, end]);
							}
						},
						{
							text: "最近一个月",
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
								picker.$emit("pick", [start, end]);
							}
						},
						{
							text: "最近三个月",
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
								picker.$emit("pick", [start, end]);
							}
						}
					]
				},
				value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
				value2: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
