<script lang="ts">
export default async function () {
	const X_MENU_TREE_ITEM = "xMenuTreeItem";

	return {
		name: X_MENU_TREE_ITEM,
		props: ["item", "clickItem", "renders", "active", "isDefaultOpen"],
		setup(props, { slots }) {
			const vm = this;
			var state = {
				isOpen: props.isDefaultOpen || false
			};
			state = reactive(state);
			vm.$on("open", isOpen => {
				state.isOpen = isOpen;
			});
			return {
				state,
				slots,
				handler() {
					vm.clickItem && vm.clickItem(vm.item);
				},
				scopeSlotsDefault() {
					if (slots?.label) {
						return slots?.label.call(vm, { item: vm.item });
					}
					if (props.renders?.label) {
						return props.renders?.label.call(vm, { item: vm.item });
					}

					return h("div", { staticClass: "el-submenu__title-text" }, [vm.cpt_label]);
				},
				toggle() {
					/* 如果折叠就不跳转 */
					if (vm.isFolder) {
						state.isOpen = !state.isOpen;
					} else {
						vm.clickItem && vm.clickItem(vm.item);
						vm.dispatch(X_MENU_TREE_ITEM, "open", true);
					}
				}
			};
		},
		computed: {
			isActive() {
				const isActive = this.active(this.item);
				if (isActive) {
					this.dispatch(X_MENU_TREE_ITEM, "open", true);
				}
				return isActive;
			},
			cpt_label() {
				return this.item?.label;
			},
			isFolder: function () {
				return this.item?.children && this.item?.children.length;
			},
			cpt_children: function () {
				return this.item?.children || [];
			}
		},
		render() {
			const { $attrs, toggle, item, createTextVNode, scopeSlotsDefault, cpt_children, isFolder, isActive, state, active, clickItem, renders, $router } = this;

			return h(
				"div",
				merge_hFnProps([
					$attrs,
					{ attrs: $attrs },
					{
						class: {
							"xMenuTreeItem el-menu": true,
							active: isActive
						},
						attrs: { role: "menubar" }
					}
				]),
				[
					h(
						"div",
						{
							staticClass: "el-submenu",
							attrs: { role: "menuitem" },
							on: { click: toggle }
						},
						[
							h(
								"div",
								{
									staticClass: "el-submenu__title flex middle",
									onClick() {
										if (item.href) {
											$router.push({ path: item.href });
										}
									}
								},
								[
									h("xIcon", {
										vIf: item?.icon,
										staticClass: "mr8",
										attrs: { icon: item?.icon }
									}),
									scopeSlotsDefault({ item }),
									createTextVNode(" "),
									h("i", {
										vIf: isFolder,
										class: {
											"el-submenu__icon-arrow": true,
											"el-icon-arrow-down": !state.isOpen,
											"el-icon-arrow-up": state.isOpen
										}
									})
								],
								2
							)
						]
					),
					h(
						"div",
						{ vIf: isFolder },
						_.map(cpt_children, function (child, index) {
							const treeProps = {
								directives: [
									{
										name: "show",
										rawName: "v-show",
										value: state.isOpen,
										expression: "state.isOpen"
									}
								],
								key: index,
								staticStyle: {
									"padding-left": "var(--ui-one)"
								},
								renders,
								active: active,
								clickItem: clickItem,
								item: child
							};
							return h("xMenuTreeItem", treeProps);
						})
					)
				]
			);
		}
	};
}
</script>

<style lang="less"></style>
