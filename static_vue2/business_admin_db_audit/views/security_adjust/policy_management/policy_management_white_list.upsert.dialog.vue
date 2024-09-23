<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.value" />
		</xForm>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, parent }) {
	const isUpdate = false;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			if (row && Object.keys(row).length > 0) {
				this.form.value.value = row.value;
			}
			await this.handleGetXdsOptionsPredicate();
		},
		data() {
			return {
				form: {
					value: {
						value: "",
						label: i18n("表项值"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.ipV4()]
					}
				}
			};
		},
		computed: {
			isUpdate() {
				return !!row;
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
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				const fn = row
					? _api.admin_db_audit.xdsWhitelistEdit
					: _api.admin_db_audit.xdsWhitelistAdd;
				let obj = _.$pickFormValues(this.form);
				if (row) {
					obj = {
						...row,
						..._.$pickFormValues(this.form)
					};
				}
				obj = {
					...obj,
					status: this.$route.query.status
				};
				const { code, msg } = await fn(obj);
				if (code === 0) {
					_.$msg(msg);
				} else {
					_.$msgError(msg);
				}
				parent.getTableData({ page: 1 });
				this.closeModal();
			}
		}
	});
}
</script>
