<style lang="less">
.ImAside {
	.imAside-user-list-avatar {
		width: 32px;
		height: 32px;
	}

	background-color: white;
	.tree-wrapper {
		.aside-tree-item {
			width: 1px;
		}
		.is-current {
			.el-tree-node__content {
				color: var(--el-color-primary);
				background: #ecf5ff;
				border-color: #b3d8ff;
			}
		}

		.el-tree-node__content {
			.xIcon._add {
				display: none;
			}
			&:hover {
				.xIcon._add {
					display: block;
				}
			}
		}
	}
}
</style>

<template>
	<aside class="ImAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
			</div>
			<div class="flex1-overflow-auto tree-wrapper" ref="refTreeScroll">
				<xTree
					:item-size="48"
					ref="refTree"
					:contentRender="treeContentRender"
					:data="cptMenuTree"
					:props="treeProps" />
			</div>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script lang="ts">
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");

	const getParents = (id, allNodeObject, parents = []) => {
		const self = allNodeObject[id];
		if (self) {
			parents.push(self);
			if (self.p_id) {
				return getParents(self.p_id, allNodeObject, parents);
			}
		}
		return parents;
	};

	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "inject_im"],
		mounted() {},
		setup(props) {
			const { stateStyle, resizeOptions } = (() => {
				if (this.APP.isMobile) {
					return { stateStyle: {}, resizeOptions: {} };
				} else {
					return useXmove(props);
				}
			})();

			return {
				stateStyle,
				resizeOptions,
				treeProps: {
					label: "username",
					children: "children"
				}
			};
		},
		computed: {
			cptUserTreeData() {
				return _.sortBy(
					_.map(this.APP.all_user, user =>
						_.merge(user, {
							avatar: Vue._common_utils.appendToken(
								`${window._AJAX_URL_PREFIX || ""}/api/user/avatar?uid=${user.uid}&usedBy=user`
							)
						})
					),
					"username"
				);
			},
			cptMenuTree() {
				if (this.configsSearch.value) {
					let newTree = [];
					_.$traverse(this.cptUserTreeData, node => {
						const isMatchUsername = new RegExp(this.configsSearch.value, "i").test(
							node.username
						);
						const isMatchEmail = new RegExp(this.configsSearch.value, "i").test(
							node.email
						);
						if (isMatchUsername || isMatchEmail) {
							newTree.push(node);
						}
					});
					return newTree;
				}

				return this.cptUserTreeData;
			}
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
					placeholder: "搜索联系人",
					onEmitValue({ val: query }) {
						onQueryChanged(query);
					},
					clearable: true
				}),
				groupListForShow: []
			};
		},
		methods: {
			async initExpandedKeys() {},
			scrollToLocation() {},
			/* 菜单 */
			treeContentRender({ data }) {
				const vm = this;
				return hDiv(
					{
						staticClass: "aside-tree-item flex middle flex1",
						attrs: {
							"data-wiki-id": data._id
						}
					},
					[
						hDiv(
							{
								staticClass: "node-name pointer flex1 ellipsis flex middle",
								onClick() {
									vm.APP.routerUpsertQuery({ uid: data.uid });
								}
							},
							[
								hxIcon({
									img: data.avatar,
									iscache: true,
									class: "imAside-user-list-avatar mr8"
								}),
								data.username
							]
						)
					]
				);
			}
		}
	});
}
</script>
