<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0; --xForm-xItem-wrapper-width: 420px">
			<xRow gutter="8">
				<xCol span="24">
					<xCard>
						<xForm>
							<xItem
								span="full"
								:configs="form.is_open_extract_flow"
								v-model="currentConfigs.is_open_extract_flow" />
						</xForm>
					</xCard>
				</xCol>
			</xRow>
			<xRow gutter="8" class="mt">
				<xCol span="24">
					<xCard style="height: 300px">
						<template #header="">
							<div class="flex middle" style="height: 28px">
								绑定DPDK配置
								<xGap f />
								<xBtn :configs="btnAddPorts" />
							</div>
						</template>
						<xForm col="1">
							<xItem
								:configs="form.is_config_dpdk"
								v-model="currentConfigs.is_config_dpdk" />
							<xItem :configs="form.bind_ports" v-model="currentConfigs.bind_ports" />
							<xItem :configs="form.huge_pages" v-model="currentConfigs.huge_pages" />
						</xForm>
					</xCard>
				</xCol>
			</xRow>
			<xRow gutter="8" class="mt">
				<xCol span="12">
					<xCard header="DPDK配置" style="height: 300px">
						<xForm col="1">
							<xItem
								:configs="form.is_open_dpdk"
								v-model="currentConfigs.is_open_dpdk" />
							<xItem :configs="form.dpdk_ports" v-model="currentConfigs.dpdk_ports" />
							<xItem :configs="form.rx_queues" v-model="currentConfigs.rx_queues" />
						</xForm>
					</xCard>
				</xCol>
				<xCol span="12">
					<xCard header="普通端口配置" style="height: 300px">
						<xForm col="1">
							<xItem
								:configs="form.is_open_live_traffic"
								v-model="currentConfigs.is_open_live_traffic" />
							<xItem
								:configs="form.live_operation"
								v-model="currentConfigs.live_operation" />
							<xItem :configs="form.live_port" v-model="currentConfigs.live_port" />
						</xForm>
					</xCard>
				</xCol>
			</xRow>
			<xRow gutter="8" class="mt">
				<xCol span="12">
					<xCard header="离线文件配置" style="height: 300px">
						<xForm col="1">
							<xItem
								:configs="form.is_open_pcap_file"
								v-model="currentConfigs.is_open_pcap_file" />
							<!--							<xItem-->
							<!--								:configs="form.file_operation"-->
							<!--								v-model="currentConfigs.file_operation" />-->
							<xItem :configs="form.pcap_file" v-model="currentConfigs.pcap_file" />
						</xForm>
					</xCard>
				</xCol>
			</xRow>
		</xPageContent>
		<xPageFooter>
			<div class="flex center middle mb">
				<xBtn :configs="btnSave" />
			</div>
		</xPageFooter>
	</div>
