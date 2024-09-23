<template>
	<xDialog>
		<xCard>
			<xForm col="1" ref="form">
				<xItem :configs="form.name" />
				<xItem :configs="form.password" />
				<xItem :configs="form.passwordAge" />
				<xItem :configs="form.nickName" />
				<xItem :configs="form.phone" />
				<xItem :configs="form.sex" />
				<xItem :configs="form.roleId" />
				<xItem :configs="form.deptId" />
				<xItem :configs="form.status" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, parent }) {
	const isUpdate = !!row?.id;
	let userInfo = {};
	if (isUpdate) {
		/* TODO: 是否需要发送请求获取用户的详细信息，做好数据回填的准备*/
		userInfo = row;
	}
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			if (isUpdate) {
				/* 也可以选择在此处发送获取用户信息的请求 */
				/* TODO: 是否需要发送请求获取用户的详细信息，做好数据回填的准备*/
				_.$setFormValues(this.form, userInfo);
				this.form.sex.value = userInfo.sex + "";
				this.form.status.value = userInfo.status + "";
			}
		},
		data() {
			return {
				form: defItems({
					name: { label: "用户名称", value: "", rules: [_rules.required()] },
					password: { label: "密码", value: "", isPwd: true, rules: [_rules.required()] },
					passwordAge: {
						label: "重复密码",
						value: "",
						isPwd: true,
						rules: [_rules.required()]
					},
					nickName: { label: "姓名", value: "", rules: [_rules.required()] },
					phone: { label: "手机号", value: "", rules: [_rules.required()] },
					sex: {
						label: "性别",
						value: "1",
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.sex,
						rules: [_rules.required()]
					},
					roleId: {
						label: "角色",
						value: "",
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()],
						async once() {
							const { data = [] } = await _api.admin_db_audit.xdsRoleAll();
							this.options = _.map(data, ({ id, roleName }) => ({
								label: roleName,
								value: id
							}));
						}
					},
					deptId: {
						label: "部门",
						value: "",
						rules: [_rules.required()],
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data = [] } = await _api.admin_db_audit.xdsDepartmentPage({
								pageSize: 500,
								pageNum: 1
							});
							const [all] = data;
							this.options = all?.children?.map?.(item => ({
								label: item.deptName,
								value: item.id
							}));
						}
					},
					status: {
						label: "状态",
						value: "",
						itemType: "xItemSelect",
						options: _opts.admin_db_audit.accountStatus,
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
				const fn = row ? _api.admin_db_audit.xdsUserEdit : _api.admin_db_audit.xdsUserAdd;
				let obj = _.$pickFormValues(this.form);
				if (row) {
					obj = {
						...row,
						..._.$pickFormValues(this.form),
						sex: Number(obj.sex),
						status: Number(obj.status)
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
