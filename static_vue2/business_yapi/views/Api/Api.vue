<template>
	<div id="app" v-loading="APP.isLoading">
		<AppHeader />
		<main class="AppLayoutMain">
			<div class="AppLayoutContent">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		mounted() {
			document.title = "Y-API-接口管理";
		},
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue")
		},
		inject: ["APP"],
		data() {
			return { isMobile: true };
		},
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>
