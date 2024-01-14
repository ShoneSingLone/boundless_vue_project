<template>
	<xDialog style="max-width: 600px">
		<!-- '--xItem-label-width': "144px" -->
		<xCard>
			<xForm ref="form" v-xloading="isLoading">
				<xItem :configs="form.COL_b" span="full" />
				<xItem :configs="form.COL_c" span="full" />
				<xItem :configs="form.COL_d" span="full" />
				<xItem :configs="form.COL_e" span="full" />
				<xItem :configs="form.COL_f" span="full" />
				<xItem :configs="form.COL_g" span="full" v-if="SpecialType === 'VdcQuota'" />
				<xItem :configs="form.COL_a" span="full" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ row, onAdd, COL_b, COL_cOptions, state, configsTableDataList, SpecialType }) {
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
					COL_b: { value: row?.COL_b || COL_b, label: i18n("b"), attrs: { readonly: true } },
					COL_c: {
						value: "",
						itemType: "xItemSelect",
						label: i18n("c"),
						options: COL_cOptions,
						onEmitValue({ val }) {
							if (val) {
								vm.labels.COL_c_label = _.find(this.options, { value: val })?.label;
							}
						},
						rules: [_rules.required()]
					},
					COL_d: {
						value: "",
						label: i18n("d"),
						itemType: "xItemSelect",
						rules: [_rules.required()],
						disabled({ xItem }) {
							return !this.options.length;
						},
						options: [],
						once() {
							vm.$watch(
								"cptFormData.COL_c",
								service_id => {
									this.value = "";
									this.options = (() => {
										/* COL_c */
										if (!service_id) {
											return [];
										}
										return _.uniqBy(_.filter(state.allAz, { service_id }), "value");
									})();
								},
								Vue._immediate
							);
						},
						onEmitValue({ val, index }) {
							if (val) {
								vm.labels.COL_d_label = _.find(this.options, { value: val }).label;
							}
						}
					},
					COL_e: {
						value: "",
						label: i18n("e"),
						itemType: "xItemSelect",
						rules: [_rules.required()],
						disabled({ xItem }) {
							return !this.options.length;
						},
						options: [],
						once() {
							vm.$watch(
								() => [vm.form.COL_c.value, vm.form.COL_d.value],
								([service_id, az_id]) => {
									this.value = "";
									this.options = (() => {
										try {
											if (_.some([az_id, service_id], i => !i)) {
												return [];
											}
											const COL_e = isUpdate ? row.COL_e : vm.cptFormData.COL_e;

											const selected = _.filter(configsTableDataList, {
												COL_c: service_id,
												COL_d: az_id
											}).map(i => i.COL_e);

											return _.uniqBy(
												_.filter(state.allResource, i => {
													var isSameAz = i.az_id === az_id;
													var isSameService = i.service_id === service_id;
													var isCurrentSelected = COL_e === i.resource_id;
													/*未使用*/
													var isAble = !selected.includes(i.resource_id);
													if (isSameAz && isSameService && isCurrentSelected) {
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
								vm.labels.COL_e_label = item.label;
								this.currentItem = item;
							}
						}
					},
					COL_f: { value: "", label: i18n("f"), attrs: { readonly: true } },
					COL_g: { value: "", label: i18n("g"), attrs: { readonly: true } },
					COL_a: {
						value: 0,
						label: i18n("a"),
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
											let { max, min } = vm.form.COL_e.currentItem;
											if (max !== -1) {
												if (val > max) {
													return `最大值为${max}`;
												}
											}
											if (val < min) {
												return `最小值为${min}`;
											}
										} else {
											if (vm.cptFormData.COL_f === 0) {
												return "";
											}
											/* const matched = String(vm.cptFormData.COL_f).match(/-?\d+/g) || [];
											let [total] = matched;
											total = Number(total);
											if (total === -1) {
												return "";
											} */
											if (val < 0 || val > total) {
												return "a需小于f";
											}
										}
									} catch (error) {}
									return "";
								},
								trigger: ["change"]
							}
						],
						onEmitValue({ val }) {
							const { COL_c: service_id, COL_d: az_id, COL_e: resource_id } = vm.cptFormData;
							const resource = _.find(state.allResource, {
								service_id,
								az_id,
								resource_id
							});
							if (resource) {
								let { unit } = resource;
								unit = unit.zh_cn;
								vm.labels.COL_a_label = `${val} ${unit}`;
							}
						},
						itemSlots: {
							afterController() {
								const { COL_c: service_id, COL_d: az_id, COL_e: resource_id } = vm.cptFormData;
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
									return h("span", { class: "ml8" }, [unit.zh_cn]);
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
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) return;
						vm.$closeWindow();
						onAdd(_.merge(row, vm.cptFormData, vm.labels));
					}
				};
			}
		},
		watch: {
			"form.COL_e.value"(val) {
				this.setLabel(val);
			}
		},
		methods: {
			setLabel(val) {
				const vm = this;
				const { COL_c: service_id, COL_d: az_id } = vm.cptFormData;
				const resource = _.find(state.allResource, {
					service_id,
					az_id,
					resource_id: val
				});

				if (resource) {
					let { unit, quota_left, quota_used } = resource;
					unit = unit.zh_cn;
					let f_label = `${quota_left} ${unit}`;
					if (quota_left === -1) {
						if (SpecialType === "VdcQuota") {
							f_label = "无限";
						} else {
							f_label = 0;
						}
					}
					vm.form.COL_f.value = f_label;
					vm.form.COL_g.value = `${quota_used} ${unit}`;
				}
			},

			async init() {
				if (isUpdate) {
					_.$fillBackData({
						form: this.form,
						data: row,
						order: ["COL_c", "COL_d", "COL_e", "COL_f", "COL_g", "COL_a"]
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
