<style lang="less"></style>
<template>
	<xChart :dataset="dataset" :configs="configs" />
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			dataList: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			function createRiskSeries(name) {
				return {
					name: name,
					type: "bar",
					emphasis: {
						focus: "series"
					},
					data: []
				};
			}
			return {
				configs: {
					initOptions(props) {
						return {
							tooltip: {
								trigger: "axis",
								axisPointer: {
									type: "shadow"
								}
							},
							legend: {},
							grid: {
								left: "3%",
								right: "4%",
								bottom: "3%",
								containLabel: true
							},
							xAxis: [
								{
									type: "category",
									data: []
								}
							],
							yAxis: [
								{
									type: "value"
								}
							],
							series: []
						};
					},
					updateOptions(echartsOptions, dataset = []) {
						if (dataset.length > 0) {
							echartsOptions.xAxis.data = dataset.map(item => item.label);
							const midRisk = createRiskSeries("中风险");
							const lowRisk = createRiskSeries("低风险");
							const highRisk = createRiskSeries("高风险");
							dataset.forEach(item => {
								midRisk.data.push(item[`midRisk`]);
								highRisk.data.push(item[`highRisk`]);
								lowRisk.data.push(item[`lowRisk`]);
							});
							echartsOptions.series.push(midRisk, highRisk, lowRisk);
						}

						return echartsOptions;
					}
				}
			};
		},
		computed: {
			dataset() {
				return Object.keys(this.dataList).map(key => {
					const item = this.dataList[key];
					return {
						label: key,
						...item
					};
				});
			}
		}
	});
}
</script>
