<template>
	<xDialog>
		<div class="flex vertical height100">
			<xCard header="基本信息">
				<xForm col="3">
					<xItem :configs="form.nickName" />
					<xItem :configs="form.userName" />
				</xForm>
			</xCard>
			<xGap t />
			<xCard header="基本信息" class="flex1">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</xCard>
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.getInfo();
		},
		data() {
			const vm = this;
			return {
				form: defItems({
					nickName: { value: "asdfasdf", label: "用户昵称", readonly: true },
					userName: { value: "asdfasdf", label: "登录账号", readonly: true }
				}),
				configsTable: defTable({
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "roleId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{
							label: i18n("序号"),
							prop: "no",
							cellRenderer({ rowIndex }) {
								return rowIndex + 1;
							}
						},
						{ label: i18n("角色编号"), prop: "roleId" },
						{ label: i18n("角色名称"), prop: "roleName" },
						{ label: i18n("权限字符"), prop: "roleKey" },
						{
							label: i18n("创建时间"),
							prop: "createTime",
							cellRenderer: ({ cellData }) => _adminTools.parseTime(cellData)
						}
					]
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				try {
					const userId = row.userId;
					const roleIds = Array.from(this.configsTable.data.set).join(",");
					await _adminTools.api_user_auth_update({
						userId,
						roleIds
					});
					_.$msg("修改成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			},
			async getInfo() {
				try {
					_.$loading(true);
					const { user, roles } = await _adminTools.api_user_auth_list(row.userId);
					_.$setFormValues(this.form, user);
					_.$setTableData(this.configsTable, {
						list: _.map(roles, row => row),
						set: new Set(_.map(user.roles, role => role.roleId))
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	});
}
</script>
