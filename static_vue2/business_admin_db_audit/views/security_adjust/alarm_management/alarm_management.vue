<style lang="less">
.title {
	font-weight: 500;
	font-size: 16px;
	color: #333333;
}
.setting {
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
	.settingItem {
		width: 500px;
		height: 260px;
		background: #f4f7fa;
		border-radius: 10px;
		padding-left: 45px;
		font-weight: 500;
		font-size: 16px;
		color: #333333;

		.level {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			margin-top: 30px;
			.icon {
				vertical-align: center;
				margin-left: 30px;
				margin-right: 20px;
				display: inline-block;
				width: 35px;
				height: 35px;
				border-radius: 4px;
				background: #f62626;
			}
		}
		.open {
			box-sizing: border-box;
			margin-top: 30px;
			display: flex;
			span {
				width: 80px;
				margin-right: 30px;
			}
		}
		.methods {
			box-sizing: border-box;
			margin-top: 30px;
			display: flex;
			span {
				flex: 0 0 80px;
			}
		}
	}
}
</style>
<template>
	<div class="x-page-view" style="overflow-y: auto">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xTablebar :configs="configsTable">
				<template #right>
					<xBtnArray :configs="oprBtnArrayRight" style="margin-left: 30px" />
				</template>
			</xTablebar>
			<div class="mt" style="height: 600px">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
			<div></div>
			<xCollapse v-model="activeNames" class="mt10">
				<xCollapseItem title="报警设置" name="1">
					<xCard class="flex1">
						<template #header>
							<div class="flex">
								<span> 报警设置 </span>
							</div>
						</template>
						<div style="height: 250px">
							<xTableVir
								:columns="configsConfigTable.columns"
								:data="configsConfigTable.data.list" />
						</div>
					</xCard>
				</xCollapseItem>
				<xCollapseItem title="SFTP设置" name="2">
					<xCard class="flex1">
						<template #header>
							<div class="flex">
								<span> SFTP设置 </span>
							</div>
						</template>
						<xForm col="1" ref="SFTPform">
							<xItem v-for="(value, key) of SFTPForm" :configs="value" :key="key" />
						</xForm>
						<div style="text-align: center" class="mt">
							<xBtn :configs="btnTestSFTP" />
							<xBtn :configs="btnSaveSFTP" />
						</div>
					</xCard>
				</xCollapseItem>
				<xCollapseItem title="报警邮箱设置" name="3">
					<xCard class="flex1">
						<template #header>
							<div
								class="flex"
								style="justify-content: space-between; align-items: center">
								<span> 报警邮箱设置 </span>
								<xBtn :configs="btnAddEmail" />
							</div>
						</template>
						<div style="min-height: 250px; height: 250px">
							<xTableVir
								:columns="configsEmailTable.columns"
								:data="configsEmailTable.data.list" />
						</div>
						<xPagination :configs="configsEmailTable" />
					</xCard>
				</xCollapseItem>
			</xCollapse>
			<!--			<div class="flex mb">-->
			<!--				<xCard class="flex1 mr" style="flex: 0.6">-->
			<!--					<template #header>-->
			<!--						<div class="flex">-->
			<!--							<span> 报警设置 </span>-->
			<!--						</div>-->
			<!--					</template>-->
			<!--					<div style="height: 250px">-->
			<!--						<xTableVir-->
			<!--							:columns="configsConfigTable.columns"-->
			<!--							:data="configsConfigTable.data.list" />-->
			<!--					</div>-->
			<!--				</xCard>-->
			<!--				<xCard class="flex1 mr" style="flex: 0.4">-->
			<!--					<template #header>-->
			<!--						<div class="flex">-->
			<!--							<span> SFTP设置 </span>-->
			<!--						</div>-->
			<!--					</template>-->
			<!--					<xForm col="1" ref="SFTPform">-->
			<!--						<xItem v-for="(value, key) of SFTPForm" :configs="value" :key="key" />-->
			<!--					</xForm>-->
			<!--					<div style="text-align: center" class="mt">-->
			<!--						<xBtn :configs="btnTestSFTP" />-->
			<!--						<xBtn :configs="btnSaveSFTP" />-->
			<!--					</div>-->
			<!--				</xCard>-->
			<!--			</div>-->
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		inject: ["APP"],
		async mounted() {
			await this.handleGetXdsOptionsWarningStatus();
			await this.handleGetXdsWarningWarningConfigPage();
			await this.getTableData();
			await this.handleGetxdsWarningSftpFind();
			await this.handlexdsWarningEmailFind();
		},
		data(vm) {
			const that = this;
			return {
				activeNames: "",
				warringStatus: [],
				formSearch: defItems({
					部门id: { label: "部门id", value: "" },
					部门名: { label: "部门名", value: "" },
					openStatus: {
						label: "",
						value: false,
						itemType: "xItemSwitch"
					},
					methods: {
						label: "",
						value: "",
						itemType: "xItemCheckboxGroup",
						options: _opts.admin_db_audit.warringMethods
					}
				}),
				SFTPForm: defItems({
					ip: { label: "主机", value: "", rules: [_rules.required(), _rules.ipV4()] },
					port: {
						label: "端口",
						value: "",
						rules: [_rules.required(), _rules.port165535()]
					},
					userName: {
						label: "用户名",
						value: "",
						rules: [_rules.required(), _rules.maxLength()]
					},
					password: {
						label: "密码",
						value: "",
						rules: [_rules.required(), _rules.maxLength()]
					},
					fileDirectory: {
						label: "报警路径",
						value: "",
						rules: [_rules.required(), _rules.maxLength()]
					}
				}),
				oprBtnArrayRight: [
					{
						label: "刷新",
						icon: "_refresh",
						onClick() {
							vm.getTableData({ page: 1 });
						}
					}
				],
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
						defTable.colSingle({
							by: "id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						// { prop: "strategyName", label: "策略名称" },
						{ prop: "warningDetail", label: "告警详情" },
						{
							prop: "status",
							label: "告警状态",
							cellRenderer: ({ rowData }) => {
								const label =
									that.warringStatus.find(
										item => Number(item.value) === rowData?.status
									)?.label ?? rowData.status;
								return hDiv(label);
							}
						},
						{ prop: "createTime", label: "告警时间" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "查看",
											onClick() {
												vm.handleDetailWarring(rowData);
											}
										},
										{
											label: "确认",
											disabled: rowData.status === 1,
											onClick() {
												vm.handleXdsWarningEdit(rowData, 1);
											}
										},
										{
											label: "忽略",
											disabled: rowData.status === 1,
											onClick() {
												vm.handleXdsWarningEdit(rowData, 2);
											}
										}

										// {
										// 	label: "删除",
										//   disabled:true,
										// 	onClick() {
										// 		vm.handleDel(rowData);
										// 	}
										// },
									]
								});
							}
						})
					]
				}),
				configsConfigTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {},
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
							prop: "risk",
							label: "风险等级",
							// width: 100,
							cellRenderer: ({ rowData }) => {
								const label =
									_opts.admin_db_audit.warringLevel.find(
										item => item.value === rowData?.risk
									)?.label ?? rowData.risk;
								return hDiv(label);
							}
						},
						{
							prop: "methods",
							label: "报警方式",
							width: 600,
							cellRenderer: ({ rowData }) => {
								const config = {
									minWidth: "100",
									label: "",
									value: rowData.methods,
									isGroup: true,
									itemType: "xItemCheck",
									options: _opts.admin_db_audit.warringMethods,
									onEmitValue({ val }) {
										rowData.methods = val;
									}
								};
								return h("xForm", { col: 1 }, [h("xItem", { configs: config })]);
							}
						},
						{
							prop: "risks",
							label: "操作",
							cellRenderer: ({ rowData }) => {
								return hxBtn({
									configs: {
										label: "保存",
										preset: "text",
										icon: "_add",
										onClick() {
											vm.handleSaveWarring(rowData);
										}
									}
								});
							}
						}
					]
				}),
				configsEmailTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {
						vm.handlexdsWarningEmailFind();
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
							prop: "email",
							label: "邮箱"
						},
						{
							prop: "risks",
							label: "操作",
							cellRenderer: ({ rowData }) => {
								return hxBtn({
									configs: {
										label: "删除",
										preset: "text",
										onClick() {
											vm.handleDelEmail(rowData);
										}
									}
								});
							}
						}
					]
				}),
				btnSaveSFTP: {
					label: "保存配置",
					preset: "primary",
					icon: "save",
					onClick() {
						return vm.handleSaveSFTP();
					}
				},
				btnAddEmail: {
					label: "添加报警邮箱",
					preset: "primary",
					icon: "save",
					onClick() {
						return vm.handleApplyEmail();
					}
				},
				btnTestSFTP: {
					label: "连接测试",
					preset: "primary",
					icon: "save",
					onClick() {
						return vm.handleTestxdsWarningLinkTest();
					}
				},
				btnSaveWarring: {
					label: "保存",
					preset: "primary",
					icon: "save",
					onClick() {
						return vm.handleSaveWarring();
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
			async handleApplyEmail() {
				const vm = this;
				await _.$openModal({
					title: "添加告警邮箱",
					url: "@/views/security_adjust/alarm_management/alarm_management_dialog_apply_emali.vue",
					parent: vm,
					onOk() {
						console.log("1");
					}
				});
			},
			async handleDelEmail(row) {
				await _.$confirm({
					title: "提示",
					content: `是否确认删除所选邮箱？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsWarningEmailDelete({
					id: row.id
				});
				if (code === 0) {
					_.$msgSuccess(msg);
					this.handlexdsWarningEmailFind();
				} else {
					_.$msgError(msg);
				}
			},
			async handlexdsWarningEmailFind() {
				const {
					data: { list = [], total = 0 }
				} = await _api.admin_db_audit.xdsWarningEmailFind({
					pageSize: this.configsEmailTable.pagination.size,
					pageNum: this.configsEmailTable.pagination.page
				});
				_.$setTableData(this.configsEmailTable, {
					list,
					total
				});
			},
			async handleSaveWarring(rowData) {
				function handleSetKey(list = [], key = "") {
					return list.includes(key) ? 1 : 0;
				}
				await _.$confirm({
					title: "提示",
					content: `是否确认保存当前配置吗？`
				});
				const obj = _.clone(rowData);
				obj.isEmail = handleSetKey(rowData.methods, "isEmail");
				obj.isSftp = handleSetKey(rowData.methods, "isSftp");
				obj.isSyslog = handleSetKey(rowData.methods, "isSyslog");
				const { code, msg } = await _api.admin_db_audit.xdsWarningWarningConfig(obj);
				if (code === 0) {
					_.$msg(msg);
					this.handleGetXdsWarningWarningConfigPage();
				} else {
					_.$msgError(msg);
				}
			},
			async handleXdsWarningEdit(row, status) {
				let text = status === 1 ? "是否确认当前告警吗" : "是否忽略当前告警吗";
				await _.$confirm({
					title: "提示",
					content: text
				});
				const { code, msg } = await _api.admin_db_audit.xdsWarningEdit({
					...row,
					status
				});
				if (code === 0) {
					_.$msg(msg);
					this.getTableData({ page: 1 });
				} else {
					_.$msgError(msg);
				}
			},
			async handleDel(row) {
				await _.$confirm({
					title: "提示",
					content: `是否删除当前告警吗？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsWarningId({
					...row
				});
				if (code === 0) {
					_.$msg(msg);
					this.getTableData({ page: 1 });
				} else {
					_.$msgError(msg);
				}
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const queryData = { pageSize: size, pageNum: page };
					const {
						data: { list, total }
					} = await _api.admin_db_audit.xdsWarningPage(queryData);
					_.$setTableData(this.configsTable, {
						list,
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			async handleGetXdsWarningWarningConfigPage() {
				const { data } = await _api.admin_db_audit.xdsWarningWarningConfigPage();
				const list = data.map(item => {
					const methods = ["isEmail", "isSftp", "isSyslog"].filter(methodName =>
						methodName === "isEmail"
							? item.isEmail === 1
							: methodName === "isSftp"
								? item.isSftp === 1
								: methodName === "isSyslog"
									? item.isSyslog === 1
									: false
					);
					return {
						...item,
						methods
					};
				});
				_.$setTableData(this.configsConfigTable, {
					list
				});
			},
			async handleGetXdsOptionsWarningStatus() {
				this.warringStatus = await _api.admin_db_audit.xdsOptionsWarningStatus();
			},
			async handleDetailWarring(row) {
				const vm = this;
				await _.$openModal({
					title: "告警详情",
					url: "@/views/security_adjust/alarm_management/alarm_management_dialog.vue",
					row,
					parent: vm,
					warringStatus: vm.warringStatus,
					onOk() {
						console.log("1");
					}
				});
			},
			async handleGetxdsWarningSftpFind() {
				const { data: res } = await _api.admin_db_audit.xdsWarningSftpFind();
				this.SFTPForm.ip.value = res.ip;
				this.SFTPForm.port.value = res.port;
				this.SFTPForm.userName.value = res.userName;
				this.SFTPForm.password.value = res.password;
				this.SFTPForm.fileDirectory.value = res.fileDirectory;
			},
			async handleSaveSFTP() {
				await _.$confirm({
					title: "提示",
					content: `是否确认保存当前配置吗？`
				});
				const [error] = await _.$validateForm(this.$refs.SFTPform);
				if (error) {
					return;
				}
				let obj = _.$pickFormValues(this.SFTPForm);
				const { code, msg } = await _api.admin_db_audit.xdsWarningSftpSet(obj);
				if (code === 0) {
					_.$msg(msg);
					this.handleGetxdsWarningSftpFind();
				} else {
					_.$msgError(msg);
				}
			},
			async handleTestxdsWarningLinkTest() {
				await _.$confirm({
					title: "提示",
					content: `是否确认测试当前配置吗？`
				});
				const [error] = await _.$validateForm(this.$refs.SFTPform);
				if (error) {
					return;
				}
				let obj = _.$pickFormValues(this.SFTPForm);
				const { code, msg } = await _api.admin_db_audit.xdsWarningLinkTest(obj);
				if (code === 0) {
					_.$msg(msg);
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
