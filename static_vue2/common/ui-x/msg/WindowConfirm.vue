<template>
	<xDialog id="WindowConfirm">
		<xRender :render="content" />
		<template #footer>
			<xRender :render="renderFooter" v-if="renderFooter" />
			<template v-else>
				<xBtn :configs="btnOk" />
				<xBtn :configs="btnCancel" />
			</template>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk, onCancel, content, renderFooter }) {
	const isUpdate = false;
	/*  */
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		data() {
			return {
				content
			};
		},
		computed: {
			renderFooter() {
				if (renderFooter) {
					return renderFooter(this);
				}
				return null;
			},
			btnOk() {
				const vm = this;
				let label = i18n("确定");
				return {
					label,
					async onClick() {
						vm.closeModal();
						onOk();
					}
				};
			},
			btnCancel() {
				const vm = this;
				let label = i18n("取消");
				return {
					label,
					/* 因为是弹出确认框，引导用户取消 */
					preset: "blue",
					async onClick() {
						vm.closeModal();
						onCancel();
					}
				};
			}
		}
	});
}
</script>

<style lang="less">
#WindowConfirm {
	min-width: unset;
}
</style>
