<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem v-for="(value, key) of form" :label="key" :key="key">
				{{ value.value }}
			</xItem>
		</xForm>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>

<script>
export default async function ({ row, warringStatus, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "alarm_management_dialog",
		props: useDialogProps(),
		data() {
			return {
				form: {}
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.closeModal();
					}
				};
			}
		},
		mounted() {
			if (row && Object.keys(row)) {
				this.form = defItems(
					Object.keys(row).reduce((config, key) => {
						config[`${key}`] = { label: key, value: row[key] };
						return config;
					}, {})
				);
			}
		}
	};
}
</script>

<style scoped lang="less">
.mess {
	font-weight: 400;
	font-size: 14px;
	color: #333333;
}
</style>
