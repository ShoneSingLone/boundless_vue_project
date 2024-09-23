<template>
	<div id="app" v-xloading="APP.isLoading">
		<AppHeader />
		<main class="x-app-layout-main">
			<AppLeft class="AppLayoutLeft" />
			<div class="AppLayoutContent">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		components: {
			AppHeader: () => _.$importVue("@/layout/AppLayoutHeader.vue"),
			AppLeft: () => _.$importVue("@/layout/AppLayoutLeft.vue")
		},
		inject: ["APP"],
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>
