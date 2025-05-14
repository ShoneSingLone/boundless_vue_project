<style lang="less"></style>
<template>
	<xDialog style="min-height: 100px">
		<xForm ref="form" :style="labelStyle" col="1">
			<xItem :configs="form.uid" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ selected, callBack }) {
	/* 必要，混入"closeModal", "layerMax", "layerMin", "layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data(vm) {
			return {
				form: {
					uid: {
						value: "",
						label: i18n("维护人"),
						itemType: "xItemSelect",
						options: [],
						once() {
							vm.$watch(
								() => vm.cptProjectMembers,
								options => {
									this.options = _.map(options, user => {
										return {
											user,
											label: user.username,
											value: user.uid
										};
									});
								},
								{ immediate: true }
							);
						}
					}
				}
			};
		},
		computed: {
			cptProjectMembers() {
				return this.APP.cptProject?.members || [];
			},
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
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
						let id;
						while ((id = selected.pop())) {
							await vm.update(id);
						}

						vm.inject_project.get_interface_list();
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
						id: id,
						uid: this.form.uid.value
					};
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
