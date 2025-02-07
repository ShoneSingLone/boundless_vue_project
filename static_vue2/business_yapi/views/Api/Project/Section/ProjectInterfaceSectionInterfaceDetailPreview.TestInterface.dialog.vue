<template>
	<xDialog id="project-interface-section-interface-detail-preview-test-interface-dialog">
		<xForm col="2">
			<div span="full">
				<xBtn :configs="btnRun" />
				<xBtn :configs="btnSave" />
			</div>
			<xItem :configs="form.editor" style="height: 516px" />
			<div class="flex vertical x-padding">
				<div>
					<xBtn :configs="btnSaveAsBackupData" />
				</div>
				<xGap b="8" />
				<xMd :md="cptCode" style="height: 460px" />
			</div>
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ mockHref, reqMethod, interfaceId, projectId }) {
	const token = "";
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project", "inject_interface_section_interface_detail"],
		props: useDialogProps(),
		data() {
			return {
				response: "",
				httprequestoptions: {},
				form: defItems({
					editor: {
						type: "textarea",
						itemType: "xItemMonaco",
						language: "javascript",
						value: ``
					}
				})
			};
		},
		mounted() {
			this.setEditorValue();
		},
		computed: {
			cptCode() {
				let response = "";
				let httprequestoptions = "";
				try {
					if (this.response) {
						response = JSON.stringify(this.response, null, 2);
					}
					if (this.httprequestoptions) {
						httprequestoptions = JSON.stringify(this.httprequestoptions, null, 2);
					}
				} catch (error) {
					console.error(error);
				}
				if (response) {
					return `\`\`\`js
${response}

${httprequestoptions}
\`\`\``;
				}
				return response;
			},
			btnRun() {
				const vm = this;
				vm.response = "";
				return {
					label: i18n("运行"),
					onClick() {
						return vm.run();
					}
				};
			},
			btnSave() {
				const vm = this;
				vm.response = "";
				return {
					label: i18n("保存用例"),
					preset: "blue",
					onClick() {
						vm.saveUseCase();
					}
				};
			},
			btnSaveAsBackupData() {
				const vm = this;
				vm.response = "";
				return {
					label: i18n("将 response data 保存为备份数据"),
					preset: "blue",
					disabled() {
						return !vm.response;
					},
					onClick() {
						vm.saveAsBackupData();
					}
				};
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					async onClick() {
						vm.closeModal();
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: i18n("取消"),
					preset: "blue",
					async onClick() {
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			async saveAsBackupData() {
				try {
					const { data } = await _api.yapi.interface_up({
						id: interfaceId,
						resBackupJson: JSON.stringify(this.response.data, null, 2)
					});
					if (data) {
						this.inject_project.get_interface_list();
						this.inject_interface_section_interface_detail.updateInterface();
					}

					this.APP.updateGroupProjectList();
					_.$msg("更新成功");
				} catch (error) {
					_.$msgError(error);
				}
			},
			async saveUseCase() {
				try {
					const id = this.currentUseCase?._id;
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
			},
			async setEditorValue() {
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
			method: "${_.lowerCase(reqMethod)}",
			url: "${mockHref}"
		});
}`);
						}
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			setFormEditorValue(value) {
				this.form.editor.value = value;
				return;
				/* return new Promise(resolve => {
					this.$nextTick(() => {
						this.form.editor.value = value;
						resolve(this.form.editor.value);
					});
				}); */
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
			}
		}
	});
}
</script>
<style lang="less">
#project-interface-section-interface-detail-preview-test-interface-dialog {
	min-width: 1024px;
	height: 100%;
	.el-card__body {
		min-height: 100px;
	}
}
</style>
