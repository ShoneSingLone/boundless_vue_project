<style lang="less">
.app-main {
	/* 50= navbar  50  */
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
}

.fixed-header + .app-main {
	padding-top: 50px;
}

.hasTagsView {
	.app-main {
		/* 84 = navbar + tags-view = 50 + 34 */
		min-height: calc(100vh - 84px);
	}

	.fixed-header + .app-main {
		padding-top: 84px;
	}
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 6px;
	}
}

::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background-color: #c0c0c0;
	border-radius: 3px;
}
</style>
<template>
	<section class="app-main">
		<RouterView v-if="!$route.meta.link" :key="key" v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="cptCachedViews">
					<component :is="Component" />
				</keep-alive>
			</transition>
		</RouterView>
		<iframe-toggle />
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			IframeToggle: () => _.$importVue("@/components/IframeToggle.vue")
		},
		computed: {
			cptCachedViews() {
				return this.APP.tagsView.cachedViews;
			},
			key() {
				return this.$route.path;
			}
		}
	});
}
</script>
