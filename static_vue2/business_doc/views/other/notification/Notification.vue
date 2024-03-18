<template>
	<DocContentOfDemo>
		<xMd :md="md1" />
		<DemoAndCode title="基础用法" path="@/views/other/notification/JiChuYongFa.vue" unfold />
		<DemoAndCode title="带有倾向性" path="@/views/other/notification/DaiYouQingXiangXing.vue" unfold />
		<DemoAndCode title="自定义弹出位置" path="@/views/other/notification/ZiDingYiDanChuWeiZhi.vue" unfold />
		<DemoAndCode title="带有偏移" path="@/views/other/notification/DaiYouPianYi.vue" unfold />
		<DemoAndCode title="使用 HTML 片段" path="@/views/other/notification/ShiYongHtmlPianDuan.vue" unfold />
		<DemoAndCode title="隐藏关闭按钮" path="@/views/other/notification/YinCangGuanBiAnNiu.vue" unfold />
		<xMd :md="apiString" />

		<p>
			/* const DialogTypeVueSFC = await _.$importVue("/common/utils/useMoCommon/MoMulDeleteConfirmTableDialog.vue", { parent: vm, tableConfigs: defTable({ data: { list:
			Array.from(vm.configsTable.data.set) }, columns: vm.configsTable.columns }), onEnsure({ dialogVm }) {} }); _.$openWindow_deprecated(i18n("删除密钥对"), DialogTypeVueSFC); */
		</p>
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		setup(props) {
			return {
				contents: "contents"
			};
		},
		data() {
			return {
				md1: `## Notification 通知
适用性广泛的通知栏
悬浮出现在页面角落，显示全局的通知提醒消息。
>直接使用工具函数 \`_.$notify\`
`,
				apiString: `### Options
| 参数                     | 说明                                                                     | 类型                   | 可选值                                      | 默认值    |
|--------------------------|--------------------------------------------------------------------------|------------------------|---------------------------------------------|-----------|
| position                 | 自定义弹出位置                                                           | string                 | top-right/top-left/bottom-right/bottom-left | top-right |
| type                     | 主题样式，如果不在可选值内将被忽略                                       | string                 | success/warning/info/error                  | —         |
| customClass              | 自定义类名                                                               | string                 | —                                           | —         |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理                                    | boolean                | —                                           | false     |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭                                    | number                 | —                                           | 4500      |
| iconClass                | 自定义图标的类名。若设置了 \`type\`，则 \`iconClass\` 会被覆盖           | string                 | —                                           | —         |
| message                  | 说明文字,可以使用h函数                                                               | string/()=>VNode\\|VNode[] | —                                           | —         |
| offset                   | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number                 | —                                           | 0         |
| onClick                  | 点击 Notification 时的回调函数                                           | function               | —                                           | —         |
| onClose                  | 关闭时的回调函数                                                         | function               | —                                           | —         |
| showClose                | 是否显示关闭按钮                                                         | boolean                | —                                           | true      |
| title                    | 标题                                                                     | string                 | —                                           | —         |

`
			};
		}
	};
}
</script>

<style lang="less"></style>
