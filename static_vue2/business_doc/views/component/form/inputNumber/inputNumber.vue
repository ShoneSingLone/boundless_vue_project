<template>
	<DocContentOfDemo class="icon-demo">
		<xMd :md="'仅允许输入标准的数字值，可定义范围'" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/form/inputNumber/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="禁用状态"
			path="@/views/component/form/inputNumber/JinYongZhuangTai.vue" />
		<DemoAndCode title="步数" path="@/views/component/form/inputNumber/BuShu.vue" />
		<DemoAndCode title="严格步数" path="@/views/component/form/inputNumber/YanGeBuShu.vue" />
		<DemoAndCode title="精度" path="@/views/component/form/inputNumber/JingDu.vue" />
		<DemoAndCode title="尺寸" path="@/views/component/form/inputNumber/ChiCun.vue" />
		<DemoAndCode title="按钮位置" path="@/views/component/form/inputNumber/AnNiuWeiZhi.vue" />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Attributes
| 参数              | 说明                     | 类型    | 可选值       | 默认值    |
|-------------------|--------------------------|---------|--------------|-----------|
| value / v-model   | 绑定值                   | number  | —            | 0         |
| min               | 设置计数器允许的最小值   | number  | —            | -Infinity |
| max               | 设置计数器允许的最大值   | number  | —            | Infinity  |
| step              | 计数器步长               | number  | —            | 1         |
| step-strictly     | 是否只能输入 step 的倍数 | boolean | —            | false     |
| precision         | 数值精度                 | number  | —            | —         |
| size              | 计数器尺寸               | string  | large, small | —         |
| disabled          | 是否禁用计数器           | boolean | —            | false     |
| controls          | 是否使用控制按钮         | boolean | —            | true      |
| controls-position | 控制按钮位置             | string  | right        | -         |
| name              | 原生属性                 | string  | —            | —         |
| label             | 输入框关联的label文字    | string  | —            | —         |
| placeholder       | 输入框默认 placeholder   | string  | -            | -         |

### Events
| 事件名称 | 说明                        | 回调参数               |
|----------|-----------------------------|------------------------|
| change   | 绑定值被改变时触发          | currentValue, oldValue |
| blur     | 在组件 Input 失去焦点时触发 | (event: Event)         |
| focus    | 在组件 Input 获得焦点时触发 | (event: Event)         |

### Methods
| 方法名 | 说明                | 参数 |
|--------|---------------------|------|
| focus  | 使 input 获取焦点   | -    |
| select | 选中 input 中的文字 | —    |
`
			};
		}
	};
}
</script>

<style lang="less"></style>
