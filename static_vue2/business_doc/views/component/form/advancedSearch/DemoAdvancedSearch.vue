<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/form/advancedSearch/JiChuYongFa.vue"
			unfold />
		<xMd :md="desc" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `## 高级搜索
组件提供了高级搜索功能
`,
				desc: `### 
- 抽屉
- 可以挂载到任意地方，控制显隐，$mount
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
