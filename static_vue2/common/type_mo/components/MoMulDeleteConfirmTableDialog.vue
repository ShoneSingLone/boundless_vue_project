<template>
	<xDialog id="MoMulDeleteConfirmTableDialog">
		<xBlock class="mt10">
			<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
		</xBlock>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ tableConfigs, onEnsure }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {},
		data() {
			return {
				configsTable: tableConfigs
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
						this.onOk();
					}
				};
			}
		},
		methods: {
			async onOk() {
				onEnsure && onEnsure({ dialogVm: this });
			}
		}
	});
}
</script>
<style lang="less">
#MoMulDeleteConfirmTableDialog {
	.el-card__body {
		height: 400px;
	}
}
</style>
