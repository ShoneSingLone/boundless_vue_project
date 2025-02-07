<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.name" />
		</xForm>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		mounted() {
			if (row && Object.keys(row).length > 0) {
				this.form.name.value = row.name;
			}
		},
		data() {
			return {
				form: {
					name: {
						value: "",
						label: i18n("策略类型名"),
						rules: [_rules.required(), _rules.lessThan(50)]
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
				let obj = _.$pickFormValues(this.form);
				if (row && Object.keys(row).length > 0) {
					obj = {
						...row,
						...obj
					};
				}
				const fn = row
					? _api.admin_db_audit.xdsStrategyEdit
					: _api.admin_db_audit.xdsStrategyAdd;
				const res = await fn(obj);
				if (res.code === 0) {
					_.$msgSuccess(res.msg);
					this.closeModal();
					parent.getTableData({ page: 1 });
				} else {
					_.$msgError(res.msg);
				}
			}
		}
	});
}
</script>
