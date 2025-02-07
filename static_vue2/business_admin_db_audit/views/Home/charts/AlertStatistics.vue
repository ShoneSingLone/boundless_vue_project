<style lang="less"></style>
<template>
	<div>
		<div class="height100 flex" style="height: 260px">
			<div class="flex1 width50percent">
				<xChart :dataset="PieChartData" :configs="echarts_warring_config" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { echarts_warring_config } = await _.$importVue(
		"@/views/monitoring/echarts_memory_config.vue"
	);
	return defineComponent({
		mounted() {
			this.handleGetxdsWarningPieChart();
		},
		data(vm) {
			return {
				echarts_warring_config: echarts_warring_config,
				PieChartData: {}
			};
		},
		methods: {
			// 获取新版本告警比例图
			async handleGetxdsWarningPieChart() {
				const { data } = await _api.admin_db_audit.xdsWarningPieChart();
				this.PieChartData = data;
			}
		}
	});
}
</script>
