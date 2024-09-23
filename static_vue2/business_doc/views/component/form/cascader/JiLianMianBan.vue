<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="flex">
			<xCascaderPanel :options="DemoCascader.options"></xCascaderPanel>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			return {};
		},
		computed: {
			md() {
				return `
级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

和级联选择器一样，通过\`options\`来指定选项，也可通过\`props\`来设置多选、动态加载等功能，具体详情见下方API表格。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
