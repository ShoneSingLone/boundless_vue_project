<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.ip" />
			<xItem :configs="form.port" />
			<xItem :configs="form.userName" />
			<xItem :configs="form.password" />
			<xItem :configs="form.fileDirectory" />
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
				form: defItems({
					ip: {
						label: "主机",
						value: "",
						rules: [
							_rules.required(),
							_rules.lessThan(30),
							_rules.ipV4("请输入正确的IP地址")
						]
					},
					port: {
						label: "端口",
						value: "22",
						rules: [_rules.required(), _rules.lessThan(30), _rules.port165535()]
					},
					userName: {
						label: "用户名",
						value: "",
						rules: [_rules.required(), _rules.lessThan(30)]
					},
					password: {
						label: "密码",
						value: "",
						rules: [_rules.required(), _rules.lessThan(30)]
					},
					fileDirectory: {
						label: "文件路径",
						value: "",
						rules: [_rules.required(), _rules.lessThan(30)]
					}
				})
			};
		},
		computed: {
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
		mounted() {},
		methods: {
			async onClickOk() {
				try {
					const [error] = await _.$validateForm(this.$el);
					if (error) {
						return;
					}
					_.$loading(true);
					let obj = _.$pickFormValues(this.form);
					const { code, msg } = await _api.admin_db_audit.xdsAuditLogSend2end(obj);
					if (code === 0) {
						_.$msgSuccess(msg);
						this.closeModal();
						parent.getTableData({ page: 1 });
					} else {
						_.$msgError(msg);
					}
					_.$loading(false);
				} catch (err) {
					console.log("err", err);
				}
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
