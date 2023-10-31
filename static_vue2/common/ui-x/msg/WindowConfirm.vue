<template>
	<xDialog id="WindowConfirm">
		<div v-html="content" />
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel" />
		</template>
	</xDialog>
</template>

<script>
export default async function ({ onOk, onCancel, content }) {
	const isUpdate = false;
	/*  */
	const RULES = await _.$importVue("/common/utils/rules.vue");
	return {
		mounted() {
			this.init();
		},
		data() {
			return {
				content,
				form: {
					cloudInfraId: {
						label: i18n("resourcePool"),
						itemType: "xItemSelect",
						options: [],
						rules: [RULES.required()]
					},
					name: {
						label: i18n("availablePartitionName"),
						rules: [RULES.required()]
					}
				},
				formData: {
					cloudInfraId: "",
					name: ""
				}
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					async onClick() {
						vm.$closeWindow();
						onOk();
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: i18n("取消"),
					/* 因为是弹出确认框，引导用户取消 */
					preset: "blue",
					async onClick() {
						vm.$closeWindow();
						onCancel();
					}
				};
			}
		},
		methods: {
			init() {
				/* 表单默认值 */
				if (isUpdate) {
					/* 修改 */
					const { cloudInfraId, name } = row;
					this.formData.cloudInfraId = cloudInfraId;
					this.formData.name = name;
				} else {
					const item = _.first([]);
					let cloudInfraId = "";
					if (item) {
						cloudInfraId = item.value;
					}
					this.formData.cloudInfraId = cloudInfraId;
				}
			}
		}
	};
}
</script>

<style lang="less">
#WindowConfirm {
	min-width: unset;

	.xDialog-footer {
		display: flex;
		justify-content: center;
		align-items: middle;
	}
}
</style>
