<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #left>
					<xAdvancedSearch
						mountTo="#AdvancedSearch"
						:collapse="isAdvancedSearchCollapse"
						@change="handleAdvancedSearchCollapse">
						<xBlock class="mt">
							<xForm col="4" ref="formSearch">
								<template v-for="item in formSearch">
									<xItem
										:configs="item"
										v-if="item.label !== '时间'"
										:key="item.label" />
									<xItem
										:configs="formSearch.time"
										v-else
										style="
											--xItem-wrapper-width: 400px;
											--xItem-label-width: 60px;
										" />
								</template>

								<div class="flex end width100" span="full">
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询
									</xBtn>
									<xBtn @click="resetSearchForm">重置</xBtn>
								</div>
							</xForm>
						</xBlock>
						<template #collapse>
							<xInput
								v-model="formSearch.operationType.value"
								placeholder="请输入参数名称"
								style="width: 200px" />
							<xGap r="8" />
							<xBtn preset="primary" @click="getTableData({ page: 1 })">查询</xBtn>
							<xGap r />
						</template>
					</xAdvancedSearch>
				</template>
				<template #right>
					<xBtnArray :configs="oprBtnArrayRight" />
				</template>
			</xTablebar>
			<div id="AdvancedSearch"></div>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				isAdvancedSearchCollapse: true,
				oprBtnArrayRight: [
					{
						label: "全部导出",
						icon: "_add",
						onClick() {
							vm.handleGetXdsAuditLogExcel();
						}
					},
					{
						label: "生成报表",
						icon: "_edit",
						onClick() {
							vm.handlexdsAuditLogReport();
						}
					},
					{
						label: "上报",
						preset: "primary",
						onClick() {
							_.$openModal({
								title: i18n("日志上报"),
								parent: vm,
								url: "@/views/security_adjust/log_retrieval/log_retrieval_upload_dialog.vue",
								onClick() {
									vm.getTableData({ page: 1 });
								}
							});
						}
					}
				],
				formSearch: defItems({
					// accessTime: { label: "访问时间", value: "" },
					clientId: {
						label: "客户端IP",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					clientMac: {
						label: "客户端MAC",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					interfaceUrl: {
						label: "URL",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					serverId: {
						label: "服务端IP",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					serverMac: {
						label: "服务端MAC",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					serverHostName: {
						label: "服务端主机名",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					serverUserName: {
						label: "服务端用户名",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					serverPort: {
						label: "服务端端口号",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					databaseIp: {
						label: "数据库IP",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					databaseMac: {
						label: "数据库MAC",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					riskLevel: {
						label: "风险等级",
						value: "",
						resetValue() {
							this.value = "";
						},
						itemType: "xItemSelect",
						options: [],
						async once() {
							this.options = await _api.admin_db_audit.xdsOptionsRisk();
						}
					},
					matchStrategy: {
						label: "匹配策略",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					databaseInstance: {
						label: "数据库实例",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					operationType: {
						label: "操作内容",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					tableName: {
						label: "表",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					column: {
						label: "列",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					responseStatus: {
						label: "响应状态",
						value: "",
						resetValue() {
							this.value = "";
						}
					},
					queryReturnRows: {
						label: "响应行数",
						value: "",
						resetValue: ""
					},
					sqlContent: {
						label: "SQL内容",
						value: "",
						resetValue: ""
					},
					sqlResult: {
						label: "SQL结果内容",
						value: "",
						resetValue: ""
					},
					executionTime: {
						label: "执行时间(毫秒)",
						value: "",
						resetValue: ""
					},
					time: {
						label: "时间",
						itemType: "xItemDatetimerange",
						value: [],
						clearable: true,
						resetValue: null
					}
				}),
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "accessTime", label: "访问时间" },
						{ prop: "clientId", label: "客户端IP" },
						{ prop: "clientMac", label: "客户端MAC" },
						{ prop: "interfaceUrl", label: "URL" },
						{ prop: "serverId", label: "服务端IP" },
						{ prop: "serverMac", label: "服务端MAC" },
						{ prop: "matchNumber", label: "匹配策略数" },
						{ prop: "rule", label: "敏感字段规则" },
						{ prop: "category", label: "敏感字段类型" },
						{ prop: "level", label: "敏感字段级别" },
						{ prop: "serverHostName", label: "服务端主机名" },
						{ prop: "serverUserName", label: "服务端操作系统用户名" },
						{ prop: "serverPort", label: "服务端端口号" },
						{
							prop: "a",
							label: "操作",
							// width: 100,
							cellRenderer: ({ rowData }) => {
								return h(
									"xBtn",
									{
										configs: {
											preset: "text",
											async onClick() {
												await _.$openModal({
													title: "告警详情",
													url: "@/views/security_adjust/log_retrieval/log_retrieval_dialog.vue",
													row: rowData
												});
											}
										}
									},
									"查询详情"
								);
							}
						}
						// { prop: "databaseUserName", label: "数据库用户名" },
						// { prop: "databaseIp", label: "数据库IP" },
						// { prop: "databasePort", label: "数据库端口" },
						// { prop: "databaseMac", label: "数据库MAC" },
						// { prop: "databaseInstance", label: "数据库实例" },
						// { prop: "tableName", label: "表名" },
						// { prop: "column", label: "列名" },
						// { prop: "operationType", label: "操作类型" },
						// { prop: "sqlContent", label: "SQL内容" },
						// { prop: "sqlResult", label: "SQL结果内容" },
						// { prop: "executionTime", label: "执行时间" },
						// { prop: "responseStatus", label: "响应状态" },
						// { prop: "affectRows", label: "影响行数" },
						// { prop: "queryReturnRows", label: "查询返回行" },
						// { prop: "matchStrategy", label: "匹配策略" },
						// { prop: "riskLevel", label: "风险等级" },
						// { prop: "viewName", label: "视图名称" },
						// { prop: "triggerName", label: "触发器名称" },
						// { prop: "indexName", label: "索引名称" },
						// { prop: "sequenceName", label: "序列名称" },
						// { prop: "storedProcedureName", label: "存储过程名称" },
						// { prop: "fileName", label: "文件名称" }
					]
				})
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
			async handleGetXdsAuditLogExcel() {
				await _.$confirm({
					title: "提示",
					content: `是否确认导出查询结果？`
				});
				const res = await _api.admin_db_audit.xdsAuditLogExcel({});
				console.log(res);
			},
			async handlexdsAuditLogReport() {
				await _.$confirm({
					title: "提示",
					content: `是否确认生成报表？`
				});
				const res = await _api.admin_db_audit.xdsAuditLogReport({});
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const obj = _.$pickFormValues(this.formSearch);
					if (Array.isArray(obj.time) && obj.time.length > 0) {
						let seletTime = [
							dayjs(obj.time?.[0]).format("YYYY-MM-DD HH:mm:ss"),
							dayjs(obj.time?.[1]).format("YYYY-MM-DD HH:mm:ss")
						];
						obj.startTime = seletTime[0];
						obj.endTime = seletTime[1];
					}
					console.log("obj", obj);
					const queryData = {
						...obj,
						pageSize: size,
						pageNum: page
					};
					const { data } = await _api.admin_db_audit.xdsAuditLogPage(queryData);
					const { list, total } = data;
					console.log("🚀 ~ getTableData ~ list:", data);
					_.$setTableData(this.configsTable, { list, total });
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				/* 点击高级搜索会重置检索词条（需要修改为不会重置，否则检索结果难以展示）；20250218151830 */
				// if (collapse) { this.resetSearchForm(); }
			},
			resetSearchForm() {
				_.$resetFormValues(this.$refs.formSearch);
			}
		}
	});
}
</script>