</template>
<script lang="ts">
export default async function () {
	/*
1. 该页面配置信息应该通过配置读取接口读取
2. 该页面初始状态中所有选择为“否”，所有值为空
3. 该页面所有的下拉选择项都可以通过端口列表查询接口查询
4. 页面配置逻辑
	1. 当`是否开启流提取`选项为`否`的时候，不能配置下面四个窗口，此时下面的可配置位置应不可点击，只展示
	2. 当`是否开启流提取选项`为`是`的时候，用户必须首先配置`可用DPDK`相关配置，并点击`更新端口`更新配置信息，这会更新后面配置窗口的`DPDK端口`和`指定普通端口名`的下拉列表。所以如果用户没有完成`可用DPDK`相关配置（完成配置标准：`是否配置DPDK`为`是`，`绑定端口`不为空，`配置DPDK最大页数`不为空），后续的两个配置页面应该不能点击只展示
*/
	return defineComponent({
		inject: ["APP"],
		async mounted() {
			this._init = true;
			await this.handlexdsTrafficGetFlowStatus();
			await this.updateConfigs();
			this._init = false;
		},
		data(vm) {
			const disabled = () => vm.cptDisabled;
			const disableBindDpdk = () => vm.disableBindDpdk;
			const disabled_dpdk = () => vm.cptDisabledConfigs;
			return {
				timeDisable: false,
				currentConfigs: {
					is_open_extract_flow: null,
					bind_ports: "",
					dpdk_ports: [],
					// file_operation: false,
					file_operation: true,
					huge_pages: 512,
					id: 1,
					is_config_dpdk: false,
					is_open_dpdk: false,
					is_open_live_traffic: false,
					is_open_pcap_file: true,
					live_operation: false,
					live_port: "",
					pcap_file: null,
					rx_queues: 4
				},
				form: defItems({
					is_open_extract_flow: {
						label: "是否开启流提取",
						itemType: "xItemSwitch",
						minWidth: 80,
						disabled: () => vm.timeDisable,
						options: _opts.admin_db_audit.yesOrNo,
						async once() {
							// await vm.handlexdsTrafficGetFlowStatus();
							// console.log('1',1)
						}
					},
					/*  */
					is_config_dpdk: {
						label: "是否配置DPDK",
						disabled,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					bind_ports: {
						label: "添加绑定端口",
						disabled: () => {
							if (disabled()) {
								return disabled();
							}
							if (disableBindDpdk()) return disableBindDpdk();
						},
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data } = await _api.admin_db_audit.xdsTrafficLivePortList();
							this.options = _.map(data, _item => {
								return {
									label: _item.deviceName || _item.id,
									// value: _item.id,
									value: _item.deviceName,
									_item
								};
							});
						}
					},
					huge_pages: {
						label: "配置DPDK最大页数",
						disabled: () => {
							if (disabled()) {
								return disabled();
							}
							if (disableBindDpdk()) return disableBindDpdk();
						},
						isNumber: true,
						min: 0,
						step: 1
					},
					/* 是否开启DPDK DPDK端口 rx队列 */
					is_open_dpdk: {
						label: "是否开启DPDK",
						disabled: disabled_dpdk,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					dpdk_ports: {
						label: "DPDK端口",
						disabled: disabled_dpdk,
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						async once() {
							const { data } = await _api.admin_db_audit.xdsTrafficDpdkList();
							this.options = _.map(data, _item => {
								return {
									label: _item.dpdkPCI || _item.id,
									value: _item.dpdkPort,
									_item
								};
							});
						}
					},
					rx_queues: {
						label: "rx队列",
						disabled: disabled_dpdk,
						isNumber: true,
						min: 0,
						max: 64,
						step: 1
					},
					/* 可用DPDK配置 是否开启实时流: 是否开启端口: 指定普通端口名 */
					is_open_live_traffic: {
						label: "是否开启实时流",
						disabled: disabled_dpdk,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					live_operation: {
						label: "是否开启端口",
						disabled: disabled_dpdk,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					live_port: {
						label: "指定普通端口名",
						disabled: disabled_dpdk,
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data } = await _api.admin_db_audit.xdsTrafficLivePortList();
							this.options = _.map(data, _item => {
								return {
									label: _item.deviceName || _item.id,
									value: _item.deviceName,
									_item
								};
							});
						}
					},
					/* DPDK文件配置 是否开启PCAP文件: 文件选项: 文件选择: */
					is_open_pcap_file: {
						label: "是否开启PCAP文件",
						disabled: disabled_dpdk,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					file_operation: {
						label: "文件选项",
						disabled: disabled_dpdk,
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
					},
					pcap_file: {
						label: "文件选择",
						disabled: disabled_dpdk,
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data } = await _api.admin_db_audit.xdsTrafficFileList();
							this.options = _.map(data, name => {
								return {
									label: name,
									value: name
								};
							});
						},
						itemSlots: {
							afterController() {
								return hxBtn({
									class: "ml8 flex middle mr8",
									directives: [hTipsHover({ msg: "支持扩展名:.pcap .cap" })],
									configs: vm.btnAddFile
								});
							}
						}
					}
				})
			};
		},
		computed: {
			cptDisabled() {
				if (!this.currentConfigs.is_open_extract_flow) {
					return true;
				}
			},
			cptDisabledConfigs() {
				if (!this.currentConfigs.is_open_extract_flow) {
					return true;
				}
				// “是否配置DPDK”选择为否后应该可以配置“DPDK配置”，“普通端口配置”，“离线文件配置”三个窗口的内容
				if (!this.currentConfigs.is_config_dpdk) {
					return false;
				}
				// 是否配置DPDK”选择为是后，即使“添加绑定窗口”和“配置DPDK最大页数”不为空也不能配置后续三个窗口
				if (this.currentConfigs.is_config_dpdk) {
					return true;
				}
				if (!this.currentConfigs.bind_ports) {
					return true;
				}
				if (!this.currentConfigs.huge_pages) {
					return false;
				}
				return false;
			},
			btnAddPorts() {
				return {
					label: "更新端口",
					isHide: this.cptDisabled,
					preset: "primary",
					disabled: this.disableBindDpdk,
					onClick: () => this.modifyPortAndUpdateConfigs()
				};
			},
			btnAddFile() {
				return {
					label: "添加文件",
					icon: "_upload",
					isHide: this.cptDisabledConfigs,
					async onClick() {
						try {
							const [file] = await _.$openFileSelector({
								accept: ".pcap,.cap"
							});
							if (!file) {
								return;
							}
							_.$loading(true);
							var formData = new FormData();
							formData.append("file", file);
							await _api.admin_db_audit.xdsTrafficFileupload(formData);
							this.form.pcap_file.once();
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			},
			btnSave() {
				return {
					label: "保存设置",
					preset: "primary",
					onClick: () => this.modifyConfigsAndUpdate()
				};
			},
			// 对于选项"是否配置DPDK"的逻辑改为：当选择"否"时，之后的配置可用；当选择"是"时，之后的配置不可用
			disableBindDpdk() {
				return !this.currentConfigs.is_config_dpdk;
			}
		},
		watch: {
			"currentConfigs.is_open_extract_flow"(newValue, oldValue) {
				if (oldValue !== null) {
					if (oldValue !== newValue) {
						if (!this._init) {
							this.handleXdsTrafficFlowSwitch(newValue);
						}
					}
				}
			}
		},
		methods: {
			async handlexdsTrafficGetFlowStatus() {
				const { code, data } = await _api.admin_db_audit.xdsTrafficGetFlowStatus();
				this.currentConfigs.is_open_extract_flow = data;
			},
			async handleXdsTrafficFlowSwitch(status) {
				this._init = false;
				_.$loading(true);
				const { code, msg } = await _api.admin_db_audit.xdsTrafficFlowSwitch({
					enabled: status
				});
				this.timeDisable = true;
				if (code === 0) {
					_.$msgSuccess(msg);
				} else {
					_.$msgError(msg);
				}
				_.$loading(false);
				if (this.timer) {
					clearTimeout(this.timer);
					this.timer = null;
				}
				this.timer = setTimeout(() => {
					this.timeDisable = false;
				}, 5000);
			},
			async modifyPortAndUpdateConfigs() {
				_.$loading(true);
				try {
					const {
						bind_ports,
						dpdk_ports,
						file_operation,
						huge_pages,
						id,
						is_config_dpdk,
						is_open_dpdk,
						is_open_extract_flow,
						is_open_live__traffic,
						is_open_pcap_file,
						live_operation,
						live_port,
						pcap_file,
						rx_queues
					} = this.currentConfigs;

					const res = await _api.admin_db_audit.xdsTrafficAddPort({
						bind_ports,
						dpdk_ports,
						file_operation,
						huge_pages,
						id,
						is_config_dpdk,
						is_open_dpdk,
						is_open_extract_flow,
						is_open_live__traffic,
						is_open_pcap_file,
						live_operation,
						live_port,
						pcap_file,
						rx_queues
					});
					const { code, msg } = res || {};
					if (code === 1) {
						throw new Error(msg);
					}

					await this.updateConfigs();

					this.form.bind_ports.once();
					this.form.dpdk_ports.once();
					this.form.live_port.once();
					_.$msg(msg);
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			async modifyConfigsAndUpdate() {
				_.$loading(true);
				try {
					const {
						bind_ports,
						dpdk_ports,
						file_operation,
						huge_pages,
						id,
						is_config_dpdk,
						is_open_dpdk,
						is_open_extract_flow,
						is_open_live_traffic,
						is_open_pcap_file,
						live_operation,
						live_port,
						pcap_file,
						rx_queues
					} = this.currentConfigs;
					const res = await _api.admin_db_audit.xdsTrafficSaveConfig({
						bind_ports,
						dpdk_ports,
						file_operation,
						huge_pages,
						id,
						is_config_dpdk,
						is_open_dpdk,
						is_open_extract_flow,
						is_open_live_traffic,
						is_open_pcap_file,
						live_operation,
						live_port,
						pcap_file,
						rx_queues
					});
					const { code, msg } = res || {};

					if (code === 1) {
						throw new Error(msg);
					}

					await this.updateConfigs();

					this.form.bind_ports.once();
					this.form.dpdk_ports.once();
					this.form.live_port.once();
					_.$msg(msg);
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},

			setConfigs(data) {
				const {
					bind_ports,
					dpdk_ports,
					file_operation = true,
					huge_pages,
					is_config_dpdk,
					is_open_dpdk,
					is_open_extract_flow,
					is_open_live_traffic,
					is_open_pcap_file = true,
					live_operation,
					live_port,
					pcap_file
				} = data;
				this.currentConfigs = {
					...this.currentConfigs,
					is_config_dpdk: is_config_dpdk || false,
					bind_ports: bind_ports || "",
					huge_pages: huge_pages || 512,
					/*  */
					is_open_dpdk: is_open_dpdk || false,
					dpdk_ports: dpdk_ports || [],
					rx_queues: 4,
					/*  */
					is_open_live_traffic: is_open_live_traffic || false,
					live_port: live_port || "",
					// is_open_extract_flow: is_open_extract_flow || false,
					/*  */
					is_open_pcap_file: is_open_pcap_file,
					file_operation: file_operation,
					pcap_file: pcap_file || "",
					live_operation: live_operation || false
				};
			},
			async updateConfigs() {
				_.$loading(true);
				try {
					const { data } = await _api.admin_db_audit.xdsTrafficFindConfig();
					this.setConfigs(data);
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
