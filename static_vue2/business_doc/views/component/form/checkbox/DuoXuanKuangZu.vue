<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="mb">
			{{ checkList }}
		</div>
		<xCheckboxGroup v-model="checkList">
			<xCheckbox label="复选框 A" />
			<xCheckbox label="复选框 B" />
			<xCheckbox label="复选框 C" />
			<xCheckbox label="禁用" disabled />
			<xCheckbox label="选中且禁用" disabled />
		</xCheckboxGroup>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
                
\`checkbox-group\`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用\`v-model\`绑定\`Array\`类型的变量即可。 \`xCheckbox\` 的 \`label\`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。\`label\`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。                `,

				checkList: ["选中且禁用", "复选框 A"]
			};
		}
	});
}
</script>
<style lang="less"></style>
