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
				}
			]
		}
	];
}
</script>
