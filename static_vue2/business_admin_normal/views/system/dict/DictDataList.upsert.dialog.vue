<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.dictType" />
				<xItem :configs="form.dictLabel" />
				<xItem :configs="form.dictValue" />
				<xItem :configs="form.cssClass" />
				<xItem :configs="form.dictSort" />
				<xItem :configs="form.listClass" />
				<xItem :configs="form.status" />
				<xItem :configs="form.remark" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick, DICT_TYPE }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	let dicts = { sys_normal_disable: null };
	dicts = await _adminTools.newDicts(dicts);

	row = row || {};
	const isUpdate = !!row.dictCode;

	const LIST_CLASS_OPTIONS = [
		{
			value: "default",
			label: i18n("默认")
		},
		{
			value: "primary",
			label: i18n("主要")
		},
		{
			value: "success",
			label: i18n("成功")
		},
		{
			value: "info",
			label: i18n("信息")
		},
		{
			value: "warning",
			label: i18n("警告")
		},
		{
			value: "danger",
			label: i18n("危险")
		}
	];

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			const vm = this;
			return {
				isUpdate,
				form: defItems({
					dictType: {
						value: DICT_TYPE.dictType,
						label: i18n("字典类型"),
						readonly: true,
						rules: [_rules.required()]
					},
					dictLabel: {
						value: "",
						label: i18n("数据标签"),
						rules: [_rules.required()]
					},
					dictValue: {
						value: "",
						label: i18n("数据键值"),
						rules: [_rules.required()]
					},
					cssClass: {
						value: "",
						label: i18n("样式属性")
					},
					dictSort: {
						value: "",
						label: i18n("显示排序"),
						rules: [_rules.required()],
						isNumber: true,
						min: 0
					},
					listClass: {
						value: "",
						label: i18n("回显样式"),
						rules: [_rules.required()],
						itemType: "xItemSelect",
						options: LIST_CLASS_OPTIONS,
						itemSlots: {
							beforeController() {
								return h("div", { vIf: vm.form.listClass.value, class: "mr" }, [
									h("xTag", { type: vm.form.listClass.value }, [
										`${vm.form.dictLabel.value}`
									])
								]);
							}
						},
						optonsRender({ options }) {
							return h(
								"xForm",
								{ col: "4" },
								_.map(options, ({ label, value }) => {
									return h("xOption", {
										key: value,
										value: value,
										label: label,
										children: [h("xTag", { type: value }, [`${label}`])]
									});
								})
							);
						}
					},
					status: {
						value: "1",
						label: i18n("状态"),
						itemType: "xItemRadioGroup",
						isButton: true,
						options: dicts.sys_normal_disable,
						rules: [_rules.required()]
					},
					remark: {
						value: "",
						label: i18n("备注"),
						rules: [_rules.required()],
						type: "textarea"
					}
				})
			};
		},
		computed: {
			cptIsFunctionType() {
				return this.form.dictType.value === "F";
			},
			cptNotMenuType() {
				return this.form.dictType.value !== "C";
			},
			cptMenuId() {
				return row?.dictId;
			},
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
			async fillbackFormData() {
				if (isUpdate) {
					const { data } = await _adminTools.api_dict_data_by_dictCode(row.dictCode);
					row = data;
					_.$setFormValues(this.form, row);
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					if (isUpdate) {
						await _adminTools.api_dict_data_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_dict_data_new(formData);
					}
					onClick();
					_.$msg(isUpdate ? "修改成功" : "新增成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			}
		}
	});
}
</script>
