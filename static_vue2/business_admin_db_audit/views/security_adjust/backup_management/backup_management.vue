<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<div class="flex height100">
				<xCard class="flex1 mr">
					<template #header>
						<div class="flex">
							<span> 备份设置 </span>
							<xGap f />
							<span> </span>
						</div>
					</template>
					<div class="mt mb">
						<xBtn :configs="btnBack" :loading="btnBack.loading" />
					</div>
					<span> 自动备份设置 </span>
					<xForm col="2" ref="refAutoForm">
						<xItem :configs="autoForm.frequency" />
						<xItem :configs="autoForm.time" v-if="autoForm.frequency.value === 1" />
					</xForm>
					<div style="text-align: center" class="mt">
						<xBtn :configs="btnAuto" :loading="btnAuto.loading" />
					</div>
					<div class="mt mb">远程同步备份</div>
					<xForm col="1" ref="SFTPform">
						<xItem label="类型"> SFTP </xItem>
						<div class="mt">SSH配置</div>
						<xItem :configs="SFTPForm.ip" />
						<xItem :configs="SFTPForm.ip" />
						<xItem :configs="SFTPForm.port" />
						<xItem :configs="SFTPForm.userName" />
						<xItem :configs="SFTPForm.password" style="--xItem-wrapper-width: 600px" />
						<xItem
							:configs="SFTPForm.fileDirectory"
							style="--xItem-wrapper-width: 600px" />
					</xForm>
					<div style="text-align: center" class="mt">
						<xBtn :configs="btnTestSFTP" :loading="btnTestSFTP.loading" />
						<xBtn :configs="btnSaveSFTP" :loading="btnSaveSFTP.loading" />
					</div>
				</xCard>
				<xCard class="flex1" header="还原">
					<xForm col="1" ref="form">
						<xItem label="X_ITEM_LABEL_IS_EMPTY">
							<xBtn :configs="btnRecovery" />
							<span style="margin-left: 30px">还原到当前最新备份内容</span>
						</xItem>
						<div class="mt">上传备份文件</div>
						<!--						<xItem :configs="form.还原方式" />-->
						<xItem label="X_ITEM_LABEL_IS_EMPTY" v-if="cptIsShowUploder">
							<div
								class="uploader-box-wrapper flex middle pointer"
								@click="openUploader">
								<xIcon icon="_upload" />
								<span class="ml"> 添加文件 </span>
							</div>
							<span style="margin-left: 30px">使用备份文件覆盖当前备份</span>
						</xItem>
						<!--						<xItem label="X_ITEM_LABEL_IS_EMPTY">-->
						<!--							<xBtn :configs="btnRecovery" />-->
						<!--						</xItem>-->
					</xForm>
				</xCard>
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			const vm = this;
			return {
				cronList: [],
				isReadonly: true,
				form: defItems({
					type: {
						label: i18n("类型"),
						value: "SFTP",
						disabled: true
					},
					周期: {
						label: i18n("周期"),
						rules: [_rules.required(), _rules.lessThan(50)],
						value: [],
						isGroup: true,
						itemType: "xItemCheck",
						options: ["年", "月", "周", "日"].map(i => {
							return {
								label: `每${i}`,
								value: i
							};
						})
					},
					备份时间: {
						value: "",
						label: i18n("备份时间"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					备份主机IP: {
						value: "",
						label: i18n("备份主机IP"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					备份文件夹: {
						value: "",
						label: i18n("备份文件夹"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					还原方式: {
						label: i18n("还原方式"),
						rules: [_rules.required(), _rules.lessThan(50)],
						value: "通过文件还原",
						isGroup: true,
						itemType: "xItemRadioGroup",
						minWidth: 200,
						options: ["还原为最近一次备份", "通过文件还原"].map(i => {
							return {
								label: `${i}`,
								value: i
							};
						})
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
				autoForm: defItems({
					frequency: {
						value: "",
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()]
					},
					time: {
						value: "",
						placeholder: "请选择输入自定义cron表达式",
						rules: [_rules.required(), _rules.cronCheck()]
					}
				}),
				btnAuto: {
					label: "自动备份设置",
					preset: "primary",
					icon: "save",
					loading: false,
					onClick() {
						vm.handlexdsBackupCronEdit();
					}
				},
				btnBack: {
					label: "立即备份",
					preset: "primary",
					icon: "_recovery",
					loading: false,
					onClick() {
						vm.handlexdsBackupBackupNow();
					}
				},
				btnTestSFTP: {
					label: "连接测试",
					preset: "primary",
					icon: "_recovery",
					loading: false,
					onClick() {
						vm.handleTestPass();
					}
				},
				btnSaveSFTP: {
					label: "保存",
					preset: "primary",
					icon: "_recovery",
					loading: false,
					onClick() {
						vm.handlexdsBackupSftpSet();
					}
				}
			};
		},
		computed: {
			cptIsShowUploder() {
				return "通过文件还原" === this.cptFromData.还原方式;
			},
			btnRecovery() {
				const vm = this;
				return {
					label: "还原",
					preset: "primary",
					icon: "_recovery",
					onClick() {
						vm.handlexdsBackupRecover();
					}
				};
			},
			cptFromData() {
				return _.$pickFormValues(this.form);
			},
			btnAdd() {
				const vm = this;
				if (vm.isReadonly) {
					return {
						label: "编辑",
						icon: "_edit",
						onClick() {
							vm.isReadonly = true;
						}
					};
				} else {
					return {
						label: "保存",
						icon: "_save",
						onClick() {
							vm.isReadonly = false;
						}
					};
				}
			},
			cronItem() {
				return this.cronList.find(item => item.id === this.autoForm.frequency.value);
			}
		},
		async mounted() {
			await this.handleGetxdsBackupConfigFind();
			await this.handlexdsBackupSftpFind();
		},
		methods: {
			async handlexdsBackupCronEdit() {
				await _.$confirm({
					title: "提示",
					content: `是否确认保存配置？`
				});
				const [error] = await _.$validateForm(this.$refs.refAutoForm);
				if (error) {
					return;
				}
				let obj = {
					cronName: "",
					cronValue: "",
					id: 0,
					status: 1
				};
				if (this.autoForm.time.value) {
					obj = {
						...obj,
						id: this.cronItem.id,
						cronValue: this.autoForm.time.value
					};
				} else {
					obj = this.cronItem;
				}
				const { code, msg } = await _api.admin_db_audit.xdsBackupCronEdit(obj);
				if (code === 0) {
					_.$msg.success(msg);
					await this.handleGetxdsBackupConfigFind();
				} else {
					_.$msgError(msg);
				}
			},
			async handleGetxdsBackupConfigFind() {
				const { data = [] } = await _api.admin_db_audit.xdsBackupConfigFind();
				this.autoForm.frequency.value = data.find(i => i.status === 1)?.id ?? "";
				this.cronList = data;
				this.autoForm.frequency.options = data.map(i => {
					return {
						label: i.cronName,
						value: i.id
					};
				});
			},
			async handlexdsBackupBackupNow() {
				await _.$confirm({
					title: "提示",
					content: `是否确认立即备份？`
				});
				this.btnBack.loading = true;
				const { msg } = await _api.admin_db_audit.xdsBackupBackupNow();
				if (msg === "连接失败") {
					_.$msgError(msg);
				} else {
					_.$msgSuccess(msg);
				}
				this.btnBack.loading = false;
			},
			async handlexdsBackupSftpFind() {
				const { data: res } = await _api.admin_db_audit.xdsBackupSftpFind();
				this.SFTPForm.ip.value = res.ip;
				this.SFTPForm.port.value = res.port;
				this.SFTPForm.userName.value = res.userName;
				this.SFTPForm.password.value = res.password;
				this.SFTPForm.fileDirectory.value = res.fileDirectory;
			},
			async handleTestPass() {
				await _.$confirm({
					title: "提示",
					content: `是否确认连接测试？`
				});
				const [error] = await _.$validateForm(this.$refs.SFTPform);
				if (error) {
					return;
				}
				this.btnTestSFTP.loading = true;
				let obj = _.$pickFormValues(this.SFTPForm);
				const { msg } = await _api.admin_db_audit.xdsBackupLinkTest(obj);
				if (msg === "连接失败") {
					_.$msgError(msg);
				} else {
					_.$msgSuccess(msg);
				}
				this.btnTestSFTP.loading = false;
			},
			async handlexdsBackupSftpSet() {
				await _.$confirm({
					title: "提示",
					content: `是否确认保存当前配置？`
				});
				const [error] = await _.$validateForm(this.$refs.SFTPform);
				if (error) {
					return;
				}
				this.btnSaveSFTP.loading = true;
				let obj = _.$pickFormValues(this.SFTPForm);
				const { code, msg } = await _api.admin_db_audit.xdsBackupSftpSet(obj);
				if (code === 0) {
					_.$msg.success(msg);
					this.handlexdsBackupSftpFind();
				} else {
					_.$msgError(msg);
				}
				this.btnSaveSFTP.loading = false;
			},
			async handlexdsBackupRecover() {
				await _.$confirm({
					title: "提示",
					content: `是否确认还原？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsBackupRecover();
				if (code === 0) {
					_.$msg.success(msg);
				} else {
					_.$msgError(msg);
				}
			},
			async openUploader() {
				const [file] = await _.$openFileSelector();
				if (!file) {
					return;
				}

				//   xdsBackupFileUpLoad
			}
		}
	});
}
</script>
