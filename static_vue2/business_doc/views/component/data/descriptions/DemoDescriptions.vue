<template>
	<DocContentOfDemo class="icon-demo">
		<xMd :md="md" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/data/descriptions/JiChuYongFa.vue"
			unfold />
		<DemoAndCode title="Style1" path="@/views/component/data/descriptions/Style1.vue" unfold />
		<DemoAndCode title="Style2" path="@/views/component/data/descriptions/Style2.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		provide() {
			return {
				DemoDescriptions: this
			};
		},
		data() {
			return {
				md: `
\`\`\`js

items: [
	// value: "直接显示字符串"
	{ label: "Username", value: "kooriookami" },
	{ label: "Telephone", value: "18100000000" },
	{ label: "Place", value: "Suzhou" },
	{
		label: "Remarks",
		// xItemRender:"可以返回vNode"
		xItemRender() {
				return h("xTag", { size: "small" }, ["School"]);
			}
		},
		{
			label: "Address",
			value: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
			span: "2"
		}
],
\`\`\`
`,
				items: [
					{ label: "Username", value: "kooriookami" },
					{ label: "Telephone", value: "18100000000" },
					{ label: "Place", value: "Suzhou" },
					{
						label: "Remarks",
						xItemRender() {
							return h("xTag", { size: "small" }, ["School"]);
						}
					},
					{
						label: "Address",
						value: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
						span: "2"
					}
				],
				apiString: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|--xItemDesc-hover-bg |-------- |---------- |-------------  |-------- |
|isEmpty |-------- |---------- |-------------  |-------- |
|label |-------- |---------- |-------------  |-------- |
|value |-------- |---------- |-------------  |-------- |
|xItemRender |-------- |---------- |-------------  |-------- |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
