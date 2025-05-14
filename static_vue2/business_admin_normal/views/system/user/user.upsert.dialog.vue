<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.nickName" />
				<xItem :configs="form.deptId" />
				<xItem :configs="form.phonenumber" />
				<xItem :configs="form.email" />
				<xItem :configs="form.userName" />
				<xItem :configs="form.password" v-if="!isUpdate" />
				<xItem :configs="form.sex" />
				<xItem :configs="form.status" />
				<xItem :configs="form.postIds" />
				<xItem :configs="form.roleIds" />
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
	console.log(_adminTools);
	row = row || {};
	const isUpdate = !!row.userId;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	const { sys_normal_disable, sys_user_sex } = await _adminTools.newDicts({
		sys_normal_disable: null,
		sys_user_sex: null
	});

	const { options_post, options_role } = await (async () => {
		const res = await _adminTools.api_user_by_userId(row.userId);
		const { posts, roles, data, roleIds, postIds } = res;
		if (isUpdate) {
			row = data;
			row.roleIds = roleIds;
			row.postIds = postIds;
		}

		return {
			options_post: _.map(posts, item => {
				return {
					...item,
					label: item.postName,
					value: item.postId
				};
			}),
			options_role: _.map(roles, item => {
				return {
					...item,
					label: item.roleName,
					value: item.roleId
				};
			})
		};
	})();

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			return {
				isUpdate,
				form: defItems({
					nickName: { value: "", label: "用户昵称", rules: [_rules.required()] },
					deptId: { value: "", label: "归属部门" },
					phonenumber: { value: "", label: "手机号码", rules: [_rules.mobilePhone()] },
					email: { value: "", label: "邮箱", rules: [_rules.email()] },
					userName: { value: "", label: "用户名称", rules: [_rules.required()] },
					password: {
						value: "",
						label: "用户密码",
						rules: [_rules.required()],
						isPwd: true,
						isHide: isUpdate
					},
					sex: {
						value: "",
						label: "用户性别",
						itemType: "xItemRadioGroup",
						isButton: true,
						options: sys_user_sex
					},
					status: {
						value: "",
						label: "状态",
						itemType: "xItemRadioGroup",
						isButton: true,
						options: sys_normal_disable
					},
					postIds: {
						value: [],
						multiple: true,
						label: "岗位",
						itemType: "xItemSelect",
						options: options_post
					},
					roleIds: {
						value: [],
						multiple: true,
						label: "角色",
						itemType: "xItemSelect",
						options: options_role
					},
					remark: { value: "", label: "备注", type: "textarea" }
				})
			};
		},
		computed: {
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
			fillbackFormData() {
				if (isUpdate) {
					_.$setFormValues(this.form, row);
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
						await _adminTools.api_user_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_user_new(formData);
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
