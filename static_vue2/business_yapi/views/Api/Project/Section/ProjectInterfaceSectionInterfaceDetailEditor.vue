<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditor {
	height: 1px;
	overflow: hidden;
}
</style>
<template>
	<div
		v-if="isShow"
		id="ProjectInterfaceSectionInterfaceDetailEditor"
		class="flex flex1 vertical">
		<div class="flex1 height100 overflow-auto" ref="refWrapper">
			<xCard style="--xItem-label-width: 140px">
				<xForm col="3">
					<xItem :configs="form.title" v-model="formData.title" span="full" />
					<xItem :configs="form.path" v-model="formData.path" span="full" />
					<xItem
						:configs="form.pathParams"
						v-model="cptFormDataReqParams"
						span="full"
						class="mt" />
				</xForm>
				<xGap t />
				<xForm col="3">
					<!-- {{ formData }} -->
					<!-- <div>formData.req_body_type:{{ formData.req_body_type }}</div> -->
					<!-- <div>formData.req_body_form:{{ formData.req_body_form }}</div> -->
					<!-- <pre>
					<code>
						<div>formData.req_body_other:{{ formData.req_body_other }}</div>
					</code>
				</pre> -->
					<xItem
						:configs="form.req_body_params"
						v-model="formData.req_body_params"
						:reqQuery.sync="formData.req_query"
						:reqBodyType.sync="formData.req_body_type"
						:reqBodyForm.sync="formData.req_body_form"
						:reqBodyOther.sync="formData.req_body_other"
						span="full" />
				</xForm>
				<xGap t />
				<xForm col="3">
					<xItem :configs="form.isProxy" v-model="formData.isProxy" span="full" />
				</xForm>
				<xDivider>响应参数</xDivider>
				<xForm col="3">
					<xItem
						:configs="form.res_body_type"
						v-model="formData.res_body_type"
						span="full" />
					<xItem
						:configs="form.resBackupJson"
						v-model="cptFormDataResBackupJson"
						span="full"
						style="--xItemMonaco-height: 300px" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="描述">
				<TuiEditor
					:value="{ md: formData.desc || '' }"
					:asRender="false"
					style="height: 400px"
					@change="onMarkdownChange" />
			</xCard>
		</div>
		<xGap t />
		<div class="flex middle center">
			<xBtn :configs="cptBtnUpdate" />
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
		async mounted() {
			await _.$ensure(() => this.$refs.refWrapper);
			this.$refs.refWrapper.scrollTop = 0;
		},
		data() {
			const vm = this;
			return {
				activeNames: ["response", "request"],
				isShow: true,
				formData: {},
				xItemInterface: {
					label: "接口信息",
					itemType: "xItemMonaco"
				},
				form: defItems({
					method: {
						itemType: "xItemSelect",
						options: _opts.yapi.httpMethod
					},
					catid: {
						label: i18n("接口分类"),
						rules: [_rules.required()],
						options: [],
						itemType: "xItemSelect"
					},
					title: {
						label: i18n("接口名称"),
						rules: [_rules.required()]
					},
					path: {
						label: i18n("接口路径"),
						rules: [_rules.required()],
						tips: "path第一位必需为 /, 只允许由 字母数字-/_:.! 组成",

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
					},
					pathParams: {
						itemType: "YapiItemPathParams",
						label: i18n("路径参数"),
						isHide() {
							return !vm.cptFormDataReqParams.length;
						},
						once() {
							/* 当path发生改变，重新分析路径里面的参数项 */
							vm.$watch(
								"formData.path",
								val => {
									let reqParams = [];
									let insertParams = name => {
										if (!name) return;
										let findExist = _.find(vm.formData.req_params, {
											name: name
										});
										if (findExist) {
											reqParams.push(findExist);
										} else {
											reqParams.push({ name: name, desc: "", example: "" });
										}
									};

									const type1 = () => {
										/* /:id */
										if (val && val.indexOf(":") !== -1) {
											let paths = val.split("/"),
												name,
												i;
											for (i = 1; i < paths.length; i++) {
												if (paths[i][0] === ":") {
													name = paths[i].substr(1);
													insertParams(name);
												}
											}
										}
									};
									const type2 = () => {
										/* /{id} */
										if (val && val.length > 3) {
											val.replace(/\{(.+?)\}/g, function (str, match) {
												insertParams(match);
											});
										}
									};

									type1();
									type2();

									vm.cptFormDataReqParams = reqParams;
								},
								{ immediate: true }
							);
						}
					},
					req_body_params: {
						label: i18n("请求参数"),
						itemType: "yapiItemReqBodyParams"
					},
					uid: { label: i18n("uid") },
					status: { label: i18n("status") },
					updatetime: { label: i18n("updatetime") },
					tag: { label: i18n("Tag") },
					isProxy: {
						label: i18n("启用Proxy"),
						itemType: "xItemSwitch",
						itemSlots: {
							afterController() {
								if (vm.formData.isProxy) {
									return hxItem({
										style: "--xItem-label-width:80px",
										configs: vm.form.witchEnv,
										value: vm.formData.witchEnv,
										onChange(val) {
											vm.formData.witchEnv = val;
										}
									});
								} else {
									return hDiv({ style: "height:32px" });
								}
							}
						}
					},
					witchEnv: {
						label: i18n("转发到"),
						itemType: "YapiItemProxyEnv"
					},
					res_body_type: {
						label: i18n("响应类型"),
						itemType: "xItemRadioGroup",
						minWidth: 80,
						tips: `如果没有使用转发，选择备份会直接返回备份的JSON数据`,
						options: [
							{ label: "备份", value: "backup" },
							{ label: "form", value: "form", isForm: true },
							{ label: "json", value: "json" },
							{ label: "file", value: "file" },
							{ label: "raw", value: "raw" }
						]
					},
					resBackupJson: {
						label: i18n("备份数据"),
						itemType: "xItemMonaco"
					}
				})
			};
		},
		computed: {
			cptFormDataResBackupJson: {
				get() {
					return this.formData.resBackupJson || "";
				},
				set(req_params) {
					this.formData.resBackupJson = req_params;
					return true;
				}
			},
			cptFormDataReqParams: {
				get() {
					return this.formData.req_params || [];
				},
				set(req_params) {
					this.formData.req_params = req_params;
					return true;
				}
			},
			cptBtnUpdate() {
				return {
					label: "更新",
					preset: "blue",
					onClick: () => this.onSubmit()
				};
			}
		},
		methods: {
			onMarkdownChange({ md }) {
				this.formData.desc = md;
			},
			async onSubmit() {
				const [atLeastOne] = await _.$validateForm(this.$el);
				if (atLeastOne) {
					return;
				}
				_.$loading(true);
				try {
					const formData = this.formData;
					const { data } = await _api.yapi.interface_up(formData);
					if (data) {
						this.inject_project.get_interface_list();
						this.inject_interface_section_interface_detail.updateInterface();
					}
					_.$msg("修改成功");
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				immediate: true,
				handler(val) {
					this.isShow = false;
					this.$nextTick(() => {
						this.formData = {
							...this.interfaceInfo
						};
						console.log("🚀 ~ this.$nextTick ~ this.formData:", this.formData);
						this.$nextTick(() => {
							this.isShow = true;
						});
					});
				}
			}
		}
	});
}
</script>
