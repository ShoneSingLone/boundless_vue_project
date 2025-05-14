<template>
	<xDialog style="--xDialog-wrapper-width: 900px">
		<div class="flex vertical pt pr pl" style="height: 400px">
			<xTablebar :configs="configsTable">
				<xItem :configs="formSearch.userName" />
				<xItem :configs="formSearch.phonenumber" />
			</xTablebar>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onSelected }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const { sys_normal_disable } = await _adminTools.newDicts({
		sys_normal_disable: null
	});

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.getTableData();
		},
		data() {
			const vm = this;
			return {
				formSearch: defItems({
					userName: { value: "", label: "用户名称" },
					phonenumber: { value: "", label: "手机号码" }
				}),
				configsTable: defTable({
					onQuery() {
						vm.getTableData();
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "userId",
							getConfigs: function () {
								return vm.configsTable;
							}
						}),
						{ label: i18n("用户名称"), prop: "userName" },
						{ label: i18n("用户昵称"), prop: "nickName" },
						{ label: i18n("邮箱"), prop: "email" },
						{ label: i18n("手机"), prop: "phonenumber" },
						{
							label: i18n("status_info"),
							prop: "status",
							cellRenderer: ({ cellData }) => hVal2Tag(cellData, sys_normal_disable)
						},
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
					label: i18n("OK"),
					preset: "blue",
					disabled() {
						return !vm.configsTable.data.set.size;
					},
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				try {
					const userIds = Array.from(this.configsTable.data.set).join(",");
					onSelected({ userIds });
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { page, size } = _.$setPagination(this.configsTable, pagination);
					const { userName, phonenumber } = _.$pickFormValues(this.formSearch);
					const queryData = {
						pageSize: size,
						pageNum: page,
						roleId: row.roleId,
						userName,
						phonenumber
					};

					const { rows, total } =
						await _adminTools.api_role_auth_user_unallocated_list(queryData);
					_.$setTableData(this.configsTable, { list: rows, total, set: new Set() });
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
