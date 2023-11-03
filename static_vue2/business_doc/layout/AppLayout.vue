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

<script>
export default async function () {
	await _.$ensure(
		() => window?.i18n?.options && Object.keys(window.i18n.options).length > 0
	);
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

<style lang="less">
.AppLayoutMain {
	display: flex;
	flex-flow: row nowrap;
	height: 100%;
	width: 100%;
	overflow: hidden;

	> .AppLayoutLeft,
	> .AppLayoutContent {
		height: 100%;
	}

	> .AppLayoutContent {
		flex: 1;
		width: 1px;
		display: flex;
		flex-flow: column nowrap;
	}
}
</style>
