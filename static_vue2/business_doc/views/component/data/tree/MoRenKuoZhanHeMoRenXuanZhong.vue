<style lang="less"></style>
<template>
	<xForm>
		<div style="height: 500px; overflow: auto">
			<xMd :md="md" />
		</div>
		<xCard style="height: 500px; width: 500px">
			<xTree :data="data" :props="props" show-checkbox :checkedKeys.sync="checkedKeys" :expandedKeys.sync="expandedKeys" />
		</xCard>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_tree"],
		setup() {
			const data = this.inject_tree.createData(4, 30, 40);
			return {
				props: {
					value: "id",
					label: "label",
					children: "children"
				},
				data
			};
		},
		data() {
			return {
				set: new Set(),
				count: 0,
				checkedKeys: [],
				expandedKeys: ["node-4", "node-4-1", "node-4-1-1"]
			};
		},
		computed: {
			md() {
				return `树节点可以在初始化阶段被设置为展开或选中。
分别通过 \`expandedKeys\` 和 \`checkedKeys\` 设置默认展开和默认选中的节点。
> \`expandedKeys\` 和 \`checkedKeys\`值变化是异步并且有debounce


- expandedKeys:${JSON.stringify(this.expandedKeys, null, 2)}
- checkedKeys:${JSON.stringify(this.checkedKeys, null, 2)}
                `;
			}
		}
	});
}
</script>
