<template>
	<DocContentOfDemo>
		<DemoAndCode title="基础用法" path="@/views/component/data/tree/JiChuYongFa.vue" />
		<DemoAndCode title="可选择" path="@/views/component/data/tree/KeXuanZe.vue" />
		<DemoAndCode title="禁用复选框" path="@/views/component/data/tree/JinYongFuXuanKuang.vue" />
		<DemoAndCode title="默认扩展和默认选中" path="@/views/component/data/tree/MoRenKuoZhanHeMoRenXuanZhong.vue" />
		<DemoAndCode title="自定义节点内容" path="@/views/component/data/tree/ZiDingYiJieDianNeiRong.vue" />
		<DemoAndCode title="节点过滤" path="@/views/component/data/tree/JieDianGuoLv.vue" />
		<DemoAndCode title="可拖拽节点" path="@/views/component/data/tree/KeTuoZhuaiJieDian.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		provide() {
			return {
				inject_tree: this
			};
		},
		data() {
			return {
				apiString: `## xTree Attributes

| Name                  | Description                                                                                                                                  | Type                  | Default |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------- |
| contentRender   		| Custom content for tree nodes. The scope parameter is \`{ node: TreeNode, data: TreeNodeData }\` |Function(node, data)
| data                  | tree data                                                                                                                                    | array                 | —       |
| empty-text            | text displayed when data is void                                                                                                             | string                | —       |
| props                 | configuration options, see the following table                                                                                               | object                | —       |
| highlight-current     | whether current node is highlighted                                                                                                          | boolean               | false   |
| expand-on-click-node  | whether to expand or collapse node when clicking on the node, if false, then expand or collapse node only when clicking on the arrow icon.   | boolean               | true    |
| check-on-click-node   | whether to check or uncheck node when clicking on the node, if false, the node can only be checked or unchecked by clicking on the checkbox. | boolean               | false   |
| expanded-keys 		| array of keys of initially expanded nodes                                                                                                    | array                 | —       |
| show-checkbox         | whether node is selectable                                                                                                                   | boolean               | false   |
| check-strictly        | whether checked state of a node not affects its father and child nodes when \`show-checkbox\` is \`true\`                                        | boolean               | false   |
| checked-keys  		| array of keys of initially checked nodes                                                                                                     | array                 | —       |
| current-node-key      | key of initially selected node                                                                                                               | string / number       | —       |
| filter-method         | this function will be executed on each node when use filter method. if return \`false\`, tree node will be hidden.                             | Function(value, data) | —       |
| indent                | horizontal indentation of nodes in adjacent levels in pixels                                                                                 | number                | 16      |
| icon                  | custom tree node icon                                                                                                                        | \`string \| Component\` | -       |
| item-size ^(2.2.33)   | custom tree node height                                                                                                                      | number                | 26      |

## props

| Attribute | Description                                                                          | Type           | Default  |
| --------- | ------------------------------------------------------------------------------------ | -------------- | -------- |
| value     | unique identity key name for nodes, its value should be unique across the whole tree | string, number | id       |
| label     | specify which key of node object is used as the node's label                         | string         | label    |
| children  | specify which node object is used as the node's subtree                              | string         | children |
| disabled  | specify which key of node object represents if node's checkbox is disabled           | string         | disabled |

## xTree Method

\`Tree\` has the following method, which returns the currently selected array of nodes.

| Method | Description | Parameters |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| filter | filter all tree nodes, filtered nodes will be hidden | \`(query: string)\` |
| getCheckedNodes | If the node can be selected (\`show-checkbox\` is \`true\`), it returns the currently selected array of nodes | \`(leafOnly: boolean)\` |
| getCheckedKeys | If the node can be selected (\`show-checkbox\` is \`true\`), it returns the currently selected array of node's keys | \`(leafOnly: boolean)\` |
| setCheckedKeys | set certain nodes to be checked | \`(keys: TreeKey[])\` |
| setChecked | set node to be checked or not | \`(key: TreeKey, checked: boolean)\` |
| setExpandedKeys | set certain nodes to be expanded | \`(keys: TreeKey[])\` |
| getHalfCheckedNodes | If the node can be selected (\`show-checkbox\` is \`true\`), it returns the currently half selected array of nodes | - |
| getHalfCheckedKeys | If the node can be selected (\`show-checkbox\` is \`true\`), it returns the currently half selected array of node's keys | - |
| getCurrentKey | return the highlight node's key (undefined if no node is highlighted) | - |
| getCurrentNode | return the highlight node's data (undefined if no node is highlighted) | - |
| setCurrentKey | set highlighted node by key | \`(key: TreeKey)\` |
| getNode | get node by key or data | \`(data: TreeKey \| TreeNodeData)\` |
| expandNode | expand specified node | \`(node: TreeNode)\` |
| collapseNode | collapse specified node | \`(node: TreeNode)\` |
| setData | When the data is very large, using reactive data will cause the poor performance, so we provide a way to avoid this situation | \`(data: TreeData)\` |

## xTree Events

| Name             | Description                                          | Parameters                                                                                                                              |
| ---------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| node-click       | triggers when a node is clicked                      | \`(data: TreeNodeData, node: TreeNode, e: MouseEvent)\`                                                                                   |
| node-contextmenu | triggers when a node is clicked by right button      | \`(e: Event, data: TreeNodeData, node: TreeNode)\`                                                                                        |
| check-change     | triggers when the selected state of the node changes | \`(data: TreeNodeData, checked: boolean)\`                                                                                                |
| check            | triggers after clicking the checkbox of a node       | \`(data: TreeNodeData, info: { checkedKeys: TreeKey[],checkedNodes: TreeData, halfCheckedKeys: TreeKey[], halfCheckedNodes: TreeData,})\` |
| current-change   | triggers when current node changes                   | \`(data: TreeNodeData, node: TreeNode)\`                                                                                                  |
| node-expand      | triggers when current node open                      | \`(data: TreeNodeData, node: TreeNode)\`                                                                                                  |
| node-collapse    | triggers when current node close                     | \`(data: TreeNodeData, node: TreeNode)\`                                                                                                  |

`
			};
		},
		methods: {
			getKey: (prefix, id) => {
				return `${prefix}-${id}`;
			},
			createData(maxDeep, maxChildren, minNodesNumber, deep = 1, key = "node") {
				const vm = this;
				let id = 0;
				return Array.from({ length: minNodesNumber })
					.fill(deep)
					.map(() => {
						const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
						const nodeKey = vm.getKey(key, ++id);
						return {
							id: nodeKey,
							label: nodeKey,
							children: childrenNumber ? vm.createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey) : undefined
						};
					});
			}
		}
	};
}
</script>

<style lang="less"></style>
