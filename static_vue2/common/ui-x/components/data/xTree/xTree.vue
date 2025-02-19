<style lang="less">
.xTree {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	.el-vl__window {
		--ui-thumb-hover: transparent;
	}
}

.el-tree {
	position: relative;
	cursor: default;
	background: #fff;
	color: #606266;
}

.el-tree__empty-block {
	position: relative;
	min-height: 60px;
	text-align: center;
	width: 100%;
	height: 100%;
}

.el-tree__empty-text {
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	color: var(--el-text-color-secondary);
	font-size: 14px;
}

.el-tree__drop-indicator {
	position: absolute;
	left: 0;
	right: 0;
	height: 1px;
	background-color: var(--el-color-primary);
}

.el-tree-node {
	white-space: nowrap;
	outline: 0;
}

.el-tree-node:focus > .el-tree-node__content {
	background-color: var(--el-fill-color-light);
}

.el-tree-node.is-drop-inner > .el-tree-node__content .el-tree-node__label {
	background-color: var(--el-color-primary);
	color: #fff;
}

.el-tree-node__content {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 26px;
	cursor: pointer;
}

.el-tree-node__content > .el-tree-node__expand-icon {
	padding: 6px;
}

.el-tree-node__content > label.el-checkbox {
	margin-right: 8px;
}

.el-tree-node__content:hover {
	background-color: var(--el-fill-color-light);
}

.el-tree.is-dragging .el-tree-node__content {
	cursor: move;
}

.el-tree.is-dragging.is-drop-not-allow .el-tree-node__content {
	cursor: not-allowed;
}

.el-tree-node__expand-icon {
	cursor: pointer;
	color: var(--el-text-color-disabled);
	font-size: 12px;
	-webkit-transform: rotate(0);
	transform: rotate(0);
	-webkit-transition: -webkit-transform 0.3s ease-in-out;
	transition: -webkit-transform 0.3s ease-in-out;
	transition: transform 0.3s ease-in-out;
	transition:
		transform 0.3s ease-in-out,
		-webkit-transform 0.3s ease-in-out;
}

