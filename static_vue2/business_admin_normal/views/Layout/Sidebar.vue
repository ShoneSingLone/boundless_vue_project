<style lang="less">
.sidebar-container {
	transition: width 0.28s;
	width: var(--base-sidebar-width) !important;
	background-color: var(--base-menu-background);
	height: 100%;
	font-size: 0px;
	top: 0;
	bottom: 0;
	left: 0;
	position: relative;
	z-index: 1;
	overflow: hidden;
	box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

	// reset element-ui css
	.horizontal-collapse-transition {
		transition:
			0s width ease-in-out,
			0s padding-left ease-in-out,
			0s padding-right ease-in-out;
	}

	.scrollbar-wrapper {
		overflow-x: hidden !important;
	}

	.el-scrollbar__bar.is-vertical {
		right: 0px;
	}

	.el-scrollbar {
		height: 100%;
	}

	&.has-logo {
		.el-scrollbar {
			height: calc(100% - 50px);
		}
	}

	.is-horizontal {
		display: none;
	}

	a {
		display: inline-block;
		width: 100%;
		overflow: hidden;
	}

	.svg-icon {
		margin-right: 16px;
	}

	.el-menu {
		border: none;
		height: 100%;
		width: 100% !important;
	}

	.el-menu-item,
	.menu-title {
		// overflow: hidden !important;
		// text-overflow: ellipsis !important;
		// white-space: nowrap !important;
	}

	.el-menu-item .el-menu-tooltip__trigger {
		display: inline-block !important;
	}

	// menu hover
	.sub-menu-title-noDropdown,
	.el-sub-menu__title {
		&:hover {
			background-color: rgba(0, 0, 0, 0.06) !important;
		}
	}

	& .theme-dark .is-active > .el-sub-menu__title {
		color: var(--base-menu-color-active) !important;
	}

	& .nest-menu .el-sub-menu > .el-sub-menu__title,
	& .el-sub-menu .el-menu-item {
		min-width: var(--base-sidebar-width) !important;

		&:hover {
			background-color: rgba(0, 0, 0, 0.06) !important;
		}
	}

	& .theme-dark .nest-menu .el-sub-menu > .el-sub-menu__title,
	& .theme-dark .el-sub-menu .el-menu-item {
		background-color: var(--base-sub-menu-background) !important;

		&:hover {
			background-color: var(--base-sub-menu-hover) !important;
		}
	}
}
</style>
<template>
	<div :class="cptSidebarContainerClass" :style="cptSidebarContainerStyle">
		<SidebarLogo v-if="cptIsShowLogo" :collapse="cptIsCollapse" />
		<xScrollbar :class="cptSideTheme" wrap-class="scrollbar-wrapper">
			<xMenu
				:default-active="activeMenu"
				:collapse="cptIsCollapse"
				:background-hover-color="
					cptSideTheme === 'theme-dark'
						? 'var(--base-menu-hover-bg-color)'
						: 'var(--base-menu-hover-light-background)'
				"
				:background-color="
					cptSideTheme === 'theme-dark'
						? 'var(--base-menu-background)'
						: 'var(--base-menu-light-background)'
				"
				:text-color="
					cptSideTheme === 'theme-dark'
						? 'var(--base-menu-color)'
						: 'var(--base-menu-light-color)'
				"
				:unique-opened="false"
				:active-text-color="cptTheme"
				:collapse-transition="false"
				mode="vertical">
				<AdminSidebarItem
					v-for="(route, index) in cptSidebarMenuTree"
					:key="route.path + index"
					:item="route"
					:base-path="route.path" />
			</xMenu>
		</xScrollbar>
	</div>
</template>
<script lang="ts">
export default async function () {
	Vue.component("AdminSidebarItem", () => _.$importVue("@/views/Layout/AdminSidebarItem.vue"));

	return defineComponent({
		inject: ["APP"],
		components: {
			SidebarLogo: () => _.$importVue("@/views/Layout/SidebarLogo.vue")
		},
		data() {
			return {};
		},
		computed: {
			cptSidebarContainerClass() {
				return {
					"sidebar-container": true,
					"has-logo": this.cptIsShowLogo
				};
			},
			cptSidebarContainerStyle() {
				return {
					"--base-sidebar-width": this.cptIsCollapse ? "54px" : "200px",
					backgroundColor:
						this.cptSideTheme === "theme-dark"
							? "var(--base-menu-background)"
							: "var(--base-menu-background)"
				};
			},
			cptIsShowLogo() {
				return this.APP.settings.sidebarLogo;
			},
			cptSideTheme() {
				return this.APP.settings.sideTheme;
			},
			cptTheme() {
				return this.APP.settings.theme;
			},
			cptIsCollapse() {
				return this.APP.sidebar.isCollapse;
			},
			cptSidebarMenuTree() {
				return this.APP.permission.state.routes;
			},
			activeMenu() {
				const { meta, path } = this.$route;
				// if set path, the sidebar will highlight the path you set
				if (meta.activeMenu) {
					return meta.activeMenu;
				}
				return path;
			}
		}
	});
}
</script>
