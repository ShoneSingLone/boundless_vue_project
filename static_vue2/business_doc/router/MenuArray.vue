<script>
export default async function () {
	return [
		{
			icon: "_icon_report",
			label: i18n("所有项目"),
			href: "/all-project"
		},
		{
			icon: "_icon_report",
			label: i18n("CopyThis模板"),
			children: [
				{
					icon: "_icon_report",
					label: i18n("列表"),
					href: "/template/list"
				}
			]
		},
		{
			icon: "_icon_report",
			label: i18n("指令"),
			children: [
				{
					icon: "_icon_report",
					label: i18n("水波纹"),
					href: "/directive/ripple"
				},
				{
					icon: "_icon_report",
					label: i18n("openWindow"),
					href: "/other/open_window"
				},
				{ icon: "_icon_report", label: i18n("layer"), href: "/other/layer" },
				{ icon: "_icon_report", label: i18n("move"), href: "/other/move" },
				{ icon: "_icon_report", label: i18n("Popover"), href: "/other/popover" }
			]
		},
		{
			icon: "_icon_report",
			label: i18n("聚合类组件"),
			children: [
				{ href: "/x-component/x-form", icon: "_icon_report", label: i18n("xForm") },
				{ href: "/x-component/x-item", icon: "_icon_report", label: i18n("xItem") },
				{
					icon: "_icon_report",
					label: i18n("xItemWrapper"),
					href: "/other/x-form-item-wrapper"
				}
			]
		},
		{
			icon: "_icon_report",
			label: i18n("组件"),
			children: [
				{
					href: "/base/button",
					icon: "_icon_report",
					label: i18n("button")
				},

				{ href: "/component/form/input", icon: "_icon_report", label: i18n("input") },
				{ href: "/component/form/input-number", icon: "_icon_report", label: i18n("inputNumber") },
				{ href: "/component/form/checkbox", icon: "_icon_report", label: i18n("checkbox") },
				{
					href: "/component/form/select",
					icon: "_icon_report",
					label: i18n("select")
				},
				{
					href: "/component/form/ip-address",
					icon: "_icon_report",
					label: i18n("ip-address")
				},

				{
					icon: "_icon_report",
					label: i18n("icon"),
					href: "/component/data/icon"
				},
				{
					icon: "_icon_report",
					label: i18n("card"),
					href: "/component/data/card"
				},
				{
					icon: "_icon_report",
					label: i18n("Tag") + i18n("标签"),
					href: "/component/data/tag"
				},
				{
					icon: "_icon_report",
					label: i18n("virtualized-table"),
					href: "/component/data/virtualized-table"
				},
				{ icon: "_icon_report", label: i18n("tabs"), href: "/component/navigation/tabs" },
				{ icon: "_icon_report", label: i18n("dropdown"), href: "/component/navigation/dropdown" }
			]
		},
		{
			icon: "_icon_report",
			label: i18n("开发调试用"),
			children: [
				{
					icon: "_icon_report",
					label: i18n("template"),
					href: "/dev/template"
				},
				{
					icon: "_icon_report",
					label: i18n("render"),
					href: "/dev/render"
				},
				{
					icon: "_icon_report",
					label: i18n("socket.io"),
					href: "/dev/io"
				},
				{
					icon: "_icon_report",
					label: i18n("测试正则校验"),
					href: "/dev/rule"
				}
			]
		}
	];
}
</script>
