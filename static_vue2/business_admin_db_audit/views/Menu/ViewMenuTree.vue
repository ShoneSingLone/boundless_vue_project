<style lang="less">
.ViewMenuTree {
	.spaceBetween {
		justify-content: space-between;
	}
	.is-current {
		color: white;
		.el-button.el-button--text,
		.el-button:focus .xIcon,
		.el-button:hover .xIcon {
			color: white;
		}
	}
}
</style>
<template>
	<div class="x-sidebar-menu height100 ViewMenuTree" style="position: relative">
		<xTree
			:currentNodeKey="currentNodeKey"
			ref="ViewMenuTree"
			:contentRender="contentRender"
			:data="menuArray"
			:props="props"
			@node-click="onNodeClick" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "injectViewMenu"],
		data() {
			return {
				menuArray: [],
				currentNodeKey: "",
				props: {
					value: "menuCode",
					label: "menuName",
					children: "children"
				}
			};
		},
		computed: {},
		mounted() {
			this.handlexdsMenuPage();
		},
		methods: {
			contentRender({ node }) {
				const vm = this;
				console.log("node", node);
				return h(
					"div",
					{
						// style:"justify-content: space-around",
						class: {
							"flex middle prefix-icon prefix spaceBetween width100": true,
							"is-leaf": node.isLeaf
						}
					},
					[
						hSpan({ staticClass: "mr", staticStyle: "display:flex" }, [node.label]),
						hSpan([
							hxBtn({
								icon: "_delete",
								preset: "text",
								on: {
									click: () => {
										vm.handleDelMenu(node);
									}
								}
							}),
							hxBtn({
								icon: "_add",
								preset: "text",
								class: "mr",
								on: {
									click: () => {
										vm.handleAddMenu(node);
									}
								}
							})
						])
					]
				);
			},
			async handleDelMenu(row) {
				try {
					await _.$confirm({
						title: "提示",
						content: `是否确认删除所选菜单？`
					});
					const { code, msg } = await _api.admin_db_audit.xdsMenuDelId({ ...row });
					if (code === 0) {
						_.$msg(msg);
						await this.handlexdsMenuPage();
					} else {
						_.$msgError(msg);
					}
				} catch (err) {
					console.log("err", err);
				}
			},
			async handleAddMenu(row) {
				const vm = this;
				_.$openModal({
					title: i18n("新增菜单"),
					url: "@/views/Menu/ViewMenuContent.upsert.dialog.vue",
					row,
					menuArrTree: vm.menuArray,
					onClick() {}
				});
			},
			async handlexdsMenuPage() {
				const { data: menuArray = [] } = await _api.admin_db_audit.xdsMenuPage();
				_.$traverse(menuArray, (node, nodeParent) => {
					if (node.DO_NOT_SHOW_IN_MENU) {
						_.remove(nodeParent, node);
					}
				});
				this.injectViewMenu.menuArrTree = menuArray;
				try {
					this.currentNodeKey = menuArray[0].menuCode;
					this.onNodeClick(menuArray[0]);
				} catch (error) {}

				this.menuArray = menuArray;
			},
			onNodeClick(item) {
				this.injectViewMenu.currentNode = item;
			},
			checkMenuActive(item) {
				return false;
			}
		}
	});
}
</script>
