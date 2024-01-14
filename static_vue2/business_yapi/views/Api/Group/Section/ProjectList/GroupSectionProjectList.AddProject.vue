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
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const { DEV, OWNER, ADMIN, PRIVATE, PUBLIC } = Vue._yapi_var;

	function useProjectForm(vm) {
		return reactive({
			group_id: defItem({
				itemType: "xItemSelect",
				value: "",
				label: i18n("所属分组"),
				placeholder: "请选择项目所属的分组",
				options: _.map(vm.APP.groupList, i => {
					return {
						label: i.group_name,
						value: String(i._id),
						disabled: ![DEV, OWNER, ADMIN].includes(i.role)
					};
				}),
				rules: [_rules.required("请选择项目所属的分组")]
			}),
			name: defItem({ placeholder: "请输入项目名称", value: "", label: i18n("项目名称"), rules: [_rules.required()] }),
			basepath: defItem({ placeholder: "接口基本路径，默认是/", value: "/", label: i18n("基本路径"), rules: [_rules.required()], tips: "接口基本路径，默认是/" }),
			desc: defItem({ placeholder: "描述", type: "textarea", value: "", label: i18n("描述"), rules: [_rules.required()], showCount: true, maxlength: 144 }),
			project_type: defItem({
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
						"elTooltip",
						{
							content: item.content
						},
						[h("span", { class: "flex middle" }, [h("xIcon", { icon: item.icon }), h("span", { class: "ml4" }, item.label)])]
					);
				}
			})
		});
	}

	return {
		useProjectForm,
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		setup() {
			const vm = this;
			const form = useProjectForm(this);
			return { form };
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						const { name, basepath, group_id, project_type, desc } = vm.cptFormData;
						const group = _.find(vm.form.group_id.options, { value: group_id });
						const group_name = group.label;
						const { data } = await _api.yapi.addProject({ name, basepath, group_id, group_name, project_type, desc });
						_.$msgSuccess(`添加成功`);
						onOk();
						vm.$closeWindow();
					}
				};
			}
		},
		methods: {
			async init() {
				this.fillFormData();
			},
			async fillFormData() {
				_.$fillBackData({
					form: this.form,
					data: {
						group_id: this.APP.cptGroupId
					},
					order: ["group_id"]
				});
			},
			renderDeleteGroup() {
				const vm = this;
				/* 只有超级管理员能删除分组 */
				if (this.APP.user.role === Vue._yapi_var.ADMIN) {
					return h(
						"elAlert",
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
											h("div", { staticClass: "card-danger-content" }, [
												h("p", [i18n("分组一旦删除，将无法恢复数据，请慎重操作！")]),
												h("p", [i18n("只有超级管理员有权限删除分组。")])
											]),
											h("div", { staticClass: "flex end" }, [
												h("xBtn", {
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
