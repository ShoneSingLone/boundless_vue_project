<template></template>

<script>
export default async function () {
	return {
		echarts_memory_config: {
			initOptions(props) {
				return {
					title: {
						text: "内存",
						top: "10%",
						left: "3%"
					},
					tooltip: {
						show: true,
						trigger: "item",
						position: function (point, params, dom, rect, size) {
							// 根据鼠标位置动态设置提示框位置
							return [point[0], point[1] - 10];
						},
						formatter: function (params) {
							return params.name + " : " + params.value + "%";
						}
					},
					legend: {
						orient: "vertical",
						right: "right",
						top: "5%"
					},
					series: [
						{
							// name: "Access From",
							type: "pie",
							radius: ["40%", "70%"],
							right: "30%",
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: "center"
							},
							emphasis: {
								// label: {
								//   show: true,
								//   fontSize: 40,
								//   fontWeight: 'bold'
								// },
								// itemStyle: {
								//   shadowBlur: 10,
								//   shadowOffsetX: 0,
								//   shadowColor: 'rgba(0, 0, 0, 0.5)'
								// }
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
				if (Object.keys(dataset).length === 0) {
					return echartsOptions;
				}
				echartsOptions.series[0].data = [
					{ name: "剩余内存", key: "freeMemorySize", value: 100 - dataset.useRate },
					{ name: "已用内存", key: "useMemorySize", value: dataset.useRate }
				];

				// echartsOptions.series[0].links = dataset.links || [];
				return echartsOptions;
			}
		},
		echarts_warring_config: {
			initOptions(props) {
				return {
					title: {
						text: "告警比例图"
					},
					tooltip: {
						trigger: "item"
					},
					legend: {
						top: "5%",
						left: "center"
					},
					series: [
						{
							type: "pie",
							radius: ["40%", "70%"],
							avoidLabelOverlap: false,
							itemStyle: {
								borderRadius: 10,
								borderColor: "#fff",
								borderWidth: 2
							},
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
				echartsOptions.series[0].data = [
					{ value: dataset[`highRiskRate`], name: "高风险" },
					{ value: dataset[`lowRiskRate`], name: "低风险" },
					{ value: dataset[`midRiskRate`], name: "中风险" }
				];
				return echartsOptions;
			}
		},
		echarts_cpu_config: {
			initOptions(props) {
				return {
					title: {
						text: "CPU利用率",
						top: "10%",
						left: "3%"
					},
					tooltip: {
						show: true,
						trigger: "item",
						position: function (point, params, dom, rect, size) {
							// 根据鼠标位置动态设置提示框位置
							return [point[0], point[1] - 10];
						},
						formatter: function (params) {
							return params.name + " : " + params.value + "%";
						}
					},
					legend: {
						orient: "vertical",
						right: "right",
						top: "5%"
					},
					series: [
						{
							// name: "Access From",
							type: "pie",
							radius: ["40%", "70%"],
							right: "30%",
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: "center"
							},
							emphasis: {
								// label: {
								//   show: true,
								//   fontSize: 40,
								//   fontWeight: 'bold'
								// },
								// itemStyle: {
								//   shadowBlur: 10,
								//   shadowOffsetX: 0,
								//   shadowColor: 'rgba(0, 0, 0, 0.5)'
								// }
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
				if (Object.keys(dataset).length === 0) {
					return echartsOptions;
				}
				echartsOptions.series[0].data = [
					{ name: "剩余CPU", key: "freeMemorySize", value: 100 - dataset.useRate },
					{ name: "已用CPU", key: "useMemorySize", value: dataset.useRate }
				];

				// echartsOptions.series[0].links = dataset.links || [];
				return echartsOptions;
			}
		},
		echarts_disk_use_config: {
			initOptions(props) {
				return {
					title: {
						text: "磁盘使用率",
						top: "5%",
						left: "3%"
					},
					grid: {
						bottom: "50"
					},
					xAxis: {
						type: "category",
						data: []
					},
					yAxis: {
						type: "value"
					},
					series: [
						{
							data: [],
							type: "line",
							smooth: true
						}
					]
				};
			},
			updateOptions(echartsOptions, dataset = []) {
				echartsOptions.series[0].data = dataset.map(item => item.diskUsage).reverse();
				echartsOptions.xAxis.data = dataset
					.map((item, index) => `第${index + 1}分钟前`)
					.reverse();
				// echartsOptions.series[0].links = dataset.links || [];
				return echartsOptions;
			}
		},
		echarts_network_config: {
			initOptions(props) {
				return {
					title: {
						text: "网络吞吐率",
						top: "5%",
						left: "3%"
					},
					tooltip: {
						trigger: "axis"
					},
					legend: {
						data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
						top: "3%"
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: "value"
					},
					series: []
				};
			},
			updateOptions(echartsOptions, dataset = []) {
				echartsOptions.xAxis.data = dataset
					.map((item, index) => `第${index + 1}分钟`)
					.reverse();
				let BytesReceivedList = dataset.map(item => item.BytesReceived).reverse();
				let BytesSentList = dataset.map(item => item.BytesSent).reverse();
				const BytesReceivedListObj = {
					name: "BytesReceived",
					type: "line",
					data: BytesReceivedList
				};
				const BytesSentListObj = {
					name: "BytesSentList",
					type: "line",
					data: BytesSentList
				};
				echartsOptions.series = [BytesReceivedListObj, BytesSentListObj];
				return echartsOptions;
			}
		},
		echarts_disk_config: {
			initOptions(props) {
				return {
					title: {
						text: "磁盘",
						top: "5%",
						left: "3%"
					},
					legend: {
						top: "5%",
						right: "5%"
					},
					tooltip: {},
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
				let DiskReadRateList = dataset.map(item => item.DiskReadRate);
				let DiskWriteRateList = dataset.map(item => item.DiskWriteRate);
				const DiskReadRateListObj = {
					name: "DiskReadRate",
					type: "bar",
					data: DiskReadRateList
				};
				const DiskWriteRateListObj = {
					name: "DiskReadRate",
					type: "bar",
					data: DiskWriteRateList
				};
				echartsOptions.series = [DiskReadRateListObj, DiskWriteRateListObj];
				echartsOptions.xAxis[0].data = dataset.map((item, index) => `第${index + 1}分钟`);
				return echartsOptions;
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
