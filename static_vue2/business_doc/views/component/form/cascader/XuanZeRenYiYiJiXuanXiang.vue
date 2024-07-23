<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="block">
			<span class="demonstration">单选选择任意一级选项</span>
			<xCascader
				:options="DemoCascader.options"
				:props="{ checkStrictly: true }"
				clearable></xCascader>
		</div>
		<div class="block">
			<span class="demonstration">多选选择任意一级选项</span>
			<xCascader
				:options="DemoCascader.options"
				:props="{ multiple: true, checkStrictly: true }"
				clearable></xCascader>
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
在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过 \`props.checkStrictly = true\` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

`;
			}
		}
	});
}
</script>
<style lang="less"></style>
