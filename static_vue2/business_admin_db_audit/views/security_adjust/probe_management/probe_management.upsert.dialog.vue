<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.deptId" />
			<xItem :configs="form.databaseType" />
			<xItem :configs="form.databaseIP" />
			<xItem :configs="form.port" />
			<xItem :configs="form.databaseName" />
			<xItem :configs="form.databaseUsername" v-if="form.databaseType.value !== 'redis'" />
			<xItem :configs="form.databasePassword" v-if="form.databaseType.value !== 'redis'" />
			<xItem :configs="form.description" />
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
<script lang="ts">
export default async function ({ row }) {
	const isUpdate = false && !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
					databaseName: {
						value: "",
						label: i18n("数据库名"),
						disabled: isUpdate
					},
					databaseType: {
						value: "",
						label: i18n("数据库类型"),
						disabled: isUpdate,
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()]
					},
					deptId: {
						value: "",
						label: i18n("部门"),
						disabled: isUpdate,
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()]
					},
					databaseIP: {
						value: "",
						label: i18n("IPV4"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.ipV4()]
					},
					port: {
						value: "",
						label: i18n("端口号"),
						disabled: isUpdate,
						isNumber: true,
						rules: [_rules.required()]
					},
					databaseUsername: {
						value: "",
						label: i18n("数据库用户名"),
						disabled: isUpdate
					},
					databasePassword: {
						value: "",
						label: i18n("数据库用户密码"),
						disabled: isUpdate,
						isPwd: true
					},
					description: {
						value: "",
						label: i18n("探针描述"),
						type: "textarea",
						disabled: isUpdate
					}
				})
			};
		},
		computed: {
			isUpdate() {
				return !!row;
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
		async mounted() {
			if (row && Object.keys(row).length > 0) {
				this.form.databaseName.value = row.databaseName;
				this.form.databaseType.value = row.databaseType;
				this.form.databaseIP.value = row.databaseIP;
				this.form.port.value = row.port;
				this.form.deptId.value = row.deptId;
				this.form.databaseUsername.value = row.databaseUsername;
				this.form.databasePassword.value = row.databasePassword;
				this.form.description.value = row.description;
			}
			await this.handleGetOptionsDatabaseType();
			await this.handleGetOptionsDepartment();
		},
		methods: {
			async handleGetOptionsDatabaseType() {
				this.form.databaseType.options = await _api.admin_db_audit.xdsOptionsDatabaseType();
			},
			async handleGetOptionsDepartment() {
				const { data = [] } = await _api.admin_db_audit.xdsDepartmentPage();
				const [departmentList] = data;
				this.form.deptId.options =
					departmentList?.children?.map?.(item => ({
						label: item.deptName,
						value: item.id
					})) ?? [];
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				const fn = row ? _api.admin_db_audit.xdsAgentEdit : _api.admin_db_audit.xdsAgentAdd;
				let obj = _.$pickFormValues(this.form);
				if (row) {
					obj = {
						...row,
						..._.$pickFormValues(this.form)
					};
				}
				const { code, msg } = await fn(obj);
				if (code === 0) {
					_.$msg(msg);
					this.closeModal();
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
