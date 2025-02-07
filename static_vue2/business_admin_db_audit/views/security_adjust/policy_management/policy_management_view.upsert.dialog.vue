<template>
	<xDialog>
		<xForm col="1" ref="form">
			<xItem :configs="form.strategyName" v-if="!isUpdate" />
			<xItem :configs="form.priority" v-if="!isUpdate" />
			<xItem :configs="form.风险等级" v-if="!isUpdate" />
			<div class="flex middle width100 mt" v-if="!isUpdate">
				规则
				<xGap f />
				<xBtn :configs="btnAppend" />
			</div>
			<xForm col="1">
				<ruleItem
					v-for="(item, index) in actionList"
					:item="item"
					:index="index"
					:predicateList="predicateList"
					:JointList="JointList"
					:FeatureList="FeatureList"
					:key="item._hash"
					:isUpdates="isUpdates"
					@update:item="item => updateItem({ index, item })"
					@remove="remove({ index })" />
			</xForm>
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
	const newItem = () => ({ _hash: _.$genId() });
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			await this.handleGetXdsOptionsRisk();
			await this.handleGetXdsOptionsJoint();
			await this.handleGetXdsOptionsPredicate();
			await this.handleGetXdsOptionsFeature();
			if (row && Object.keys(row).length > 0) {
				this.actionList = row.rules;
				this.isUpdates = true;
			}
		},
		components: {
			// MenuActionItem: () => _.$importVue("@/views/Menu/MenuActionItem.vue"),
			ruleItem: () => _.$importVue("@/views/security_adjust/policy_management/ruleItem.vue")
		},
		data() {
			return {
				FeatureList: [],
				isUpdates: false,
				JointList: [],
				actionList: [],
				form: {
					strategyName: {
						value: "",
						label: i18n("策略名"),
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					// featureName: {
					// 	value: "",
					// 	label: i18n("特征名"),
					// 	rules: [_rules.required(), _rules.lessThan(50)]
					// },
					// featureValue: {
					// 	value: "",
					// 	label: i18n("特征值"),
					// 	disabled: isUpdate,
					// 	rules: [_rules.required(), _rules.lessThan(50)]
					// },
					// predicate: {
					// 	value: "",
					// 	label: i18n("谓词"),
					// 	disabled: isUpdate,
					// 	itemType: "xItemSelect",
					// 	options: [],
					// 	rules: [_rules.required(), _rules.lessThan(50)]
					// },
					priority: {
						value: "",
						label: i18n("优先级"),
						disabled: isUpdate,
						rules: [_rules.required(), _rules.lessThan(50)]
					},
					风险等级: {
						value: "",
						label: i18n("风险等级"),
						disabled: isUpdate,
						itemType: "xItemSelect",
						options: [],
						rules: [_rules.required()]
					}
				}
			};
		},
		computed: {
			btnAppend() {
				const vm = this;
				return {
					label: "添加一行",
					icon: "_add",
					preset: "primary",
					async onClick() {
						vm.actionList.push({
							...newItem(),
							featureName: "",
							featureValue: "",
							predicate: "",
							joint: ""
						});
					}
				};
			},
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
			updateItem({ index, item }) {
				this.actionList.splice(index, 1, item);
			},
			remove({ index, item }) {
				// const actionList = _.cloneDeep(this.actionList);
				// _.remove(actionList, x => x._hash === item._hash);
				// this.actionList = actionList;
				this.actionList.splice(index, 1);
			},
			async handleGetXdsOptionsRisk() {
				this.form.风险等级.options = await _api.admin_db_audit.xdsOptionsRisk();
			},
			async handleGetXdsOptionsJoint() {
				this.JointList = await _api.admin_db_audit.xdsOptionsJoint();
			},
			async handleGetXdsOptionsFeature() {
				this.FeatureList = await _api.admin_db_audit.xdsOptionsFeature();
			},
			async handleGetXdsOptionsPredicate() {
				this.predicateList = await _api.admin_db_audit.xdsOptionsPredicate();
				// this.form.predicate.options =
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
					// strategyName: this.$route.query.strategyName,
					strategyTypeName: this.$route.query.strategyName,
					id: this.$route.query.id,
					expressions: this.actionList,
					rules: this.actionList
				};
				const { code, msg } = await fn(obj);
				if (code === 0) {
					_.$msg(msg);
					parent.getTableData({ page: 1 });
					this.closeModal();
				} else {
					_.$msgError(msg);
				}
			}
		}
	});
}
</script>
