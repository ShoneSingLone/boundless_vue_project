<template>
	<xDialog style="width: 70vw">
		<probe_management style="height: 600px" :dialog="true" ref="probeManagementRef" />
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
export default async function ({ row, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "database_management_dialog",
		props: useDialogProps(),
		components: {
			probe_management: () =>
				_.$importVue("@/views/security_adjust/probe_management/probe_management.vue")
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.handleBindxdsDatabaseAssetsPage();
					}
				};
			}
		},
		methods: {
			async handleBindxdsDatabaseAssetsPage() {
				if (Object.keys(this.$refs.probeManagementRef.selected).length <= 0) {
					return _.$msgError(i18n("请选择探针"));
				}
				const obj = {
					...row,
					agentId: this.$refs.probeManagementRef.selected.id
				};
				const { code, msg } = await _api.admin_db_audit.xdsDatabaseAssetsPage(obj);
				if (code === 0) {
					_.$msg(msg);
					parent.getTableData();
					this.closeModal();
				} else {
					_.$msgError(msg);
				}
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
