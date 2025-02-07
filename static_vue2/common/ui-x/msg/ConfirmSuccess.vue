<template>
	<xDialog>
		<xCard class="mt10" :header="i18n('名称')">
			<xForm col="1" ref="form" :style="labelStyle">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</xForm>
		</xCard>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
			</div>
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
					name: {
						value: "",
						label: i18n("名称"),
						rules: [_rules.required(), _rules.lessThan(64)]
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
					_.$setFormValues(this.form, row);
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
