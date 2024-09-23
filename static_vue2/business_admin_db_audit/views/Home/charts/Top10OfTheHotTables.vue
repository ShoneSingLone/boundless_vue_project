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
							title: { text: "热表TOP10" },
							tooltip: {
								trigger: "item"
							},
							legend: {
								type: "scroll",
								orient: "vertical",
								right: 20,
								top: 20,
								bottom: 20,
								data: []
							},
							series: [
								{
									name: "Access From",
									type: "pie",
									radius: ["40%", "70%"],
									center: ["30%", "50%"],
									avoidLabelOverlap: false,
									label: {
										show: false,
										position: "center"
									},
									emphasis: {
										label: {
											show: true,
											fontSize: 40,
											fontWeight: "bold"
										}
									},
									labelLine: {
										show: false
									},
									data: []
								}
							]
						};
					},
					updateOptions(echartsOptions, dataset = {}) {
						echartsOptions.series[0].data = dataset;

						echartsOptions.legend.data = _.map(
							echartsOptions.series[0].data,
							row => row.name
						);

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
