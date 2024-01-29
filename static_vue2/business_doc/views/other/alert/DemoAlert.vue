<style lang="less">
.DemoAlert {
	.el-alert + .el-alert {
		margin-top: 8px;
	}
}
</style>

<template>
	<DocContentOfDemo class="DemoAlert">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/alert/JiChuYongFa.vue" unfold />
		<DemoAndCode title="带有 icon" path="@/views/other/alert/DaiYouIcon.vue" unfold />
		<DemoAndCode title="主题" path="@/views/other/alert/ZhuTi.vue" unfold />
		<DemoAndCode title="自定义关闭按钮" path="@/views/other/alert/ZiDingYiGuanBiAnNiu.vue" unfold />
		<DemoAndCode title="文字居中" path="@/views/other/alert/WenZiJuZhong.vue" unfold />
		<DemoAndCode title="带有辅助性文字介绍" path="@/views/other/alert/DaiYouFuZhuXingWenZiJieShao.vue" unfold />
		<DemoAndCode title="带有 icon 和辅助性文字介绍" path="@/views/other/alert/DaiYouIconHeFuZhuXingWenZiJieShao.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "## Alert 警告\r\r用于页面中展示重要的提示信息。",
				apiString: `### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |`
			};
		}
	};
}
</script>
