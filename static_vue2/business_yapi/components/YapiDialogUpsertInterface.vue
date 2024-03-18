<style lang="less"></style>
<template>
	<xDialog>
		<xCard>
			<xForm ref="form" :style="labelStyle" col="1">
				<xItem :configs="form.catid" />
				<xItem :configs="form.title" />
				<xItem :configs="form.path" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ categoryInfo, project_id, getInterfaceList }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data() {
			const vm = this;
			return {
				form: {
					apiMethod: {
						value: "GET",
						itemType: "xItemSelect",
						options: _opts.yapi.httpMethod
					},
					catid: {
						value: "",
						label: i18n("接口分类"),
						rules: [_rules.required()],
						options: [],
						itemType: "xItemSelect",
						once() {
							this.options = vm.inject_project.allCategory;
							/* 默认在点击的分类下添加新接口 */
							if (categoryInfo?._id) {
								this.value = categoryInfo?._id;
							} else {
								this.value = _.first(this.options).value;
							}
						}
					},
					title: { value: "", label: i18n("接口名称"), rules: [_rules.required()] },
					path: {
						value: "",
						label: i18n("接口路径"),
						rules: [_rules.required()],
						tips: "path第一位必需为 /, 只允许由 字母数字-/_:.! 组成",
						$vSlots: {
							prepend() {
								return h("xItem", { configs: vm.form.apiMethod, style: `--xItem-wrapper-width:106px` });
							}
						}
					}
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "100px"
				};
			},
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [error] = await _.$validateForm(vm.$refs.form);
						if (error) {
							return;
						}
						vm.upsertOne();
					}
				};
			}
		},
		methods: {
			async upsertOne() {
				const { catid, title, path, apiMethod } = this.cptFormData;
				try {
					const res = await _api.yapi.interface_add({
						project_id,
						catid,
						title,
						path,
						method: apiMethod
					});
					debugger;
					await getInterfaceList();
					this.closeModal();
					_.$msgSuccess("添加接口成功");
				} catch (error) {
					_.$msgError(error?.message || "添加接口失败");
				}
			}
		}
	});
}
</script>
