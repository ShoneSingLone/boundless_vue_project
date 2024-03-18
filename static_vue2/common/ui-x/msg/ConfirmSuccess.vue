<template>
	<xDialog>
		<xCard class="mt10" :header="i18n('xxxxxxxx')">
			<form ref="form" :style="labelStyle">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</form>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, callBack }) {
	const isUpdate = !!row;
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {},
		data() {
			return {
				form: {
					name: { value: "", label: i18n("名称"), rules: [_rules.required()] }
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
						this.upsertOne();
					}
				};
			}
		},
		methods: {
			init() {
				if (isUpdate) {
					_.$setValToForm(this.form, row);
				}
			},
			async upsertOne() {
				callBack && callBack(this.cptFormData);
				this.closeModal();
			}
		}
	});
}
</script>
<style lang="less"></style>
