<script lang="ts">
export default async function () {
	return [
		_.$newRoute("/dev", "@/views/dev/ViewDev.vue"),
		_.$newRoute("/io", "@/views/dev/ViewIo.vue"),
		_.$newRoute("/xTableVir", "@/views/use/ViewTableVir.vue"),
		_.$newRoute("/xBlock", "@/views/use/ViewCard.vue"),
		_.$newRoute("/xTable", "@/views/use/ViewTable.vue"),
		_.$newRoute("/xTableDiv", "@/views/use/ViewTableDiv.vue"),
		_.$newRoute("/xItem", "@/views/use/ViewItem/ViewItem.vue", {
			children: [
				_.$newRoute("/xItem/xItemInput", "@/views/use/ViewItem/base.vue"),
				_.$newRoute("/xItem/ip_address", "@/views/viewItem/viewIpAddress.vue")
			]
		}),
		,
		_.$newRoute("/xIcon", "@/views/use/ViewIcon/ViewIcon.vue"),
		_.$newRoute("/dialog_with_layer", "@/views/use/ViewOpenWindow/ViewOpenWindow.vue"),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/dev"
		}
	];
}
</script>
