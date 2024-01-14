<style lang="less"></style>
<template>
	<div
		ref="node$"
		:class="[ns.b('node'), ns.is('expanded', expanded), ns.is('current', current), ns.is('focusable', !disabled), ns.is('checked', !disabled && checked)]"
		role="treeitem"
		tabindex="-1"
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
					{
						expanded: !node?.isLeaf && expanded
					},
					ns.be('node', 'expand-icon')
				]"
				@click.stop="handleExpandIconClick">
				<xRender :render="icon" />
			</div>
			<el-checkbox v-if="showCheckbox" :model-value="checked" :indeterminate="indeterminate" :disabled="disabled" @change="handleCheckChange" @click.stop />
			{{ expanded }}
			<xNodeContent :node="node" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { itemSize, NODE_CONTEXTMENU } = await _.$importVue("/common/ui-x/components/data/xTree/composables.vue");

	return defineComponent({
		name: "xTreeNode",
		props: _useXui.buildProps({
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
		setup(props, { emit }) {
			/* @ts-ignore */
			const injectRootTree = this.injectRootTree;
			const ns = _useXui.useNamespace("tree");
			const indent = computed(() => {
				return injectRootTree.props?.indent || 16;
			});
			const icon = computed(() => {
				return injectRootTree.props?.icon || h("i", { class: "el-icon-caret-right" });
			});
			const handleClick = e => {
				emit("click", props.node, e);
			};
			const handleExpandIconClick = () => {
				emit("toggle", props.node);
			};
			const handleCheckChange = value => {
				emit("check", props.node, value);
			};
			const handleContextMenu = event => {
				if (injectRootTree?.instance?.vnode?.props?.["onNodeContextmenu"]) {
					event.stopPropagation();
					event.preventDefault();
				}
				injectRootTree?.ctx.emit(NODE_CONTEXTMENU, event, props.node?.data, props.node);
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
			cptStyle() {
				return {
					paddingLeft: `${(this.node.level - 1) * this.indent}px`,
					height: this.itemSize + "px"
				};
			}
		}
	});
}
</script>
