<style lang="less">
.YapiNoteAddTips {
	padding: 0;
	.xDialog-body {
		padding-top: 0;
	}
}
</style>
<template>
	<xDialog style="--xItem-label-width: 38px; width: 400px">
		<xForm ref="form" col="1" class="no-gap">
			<xItem :configs="form.title" span="full" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel" />
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ parentDocId, belong_type, belong_id, hide }) {
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
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
					preset: "blue",
					onClick: async () => {
						const [atLeastOne] = await _.$validateForm(vm.$el);
						if (atLeastOne) {
							return;
						}
						_.$loading(true);
						try {
							const params = {
								title: vm.form.title.value,
								type: Vue._yapi_var.ARTICLE,
								p_id: vm.pid,
								belong_type: belong_type || "all",
								belong_id: belong_id
							};
							const res = await _api.yapi.wiki_upsert_one(params);
							if (!res.errcode) {
								await vm.inject_note.updateWikiMenuList();
								await vm.inject_note.setCurrentWiki(res.data.msg);
								vm.closeModal();
							}
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: i18n("cancel"),
					async onClick() {
						vm.closeModal();
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
