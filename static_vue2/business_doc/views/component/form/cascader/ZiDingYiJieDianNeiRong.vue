<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCascader :options="DemoCascader.options">
			<template slot-scope="{ node, data }">
				<span>{{ data.label }}</span>
				<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
			</template>
		</xCascader>
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
可以自定义备选项的节点内容

可以通过\`scoped slot\`对级联选择器的备选项的节点内容进行自定义，scoped slot会传入两个字段 \`node\` 和 \`data\`，分别表示当前节点的 Node 对象和数据。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