.el-tree-node__expand-icon.expanded {
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.el-tree-node__expand-icon.is-leaf {
	color: transparent;
	cursor: default;
}

.el-tree-node__label {
	font-size: 14px;
}

.el-tree-node__loading-icon {
	margin-right: 8px;
	font-size: 14px;
	color: var(--el-text-color-disabled);
}

.el-tree-node > .el-tree-node__children {
	overflow: hidden;
	background-color: transparent;
}

.el-tree-node.is-expanded > .el-tree-node__children {
	display: block;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	background-color: #f0f7ff;
}
</style>
<script lang="ts">
export default async function () {
	const { useTree, itemSize, iconPropType } = await _.$importVue(
		"/common/ui-x/components/data/xTree/composables.vue"
	);

	return defineComponent({
		props: _xUtils.buildProps({
			dragAndDrop: {
				type: Function
			},
			data: {
				type: Array,
				default: () => []
			},
			emptyText: {
				type: String
			},
			height: {
				type: Number,
				default: 200
			},
			props: {
				type: Object,
				default: () => ({
					children: "children",
					label: "label",
					disabled: "disabled",
					value: "id"
				})
			},
			highlightCurrent: {
				type: Boolean,
				default: false
			},
			showCheckbox: {
				type: Boolean,
				default: false
			},
			checkedKeys: {
				type: Array,
				default: () => []
			},
			checkStrictly: {
				type: Boolean,
				default: false
			},
			expandedKeys: {
				type: Array,
				default: () => []
			},
			indent: {
				type: Number,
				default: 16
			},
			itemSize,
			icon: {
				type: iconPropType
			},
			expandOnClickNode: {
				type: Boolean,
				default: false
			},
			checkOnClickNode: {
				type: Boolean,
				default: false
			},
			currentNodeKey: {
				type: [String, Number]
			},
			accordion: {
				type: Boolean,
				default: false
			},
			filterHandler: {
				type: Function
			},
			perfMode: {
				type: Boolean,
				default: true
			}
		}),
		setup(props, { emit, expose, listeners, slots }) {
			const treeNodeSize = computed(() => props.itemSize);
			/* @ts-ignore */
			this.updateByToggleExpand = _.debounce(() => this.countExpand++, 64);
			/* @ts-ignore */
			this.updateByCheckedChange = _.debounce(() => this.countChecked++, 64);

			const {
				/* 计算属性，实时现实的的数据 */
				flattenTree,
				isNotEmpty,
				toggleExpand,
				isExpanded,
				isIndeterminate,
				isChecked,
				isDisabled,
				isCurrent,
				isForceHiddenExpandIcon,
				handleNodeClick,
				handleNodeCheck,
				// expose
				toggleCheckbox,
				getCurrentNode,
				getCurrentKey,
				setCurrentKey,
				getCheckedKeys,
				getCheckedNodes,
				getHalfCheckedKeys,
				getHalfCheckedNodes,
				setChecked,
				setCheckedKeys,
				filter,
				setData,
				getNode,
				expandNode,
				collapseNode,
				setExpandedKeys,
				expandedKeySet,
				checkedKeysSet
			} = useTree(props, emit, this);

			return {
				ns: _xUtils.useNamespace("tree"),
				treeNodeSize,
				/*  */
				flattenTree,
				isNotEmpty,
				toggleExpand,
				isExpanded,
				isIndeterminate,
				isChecked,
				isDisabled,
				isCurrent,
				isForceHiddenExpandIcon,
				handleNodeClick,
				handleNodeCheck,
				// expose
				toggleCheckbox,
				getCurrentNode,
				getCurrentKey,
				setCurrentKey,
				getCheckedKeys,
				getCheckedNodes,
				getHalfCheckedKeys,
				getHalfCheckedNodes,
				setChecked,
				setCheckedKeys,
				filter,
				setData,
				getNode,
				expandNode,
				collapseNode,
				setExpandedKeys,
				expandedKeySet,
				checkedKeysSet
			};
		},
		provide() {
			return {
				injectRootTree: this
			};
		},
		data() {
			return {
				drag: -1,
				drop: -1,
				countExpand: 0,
				countChecked: 0
			};
		},
		watch: {
			countExpand() {
				this.$emit("update:expandedKeys", Array.from(this.expandedKeySet));
			},
			countChecked() {
				this.$emit("update:checkedKeys", Array.from(this.checkedKeysSet));
			}
		},
		computed: {},
		methods: {
			defaultRender({ data, index, style }) {
				const props = {
					key: data[index].key,
					style: style,
					node: data[index],
					index: index,
					root: this.root,
					ns: this.ns,
					highlightCurrent: this.highlightCurrent,
					expandAll: this.expandAll,
					expandParent: this.expandParent,
					expanded: this.isExpanded(data[index]),
					showCheckbox: this.showCheckbox,
					checked: this.isChecked(data[index]),
					indeterminate: this.isIndeterminate(data[index]),
					itemSize: this.treeNodeSize,
					disabled: this.isDisabled(data[index]),
					current: this.isCurrent(data[index]),
					hiddenExpandIcon: this.isForceHiddenExpandIcon(data[index]),
					onClick: this.handleNodeClick,
					/* 点击折叠三角 */
					onToggle: this.toggleExpand,
					onCheck: this.handleNodeCheck
				};

				return h("xTreeNode", props);
			}
		},
		render() {
			const vm = this;
			/* @ts-ignore */
			return h("xAutoResizer", {
				staticClass: "xTree",
				attrs: { "data-tree-resizer-id": vm._uid },
				$vSlots: {
					default: ({ width, height }) => {
						const {
							ns,
							isNotEmpty,
							flattenTree,
							treeNodeSize,
							perfMode,
							defaultRender
						} = vm;
						if (isNotEmpty && height) {
							const listProps = {
								class: [ns.b("virtual-list"), "position-relative"],
								data: flattenTree,
								total: flattenTree.length,
								height: height,
								itemSize: treeNodeSize,
								perfMode: perfMode,
								defaultRender: defaultRender
							};
							return h("xFixedSizeList", listProps);
						} else {
							return h(
								"div",
								{
									class: ns.e("empty-block")
								},
								[
									h(
										"span",
										{
											class: ns.e("empty-text")
										},
										vm.emptyText ? vm.emptyText : vm.i18n("el.tree.emptyText")
									)
								]
							);
						}
					}
				}
			});
		}
	});
}
</script>
