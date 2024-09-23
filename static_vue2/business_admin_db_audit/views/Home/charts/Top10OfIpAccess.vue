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
							title: { text: "IP访问TOP10" },
							tooltip: {
								trigger: "axis",
								axisPointer: {
									// Use axis to trigger tooltip
									type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
								}
							},
							// legend: {},
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
									// name: "Direct",
									type: "bar",
									stack: "total",
									barWidth: 50,
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
						echartsOptions.series[0].data = dataset.map(item => item.value);
						echartsOptions.yAxis.data = dataset.map(item => item.label);
						return echartsOptions;
					}
				}
			};
		},
		computed: {
			dataset() {
				return Object.keys(this.dataList).map(key => {
					return {
						label: key,
						value: this.dataList[key]
					};
				});
			}
		}
	});
}
</script>
