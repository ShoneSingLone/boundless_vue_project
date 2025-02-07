<template>
	<xDialog :style="labelStyle">
		<xCard>
			<xAlert :title="alertMessage" type="info" />
			<xForm col="1">
				<xItem :configs="form.name" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk, projectData }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				form: {
					name: defItem({
						placeholder: "请输新项目名称",
						value: "",
						label: i18n("项目名称"),
						rules: [
							_rules.required(),
							{
								validator({ val }) {
									if (val === projectData.name) {
										return "不能与原项目名相同";
									}
									return "";
								}
							}
						]
					})
				},
				alertMessage: `该操作将会复制 ${projectData.name} 下的所有接口集合，但不包括测试集合中的接口`
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
						const { name } = vm.cptFormData;
						await vm.copyProject(name);
						onOk();
						vm.closeModal();
					}
				};
			}
		},
		methods: {
			async copyProject(newProjectName) {
				const id = projectData._id;
				let { data } = await _api.yapi.getProjectById(id);
				data = _.merge({}, data, { name: newProjectName }, { preName: data.name });
				await _api.yapi.copyProject(data);
				_.$msg("项目复制成功");
				this.$emit("change");
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

<style lang="less"></style>
