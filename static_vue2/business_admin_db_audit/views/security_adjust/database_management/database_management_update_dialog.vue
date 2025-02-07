<template>
	<xDialog style="width: 30vw">
		<xForm col="1" ref="form">
			<xItem :configs="form.IPRange" />
			<xItem label="端口范围">
				<xItem :configs="form.startPort" />
				<x-divider style="width: 100px" class="line" />
				<xItem :configs="form.endPort" />
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
export default async function ({ row, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "database_management_dialog",
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
					IPRange: {
						value: "127.0.0.1/24",
						label: i18n("IP范围"),
						placeholder: "127.0.0.1/24",
						// _rules.isValidCIDR()
						rules: [_rules.required(), _rules.isValidCIDR()]
					},
					startPort: {
						value: 0,
						label: "",
						itemType: "xItemInput",
						rules: [
							_rules.required(),
							_rules.validator(({ val }) => {
								const reg = /^\d+$/;
								if (!reg.test(val)) {
									return "请输入数字!";
								}
								if (val < 0 || val > 65535) {
									return "请输入正确的端口号";
								}
								return "";
							})
						]
					},
					endPort: {
						value: 65535,
						itemType: "xItemInput",
						rules: [
							_rules.required(),
							_rules.validator(({ val }) => {
								const reg = /^\d+$/;
								if (!reg.test(val)) {
									return "请输入数字!";
								}
								if (val < 0 || val > 65535) {
									return "请输入正确的端口号";
								}
								return "";
							})
						]
					}
				})
			};
		},
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
				try {
					const [error] = await _.$validateForm(this.$el);
					if (error) {
						return;
					}
					_.$loading(true);
					let obj = _.$pickFormValues(this.form);
					const { code, msg } = await _api.admin_db_audit.xdsDatabaseAssetsConfig(obj);
					if (code === 0) {
						_.$msgSuccess(msg);
						parent.getTableData();
						this.closeModal();
					} else {
						_.$msgError(msg);
					}
				} catch (err) {
					console.log("err", err);
				}
				_.$loading(false);
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
