<template>
	<xDialog>
		<xCard>
			<xForm ref="form" col="1">
				<xItem :configs="form.postName" />
				<xItem :configs="form.postCode" />
				<xItem :configs="form.postSort" />
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
export default async function ({ row, onClick }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	row = row || {};
	const isUpdate = !!row.postId;

	const { sys_normal_disable } = await _adminTools.newDicts({
		sys_normal_disable: null
	});

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			return {
				isUpdate,
				form: defItems({
					postName: { value: "", label: "岗位名称", rules: [_rules.required()] },
					postCode: {
						value: "",
						label: "岗位编码",
						rules: [_rules.required()],
						tips: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPost('admin')`)"
					},
					postSort: {
						value: 0,
						label: "岗位顺序",
						rules: [_rules.required()],
						isNumber: true,
						min: 0
					},
					status: {
						value: "0",
						label: "岗位状态",
						itemType: "xItemRadioGroup",
						isButton: true,
						options: sys_normal_disable
					},
					remark: { value: "", label: "备注", type: "textarea" }
				})
			};
		},
		computed: {
			cptPostId() {
				return row?.postId;
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
					const { data } = await _adminTools.api_post_by_postId(row.postId);
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
						await _adminTools.api_post_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_post_new(formData);
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
