<template>
	<xDialog :style="labelStyle">
		<xCard>
			<xForm col="1">
				<xItem :configs="form.member_uids" />
				<xItem :configs="form.role" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			const vm = this;
			return {
				form: {
					member_uids: defItem({
						itemType: "YapiItemUac",
						value: [],
						label: i18n("用户"),
						rules: [_rules.required()]
					}),
					role: defItem({
						value: "dev",
						itemType: "xItemRadioGroup",
						minWidth: 80,
						isButton: true,
						label: i18n("权限"),
						options: [
							{ label: "组长", value: Vue._yapi_var.OWNER },
							{ label: "开发者", value: Vue._yapi_var.DEV },
							{ label: "访客", value: Vue._yapi_var.GUEST }
						]
					})
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
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						const { role, member_uids } = vm.cptFormData;
						// 添加成功后重新获取分组成员列表
						await onOk({ role, member_uids, dialogVm: vm });
					}
				};
			}
		},
		methods: {
			async init() {
				if (isUpdate) {
					this.fillFormData();
				}
			},
			async fillFormData() {
				const { group_name, group_desc, custom_field1 } = groupInfo;
				_.$fillBackData({
					form: this.form,
					data: {
						currGroupName: group_name || "",
						currGroupDesc: group_desc || "",
						custom_field1_enable: custom_field1.enable || false,
						custom_field1_name: custom_field1.name || ""
					},
					order: [
						"currGroupName",
						"currGroupDesc",
						"custom_field1_enable",
						"custom_field1_name"
					]
				});
			},
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
											h("div", { staticClass: "card-danger-content" }, [
												h("p", [
													i18n(
														"分组一旦删除，将无法恢复数据，请慎重操作！"
													)
												]),
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
	});
}
</script>

<style lang="less">
#admin-delete-group-alert {
	.el-alert__content {
		width: 100%;
	}
}
</style>
