<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<xTimeSelect
				placeholder="起始时间"
				v-model="startTime"
				:picker-options="{
					start: '08:30',
					step: '00:15',
					end: '18:30'
				}">
			</xTimeSelect>
			<xTimeSelect
				placeholder="结束时间"
				v-model="endTime"
				:picker-options="{
					start: '08:30',
					step: '00:15',
					end: '18:30',
					minTime: startTime
				}">
			</xTimeSelect>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "若先选择开始时间，则结束时间内备选项的状态会随之改变",

				startTime: "",
				endTime: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
