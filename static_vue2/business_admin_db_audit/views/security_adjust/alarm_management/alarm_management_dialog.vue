<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem v-for="(value, key) of form" :label="value.label" :key="key">
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
			const mapDict = {
				strategyName: "策略名称",
				risk: "风险级别",
				status: "告警状态",
				warningDetail: "告警详情"
			};
			if (row && Object.keys(row)) {
				this.form = defItems(
					Object.keys(row).reduce((config, key) => {
						if (!Object.keys(mapDict).includes(key)) {
							return config;
						}
						config[`${key}`] = { label: mapDict[`${key}`], value: row[key] };
						if (key === "status") {
							const label =
								warringStatus.find(item => Number(item.value) === row[key])
									?.label ?? row[key];
							config[`${key}`] = { label: mapDict[`${key}`], value: label };
						}
						if (key === "risk") {
							const label =
								_opts.admin_db_audit.warringLevel.find(
									item => item.value === row[key]
								)?.label ?? row[key];
							config[`${key}`] = { label: mapDict[`${key}`], value: label };
						}
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
