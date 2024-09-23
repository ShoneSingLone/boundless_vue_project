<template>
	<DocContentOfDemo>
		<xMd :md="md1" />
		<DemoAndCode title="基础用法" path="@/views/other/divider/JiChuYongFa.vue" unfold />
		<DemoAndCode title="设置文案" path="@/views/other/divider/SheZhiWenAn.vue" unfold />
		<DemoAndCode title="垂直分割" path="@/views/other/divider/ChuiZhiFenGe.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	/* 用于加载样式，实际使用中是懒加载，不用担心 */
	_.$importVue("/common/ui-x/directive/xMessage/xMessage.vue");
	return {
		data() {
			return {
				md1: `## Divider 分割线
区隔内容的分割线。

`,
				apiString: `### Divider Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| direction      | 设置分割线方向  | string  |            horizontal / vertical          |    horizontal     |
| content-position      | 设置分割线文案的位置 | string  |  left / right / center  |  center |`
			};
		}
	};
}
</script>

<style lang="less">
.DemoMessage-demo {
	height: 270px;

	> div {
		margin-bottom: 16px;
	}
}
</style>
