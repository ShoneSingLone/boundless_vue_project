<script lang="ts">
export default async function () {
	const ComponentPageRouterView = {
		render(h) {
			return hDiv({ class: "x-page-view" }, [h("xPageContent", [h("router-view")])]);
		}
	};
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};

	return [
		_.$newRoute("/demo", ComponentRouterView, {
			children: [_.$newRoute("/demo/config", "@/views/demo/demo/configList.vue")]
		}),
		{
			/* 兜底：NotFound */
			path: "*",
			redirect: "/demo/config"
		}
	];
}
</script>
