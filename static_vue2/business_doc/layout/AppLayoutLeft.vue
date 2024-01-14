<template>
	<div id="AppLayoutLeft" :style="cptLeftStyle">
		<div class="padding">
			<xInput v-model="filterText" placeholder="Search" clearable />
		</div>
		<aside
			:class="{
				'sidebar-menu-wrapper flex vertical center': true,
				hide: !isOpen
			}">
			<div class="sidebar-menu">
				<!-- <xMenuTree :data="menuList" :render="defaultRender" /> -->
				<xMenuTreeItem
					v-for="menu in cptMenuArray"
					:item="menu"
					:data-route-name="$route.name"
					:data-menu-href="menu.href"
					:active="checkMenuActive"
					:key="menu.href"
					:renders="vSlots"
					:isDefaultOpen="true" />
			</div>
			<div class="leftmenu-toggle" @click="isOpen = !isOpen">
				<xIcon :icon="cptIconName" />
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
			traverse({ menuArray, prefix, target, level }) {
				prefix = prefix || "";
				level = level || 0;
				target = target || [];
				let menu;
				while ((menu = menuArray.shift())) {
					menu._munu_id = `${prefix}_${menu.label}`;
					menu._munu_level = level;
					target.push(menu);
					if (_.$isArrayFill(menu.children)) {
						target = this.traverse({
							menuArray: menu.children,
							prefix: menu._munu_id,
							target: target,
							level: level + 1
						});
					}
				}
				return target;
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
					[h("span", { staticClass: "mr" }, [node.label]), h("span", { staticClass: "mr" }, [node._munu_level]), h("span", { staticClass: "mr" }, [node._munu_id])]
				);
			},
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
			},
			filter({ menuArray }) {
				let menu;
				let target = [];
				while ((menu = menuArray.shift())) {
					if (_.lowerCase(menu.label).includes(_.lowerCase(this.filterText))) {
						target.push(menu);
					} else if (_.$isArrayFill(menu.children)) {
						const children = this.filter({ menuArray: [...menu.children] });
						if (_.$isArrayFill(children)) {
							menu.children = children;
							console.log("menu.label", menu.label);
							target.push(menu);
						}
					}
				}
				return target;
			}
		},
		mounted() {
			// this.initActive();
		},
		computed: {
			menuList() {
				return this.traverse({ menuArray: _.cloneDeep(MenuArray) });
			},
			cptMenuArray() {
				if (this.filterText) {
					return this.filter({ menuArray: _.cloneDeep(MenuArray) });
				}
				return MenuArray;
			},
			cptIconName() {
				return this.isOpen ? "arrow_triangle-left" : "arrow_triangle-right";
			},
			cptLeftStyle() {
				if (!this.isOpen) {
					return `--left-aside-width:1px`;
				}
				if (window.I18N_LANGUAGE === "zh-CN") {
					return `--left-aside-width:240px;`;
				} else {
					return `--left-aside-width:240px;`;
				}
			}
		},
		data() {
			const vm = this;
			return {
				filterText: "",
				isOpen: true,
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
		height: 1px;
		flex:1;
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
