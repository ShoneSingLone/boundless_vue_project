<style lang="less"></style>
<template>
	<xForm>
		<div span="full"><xMd :md="md" /></div>
		<xItem :configs="form.blockCheck_Group" />
		<xItem :configs="form.blockCheck_default" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				form: defItems({
					blockCheck_Group: {
						value: [1, 3, 5],
						isGroup: true,
						label: "Group",
						itemType: "xItemCheck",
						xItemCheckUse: "blockCheck",
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: `text_${ii}`,
								value: ii
							};
						})
					},
					blockCheck_default: {
						value: true,
						label: "default",
						itemType: "xItemCheck",
						xItemCheckUse: "blockCheck",
						options: ["字符串"]
					}
				})
			};
		},
		computed: {
			md() {
				return `
\`\`\`json
	{
		"form.blockCheck_Group.value":[${this.form.blockCheck_Group.value}],
		"form.blockCheck_default.value":${this.form.blockCheck_default.value},
	}
\`\`\`
xItemCheckUse:
- "blockCheck":选择器类型
- 默认为blockCheck
				`;
			}
		}
	});
}
</script>
