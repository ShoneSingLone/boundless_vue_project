<template>
	<div class="x-page-view ViewAllProject">
		<xPageTitle
			title="所有项目"
			tips="源码static_vue2文件夹下所有非common文件夹，及其子目录的html文件">
		</xPageTitle>
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<!-- <xItem :configs="formSearch.queryName" /> -->
				<xItem :configs="search" style="--xItem-wrapper-width: 200px" />
			</xTablebar>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<!-- <xForm col="3">
				<xCard :header="name" v-for="(projectEntryPageNameArray, name) in displayProjectArray" :key="name" class="x-margin width100">
					<div v-for="entryPage in projectEntryPageNameArray" :key="entryPage" class="mt">
						<xTag class="mr">
							<a :href="genALinkHref(name, entryPage)" target="_blank">{{ entryPage }}</a>
						</xTag>
					</div>
				</xCard>
			</xForm> -->
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			function setContent(event, response) {
				_.$notify.info({ message: response?.payload?.content });
			}
			onMounted(() => {
				$(window).on("WS_MESSAGE", setContent);
			});

			onBeforeUnmount(() => {
				$(window).off("WS_MESSAGE", setContent);
			});
			return {
				download() {
					_.$ajax.downloadOctetStream({ url: "/rest/vdun/v1.0/node/downNodeAgent" });
				}
			};
		},
		async mounted() {
			this.loadAllProject();
			const tutorial = await _.$loadText("@/doc/reuseElementUI.md");
			this.md = tutorial;
		},
		data() {
			const vm = this;
			return {
				editThisRow: "",
				thisRowValue: "",
				projectByFilter: {},
				projects: {},
				md: "",
				search: {
					value: _.$lStorage.n2one_doc_search_project || "",
					clearable: true,
					placeholder: "过滤文件夹或html名称",
					onEmitValue({ val }) {
						_.$lStorage.n2one_doc_search_project = val;
						vm.filterProject(val);
					}
				},
				oprBtnArray: [
					{
						label: i18n("download"),
						async onClick() {
							vm.download();
						}
					},
					{
						label: i18n("添加新项目"),
						async onClick() {
							_.$openModal({
								title: i18n("添加新项目"),
								usedProject: "",
								url: "@/views/ViewAllProject.upsert.dialog.vue",
								projectsDB: vm.projects,
								onSuccess() {
									vm.loadAllProject();
								}
							});
						}
					},
					{
						label: i18n("格式化"),
						disabled() {
							return !vm.configsTable.data.set.size;
						},
						async onClick() {
							return _api.doc.cmd({
								action: "cmd",
								cmd: "format",
								args: _.filter(vm.configsTable.data.list, i => {
									return vm.configsTable.data.set.has(i.id);
								})
							});
						}
					},
					{
						label: i18n("生成定义文件"),
						disabled() {
							return !vm.configsTable.data.set.size;
						},
						async onClick() {
							return _api.doc.cmd({
								action: "cmd",
								cmd: "dst",
								args: _.filter(vm.configsTable.data.list, i => {
									return vm.configsTable.data.set.has(i.id);
								})
							});
						}
					}
				],
				configsTable: defTable({
					isHideFilter: true,
					isHideQuery: true,
					onQuery(pagination) {
						vm.configsTable.pagination = {
							page: 1,
							count: 0,
							size: 10,
							...pagination
						};
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					rowKey: "id",
					columns: [
						defTable.colMultiple({
							getConfigs() {
								return vm.configsTable;
							},
							by: "id",
							isHide({ rowData }) {
								return !!rowData.parent;
							}
						}),
						defTable.colExpandArrow({
							width: 60
						}),
						{
							label: i18n("项目名"),
							prop: "name",
							cellRenderer({ rowData }) {
								if (rowData.parent) {
									return hLink({
										label: rowData.name,
										target: "_blank",
										href: vm.genALinkHref(rowData.parent, rowData.name)
									});
								} else {
									return rowData.name;
								}
							}
						},
						{
							label: i18n("描述"),
							prop: "desc",
							cellRenderer({ rowData }) {
								const close = () => {
									if (vm.editThisRow) {
										vm.editThisRow = "";
										vm.thisRowValue = "";
									}
								};

								const save = async () => {
									try {
										rowData.desc = vm.thisRowValue;
										await _api.doc.projectsUpsert({ update: vm.projects });
										close();
									} catch (error) {
										console.error(error);
									}
								};
								if (vm.editThisRow === rowData.id) {
									if (!vm.thisRowValue) {
										vm.thisRowValue = rowData.desc;
									}
									return h(
										"div",
										{ staticClass: "flex middle width100 desc-input" },
										[
											h("xInput", {
												value: vm.thisRowValue,
												onInput(value) {
													vm.thisRowValue = value;
												},
												onEnter() {
													save();
												}
											}),
											h("xIcon", {
												icon: "save",
												staticClass: "ml pointer",
												onClick: save
											}),
											h("xIcon", {
												icon: "close",
												staticClass: "ml pointer mr",
												onClick: close
											})
										]
									);
								} else {
									return h(
										"div",
										{ staticClass: "flex middle width100 desc-input" },
										[
											h("span", [rowData.desc || "--"]),
											h("xIcon", {
												icon: "edit",
												staticClass: "ViewAllProject-edit-icon ml pointer",
												onClick() {
													if (!vm.editThisRow) {
														vm.editThisRow = rowData.id;
													}
												}
											})
										]
									);
								}
							}
						},
						defTable.colActions({
							width: 220,
							cellRenderer({ rowData }) {
								if (rowData.parent) {
									return hBtnWithMore({
										col: 3,
										children: []
									});
								} else {
									return hBtnWithMore({
										col: 3,
										children: [
											{
												label: i18n("添加入口"),
												onClick() {
													return;
												}
											},
											{
												label: i18n("open in vscode"),
												onClick() {
													return _api.doc.cmd({
														action: "cmd",
														cmd: "openVscode",
														args: rowData
													});
												}
											}
										]
									});
								}
							}
						})
					]
				})
			};
		},
		computed: {
			displayProjectArray() {
				if (Object.keys(this.projectByFilter).length) {
					return this.projectByFilter;
				}
				return this.projects;
			}
		},
		watch: {
			displayProjectArray(projects) {
				_.$setTableData(this.configsTable, { list: projects });
			}
		},
		methods: {
			async loadAllProject() {
				_.$loading(true);
				try {
					const { data: projects } = await _api.doc.allProject();
					this.projects = projects;
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			filterProject: _.debounce(function (params) {
				const projectByFilter = [];
				if (params) {
					_.each(this.projects, project => {
						const { children, name } = project;
						const nameIsOk = ~name.indexOf(params);
						const subIsOk = _.some(
							children,
							entryPage => ~entryPage.name.indexOf(params)
						);
						if (nameIsOk || subIsOk) {
							projectByFilter.push(project);
						}
					});
				}
				this.projectByFilter = projectByFilter;
			}, 500),
			genALinkHref(name, entryPge) {
				return `/static/${name}/${entryPge}`;
			}
		}
	});
}
</script>

<style lang="less">
.ViewAllProject {
	.ViewAllProject-edit-icon {
		display: none;
	}
	.desc-input {
		&:hover {
			.ViewAllProject-edit-icon {
				display: inline-block;
			}
		}
	}
}
</style>
