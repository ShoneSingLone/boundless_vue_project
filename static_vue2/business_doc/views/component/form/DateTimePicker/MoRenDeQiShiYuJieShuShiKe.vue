<template>
	<div>
		<xMd :md="md" />
		<xForm class="container">
			<div class="block">
				<span class="demonstration">起始日期时刻为 12:00:00</span>
				<xDatePicker
					v-model="value1"
					type="datetimerange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:default-time="['12:00:00']">
				</xDatePicker>
			</div>
			<div class="block">
				<span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>
				<xDatePicker
					v-model="value2"
					type="datetimerange"
					align="right"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:default-time="['12:00:00', '08:00:00']">
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
				md: "使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。`default-time`接受一个数组，数组每项值为字符串，形如`12:00:00`，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。",
				value1: "",
				value2: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
