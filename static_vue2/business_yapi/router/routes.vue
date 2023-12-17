<script>
export default async function () {
	return [
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		_.$newRoute("/api", "@/views/Api/Api.vue", {
			children: [_.$newRoute("/api/group", "@/views/Api/Group/Group.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
