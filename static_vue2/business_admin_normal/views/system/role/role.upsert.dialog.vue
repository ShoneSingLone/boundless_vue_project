<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.roleName" />
				<xItem :configs="form.roleKey" />
				<xItem :configs="form.roleSort" />
				<xItem :configs="form.status" />
				<xItem :configs="form.menuIds" :roleId="cptRoleId" />
				<xItem :configs="form.remark" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	row = row || {};
	const isUpdate = !!row.roleId;

	if (isUpdate) {
		const { data } = await _adminTools.api_role_by_roleId(row.roleId);
		row = data;
	}

	const { sys_normal_disable } = await _adminTools.newDicts({
		sys_normal_disable: null
	});

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			return {
				isUpdate,
				form: defItems({
					roleName: { value: "", label: "角色名称", rules: [_rules.required()] },
					roleKey: {
						value: "",
						label: "权限字符",
						rules: [_rules.required()],
						tips: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
					},
					roleSort: {
						value: 0,
						label: "角色顺序",
						rules: [_rules.required()],
						isNumber: true,
						min: 0
					},
					status: {
						value: "",
						label: "状态",
						itemType: "xItemRadioGroup",
						isButton: true,
						options: sys_normal_disable
					},
					menuIds: {
						value: [],
						label: "菜单权限",
						rules: [_rules.required()],
						itemType: "AdminMenuPermissionTree"
					},
					remark: { value: "", label: "备注", type: "textarea" }
				})
			};
		},
		computed: {
			cptRoleId() {
				return row?.roleId;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("OK"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async fillbackFormData() {
				if (isUpdate) {
					_.$setFormValues(this.form, row);
					if (row.roleId) {
						const { menus, checkedKeys } = await _adminTools.api_menu_tree_by_roleId(
							row.roleId
						);
						// const selected = [];
						// _.$traverse(menus, item => {
						// 	selected.push(item.roleId);
						// });
						this.form.menuIds.value = checkedKeys;
					}
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					if (isUpdate) {
						await _adminTools.api_role_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_role_new(formData);
					}
					onClick();
					_.$msg(isUpdate ? "修改成功" : "新增成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			}
		}
	});
}
</script>
