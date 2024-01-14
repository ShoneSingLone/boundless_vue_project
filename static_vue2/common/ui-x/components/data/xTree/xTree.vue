<style lang="less"></style>
<template>
	<div :class="cptTreeRootClass" role="tree">
		<xFixedSizeList
			v-if="isNotEmpty"
			:class-name="ns.b('virtual-list')"
			:data="flattenTree"
			:total="flattenTree.length"
			:height="height"
			:item-size="treeNodeSize"
			:perf-mode="perfMode"
			:defaultRender="defaultRender" />
		<div v-else :class="ns.e('empty-block')">
			<span :class="ns.e('empty-text')">{{ emptyText ? emptyText : i18n("el.tree.emptyText") }}</span>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { useTree, itemSize, iconPropType } = await _.$importVue("/common/ui-x/components/data/xTree/composables.vue");

	return defineComponent({
		props: _useXui.buildProps({
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
			defaultCheckedKeys: {
				type: Array,
				default: () => []
			},
			checkStrictly: {
				type: Boolean,
				default: false
			},
			defaultExpandedKeys: {
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
				default: true
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
			filterMethod: {
				type: Function
			},
			perfMode: {
				type: Boolean,
				default: true
			}
		}),
		setup(props, { emit, expose, listeners, slots }) {
			const treeNodeSize = computed(() => props.itemSize);

			const {
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
				expandedKeySet
			} = useTree(props, emit);

			return {
				ns: _useXui.useNamespace("tree"),
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
				expandedKeySet
			};
		},
		provide() {
			return {
				injectRootTree: this
			};
		},
		data() {
			return {};
		},
		watch: {
			expandedKeySet() {
				for (const entry of this.expandedKeySet) {
					console.log(entry);
					// Expected output: Array [42, 42]
					// Expected output: Array ["forty two", "forty two"]
				}
			}
		},
		computed: {
			cptTreeRootClass() {
				return [this.ns.b(), { [this.ns.m("highlight-current")]: this.highlightCurrent }];
			}
		},
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
					onToggle: this.toggleExpand,
					onCheck: this.handleNodeCheck
				};

				return h("xTreeNode", props);
			}
		}
	});
}
</script>
