<template>
	<div>
		<xMd :md="md" />
		<xForm class="demo-input-size">
			<div class="block">
				<span class="demonstration">默认</span>
				<xDatePicker
					v-model="value1"
					type="monthrange"
					range-separator="至"
					start-placeholder="开始月份"
					end-placeholder="结束月份">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">带快捷选项</span>
				<xDatePicker
					v-model="value2"
					type="monthrange"
					align="right"
					unlink-panels
					range-separator="至"
					start-placeholder="开始月份"
					end-placeholder="结束月份"
					:picker-options="pickerOptions">
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
				md: "可在一个选择器中便捷地选择一个月份范围\n\n在选择月份范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。",

				pickerOptions: {
					shortcuts: [
						{
							text: "本月",
							onClick(picker) {
								picker.$emit("pick", [new Date(), new Date()]);
							}
						},
						{
							text: "今年至今",
							onClick(picker) {
								const end = new Date();
								const start = new Date(new Date().getFullYear(), 0);
								picker.$emit("pick", [start, end]);
							}
						},
						{
							text: "最近六个月",
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setMonth(start.getMonth() - 6);
								picker.$emit("pick", [start, end]);
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
