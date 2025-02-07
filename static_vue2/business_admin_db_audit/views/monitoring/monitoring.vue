<template>
	<div class="x-page-view page-is-chart" id="monitoring">
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
				<xCol :span="6">
					<xCard style="height: 300px">
						<template #header>
							<span class="chart-card-header">内存利用率</span>
						</template>
						<div class="flex height100">
							<xChart
								:configs="echarts_memory_config"
								:dataset="memory"
								class="echartItem" />
						</div>
					</xCard>
				</xCol>
				<xCol :span="6">
					<xCard style="height: 300px">
						<template #header>
							<span class="chart-card-header">CPU利用率</span>
						</template>
						<div class="flex height100">
							<xChart :dataset="cpuData" :configs="echarts_cpu_config" />
						</div>
					</xCard>
				</xCol>
				<xCol :span="12">
					<xCard style="height: 300px">
						<template #header>
							<span class="chart-card-header">磁盘使用率</span>
						</template>
						<xChart :dataset="diskUse" :configs="echarts_disk_use_config" />
					</xCard>
				</xCol>
			</xRow>
			<xRow :gutter="16" class="mt">
				<xCol :span="12" class="flex vertical" style="height: 600px">
					<xCard class="flex1">
						<template #header>
							<span class="chart-card-header">网络吞吐率</span>
						</template>
						<xChart :dataset="MonitorNetwork" :configs="echarts_network_config" />
					</xCard>
					<xGap t />
					<xCard class="flex1">
						<template #header>
							<span class="chart-card-header">磁盘</span>
						</template>
						<xChart :dataset="diskIO" :configs="echarts_disk_config" />
					</xCard>
				</xCol>
				<xCol :span="12" class="height100 flex vertical" style="max-height: 600px">
					<xCard class="flex1">
						<template #header>
							<span class="chart-card-header">进程</span>
						</template>
						<xTableVir
							:columns="configsTable.columns"
							:data="configsTable.data.list"
							class="no-shadow xDataGrid-in-card" />
					</xCard>
				</xCol>
			</xRow>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	const {
		echarts_memory_config,
		echarts_disk_use_config,
		echarts_network_config,
		echarts_disk_config,
		echarts_cpu_config
	} = await _.$importVue("@/views/monitoring/echarts_memory_config.vue");
	return {
		name: "monitoring",
		data() {
			return {
				memory: {},
				diskData: {},
				cpuData: {},
				diskUse: [],
				diskIO: [],
				time: "",
				MonitorNetwork: [],
				echarts_memory_config: echarts_memory_config,
				echarts_cpu_config: echarts_cpu_config,
				echarts_disk_use_config: echarts_disk_use_config,
				echarts_network_config: echarts_network_config,
				echarts_disk_config: echarts_disk_config,
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						{ prop: "pid", label: "PID" },
						{ prop: "userName", label: "用户名" },
						{ prop: "processName", label: "进程名" },
						{ prop: "res", label: "资源" },
						{ prop: "CPUUsage", label: "CPU使用率(%)" },
						{ prop: "memoryUsage", label: "内存使用率(%)" },
						{ prop: "bitesRead", label: "磁盘读取速率" },
						{ prop: "bitesWrite", label: "磁盘写入速率" }
					]
				}),
				timer: null
			};
		},
		async mounted() {
			await this.handleInit();
			await this.handleClearTime();
			this.timer = setInterval(() => {
				this.handleInit();
			}, 60000);
		},
		beforeDestroy() {
			this.handleClearTime();
		},
		methods: {
			async handleClearTime() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			async handleInit() {
				try {
					_.$loading(true);
					await this.handleGetXdsSelfMonitorMemory();
					await this.handleGetXdsSelfMonitorDisk();
					await this.handleGetxdsSelfMonitorDiskIo();
					await this.handleGetXdsSelfMonitorCpu();
					await this.handleGetXdsSelfMonitorNetwork();
					await this.handlexdsSelfMonitorProcess();
					_.$loading(false);
				} catch (err) {
					console.log("err", err);
				}
			},
			async handleGetXdsSelfMonitorMemory() {
				const { data = {} } = await _api.admin_db_audit.xdsSelfMonitorMemory();
				this.memory = data;
			},
			// 磁盘使用率
			async handleGetXdsSelfMonitorDisk() {
				const { data = [] } = await _api.admin_db_audit.xdsSelfMonitorDiskUsage();
				this.diskUse = data;
			},
			async handleGetXdsSelfMonitorCpu() {
				const { data = {} } = await _api.admin_db_audit.xdsSelfMonitorCpu();
				this.cpuData = data;
			},
			async handleGetXdsSelfMonitorNetwork() {
				const { data } = await _api.admin_db_audit.xdsSelfMonitorNetwork();
				this.MonitorNetwork = data;
			},
			// 磁盘
			async handleGetxdsSelfMonitorDiskIo() {
				const { data } = await _api.admin_db_audit.xdsSelfMonitorDiskIo();
				this.diskIO = data;
			},
			async handlexdsSelfMonitorProcess() {
				const { data } = await _api.admin_db_audit.xdsSelfMonitorProcess();
				this.configsTable.data.list = data;
			},
			onRefresh() {
				this.handleInit();
			}
		}
	};
}
</script>

<style scoped lang="less"></style>
