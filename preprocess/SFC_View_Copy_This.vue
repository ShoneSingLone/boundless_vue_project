<template>
	<div class="x-page-view">
		<xPageTitle :title="i18n('标题使用i18n的key')" />
		<xPageContent>
			<xTablebar :configs="configsTable">
				<template #left>
					<xBtnArray :configs="oprBtnArray" />
				</template>
				<xItem :configs="c_search.siteId" />
				<xItem :configs="c_search.azId" />
				<xItem :configs="c_search.queryName" />
			</xTablebar>
			<xTable :configs="configsTable" />
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { getOptions_az, modifyTenant } = await _.$importVue();
	const 可用 = "1";

	return {
		inject: ["APP"],
		beforeDestroy() {},
		components: {},
		async mounted() {
			this.getTableData();
		},
		methods: {
			async getTableData(pagination = {}) {
				try {
					_.$loading(true);
					await _.$ensure(() => this.c_search.siteId.value && this.c_search.azId.value);
					const { page, sieze } = _.$setPagination(this.configsTable, pagination);

					const queryData = {
						limit: sieze,
						start: page
					};

					const { siteId, azId, queryName } = this.searchParams;
					siteId && (queryData.siteId = siteId);
					azId && (queryData.azId = azId);
					queryName && (queryData.name = queryName);

					const res = await _.$ajax.get(`/rest/fc/admin/v1.0/image/list`, {
						data: queryData
					});
					const { images, total } = res;

					_.$setTableData(this.configsTable, {
						list: images,
						total
					});
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			async upsertOne(row) {
				const DialogTypeVueSFC = await _.$importVue("@/DialogTypeVueSFC.vue", {
					parent: this,
					row
				});
				_.$openWindow_deprecated(i18n("modifyImageInfo"), DialogTypeVueSFC);
			}
		},
		watch: {},
		data() {
			const vm = this;
			return {
				oprBtnArray: [
					{
						label: i18n("open"),
						onClick() {
							vm.open();
						}
					}
				],
				c_search: {
					siteId: {
						value: "",
						clearable: false,
						itemType: "xItemSelect",
						options: [],
						async once() {
							try {
								const { vmConfigInfos } = await _.$ajax.get("/rest/fc/admin/v1.0/vmconfig/list");
								this.configs.options = _.map(vmConfigInfos, i => {
									return {
										item: i,
										label: i.vmName,
										value: i.id
									};
								});
								this.configs.value = _.$getFirstOrDefaultValue(this.configs.options, "");
							} catch (error) {
								console.error(error);
							}
						},
						async onEmitValue({ val: siteId }) {
							vm.c_search.azId.value = "";
							vm.c_search.azId.options = [];
							if (!siteId) {
								return;
							}
							vm.c_search.azId.options = await getOptions_az(siteId);
							vm.c_search.azId.value = _.$getFirstOrDefaultValue(vm.c_search.azId.options, "");
						}
					},
					azId: {
						value: "",
						clearable: false,
						itemType: "xItemSelect",
						options: []
					},
					queryName: {
						value: "",
						placeholder: i18n("msgEnterTheNameOfTheQuery")
					}
				},
				configsTable: {
					isHideFilter: false,
					isHideQuery: false,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					data: {
						list: []
					},
					colInfo: {
						/* COL_SINGLE: {selectedBy:"id"}, */
						id: { label: i18n("id"), isShow: false },
						name: { label: i18n("name"), isShow: true },
						status: {
							label: i18n("status"),
							isShow: true,
							xCellText() {
								return {
									setLabel({ row, label }) {
										if (row.status == "1") {
											label = i18n("available");
										} else {
											label = i18n("unavailable");
										}
										return label;
									}
								};
							}
						},
						arch: { label: i18n("arch"), isShow: true },
						osType: { label: i18n("osType"), isShow: true },
						cpu: { label: i18n("cpu"), isShow: true },
						memory: { label: i18n("memory"), isShow: true },
						disk: { label: i18n("disk"), isShow: true },
						mac: { label: i18n("mac"), isShow: false },
						description: { label: i18n("description"), isShow: true },
						createTime: {
							label: i18n("creationTime"),
							isShow: true,
							xCellText() {
								return {
									setLabel({ row }) {
										return _.$dateFormat(row.createTime);
									}
								};
							}
						},
						COL_ACTIONS: {
							btnList: [
								{
									label: i18n("modify"),
									onClick({ row }) {
										vm.upsertOne(row);
									}
								},
								{
									label: i18n("delete"),
									onClick({ row }) {
										_.$confirm_important({
											content: `${i18n("msgSureDelete")}${i18n("QOS规格")}${row.name}?`
										}).then(async () => {
											try {
												_.$loading(true);
												await _.$ajax.post(`xxxxxx`, {
													data: {
														ids: [{ id: row.id, name: row.name }]
													}
												});
												_.$msg(i18n("msgDeleteTaskDeliveredSuccess"));
												vm.getTableData({ current: 0 });
											} catch (e) {
												_.$msgError(e.message);
											} finally {
												_.$loading(false);
											}
										});
									}
								},
								{
									label: i18n("makeAvailable"),
									isHide({ row }) {
										return row.status == 可用;
									},
									onClick({ row }) {
										_.$confirm({
											title: i18n("updateStatus"),
											content: i18n("msgSetImageToAvailable")
										}).then(async () => {
											try {
												_.$loading(true);
												await _.$ajax.post(`/rest/fc/admin/v1.0/image/status`, {
													data: {
														status: "1",
														id: row.id
													}
												});
												_.$msg(i18n("msgSetUnavailableStatusSuccess"));
												vm.getTableData({ current: 0 });
											} catch (e) {
												_.$msgError(e.message);
											} finally {
												_.$loading(false);
											}
										});
									}
								},
								{
									label: i18n("makeUnavailable"),
									isHide({ row }) {
										return row.status != 可用;
									},
									onClick({ row }) {
										_.$confirm({
											title: i18n("updateStatus"),
											content: i18n("msgSetImageToAvailable")
										}).then(async () => {
											try {
												_.$loading(true);
												await _.$ajax.post(`/rest/fc/admin/v1.0/image/status`, {
													data: {
														status: "0",
														id: row.id
													}
												});
												_.$msg(i18n("msgSetUnavailableStatusSuccess"));
												vm.getTableData({ current: 0 });
											} catch (e) {
												_.$msgError(e.message);
											} finally {
												_.$loading(false);
											}
										});
									}
								},
								{
									label: i18n("configTenantPermissions"),
									onClick({ row }) {
										modifyTenant({ row, resType: "IMAGE" });
									}
								}
							]
						}
					}
				}
			};
		},
		computed: {
			searchParams() {
				return _.$pickFormValues(this.c_search);
			}
		}
	};
}
</script>

<style lang="less"></style>
