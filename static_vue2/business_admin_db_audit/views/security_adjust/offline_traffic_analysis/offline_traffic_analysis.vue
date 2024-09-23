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
								可用DPDK配置
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
					<xCard header="可用DPDK配置" style="height: 300px">
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
					<xCard header="DPDK配置" style="height: 300px">
						<xForm col="1">
							<xItem
								:configs="form.is_open_pcap_file"
								v-model="currentConfigs.is_open_pcap_file" />
							<xItem
								:configs="form.file_operation"
								v-model="currentConfigs.file_operation" />
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
			this.updateConfigs();
		},
		data(vm) {
			const disabled = () => vm.cptDisabled;
			const disabled_dpdk = () => vm.cptDisabledConfigs;
			return {
				currentConfigs: {
					is_open_extract_flow: false,
					bind_ports: "",
					dpdk_ports: [],
					file_operation: false,
					huge_pages: 0,
					id: 1,
					is_config_dpdk: false,
					is_open_dpdk: false,
					is_open_live_traffic: false,
					is_open_pcap_file: false,
					live_operation: false,
					live_port: "",
					pcap_file: "",
					rx_queues: 0
				},
				form: defItems({
					is_open_extract_flow: {
						label: "是否开启流提取",
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.yesOrNo
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
						disabled,
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data } = await _api.admin_db_audit.xdsTrafficLivePortList();
							this.options = _.map(data, _item => {
								return {
									label: _item.deviceName || _item.id,
									value: _item.id,
									_item
								};
							});
						}
					},
					huge_pages: {
						label: "配置DPDK最大页数",
						disabled,
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
									label: _item.dpdkPMDName || _item.id,
									value: _item.id,
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
									value: _item.id,
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
								return h("xBtn", {
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
				if (!this.currentConfigs.is_config_dpdk) {
					return true;
				}
				if (!this.currentConfigs.bind_ports) {
					return true;
				}
				if (!this.currentConfigs.huge_pages) {
					return true;
				}
				return false;
			},
			btnAddPorts() {
				return {
					label: "更新配置",
					isHide: this.cptDisabled,
					preset: "primary",
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
			}
		},
		methods: {
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
						is_open_live__traffic,
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

			setConfigs(data) {
				const {
					bind_ports,
					dpdk_ports,
					file_operation,
					huge_pages,
					is_config_dpdk,
					is_open_dpdk,
					is_open_extract_flow,
					is_open_live_traffic,
					is_open_pcap_file,
					live_operation,
					live_port,
					pcap_file
				} = data;

				this.currentConfigs = {
					is_config_dpdk: is_config_dpdk || false,
					bind_ports: bind_ports || "",
					huge_pages: huge_pages || 0,
					/*  */
					is_open_dpdk: is_open_dpdk || false,
					dpdk_ports: dpdk_ports || [],
					rx_queues: 0,
					/*  */
					is_open_live_traffic: is_open_live_traffic || false,
					live_port: live_port || "",
					is_open_extract_flow: is_open_extract_flow || false,
					/*  */
					is_open_pcap_file: is_open_pcap_file || false,
					file_operation: file_operation || false,
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
