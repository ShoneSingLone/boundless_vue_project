<style lang="less">
.ProjectInterfaceAside {
	background-color: white;
	.ProjectInterfaceAside-node-item {
		.xIcon {
			&._add,
			&._edit {
				display: none;
			}
		}

		&:hover {
			.xIcon {
				&._add,
				&._edit {
					display: inline;
				}
			}
		}
	}
}
</style>
<template>
	<aside class="ProjectInterfaceAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
				<xGap l="10" />
				<div class="pointer" @click="scrollToLocation">
					<xIcon icon="currentLocation" class="icon-opreation_click" />
				</div>
			</div>
			<div class="flex1-overflow-auto" ref="refTreeScroll">
				<xTree
					ref="refTree"
					:contentRender="treeContentRender"
					:data="cptAsideTreeData"
					:props="treeProps" />
			</div>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script lang="ts">
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");

	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "inject_project"],
		setup(props) {
			const { stateStyle, resizeOptions } = useXmove(props);
			return {
				stateStyle,
				resizeOptions,
				treeProps: {
					value: "_id",
					label: "title",
					children: "children"
				},
				treeFilterMethod(query, node) {
					return new RegExp(query, "i").test(node.title);
				}
			};
		},
		data() {
			const vm = this;
			const onQueryChanged = _.debounce(query => {
				if (vm.$refs.refTree?.filter) {
					vm.$refs.refTree.filter(query);
				}
			}, 1000);

			return {
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索分组",
					onEmitValue({ val: query }) {
						onQueryChanged(query);
					},
					clearable: true
				})
			};
		},
		computed: {
			cptAsideTreeData() {
				if (this.configsSearch.value) {
					let newTree = [];
					_.$traverse(this.inject_project.cptAsideTreeData, node => {
						const isOk = new RegExp(this.configsSearch.value, "i").test(node.title);
						if (isOk) {
							newTree.push(node);
						}
					});
					return newTree;
				}

				return this.inject_project.cptAsideTreeData;
			},
			cptInterfaceId() {
				return this.$route.query.interfaceId;
			}
		},
		methods: {
			selectInterface({ menuType, _id }) {
				this.APP.routerUpsertQuery({ interfaceId: _id, interfaceType: menuType });
			},
			async scrollToLocation() {
				await _.$ensure(() => this.$refs.refTreeScroll);
				if (this.cptInterfaceId) {
					setTimeout(() => {
						try {
							this.$el
								.querySelector(".is-current")
								.scrollIntoView({ behavior: "smooth", block: "center" });
						} catch (error) {}
					}, 300);
				}
			},
			/* 菜单 */
			treeContentRender({ node, data: menuInfo }) {
				const vm = this;
				const { title, _id, categoryId, menuType } = menuInfo;
				const isCurrent = _.$isSame(_id, this.cptInterfaceId);
				const itemClass = `ProjectInterfaceAside-node-item flex middle asideTreeItem${isCurrent ? " is-current" : ""}`;
				const iconName = (() => {
					const strategy = {
						all: "allCategory",
						category: "subCategory",
						interface: "subCategoryInterface"
					};
					return strategy[menuType];
				})();

				const insertIconPorps = {
					vIf: menuType !== "interface",
					icon: `_add`,
					/* directives: [ { name: "xtips", value: (function () { if ("category" === menuInfo.menuType) { return "添加接口"; } if ("all" === menuInfo.menuType) { return "添加分类"; } })() } ], */
					onClick() {
						vm.openInsertDialog(menuInfo);
					}
				};
				const updateIconPorps = {
					vIf: menuType == "category",
					icon: `_edit`,
					/* directives: [ { name: "xtips", value: "修改分类" } ], */
					onClick() {
						vm.openInsertCategoryDialog(menuInfo);
					}
				};

				return h(
					"div",
					{
						class: itemClass,
						onClick: () => this.selectInterface(menuInfo)
					},
					[
						h("xIcon", { icon: `_${iconName}` }),
						h("div", { staticClass: "node-name ml4" }, [title]),
						h("xIcon", updateIconPorps),
						h("xIcon", insertIconPorps)
					]
				);
			},
			openInsertDialog(menuInfo) {
				if ("category" === menuInfo.menuType) {
					/* 添加接口 */
					this.openInterfaceDialog(menuInfo);
				}

				if ("all" === menuInfo.menuType) {
					/* 添加分类 */
					this.openInsertCategoryDialog();
				}
			},
			async openInsertCategoryDialog(categoryInfo = false) {
				const DialogTypeVueSFC = await _.$importVue(
					"@/components/YapiDialogUpsertCategory.vue",
					{
						parent: this,
						project_id: this.APP.cptProjectId,
						categoryInfo,
						allCategory: this.inject_project.allCategory,
						getInterfaceList: this.inject_project.getInterfaceList
					}
				);
				_.$openWindow_deprecated(categoryInfo ? "修改分类" : "添加分类", DialogTypeVueSFC);
			},
			openInterfaceDialog(categoryInfo) {
				return _.$openModal({
					title: "添加接口",
					url: "@/components/YapiDialogUpsertInterface.vue",
					parent: this,
					project_id: this.APP.cptProjectId,
					categoryInfo,
					getInterfaceList: this.inject_project.getInterfaceList
				});
			}
		},
		watch: {
			cptInterfaceId: {
				immediate: true,
				handler(interfaceId) {
					if (interfaceId) {
					}
				}
			}
		}
	});
}
</script>
