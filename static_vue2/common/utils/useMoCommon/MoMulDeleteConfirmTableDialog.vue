<template>
	<xDialog id="MoMulDeleteConfirmTableDialog">
		<xBlock class="mt10">
			<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
		</xBlock>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
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
