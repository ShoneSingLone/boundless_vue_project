<script lang="ts">
export default async function () {
	const [VueRouter, routes] = await _.$importVue([
		"/common/libs/VueRouter.vue",
		"@/router/treejs/routes.vue",
		"/common/ui-x/useXui.vue"
	]);

	/* app entry  */
	const router = new VueRouter({ routes });

	var rootApp = new Vue({
		el: "#app",
		router,
		components: {
			ViewApp: () => _.$importVue("@/layout/AppLayout.vue")
		},
		template: `<ViewApp/>`,
		provide() {
			return {
				APP: this
			};
		},
		setup() {
			const vm = this;
			return {};
		},
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
		watch: {}
	});

	return rootApp;
}
</script>

<style lang="less">
* {
	font-size: 14px;
}
</style>
