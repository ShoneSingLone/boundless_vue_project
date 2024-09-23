<template>
	<DocContentOfDemo class="icon-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/component/data/icon/JiChuYongFa.vue" unfold />
		<DemoAndCode
			title="icon未找到"
			path="@/views/component/data/icon/IconWeiZhaoDao.vue"
			unfold />
		<DemoAndCode title="icon颜色" path="@/views/component/data/icon/YanSe.vue" unfold />
		<DemoAndCode title="加载图片" path="@/views/component/data/icon/JiaZaiTuPian.vue" unfold />
		<xMd :md="apiString" data-role="api" />
		<DemoAndCode title="字体图标" path="@/views/component/data/icon/ZiTiTuBiao.vue" unfold />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `>图标哪里找？[Good Frend](https://www.iconfont.cn/search/index?searchType=icon&q=%E6%9C%8B%E5%8F%8B&page=1&fromCollection=1)`,
				apiString: `### Attributes
| 参数                | 说明             | 类型    | 可选值                      | 默认值 |
|---------------------|------------------|---------|-----------------------------|--------|
| icon                | svg路径             | string  | — | —      |
| img                | 图片路径             | string  | — | —      |
| useCurrentColor                |   若为真值，会置icon的fill为currentColor          | any  | — | false   |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
