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
							<xForm col="5">
								<xItem
									:configs="item"
									v-for="item in formSearch"
									:key="item.label" />
								<div class="flex end width100" span="full">
									<xBtn preset="primary" @click="getTableData({ page: 1 })"
										>查询</xBtn
									>
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
		data(vm) {
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
					{ label: "生成报表", icon: "_edit", onClick() {} }
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
						resetValue() {
							this.value = "";
						}
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
						{ prop: "serverHostName", label: "服务端主机名" },
						{ prop: "serverUserName", label: "用户名" },
						{ prop: "serverPort", label: "端口号" },
						{ prop: "databaseIp", label: "数据库IP" },
						{ prop: "databaseMac", label: "数据库MAC" },
						{ prop: "databaseInstance", label: "数据库实例" }
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
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const obj = _.$pickFormValues(this.formSearch);
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
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.formSearch);
			}
		}
	});
}
</script>
