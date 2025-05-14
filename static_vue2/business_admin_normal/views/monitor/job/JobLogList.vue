<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xDrawer :title="cptDrawerTitle" :visible.sync="drawer" size="80%">
			<JobLogList v-if="drawer" :job="currentJobRow" />
		</xDrawer>
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<template #right>
					<xAdvancedSearch
						mountTo="#AdvancedSearchJobLogList"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm col="3">
								<xItem :configs="formSearch.jobName" />
								<xItem :configs="formSearch.jobGroup" />
								<xItem :configs="formSearch.status" />
								<xItem :configs="formSearch.dateRange" />
								<div class="flex end width100" span="3">
									<xBtn @click="resetSearchForm">重置</xBtn>
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
								</div>
							</xForm>
						</xBlock>
						<template #collapse>
							<xInput
								v-model="formSearch.jobName.value"
								placeholder="请输入任务名称" />
							<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
						</template>
					</xAdvancedSearch>
				</template>
			</xTablebar>
			<div id="AdvancedSearchJobLogList"></div>
			<div class="x-page-content-middle mt8 flex horizon">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	let dicts = {
		sys_normal_disable: null,
		sys_job_status: null,
		sys_job_group: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		props: ["job"],
		setup() {},
		components: {
			JobLogList: () => _.$importVue("@/views/monitor/job/JobLogList.vue")
		},
		async mounted() {
			if (this.job) {
				_.$setFormValues(this.formSearch, this.job);
			}
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				drawer: false,
				currentJobRow: "",
				isAdvancedSearchCollapse: true,
				deptId: "",
				/*  */
				oprBtnArray: [
					{
						label: i18n("delete_action"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["monitor:job:remove"]),
						async onClick() {
							vm.doDelete();
						}
					},
					{
						label: i18n("清空"),
						isHide: () => !vm.$auth.hasPermiOr(["monitor:job:export"]),
						async onClick() {}
					},
					{
						label: i18n("导出"),
						isHide: () => !vm.$auth.hasPermiOr(["monitor:job:export"]),
						async onClick() {}
					}
				],
				formSearch: defItems({
					jobName: _adminTools.search_form_configs_text({
						label: "任务名称",
						placeholder: i18n("请输入任务名称")
					}),

					jobGroup: _adminTools.search_form_configs_select({
						placeholder: i18n("任务组名"),
						options: dicts.sys_job_group
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("执行状态"),
						options: dicts.sys_job_status
					}),
					dateRange: _adminTools.search_form_date_range({
						label: "执行时间",
						placeholder: i18n("请输入任务编码")
					})
				}),
				configsTable: defTable({
					isHideQuery: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "jobId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("日志编号"), prop: "jobLogId" },
						{ label: i18n("task_name_info"), prop: "jobName" },
						{ label: i18n("任务组名"), prop: "jobGroup" },
						{ label: i18n("调用目标字符串"), prop: "invokeTarget" },
						{ label: i18n("日志信息"), prop: "jobMessage" },
						{
							label: i18n("执行状态"),
							prop: "status",
							cellRenderer: ({ cellData }) => hVal2Tag(cellData, dicts.sys_job_status)
						},
						{ label: i18n("执行时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("日志详细"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:remove"]),
											onClick: async () => {
												vm.showDetail(rowData);
											}
										}
									]
								});
							}
						})
					]
				})
			};
		},
		computed: {
			cptDrawerTitle() {
				return this.currentJobRow?.jobName || "全部日志";
			},
			cptSearchParams() {
				return _.$pickFormValues(this.formSearch);
			},
			cptSelectedjobIdString() {
				return Array.from(this.configsTable.data.set).join(",");
			}
		},
		methods: {
			/* 立即执行一次 */
			async runJob(row) {
				try {
					await _.$confirm_important(`确认要立即执行一次${row.jobName}任务吗？`);
					await _adminTools.api_job_change_status(row);
					_.$msg(`执行成功`);
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			},
			/** 任务详细信息 */
			showDetail(row) {
				_.$openModal({
					title: "任务详情",
					url: "@/views/monitor/job/JobLog.detail.dialog.vue",
					parent: this,
					row
				});
			},

			async doDelete(rowData) {
				const jobIds = rowData?.jobId || this.cptSelectedjobIdString;
				try {
					await _.$confirm_important('是否确认删除任务编号为"' + jobIds + '"的数据项？');
					await _adminTools.api_job_delete(jobIds);
					_.$msg(i18n("delete_success_info"));
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
			},
			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.formSearch);
			},
			handleDeptChange(deptId) {
				this.deptId = deptId;
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					let queryData = {
						pageSize: size,
						pageNum: page
					};
					const { jobName, jobGroup, status, dateRange } = this.cptSearchParams;

					jobName && (queryData.jobName = jobName);
					_.$isInput(jobGroup) && (queryData.jobGroup = jobGroup);
					_.$isInput(status) && (queryData.status = status);
					if (_.$isArrayFill(dateRange)) {
						queryData = {
							...queryData,
							...{
								"params[beginTime]": dateRange[0],
								"params[endTime]": dateRange[1]
							}
						};
					}

					const { total, rows } = await _adminTools.api_job_log_list(queryData);

					_.$setTableData(this.configsTable, {
						list: _.map(rows, row => row),
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			deptId() {
				this.getTableData();
			}
		}
	});
}
</script>
