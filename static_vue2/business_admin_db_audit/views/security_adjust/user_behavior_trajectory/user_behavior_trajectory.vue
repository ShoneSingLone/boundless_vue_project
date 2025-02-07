<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xCard class="card-as-condition-panel mb">
				<div class="flex">
					<xItem :configs="formSearch.strategyName" />
					<xItem :configs="formSearch.ip" />
					<xItem :configs="formSearch.port" />
					<xItem :configs="formSearch.risk" />
					<xItem
						style="--xItem-wrapper-width: 400px; --xItem-label-width: 60px"
						:configs="formSearch.time" />
					<xGap f />
					<xBtnArray :configs="oprBtnArray" />
				</div>
			</xCard>
			<div class="x-page-content-middle mt8">
				<xChart :dataset="dataset" :configs="configs" />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		async mounted() {
			await this.handleGetXdsStrategyAuthStrategy();
			await this.handleGetXdsOptionsRisk();
			await this.getTableData();
		},
		data(vm) {
			return {
				time: "",
				formSearch: defItems({
					strategyName: {
						label: "策略",
						value: "",
						itemType: "xItemSelect",
						options: []
					},
					risk: { label: "风险级别", value: "", itemType: "xItemSelect", options: [] },
					ip: { label: "IP", value: "" },
					port: { label: "端口", value: "" },
					time: { label: "时间", itemType: "xItemDaterange", value: [] }
				}),
				oprBtnArray: [
					{
						label: "查询",
						icon: "_icon_query",
						preset: "primary",
						onClick() {
							vm.getTableData();
						}
					},
					{
						label: "重置",
						icon: "_icon_reset",
						onClick() {
							vm.formSearch.strategyName.value = "";
							vm.formSearch.risk.value = "";
							vm.formSearch.time.value = [];
						}
					}
				],

				dataset: {},
				configs: {
					initOptions(props) {
						return {
							title: {
								text: "行为轨迹图"
							},
							tooltip: {
								trigger: "item",
								triggerOn: "mousemove"
							},
							series: [
								{
									type: "sankey",
									data: [],
									links: [],
									emphasis: {
										focus: "adjacency"
									},
									lineStyle: {
										color: "gradient",
										curveness: 0.5
									}
								}
							]
						};
					},
					updateOptions(echartsOptions, dataset = {}) {
						echartsOptions.series[0].data = dataset.nodes || [];
						echartsOptions.series[0].links = dataset.links || [];
						return echartsOptions;
					}
				}
			};
		},
		computed: {
			selected() {
				const selectedIds = Array.from(this.configsTable.data.set);
				if (_.$isArrayFill(selectedIds)) {
					const [selectedId] = selectedIds;
					const selected = _.find(this.configsTable.data.list, { id: selectedId });
					return selected;
				}
				return {};
			}
		},
		methods: {
			async handleGetXdsOptionsRisk() {
				this.formSearch.risk.options = await _api.admin_db_audit.xdsOptionsRisk();
				this.formSearch.risk.options.unshift({ label: "全部", value: "" });
			},
			async handleGetXdsStrategyAuthStrategy() {
				const { data = [] } = await _api.admin_db_audit.xdsStrategyAuthStrategy();
				this.formSearch.strategyName.options = data.map(item => ({
					...item,
					label: item.name,
					value: item.name
				}));
				this.formSearch.strategyName.options.unshift({ label: "全部", value: "" });
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const params = _.$pickFormValues(this.formSearch);
					const [startTime, endTime] = params.time;
					if (startTime && endTime) {
						params.endTime = _.$dateFormat(endTime);
						params.startTime = _.$dateFormat(startTime);
					}

					const { data } = await _api.admin_db_audit.xdsAuditLogUserBehavior(params);
					// const dataset = await _.$importVue(
					// 	"@/views/security_adjust/user_behavior_trajectory/demo.json.vue"
					// );
					this.dataset = data;
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
