<template>
	<div class="x-page-view">
		<xPageContent>
			<xTablebar
				:configs="configsTable"
				style="--xItem-wrapper-width: 300px; --xItem-label-width: 80px">
				<template #left>
					<span class="mr">{{ i18n("用户总数") }}:</span>
					<span class="mr">{{ cptUserTotal }}</span>
				</template>
				<xItem :configs="searchForm.key" />
				<xGap r="16" />
			</xTablebar>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		provide() {
			return {
				inject_i18n: this
			};
		},
		mounted() {
			const vm = this;
			vm.getTableData();
			vm.$watch(
				() => {
					return [vm.searchForm, vm.tableDataList];
				},
				() => {
					vm.setTableDataList();
				},
				{ deep: true }
			);
		},
		methods: {
			async getTableData() {
				try {
					_.$loading(true);
					const { errcode, data } = await _api.yapi.userSearch();
					if (!errcode) {
						_.$setTableData(this.configsTable, {
							list: _.map(data, rowData => {
								try {
									const [zhCn, enUs] = JSON.parse(rowData.desc);
									return {
										...rowData,
										zhCn,
										enUs
									};
								} catch (error) {
									return rowData;
								}
							})
						});
						this.tableDataList = this.configsTable.data.list;
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		},
		data() {
			const vm = this;

			vm.setTableDataList = _.debounce(function () {
				const key = _.trim(vm.searchForm.key.value);
				let listForShow = _.cloneDeep(vm.tableDataList);
				if (_.$isInput(key)) {
					listForShow = _.filter(listForShow, i => {
						return (
							new RegExp(key, "i").test(i.username) ||
							new RegExp(key, "i").test(i.email)
						);
					});
				}

				vm.configsTable.data.set = new Set();
				vm.configsTable.data.list = listForShow;
			}, 500);

			return {
				tableDataList: [],
				searchForm: defItems({
					key: {
						value: "",
						clearable: true,
						placeholder: i18n("请输入用户名或者Email")
					}
				}),
				oprBtnArray: [],
				configsTable: defTable({
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						defTable.colMultiple({
							by: "_id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{ label: i18n("ID"), prop: "uid", width: 60 },
						{
							label: i18n("用户名"),
							prop: "username"
						},
						{
							label: i18n("Email"),
							prop: "email"
						},
						{
							label: i18n("角色"),
							prop: "role",
							cellRenderer({ cellData }) {
								return _.$val2L(cellData, _opts.yapi.role);
							}
						},
						defTable.colActions({
							width: 80,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									col: 3,
									children: [
										{
											label: i18n("修改"),
											onClick: async () => {
												const isCurrentIsMe =
													rowData.uid === vm.APP.user._id;
												_.$openModal({
													title: i18n("个人中心"),
													url: "@/views/User/UserProfile.Dialog.vue",
													parent: vm,
													userId: rowData.uid,
													canModifyAvatar: isCurrentIsMe,
													onOk() {
														vm.getTableData();
													}
												});
											}
										}
									]
								});
							}
						})
					],
					onQuery: vm.getTableData
				})
			};
		},
		computed: {
			cptUserTotal() {
				return this.configsTable.data.list?.length || 0;
			}
		}
	});
}
</script>

<style lang="less"></style>
