<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.ruleName" />
			<xItem :configs="form.featureName" />
			<xItem :configs="form.featureValue" />
			<xItem :configs="form.predicate" />
			<xItem :configs="form.priority" />
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
	const isUpdate = !!row;
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			if (row && Object.keys(row).length > 0) {
				this.form.ruleName.value = row.ruleName;
				this.form.featureName.value = row.featureName;
				this.form.featureValue.value = row.featureValue;
				this.form.predicate.value = row.predicate;
				this.form.priority.value = row.priority;
			}
			await this.handleGetXdsOptionsPredicate();
		},
		data() {
			return {
				form: {
					ruleName: {
						value: "",
						label: i18n("规则名"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					featureName: {
						value: "",
						label: i18n("特征名"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					featureValue: {
						value: "",
						label: i18n("特征值"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					predicate: {
						value: "",
						label: i18n("谓词"),
						disabled: isUpdate,
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					priority: {
						value: "",
						label: i18n("优先级"),
						disabled: isUpdate,
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
			async handleGetXdsOptionsPredicate() {
				this.form.predicate.options = await _api.admin_db_audit.xdsOptionsPredicate();
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				const fn = row ? _api.admin_db_audit.xdsRuleEdit : _api.admin_db_audit.xdsRuleAdd;
				let obj = _.$pickFormValues(this.form);
				if (row) {
					obj = {
						...row,
						..._.$pickFormValues(this.form)
					};
				}
				obj = {
					...obj,
					strategyName: this.$route.query.strategyName,
					id: this.$route.query.id
				};
				const { code, msg } = await fn(obj);
				if (code === 0) {
					_.$msg(msg);
					this.closeModal();
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
