<style lang="less"></style>
<template>
	<xDialog style="--xDialog-wrapper-width: 400px; --xItem-label-width: 34px">
		<xForm ref="form" col="1">
			<xItem :configs="form.title" span="full" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ parentDocId, belong_type, belong_id }) {
	/* 必要，混入"closeModal", "layerMax", "layerMin", "layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_note"],
		props: useDialogProps(),
		data() {
			return {
				form: {
					title: {
						value: "",
						label: i18n("标题"),
						placeholder: i18n("文档名称"),
						rules: [_rules.required()]
					}
				}
			};
		},
		computed: {
			pid() {
				return parentDocId || 0;
			},
			belong_type() {
				return this.propOptions.belong_type || "all";
			},
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					onClick: async () => {
						const [atLeastOne] = await _.$validateForm(this.$el);
						if (atLeastOne) {
							return;
						}
						_.$loading(true);
						try {
							const params = {
								title: this.form.title.value,
								type: Vue._yapi_var.ARTICLE,
								p_id: this.pid,
								belong_type,
								belong_id
							};
							const res = await _api.yapi.wikiUpsertOne(params);
							if (!res.errcode) {
								await this.inject_note.updateWikiMenuList();
								await this.inject_note.setCurrentWiki(res.data.msg);
								this.closeModal();
							}
						} catch (error) {
							_.$msgError("修改失败");
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		methods: {
			async update(id) {
				_.$loading(true);
				try {
					const params = {
						id
					};

					if (this.cptFormData.isProxy) {
						params.isProxy = true;
						params.witchEnv = this.cptFormData.witchEnv;
					} else {
						params.isProxy = false;
						params.res_body_type = this.cptFormData.res_body_type;
					}

					return await _api.yapi.interface_up(params);
				} catch (error) {
					_.$msgError("修改失败");
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
