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
						mountTo="#AdvancedSearch"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm col="3">
								<xItem :configs="formSearch.jobName" />
								<xItem :configs="formSearch.jobCode" />
								<xItem :configs="formSearch.status" />
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
			<div id="AdvancedSearch"></div>
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
		sys_job_status: null
	};
	dicts = await _adminTools.newDicts(dicts);

	return defineComponent({
		inject: ["APP"],
		setup() {},
		components: {
			JobLogList: () => _.$importVue("@/views/monitor/job/JobLogList.vue")
		},
		async mounted() {
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
						label: i18n("日志"),
						isHide() {
							return !vm.$auth.hasPermiOr(["monitor:job:query"]);
						},
						async onClick() {
							vm.currentJobRow = "";
							vm.drawer = true;
						}
					},
					{
						label: i18n("新增"),
						isHide() {
							return !vm.$auth.hasPermiOr(["monitor:job:add"]);
						},
						async onClick() {
							_.$openModal({
								title: i18n("新增任务"),
								url: "@/views/monitor/job/job.upsert.dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					},
					{
						label: i18n("delete_action"),
						disabled: () => !vm.configsTable.data.set.size,
						isHide: () => !vm.$auth.hasPermiOr(["monitor:job:remove"]),
						async onClick() {
							vm.doDelete();
						}
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
					jobCode: _adminTools.search_form_configs_text({
						label: "任务编码",
						placeholder: i18n("请输入任务编码")
					}),
					status: _adminTools.search_form_configs_select({
						placeholder: i18n("任务状态"),
						options: dicts.sys_job_status
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
						{ label: i18n("任务编号"), prop: "jobId" },
						{ label: i18n("task_name_info"), prop: "jobName" },
						{ label: i18n("任务组名"), prop: "jobGroup" },
						{ label: i18n("调用目标字符串"), prop: "invokeTarget" },
						{ label: i18n("cron执行表达式"), prop: "cronExpression" },
						{
							label: i18n("status_info"),
							prop: "status",
							cellRenderer: ({ cellData }) =>
								hVal2Tag(cellData, dicts.sys_job_status),
							cellRenderer({ cellData, rowData }) {
								return h("xSwitch", {
									value: cellData,
									activeValue: "0",
									inactiveValue: "1",
									onChange(status) {
										return vm.handleStatusChange({ ...rowData, status });
									}
								});
							}
						},
						{ label: i18n("创建时间"), prop: "createTime" },
						defTable.colActions({
							width: 200,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:edit"]),
											onClick: async () => {
												_.$openModal({
													title: i18n("修改任务"),
													url: "@/views/monitor/job/job.upsert.dialog.vue",
													row: rowData,
													onClick() {
														vm.getTableData({ page: 1 });
													}
												});
											}
										},
										{
											label: i18n("delete_action"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:remove"]),
											onClick: async () => {
												vm.doDelete(rowData);
											}
										},
										{
											label: i18n("执行一次"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:remove"]),
											onClick: async () => {
												vm.runJob(rowData);
											}
										},
										{
											label: i18n("任务详细"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:remove"]),
											onClick: async () => {
												vm.showDetail(rowData);
											}
										},
										{
											label: i18n("调度日志"),
											isHide: () =>
												!vm.$auth.hasPermiOr(["monitor:job:remove"]),
											onClick: async () => {
												vm.currentJobRow = rowData;
												vm.drawer = true;
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
					url: "@/views/monitor/job/job.detail.dialog.vue",
					parent: this,
					row
				});
			},
			/** cron表达式按钮操作 */
			handleShowCron() {
				this.expression = this.form.cronExpression;
				this.openCron = true;
			},
			async handleStatusChange({ jobName, jobId, status }) {
				let text = status === "0" ? "启用" : "停用";
				try {
					await _.$confirm_important('确认要"' + text + '""' + jobName + '"任务吗？');
					await _adminTools.api_job_change_status({ jobId, status });
					_.$msg(`${text}成功`);
					this.getTableData();
				} catch (error) {
					if (error) {
						_.$msgError(error?.msg || error);
					}
				}
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

					const queryData = {
						pageSize: size,
						pageNum: page
					};
					const { jobName, jobCode, status } = this.cptSearchParams;
					jobName && (queryData.jobName = jobName);
					jobCode && (queryData.jobCode = jobCode);
					_.$isInput(status) && (queryData.status = status);
					this.deptId && (queryData.deptId = this.deptId);

					const { total, rows } = await _adminTools.api_job_list(queryData);

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
