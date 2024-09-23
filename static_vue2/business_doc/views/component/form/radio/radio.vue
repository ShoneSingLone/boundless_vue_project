<template>
	<DocContentOfDemo class="radio-demo">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/component/form/radio/JiChuYongFa.vue" unfold />
		<DemoAndCode
			title="禁用状态"
			path="@/views/component/form/radio/JinYongZhuangTai.vue"
			unfold />
		<DemoAndCode
			title="单选框组"
			path="@/views/component/form/radio/DanXuanKuangZu.vue"
			unfold />
		<DemoAndCode title="按钮样式" path="@/views/component/form/radio/AnNiuYangShi.vue" unfold />
		<DemoAndCode
			title="带有边框"
			path="@/views/component/form/radio/DaiYouBianKuang.vue"
			unfold />
		<xMd :md="desc" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `## Radio 单选框
在一组备选项中进行单选
`,
				desc: `### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| input  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| input  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |`
			};
		}
	};
}
</script>

<style lang="less">
.radio-demo {
}
</style>
