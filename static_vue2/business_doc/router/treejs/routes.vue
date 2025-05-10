<script lang="ts">
export default async function () {
	const ComponentPageRouterView = {
		render(h) {
			return h("div", { class: "x-page-view Demo-view" }, [
				h("xPageContent", [h("router-view")])
			]);
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
		})
	];
}
</script>
