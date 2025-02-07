<style lang="less">
.Demoprogress {
	.xProgress + .xProgress {
		margin-top: 8px;
	}
}
</style>

<template>
	<DocContentOfDemo class="Demoprogress">
		<xMd :md="md" />
		<DemoAndCode
			title="线形进度条"
			path="@/views/other/progress/XianXingJinDuTiao.vue"
			unfold />
		<DemoAndCode title="百分比内显" path="@/views/other/progress/BaiFenBiNeiXian.vue" unfold />
		<DemoAndCode title="自定义颜色" path="@/views/other/progress/ZiDingYiYanSe.vue" unfold />
		<DemoAndCode
			title="环形进度条"
			path="@/views/other/progress/HuanXingJinDuTiao.vue"
			unfold />
		<DemoAndCode
			title="仪表盘形进度条"
			path="@/views/other/progress/YiBiaoPanXingJinDuTiao.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "## Progress 进度条\r\r用于展示操作进度，告知用户当前状态和预期。",
				apiString: `### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle/dashboard | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status  | 进度条当前状态 | string | success/exception/warning | — |
| color  | 进度条背景色（会覆盖 status 状态颜色） | string/function/array | — | '' |
| width  | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap  | circle/dashboard 类型路径两端的形状 | string | butt/round/square | round |
| format  | 指定进度条文字内容 | function(percentage) | — | — |
| define-back-color  | 指定进度条底色（支持 hex 格式） | string | — | — |
| text-color  | 指定进度条字体颜色（支持 hex 格式） | string | — | — |`
			};
		}
	};
}
</script>
