<template>
	<div>
		<xMd :md="md" />
		<xForm class="container">
			<div class="block">
				<span class="demonstration">周</span>
				<xDatePicker
					v-model="value1"
					type="week"
					format="yyyy 第 WW 周"
					placeholder="选择周">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">月</span>
				<xDatePicker v-model="value2" type="month" placeholder="选择月"> </xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">年</span>
				<xDatePicker v-model="value3" type="year" placeholder="选择年"> </xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">多个日期</span>
				<xDatePicker type="dates" v-model="value4" placeholder="选择一个或多个日期">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">多个月</span>
				<xDatePicker type="months" v-model="value5" placeholder="选择一个或多个月">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">多个年</span>
				<xDatePicker type="years" v-model="value6" placeholder="选择一个或多个年">
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
				value1: "",
				value2: "",
				value3: "",
				value4: "",
				value5: "",
				value6: "",
				md: "通过扩展基础的日期选择，可以选择周、月、年或多个日期"
			};
		}
	});
}
</script>
<style lang="less"></style>
