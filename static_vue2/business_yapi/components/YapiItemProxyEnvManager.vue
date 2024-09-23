<template>
	<xDialog id="YapiItemProxyEnvManager">
		<xForm col="2">
			<xSelect placeholder="转发环境" span="full">
				<xOption
					v-for="item in cptOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value" />
			</xSelect>
			<xMd :md="mdTips" />
			<xItem :configs="form.editor" @save="btnOk.onClick" style="height: 500px" />
		</xForm>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({}) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				mdTips: `
- 新增时，不需要填写\`_id\`；保存之后会带出来
- \`cookie\` 也在\`header\`中,value为cookie的值

> 环境变量数据结构如下：
\`\`\`js
[
        {
			"name" : "local",
			"domain" : "http://127.0.0.1",
            "header" : [
                { "name" : "x-auth-token", "value" : "*******" },
                { "name" : "Cookie", "value" : "key=val;key2=val2" }
            ],
            "global" : [
                { "name" : "token", "value" : "######" }
            ]
        }
]
\`\`\`
`,
				form: defItems({
					editor: {
						label: "",
						type: "textarea",
						itemType: "YapiItemMonaco",
						value: JSON.stringify(this.APP.cptProject.env || "", null, 2)
					}
				})
			};
		},
		computed: {
			cptOptions() {
				try {
					return _.map(JSON.parse(this.form.editor.value), row => {
						return {
							label: `${row.name} ${row.domain}`,
							value: row._id + row.name
						};
					});
				} catch (error) {
					return [];
				}
			},
			btnOk() {
				const vm = this;
				return {
					label: "确定",
					preset: "blue",
					onClick: async () => {
						try {
							const dataForm = {
								env: JSON.parse(this.form.editor.value),
								id: this.APP.cptProjectId
							};
							await _api.yapi.project_update(dataForm);
							this.APP.updateGroupProjectList();
							_.$msg("更新成功");
						} catch (error) {
							_.$msgError(error);
						}
					}
				};
			},
			btnCancel() {
				return {
					label: i18n("取消"),
					onClick: async () => {
						this.closeModal();
					}
				};
			}
		},
		methods: {}
	});
}
</script>
<style lang="less">
#YapiItemProxyEnvManager {
	min-width: 1024px;
	.el-card__body {
		min-height: 100px;
	}
}
</style>
