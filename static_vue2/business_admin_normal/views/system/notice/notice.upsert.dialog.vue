<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.noticeTitle" />
				<xItem :configs="form.noticeType" />
				<xItem :configs="form.status" />
				<xItem :configs="form.noticeContent" />
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
	let dicts = {
		sys_notice_type: null,
		sys_notice_status: null
	};
	dicts = await _adminTools.newDicts(dicts);

	row = row || {};
	const isUpdate = !!row.noticeId;

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
					noticeTitle: { value: "", label: i18n("公告标题"), rules: [_rules.required()] },
					noticeType: {
						value: _.first(dicts.sys_notice_type).value,
						label: i18n("公告类型"),
						rules: [_rules.required()],
						itemType: "xItemRadioGroup",
						isButton: true,
						options: dicts.sys_notice_type,
						itemSlots: {
							beforeController() {
								return hDiv({ class: "mr" }, [
									hVal2Tag(vm.form.noticeType.value, dicts.sys_notice_type),
									h("xGap", { f: true })
								]);
							}
						}
					},
					status: {
						value: _.first(dicts.sys_notice_status).value,
						label: i18n("status_info"),
						rules: [_rules.required()],
						itemType: "xItemRadioGroup",
						isButton: true,
						options: dicts.sys_notice_status
					},
					noticeContent: {
						value: "",
						label: i18n("内容"),
						rules: [_rules.required()],
						type: "textarea"
					}
				})
			};
		},
		computed: {
			cptIsFunctionType() {
				return this.form.noticeType.value === "F";
			},
			cptNotMenuType() {
				return this.form.noticeType.value !== "C";
			},
			cptMenuId() {
				return row?.noticeId;
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
					const { data } = await _adminTools.api_notice_by_noticeId(row.noticeId);
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
						await _adminTools.api_notice_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_notice_new(formData);
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
