<template>
	<xDialog id="WindowConfirm" :style="cptStyle">
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
export default async function ({ resolve, reject, content, renderFooter, style }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		data() {
			return {
				content
			};
		},
		computed: {
			cptStyle() {
				if (style) {
					return style;
				} else {
					return { "--xDialog-wrapper-width": "300px" };
				}
			},
			renderFooter() {
				if (renderFooter) {
					return renderFooter(this);
				}
				return null;
			},
			btnOk() {
				const vm = this;
				let label = i18n("ok");
				return {
					label,
					async onClick() {
						vm.closeModal();
						resolve();
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: i18n("cancel"),
					/* 因为是弹出确认框，引导用户取消 */
					preset: "blue",
					async onClick() {
						vm.closeModal();
						reject();
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
