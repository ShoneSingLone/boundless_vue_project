<template>
	<div class="ViewRipple">
		<Md :md="'# Ripple 水波纹指令\n水波纹指令，用于点击之后产生水波纹的动效。\n## 何时使用\n`v-ripple`指令用于点击之后产生水波纹的动效, 可以应用于任何块级元素。\n>注：只能作用于块级元素 '" />

		<DemoAndCode title="基础用法" path="@/views/directive/directive/ripple/JiChuYongFa.vue" />
		<DemoAndCode title="自定义颜色" path="@/views/directive/directive/ripple/ZiDingYiYanSe.vue" unfold />
		<Md :md="apiString" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				apiString: [
					"### Ripple 参数",
					"| 参数名          | 类型      | 默认        | 说明                              |",
					"| :-------------- | :-------- | :---------- | :-------------------------------- |",
					"| color           | `string`  | '#00000050' | 可选，默认当前文本颜色            |",
					"| initial-opacity | `number`  | 0.1         | 可选，初始交互效果透明度大小      |",
					"| final-opacity   | `number`  | 0.1         | 可选，结束交互效果长按透明度大小  |",
					"| duration        | `number`  | 400         | 可选，持续时间                    |",
					"| easing          | `string`  | 'ease-out'  | 可选，缓动动画                    |",
					"| delay           | `number`  | 75`         | 可选，延迟 debouceTime 时间后调用 |",
					"| disabled        | `boolean` | false       | 可选，禁止水波效果                |"
				].join("\n")
			};
		}
	};
}
</script>
