<template>
	<DocContentOfDemo class="tooltip-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/other/tooltip/JiChuYongFa.vue" unfold />
		<DemoAndCode title="主题" path="@/views/other/tooltip/ZhuTi.vue" unfold />
		<DemoAndCode title="更多 Content" path="@/views/other/tooltip/GengDuoContent.vue" unfold />
		<DemoAndCode title="高级扩展" path="@/views/other/tooltip/GaoJiKuoZhan.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "基于`Vue-popper`开发",
				apiString: `### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  effect        |  默认提供的主题  | String            | dark/light | dark  |
|  content        |  显示的内容，也可以通过 \`slot#content\` 传入 DOM  | String            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  value / v-model |  状态是否可见  | Boolean           | — |  false |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | el-fade-in-linear |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | { boundariesElement: 'body', gpuAcceleration: false } |
| open-delay | 延迟出现，单位毫秒 | Number | — | 0 |
| manual | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效 | Boolean | — | false |
| popper-class | 为 Tooltip 的 popper 添加类名 | String | — | — |
| enterable | 鼠标是否可进入到 tooltip 中 | Boolean | — | true |
| hide-after | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏 | number | — | 0 |
| tabindex   | Tooltip 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
`
			};
		}
	};
}
</script>

<style lang="less">
.tooltip-demo {
	.tooltip-JiChuYongFa {
		.box {
			width: 400px;

			.top {
				text-align: center;
			}

			.left {
				float: left;
				width: 60px;
			}

			.right {
				float: right;
				width: 60px;
			}

			.bottom {
				clear: both;
				text-align: center;
			}

			.item {
				margin: 4px;
			}

			.left .el-tooltip__popper,
			.right .el-tooltip__popper {
				padding: 8px 10px;
			}
		}
	}
}
</style>
