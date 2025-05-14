<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.dictName" />
				<xItem :configs="form.dictType" />
				<xItem :configs="form.status" />
				<xItem :configs="form.remark" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	let dicts = { sys_normal_disable: null };
	dicts = await _adminTools.newDicts(dicts);

	row = row || {};
	const isUpdate = !!row.dictId;

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
					dictName: {
						value: "",
						label: i18n("字典名称"),
						rules: [_rules.required()]
					},
					dictType: {
						value: "",
						label: i18n("字典类型"),
						rules: [_rules.required()]
					},
					status: {
						value: "1",
						label: i18n("status_info"),
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
					label: i18n("OK"),
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
					const { data } = await _adminTools.api_dict_type_by_dictId(row.dictId);
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
						await _adminTools.api_dict_type_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_dict_type_new(formData);
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
