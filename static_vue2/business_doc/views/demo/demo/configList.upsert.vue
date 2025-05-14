<template>
	<xDialog style="max-width: 600px">
		<!-- '--xItem-label-width': "144px" -->
		<xCard>
			<xForm ref="form" v-xloading="isLoading">
				<xItem :configs="form.COL_环境区域" span="full" />
				<xItem :configs="form.COL_云服务类型" span="full" />
				<xItem :configs="form.COL_可用区" span="full" />
				<xItem :configs="form.COL_配额指标" span="full" />
				<xItem :configs="form.COL_当前总配额" span="full" />
				<xItem
					:configs="form.COL_已使用配额"
					span="full"
					v-if="SpecialType === 'VdcQuota'" />
				<xItem :configs="form.COL_申请后配额" span="full" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({
	row,
	onAdd,
	COL_环境区域,
	COL_云服务类型Options,
	state,
	configsTableDataList,
	SpecialType
}) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const isUpdate = !!row;

	return {
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			const vm = this;
			return {
				SpecialType,
				isLoading: false,
				labels: {},
				form: {
					COL_环境区域: {
						value: row?.COL_环境区域 || COL_环境区域,
						label: i18n("环境区域"),
						attrs: { readonly: true }
					},
					COL_云服务类型: {
						value: "",
						itemType: "xItemSelect",
						label: i18n("云服务类型"),
						options: COL_云服务类型Options,
						onEmitValue({ val }) {
							if (val) {
								vm.labels.COL_云服务类型_label = _.find(this.options, {
									value: val
								})?.label;
							}
						},
						rules: [_rules.required()]
					},
					COL_可用区: {
						value: "",
						label: i18n("可用区"),
						itemType: "xItemSelect",
						rules: [_rules.required()],
						disabled({ xItem }) {
							return !this.options.length;
						},
						options: [],
						once() {
							vm.$watch(
								"cptFormData.COL_云服务类型",
								service_id => {
									this.value = "";
									this.options = (() => {
										/* COL_云服务类型 */
										if (!service_id) {
											return [];
										}
										return _.uniqBy(
											_.filter(state.allAz, { service_id }),
											"value"
										);
									})();
								},
								Vue._immediate
							);
						},
						onEmitValue({ val, index }) {
							if (val) {
								vm.labels.COL_可用区_label = _.find(this.options, {
									value: val
								}).label;
							}
						}
					},
					COL_配额指标: {
						value: "",
						label: i18n("配额指标"),
						itemType: "xItemSelect",
						rules: [_rules.required()],
						disabled({ xItem }) {
							return !this.options.length;
						},
						options: [],
						once() {
							vm.$watch(
								() => [vm.form.COL_云服务类型.value, vm.form.COL_可用区.value],
								([service_id, az_id]) => {
									this.value = "";
									this.options = (() => {
										try {
											if (_.some([az_id, service_id], i => !i)) {
												return [];
											}
											const COL_配额指标 = isUpdate
												? row.COL_配额指标
												: vm.cptFormData.COL_配额指标;

											const selected = _.filter(configsTableDataList, {
												COL_云服务类型: service_id,
												COL_可用区: az_id
											}).map(i => i.COL_配额指标);

											return _.uniqBy(
												_.filter(state.allResource, i => {
													var isSameAz = i.az_id === az_id;
													var isSameService = i.service_id === service_id;
													var isCurrentSelected =
														COL_配额指标 === i.resource_id;
													/*未使用*/
													var isAble = !selected.includes(i.resource_id);
													if (
														isSameAz &&
														isSameService &&
														isCurrentSelected
													) {
														return true;
													}
													return isSameAz && isSameService && isAble;
												}),
												"value"
											);
										} catch (error) {
											console.error(error);
										}
									})();
								},
								Vue._immediate
							);
						},
						onEmitValue({ val, index }) {
							if (val) {
								const item = _.find(this.options, { value: val });
								vm.labels.COL_配额指标_label = item.label;
								this.currentItem = item;
							}
						}
					},
					COL_当前总配额: {
						value: "",
						label: i18n("当前总配额"),
						attrs: { readonly: true }
					},
					COL_已使用配额: {
						value: "",
						label: i18n("已使用配额"),
						attrs: { readonly: true }
					},
					COL_申请后配额: {
						value: 0,
						label: i18n("申请后配额"),
						isNumber: true,
						props: {
							min: 0,
							step: 1,
							precision: 0
						},
						rules: [
							_rules.required(),
							{
								async validator({ val, xItem }) {
									if (val === "") {
										return "";
									}

									if (!/^[1-9]\d{0,20}$/.test(val)) {
										return "请输入正整数";
									}
									try {
										if (vm.SpecialType === "VdcQuota") {
											let { max, min } = vm.form.COL_配额指标.currentItem;
											if (max !== -1) {
												if (val > max) {
													return `最大值为${max}`;
												}
											}
											if (val < min) {
												return `最小值为${min}`;
											}
										} else {
											if (vm.cptFormData.COL_当前总配额 === 0) {
												return "";
											}
											/* const matched = String(vm.cptFormData.COL_当前总配额).match(/-?\d+/g) || [];
											let [total] = matched;
											total = Number(total);
											if (total === -1) {
												return "";
											} */
											if (val < 0 || val > total) {
												return "申请后配额需小于当前总配额";
											}
										}
									} catch (error) {}
									return "";
								},
								trigger: ["change"]
							}
						],
						onEmitValue({ val }) {
							const {
								COL_云服务类型: service_id,
								COL_可用区: az_id,
								COL_配额指标: resource_id
							} = vm.cptFormData;
							const resource = _.find(state.allResource, {
								service_id,
								az_id,
								resource_id
							});
							if (resource) {
								let { unit } = resource;
								unit = unit.zh_cn;
								vm.labels.COL_申请后配额_label = `${val} ${unit}`;
							}
						},
						itemSlots: {
							afterController() {
								const {
									COL_云服务类型: service_id,
									COL_可用区: az_id,
									COL_配额指标: resource_id
								} = vm.cptFormData;
								if (!(service_id && az_id && resource_id)) {
									return null;
								}

								const resource = _.find(state.allResource, {
									service_id,
									az_id,
									resource_id
								});

								if (resource) {
									let { unit } = resource;
									return hSpan({ class: "ml8" }, [unit.zh_cn]);
								}
								return null;
							}
						}
					}
				}
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
					label: i18n("OK"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						vm.closeModal();
						onAdd(_.merge(row, vm.cptFormData, vm.labels));
					}
				};
			}
		},
		watch: {
			"form.COL_配额指标.value"(val) {
				this.setLabel(val);
			}
		},
		methods: {
			setLabel(val) {
				const vm = this;
				const { COL_云服务类型: service_id, COL_可用区: az_id } = vm.cptFormData;
				const resource = _.find(state.allResource, {
					service_id,
					az_id,
					resource_id: val
				});

				if (resource) {
					let { unit, quota_left, quota_used } = resource;
					unit = unit.zh_cn;
					let 当前总配额_label = `${quota_left} ${unit}`;
					if (quota_left === -1) {
						if (SpecialType === "VdcQuota") {
							当前总配额_label = "无限";
						} else {
							当前总配额_label = 0;
						}
					}
					vm.form.COL_当前总配额.value = 当前总配额_label;
					vm.form.COL_已使用配额.value = `${quota_used} ${unit}`;
				}
			},

			async init() {
				if (isUpdate) {
					_.$fillBackData({
						form: this.form,
						data: row,
						order: [
							"COL_云服务类型",
							"COL_可用区",
							"COL_配额指标",
							"COL_当前总配额",
							"COL_已使用配额",
							"COL_申请后配额"
						]
					});
				}
			}
		}
	};
}
</script>

<style lang="less">
.network-item {
	display: flex;
	margin: 24px 0;

	.xItem-wrapper.middle {
		margin-top: 0;
	}
}
</style>
