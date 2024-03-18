<style lang="less"></style>
<template>
	<div class="flex1-overflow-auto">
		<xCard header="基本信息">
			<xForm col="3" style="--xdesc-item-width: 100px">
				<xDescItem v-for="(item, index) in cptDescItems" :key="index" :item="item" :span="item.span || 1" />
			</xForm>
		</xCard>
		<xGap t />
		<xCard header="请求">
			<xCard header="ReqHeaders">
				<xForm col="1" style="--xdesc-item-width: 100px">
					<YapiApiRequestBodyPreviewer :item="cptHeadersParams" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="ReqBody">
				<xForm col="1" style="--xdesc-item-width: 100px">
					<YapiApiRequestBodyPreviewer :item="sourceReqBodyOther" />
				</xForm>
			</xCard>
		</xCard>
		<xGap t />
		<!-- 
<xCard header="源数据">
	<xForm col="1" style="--xdesc-item-width: 100px">
		<xItem :configs="form.source" />
	</xForm>
</xCard> 
-->
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_interface_section_interface_detail"],
		data() {
			return {
				sourceReqHeaders: [],
				sourceReqBodyOther: {},
				form: defItems({
					source: {
						label: i18n("源数据"),
						itemType: "YapiItemMonaco",
						readOnly: true,
						value: ""
					}
				})
			};
		},
		computed: {
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
				const { resBackupJson } = this.cptInfo;
				return `\`\`\`json
${resBackupJson}
\`\`\`
`;
			},
			cptCode() {
				try {
					const fn = new Function("params", `return (${this.cptRequestCode})(params)`);
					const { title, _id, up_time, path, tag, isProxy, witchEnv, method } = this.cptInfo;

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
					return Vue._yapi_utils.RequestCode.toString();
				}
			},
			cptInfo() {
				return this.inject_interface_section_interface_detail.detailInfo || {};
			},
			cptDescItems() {
				const vm = this;
				const { title, uid, up_time, path, tag, isProxy, witchEnv, method } = this.cptInfo;
				console.log("🚀 ~ cptDescItems ~  title, uid, up_time, path, tag, isProxy, witchEnv :", title, uid, up_time, path, tag, isProxy, witchEnv);

				/* @ts-ignore */
				const { protocol, hostname, port } = location;
				const apiURL = String(`${this.APP.cptProject?.basepath || ""}${path}`).replace(/\/\//g, "/");
				const mockHref = `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.APP.cptProject._id}${apiURL}`;

				return [
					{ label: i18n("接口名称"), value: title || "--" },
					{
						label: i18n("维护人"),
						value: uid || "--",
						readonlyAs: () => {
							const user = _.find(vm.APP.allUser, user => {
								return user.uid === uid;
							});
							return h("xTag", { class: "mr" }, [user?.username || uid]);
						}
					},
					{ label: i18n("状态"), value: status || "--" },
					{
						label: i18n("更新时间"),
						value: up_time || "--",
						readonlyAs: () => {
							return _.$dateFormat(up_time);
						}
					},
					{
						label: i18n("接口"),
						value: path || "--",
						span: "full",
						readonlyAs: () => {
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
								return h("div", { class: "mt" }, [h("xTag", { class: "mr" }, ["mock地址"]), h("span", [mockHref]), h("xBtn", btnProps)]);
							})();
							return h("div", [h("div", [h("xTag", { class: "mr" }, [method]), h("span", [path])]), vDomMockHref]);
						}
					},
					{
						label: i18n("code"),
						value: path || "--",
						span: "full",
						readonlyAs: () => {
							return h("xMd", {
								id: "cptCode",
								md: this.cptCode,
								class: "pointer",
								nativeOn: {
									click: async () => {
										try {
											/* https://www.cnblogs.com/hellxz/p/15192573.html */
											await _.$copyToClipboard($("#cptCode").text());
											_.$msgSuccess("复制成功");
										} catch (error) {
											console.error(error);
											debugger;
											_.$msgError("复制失败");
										}
									}
								}
							});
						}
					},
					{
						label: i18n("备份response"),
						value: path || "--",
						span: "full",
						readonlyAs: () => {
							return h("xMd", { md: this.cptBackupData });
						}
					},
					{
						label: i18n("Tag"),
						span: "full",
						value: tag || "--",
						readonlyAs: () => _.map(tag, i => h("xTag", { class: "mr" }, [i]))
					},
					{
						label: i18n("是否开启转发"),
						value: isProxy || "--",
						span: "full",
						readonlyAs: () => {
							if (isProxy) {
								const env = _.find(this.APP.cptProject.env, { _id: witchEnv });
								return h("div", [h("xTag", { class: "mr" }, [env.name]), h("span", [env.domain])]);
							} else {
								return "否";
							}
						}
					}
				];
			}
		},
		watch: {
			cptInfo: {
				handler(val) {
					if (val) {
						const source = _.cloneDeep(val);
						this.sourceReqHeaders = source.req_headers || [];
						try {
							if (!source?.req_body_other) {
								return;
							}
							this.sourceReqBodyOther = JSON.parse(source.req_body_other);
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
			async runInterefaceTestDialog({ mockHref, reqMethod }) {
				const DialogTypeVueSFC = await _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailPreview.TestInterface.dialog.vue", {
					parent: this,
					mockHref,
					reqMethod,
					interfaceId: this.cptInfo._id,
					projectId: this.APP.cptProject._id
				});
				_.$openWindow_deprecated(i18n("测试"), DialogTypeVueSFC, {
					maxmin: true,
					fullscreen: true
				});
			}
		}
	});
}
</script>
