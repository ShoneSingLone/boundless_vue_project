<script lang="ts">
export default async function () {
	await Promise.all([
		// _.$importVue("/common/ui-tiny/useTinyUI.vue"),
		_.$importVue("/common/ui-x/useXui.vue"),
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		})
	]);

	_.each(
		{
			DemoAndCode: "@/components/DemoAndCode.vue"
		},
		(url, name) => {
			Vue.component(name, () => _.$importVue(url));
		}
	);

	/* app entry  */
	const [VueRouter, routes, App] = await Promise.all([
		_.$importVue("/common/libs/VueRouter.vue"),
		_.$importVue("@/router/routes.vue"),
		_.$importVue("@/layout/AppLayout.vue"),
		/*枚举选项*/
		_.$importVue("@/utils/opts.vue"),
		/* api */
		_.$importVue("@/utils/api.vue"),
		_.$importVue("/common/utils/rules.vue")
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
			// document.title = i18n("xUI doc");
			$("body").removeClass("x-loading");
		},
		data() {
			return {
				searchKey: "",
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
