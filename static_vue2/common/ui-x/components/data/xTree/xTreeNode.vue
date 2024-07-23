<style lang="less">
.xTreeNode {
	&.is-current {
		.el-tree-node__content {
			background-color: var(--xTreeNode-bg-current, var(--el-color-primary));
			color: var(--xTreeNode-text-color-current, white);
		}
	}
	&.dragged {
		opacity: 0.3;
		transition: all 0.3s ease-in-out;
	}
	.indicator {
		position: absolute;
		z-index: 1;
		display: none;
		background-color: var(--el-color-primary);
		&.top {
			height: 2px;
			left: 0;
			top: 0;
			right: 0;
		}
		&.right {
			width: 2px;
			// background-color: red;
			right: 0;
			top: 0;
			bottom: 0;
		}
		&.bottom {
			height: 2px;
			// background-color: green;
			left: 0;
			right: 0;
			bottom: 0;
		}
		&.left {
			width: 2px;
			// background-color: yellow;
			left: 0;
			top: 0;
			bottom: 0;
		}
	}

	&.before {
		transform: translate(2px, 2px);
		.indicator {
			&.left,
			&.top {
				display: block;
			}
		}
	}
	&.inner {
		.indicator {
			&.right,
			&.left,
			&.top,
			&.bottom {
				display: block;
			}
		}
	}
	&.after {
		transform: translate(-2px, -2px);
		.indicator {
			&.right,
			&.bottom {
				display: block;
			}
		}
	}
}
</style>
<template>
	<div
		:draggable="cptDraggable"
		@drag="onDrag"
		@dragstart="onDragstart"
		@dragend="onDragend"
		@dragover="onDragover"
		@dragenter="onDragenter"
		@dragleave="onDragleave"
		@drop="onDrop"
		ref="node$"
		role="treeitem"
		tabindex="-1"
		:class="cptTreeNodeClass"
		:aria-expanded="expanded"
		:aria-disabled="disabled"
		:aria-checked="checked"
		:data-key="node?.key"
		@click.stop="handleClick"
		@contextmenu="handleContextMenu">
		<div :class="ns.be('node', 'content')" :style="cptStyle">
			<div
				v-if="icon"
				:class="[
					ns.is('leaf', !!node?.isLeaf),
					ns.is('hidden', hiddenExpandIcon),
					{ expanded: !node?.isLeaf && expanded },
					ns.be('node', 'expand-icon')
				]"
				@click.stop="handleExpandIconClick">
				<xRender :render="icon" />
			</div>
			<xCheckbox
				v-if="showCheckbox"
				:value="checked"
				:indeterminate="indeterminate"
				:disabled="disabled"
				@change="handleCheckChange"
				@click.stop />
			<xNodeContent :node="node" />
		</div>
		<div class="indicator top" />
		<div class="indicator right" />
		<div class="indicator bottom" />
		<div class="indicator left" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { itemSize, ON_NODE_CONTEXTMENU } = await _.$importVue(
		"/common/ui-x/components/data/xTree/composables.vue"
	);

	return defineComponent({
		name: "xTreeNode",
		props: _xUtils.buildProps({
			node: {
				type: Object,
				default: () => ({
					key: -1,
					level: -1,
					data: {}
				})
			},
			expanded: {
				type: Boolean,
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			},
			indeterminate: {
				type: Boolean,
				default: false
			},
			showCheckbox: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			current: {
				type: Boolean,
				default: false
			},
			hiddenExpandIcon: {
				type: Boolean,
				default: false
			},
			itemSize
		}),
		inject: ["injectRootTree"],
		setup(props) {
			const vm = this;
			/* @ts-ignore */
			const injectRootTree = this.injectRootTree;
			const ns = _xUtils.useNamespace("tree");
			const indent = computed(() => {
				return injectRootTree.props?.indent || 16;
			});
			const icon = computed(() => {
				return injectRootTree.props?.icon || h("i", { class: "el-icon-caret-right" });
			});
			const handleClick = e => {
				vm.$emit("click", props.node, e);
			};
			const handleExpandIconClick = () => {
				vm.$emit("toggle", props.node);
			};
			const handleCheckChange = value => {
				vm.$emit("check", props.node, value);
			};
			const handleContextMenu = event => {
				const handlerName = _.camelCase(ON_NODE_CONTEXTMENU);
				if (injectRootTree.$listeners[handlerName]) {
					event.stopPropagation();
					event.preventDefault();
				}
				injectRootTree.$emit(ON_NODE_CONTEXTMENU, event, props.node?.data, props.node);
			};
			return {
				ns,
				indent,
				icon,
				handleClick,
				handleExpandIconClick,
				handleCheckChange,
				handleContextMenu
			};
		},
		computed: {
			cptDraggable() {
				return !!this.injectRootTree?.dragAndDrop;
			},
			cptTreeNodeClass() {
				const { dropType, ns, expanded, current, disabled, checked, injectRootTree, node } =
					this;

				const classArray = [
					"xTreeNode",
					ns.b("node"),
					ns.is("expanded", expanded),
					ns.is("current", current),
					ns.is("focusable", !disabled),
					ns.is("checked", !disabled && checked)
				];

				if (this.cptDraggable) {
					return _.concat(classArray, [
						(injectRootTree.drag === node?.key && "dragged") || "",
						(injectRootTree.drop === node?.key && dropType) || ""
					]);
				} else {
					return classArray;
				}
			},
			cptStyle() {
				return {
					paddingLeft: `${(this.node.level - 1) * this.indent}px`,
					height: this.itemSize + "px"
				};
			}
		},
		methods: {
			async reset() {
				function traverse({ dragKey, dropKey, treeNodeArray, type }) {
					let node,
						result = {
							drag: null,
							drop: null,
							type
						};
					while ((node = treeNodeArray.shift())) {
						if (!result.drag && node.key === dragKey) {
							result.drag = node;
						}
						if (!result.drop && node.key === dropKey) {
							result.drop = node;
						}

						if (result.drag && result.drop) {
							return result;
						}
					}
					return result;
				}

				await this.injectRootTree.dragAndDrop(
					traverse({
						dragKey: this.injectRootTree.drag,
						dropKey: this.injectRootTree.drop,
						treeNodeArray: _.cloneDeep(this.injectRootTree.flattenTree),
						type: this.dropType
					})
				);

				this.injectRootTree.drag = -1;
				this.injectRootTree.drop = -1;
				this.dropType = "";
			},
			/* 在可拖动的目标上触发的事件 */
			onDrag(event) {
				// console.log("🚀 ~ onDrag ~ event:", event);
			},
			onDragstart(event) {
				if (!this.cptDraggable) {
					return;
				}

				// 保存被拖动元素的引用
				this.injectRootTree.drag = this.node?.key;
				// 设置为半透明
				// event.target.classList.add("dragging");
				// console.log("🚀 ~ onDragstart ~ event:", event);
			},
			onDragend(event) {
				if (!this.cptDraggable) {
					return;
				}

				// 拖动结束，重置透明度
				this.reset();
				// console.log("🚀 ~ onDragend ~ event:", event);
			},
			/* 在放置目标上触发的事件 */
			onDragover(event) {
				if (!this.cptDraggable) {
					return;
				}
				// 阻止默认行为以允许放置
				this.injectRootTree.drop = this.node?.key;
				event.preventDefault();
				const { offsetX, offsetY } = event;
				const onepice = Math.floor(event.target.offsetWidth / 3);
				// const onepice = Math.floor(event.target.offsetHeight / 3);

				this.dropType = (function () {
					/* 
					if (offsetY < onepice) {
						return "before";
					} else if (offsetY > onepice * 2) {
						return "after";
					} else {
						return "inner";
					}
					*/

					if (offsetX < onepice) {
						return "before";
					} else if (offsetX > onepice * 2) {
						return "after";
					} else {
						return "inner";
					}
				})();
			},
			onDragenter(event) {
				// 在可拖动元素进入潜在的放置目标时高亮显示该目标
				// const { offsetX, offsetY } = event;
				// console.log("🚀 ~ onDragover ~ event:", offsetX, offsetY);
				// console.log("🚀 ~ onDragenter ~ event:", event);
			},
			onDragleave(event) {
				// 在可拖动元素离开潜在放置目标元素时重置该目标的背景
				// console.log("🚀 ~ onDragleave ~ event:", event);
			},
			onDrop(event) {
				if (!this.cptDraggable) {
					return;
				}
				/* onDrop=>onDragend */
				// 阻止默认行为（会作为某些元素的链接打开）
				event.preventDefault();
				// const target = event.target;
				// 将被拖动元素移动到选定的目标元素中
				// console.log("🚀 ~ onDrop ~ event:", event);
				this.reset();
			}
		},
		data() {
			return {
				dropType: ""
			};
		}
	});
}
</script>
