<script>
export default async function () {
	return [
		_.$newRoute("/login", "@/views/ViewLogin.vue"),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
