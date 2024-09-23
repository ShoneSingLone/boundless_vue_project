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
			return {
				configs: {
					initOptions(props) {
						return {
							title: { text: "操作命令TOP10" },
							tooltip: {
								trigger: "axis",
								axisPointer: {
									// Use axis to trigger tooltip
									type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
								}
							},
							legend: {},
							grid: {
								left: "3%",
								right: "4%",
								bottom: "3%",
								containLabel: true
							},
							xAxis: {
								type: "value"
							},
							yAxis: {
								type: "category",
								data: []
							},
							series: [
								{
									barWidth: 50,
									// name: "Direct",
									type: "bar",
									stack: "total",
									label: {
										show: true
									},
									emphasis: {
										focus: "series"
									},
									data: []
								}
							]
						};
					},
					updateOptions(echartsOptions, dataset = []) {
						echartsOptions.series[0].data = dataset;
						echartsOptions.legend.data = _.map(
							echartsOptions.series[0].data,
							row => row.name
						);
						echartsOptions.yAxis.data = dataset.map(item => item.name);
						return echartsOptions;
					}
				}
			};
		},
		computed: {
			dataset() {
				return Object.keys(this.dataList).map(key => {
					return {
						name: key,
						value: this.dataList[key]
					};
				});
			}
		}
	});
}
</script>
