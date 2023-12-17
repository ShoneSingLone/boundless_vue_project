<template>
	<div>
		<xMd :md="descString" />
		<DemoAndCode title="基础用法" path="@/views/component/data/virtualizedTable/JiChuYongFa.vue" />
		<DemoAndCode title="自定义单元格渲染器" path="@/views/component/data/virtualizedTable/ZiDingYiDanYuanGeXuanRanQi.vue" />
		<DemoAndCode title="带有选择的表格" path="@/views/component/data/virtualizedTable/DaiYouXuanZeDeBiaoGe.vue" unfold />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				descString: `# Virtualized Table 虚拟化表格
在前端开发领域，表格一直都是一个高频出现的组件，尤其是在中后台和数据分析场景。 但是，对于 Table V1来说，当一屏里超过 1000 条数据记录时，就会出现卡顿等性能问题，体验不是很好。
通过虚拟化表格组件，超大数据渲染将不再是一个头疼的问题。
> 即使虚拟化的表格是高效的，但是当数据负载过大时，网络和内存容量也会成为您应用程序的瓶颈。 因此请牢记，虚拟化表格永远不是最完美的解决方案，请考虑数据分页、过滤器等优化方案。
               `
			};
		}
	});
}
</script>
<style lang="less"></style>
