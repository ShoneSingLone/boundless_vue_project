<style lang="less"></style>
<template>
	<div class="x-page-view page-is-chart" id="home">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0; padding-bottom: 0">
			<xRow class="width100">
				<xCol>
					<xCard>
						<RefreshTitle title="资源概览" :time="time" :refresh="onRefresh" />
					</xCard>
				</xCol>
			</xRow>
			<xRow :gutter="16" class="mt">
				<xCol :span="12">
					<xCard style="height: 300px">
						<div style="display: grid; grid-template-columns: 1fr 1fr">
							<div>
								<RecentSevenDays ref="RecentSevenDays" :dataList="warningData" />
							</div>
							<div>
								<AlertStatistics ref="AlertStatistics" />
							</div>
						</div>
					</xCard>
				</xCol>
				<xCol :span="12">
					<xCard style="height: 300px">
						<div class="flex height100">
							<div class="width50percent">
								<Top10OfTheHotLibraries
									ref="Top10OfTheHotLibraries"
									:dataList="databaseData" />
							</div>
							<div class="width50percent">
								<Top10OfTheHotTables
									ref="Top10OfTheHotTables"
									:dataList="tableNameData" />
							</div>
						</div>
					</xCard>
				</xCol>
			</xRow>
			<xRow :gutter="16" class="mt">
				<xCol :span="12">
					<xCard style="height: 600px">
						<div class="flex height100">
							<div class="width50percent">
								<Top10OfIpAccess ref="Top10OfIpAccess" :dataList="IPData" />
							</div>
							<div class="width50percent">
								<Top10OfOperationCommands
									ref="Top10OfOperationCommands"
									:dataList="operationTypeData" />
							</div>
						</div>
					</xCard>
				</xCol>
				<xCol :span="12">
					<xCard style="height: 600px">
						<template #header>
							<span class="chart-card-header">实时报警信息</span>
						</template>
						<div class="mt8" style="height: 500px">
							<xTableVir
								class="no-shadow xDataGrid-in-card"
								:columns="configsTable.columns"
								:data="configsTable.data.list" />
						</div>
					</xCard>
				</xCol>
			</xRow>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			RecentSevenDays: () => _.$importVue("@/views/Home/charts/RecentSevenDays.vue"),
			Top10OfTheHotTables: () => _.$importVue("@/views/Home/charts/Top10OfTheHotTables.vue"),
			Top10OfOperationCommands: () =>
				_.$importVue("@/views/Home/charts/Top10OfOperationCommands.vue"),
			Top10OfIpAccess: () => _.$importVue("@/views/Home/charts/Top10OfIpAccess.vue"),
			AlertStatistics: () => _.$importVue("@/views/Home/charts/AlertStatistics.vue"),
			Top10OfTheHotLibraries: () =>
				_.$importVue("@/views/Home/charts/Top10OfTheHotLibraries.vue")
		},
		async created() {},
		async mounted() {
			try {
				await this.handleGetXdsAuditLogFrontpage();
				await this.handleGetXdsWarningWarningDistributed();
				this.getTableData();
			} catch (err) {
				console.log("err", err);
			}
		},
		data() {
			const vm = this;
			return {
				time: _.$dateFormat(),
				IPData: {},
				databaseData: {},
				operationTypeData: {},
				tableNameData: {},
				warningData: {},
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					data: {
						list: []
					},
					columns: [
						{ prop: "风险等级", label: "风险等级" },
						{ prop: "匹配策略", label: "匹配策略" },
						{ prop: "报警时间", label: "报警时间" }
					]
				})
			};
		},
		watch: {
			"APP.list": {
				immediate: true,
				deep: true,
				handler(newValue, oldValue) {
					this.configsTable.data.list = newValue;
				}
			}
		},
		methods: {
			async handleGetXdsAuditLogFrontpage() {
				const { data = {} } = await _api.admin_db_audit.xdsAuditLogFrontpage({});
				this.IPData = data?.IP ?? {};
				this.databaseData = data?.database ?? {};
				this.operationTypeData = data?.operationType ?? {};
				this.tableNameData = data?.tableName ?? {};
			},
			// 折线图
			async handleGetXdsWarningWarningDistributed() {
				const { data = {} } = await _api.admin_db_audit.xdsWarningWarningDistributed();
				this.warningData = data;
			},

			onRefresh() {},
			getTableData() {
				try {
					this.$refs.RecentSevenDays.refreshData();
					this.$refs.Top10OfTheHotLibraries.refreshData();
					this.$refs.Top10OfTheHotTables.refreshData();
					this.$refs.Top10OfIpAccess.refreshData();
					this.$refs.Top10OfOperationCommands.refreshData();
					this.$refs.AlertStatistics.refreshData();
				} catch (error) {}
			}
		}
	});
}
</script>
