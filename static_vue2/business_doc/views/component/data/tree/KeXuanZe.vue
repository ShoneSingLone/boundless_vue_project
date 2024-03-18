<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xCard style="height: 500px; width: 500px">
			<xTree :data="data" :props="props" show-checkbox />
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
				md: `适用于需要选择层级时使用。`
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
