<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCascader :props="props"></xCascader>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			let id = 0;
			return {
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node;
						setTimeout(() => {
							const nodes = Array.from({ length: level + 1 }).map(item => ({
								value: ++id,
								label: `选项${id}`,
								leaf: level >= 2
							}));
							// 通过调用resolve将子节点数据返回，通知组件数据加载完成
							resolve(nodes);
						}, 1000);
					}
				}
			};
		},
		computed: {
			md() {
				return `
当选中某一级时，动态加载该级下的选项。

通过\`lazy\`开启动态加载，并通过\`lazyload\`来设置加载数据源的方法。\`lazyload\`方法有两个参数，第一个参数\`node\`为当前点击的节点，第二个\`resolve\`为数据加载完成的回调(必须调用)。为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为\`leaf\`，可通过\`props.leaf\`修改)，否则会简单的以有无子节点来判断是否为叶子节点。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
