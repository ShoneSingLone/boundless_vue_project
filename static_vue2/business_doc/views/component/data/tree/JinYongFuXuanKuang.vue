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
			const setDisabled = data => {
				data.disabled = true;
				if (data.children) {
					_.each(data.children, setDisabled);
				}
			};
			setDisabled(data[1]);
			setDisabled(data[3]);
			setDisabled(data[5]);
			setDisabled(data[6]);
			return {
				props: {
					value: "id",
					label: "label",
					children: "children"
				},
				data,
				md: `节点的复选框可以设置为禁用。
在示例中，属性在 defaultProps 中声明了 disabled，一些节点被设置为 disabled：true。 相应的复选框已禁用，不能点击。
				`
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
