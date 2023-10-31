<script>
export default async function () {
	return [
		{
			icon: "_icon_report",
			label: i18n("DevModel"),
			children: [
				{
					icon: "_icon_report",
					label: i18n("DEV"),
					href: "/dev"
				},
				{
					icon: "_icon_report",
					label: i18n("socket.io"),
					href: "/io"
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
					href: "/directive_ripple"
				}
			]
		},
		{
			icon: "_icon_report",
			label: i18n("组件"),
			children: [
				{
					icon: "_icon_report",
					label: i18n("xTableVir"),
					href: "/xTableVir"
				},
				{
					icon: "_icon_report",
					label: i18n("xTable"),
					href: "/xTable"
				},
				{
					icon: "_icon_report",
					label: i18n("xItem"),
					icon: "_icon_rerun",
					children: [
						{
							href: "/xItem/xItemInput",
							icon: "_icon_report",
							label: i18n("xItemInput")
						}
					]
				},
				{ icon: "_icon_report", label: i18n("xIcon"), href: "/xIcon" },
				{
					icon: "_icon_report",
					label: i18n("openWindow"),
					href: "/dialog_with_layer"
				}
			]
		}
	];
}
</script>
