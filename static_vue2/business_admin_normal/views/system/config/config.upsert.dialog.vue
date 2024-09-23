<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.configName" />
				<xItem :configs="form.configKey" />
				<xItem :configs="form.configValue" />
				<xItem :configs="form.configType" />
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
export default async function ({ row, onClick }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	let configs = { sys_yes_no: null };
	configs = await _adminTools.newDicts(configs);

	row = row || {};
	const isUpdate = !!row.configId;

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
					configName: { value: "", label: i18n("参数名称"), rules: [_rules.required()] },
					configKey: { value: "", label: i18n("参数键名"), rules: [_rules.required()] },
					configValue: { value: "", label: i18n("参数键值"), rules: [_rules.required()] },
					configType: {
						value: "",
						label: i18n("系统内置"),
						rules: [_rules.required()],
						itemType: "xItemRadioGroup",
						isButton: true,
						options: configs.sys_yes_no
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
				return this.form.configType.value === "F";
			},
			cptNotMenuType() {
				return this.form.configType.value !== "C";
			},
			cptMenuId() {
				return row?.configId;
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
					const { data } = await _adminTools.api_config_by_configId(row.configId);
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
						await _adminTools.api_config_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_config_new(formData);
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
