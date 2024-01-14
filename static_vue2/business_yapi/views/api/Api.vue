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
	await _.$ensure(() => window?.i18n?.options && Object.keys(window.i18n.options).length > 0);
	return {
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


