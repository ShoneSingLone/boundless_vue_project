<style lang="less">
.topmenu-container.el-menu--horizontal > .el-menu-item {
	float: left;
	height: 50px !important;
	line-height: 50px !important;
	color: #999093 !important;
	padding: 0 5px !important;
	margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
	//   border-bottom: 2px solid #{'var(--theme)'} !important;
	color: #303133;
}

/* sub-menu item */
.topmenu-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
	float: left;
	height: 50px !important;
	line-height: 50px !important;
	color: #999093 !important;
	padding: 0 5px !important;
	margin: 0 10px !important;
}

/* 背景色隐藏 */
.topmenu-container.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.topmenu-container.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.topmenu-container.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
	background-color: #ffffff !important;
}

/* 图标右间距 */
.topmenu-container .svg-icon {
	margin-right: 4px;
}

/* topmenu more arrow */
.topmenu-container .el-sub-menu .el-sub-menu__icon-arrow {
	position: static;
	vertical-align: middle;
	margin-left: 8px;
	margin-top: 0px;
}
</style>
<template>
	<xMenu
		:default-active="cptActiveMenu"
		mode="horizontal"
		@select="handleSelect"
		:ellipsis="false">
		<template v-for="(item, index) in cptTopMenus">
			<xMenuItem
				:style="{ '--theme': cptTheme }"
				:index="item.path"
				:key="index"
				v-if="index < visibleNumber">
				<xIcon
					v-if="item.meta && item.meta.icon && item.meta.icon !== '#'"
					:icon="item.meta.icon" />
				{{ item.meta.title }}
			</xMenuItem>
		</template>

		<!-- 顶部菜单超出数量折叠 -->
		<xSubMenu
			:style="{ '--theme': cptTheme }"
			index="more"
			v-if="cptTopMenus.length > visibleNumber">
			<template #title>更多菜单</template>
			<template v-for="(item, index) in cptTopMenus">
				<xMenuItem :index="item.path" :key="index" v-if="index >= visibleNumber">
					<xIcon
						v-if="item.meta && item.meta.icon && item.meta.icon !== '#'"
						:icon="item.meta.icon" />
					{{ item.meta.title }}
				</xMenuItem>
			</template>
		</xSubMenu>
	</xMenu>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {
				// 顶部栏初始数
				visibleNumber: null,
				// 当前激活菜单的 index
				currentIndex: null,
				// 隐藏侧边栏路由
				hideList: ["/index", "/user/profile"]
			};
		},
		computed: {
			cptTheme() {
				return this.APP.settings.theme;
			},
			cptTopbarRouters() {
				return this.APP.permission.state.routes_topbar;
			},
			cptActiveMenu() {
				const path = this.$route.path;
				let activePath = path;
				if (
					path !== undefined &&
					path.lastIndexOf("/") > 0 &&
					this.hideList.indexOf(path) === -1
				) {
					const tmpPath = path.substring(1, path.length);
					activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
					if (!this.$route.meta.link) {
						this.APP.toggleSideBarHide(false);
					}
				} else if (!this.$route.children) {
					activePath = path;
					this.APP.toggleSideBarHide(true);
				}
				this.activeRoutes(activePath);
				return activePath;
			},
			cptTopMenus() {
				return _.reduce(
					this.cptTopbarRouters,
					(topMenus, menu) => {
						if (menu.hidden !== true) {
							// 兼容顶部栏一级菜单内部跳转
							if (menu.path === "/") {
								topMenus.push(menu.children[0]);
							} else {
								topMenus.push(menu);
							}
						}
						return topMenus;
					},
					[]
				);
			},
			childrenMenus() {
				let childrenMenus = [];
				_.map(this.cptTopbarRouters, router => {
					for (let item in router.children) {
						if (router.children[item].parentPath === undefined) {
							if (router.path === "/") {
								router.children[item].path = "/" + router.children[item].path;
							} else {
								if (!isHttp(router.children[item].path)) {
									router.children[item].path =
										router.path + "/" + router.children[item].path;
								}
							}
							router.children[item].parentPath = router.path;
						}
						childrenMenus.push(router.children[item]);
					}
				});
				return constantRoutes.concat(childrenMenus);
			}
		},
		methods: {
			activeRoutes(key) {
				let routes = _.reduce(
					this.childrenMenus,
					(_routes, item) => {
						if (key == item.parentPath || (key == "index" && "" == item.path)) {
							_routes.push(item);
						}
						return _routes;
					},
					[]
				);
				if (_.$isArrayFill(routes)) {
					this.APP.permission.setRoutes_sidebar(routes);
				} else {
					this.APP.toggleSideBarHide(true);
				}
				return routes;
			}
		}
	});
}
</script>
