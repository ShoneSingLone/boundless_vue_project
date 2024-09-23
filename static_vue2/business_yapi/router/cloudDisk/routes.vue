<script lang="ts">
export default async function () {
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};
	return [
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		_.$newRoute("/", "@/views/CloudDisk/CloudDiskLayout.vue", {
			children: [
				_.$newRoute("/resource", "@/views/CloudDisk/CloudDiskResource.vue"),
				_.$newRoute("/transfer", "@/views/CloudDisk/CloudDiskTransfer.vue"),
				_.$newRoute("/me", "@/views/CloudDisk/CloudDiskMine.vue")
			]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
