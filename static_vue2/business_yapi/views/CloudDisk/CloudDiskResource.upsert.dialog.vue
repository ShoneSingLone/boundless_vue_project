<style lang="less">
.CloudDiskResource-NewDir-dialog {
	--xItem-label-width: 80px;
}
</style>
<template>
	<xDialog class="CloudDiskResource-NewDir-dialog">
		<div class="flex1-overflow-auto">
			<xItem :configs="form.name" ref="name" />
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ makeNewDir, item, refreshList, action }) {
	const isRename = action === "RENAME";
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			await _.$ensure(() => this.$refs.name);
			setTimeout(() => {
				$(this.$refs.name.$el).find("input").focus();
			}, 1000 * 0.4);
		},
		data() {
			const vm = this;
			return {
				form: {
					name: {
						value: isRename ? item.name : "",
						clearable: true,
						label: i18n("名称"),
						rules: [_rules.required(), _rules.lessThan(50)],
						onEnter() {
							vm.btnOk.onClick();
						}
					}
				}
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						_.$loading(true);
						try {
							const [error] = await _.$validateForm(vm.$el);
							if (error) {
								return;
							}
							if (isRename) {
								await vm.rename();
							} else {
								await makeNewDir(vm.form.name.value);
							}
							vm.closeModal();
							refreshList();
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		methods: {
			async rename() {
				_.$loading(true);
				try {
					await _api.yapi.resourceCloudDiskRename({
						name: this.form.name.value,
						id: item._id
					});
					_.$msg(i18n("重命名成功"));
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
