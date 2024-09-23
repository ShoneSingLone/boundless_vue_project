<script lang="ts">
export default async function () {
	return [
		{
			icon: "icon_report",
			label: i18n("DevModel"),
			children: [
				{
					icon: "icon_report",
					label: i18n("DEV"),
					href: "/dev"
				},
				{
					icon: "icon_report",
					label: i18n("socket.io"),
					href: "/io"
				}
			]
		},
		{
			icon: "icon_report",
			label: i18n("组件"),
			children: [
				{
					icon: "icon_report",
					label: i18n("xBlock"),
					href: "/xBlock"
				},
				{
					icon: "icon_report",
					label: i18n("xTableVir"),
					href: "/xTableVir"
				},
				{
					icon: "icon_report",
					label: i18n("xTable"),
					href: "/xTable"
				},
				{
					icon: "icon_report",
					label: i18n("xTableDiv"),
					href: "/xTableDiv"
				},
				{
					icon: "icon_report",
					label: i18n("xItem"),
					icon: "_icon_rerun",
					children: [
						{
							href: "/xItem/xItemInput",
							icon: "icon_report",
							label: i18n("xItemInput")
						}
					]
				},
				{ icon: "icon_report", label: i18n("xIcon"), href: "/xIcon" },
				{
					icon: "icon_report",
					label: i18n("openWindow"),
					href: "/dialog_with_layer"
				}
			]
		}
	];
}
</script>
