<script lang="ts">
export default async function () {
	return [
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		_.$newRoute("/api", "@/views/Api/Api.vue", {
			children: [_.$newRoute("/api/group", "@/views/Api/Group/Group.vue"), _.$newRoute("/api/project", "@/views/Api/Project/Project.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
