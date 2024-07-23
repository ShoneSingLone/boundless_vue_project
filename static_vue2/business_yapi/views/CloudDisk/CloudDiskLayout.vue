<template>
	<div id="app">
		<AppHeader />
		<main class="x-app-layout-main">
			<div class="AppLayoutContent">
				<KeepAlive>
					<RouterView />
				</KeepAlive>
			</div>
		</main>
		<xMobileTabBar
			:value="APP.cptNavBarName"
			:data="APP.tabArray"
			style="background-color: white"
			@change="mTabChange" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		mounted() {
			document.title = "网盘+";
		},
		components: {
			AppHeader: () => _.$importVue("@/views/CloudDisk/CloudDiskHeader.vue")
		},
		data() {
			return {
				isMobile: true
			};
		},
		computed: {
			isShowLoading() {
				return;
			}
		},
		methods: {
			mTabChange(label) {
				this.APP.cptNavBarName = label;
			}
		}
	};
}
</script>
