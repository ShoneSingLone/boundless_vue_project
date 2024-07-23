<script lang="ts">
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-x/useXui.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		}),
		// _.$importVue("/common/ui-element/useElementUI.vue", { size: "small", I18N_LANGUAGE: window.I18N_LANGUAGE })
		_.$importVue("/common/ui-element/useElementUI.NoJS.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		})
	]);
	_.each(
		{
			DocContentOfDemo: "@/components/DocContentOfDemo.vue",
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
				isLoading: false,
				darkMode: false
			};
		},
		render(h) {
			return h(App);
		}
	});
}
</script>

<style lang="less">
:root {
	// --xItem-wrapper-width: 240px;
}

.block + .block {
	margin-top: 16px;
}
</style>
