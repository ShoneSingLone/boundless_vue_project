<style lang="less"></style>
<template>
	<xDialog>
		<xCard>
			<xForm ref="form" :style="labelStyle" col="1">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ categoryInfo, project_id, get_interface_list, all_category }) {
	const isUpdate = !!categoryInfo;
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			return {
				form: {
					name: {
						value: "",
						label: i18n("分类名"),
						rules: [
							_rules.required(),
							{
								validator({ val }) {
									if (
										_.some(all_category, cat => {
											return _.$isSame(cat.name, val);
										})
									) {
										return "名称重复";
									}
									return "";
								},
								trigger: ["change", "blur"]
							}
						]
					},
					desc: {
						value: "",
						label: i18n("备注"),
						rules: [_rules.required()],
						type: "textarea"
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
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
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
			init() {
				if (isUpdate) {
					_.$setFormValues(this.form, categoryInfo);
				}
			},
			async upsertOne() {
				const { name, desc } = this.cptFormData;
				try {
					if (isUpdate) {
						await _api.yapi.interfaceUpCat({
							...categoryInfo,
							catid: categoryInfo._id,
							name,
							desc
						});
					} else {
						await _api.yapi.interface_add_cat({
							project_id,
							name,
							desc
						});
					}
					await get_interface_list();
					this.closeModal();
					_.$msg(isUpdate ? "修改分类成功" : "添加分类成功");
				} catch (error) {
					if (error.message) {
						_.$msgError(error.message);
					} else {
						_.$msgError(isUpdate ? "修改分类失败" : "添加分类失败");
					}
				}
			}
		}
	});
}
</script>
