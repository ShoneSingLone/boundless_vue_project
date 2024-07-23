<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xInput
			v-model="query"
			style="width: 240px"
			placeholder="Please enter keyword"
			@input="onQueryChanged" />
		<xCard style="height: 500px; width: 500px">
			<xTree ref="treeRef" :data="data" :props="props" :filter-method="filterMethod" />
		</xCard>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_tree"],
		setup() {
			return {
				query: ref(""),
				filterMethod: (query, node) => {
					return node.label.includes(query);
				},
				onQueryChanged: _.debounce(query => {
					let time = Date.now();
					this.$refs.treeRef.filter(query);
					_.$msgSuccess(`渲染耗时：${Date.now() - time}ms`);
				}, 1000),
				props: {
					value: "id",
					label: "label",
					children: "children"
				},
				data: this.inject_tree.createData(4, 30, 40),
				md: `树节点可以过滤

在需要对节点进行过滤时，调用 Tree 实例的 filter 方法， 参数为关键字。 需要注意的是，此时需要设置 filter-method，值为过滤函数。`
			};
		}
	});
}
</script>
