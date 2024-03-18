<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/component/form/checkbox/JiChuYongFa.vue" unfold />
		<DemoAndCode title="禁用状态" path="@/views/component/form/checkbox/JinYongZhuangTai.vue" unfold />
		<DemoAndCode title="多选框组" path="@/views/component/form/checkbox/DuoXuanKuangZu.vue" unfold />
		<DemoAndCode title="多选indeterminate 状态框组" path="@/views/component/form/checkbox/IndeterminateZhuangTai.vue" unfold />
		<DemoAndCode title="可选项目数量的限制" path="@/views/component/form/checkbox/KeXuanXiangMuShuLiangDeXianZhi.vue" unfold />
		<DemoAndCode title="按钮样式的多选组合" path="@/views/component/form/checkbox/AnNiuYangShiDeDuoXuanZuHe.vue" unfold />
		<DemoAndCode title="带有边框" path="@/views/component/form/checkbox/DaiYouBianKuang.vue" unfold />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `## Checkbox 多选框
一组备选项中进行多选
`
			};
		}
	};
}
</script>

<style lang="less">
.demo-input {
	.el-input,
	.el-textarea {
		width: 500px;
	}
}
</style>
