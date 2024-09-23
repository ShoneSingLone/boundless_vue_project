<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.deptName" />
				<xItem :configs="form.deptCode" />
				<xItem :configs="form.pid" />
			</xForm>
		</xCard>
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
export default async function ({ row, pidOption, parent }) {
	const isUpdate = !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	console.log("pidOption", pidOption);
	return defineComponent({
		props: useDialogProps(),
		mounted() {
			if (row && Object.keys(row).length > 0) {
				this.form.deptCode.value = row.deptCode;
				this.form.deptName.value = row.deptName;
				this.form.pid.value = row.pid;
			}
			if (pidOption && pidOption.length > 0) {
				this.form.pid.options = pidOption;
			}
		},
		data() {
			return {
				form: defItems({
					deptName: { label: "部门名称", value: "", rules: [_rules.required()] },
					deptCode: {
						label: "部门编号",
						value: "",
						rules: [_rules.required(), _rules.deptCode(), _rules.lessThan(30)]
					},
					pid: {
						label: "父级部门",
						disabled: isUpdate,
						value: "",
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()]
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
					label: "保存",
					preset: "primary",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				const fn = row
					? _api.admin_db_audit.xdsDepartmentIdUpdate
					: _api.admin_db_audit.xdsDepartment;
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
					parent.getTableData({ page: 1 });
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
