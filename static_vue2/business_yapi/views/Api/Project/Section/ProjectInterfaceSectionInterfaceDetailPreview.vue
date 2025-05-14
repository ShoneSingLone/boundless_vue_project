<style lang="less">
#ProjectInterfaceSectionInterfaceDetailPreviewForm {
	.xItemDesc-wrapper {
		padding: 0;
	}
	.backup-response {
		&.xItemDesc-wrapper {
			height: 100%;
			display: flex;
			align-items: flex-start;
			position: relative;

			.xItemDesc-wrapper_content {
				height: 100%;
				position: absolute;
				overflow: visible;
				overflow-x: visible;
				left: var(--xItem-label-width, 120px);
				right: 0;
				width: unset;
				.markdown-wrapper,
				.markdown-wrapper_description {
					height: 100%;
					* {
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div class="flex1-overflow-auto">
		<div class="mb flex end">
			<xBtnArray :configs="oprBtnArray" />
		</div>
		<xCard header="基本信息">
			<xForm
				style="--xItem-label-width: 100px"
				id="ProjectInterfaceSectionInterfaceDetailPreviewForm">
				<xItemDesc :item="cptDescItems.接口名称" span="full" />
				<xItemDesc :item="cptDescItems.接口" span="full" />
				<xItemDesc :item="cptDescItems.状态" />
				<xItemDesc :item="cptDescItems.更新时间" />
				<xItemDesc :item="cptDescItems.维护人" />
				<xItemDesc :item="cptDescItems.分类" />
				<xItemDesc :item="cptDescItems.Tag" span="full" />
				<xItemDesc :item="cptDescItems.code" />
				<xItemDesc :item="cptDescItems.备份response" class="backup-response" />
				<xItemDesc :item="cptDescItems.useProxy" span="full" />
			</xForm>
			<!-- <pre>
				<code>
					{{ interfaceInfo }}
				</code>
			</pre> -->
		</xCard>
		<xGap t />
		<xCard header="请求">
			<xCard header="ReqHeaders">
				<xForm col="1" style="--xItem-label-width: 100px">
					<!-- cptHeadersParams:{{ cptHeadersParams }} -->
					<YapiApiRequestBodyPreviewer :item="cptHeadersParams" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="ReqBody">
				<xForm col="1" style="--xItem-label-width: 100px">
					<!-- sourceReqBodyOther:{{ sourceReqBodyOther }} -->
					<PanelReqBodyJson :value="req_body_other" :readonly="true" />
					<!-- <YapiApiRequestBodyPreviewer :item="sourceReqBodyOther" /> -->
				</xForm>
			</xCard>
		</xCard>
		<xGap t />
		<xCard header="描述">
			<TuiEditor :value="{ md: interfaceInfo.desc }" :asRender="true" style="height: 400px" />
		</xCard>
		<!-- <xCard header="源数据">
	<xForm col="1" style="--xItem-label-width: 100px">
		<xItem :configs="form.source" />
	</xForm>
</xCard> -->
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_interface_section_interface_detail", "inject_project"],
		props: ["interfaceInfo"],
		components: {
			PanelReqBodyJson: () => _.$importVue("@/components/PanelReqBodyJson.vue")
		},
		data() {
			return {
				req_body_other: "",
				sourceReqHeaders: [],
				sourceReqBodyOther: {},
				form: defItems({
					source: {
						label: i18n("源数据"),
						itemType: "xItemMonaco",
						readOnly: true,
						value: ""
					}
				})
			};
		},
		computed: {
			oprBtnArray() {
				const vm = this;
				return [
					{
						label: i18n("复用接口"),
						onClick() {
							_.$openModal({
								title: i18n("复制接口到所选项目"),
								url: "@/components/YapiCoypInterface.dialog.vue",
								parent: vm,
								selected: [vm.interfaceInfo._id]
							});
						}
					}
				];
			},
			cptHeadersParams() {
				if (this.sourceReqHeaders.length) {
					return _.reduce(
						this.sourceReqHeaders,
						(target, item) => {
							const { name, required, desc } = item;
							if (required === "1") {
								target.required.push(name);
							}
							target.properties[name] = {
								type: "string",
								desc
							};
							return target;
						},
						{
							type: "object",
							required: [],
							properties: {}
						}
					);
				}
			},
			cptBackupData() {
				const { resBackupJson } = this.interfaceInfo;
				if (resBackupJson) {
					return `\`\`\`json\n${resBackupJson}\n\`\`\``;
				} else {
					return "";
				}
			},
			cptClientReqCode() {
				try {
					const fn = new Function("params", `return (${this.cptRequestCode})(params)`);
					const { title, _id, up_time, path, tag, isProxy, witchEnv, method } =
						this.interfaceInfo;

					if (!path) {
						return "";
					}

					return fn({
						title,
						path,
						method,
						groupId: this.APP.cptGroupId,
						projectId: this.APP.cptProjectId,
						interfaceId: _id,
						camelCase: _.camelCase
					});
				} catch (error) {
					return error.message;
				}
			},
			cptRequestCode() {
				if (this.APP.cptProject.requestCode) {
					return this.APP.cptProject.requestCode;
				} else {
					return Vue._common_utils.RequestCode.toString();
				}
			},
			cptDescItems() {
				const vm = this;
				const { title, uid, up_time, path, tag, isProxy, witchEnv, method, catid } =
					this.interfaceInfo || {};

				/* @ts-ignore */
				const { protocol, hostname, port } = location;
				const apiURL = String(`${this.APP.cptProject?.basepath || ""}${path}`).replace(
					/\/\//g,
					"/"
				);
				const mockHref = `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.APP?.cptProject?._id}${apiURL}`;

				return {
					接口名称: {
						label: i18n("接口名称"),
						xItemRender() {
							return hDiv(
								{
									style: {
										"font-size": "16px",
										"font-weight": 500,
										"text-shadow": "0px 1px 0px rgba(255, 255, 255, 0.2)"
									}
								},
								[title || "--"]
							);
						}
					},
					分类: {
						label: i18n("分类"),
						xItemRender() {
							return hxBtn({
								configs: {
									preset: "text",
									label: _.$val2L(catid, vm.inject_project.all_category),
									onClick() {
										vm.APP.routerUpsertQuery({
											interfaceId: catid,
											interfaceType: "category"
										});
									}
								}
							});
						}
					},
					维护人: {
						label: i18n("维护人"),
						value: uid || "--",
						xItemRender: () => {
							const user = _.find(vm.APP.all_user, user => {
								return user.uid === uid;
							});
							return h("xTag", { class: "mr" }, [user?.username || uid]);
						}
					},
					状态: { label: i18n("status_info"), value: status || "--" },
					更新时间: {
						label: i18n("更新时间"),
						value: up_time || "--",
						xItemRender: () => {
							return _.$dateFormat(up_time);
						}
					},
					接口: {
						label: i18n("接口"),
						xItemRender: () => {
							/*
							const vDomMockHref = (() => {
								const btnProps = {
									class: "ml",
									configs: {
										preset: "blue",
										label: "测试",
										onClick() {
											return vm.runInterefaceTestDialog({
												mockHref,
												reqMethod: method
											});
										}
									}
								};
								return hDiv({ class: "mt" }, [
									h("xTag", { class: "mr" }, ["mock地址"]),
									hSpan([mockHref]),
									hxBtn(btnProps)
								]);
							})();
							return hDiv([
								hDiv([h("xTag", { class: "mr" }, [method]), hhSpan([path])]),
								vDomMockHref
							]);
							*/
							return hDiv([h("xTag", { class: "mr" }, [method]), hSpan([path])]);
						}
					},
					code: {
						label: i18n("Client Code"),
						value: path || "--",
						xItemRender: () => {
							return h("xMd", {
								id: "cptClientReqCode",
								md: this.cptClientReqCode,
								class: "pointer",
								nativeOn: {
									click: async () => {
										/* https://www.cnblogs.com/hellxz/p/15192573.html */
										return _.$copyToClipboard($("#cptClientReqCode").text())
											.then(() => _.$msg("复制成功"))
											.catch(error => _.$msgError(error));
									}
								}
							});
						}
					},
					备份response: {
						label: i18n("BackupJSON"),
						value: path || "--",
						xItemRender: () => {
							return "";
							return hDiv(this.cptBackupData);
							if (this.cptBackupData) {
								return h("xMd", { md: this.cptBackupData });
							} else {
								return hDiv(this.cptBackupData);
							}
						}
					},
					Tag: {
						label: i18n("Tag"),
						value: tag || "--",
						xItemRender: () => _.map(tag, i => h("xTag", { class: "mr" }, [i]))
					},
					useProxy: {
						label: i18n("请求Proxy"),
						value: isProxy || "--",
						xItemRender: () => {
							if (isProxy) {
								const env = _.find(this.APP?.cptProject?.env, { _id: witchEnv });
								return hDiv([
									h("xTag", { class: "mr" }, [env.name]),
									hSpan([env.domain])
								]);
							} else {
								return "否";
							}
						}
					}
				};
			}
		},
		watch: {
			interfaceInfo: {
				handler(val) {
					if (val) {
						const source = _.cloneDeep(val);
						this.sourceReqHeaders = source.req_headers || [];
						try {
							if (!source?.req_body_other) {
								return;
							}
							if (source.req_body_type === "json") {
								this.sourceReqBodyOther = JSON.parse(source.req_body_other);
								this.req_body_other = source.req_body_other;
							}
							this.form.source.value = JSON.stringify(source, null, 2);
						} catch (error) {
							_.$msgError(error);
						}
					}
				},
				immediate: true
			}
		},
		methods: {
			runInterefaceTestDialog({ mockHref, reqMethod }) {
				return _.$openModal(
					{
						title: i18n("测试"),
						url: "@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailPreview.TestInterface.dialog.vue",
						parent: this,
						mockHref,
						reqMethod,
						interfaceId: this.interfaceInfo._id,
						projectId: this.APP.cptProject._id
					},
					{
						fullscreen: true
					}
				);
			}
		}
	});
}
</script>
