<template>
	<div>
		<xMd :md="md" />
		<xTimeSelect
			v-model="value"
			:picker-options="{
				start: '08:30',
				step: '00:15',
				end: '18:30'
			}"
			placeholder="选择时间">
		</xTimeSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "使用 el-time-select 标签，分别通过`start`、`end`和`step`指定可选的起始时间、结束时间和步长",
				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
