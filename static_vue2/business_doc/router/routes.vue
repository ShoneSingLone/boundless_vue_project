<script>
export default async function () {
	return [
		_.$newRoute("/dev", "@/views/dev/ViewDev.vue"),
		_.$newRoute("/io", "@/views/dev/ViewIo.vue"),
		_.$newRoute("/xTableVir", "@/views/use/ViewTableVir.vue"),
		_.$newRoute("/xTable", "@/views/use/ViewTable.vue"),
		_.$newRoute("/xItem", "@/views/use/ViewItem/ViewItem.vue", {
			children: [
				_.$newRoute("/xItem/xItemInput", "@/views/use/ViewTableVir.vue")
			]
		}),
		,
		_.$newRoute("/xIcon", "@/views/use/ViewIcon/ViewIcon.vue"),
		_.$newRoute("/directive_ripple", "@/views/use/ViewRipple.vue"),
		_.$newRoute(
			"/dialog_with_layer",
			"@/views/use/ViewOpenWindow/ViewOpenWindow.vue"
		),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/dev"
		}
	];
}
</script>
