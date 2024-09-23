<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/form/checkbox/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="禁用状态"
			path="@/views/component/form/checkbox/JinYongZhuangTai.vue"
			unfold />
		<DemoAndCode
			title="多选框组"
			path="@/views/component/form/checkbox/DuoXuanKuangZu.vue"
			unfold />
		<DemoAndCode
			title="多选indeterminate 状态框组"
			path="@/views/component/form/checkbox/IndeterminateZhuangTai.vue"
			unfold />
		<DemoAndCode
			title="可选项目数量的限制"
			path="@/views/component/form/checkbox/KeXuanXiangMuShuLiangDeXianZhi.vue"
			unfold />
		<DemoAndCode
			title="按钮样式的多选组合"
			path="@/views/component/form/checkbox/AnNiuYangShiDeDuoXuanZuHe.vue"
			unfold />
		<DemoAndCode
			title="带有边框"
			path="@/views/component/form/checkbox/DaiYouBianKuang.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `## Checkbox 多选框
一组备选项中进行多选
`,
				apiString: `### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | 选中状态的值（只有在\`checkbox-group\`或者绑定对象类型为\`array\`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Checkbox 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | array | — | — |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色    | string   | — | #409EFF   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在\`checkbox-group\`或者绑定对象类型为\`array\`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |`
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
