<template>
	<div>
		<DemoAndCode title="基础用法" path="@/views/component/data/tag/JiChuYongFa.vue" unfold />
		<DemoAndCode title="可移除标签" path="@/views/component/data/tag/KeYiChuBiaoQian.vue" />
		<DemoAndCode title="动态编辑标签" path="@/views/component/data/tag/DongTaiBianJiBiaoQian.vue" />
		<DemoAndCode title="不同尺寸" path="@/views/component/data/tag/BuTongChiCun.vue" />
		<DemoAndCode title="不同主题" path="@/views/component/data/tag/BuTongZhuTi.vue" />
		<Md :md="apiString" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				apiString: `### Attributes
| 参数                | 说明             | 类型    | 可选值                      | 默认值 |
|---------------------|------------------|---------|-----------------------------|--------|
| type                | 类型             | string  | success/info/warning/danger | —      |
| size                | 尺寸             | string  | medium / small / mini       | —      |
| color               | 背景色           | string  | —                           | —      |
| disable-transitions | 是否禁用渐变动画 | boolean | —                           | false  |
| hit                 | 是否有边框描边   | boolean | —                           | false  |
| closable            | 是否可关闭       | boolean | —                           | false  |
| effect              | 主题             | string  | dark / light / plain        | light  |


### Events
| 事件名称 | 说明                  | 回调参数 |
|----------|-----------------------|----------|
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
