<template>
	<div class="icon-demo">
		<DemoAndCode title="基础用法" path="@/views/component/navigation/tabs/JiChuYongFa.vue" />
		<DemoAndCode title="选项卡样式" path="@/views/component/navigation/tabs/XuanXiangKaYangShi.vue" />
		<DemoAndCode title="卡片化" path="@/views/component/navigation/tabs/KaPianHua.vue" />
		<DemoAndCode title="位置" path="@/views/component/navigation/tabs/WeiZhi.vue" />
		<DemoAndCode title="自定义标签页" path="@/views/component/navigation/tabs/ZiDingYiBiaoQianYe.vue" />
		<DemoAndCode title="动态增减标签页" path="@/views/component/navigation/tabs/DongTaiZengJianBiaoQianYe.vue" />
		<DemoAndCode title="自定义增加标签页触发器" path="@/views/component/navigation/tabs/ZiDingYiZengJiaBiaoQianYeChuFaQi.vue" unfold />
		<Md :md="apiString" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				apiString: `### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model  | 绑定值，选中选项卡的 name  | string   |  —  |  第一个选项卡的 name |
| type     | 风格类型   | string   | card/border-card  |     —    |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| addable  | 标签是否可增加   | boolean   | — |  false  |
| editable  | 标签是否同时可增加和关闭   | boolean   | — |  false  |
| tab-position  | 选项卡所在位置 | string   |  top/right/bottom/left  |  top |
| stretch  | 标签的宽度是否自撑开 | boolean   |  -  |  false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | — | — |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| tab-click  | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-remove  | 点击 tab 移除按钮后触发  | 被删除的标签的 name |
| tab-add  | 点击 tabs 的新增按钮后触发  | — |
| edit  | 点击 tabs 的新增按钮或 tab 被关闭后触发  | (targetName, action) |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | — |    —     |
| disabled | 是否禁用 | boolean | — | false |
| name      | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| lazy  | 标签是否延迟渲染   | boolean   | — |  false  |`
			};
		}
	};
}
</script>

<style lang="less"></style>
