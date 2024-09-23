<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCheckbox v-model="checked">备选项</xCheckbox>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				checked: true
			};
		},
		computed: {
			md() {
				return `
- 单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
- 在\`xCheckbox\`元素中定义\`v-model\`绑定变量，单一的\`checkbox\`中，默认绑定变量的值会是\`Boolean\`，选中为\`true\`
- \`checked\` 为 true 或 false

\`\`\`html
<xCheckbox v-model="checked">备选项</xCheckbox> ${this.checked}
\`\`\`
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
