<style lang="less"></style>
<template>
	<xDialog style="min-height: 100px">
		<xAlert :closable="false"
			>已选择接口数量{{ selected.length }}:已处理接口数量{{ handledCount }}</xAlert
		>
		<xForm ref="form" :style="labelStyle" col="2">
			<xItem :configs="form.tag" span="full" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnAdd" />
			<xBtn :configs="btnRemove" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ selected, allInterface }) {
	/* 必要，混入"closeModal", "layerMax", "layerMin", "layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP", "inject_project"],
		props: useDialogProps(),
		data(vm) {
			return {
				handledCount: 0,
				selected,
				form: {
					tag: {
						label: "需要新增或移除的Tags",
						value: [],
						clearable: true,
						itemType: "xItemSelect",
						multiple: true,
						options: [],
						attrs: { allowCreate: true },
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
						}
					}
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnAdd() {
				const vm = this;
				return {
					label: i18n("添加"),
					preset: "primary",
					async onClick() {
						let id;
						while ((id = selected.pop())) {
							await vm.actionWith(id, "add");
							vm.handledCount++;
						}

						vm.inject_project.get_interface_list();
						vm.closeModal();
					}
				};
			},
			btnRemove() {
				const vm = this;
				return {
					label: i18n("移除"),
					preset: "primary",
					async onClick() {
						let id;
						while ((id = selected.pop())) {
							await vm.actionWith(id, "remove");
							vm.handledCount++;
						}

						vm.inject_project.get_interface_list();
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			async actionWith(id, action) {
				_.$loading(true);
				try {
					const params = {
						id
					};
					const interfaceInfo = _.find(allInterface, { _id: id });
					if (interfaceInfo) {
						const tag = interfaceInfo.tag;
						if (action === "add") {
							params.tag = _.union(tag, this.cptFormData.tag);
						} else {
							params.tag = _.difference(tag, this.cptFormData.tag);
						}
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
