<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCascader :options="options"></xCascader>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			return {
				md: `通过在数据源中设置 \`disabled\` 字段来声明该选项是禁用的

\`options\`指定的数组中的第一个元素含有\`disabled: true\`键值对，因此是禁用的。在默认情况下，Cascader 会检查数据中每一项的\`disabled\`字段是否为\`true\`，如果你的数据中表示禁用含义的字段名不为\`disabled\`，可以通过\`props.disabled\`属性来指定（详见下方 API 表格）。当然，\`value\`、\`label\`和\`children\`这三个字段名也可以通过同样的方式指定。`,
				options: [
					{
						value: "zhinan",
						label: "指南",
						disabled: true,
						children: [
							{
								value: "shejiyuanze",
								label: "设计原则",
								children: [
									{
										value: "yizhi",
										label: "一致"
									},
									{
										value: "fankui",
										label: "反馈"
									},
									{
										value: "xiaolv",
										label: "效率"
									},
									{
										value: "kekong",
										label: "可控"
									}
								]
							},
							{
								value: "daohang",
								label: "导航",
								children: [
									{
										value: "cexiangdaohang",
										label: "侧向导航"
									},
									{
										value: "dingbudaohang",
										label: "顶部导航"
									}
								]
							}
						]
					},
					{
						value: "zujian",
						label: "组件",
						children: [
							{
								value: "basic",
								label: "Basic",
								children: [
									{
										value: "layout",
										label: "Layout 布局"
									},
									{
										value: "color",
										label: "Color 色彩"
									},
									{
										value: "typography",
										label: "Typography 字体"
									},
									{
										value: "icon",
										label: "Icon 图标"
									},
									{
										value: "button",
										label: "Button 按钮"
									}
								]
							},
							{
								value: "form",
								label: "Form",
								children: [
									{
										value: "radio",
										label: "Radio 单选框"
									},
									{
										value: "checkbox",
										label: "Checkbox 多选框"
									},
									{
										value: "input",
										label: "Input 输入框"
									},
									{
										value: "input-number",
										label: "InputNumber 计数器"
									},
									{
										value: "select",
										label: "Select 选择器"
									},
									{
										value: "cascader",
										label: "Cascader 级联选择器"
									},
									{
										value: "switch",
										label: "Switch 开关"
									},
									{
										value: "slider",
										label: "Slider 滑块"
									},
									{
										value: "time-picker",
										label: "TimePicker 时间选择器"
									},
									{
										value: "date-picker",
										label: "DatePicker 日期选择器"
									},
									{
										value: "datetime-picker",
										label: "DateTimePicker 日期时间选择器"
									},
									{
										value: "upload",
										label: "Upload 上传"
									},
									{
										value: "rate",
										label: "Rate 评分"
									},
									{
										value: "form",
										label: "Form 表单"
									}
								]
							},
							{
								value: "data",
								label: "Data",
								children: [
									{
										value: "table",
										label: "Table 表格"
									},
									{
										value: "tag",
										label: "Tag 标签"
									},
									{
										value: "progress",
										label: "Progress 进度条"
									},
									{
										value: "tree",
										label: "Tree 树形控件"
									},
									{
										value: "pagination",
										label: "Pagination 分页"
									},
									{
										value: "badge",
										label: "Badge 标记"
									}
								]
							},
							{
								value: "notice",
								label: "Notice",
								children: [
									{
										value: "alert",
										label: "Alert 警告"
									},
									{
										value: "loading",
										label: "Loading 加载"
									},
									{
										value: "message",
										label: "Message 消息提示"
									},
									{
										value: "message-box",
										label: "MessageBox 弹框"
									},
									{
										value: "notification",
										label: "Notification 通知"
									}
								]
							},
							{
								value: "navigation",
								label: "Navigation",
								children: [
									{
										value: "menu",
										label: "NavMenu 导航菜单"
									},
									{
										value: "tabs",
										label: "Tabs 标签页"
									},
									{
										value: "breadcrumb",
										label: "Breadcrumb 面包屑"
									},
									{
										value: "dropdown",
										label: "Dropdown 下拉菜单"
									},
									{
										value: "steps",
										label: "Steps 步骤条"
									}
								]
							},
							{
								value: "others",
								label: "Others",
								children: [
									{
										value: "dialog",
										label: "Dialog 对话框"
									},
									{
										value: "tooltip",
										label: "Tooltip 文字提示"
									},
									{
										value: "popover",
										label: "Popover 弹出框"
									},
									{
										value: "card",
										label: "Card 卡片"
									},
									{
										value: "carousel",
										label: "Carousel 走马灯"
									},
									{
										value: "collapse",
										label: "Collapse 折叠面板"
									}
								]
							}
						]
					},
					{
						value: "ziyuan",
						label: "资源",
						children: [
							{
								value: "axure",
								label: "Axure Components"
							},
							{
								value: "sketch",
								label: "Sketch Templates"
							},
							{
								value: "jiaohu",
								label: "组件交互文档"
							}
						]
					}
				]
			};
		},
		computed: {}
	});
}
</script>
<style lang="less"></style>
