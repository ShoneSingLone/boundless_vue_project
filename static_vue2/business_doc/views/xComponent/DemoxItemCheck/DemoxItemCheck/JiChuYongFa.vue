<style lang="less"></style>
<template>
	<xForm>
		<div span="full">
			<xMd :md="md" />
		</div>
		<xItem :configs="form.xItemCheck_Group" />
		<xItem :configs="form.xItemCheck_default" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				form: defItems({
					xItemCheck_Group: {
						value: [1, 3, 5],
						isGroup: true,
						label: "Group",
						itemType: "xItemCheck",
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: `text_${ii}`,
								value: ii
							};
						})
					},
					xItemCheck_default: {
						value: true,
						label: "default",
						itemType: "xItemCheck",
						options: ["如果不是group，options的元素可以是字符串，代表label。value为布尔值"]
					}
				})
			};
		},
		computed: {
			md() {
				return `
\`\`\`json
	{
		"form.xItemCheck_Group.value":[${this.form.xItemCheck_Group.value}],
		"form.xItemCheck_default.value":${this.form.xItemCheck_default.value},
	}
\`\`\`
isGroup: true,//是否为分组
- 为true时，value为数组
- 为false时，value为单个值
- 默认为false
				`;
			}
		}
	});
}
</script>
