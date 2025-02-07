<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditor {
	height: 1px;
	overflow: auto;
}
</style>
<template>
	<div
		v-if="isShow"
		id="ProjectInterfaceSectionInterfaceDetailEditor"
		class="flex1 flex vertical">
		<xCard>
			<div class="flex middle">
				<xItem :configs="form.path" v-model="formData.path" class="mr" />
				<xBtn :configs="btnRunTest" />
			</div>
			<xItem :configs="form.editor" style="height: 150px; --xItem-wrapper-width: 100%" />
		</xCard>
		<xGap t />
		<div class="flex1 height100 overflow-auto" v-xloading="cptIsLoading">
			<xCollapse :value="'Response'">
				<xCollapseItem title="Response" name="Response" v-if="cptCode_response">
					<xMd :md="cptCode_response" @click.native="copyResponse" id="refCopyResponse" />
				</xCollapseItem>
				<xCollapseItem
					title="Response Headers"
					name="Headers"
					v-if="cptCode_response_headers">
					<xMd :md="cptCode_response_headers" />
				</xCollapseItem>
				<xCollapseItem
					title="Request Options"
					name="Request"
					v-if="cptCode_request_options">
					<xMd :md="cptCode_request_options" />
				</xCollapseItem>
			</xCollapse>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_interface_section_interface_detail"],
		props: {
			interfaceInfo: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		setup() {
			const vm = this;
			return {
				btnRunTest: {
					preset: "primary",
					label: "运行",
					onClick() {
						return vm.run();
					}
				}
			};
		},
		mounted() {
			this.setEditorValue();
		},
		data() {
			const vm = this;
			return {
				response: "",
				httprequestoptions: "",
				isShow: true,
				formData: {},
				xItemInterface: {
					label: "接口信息",
					itemType: "xItemMonaco"
				},
				form: defItems({
					editor: {
						type: "textarea",
						itemType: "xItemMonaco",
						language: "javascript",
						value: ``
					},
					method: {
						itemType: "xItemSelect",
						options: _opts.yapi.httpMethod
					},
					path: {
						$vSlots: {
							prepend() {
								return hxItem({
									configs: vm.form.method,
									value: vm.formData.method,
									onChange(val) {
										if (vm.formData.method !== val) {
											vm.formData.method = val;
										}
									},
									style: `--xItem-wrapper-width:106px`
								});
							}
						}
					}
				})
			};
		},
		computed: {
			cptIsLoading() {
				return _.isEqual(this.response, "pending");
			},
			cptCode_response() {
				let response = "";
				try {
					if (this.response && !this.cptIsLoading) {
						response = JSON.stringify(
							_.omit(this.response, ["headers", "config"]),
							null,
							2
						);
					}
				} catch (error) {
					console.error(error);
				}
				if (response) {
					return `\`\`\`js\n${response}\n\`\`\``;
				}
				return response;
			},
			cptCode_response_headers() {
				let response = "";
				try {
					if (this.response) {
						response = JSON.stringify(
							_.omit(this.response?.headers || {}, ["httprequestoptions"]),
							null,
							2
						);
					}
				} catch (error) {
					console.error(error);
				}
				if (response) {
					return `\`\`\`js\n${response}\n\`\`\``;
				}
				return response;
			},
			cptCode_request_options() {
				let httprequestoptions = "";
				try {
					if (this.httprequestoptions) {
						httprequestoptions = JSON.stringify(this.httprequestoptions, null, 2);
					}
				} catch (error) {
					console.error(error);
				}
				if (httprequestoptions) {
					return `\`\`\`js\n${httprequestoptions}\n\`\`\``;
				}
				return httprequestoptions;
			},
			cptFormDataResBackupJson: {
				get() {
					return this.formData.resBackupJson || "";
				},
				set(req_params) {
					this.formData.resBackupJson = req_params;
					return true;
				}
			},
			cptFormDataReqParams: {
				get() {
					return this.formData.req_params || [];
				},
				set(req_params) {
					this.formData.req_params = req_params;
					return true;
				}
			},
			btnUpdate() {
				return {
					label: "更新",
					preset: "blue",
					onClick: () => {
						return this.onSubmit();
					}
				};
			}
		},
		methods: {
			copyResponse() {
				return _.$copyToClipboard($("#refCopyResponse").text())
					.then(() => _.$msg("复制成功"))
					.catch(error => _.$msgError(error));
			},
			setFormEditorValue(value) {
				this.form.editor.value = value;
			},
			async setEditorValue() {
				const {
					title,
					uid,
					up_time,
					path,
					tag,
					isProxy,
					witchEnv,
					method,
					catid,
					_id: interfaceId,
					project_id
				} = this.interfaceInfo || {};
				const { protocol, hostname, port } = location;

				const apiURL = String(`${this.APP.cptProject?.basepath || ""}${path}`).replace(
					/\/\//g,
					"/"
				);

				const mockHref = `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${project_id}${apiURL}`;

				try {
					const res = await _api.yapi.interface_usecase_get_all(interfaceId);
					if (!res.errcode) {
						const { data } = res;
						if (data.length > 0) {
							await this.setFormEditorValue(data[0].usecaseCode);
							this.currentUseCase = data[0];
						} else {
							await this.setFormEditorValue(`async function run() {
	return await axios({
			method: "${_.lowerCase(method)}",
			url: "${mockHref}"
		});
}`);
						}
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			async run() {
				let response = "pending";
				this.response = response;
				await _.$appendScript("/common/libs/axios.js", "axios");
				let fnRun;
				try {
					fnRun = new Function(`${this.form.editor.value}
	return run();
`);
					response = await fnRun();
				} catch (error) {
					console.error(error);
					_.$msgError(error);
				} finally {
					if (response === "pending") {
						this.response = "";
					} else {
						this.response = response;
					}
				}

				try {
					const { httprequestoptions } = response.headers;
					this.httprequestoptions = JSON.parse(httprequestoptions);
				} catch (error) {}
			},
			async onSubmit() {
				const [atLeastOne] = await _.$validateForm(this.$el);
				if (atLeastOne) {
					return;
				}
				_.$loading(true);
				try {
					const formData = this.formData;
					const { data } = await _api.yapi.interface_up(formData);
					if (data) {
						this.inject_project.get_interface_list();
						this.inject_interface_section_interface_detail.updateInterface();
					}
					_.$msg("修改成功");
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				immediate: true,
				handler(val) {
					this.isShow = false;
					this.formData = {
						...this.interfaceInfo
					};

					this.$nextTick(() => {
						this.isShow = true;
					});
				}
			}
		}
	});
}
</script>
