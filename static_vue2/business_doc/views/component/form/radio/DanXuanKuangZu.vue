<template>
	<xForm>
		<xMd :md="md" class="mb" />
		<div>selectd:{{ radio }}</div>
		<xRadioGroup v-model="radio">
			<xRadio :label="3">备选项</xRadio>
			<xRadio :label="6">备选项</xRadio>
			<xRadio :label="9">备选项</xRadio>
		</xRadioGroup>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				radio: 3
			};
		},
		computed: {
			md() {
				return `适用于在多个互斥的选项中选择的场景
				
结合\`xRadioGroup\`元素和子元素\`el-radio\`可以实现单选组，在\`xRadioGroup\`中绑定\`v-model\`，在\`el-radio\`中设置好\`label\`即可，无需再给每一个\`el-radio\`绑定变量，另外，还提供了\`change\`事件来响应变化，它会传入一个参数\`value\`。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
