<template>
	<div id="AppLayoutLeft" :style="leftStyle" :class="{ close: !isOpen }">
		<div class="x-padding flex middle">
			<xInput v-model="filterText" placeholder="Search" clearable />
			<xIcon icon="_icon_local" @click="local" class="pointer ml" />
		</div>
		<!-- aside.x-sidebar-menu-wrapper -->
		<aside :class="cptSideMenuClass">
			<div class="x-sidebar-menu" ref="menuWrapper">
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
			local() {
				setTimeout(async () => {
					await _.$ensure(() => this.$refs.menuWrapper);
					const [currentMenu] = $(".xMenuTreeItem.el-menu.active");
					_.$scrollIntoView(this.$refs.menuWrapper, currentMenu);
				}, 1000);
			},
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
					[
						hSpan({ staticClass: "mr" }, [node.label]),
						hSpan({ staticClass: "mr" }, [node._munu_level]),
						hSpan({ staticClass: "mr" }, [node._munu_id])
					]
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
			this.local();
		},
		computed: {
			cptSideMenuClass({ isOpen }) {
				return [
					"x-sidebar-menu-wrapper flex vertical center",
					{
						hide: !isOpen
					}
				];
			},
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
			leftStyle() {
				if (!this.isOpen) {
					return `--left-aside-width:1px`;
				}
				if (window.I18N_LANGUAGE === "zh-CN") {
					return `--left-aside-width:340px;`;
				} else {
					return `--left-aside-width:340px;`;
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
						const label = (() => {
							return item.label;
							const labelArray = item.label.split(" ");
							return _.map(labelArray, label => {
								return hDiv({ class: "menu-item-label" }, [label]);
							});
						})();

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
								label
							);
						}
						return hSpan({}, label);
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
.menu-item-label {
	font-size: 14px;
}
aside.x-sidebar-menu-wrapper {
	.el-submenu {
		.el-submenu__title {
			padding: 0 var(--ui-one);
		}
	}
}
</style>
