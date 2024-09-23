<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageHeader @back="goBack" style="margin: 15px 20px 0" />
		<xPageContent>
			<div class="edit-title">基本信息</div>
			<div class="form-wrapper">
				<xForm col="1">
					<xItem :configs="form.name" />
					<xItem :configs="form.roleId" />
					<xItem :configs="form.deptId" />
					<xItem :configs="form.phone" />
					<xItem :configs="form.账号有效时间" />
					<xItem :configs="form.账号状态" />
				</xForm>
			</div>
			<div class="edit-title mt">其他</div>
			<div class="form-wrapper pt">
				<xForm>
					<xItem :configs="form.remarks" span="full" />
				</xForm>
			</div>
			<div class="form-wrapper mt">
				<xBtn :configs="btnOk" />
				<xGap w="40" />
				<xBtn :configs="btnCancel" />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		mounted() {},
		data(vm) {
			return {
				form: defItems({
					userName: { label: "用户名称", value: "", rules: [_rules.required()] },
					name: { label: "账号", value: "", rules: [_rules.required()] },
					phone: { label: "电话", value: "", rules: [_rules.required()] },
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
					roleId: {
						label: "角色",
						value: "",
						rules: [_rules.required()],
						itemType: "xItemSelect",
						options: [],
						async once() {
							const { data = [] } = await _api.admin_db_audit.xdsRoleAll();
							const options = _.map(data, ({ id, roleName }) => ({
								label: roleName,
								value: id
							}));
							this.options = options;
						}
					},
					登陆密码: { label: "登陆密码", value: "", rules: [_rules.required()] },
					账号状态: {
						label: "账号状态",
						value: true,
						itemType: "xItemSwitch",
						activeText: "正常",
						inactiveText: "禁用"
					},
					账号有效时间: { label: "账号有效时间", value: "", rules: [_rules.required()] },
					remarks: { value: "", label: "备注", type: "textarea" }
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: "保存",
					preset: "primary",
					async onClick() {}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "取消",
					async onClick() {
						vm.goBack();
					}
				};
			}
		},
		watch: {
			"APP.user": {
				immediate: true,
				handler(user) {
					const item = _.find(this.form.deptId.options, { value: user.deptId });
					_.$setFormValues(this.form, user);
					if (!item) {
						(async () => {
							await _.$ensure(() => this.form.deptId.options.length);
							this.form.deptId.options.unshift({
								label: user.deptName,
								value: user.deptId
							});
						})();
					}
				}
			}
		},
		methods: {
			goBack() {
				this.$router.back();
			}
		}
	});
}
</script>
