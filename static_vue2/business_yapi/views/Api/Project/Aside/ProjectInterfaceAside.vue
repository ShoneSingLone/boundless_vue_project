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
			<div class="flex1" style="height: 1px; overflow: auto" ref="refTreeScroll">
				<elTree :data="inject_project.cptAsideTreeData" node-key="href" default-expand-all :expand-on-click-node="false">
					<xRender :render="nodeRender" :payload="payload" slot-scope="payload" />
				</elTree>
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
				resizeOptions
			};
		},
		data() {
			const vm = this;
			return {
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索分组",
					onEmitValue({ val }) {
						console.log(val);
						// vm.searchGroup();
					},
					clearable: true
				})
			};
		},
		computed: {
			cptInterfaceId() {
				return this.$route.query.interfaceId;
			}
		},
		methods: {
			setCurrentInterfaceMenuHightlight() {
				setTimeout(() => {
					$(".treeitem-is-active").removeClass("treeitem-is-active");
					setTimeout(() => {
						let item = $(".asideTreeItem.is-current");
						item = item.parent().parent();
						item.addClass("treeitem-is-active");
					}, 64);
				}, 64);
			},
			selectInterface({ menuType, _id }) {
				this.APP.routerUpsertQuery({ interfaceId: _id, interfaceType: menuType });
			},
			async scrollToLocation() {
				await _.$ensure(() => this.$refs.refTreeScroll);
				if (this.cptInterfaceId) {
					setTimeout(() => {
						try {
							this.$el.querySelector(".is-current").scrollIntoView({ behavior: "smooth", block: "center" });
						} catch (error) {}
					}, 300);
				}
			},
			/* 菜单 */
			nodeRender({ node, data: menuInfo }) {
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
					[h("xIcon", { icon: `_${iconName}` }), h("div", { staticClass: "node-name ml4" }, [title]), h("xIcon", updateIconPorps), h("xIcon", insertIconPorps)]
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
				const DialogTypeVueSFC = await _.$importVue("@/components/YapiDialogUpsertCategory.vue", {
					parent: this,
					project_id: this.APP.cptProjectId,
					categoryInfo,
					allCategory: this.inject_project.allCategory,
					getInterfaceList: this.inject_project.getInterfaceList
				});
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
						this.setCurrentInterfaceMenuHightlight();
					}
				}
			}
		}
	});
}
</script>
