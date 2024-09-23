<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xCard style="height: 500px; width: 500px">
			<xTree :data="data" :props="props" />
		</xCard>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_tree"],
		setup() {
			let time = Date.now();
			const data = this.inject_tree.createData(4, 30, 40);
			_.$msg.success(`渲染耗时：${Date.now() - time}ms`);
			return {
				props: {
					value: "id",
					label: "label",
					children: "children"
				},
				data,
				md: `基础的树形结构展示`
			};
		},
		data() {
			return {
				set: new Set(),
				count: 0
			};
		}
	});
}
</script>
