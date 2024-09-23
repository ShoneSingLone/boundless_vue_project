<template>
	<div class="x-page-view flex1 height100 flex">
		<xBlock header="数据导入" class="flex1">
			<xForm col="1">
				<xItem :configs="form.curImportType" />
				<xItem :configs="form.dataSync" />
				<xItem
					:configs="form.importBy"
					span="full"
					style="
						--xItem-controller-flex: unset;
						--xItem-controller-width: 100%;
						--xItem-layout-justify-content: flex-start;
					" />
			</xForm>
		</xBlock>
		<xBlock header="数据导出" class="flex1">
			<xForm>
				<xItem :configs="form.curImportType" />
			</xForm>
		</xBlock>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "ProjectSettingPanelDataImportExportVue",
		inject: ["APP", "inject_project"],
		data() {
			const vm = this;
			return {
				form: defItems({
					swaggerURL: {
						placeholder:
							"GET 请求URL地址，返回JSON数据，如：http://127.0.0.1:8080/api/swagger.json",
						value: "http://localhost:3001/api/swagger-doc",
						rules: [
							{
								validator: () => "",
								trigger: ["change", "blur"]
							}
						]
					},
					curImportType: {
						value: "swagger",
						label: "数据采用的标准",
						itemType: "xItemRadioGroup",
						options: [
							{
								label: "Swagger",
								value: "swagger"
							}
						]
					},
					dataSync: {
						value: "normal",
						label: "数据覆盖模式",
						itemType: "xItemRadioGroup",
						minWidth: 100,
						tips() {
							return h("div", [
								h("div", {}, [
									h("xTag", { class: "mr" }, ["普通模式"]),
									h("span", {}, ["不导入已存在的接口"])
								]),
								h("div", {}, [
									h("xTag", { class: "mr mt" }, ["智能合并"]),
									h("span", {}, [
										"已存在的接口，将合并返回数据的 response，适用于导入了 swagger 数据，保留对数据结构的改动 "
									])
								]),
								h("div", {}, [
									h("xTag", { class: "mr mt" }, ["完全覆盖"]),
									h("span", {}, [
										"不保留旧数据，完全使用新数据，适用于接口定义完全交给后端定义"
									])
								])
							]);
						},
						options: [
							{ label: "普通模式", value: "normal" },
							{ label: "智能合并", value: "good" },
							{ label: "完全覆盖", value: "merge" }
						]
					},
					importBy: {
						value: "2",
						label: "导入方式",
						itemType: "xItemSelect",
						options: [
							{ label: "上传JSON 文件", value: "1" },
							{ label: "通过URL请求获取", value: "2" }
						],
						itemSlots: {
							afterController() {
								const xBtnProps = { configs: vm.btnSelectFile, class: "ml" };
								const xBtn = h("xBtn", xBtnProps);

								if (vm.cptIsImportFile) {
									return h("div", [xBtn]);
								} else {
									const xItemProps = {
										class: "ml",
										configs: vm.form.swaggerURL,
										style: "--xItem-wrapper-width: 600px;",
										onSetup({ xItem }) {
											vm._importByVm = xItem;
										}
									};
									return h("div", { class: "flex middle" }, [
										h("xItem", xItemProps),
										xBtn
									]);
								}
							}
						}
					}
				})
			};
		},
		computed: {
			cptIsImportFile() {
				return this.form.importBy.value === "1";
			},
			btnSelectFile() {
				const vm = this;
				return {
					label: vm.cptIsImportFile ? i18n("选择文件") : "导入",
					icon: "el-icon-upload",
					preset: "blue",
					async onClick() {
						let json, res;

						if (vm.cptIsImportFile) {
							try {
								/* 读取本地文件 */
								const [file] = await _.$openFileSelector();
								if (!file) {
									return;
								}
								json = await _.$readFileAsText(file);
								res = await _api.yapi.getSwaggerDataByUrl({
									type: vm.cptParams.curImportType,
									json
								});
							} catch (error) {
								_.$msgError(error);
							}
						} else {
							if (!vm.cptParams.swaggerURL) {
								vm._importByVm.errorTips = "导入之前需要填写URL";
								return;
							}
							res = await _api.yapi.getSwaggerDataByUrl({
								url: encodeURI(encodeURI(vm.cptParams.swaggerURL)),
								type: vm.cptParams.curImportType
							});
						}

						if (res) {
							await vm.checkBeforeOverwriteInterface(res.data);
						}
					}
				};
			},
			cptParams() {
				return _.$pickFormValues(this.form);
			}
		},
		methods: {
			async checkBeforeOverwriteInterface(originData) {
				let typeid = this.APP.cptProjectId;
				let apiCollections = originData.apis.map(item => {
					return {
						method: item.method,
						path: item.path
					};
				});
				let resToMerge = await _api.yapi.log_update({
					type: "project",
					typeid,
					apis: apiCollections
				});

				if (resToMerge) {
					_.$openModal({
						title: i18n("确认数据同步"),
						url: "@/views/Api/Project/Tabs/ProjectSettingConfirmMergeInterface.dialog.vue",
						parent: this,
						domainData: resToMerge.data,
						originData,
						allCategory: this.inject_project.allCategory,
						dataSync: this.cptParams.dataSync
					});
				}
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
