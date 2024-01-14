<template>
	<div id="app" v-xloading="APP.isLoading">
		<AppHeader />
		<main class="AppLayoutMain">
			<AppLeft class="AppLayoutLeft" />
			<div class="AppLayoutContent">
				<RouterView />
				<!-- <div class="height100" v-loading="true" v-else>loading...</div> -->
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	await _.$ensure(() => window?.i18n?.options && Object.keys(window.i18n.options).length > 0);
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


