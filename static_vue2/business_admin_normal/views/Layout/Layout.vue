<style lang="less">
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - var(--base-sidebar-width));
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
	width: 100%;
}

.mobile .fixed-header {
	width: 100%;
}
</style>
<template>
	<div :class="cptWrapperClass" :style="cptWrapperStyle">
		<div
			v-if="APP.isMobile && cptSidebar.isCollapse"
			class="drawer-bg"
			@click="handleClickOutside" />
		<Sidebar v-if="!cptSidebar.hide" />
		<div :class="cptMainContainerClass">
			<div :class="cptFixedHeaderClass">
				<Navbar @setLayout="setLayout" />
				<TagsView v-if="cptIsNeedTagsView" />
			</div>
			<AppMain />
			<Settings ref="refSettings" v-if="false" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			Sidebar: () => _.$importVue("@/views/Layout/Sidebar.vue"),
			AppMain: () => _.$importVue("@/views/Layout/AppMain.vue"),
			Navbar: () => _.$importVue("@/views/Layout/Navbar.vue"),
			Settings: () => _.$importVue("@/views/Layout/Settings.vue"),
			TagsView: () => _.$importVue("@/views/Layout/TagsView.vue")
		},
		mounted() {
			this.$watch(
				() => [this.width, this.APP.isMobile],
				() => {
					const WIDTH = 992; // refer to Bootstrap's responsive design
					if (this.APP.isMobile && this.cptSidebar.isCollapse) {
						this.APP.closeSideBar({ withoutAnimation: false });
					}
					if (this.width - 1 < WIDTH) {
						this.APP.toggleDevice("mobile");
						this.APP.closeSideBar({ withoutAnimation: true });
					} else {
						this.APP.toggleDevice("desktop");
					}
				},
				{ immediate: true }
			);
		},
		setup(props) {
			const { height, width } = _xUtils.useWindowSize();
			return {
				height,
				width
			};
		},
		data() {
			return {};
		},
		computed: {
			cptIsFixedHeader() {
				return !!this.APP.settings.fixedHeader;
			},
			cptIsNeedTagsView() {
				return !!this.APP.settings.tagsView;
			},
			cptSettings() {
				return this.APP.settings;
			},
			cptSidebar() {
				return this.APP.sidebar;
			},
			cptWrapperClass() {
				return [
					"x-app-wrapper flex width100",
					{
						hideSidebar: this.cptSidebar.isCollapse,
						openSidebar: !this.cptSidebar.isCollapse,
						withoutAnimation: this.cptSidebar.withoutAnimation,
						mobile: this.APP.isMobile
					}
				];
			},
			cptWrapperStyle() {
				return { "--current-color": this.cptSettings.theme };
			},
			cptMainContainerClass() {
				return [
					"x-app-main flex vertical flex1",
					{
						hasTagsView: this.cptIsNeedTagsView,
						sidebarHide: this.cptSidebar.hide
					}
				];
			},
			cptFixedHeaderClass() {
				return { "fixed-header": this.cptIsFixedHeader };
			}
		},
		methods: {
			handleClickOutside() {
				this.APP.closeSideBar({ withoutAnimation: false });
			},
			setLayout() {
				this.$refs.refSettings.openSetting();
			}
		}
	});
}
</script>
