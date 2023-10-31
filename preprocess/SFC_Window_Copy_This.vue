<template>
	<xDialog>
		<!-- '--xItem-label-width': "144px" -->
		<ElCard class="mt10" :header="i18n('xxxxxxxx')">
			<form ref="form">
				<xItem
					:configs="configs"
					v-for="(configs, prop) in form"
					:key="prop" />
			</form>
		</ElCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script>
export default async function ({ row, getTableData }) {
	/**  
	 * 使用规则  
	 * @type {import("../static_vue2/common/utils/rules.vue")()}  - 从 RULES() 获取的规则对象  
	 */
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { useDialogProps } = await _.$importVue("/common/utils/compositionAPI.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			return {
				form: {
					name: { value: "", label: i18n("名称"), rules: [RULES.required()] }
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cpt_formData() {
				return _.$pickValueFromConfigs(this.form);
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
			init() {
				/* 表单默认值 */
				if (isUpdate) {
					_.$setValToForm(this.form, row);
				}
			},
			async upsertOne() {
				try {
					_.$loading(true);
					const upsertURL = isUpdate
						? "/rest/fc/admin/v1.0/network/qos/modify"
						: "/rest/fc/admin/v1.0/network/qos/create";

					const successMsg = isUpdate
						? i18n("msgSuccessModified")
						: i18n("msgAddedSuccess");

					const data = {
						...(row || {}),
						...this.cpt_formData
					};
					const result = await _.$ajax.post(upsertURL, {
						data
					});
					if (_.$is200(result.code)) {
						_.$msgSuccess(successMsg);
						getTableData({ current: 0 });
					} else {
						throw new Error(i18n("msgManagedOperationFailed"));
					}
					this.$closeWindow();
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				this.upsertOne();
			}
		}
	});
}
</script>

<style lang="less"></style>
