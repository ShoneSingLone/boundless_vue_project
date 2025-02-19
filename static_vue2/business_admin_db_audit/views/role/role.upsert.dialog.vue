<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.roleName" />
				<xItem :configs="form.roleCode" />
				<xItem :configs="form.status" />
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
export default async function ({ row, parent }) {
	const isUpdate = !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		data() {
			return {
				form: defItems({
					roleName: { label: "角色名称", value: "", rules: [_rules.required()] },
					roleCode: {
						label: "角色编号",
						value: "",
						rules: [_rules.required()]
					},
          status: {
						label: "角色状态",
            itemType: "xItemSelect",
            options: [],
						value: "",
						rules: [_rules.required(),]
					},
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
		mounted() {
      this.handleStatus();
			if (row && Object.keys(row).length > 0) {
				this.form.roleCode.value = row.roleCode;
				this.form.roleName.value = row.roleName;
			}
		},
		methods: {
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				const fn = row ? _api.admin_db_audit.xdsRoleEdit : _api.admin_db_audit.xdsRoleAdd;
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
			},
      async handleStatus(){
        const res=await _api.admin_db_audit.xdsOptionsUserStatus();
        this.form.status.options=res;
      }
		}
	});
}
</script>
