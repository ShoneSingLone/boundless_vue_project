<script lang="ts">
export default async function () {
	return [
		{
			icon: "icon_report",
			label: i18n("Demo"),
			children: [
				{
					icon: "icon_report",
					label: i18n("配置信息"),
					href: "/demo/config"
				},
				{
					icon: "icon_report",
					label: i18n("列表"),
					href: "/template/list"
				}
			]
		},
		{
			icon: "_icon_guid",
			label: i18n("指南"),
			children: [
				{
					icon: "icon_report",
					label: i18n("国际化"),
					href: "/guide/i18n"
				},
				{
					icon: "_icon_class_name",
					label: i18n("样式类"),
					href: "/guide/class"
				}
			]
		},
		{
			icon: "_icon_v_directive",
			label: i18n("命令式"),
			children: [
				{
					icon: "icon_report",
					label: i18n("水波纹"),
					href: "/directive/ripple"
				},
				{ icon: "icon_report", label: i18n("layer"), href: "/other/layer" },
				{ icon: "icon_report", label: i18n("move"), href: "/other/move" },
				{ icon: "icon_report", label: i18n("Popover"), href: "/other/popover" },
				{
					icon: "icon_report",
					label: `${i18n("Tooltip")} ${i18n("文字提示")}`,
					href: "/other/tooltip"
				},
				{
					icon: "_icon_dialog",
					label: `${i18n("Dialog")} ${i18n("弹窗")}`,
					href: "/other/open_window"
				},
				{
					icon: "_icon_notification",
					label: `${i18n("Notification")} ${i18n("通知")}`,
					href: "/other/notification"
				},
				{
					icon: "_icon_msg",
					label: `${i18n("Message")} ${i18n("消息")}`,
					href: "/other/message"
				}
			]
		},
		{
			icon: "_icon_combine",
			label: i18n("聚合类"),
			children: [
				{ href: "/x-component/x-form", icon: "icon_report", label: i18n("xForm") },
				{
					href: "/x-component/x-item",
					icon: "icon_report",
					label: i18n("xItem"),
					children: [
						{
							icon: "icon_report",
							label: i18n("xItemCheck"),
							href: "/x-component/x-item-check"
						},
						{
							icon: "icon_report",
							label: i18n("xItemCidr"),
							href: "/x-component/x-item-cidr"
						},
						{
							icon: "icon_report",
							label: i18n("xItemCheckboxGroup"),
							href: "/x-component/x-item-checkbox-group"
						}
					]
				}
			]
		},
		{
			icon: "_icon_components",
			label: i18n("组件"),
			children: [
				{
					icon: "_icon_layout",
					label: `${i18n("Layout")} ${i18n("布局")}`,
					href: "/component/base/layout"
				},
				{ icon: "icon_report", label: i18n("button"), href: "/component/base/button" },
				{
					icon: "icon_report",
					label: `${i18n("AdvancedSearch")} ${i18n("高级搜索按钮")}`,
					href: "/component/form/advanced-search"
				},
				{ icon: "icon_report", label: i18n("input"), href: "/component/form/input" },
				{
					icon: "icon_report",
					label: i18n("inputNumber"),
					href: "/component/form/input-number"
				},
				{ icon: "icon_report", label: i18n("checkbox"), href: "/component/form/checkbox" },
				{ icon: "icon_report", label: i18n("radio"), href: "/component/form/radio" },
				{ icon: "_icon_switch", label: i18n("switch"), href: "/component/form/switch" },
				{
					icon: "_icon_selector",
					label: `${i18n("Slider")} ${i18n("滑块")}`,
					href: "/component/form/slider"
				},
				{ icon: "_icon_selector", label: i18n("select"), href: "/component/form/select" },
				{
					icon: "_icon_selector",
					label: `${i18n("Cascader")} ${i18n("级联选择器")}`,
					href: "/component/form/cascader"
				},
				{
					icon: "_icon_selector",
					label: `${i18n("TimePicker")} ${i18n("时间选择器")}`,
					href: "/component/form/time-picker"
				},
				{
					icon: "_icon_selector",
					label: `${i18n("DatePicker")} ${i18n("日期选择器")}`,
					href: "/component/form/date-picker"
				},
				{
					icon: "_icon_selector",
					label: `${i18n("DateTimePicker")} ${i18n("日期时间选择器")}`,
					href: "/component/form/date-time-picker"
				},
				{
					icon: "icon_report",
					label: i18n("ip-address"),
					href: "/component/form/ip-address"
				},
				{
					icon: "_icon_image",
					label: i18n("image") + i18n("图片"),
					href: "/component/data/image"
				},
				{
					icon: "_icon_image",
					label: i18n("Drawer") + i18n("抽屉"),
					href: "/other/drawer"
				},
				{
					icon: "_icon_avatar",
					label: i18n("Avatar") + i18n("头像"),
					href: "/component/data/avatar"
				},
				{
					icon: "_icon_affix",
					label: `${i18n("Icon")} ${i18n("图标")}`,
					href: "/component/data/icon"
				},
				{
					icon: "icon_report",
					label: `${i18n("Card")} ${i18n("卡片")}`,
					href: "/component/data/card"
				},
				{
					icon: "icon_report",
					label: `${i18n("Descriptions")} ${i18n("描述列表")}`,
					href: "/component/data/descriptions"
				},
				{
					icon: "icon_report",
					label: `${i18n("Tag")} ${i18n("标签")}`,
					href: "/component/data/tag"
				},
				{
					icon: "_icon_xTree",
					label: `${i18n("Tree")} ${i18n("树形控件")}`,
					href: "/component/data/tree"
				},
				{
					icon: "icon_report",
					label: `${i18n("Table")} ${i18n("列表")}`,
					href: "/component/data/virtualized-table"
				},
				{
					icon: "icon_report",
					label: `${i18n("Pagination")} ${i18n("分页")}`,
					href: "/component/data/pagination"
				},
				{
					icon: "icon_report",
					label: `${i18n("Menu")} ${i18n("菜单")}`,
					href: "/component/navigation/menu"
				},
				{ icon: "icon_report", label: i18n("Tabs"), href: "/component/navigation/tabs" },
				{ icon: "icon_report", label: i18n("step"), href: "/component/navigation/step" },
				{
					icon: "icon_report",
					label: i18n("dropdown"),
					href: "/component/navigation/dropdown"
				},
				{
					icon: "_icon_breadcrumb",
					label: `${i18n("Breadcrumb")} ${i18n("面包屑")}`,
					href: "/component/navigation/breadcrumb"
				},
				{
					icon: "_icon_breadcrumb",
					label: `${i18n("PageHeader")} ${i18n("页头")}`,
					href: "/component/navigation/pageheader"
				},
				{
					icon: "_icon_affix",
					label: `${i18n("Affix")} ${i18n("固钉")}`,
					href: "/other/affix"
				},
				{
					icon: "_icon_affix",
					label: `${i18n("Alert")} ${i18n("警告")}`,
					href: "/other/alert"
				},
				{
					icon: "_icon_collapse",
					label: `${i18n("Collapse")} ${i18n("折叠面板")}`,
					href: "/other/collapse"
				},
				{
					icon: "_icon_timeline",
					label: `${i18n("Timeline")} ${i18n("时间线")}`,
					href: "/other/timeline"
				},
				{
					icon: "_icon_timeline",
					label: `${i18n("Calendar")} ${i18n("日历")}`,
					href: "/other/calendar"
				},
				{
					icon: "_icon_timeline",
					label: `${i18n("Divider")} ${i18n("分割线")}`,
					href: "/other/divider"
				},
				{
					icon: "_icon_affix",
					label: `${i18n("xExcalidraw")} ${i18n("白板")}`,
					href: "/component/data/excalidraw"
				}
			]
		},
		{
			icon: "icon_report",
			label: i18n("开发调试用"),
			children: [
				{
					icon: "icon_report",
					label: i18n("template"),
					href: "/dev/template"
				},
				{
					icon: "icon_report",
					label: i18n("render"),
					href: "/dev/render"
				},
				{
					icon: "icon_report",
					label: i18n("socket.io"),
					href: "/dev/io"
				},
				{
					icon: "icon_report",
					label: i18n("测试正则校验"),
					href: "/dev/rule"
				}
			]
		},
		{
			icon: "_icon_project",
			label: i18n("所有项目"),
			href: "/all-project"
		}
	];
}
</script>
