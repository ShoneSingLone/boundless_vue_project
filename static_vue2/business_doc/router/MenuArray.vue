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
				{ icon: "icon_report", label: i18n("dialog"), href: "/other/open_window" },
				{ icon: "icon_report", label: i18n("notification 通知"), href: "/other/notification" }
			]
		},
		{
			icon: "_icon_combine",
			label: i18n("聚合类"),
			children: [
				{ href: "/x-component/x-form", icon: "icon_report", label: i18n("xForm") },
				{ href: "/x-component/x-item", icon: "icon_report", label: i18n("xItem") },
				{
					icon: "icon_report",
					label: i18n("xItemWrapper"),
					href: "/other/x-form-item-wrapper"
				}
			]
		},
		{
			icon: "_icon_components",
			label: i18n("组件"),
			children: [
				{
					href: "/base/button",
					icon: "icon_report",
					label: i18n("button")
				},

				{ href: "/component/form/input", icon: "icon_report", label: i18n("input") },
				{ href: "/component/form/input-number", icon: "icon_report", label: i18n("inputNumber") },
				{ href: "/component/form/checkbox", icon: "icon_report", label: i18n("checkbox") },
				{
					href: "/component/form/select",
					icon: "icon_report",
					label: i18n("select")
				},
				{
					href: "/component/form/ip-address",
					icon: "icon_report",
					label: i18n("ip-address")
				},

				{
					icon: "icon_report",
					label: i18n("icon"),
					href: "/component/data/icon"
				},
				{
					icon: "icon_report",
					label: i18n("card"),
					href: "/component/data/card"
				},
				{
					icon: "icon_report",
					label: i18n("Tag") + i18n("标签"),
					href: "/component/data/tag"
				},
				{
					icon: "icon_report",
					label: i18n("virtualized-tree"),
					href: "/component/data/tree"
				},
				{
					icon: "icon_report",
					label: i18n("virtualized-table"),
					href: "/component/data/virtualized-table"
				},
				{ icon: "icon_report", label: i18n("tabs"), href: "/component/navigation/tabs" },
				{ icon: "icon_report", label: i18n("dropdown"), href: "/component/navigation/dropdown" },
				{ icon: "_icon_breadcrumb", label: i18n("breadcrumb面包屑"), href: "/component/navigation/breadcrumb" },
				{ icon: "_icon_affix", label: i18n("affix 固钉"), href: "/other/affix" }
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
