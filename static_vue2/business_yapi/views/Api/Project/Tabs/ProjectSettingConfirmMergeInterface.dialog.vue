<template>
	<xDialog id="ProjectSettingConfirmMergeInterfaceDialog">
		<xAlert
			title="不保留旧数据，完全使用新数据。数据同步后，可能会造成原本的修改数据丢失"
			type="warning" />
		<div class="postman-dataImport-modal flex1">
			<div class="postman-dataImport-modal-content">
				<div
					:key="index"
					class="postman-dataImport-show-diff"
					v-for="(item, index) in domainData">
					<span class="logcontent" v-html="item.content" />
				</div>
			</div>
			<div class="x-padding">
				{{ cptTaskNotice }}
			</div>
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ domainData, originData, dataSync }) {
	const token = "";
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data() {
			return {
				domainData,
				successNum: 0,
				existNum: 0,
				hasDone: 0,
				apis: originData.apis,
				apisTotal: originData.apis.length
			};
		},
		computed: {
			cptTaskNotice() {
				if (this.hasDone === this.apisTotal) {
					let exist = this.existNum ? "，其中" + this.existNum + "个接口已存在" : "";
					return `数据已全部导入，共执行任务 ${this.hasDone} 个${exist}`;
				}
				if (this.hasDone) {
					return `正在导入，已执行任务 ${this.hasDone} 个，共 ${this.apisTotal} 个`;
				}
				return `需要导入的接口共 ${this.apisTotal} 个`;
			},
			btnOk() {
				const vm = this;
				const label = (function () {
					if (dataSync === "normal") {
						return "只导入新增接口";
					}
					if (dataSync === "good") {
						return "智能合并";
					}
					return "全部覆盖";
				})();
				return {
					label,
					disabled() {
						return !_.$isArrayFill(vm.apis);
					},
					async onClick() {
						return vm.handleAddInterface();
					}
				};
			},
			btnCancel() {
				return {
					label: i18n("取消"),
					preset: "blue",
					onClick: async () => {
						this.closeModal();
					}
				};
			}
		},
		methods: {
			async ensureAllCategoryExist({ cats, apis }) {
				try {
					const vm = this;
					let catsObj = { ...vm.inject_project.all_category };
					cats = cats || [];
					for (const cat of cats) {
						const findCat = _.find(
							vm.inject_project.all_category,
							c => c.name === cat.name
						);
						if (findCat) {
							catsObj[cat.name] = findCat;
							/* TODO:是否需要更新desc */
						} else {
							try {
								const params = {
									project_id: vm.APP.cptProjectId,
									name: cat.name,
									desc: cat.desc
								};
								const res = await _api.yapi.interface_add_cat(params);

								if (res?.errcode === 0) {
									cat.id = res.data._id;
								} else {
									throw new Error(res?.message);
								}
							} catch (error) {
								console.error("Error adding or finding cats:", error);
							}
						}
					}

					await vm.inject_project.get_interface_list();
					return catsObj;
				} catch (error) {
					_.$msgError(error);
					return false;
				}
			},
			async handleAddInterface() {
				const vm = this;
				_.$loading(true);
				try {
					await vm.ensureAllCategoryExist(originData /* cats,apis */);
					let { basePath } = originData;
					vm.hasDone = 0;
					vm.successNum = 0;
					const projectId = vm.APP.cptProjectId;

					/* 如果有公用前缀 */
					if (basePath) {
						await _api.yapi.project_update({
							id: projectId,
							basepath: basePath
							/* token */
						});
					}

					let api;
					while ((api = vm.apis.pop())) {
						try {
							let interfaceInfo = Object.assign(api, {
								project_id: projectId
							});
							const category = _.find(vm.inject_project.all_category, {
								name: interfaceInfo.catname
							});
							const undefinedCategory = _.find(vm.inject_project.all_category, {
								title: "公共分类"
							});
							(function () {
								if (interfaceInfo.catname) {
									if (category?._id) {
										interfaceInfo.catid = category._id;
										return;
									}
								} else {
									interfaceInfo.catname = undefinedCategory.name;
									interfaceInfo.catid = undefinedCategory._id;
								}
							})();

							interfaceInfo.token = token;
							/* 只新增 */
							if (dataSync === "normal") {
								// normal
								let res = await _api.yapi.interface_add(interfaceInfo);
								if (res.errcode) {
									if (res.errcode === 40022) {
										vm.existNum++;
									} else {
										_.$msgError(res);
									}
								} else {
									vm.successNum++;
								}
							} else {
								/* 覆盖、智能合并 */
								// merge good
								interfaceInfo.dataSync = dataSync;
								let res = await _api.yapi.interface_upsert(interfaceInfo);
								if (res.errcode) {
									_.$msgError(res);
								} else {
									vm.successNum++;
								}
							}
						} catch (error) {
							_.$msgError(error.message);
						} finally {
							vm.hasDone++;
						}
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					await vm.inject_project.get_interface_list();
					_.$loading(false);
				}
			}
		}
	});
}
</script>
<style lang="less">
#ProjectSettingConfirmMergeInterfaceDialog {
	height: 100%;
	.el-card__body {
		min-height: 100px;
	}
}
</style>
