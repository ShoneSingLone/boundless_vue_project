<template>
	<DocContentOfDemo>
		<xMd :md="md1" />
		<div class="DemoMessage-demo">
			<div
				role="alert"
				class="el-message el-message--info is-closable"
				style="position: relative">
				<i class="el-message__icon el-icon-info"></i>
				<p class="el-message__content">这是一条消息提示</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div
				role="alert"
				class="el-message el-message--success is-closable"
				style="position: relative">
				<i class="el-message__icon el-icon-success"></i>
				<p class="el-message__content">恭喜你，这是一条成功消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div
				role="alert"
				class="el-message el-message--warning is-closable"
				style="position: relative">
				<i class="el-message__icon el-icon-warning"></i>
				<p class="el-message__content">警告哦，这是一条警告消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
			<div
				role="alert"
				class="el-message el-message--error is-closable"
				style="position: relative">
				<i class="el-message__icon el-icon-error"></i>
				<p class="el-message__content">错了哦，这是一条错误消息</p>
				<i class="el-message__closeBtn el-icon-close"></i>
			</div>
		</div>
		<DemoAndCode title="基础用法" path="@/views/other/message/JiChuYongFa.vue" unfold />
		<DemoAndCode title="不同状态" path="@/views/other/message/BuTongZhuangTai.vue" unfold />
		<DemoAndCode title="可关闭" path="@/views/other/message/KeGuanBi.vue" unfold />
		<DemoAndCode title="文字居中" path="@/views/other/message/WenZiJuZhong.vue" unfold />
		<DemoAndCode
			title="使用 HTML 片段"
			path="@/views/other/message/ShiYongHtmlPianDuan.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	/* 用于加载样式，实际使用中是懒加载，不用担心 */
	_.$importVue("/common/ui-x/directive/xMessage/xMessage.vue");
	return {
		data() {
			return {
				md1: `## Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

- 全局方法 \`_.$msg\` 用于调用，
- 调用 \`_.$msg\` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 \`close\` 方法。
- 如果需要手动关闭全部实例，可以调用 \`_.$msg.closeAll\` 方法。

`,
				apiString: `### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string / VNode | — | — |
| type | 主题 | string | success/warning/info/error | info |
| iconClass | 自定义图标的类名，会覆盖 \`type\` | string | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| center | 文字是否居中 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |
| offset | Message 距离窗口顶部的偏移量 | number | — | 20 |

### 方法

| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |				`
			};
		}
	};
}
</script>

<style lang="less">
.DemoMessage-demo {
	height: 270px;

	> div {
		margin-bottom: 16px;
	}
}
</style>
