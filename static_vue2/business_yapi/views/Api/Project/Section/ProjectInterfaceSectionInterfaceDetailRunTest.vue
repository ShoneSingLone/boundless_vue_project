<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditor {
	height: 1px;
	overflow: auto;

	.result-wrapper {
		> .el-collapse {
			height: 100%;
			display: flex;
			flex-flow: column nowrap;

			> .el-collapse-item {
				display: flex;
				flex-flow: column nowrap;
				&.is-active {
					flex: 1;
					height: 1px;

					> .el-collapse-item__wrap {
						flex: 1;
						overflow: auto;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div v-if="isShow" id="ProjectInterfaceSectionInterfaceDetailEditor" class="flex1 flex">
		<div class="flex flex1 vertical">
			<div class="flex middle">
				<xItem :configs="form.path" v-model="formData.path" class="mr" />
				<xBtn :configs="btnRunTest" />
				<xBtn :configs="btnSaveConfigs" />
			</div>
			<xItem :configs="form.editor" style="--xItem-wrapper-width: 100%" />
		</div>
		<xGap l />
		<div
			class="flex flex1 vertical height100 overflow-auto result-wrapper"
			v-xloading="cpt_is_loading">
			<xCollapse :value="'Response'">
				<xCollapseItem title="Response" name="Response" v-if="cpt_code_response">
					<xMd
						:md="cpt_code_response"
						@click.native="copyResponse(cpt_code_response)"
						id="refCopyResponse" />
				</xCollapseItem>
				<xCollapseItem
					title="Response Headers"
					name="Headers"
					v-if="cpt_code_response_headers">
					<xMd
						:md="cpt_code_response_headers"
						@click.native="copyResponse(cpt_code_response_headers)" />
				</xCollapseItem>
				<xCollapseItem
					title="Request Options"
					name="Request"
					v-if="cpt_code_request_options">
					<xMd
						:md="cpt_code_request_options"
						@click.native="copyResponse(cpt_code_request_options)" />
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
				},
				btnSaveConfigs: {
					preset: "primary",
					label: i18n("保存配置"),
					onClick() {
						return vm.saveConfigs();
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
			cpt_is_loading() {
				return _.isEqual(this.response, "pending");
			},
			cpt_code_response() {
				let response = "";
				try {
					if (this.response && !this.cpt_is_loading) {
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
			cpt_code_response_headers() {
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
			cpt_code_request_options() {
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
			}
		},
		methods: {
			copyResponse(text) {
				/* $("#refCopyResponse").text() */
				return _.$copyToClipboard(text)
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
					const { data } = await _api.yapi.interface_usecase_get_all(interfaceId);
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
			async saveConfigs() {
				try {
					const id = this.currentUseCase?._id;
					const { projectId, interfaceId } = this.$route.query;
					const dataForm = {
						id,
						interfaceId,
						projectId,
						usecaseCode: this.form.editor.value
					};
					await _api.yapi.interface_usecase_upsert(dataForm);
					this.APP.updateGroupProjectList();
					_.$msg("更新成功");
				} catch (error) {
					_.$msgError(error);
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
