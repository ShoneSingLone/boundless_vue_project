<template>
	<xDialog>
		<div class="flex vertical height100">
			<div class="flex middle mb mt">
				<div
					style="
						width: 32px;
						height: 32px;
						border-radius: 50%;
						background-color: var(--el-color-primary);
					"
					class="flex middle center">
					<xIcon icon="_icon_btn_export" style="color: white" />
				</div>
				<span style="font-size: 18px; font-weight: 700" class="ml8"> 请选择导出格式 </span>
			</div>

			<div class="edit-title x-padding">
				<xRadioGroup v-model="radio">
					<xRadio :label="3">PDF</xRadio>
					<xRadio :label="6">EXCEL</xRadio>
					<xRadio :label="9">WORD</xRadio>
				</xRadioGroup>
			</div>
		</div>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ rowData }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.getInfo();
		},
		data() {
			const vm = this;
			return {
				radio: 3
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确认"),
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
					const userId = rowData.userId;
					const roleIds = Array.from(this.configsTable.data.set).join(",");
					// await _adminTools.api_user_auth_update({ userId, roleIds });
					_.$msg("修改成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			},
			async getInfo() {
				try {
					_.$loading(true);
					// const { user, roles } = await _adminTools.api_user_auth_list(rowData.userId);
					// _.$setFormValues(this.form, user);
					// _.$setTableData(this.configsTable, {
					// 	list: _.map(roles, row => row),
					// 	set: new Set(_.map(user.roles, role => role.roleId))
					// });
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
