<style lang="less">
#ProjectInterfaceSection {
	width: 1px;
	.highlight-path {
		color: #03a9f4;
	}
}
</style>

<template>
	<section id="ProjectInterfaceSection" class="x-page-view flex1">
		<xPageContent>
			<xAutoResizer :onResize="setSize">
				<div class="flex">
					<ProjectInterfaceSectionInterfaceList :style="cptListStyle" />
					<ProjectInterfaceSectionInterfaceDetail :style="cptDetailStyle" />
				</div>
			</xAutoResizer>
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const USE_BACKUP = "启用";
	const UNUSE_BACKUP = "未启用";
	const NO_BACKUP = "无备份数据";
	const HAS_BACKUP = "备份数据";

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
		data(vm) {
			const genReferenceContent = (title, item) => {
				const { value } = item;
				const { length } = value || [];
				return hDiv({ class: "flex middle width100" }, [
					hDiv(title),
					hxTag(
						{
							vIf: length,
							class: "ml4 mr4",
							closable: true,
							onClose() {
								item.value = [];
							}
						},
						[length]
					),
					// hxIcon({ icon: "arrow_triangle-right" })
					hxIcon({ icon: "_icon_filter" })
				]);
			};
			const catid = {
				prop: "catid",
				label: i18n("分类"),
				width: 150,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "CatIdheaderCell",
						formProp: "catid",
						label: "接口分类"
					});
				},
				cellRenderer({ rowData }) {
					const label = _.find(vm.inject_project.all_category, {
						_id: rowData.catid
					}).name;
					return label;
				}
			};

			const title = {
				prop: "title",
				label: i18n("name"),
				width: 300,
				cellRenderer({ rowData }) {
					return hDiv([
						hLink({
							label: `${rowData.title}`,
							title: rowData.title,
							style: "text-align:left;",
							href: _.$aHashLink("/api/project", {
								...vm.$route.query,
								interfaceType: "interface",
								interfaceId: rowData._id,
								project_interface_tab: "preview"
							})
						}),
						hDiv({ class: "data-list-id-number" }, [`${rowData._id}`])
					]);
				}
			};

			const method = {
				prop: "method",
				label: i18n("请求方法"),
				width: 150,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "MethodheaderCell",
						formProp: "method",
						label: "请求方法"
					});
				},
				cellRenderer({ cellData }) {
					const item = _.find(_opts.yapi.httpMethod, { value: cellData });
					if (item) {
						return hxTag(
							{
								type: item.type,
								color: item.color,
								textColor: item.textColor
							},
							[item.label]
						);
					}
				}
			};

			const path = {
				prop: "path",
				width: 300,
				label: i18n("路径"),
				cellRenderer: params => {
					const { rowData } = params;
					const { value: search } = vm.form.path;

					if (search) {
						const other = String(rowData.path).split(search);
						if (other.length > 1) {
							return ((/* 设置高亮 */) => {
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
								return hDiv(childrenVnod);
							})();
						}
					}
					return rowData.path;
				}
			};

			const status = {
				prop: "status",
				label: i18n("status_info"),
				width: 150
			};

			const isProxy = {
				prop: "isProxy",
				label: i18n("转发"),
				width: 150,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "ProxyHeaderCell",
						formProp: "witchEnv",
						label: "转发环境"
					});
				},
				cellRenderer: params => {
					const { rowData } = params;

					if (rowData.isProxy) {
						const vDom_yes = h("xTag", { type: "success" }, ["是"]);
						const vDom_witchEnv = h("xTag", { class: "ellipsis mt4" }, [
							vm.cptEnvObject[rowData.witchEnv]?.name || "--"
						]);
						return hDiv({ class: "flex vertical width100" }, [
							hDiv(vDom_yes),
							hDiv(vDom_witchEnv)
						]);
					} else {
						return h("xTag", { type: "info" }, ["否"]);
					}
				}
			};
			const isUseBackup = {
				prop: "isUseBackup",
				label: i18n("启用备份数据"),
				width: 160,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "BackupHeaderCell",
						formProp: "isUseBackup",
						label: "备份数据"
					});
				},
				cellRenderer: params => {
					const { rowData } = params;

					const isUseBackup = h(
						"xTag",
						{ type: "success", vIf: rowData.res_body_type === "backup" },
						[USE_BACKUP]
					);
					const hasBackupData = h(
						"xTag",
						{ type: "warning", class: "ellipsis mt4", vIf: !rowData.isSetBackupData },
						[NO_BACKUP]
					);

					return hDiv({ class: "flex vertical" }, [
						hDiv(isUseBackup),
						hDiv(hasBackupData)
					]);
				}
			};

			const maintainer = {
				prop: "uid",
				label: i18n("维护人"),
				width: 150,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "UidHeaderCell",
						formProp: "uid",
						label: "维护人"
					});
				},
				cellRenderer: params => {
					const {
						rowData: { uid }
					} = params;
					const user = _.find(vm.cptProjectMembers, { uid });

					if (user) {
						user.avatar = Vue._common_utils.appendToken(
							`${window._AJAX_URL_PREFIX || ""}/api/user/avatar?uid=${uid}&usedBy=user`
						);
						return hDiv({ staticClass: "ellipsis flex middle" }, [
							hxIcon({
								img: user.avatar,
								iscache: true,
								style: `width: 32px;height: 32px;margin-right:8px;`
							}),
							user.username
						]);
					} else {
						return "--";
					}
				}
			};
			const tag = {
				prop: "tag",
				label: i18n("Tags"),
				width: 250,
				headerCellRenderer() {
					return genHeaderCellVNode({
						propName: "TagsHeaderCell",
						formProp: "tag",
						label: "Tags"
					});
				}
			};

			return {
				size: {},
				data: [],
				configsTable: defTable({
					isHideQuery: true,
					onQuery() {
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
								return hDiv({ style: "width:100%;text-align:right;" }, [
									rowIndex + 1
								]);
							}
						},
						catid,
						method,
						title,
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
						// label: "分类",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						once() {
							vm.$watch(
								() => vm.inject_project.all_category,
								all_category => {
									/* this.options在wrapper中并不是响应式数据 */
									vm.form.catid.options = _.map(all_category, row => ({
										value: row._id,
										label: row.name
									}));
								},
								{ immediate: true }
							);
						},
						onEmitValue() {
							vm.filterList();
						}
					},
					uid: {
						value: "",
						itemType: "xItemSelect",
						clearable: true,
						multiple: true,
						options: [],
						optonsRender({ options }) {
							return _.map(options, option => {
								return h(
									"xOption",
									{
										class: "flex middle",
										key: option.uid,
										label: `${option.username}_${option.uid}`,
										value: option.uid
									},
									[
										hDiv({ style: "width:70px" }, [`ID:${option.uid}`]),
										hDiv(`${option.username}`)
									]
								);
							});
						},
						once() {
							vm.$watch(
								() => vm.cptProjectMembers,
								options => {
									vm.form.uid.options = _.unionBy(options, "uid");
								},
								{ immediate: true }
							);
						}
					},
					method: {
						// label: "方法",
						value: "",
						itemType: "xItemSelect",
						clearable: true,
						multiple: true,
						options: _opts.yapi.httpMethod,
						optonsRender({ vm, options }) {
							return _.map(options, (item, key) => {
								return h(
									"xOption",
									{
										key: item.value || item.label,
										value: item.value,
										label: item.label,
										disabled: item.disabled || false
									},
									[
										hxTag(
											{
												type: item.type,
												color: item.color,
												textColor: item.textColor
											},
											[item.label]
										)
									]
								);
							});
						},
						onEmitValue() {
							vm.filterList();
						}
					},
					tag: {
						// label: "Tags",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						once() {
							vm.$watch(
								() => vm.inject_project.all_tags,
								all_tags => {
									vm.form.tag.options = _.map(all_tags, label => ({
										value: label,
										label
									}));
								},
								{ immediate: true }
							);
						},
						onEmitValue() {
							vm.filterList();
						}
					},
					isUseBackup: {
						// label: "备份数据",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: _.map(
							[USE_BACKUP, UNUSE_BACKUP, NO_BACKUP, HAS_BACKUP],
							label => ({
								label,
								value: label
							})
						),
						onEmitValue() {
							vm.filterList();
						}
					},
					witchEnv: {
						// label: "转发环境",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						once() {
							vm.$watch(
								() => vm.APP?.cptProject?.env,
								env => {
									vm.form.witchEnv.options = _.concat(
										[{ label: "未设置", value: "unset" }],
										_.map(env, row => ({ value: row._id, label: row.name }))
									);
								},
								{ immediate: true }
							);
						},
						onEmitValue() {
							vm.filterList();
						}
					}
				})
			};

			function genHeaderCellVNode({ propName, formProp, label }) {
				return hVmSingleNode(
					vm,
					propName,
					h(
						"xPopover",
						{
							placement: "bottom",
							onShow() {
								/* 点击item，立即展示下拉项 */
								vm[`${propName}_xSelectVm`].visible = true;
							}
						},
						[
							{
								default() {
									return hxItem({
										configs: {
											...vm.form[formProp],
											refInnerComponent({ vm: xSelectVm }) {
												/* mounted之后保留句柄 */
												vm[`${propName}_xSelectVm`] = xSelectVm;
											},
											onEmitValue({ val }) {
												vm.form[formProp].value = val;
												vm.filterList();
											}
										},
										value: vm.form[formProp].value || []
									});
								},
								reference() {
									return genReferenceContent(label, vm.form[formProp]);
								}
							}
						]
					)
				);
			}
		},
		computed: {
			cptProjectMembers() {
				return this.APP.cptProject?.members || [];
			},
			cptListStyle({ size: { width, height }, cptIsShowDetail }) {
				const style = {
					width: width + "px",
					height: height + "px",
					zIndex: 1,
					transition: `all 0.3s ease-in`
				};
				if (cptIsShowDetail) {
					/* filter: blur(6px) */
					style.filter = `blur(6px)`;
					// style.transform = `translate(-50px, -50px)`;
				}

				return style;
			},
			cptDetailStyle({ size: { width, height }, cptIsShowDetail }) {
				const style = {
					transition: `all 0.3s ease-in`,
					zIndex: 2,
					position: "absolute",
					transform: `translate(120%, 0)`,
					width: `${width}px`,
					height: `${height}px`,
					position: "absolute"
				};

				if (cptIsShowDetail) {
					return _.merge(style, {
						transform: `translate(0, 0)`
					});
				}

				return style;
			},
			cptIsShowDetail() {
				return this.cptInterfaceType === "interface";
			},
			cptInterfaceType() {
				return this.$route.query.interfaceType;
			},
			cptEnvObject() {
				return _.reduce(
					this.APP?.cptProject?.env,
					(target, e) => {
						target[e._id] = e;
						return target;
					},
					{}
				);
			}
		},
		watch: {
			"inject_project.all_interface": {
				immediate: true,
				handler() {
					this.filterList();
				}
			}
		},
		methods: {
			setSize({ width, height }) {
				this.size = {
					width,
					height
				};
			},
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

					let _allInterface = _.cloneDeep(this.inject_project.all_interface);
					let paramKeys = Object.keys(filterForm);
					let prop;
					while ((prop = paramKeys.pop())) {
						let searchParams = filterForm[prop];
						if (_.$isInput(searchParams)) {
							_allInterface = _.filter(_allInterface, i => {
								if (prop == "status") {
									return searchParams.includes(i.status);
								} else if (prop == "catid") {
									return searchParams.includes(i.catid);
								} else if (prop == "method") {
									return searchParams.includes(i.method);
								} else if (prop == "tag") {
									return _.some(i.tag, tag => searchParams.includes(tag));
								} else if (prop == "uid") {
									return searchParams.includes(i.uid);
								} else if (prop == "isUseBackup") {
									const _Use = searchParams.includes(USE_BACKUP);
									const _Unuse = searchParams.includes(UNUSE_BACKUP);
									const _Use_One = _Use || _Unuse;
									const _Use_All = _Use && _Unuse;

									const _HasBackup = searchParams.includes(HAS_BACKUP);
									const _NoneBackup = searchParams.includes(NO_BACKUP);
									const _Backup_One = _NoneBackup || _HasBackup;
									const _Backup_All = _NoneBackup && _HasBackup;

									const isUse = _.isEqual(i.res_body_type, "backup");
									const isUnUse = !_.isEqual(i.res_body_type, "backup");
									const isNoBackup = !i.isSetBackupData;
									const isHasBackup = !!i.isSetBackupData;

									const isUseOne = (_Use && isUse) || (_Unuse && isUnUse);
									const isBackupOne =
										(_HasBackup && isHasBackup) || (_NoneBackup && isNoBackup);

									if (_Use_All && _Backup_All) {
										/* 四个全选，都可以 */
										return true;
									}
									if (_Use_One && _Backup_All) {
										/* 只看是否启用 */
										return isUseOne;
									}
									if (_Use_All && _Backup_One) {
										/* 只看是否有备份数据 */
										return isBackupOne;
									}
									if (_Use_One && _Backup_One) {
										return isUseOne && isBackupOne;
									}
									if (_Use_One && isUseOne) {
										return true;
									}
									if (_Backup_One && isBackupOne) {
										return true;
									}
									return false;
								} else if (prop == "witchEnv") {
									if (searchParams.includes("unset")) {
										if (!i.witchEnv) {
											return true;
										}
									}
									if (!i.isProxy) {
										return false;
									}
									return searchParams.includes(i.witchEnv);
								} else {
									searchParams = _.trim(searchParams);
									return (
										new RegExp(searchParams, "i").test(i[prop]) ||
										new RegExp(searchParams, "i").test(i.title)
									);
								}
							});
						}
					}

					const NEED_MERGE_COLUMN_PROP = "catid";

					const GroupedRowObj = _.groupBy(_allInterface, NEED_MERGE_COLUMN_PROP);

					_allInterface = xTableVirNewGroupSortedRows({
						groupedRowObj: GroupedRowObj,
						mergeProp: NEED_MERGE_COLUMN_PROP
					});

					return _allInterface;
				})();
				_.$setTableData(this.configsTable, { list: configsTableDataList });
			}
		}
	});
}
</script>
