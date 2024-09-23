<template>
	<div id="AppLayoutLeft" :style="leftStyle" :class="{ close: !isOpen }">
		<aside
			:class="{
				'x-sidebar-menu-wrapper flex vertical center': true,
				hide: !isOpen
			}">
			<div class="x-sidebar-menu">
				<xMenuTreeItem
					v-for="menu in menuArray"
					:item="menu"
					:data-route-name="$route.name"
					:data-menu-href="menu.href"
					:active="checkMenuActive"
					:key="menu.href"
					:renders="vSlots" />
			</div>
			<div class="leftmenu-toggle" @click="isOpen = !isOpen">
				<xIcon :icon="cpt_iconName" />
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
		}
	};
}
</script>
<style lang="less"></style>
