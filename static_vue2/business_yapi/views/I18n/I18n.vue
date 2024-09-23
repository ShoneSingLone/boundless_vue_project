<template>
	<div class="x-page-view">
		<xPageTitle>
			<template #title>
				<span class="mr">{{ i18n("国际化字段列表") }}</span>
				<!-- <xItem :configs="searchForm.i18n" /> -->
				<xGap f />
			</template>
		</xPageTitle>
		<xPageContent>
			<xTablebar
				:configs="configsTable"
				style="--xItem-wrapper-width: 300px; --xItem-label-width: 80px">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="searchForm.key" />
				<xItem :configs="searchForm.zhCn" />
				<xItem :configs="searchForm.enUs" />
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
	function translateByBaidu({ params, from, to }) {
		return new Promise(resolve => {
			$.ajax({
				url: "https://api.fanyi.baidu.com/api/trans/vip/translate",
				type: "get",
				dataType: "jsonp",
				data: {
					...params,
					from,
					to
				},
				success: function (data) {
					if (data.error_code) {
						_.$msgError(params.q + data.error_msg);
					}
					resolve(data);
				}
			});
		});
	}
	return {
		inject: ["APP"],
		provide() {
			return {
				inject_i18n: this
			};
		},
		mounted() {
			document.title = "Y-API-国际化";
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
			async translate(payload = {}) {
				const vm = this;
				await _.$sleep(600);
				const to = payload.to || "en";
				var query = payload.query;
				if (!query) {
					throw new Error("query is empty");
				}
				return new Promise(async (resolve, reject) => {
					let res = { dst: "unset" };
					try {
						var from = "auto";

						const { data: params, errcode } = await _api.yapi.i18nTranslate(payload);
						if (!errcode) {
							const { trans_result } = await translateByBaidu({ params, to, from });
							const [_res] = trans_result;
							resolve(_res);
						} else if (errcode === 408) {
							_.$msgError("需要配置百度翻译的appid和密钥");
							_.$openModal({
								title: "添加百度翻译的appid和密钥",
								url: "@/views/I18n/I18n.BaiduAppKey.dialog.vue",
								async onResponse({ appId, appKey }) {
									payload.appId = appId;
									payload.appKey = appKey;
									res = await vm.translate(payload);
									resolve(res);
								},
								onCancel() {
									reject();
									return true;
								}
							});
							return;
						}
					} catch (error) {
						reject(error);
					}
				});
			},
			async openUpsertDialog(rowData = {}) {
				return _.$openModal({
					title: rowData._id ? "修改国际化字段" : "新增国际化字段",
					url: "@/views/I18n/I18n.upsert.dialog.vue",
					refreshTableData: this.getTableData,
					parent: this,
					rowData
				});
			},
			async openTranslateDialog() {
				return _.$openModal({
					title: "批量在线翻译",
					url: "@/views/I18n/I18n.translate.dialog.vue",
					listData: _.filter(this.configsTable.data.list, row => {
						return this.configsTable.data.set.has(row._id);
					}),
					parent: this,
					refreshTableData: this.getTableData
				});
			},
			async openImportDialog() {
				return _.$openModal({
					title: "导入国际化字段",
					url: "@/views/I18n/I18n.import.dialog.vue",
					listData: this.configsTable.data.list,
					refreshTableData: this.getTableData
				});
			},
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					const { errcode, data } = await _api.yapi.i18nGetList();
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
				const filterForm = _.$pickFormValues(vm.searchForm);
				let listForShow = _.cloneDeep(vm.tableDataList);
				let paramKeys = Object.keys(filterForm);
				let prop;
				while ((prop = paramKeys.pop())) {
					let search = filterForm[prop];
					if (_.$isInput(search)) {
						listForShow = _.filter(listForShow, i => {
							search = _.trim(search);
							return (
								new RegExp(search, "i").test(i[prop]) ||
								new RegExp(search, "i").test(i[prop])
							);
						});
					}
				}
				vm.configsTable.data.set = new Set();
				vm.configsTable.data.list = listForShow;
			}, 1000);

			return {
				tableDataList: [],
				searchForm: defItems({
					// i18n: { value: 0, itemType: "xItemSelect", options: [ { label: i18n("中文"), value: 0 }, { label: i18n("English"), value: 1 } ] },
					key: {
						label: i18n("Prop"),
						value: "",
						clearable: true,
						attrs: {
							placeholder: i18n("请输入prop")
						}
					},
					zhCn: {
						label: i18n("中文"),
						value: "",
						clearable: true,
						attrs: {
							placeholder: i18n("请输入中文")
						}
					},
					enUs: {
						label: i18n("英文"),
						value: "",
						clearable: true,
						attrs: {
							placeholder: i18n("请输入英文")
						}
					}
				}),
				oprBtnArray: [
					{
						label: "新增",
						async onClick() {
							return vm.openUpsertDialog();
						}
					},
					{
						label: "导入",
						async onClick() {
							return vm.openImportDialog();
						}
					},
					{
						label: "在线翻译",
						disabled() {
							return vm.configsTable.data.set.size === 0;
						},
						async onClick() {
							return vm.openTranslateDialog();
						}
					}
				],
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
						{
							label: i18n("No."),
							prop: "_id",
							width: 60,
							cellRenderer({ rowData, rowIndex }) {
								return h("div", { attrs: { title: rowData.desc } }, [rowIndex + 1]);
							}
						},
						{ label: i18n("ID"), prop: "_id", isShow: false },
						{
							label: i18n("prop"),
							prop: "key",
							width: 300
						},
						{
							label: i18n("中文"),
							prop: "zhCn"
						},
						{
							label: i18n("English"),
							prop: "enUs"
						},
						{
							label: i18n("描述"),
							prop: "desc"
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
												vm.openUpsertDialog(rowData);
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
		}
	};
}
</script>

<style lang="less"></style>
