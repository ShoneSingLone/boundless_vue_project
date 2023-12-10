<template>
	<div id="AppLayoutLeft" :style="leftStyle">
		<aside
			:class="{
				'sidebar-menu-wrapper flex vertical center': true,
				hide: !isOpen
			}">
			<div class="sidebar-menu">
				<xMenuTreeItem v-for="menu in menuArray" :item="menu" :data-route-name="$route.name" :data-menu-href="menu.href" :active="checkMenuActive" :key="menu.href" :renders="vSlots" />
			</div>
			<div class="leftmenu-toggle" @click="isOpen = !isOpen">
				<xIcon :icon="cpt_iconName" />
			</div>
		</aside>
	</div>
</template>
<script>
export default async function () {
	const MenuArray = await _.$importVue("@/router/MenuArray.vue");
	return {
		inject: ["APP"],
		methods: {
			search: _.debounce(function (value) {}, 1000),
			checkMenuActive(item) {
				const routeNameArray = String(this.$route.name).split("/");
				const hrefName = String(item.href).split("/");
				return _.every(hrefName, (value, index) => {
					return routeNameArray[index] === value;
				});
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
		mounted() {
			// this.initActive();
		},
		computed: {
			cpt_iconName() {
				return this.isOpen ? "arrow_triangle-left" : "arrow_triangle-right";
			},
			leftStyle() {
				if (!this.isOpen) {
					return `--left-aside-width:1px`;
				}
				if (I18N_LANGUAGE === "zh-CN") {
					return `--left-aside-width:240px;`;
				} else {
					return `--left-aside-width:240px;`;
				}
			}
		},
		data() {
			const vm = this;
			return {
				isOpen: true,
				menuArray: MenuArray,
				vSlots: {
					label({ item }) {
						if (item.href) {
							const { href } = vm.$router.resolve(item.href);
							return h(
								"a",
								{
									staticClass: "el-submenu__title-text flex1",
									attrs: { href },
									onClick: event => {
										event.preventDefault();
									}
								},
								[item.label]
							);
						}
						return h("span", {}, [item.label]);
					}
				}
			};
		},
		watch: {
			"APP.searchKey"(value) {
				this.search(value);
			}
		}
	};
}
</script>
<style lang="less">
#AppLayoutLeft {
	width: var(--left-aside-width);
	position: relative;
	background-color: #ffffff;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

	aside.sidebar-menu-wrapper {
		position: relative;
		height: 100%;
		width: var(--left-aside-width);

		&.hide {
			.log-title-wrapper,
			.sidebar-menu {
				display: none;
			}
		}

		.log-title-wrapper {
			> .xIcon {
				width: 48px;
				height: 48px;
				margin: 30px 30px 0;
			}

			> .title {
				position: relative;
				font-size: 20px;
				padding-bottom: 30px;
				font-weight: 700;
				background: var(--el-color-white);
				text-align: left;

				&::before {
					content: " ";
					display: block;
					position: absolute;
					left: 4px;
					right: 8px;
					bottom: 10px;
					border-bottom: 1px dashed var(--el-text-color-placeholder);
					z-index: 1;
				}
			}
		}

		.sidebar-menu {
			overflow: auto;
			flex: 1;

			.el-menu {
				border-right: unset;

				.el-submenu {
					.el-submenu__title {
						--height: 48px;
						height: var(--height);
						line-height: var(--height);
					}
				}

				&.active {
					.el-submenu {
						.el-submenu__title {
							background-color: #ecf5ff;
							color: var(--ui-primary) !important;
							// font-weight: 600;

							&::before {
								content: " ";
								display: block;
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
								border-right: 4px solid var(--ui-primary) !important;
								z-index: 1;
							}
						}
					}
				}
			}
		}

		.leftmenu-toggle {
			--app-toggle-width: 10px;
			position: absolute;
			top: 50%;
			left: var(--left-aside-width);
			background-color: var(--el-color-white);
			border-radius: 0 var(--app-toggle-width) var(--app-toggle-width) 0;
			cursor: pointer;
			height: 80px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: var(--app-toggle-width);
			display: flex;
			justify-content: center;
			align-items: center;

			&:hover {
				box-shadow: var(--el-box-shadow);
			}
		}
	}
}
</style>
