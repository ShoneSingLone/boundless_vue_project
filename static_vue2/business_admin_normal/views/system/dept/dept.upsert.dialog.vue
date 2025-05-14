<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form" col="2">
				<xItem :configs="form.parentId" span="full" />
				<xItem :configs="form.deptName" />
				<xItem :configs="form.orderNum" />
				<xItem :configs="form.leader" />
				<xItem :configs="form.phone" />
				<xItem :configs="form.email" />
				<xItem :configs="form.status" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick, isAppend }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	let dicts = { sys_normal_disable: null };
	dicts = await _adminTools.newDicts(dicts);

	row = row || {};
	const isUpdate = !!row.deptId;
	/* 在父节点下追加新节点 */
	isAppend = !!isAppend;

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			const vm = this;
			return {
				isUpdate,
				form: defItems({
					parentId: {
						value: 0,
						label: i18n("上级部门"),
						itemType: "AdminDeptCascader",
						rules: [_rules.required()]
					},
					deptName: {
						value: "",
						label: i18n("部门名称"),
						rules: [_rules.required()]
					},
					orderNum: {
						value: "",
						label: i18n("显示排序"),
						isNumber: true,
						min: 0,
						rules: [_rules.required()]
					},
					leader: {
						value: "",
						label: i18n("负责人"),
						rules: [_rules.required()]
					},
					phone: {
						value: "",
						label: i18n("联系电话"),
						rules: [_rules.required()]
					},
					email: {
						value: "",
						label: i18n("邮箱"),
						rules: [_rules.required()]
					},
					status: {
						value: "1",
						label: i18n("部门状态"),
						itemType: "xItemRadioGroup",
						isButton: true,
						options: dicts.sys_normal_disable,
						rules: [_rules.required()]
					}
				})
			};
		},
		computed: {
			cptIsFunctionType() {
				return this.form.deptType.value === "F";
			},
			cptNotMenuType() {
				return this.form.deptType.value !== "C";
			},
			cptMenuId() {
				return row?.deptId;
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
					const { data } = await _adminTools.api_dept_by_deptId(row.deptId);
					row = data;
					if (isAppend) {
						if (row.deptId) {
							row.parentId = row.deptId;
							delete row.deptId;
						}
					}
					_.$setFormValuesDelay(this.form, row);
				} else {
					_.$setFormValuesDelay(this.form, { parentId: 100 });
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					if (isUpdate && !isAppend) {
						await _adminTools.api_dept_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_dept_new(formData);
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
