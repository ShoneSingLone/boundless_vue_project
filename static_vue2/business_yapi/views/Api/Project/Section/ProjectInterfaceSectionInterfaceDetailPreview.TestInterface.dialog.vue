<template>
	<xDialog id="project-interface-section-interface-detail-preview-test-interface-dialog">
		<xForm col="2">
			<div span="full">
				<xBtn :configs="btnRun" />
				<xBtn :configs="btnSave" />
			</div>
			<xItem :configs="form.editor" style="min-height: 516px" />
			<div class="padding">
				<xBlock class="flex vertical" :bodyClass="{ 'overflow-auto flex flex1': true }" style="height: 500px">
					<template #header>
						<div class="flex">
							<span>响应详情</span>
							<xGap f />
							<xBtn :configs="btnSaveAsBackupData" />
						</div>
					</template>
					<xMd :md="cptCode" />
				</xBlock>
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
				form: defItems({
					editor: {
						type: "textarea",
						itemType: "YapiItemMonaco",
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
				try {
					if (this.response) {
						response = JSON.stringify(this.response, null, 2);
					}
				} catch (error) {
					console.error(error);
				}
				if (response) {
					return `\`\`\`json
${response}
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
						this.inject_project.getInterfaceList();
						this.inject_interface_section_interface_detail.updateInterface();
					}

					this.APP.updateGroupProjectList();
					_.$msgSuccess("更新成功");
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
					_.$msgSuccess("更新成功");
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
							this.form.editor.value = data[0].usecaseCode;
							this.currentUseCase = data[0];
						} else {
							this.form.editor.value = `async function run() {
	return await axios({
			method: "${_.lowerCase(reqMethod)}",
			url: "${mockHref}"
		});
}`;
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
