<template>
	<xDialog style="min-width: 600px">
		<!-- '--xItem-label-width': "144px" -->
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<xCard class="mt10">
			<xForm ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" span="full" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function (payload) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			const vm = this;
			return {
				form: {
					name: { value: "", label: i18n("名asdfasf称") }
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cpt_formData() {
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				this.closeModal();
			}
		}
	});
}
</script>

<style lang="less"></style>
