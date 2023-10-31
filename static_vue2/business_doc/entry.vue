<script>
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-x/useXui.vue"),
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			i18nLanguage: window.i18nLanguage
		})
	]);


	_.each(
		{
			DemoAndCode: "@/components/DemoAndCode.vue",
			MarkdownIt: "@/components/MarkdownIt.vue"
		},
		(url, name) => {
			Vue.component(name, () => _.$importVue(url));
		}
	);

	/* app entry  */
	const [VueRouter, routes, App] = await Promise.all([
		_.$importVue("/common/libs/VueRouter.vue"),
		_.$importVue("@/router/routes.vue"),
		_.$importVue("@/layout/AppLayout.vue")
	]);

	const router = new VueRouter({ routes });
	return new Vue({
		el: "#app",
		router,
		provide() {
			const APP = this;
			return {
				APP
			};
		},
		mounted() {
			window.APP = this;
			$("body").removeClass("x-loading");
		},
		data() {
			return {
				currMenu: {},
				isLoading: false
			};
		},
		render(h) {
			return h(App);
		}
	});
}
</script>
