<style lang="less">
.openSidebar {
	// --left-aside-width: 315px;
	--left-aside-width: 270;
}
.hideSidebar {
	--left-aside-width: 54px;

	.el-submenu__title-text,
	.el-submenu__icon-arrow {
		display: none;
	}
}
#AppSidebar {
	--xMenuTreeItemPaddingLeft: 0px;
	width: var(--left-aside-width);
	transition: all 0.3s ease-in-out;
	box-shadow: var(--base-box-showdow);

	.AppSidebar-logo-wrapper {
		position: relative;
		width: 100%;
		height: var(--base-nav-height);
		line-height: var(--base-nav-height);
		text-align: center;
		overflow: hidden;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		.AppSidebar-logo {
			width: 42px;
			height: 42px;
		}

		.AppSidebar-logo_title-wrapper {
			overflow: hidden;
			.AppSidebar-logo_title {
				transition: all 0.5s 0.5s ease-in-out;
				font-size: 18px;
				line-height: 24px;
				font-weight: 700;
			}
		}

		&.collapse {
			.AppSidebar-logo {
				width: 24px;
				height: 24px;
				margin: auto;
			}
			.AppSidebar-logo_title-wrapper {
				display: none;
			}
		}
	}

	.x-sidebar-menu-wrapper {
		height: 1px;
		background: #fff;
		// box-shadow: var(--base-box-showdow);

		[data-nest-level="1"] {
			.el-submenu__title {
				padding-left: calc(var(--ui-one) * 4.5 * 1);
			}
		}
		[data-nest-level="2"] {
			.el-submenu__title {
				padding-left: calc(var(--ui-one) * 4.5 * 2);
			}
		}
		[data-nest-level="3"] {
			.el-submenu__title {
				padding-left: calc(var(--ui-one) * 4.5 * 3);
			}
		}
		[data-nest-level="4"] {
			.el-submenu__title {
				padding-left: calc(var(--ui-one) * 4.5 * 4);
			}
		}

		.xMenuTreeItem.el-menu {
			border-right: none;
			background: transparent;

			&[data-nest-level="0"] {
				&.open {
					background-color: rgba(241, 248, 247, 1);
					// width: 295px;
					border-radius: 6px;
					margin: auto;
				}
			}

			.el-submenu {
				height: 56px;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.el-submenu__title {
					width: 295px;
					margin: auto;
					color: var(--ui-aide-text);
					border-radius: 6px;
					transition: 0.3s ease-in-out;
					&:hover {
						background-color: rgba(241, 248, 247, 1);
					}
				}
			}

			&.active {
				> .el-submenu {
					.el-submenu__title {
						height: 44px;

						margin: auto;
						color: #fff;
						background-color: var(--el-color-primary);
					}
				}
			}

			&.collapse {
				&.active {
					.el-submenu__title {
						background-color: transparent;
						color: var(--el-color-primary);
					}
				}
				&.open {
					background-color: transparent;
				}

				.el-submenu__title {
					&.xMenuTreeItem-submenu-wrapper {
						display: block;
						width: 295px;
						height: 54px;
						padding: 0;
						margin: 0;
						border-radius: 0;
						background-color: transparent;
						color: var(--el-color-primary);
						text-align: center;

						svg.xMenuTreeItem-submenu-icon {
							width: 24px;
							height: 24px;
							margin-left: 16px;
						}

						.el-submenu__title-text,
						// .x-gap,
						.xMenuTreeItem-submenu-icon-arrow {
							display: none;
						}
					}
				}
			}
		}
	}

	.xMenuTreeItem-submenu-icon {
		width: 24px;
		height: 24px;
		margin: 0 24px;
	}
	.xMenuTreeItem-submenu-icon-arrow {
		margin: 0 24px;
		transition: all 0.3s ease-in-out;

		&.xMenuTreeItem-icon-arrow-up {
			transform: rotate(-90deg);
		}
	}
}
</style>
<template>
	<div id="AppSidebar" class="flex vertical">
		<div :class="['AppSidebar-logo-wrapper', { collapse: APP.sidebar.isCollapse }]">
			<xIcon img="@/assets/img/logo.png" class="AppSidebar-logo" />
			<div
				:class="[
					'AppSidebar-logo_title-wrapper flex vertical height100 center start ml',
					{ collapse: !APP.sidebar.isCollapse }
				]">
				<span class="AppSidebar-logo_title">X-DAS</span>
				<span class="AppSidebar-logo_title">数据库审计管理系统</span>
			</div>
		</div>
		<aside class="x-sidebar-menu-wrapper flex vertical flex1">
			<div class="x-sidebar-menu height100 overflow-auto" v-if="roleMenusList.length > 0">
				<template v-for="menu in cptMenuArray">
					<xMenuTreeItem
						:collapse="APP.sidebar.isCollapse"
						v-if="isAuth(menu)"
						:item="menu"
						:data-menu-href="menu.href"
						:active="checkMenuActive"
						:key="menu.href"
						:isDefaultOpen="false"
						folderIcon="_arrow" />
				</template>
			</div>
		</aside>
	</div>
</template>
<script lang="ts">
export default async function () {
	const MenuArray = await _.$importVue("@/router/MenuArray.vue");
	return {
		inject: ["APP"],
		methods: {
			isAuth({ menuCode }) {
				return this.APP.roleMenusList.includes(menuCode);
			},
			defaultRender({ data, key, index, isScrolling, style }) {
				const node = data[index];
				console.log("🚀 ~ defaultRender ~ node:", node);
				return h(
					"div",
					{
						style,
						staticClass: "flex middle"
					},
					[
						h("span", { staticClass: "mr" }, [node.label]),
						h("span", { staticClass: "mr" }, [node._munu_level]),
						h("span", { staticClass: "mr" }, [node._munu_id])
					]
				);
			},

			checkMenuActive(item) {
				const hrefName = String(item.href).split("/");
				if (this.routeNameArrayLength !== hrefName.length) {
					return false;
				}
				const isActive = _.every(hrefName, (value, index) => {
					return this.routeNameArray[index] === value;
				});
				return isActive;
			},
			getURL(item) {
				var url = "";
				if (item.href) {
					url = this.$router.resolve(item.href, this.$route);
				}
				return url;
			},
			selectMenu(menu, event) {
				this.APP.currMenu = menu;
				_.$location.hash("_", menu.href);
				if (event) {
					event.stopPropagation();
					event.preventDefault();
				}
			},
			initActive() {
				const menu = _.find(this.menuArray, {
					href: _.$location.hash("_")
				});
				this.selectMenu(menu || this.menuArray[0]);
				setTimeout(() => {
					this.APP.isLoading = false;
				}, 300);
			}
		},
		computed: {
			roleMenusList() {
				return this.APP.roleMenusList || [];
			},
			routeNameArray() {
				let routeName = String(this.$route.name);
				const routeNameArray = routeName.split("/");
				_.$traverse(MenuArray, node => {
					if (node.href === routeName) {
						if (node?.DO_NOT_SHOW_IN_MENU) {
							routeNameArray.pop();
						}
					}
				});

				return routeNameArray;
			},
			routeNameArrayLength() {
				return this.routeNameArray.length;
			},
			cptMenuArray() {
				let menuList = _.cloneDeep(MenuArray);
				_.$traverse(menuList, (node, nodeParent) => {
					if (node.DO_NOT_SHOW_IN_MENU) {
						_.remove(nodeParent, node);
					}
				});
				return menuList;
			}
		},
		data() {
			const vm = this;
			return {
				filterText: "",
				isOpen: true
			};
		},
		watch: {}
	};
}
</script>
