<template>
	<xDialog :style="labelStyle">
		<xCard>
			<xForm col="1">
				<xItem :configs="form.group_id" />
				<xItem :configs="form.name" />
				<xItem :configs="form.basepath" />
				<xItem :configs="form.desc" />
				<xItem :configs="form.project_type" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const { DEV, OWNER, ADMIN, PRIVATE, PUBLIC } = Vue._yapi_var;

	function useProjectForm(vm) {
		const group_id = defItem({
			itemType: "xItemSelect",
			value: "",
			label: i18n("所属分组"),
			placeholder: "请选择项目所属的分组",
			options: [],
			once() {
				vm.$watch(
					() => [vm.APP?.user?.role, vm.APP.groupList],
					([role, groupList]) => {
						this.options = _.reduce(
							groupList,
							(target, groupItem) => {
								const isShow = (() => {
									const isGroupRoleAuth = [ADMIN, OWNER].includes(
										groupItem?.role
									);
									return isGroupRoleAuth || [ADMIN, OWNER].includes(role);
								})();

								if (isShow) {
									target.push({
										label: groupItem.group_name,
										value: String(groupItem._id)
									});
								}
								return target;
							},
							[]
						);
					},
					{ immediate: true }
				);
			},
			rules: [_rules.required("请选择项目所属的分组")],
			itemSlots: {
				afterController() {
					return hxBtn({
						class: "ml",
						configs: {
							label: "新建分组",
							preset: "preset",
							onClick() {
								return _.$openModal({
									title: i18n("添加分组"),
									url: "@/views/Api/Group/Group.Upsert.vue",
									onOk() {
										vm.APP.updateGroupList();
									}
								});
							}
						}
					});
				}
			}
		});

		const name = defItem({
			_where: "GroupSectionProjectListAddProject",
			placeholder: "请输入项目名称",
			value: "",
			label: i18n("项目名称"),
			rules: [_rules.required()]
		});

		const basepath = defItem({
			placeholder: "接口基本路径，默认是/",
			value: "",
			label: i18n("基本路径"),
			tips: "接口基本路径，默认是/"
		});
		const desc = defItem({
			placeholder: "描述",
			type: "textarea",
			value: "",
			label: i18n("描述"),
			rules: [_rules.required()],
			showCount: true,
			maxlength: 144
		});
		const project_type = defItem({
			value: PUBLIC,
			label: i18n("权限"),
			rules: [_rules.required()],
			itemType: "xItemRadioGroup",
			minWidth: 140,
			options: [
				{
					content: "只有组长和项目开发者可以索引并查看项目信息",
					label: "私有",
					icon: "_LockOutlined",
					value: PRIVATE
				},
				{
					content: "任何人都可以索引并查看项目信息",
					label: "公开",
					icon: "_unlock",
					value: PUBLIC
				}
			],
			renderOption(item) {
				return h(
					"xTooltip",
					{
						content: item.content
					},
					[
						hSpan({ class: "flex middle" }, [
							h("xIcon", { icon: item.icon }),
							hSpan({ class: "ml4" }, item.label)
						])
					]
				);
			}
		});

		return {
			group_id,
			name,
			basepath,
			desc,
			project_type
		};
	}

	return {
		useProjectForm,
		inject: ["APP"],
		props: useDialogProps(),
		data(vm) {
			const { group_id, name, basepath, desc, project_type } = useProjectForm(vm);
			return {
				form: {
					group_id,
					name,
					basepath,
					desc,
					project_type
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
					preset: "blue",
					async onClick() {
						_.$loading(true);
						try {
							const [atLestOne] = await _.$validateForm(vm.$el);
							if (atLestOne) return;
							const { name, basepath, group_id, project_type, desc } = vm.cptFormData;
							const group = _.find(vm.form.group_id.options, { value: group_id });
							const group_name = group.label;
							const { data } = await _api.yapi.project_add({
								name,
								basepath,
								group_id,
								group_name,
								project_type,
								desc
							});
							_.$msg(`添加成功`);
							onOk();
							vm.closeModal();
						} catch (error) {
							_.$msgError(error?.message || error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		methods: {
			renderDeleteGroup() {
				const vm = this;
				/* 只有超级管理员能删除分组 */
				if (this.APP.user.role === Vue._yapi_var.ADMIN) {
					return h(
						"xAlert",
						{
							title: "删除分组",
							type: "warning",
							staticClass: "mt20",
							showIcon: true,
							id: "admin-delete-group-alert"
						},
						[
							{
								title() {
									return i18n("删除分组");
								},
								default() {
									return h(
										"div",
										{
											staticClass: "flex vertical",
											style: "width:100%"
										},
										[
											hDiv({ staticClass: "card-danger-content" }, [
												h("p", [
													i18n(
														"分组一旦删除，将无法恢复数据，请慎重操作！"
													)
												]),
												h("p", [i18n("只有超级管理员有权限删除分组。")])
											]),
											hDiv({ staticClass: "flex end" }, [
												hxBtn({
													configs: {
														preset: "danger",
														label: "删除分组",
														id: "delete-group-btn",
														onClick: vm.showDeleteGroupConfirm
													}
												})
											])
										]
									);
								}
							}
						]
					);
				}
				return null;
			}
		}
	};
}
</script>

<style lang="less">
#admin-delete-group-alert {
	.el-alert__content {
		width: 100%;
	}
}
</style>
