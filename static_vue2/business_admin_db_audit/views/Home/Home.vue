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
					<xCard style="height: 260px">
						<RecentSevenDays ref="RecentSevenDays" :dataList="warningData" />
					</xCard>
				</xCol>
				<xCol :span="12">
					<xCard style="height: 260px">
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
						<!--						<template #header>-->
						<!--							<span class="chart-card-header">告警统计</span>-->
						<!--						</template>-->
						<AlertStatistics ref="AlertStatistics" />
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
			return {
				time: _.$dateFormat(),
				IPData: {},
				databaseData: {},
				operationTypeData: {},
				tableNameData: {},
				warningData: {}
			};
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
