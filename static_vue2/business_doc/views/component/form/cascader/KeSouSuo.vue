<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="block">
			<span class="demonstration">单选可搜索</span>
			<xCascader
				placeholder="试试搜索：指南"
				:options="DemoCascader.options"
				filterable></xCascader>
		</div>
		<div class="block mt">
			<span class="demonstration">多选可搜索</span>
			<xCascader
				placeholder="试试搜索：指南"
				:options="DemoCascader.options"
				:props="{ multiple: true }"
				filterable></xCascader>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			return {};
		},
		computed: {
			md() {
				return `
可以快捷地搜索选项并选择。

将\`filterable\`赋值为\`true\`即可打开搜索功能，默认会匹配节点的\`label\`或所有父节点的\`label\`(由\`show-all-levels\`决定)中包含输入值的选项。你也可以用\`filter-method\`自定义搜索逻辑，接受一个函数，第一个参数是节点\`node\`，第二个参数是搜索关键词\`keyword\`，通过返回布尔值表示是否命中。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
