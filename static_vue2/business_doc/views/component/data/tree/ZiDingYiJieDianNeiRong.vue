<style lang="less">
#xTreeZiDingYiJieDianNeiRong {
	.prefix {
		color: var(--el-color-primary);
		margin-right: 10px;
		&.is-leaf {
			color: var(--el-color-success);
		}
	}
}
</style>
<template>
	<div id="xTreeZiDingYiJieDianNeiRong">
		<xMd :md="md" />
		<xCard style="height: 500px; width: 500px">
			<xTree :data="data" :props="props" :contentRender="contentRender" />
		</xCard>
	</div>
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
				data,
				md: `节点的内容支持自定义，可以在节点区添加按钮或图标等内容`
			};
		},
		data() {
			return {
				set: new Set(),
				count: 0
			};
		},
		methods: {
			contentRender({ node }) {
				return h(
					"div",
					{
						class: {
							"flex middle prefix-icon prefix width100": true,
							"is-leaf": node.isLeaf
						}
					},
					[
						node.isLeaf
							? hSpan({ staticClass: "mr" }, ["leaf"])
							: h("xIcon", { icon: "tips", staticClass: "mr" }),
						node.label
					]
				);
			}
		}
	});
}
</script>
