<style lang="less">
.title {
	font-family: Source Han Sans CN;
	font-weight: 500;
	font-size: 16px;
	color: #171b1e;
	margin-bottom: 15px;
}
</style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xRow>
				<xCol style="--xItem-wrapper-width: 220px; --xItem-label-width: 68px">
					<xCard style="background: #f8f8f8">
						<div class="uploader-box-wrapper flex middle pointer" @click="openUploader">
							<xIcon icon="_upload" />
							<span class="ml"> 添加文件 </span>
						</div>
						<!-- <div class="title">添加文件路径</div>
						<div class="flex">
							<xItem :configs="item" v-for="item in formSearch" :key="item.label" />
							<xBtnArray :configs="oprBtnArray" style="margin-left: 20px" />
							<xGap f />
						</div> -->
					</xCard>
				</xCol>
			</xRow>
			<div class="flex end mt mb">
				<xBtnArray :configs="oprBtnArrayRight" />
			</div>
			<div class="x-page-content-middle mt8">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
			<xPagination :configs="configsTable" />
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		mounted() {
			this.getTableData();
		},
		data(vm) {
			return {
				formSearch: defItems({
					部门id: { label: "", value: "", placeholder: "请输入" }
				}),
				oprBtnArray: [{ label: "添加", preset: "primary", onClick() {} }],
				oprBtnArrayRight: [
					{
						label: "刷新",
						preset: "primary",
						icon: "icon_refresh",
						onClick() {
							vm.$router.push({
								path: "/dept/edit"
							});
						}
					}
				],
				configsTable: defTable({
					isHideQuery: true,
					isHideFilter: true,
					onQuery(pagination) {
						vm.getTableData(pagination);
					},
					data: {
						set: new Set(),
						list: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 10
					},
					columns: [
						defTable.colSingle({
							by: "id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							prop: "no",
							label: "序号",
							width: 80,
							cellRenderer: ({ rowIndex }) => rowIndex + 1
						},
						{ prop: "文件路径", label: "部门id" },
						{ prop: "上传状态", label: "部门名" },
						{ prop: "结果", label: "员工数" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "查看",
											onClick() {
												vm.handleDetail(rowData);
											}
										}
										// {
										// 	label: "编辑",
										// 	icon: "_icon_btn_view",
										// 	onClick() {
										// 		vm.$router.push({
										// 			path: "/dept/edit",
										// 			query: { id: rowData.id }
										// 		});
										// 	}
										// },
										// {
										// 	label: "删除",
										// 	icon: "_delete",
										// 	async onClick() {}
										// }
									]
								});
							}
						})
					]
				})
			};
		},
		computed: {
			selected() {
				const selectedIds = Array.from(this.configsTable.data.set);
				if (_.$isArrayFill(selectedIds)) {
					const [selectedId] = selectedIds;
					const selected = _.find(this.configsTable.data.list, { id: selectedId });
					return selected;
				}
				return {};
			}
		},
		methods: {
			async openUploader() {
				const [file] = await _.$openFileSelector();
				if (!file) {
					return;
				}
				var formData = new FormData();
				formData.append("file", file);
				return _.$ajax.upload({
					url: "/xds/agent/outline",
					formData,
					callback(eventName, event) {
						if (eventName === "onprogress") {
							console.log("onprogress", event);
						}
					}
				});
			},
			async handleDetail(row) {
				const dialog = await _.$openModal({
					title: "离线流量审计结果",
					url: "@/views/security_adjust/offline_traffic_analysis/offline_traffic_analysis_dialog.vue",
					payload: {},
					onOk() {
						console.log("1");
					}
				});
			},
			async getTableData(pagination) {
				try {
					_.$loading(true);
					// const { page, size } = _.$setPagination(this.configsTable, pagination);
					// const queryData = { pageSize: size, pageNo: page };
					// const { records, total } = await _api.mo_vdun_oc.adminVdunV10FlavorList(queryData);
					_.$setTableData(this.configsTable, {
						list: [
							{
								id: "asdfasdfasdf",
								ipv4: "192.168.0.1",
								ipv6: "fe08:8800",
								port: "4396",
								remarks: "探针1",
								status: "running",
								active: true
							}
						],
						total: 200
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
