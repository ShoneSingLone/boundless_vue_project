<style lang="less">
#ProjectInterfaceSectionInterfaceDetailEditor {
	height: 100%;
	overflow: auto;
}
</style>
<template>
	<div v-if="isShow" id="ProjectInterfaceSectionInterfaceDetailEditor" class="flex1">
		<xBlock header="基本信息">
			<xForm col="3" style="--xdesc-item-width: 140px">
				<xItem :configs="form.title" v-model="formData.title" span="full" />
				<xItem :configs="form.path" v-model="formData.path" span="full" />
				<xItem :configs="form.isProxy" v-model="formData.isProxy" />
				<xItem :configs="form.witchEnv" v-model="formData.witchEnv" />
				<xItem :configs="form.res_body_type" v-model="formData.res_body_type" span="full" />
				<xItem :configs="form.resBackupJson" v-model="formData.resBackupJson" span="full" style="--YapiItemMonaco-height: 300px" />
			</xForm>
		</xBlock>
		<xGap t />
		<xBtn :configs="btnUpdate" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_interface_section_interface_detail"],
		props: {
			detailInfo: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			const vm = this;
			return {
				isShow: true,
				formData: {},
				xItemInterface: {
					label: "接口信息",
					itemType: "YapiItemMonaco"
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
								return h("xItem", {
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
					uid: { label: i18n("uid") },
					status: { label: i18n("status") },
					updatetime: { label: i18n("updatetime") },
					tag: { label: i18n("Tag") },
					isProxy: { label: i18n("是否开启转发"), itemType: "xItemSwitch" },
					witchEnv: {
						label: i18n("转发环境"),
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
					resBackupJson: { label: i18n("备份数据"), itemType: "YapiItemMonaco" }
				})
			};
		},
		computed: {
			btnUpdate() {
				return {
					label: "更新",
					preset: "blue",
					onClick: () => {
						return this.onSubmit();
					}
				};
			}
		},
		methods: {
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
						this.inject_project.getInterfaceList();
						this.inject_interface_section_interface_detail.updateInterface();
					}
					_.$msgSuccess("修改成功");
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				handler(val) {
					this.isShow = false;
					this.formData = {
						...this.detailInfo
					};

					this.$nextTick(() => {
						this.isShow = true;
					});
				},
				immediate: true
			}
		}
	});
}
</script>
