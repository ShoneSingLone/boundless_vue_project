<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xTree :data="data" :props="props" :height="208" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const getKey = (prefix, id) => {
				return `${prefix}-${id}`;
			};
			const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = "node") => {
				let id = 0;
				return Array.from({ length: minNodesNumber })
					.fill(deep)
					.map(() => {
						const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
						const nodeKey = getKey(key, ++id);
						return {
							id: nodeKey,
							label: nodeKey,
							children: childrenNumber ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey) : undefined
						};
					});
			};

			const props = {
				value: "id",
				label: "label",
				children: "children"
			};
			const data = createData(4, 30, 40);

			return {
				props,
				data,
				md: `> 有点性能问题，莫慌用`
			};
		}
	});
}
</script>
