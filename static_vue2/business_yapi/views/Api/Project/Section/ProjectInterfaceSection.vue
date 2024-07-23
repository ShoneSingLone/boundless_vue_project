<style lang="less">
#ProjectInterfaceSection {
	width: 1px;
	.highlight-path {
		color: #03a9f4;
	}
}
</style>

<template>
	<section id="ProjectInterfaceSection" class="x-page-view flex1 flash-when">
		<xPageContent>
			<ProjectInterfaceSectionInterfaceDetail v-if="cptInterfaceType === 'interface'" />
			<ProjectInterfaceSectionInterfaceList v-else />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		components: {
			ProjectInterfaceSectionInterfaceDetail: () =>
				_.$importVue(
					"@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetail.vue"
				),
			ProjectInterfaceSectionInterfaceList: () =>
				_.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceList.vue")
		},
		provide() {
			return { inject_project_interface_section: this };
		},
		data() {
			const vm = this;

			const catid = {
				prop: "catid",
				label: i18n("接口分类"),
				width: 150,
				cellRenderer({ rowData }) {
					const label = _.find(vm.inject_project.allCategory, {
						_id: rowData.catid
					}).name;
					return label;
				}
			};

			const title = {
				prop: "title",
				label: i18n("接口名称"),
				cellRenderer({ rowData }) {
					return _jsxFns.Link({
						label: rowData.title,
						title: rowData.title,
						style: "text-align:left;",
						href: _.$aHashLink("/api/project", {
							...vm.$route.query,
							interfaceType: "interface",
							interfaceId: rowData._id
						})
					});
				}
			};

			const method = {
				prop: "method",
				label: i18n("请求方法"),
				width: 100
			};

			const path = {
				prop: "path",
				width: 300,
				label: i18n("接口路径"),
				cellRenderer: params => {
					const { rowData } = params;
					const { value: search } = vm.form.path;

					if (search) {
						const other = String(rowData.path).split(search);
						if (other.length > 1) {
							const childrenVnod = [];
							_.each(other, (content, index) => {
								childrenVnod.push(content);
								if (index !== other.length - 1) {
									childrenVnod.push(
										h(
											"span",
											{
												staticClass: `highlight-path`
											},
											[search]
										)
									);
								}
							});
							return h("div", childrenVnod);
						}
					}
					return rowData.path;
				}
			};

			const status = {
				prop: "status",
				label: i18n("状态"),
				width: 150
			};

			const isProxy = {
				prop: "isProxy",
				label: i18n("转发"),
				width: 150,
				cellRenderer: params => {
					const { rowData } = params;

					if (rowData.isProxy) {
						const vDom_yes = h("xTag", { type: "success" }, ["是"]);
						const vDom_witchEnv = h("xTag", { class: "ml" }, [
							vm.cptEnvObject[rowData.witchEnv]?.name || "--"
						]);
						return h("div", [vDom_yes, vDom_witchEnv]);
					} else {
						return h("xTag", { type: "info" }, ["否"]);
					}
				}
			};
			const isUseBackup = {
				prop: "isUseBackup",
				label: i18n("启用备份数据"),
				width: 160,
				cellRenderer: params => {
					const { rowData } = params;

					const isUseBackup = h(
						"xTag",
						{ type: "success", vIf: rowData.res_body_type === "backup" },
						["是"]
					);
					const hasBackupData = h(
						"xTag",
						{ type: "warning", class: "ml8", vIf: !rowData.isSetBackupData },
						["无备份数据"]
					);

					return [isUseBackup, hasBackupData];
				}
			};

			const maintainer = {
				prop: "tag",
				label: i18n("维护人"),
				width: 150
			};
			const tag = {
				prop: "tag",
				label: i18n("Tags"),
				width: 250
			};

			return {
				data: [],
				configsTable: defTable({
					isHideQuery: true,
					onQuery() {
						debugger;
						vm.filterList();
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "_id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "order",
							label: "序号",
							width: 60,
							cellRenderer({ rowIndex }) {
								return h("div", { style: "width:100%;text-align:right;" }, [
									rowIndex + 1
								]);
							}
						},
						catid,
						title,
						method,
						path,
						status,
						maintainer,
						isProxy,
						isUseBackup,
						tag
					]
				}),
				form: defItems({
					path: {
						label: "名称或者路径",
						value: "",
						clearable: true,
						onEnter() {
							vm.filterList();
						}
					},
					catid: {
						label: "分类",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						once() {
							vm.$watch(
								() => [vm.$route.query.interfaceType, vm.$route.query.interfaceId],
								([interfaceType, interfaceId]) => {
									if (interfaceType === "category") {
										this.value = [Number(interfaceId)];
									} else {
										this.value = [];
									}
								},
								{
									immediate: true
								}
							);
						},
						options() {
							return _.map(vm.inject_project.allCategory, row => {
								return {
									value: row._id,
									label: row.name
								};
							});
						},
						onEmitValue() {
							vm.filterList();
						}
					},
					method: {
						label: "方法",
						value: "",
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: _opts.yapi.httpMethod,
						onEmitValue() {
							vm.filterList();
						}
					},
					tag: {
						label: "Tags",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options() {
							return _.map(vm.inject_project.allTags, label => {
								return {
									value: label,
									label
								};
							});
						},
						onEmitValue() {
							vm.filterList();
						}
					},
					isUseBackup: {
						label: "备份数据",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: _.map(["是", "否", "无备份数据"], label => ({
							label,
							value: label
						})),
						onEmitValue() {
							vm.filterList();
						}
					},
					witchEnv: {
						label: "转发环境",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options() {
							return _.concat(
								[{ label: "未设置", value: "unset" }],
								_.map(vm.APP.cptProject.env, row => {
									return {
										value: row._id,
										label: row.name
									};
								})
							);
						},
						onEmitValue() {
							vm.filterList();
						}
					}
				})
			};
		},
		computed: {
			cptInterfaceType() {
				return this.$route.query.interfaceType;
			},
			cptEnvObject() {
				return _.reduce(
					this.APP.cptProject.env,
					(target, e) => {
						target[e._id] = e;
						return target;
					},
					{}
				);
			}
		},
		watch: {
			"inject_project.allInterface": {
				immediate: true,
				handler() {
					this.filterList();
				}
			}
		},
		methods: {
			resetFilter() {
				_.$setFormValues(this.form, {
					path: "",
					catid: []
				});
				this.$nextTick(() => {
					this.filterList();
				});
			},
			filterList() {
				let configsTableDataList = (() => {
					const filterForm = _.$pickFormValues(this.form);
					let _allInterface = _.cloneDeep(this.inject_project.allInterface);
					let paramKeys = Object.keys(filterForm);
					let prop;
					while ((prop = paramKeys.pop())) {
						let search = filterForm[prop];
						if (_.$isInput(search)) {
							_allInterface = _.filter(_allInterface, i => {
								if (prop == "status") {
									return search.includes(i.status);
								} else if (prop == "catid") {
									return search.includes(i.catid);
								} else if (prop == "method") {
									return search.includes(i.method);
								} else if (prop == "tag") {
									return _.some(i.tag, tag => search.includes(tag));
								} else if (prop == "isUseBackup") {
									if (search.includes("是")) {
										return i.res_body_type === "backup";
									}
									if (search.includes("否")) {
										return i.res_body_type !== "backup";
									}
									if (search.includes("无备份数据")) {
										if (!i.isSetBackupData) {
											return true;
										}
									}
									return false;
								} else if (prop == "witchEnv") {
									if (search.includes("unset")) {
										if (!i.witchEnv) {
											return true;
										}
									}
									if (!i.isProxy) {
										return false;
									}
									return search.includes(i.witchEnv);
								} else {
									search = _.trim(search);
									return (
										new RegExp(search, "i").test(i[prop]) ||
										new RegExp(search, "i").test(i.title)
									);
								}
							});
						}
					}
					return _allInterface;
				})();

				_.$setTableData(this.configsTable, { list: configsTableDataList });
			}
		}
	});
}
</script>
