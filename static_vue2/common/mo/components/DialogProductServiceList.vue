<template>
	<xDialog id="DialogProductServiceList">
		<div class="flex vertical pt pr pl" style="width: 900px; min-height: 400px">
			<div class="headForWin flex">
				<xGap f />
				<xItem :configs="form.name" />
				<xBtn class="ml8" id="btn-refresh" @click="queryTableData()">
					<xIcon icon="icon_refresh" />
				</xBtn>
			</div>
			<div class="flex flex1 center">
				<xForm v-if="configsTable.data.list.length">
					<xCard v-for="service in configsTable.data.list" :key="service.id">
						<div class="flex horizon width100">
							<div class="leftPart">
								<xIcon :icon="cptIconName" style="width: 64px; height: 64px" />
							</div>
							<div class="rightPart flex1 flex center vertical" style="position: relative">
								<div class="title" style="font-size: 17px; text-align: left">
									{{ service.name }}
								</div>
								<div class="description mt mb" style="height: 70px; overflow: auto; word-wrap: break-word; color: var(--ui-base-color-5)">
									{{ service.description }}
								</div>
								<div v-if="service.status == 'published'" class="width100">
									<xBtn preset="blue" @click="onClickOk(service.id)"> {{ i18n("立即申请") }} </xBtn>
								</div>
							</div>
						</div>
					</xCard>
				</xForm>
				<xRender v-else :render="emptyRender" class="width100" />
			</div>
			<xPagination :configs="configsTable" />
		</div>
		<template #footer>
			<div class="flex center width100">
				<xBtn @click="$closeWindow" preset="blue">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ onSelect, onCancel, service_type, icon }) {
	const { emptyRender } = await _.$importVue("/common/ui-x/components/data/xTableVir/xTableEmptyRender.vue");
	/* 必要，混入"$closeWindow", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.queryTableData();
		},
		data() {
			const vm = this;
			return {
				form: {
					name: {
						value: "",
						placeholder: i18n("请输入服务名称"),
						onEnter() {
							vm.configsTable.onQuery({ page: 1 });
						},
						$vSlots: {
							append() {
								return h("xIcon", {
									icon: "icon_search",
									staticClass: "pointer",
									onClick() {
										vm.configsTable.onQuery({ page: 1 });
									}
								});
							}
						}
					}
				},
				configsTable: defTable({
					data: {
						list: []
					},
					pagination: {
						page: 1,
						total: 0,
						size: 4,
						pageSizes: [4, 6, 8]
					},
					onQuery(pagination) {
						return vm.queryTableData(pagination);
					},
					columns: []
				})
			};
		},
		computed: {
			cptIconName() {
				const ICON_MAP = {
					/* 云服务器 */
					ecs: "mo_icon-ecm_center_console",
					/* 安全组 */
					sg: "mo_icon-security_cloudFirewall_center_console",
					/* 云硬盘 */
					evs: "mo_icon-ebs_center_console",
					/* VPC */
					vpc: "mo_icon-vpc_center_console"
				};
				return ICON_MAP[icon] || "xloading";
			},
			emptyRender() {
				return emptyRender;
			},
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [error] = await _.$validateForm(vm.$refs.form);
						if (error) {
							return;
						}
						this.onClickOk();
					}
				};
			}
		},
		methods: {
			async queryTableData(pagination = {}) {
				const vm = this;
				vm.services = [];
				_.$setPagination(vm.configsTable, pagination);
				const params = vm.getQueryParams();
				await _.$trylog(async () => {
					let data = await _MoCfContext._api.getProductListFn(params);
					if (_.$isArrayFill(data?.products)) {
						_.$setTableData(vm.configsTable, {
							list: _.map(data.products, function (v) {
								var lang = _MoCfContext.locale === "en-us" ? "en_US" : "zh_CN";
								return {
									status: "published",
									id: v.product_id,
									name: JSON.parse(v.name)[lang],
									description: JSON.parse(v.description)[lang]
								};
							}),
							total: data.total
						});
					} else {
						_.$setTableData(vm.configsTable, { list: [], total: 0 });
					}
				});
			},
			getQueryParams() {
				var params = {
					/* 不能有多余的参数 */
					region_id: _MoCfContext.commonParams().regionId,
					service_type,
					start: this.configsTable.pagination.page || 1,
					limit: this.configsTable.pagination.size || 4,
					name: this.cptFormData.name || ""
				};
				return params;
			},
			async onClickOk(serverId) {
				onSelect && onSelect(serverId);
				this.$closeWindow();
			}
		}
	});
}
</script>
<style lang="less">
#DialogProductServiceList {
	.leftPart {
		width: 100px;
		font-size: 100px;
		text-align: center;
	}
	#btn-refresh {
		padding: 0 8px;
		.xIcon {
			:hover {
				color: var(--el-button-hover-text-color);
			}
		}
	}

	.empty.xIcon.icon_no_data {
		width: 128px;
		height: 128px;
	}

	.xPagination {
		padding-bottom: 0;
	}
}
</style>
