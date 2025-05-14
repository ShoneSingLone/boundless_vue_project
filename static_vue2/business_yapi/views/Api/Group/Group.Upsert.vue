<template>
	<xDialog style="width: 825px" :style="labelStyle">
		<!-- '--i18ntem-label-width': "144px" -->
		<xCard>
			<xForm v-if="isUpdate">
				<xItem :configs="form.currGroupName" span="full" />
				<xItem :configs="form.currGroupDesc" span="full" class="mt" />
				<xItem :configs="form.custom_field1_enable" />
				<xItem :configs="form.custom_field1_name" />
				<xRender :render="renderDeleteGroup" span="full" />
			</xForm>
			<xForm v-else>
				<xItem :configs="form.newGroupName" />
				<xItem :configs="form.owner_uids" />
				<xItem :configs="form.newGroupDesc" span="full" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ groupInfo, onOk }) {
	const isUpdate = !!groupInfo;

	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return {
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			const vm = this;
			return {
				isUpdate,
				confirmGroupName: defItem({
					value: "",
					label: i18n("再次输入分组名称"),
					placeholder: i18n("输入分组名称"),
					rules: [_rules.validator(({ val }) => {}, { name: "required" })]
				}),
				form: {
					newGroupName: defItem({
						value: "",
						label: i18n("分组名"),
						placeholder: i18n("请输入分组名称"),
						rules: [_rules.required()]
					}),
					newGroupDesc: defItem({
						value: "> 简洁",
						type: "textarea",
						label: i18n("简介"),
						tips: "尝试markdown格式",
						placeholder: "请输入分组描述",
						rules: [_rules.required()]
					}),
					owner_uids: defItem({
						itemType: "YapiItemUac",
						value: [],
						label: i18n("组长"),
						placeholder: "请输入分组描述",
						rules: [_rules.required()]
					}),
					/* update */
					currGroupName: {
						value: "",
						label: i18n("分组名"),
						placeholder: i18n("请输入分组名称"),
						rules: [_rules.required()]
					},
					currGroupDesc: {
						value: "",
						type: "textarea",
						label: i18n("简介"),
						tips: "尝试markdown格式",
						placeholder: "请输入分组描述",
						rules: [_rules.required()]
					},
					custom_field1_enable: {
						itemType: "xItemSwitch",
						value: false,
						label: i18n("启用接口自定义字段"),
						placeholder: "请输入分组描述",
						rules: [_rules.required()]
					},
					custom_field1_name: {
						value: "",
						disabled() {
							//@ts-ignore
							return !vm.form.custom_field1_enable.value;
						},
						label: i18n("接口自定义字段"),
						tips: i18n("可以在接口中添加 额外字段 数据"),
						placeholder: i18n("额外字段"),
						rules: [_rules.required()],
						once() {
							vm.$watch(
								"form.custom_field1_enable.value",
								isUse => {
									if (isUse) {
										this.rules = [_rules.required()];
									} else {
										this.rules = [];
									}
								},
								{
									immediate: true
								}
							);
						}
					}
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
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;

						_.$loading(true);
						try {
							if (isUpdate) {
								const {
									currGroupName,
									currGroupDesc,
									custom_field1_enable,
									custom_field1_name
								} = vm.cptFormData;
								await _api.yapi.groupUpdateGroup({
									...groupInfo,
									group_name: currGroupName,
									group_desc: currGroupDesc,
									custom_field1: {
										enable: custom_field1_enable,
										name: custom_field1_name
									}
								});
								_.$msg("分组修改成功");
							} else {
								const { newGroupName, newGroupDesc, owner_uids } = vm.cptFormData;
								await _api.yapi.groupAddGroup({
									group_name: newGroupName,
									group_desc: newGroupDesc,
									owner_uids: owner_uids
								});
								_.$msg("分组添加成功");
							}
							vm.closeModal();
						} catch (error) {
							_.$msgError(error.message || error);
						} finally {
							await onOk();
							_.$loading(false);
						}
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
						custom_field1_enable: custom_field1?.enable || false,
						custom_field1_name: custom_field1?.name || ""
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
														onClick() {
															return _.$openModal({
																title: i18n("再次确认删除操作"),
																url: "/common/ui-x/msg/WindowConfirm.vue",
																content: () => {
																	return hDiv([
																		hxItem({
																			configs:
																				vm.confirmGroupName
																		})
																	]);
																},
																renderFooter(vmConfirmWindow) {
																	return () => {
																		return h(
																			"div",
																			{
																				style: `border-top: 1px solid var(--el-border-color);padding-top:var(--ui-one);width:100%;text-align:center;`
																			},
																			[
																				hxBtn({
																					staticClass:
																						"mr",
																					configs: {
																						label: "删除",
																						onClick() {
																							return _.$api.yapi.groupDeleteGroup(
																								groupInfo.id
																							);
																						}
																					}
																				}),
																				hxBtn({
																					configs: {
																						label: i18n(
																							"取消"
																						),
																						preset: "primary",
																						onClick() {
																							vmConfirmWindow.closeModal();
																						}
																					}
																				})
																			]
																		);
																	};
																}
															});
														}
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
