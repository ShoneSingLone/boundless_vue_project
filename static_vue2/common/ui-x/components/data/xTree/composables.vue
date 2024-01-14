<script lang="ts">
export default async function () {
	const KEY = "id";
	const LABEL = "label";
	const CHILDREN = "children";
	const DISABLED = "disabled";
	const NODE_CLICK = "node-click";
	const NODE_EXPAND = "node-expand";
	const NODE_COLLAPSE = "node-collapse";
	const CURRENT_CHANGE = "current-change";
	const NODE_CHECK = "check";
	const NODE_CHECK_CHANGE = "check-change";
	const NODE_CONTEXTMENU = "node-contextmenu";

	function useTree(props, emit) {
		const expandedKeyArray = ref(props.defaultExpandedKeys || []);
		const currentKey = ref();
		const tree = shallowRef();
		watch(
			() => props.currentNodeKey,
			key => {
				currentKey.value = key;
			},
			{
				immediate: true
			}
		);
		watch(
			() => props.data,
			data => {
				setData(data);
			},
			{
				immediate: true
			}
		);
		const { isIndeterminate, isChecked, toggleCheckbox, getCheckedKeys, getCheckedNodes, getHalfCheckedKeys, getHalfCheckedNodes, setChecked, setCheckedKeys } = useCheck(props, tree);
		const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = useFilter(props, tree);
		const valueKey = computed(() => {
			var _a2;
			return ((_a2 = props.props) == null ? void 0 : _a2.value) || KEY;
		});
		const childrenKey = computed(() => {
			var _a2;
			return ((_a2 = props.props) == null ? void 0 : _a2.children) || CHILDREN;
		});
		const disabledKey = computed(() => {
			var _a2;
			return ((_a2 = props.props) == null ? void 0 : _a2.disabled) || DISABLED;
		});
		const labelKey = computed(() => {
			var _a2;
			return ((_a2 = props.props) == null ? void 0 : _a2.label) || LABEL;
		});
		const flattenTree = computed(() => {
			const hiddenKeys = hiddenNodeKeySet.value;
			const flattenNodes = [];
			const nodes = (tree.value && tree.value.treeNodes) || [];
			function traverse() {
				const stack = [];
				for (let i = nodes.length - 1; i >= 0; --i) {
					stack.push(nodes[i]);
				}
				while (stack.length) {
					const node = stack.pop();
					if (!node) continue;
					if (!hiddenKeys.has(node.key)) {
						flattenNodes.push(node);
					}
					if (expandedKeyArray.value.includes(node.key)) {
						const children = node.children;
						if (children) {
							const length = children.length;
							for (let i = length - 1; i >= 0; --i) {
								stack.push(children[i]);
							}
						}
					}
				}
			}
			traverse();
			return flattenNodes;
		});
		const isNotEmpty = computed(() => {
			return flattenTree.value.length > 0;
		});
		function createTree(data) {
			const treeNodeMap = /* @__PURE__ */ new Map();
			const levelTreeNodeMap = /* @__PURE__ */ new Map();
			let maxLevel = 1;
			function traverse(nodes, level = 1, parent = void 0) {
				var _a2;
				const siblings = [];
				for (const rawNode of nodes) {
					const value = getKey(rawNode);
					const node = {
						level,
						key: value,
						data: rawNode
					};
					node.label = getLabel(rawNode);
					node.parent = parent;
					const children = getChildren(rawNode);
					node.disabled = getDisabled(rawNode);
					node.isLeaf = !children || children.length === 0;
					if (children && children.length) {
						node.children = traverse(children, level + 1, node);
					}
					siblings.push(node);
					treeNodeMap.set(value, node);
					if (!levelTreeNodeMap.has(level)) {
						levelTreeNodeMap.set(level, []);
					}
					(_a2 = levelTreeNodeMap.get(level)) == null ? void 0 : _a2.push(node);
				}
				if (level > maxLevel) {
					maxLevel = level;
				}
				return siblings;
			}
			const treeNodes = traverse(data);
			return {
				treeNodeMap,
				levelTreeNodeMap,
				maxLevel,
				treeNodes
			};
		}
		function filter(query) {
			const keys2 = doFilter(query);
			if (keys2) {
				expandedKeyArray.value = Array.from(keys2);
			}
		}
		function getChildren(node) {
			return node[childrenKey.value];
		}
		function getKey(node) {
			if (!node) {
				return "";
			}
			return node[valueKey.value];
		}
		function getDisabled(node) {
			return node[disabledKey.value];
		}
		function getLabel(node) {
			return node[labelKey.value];
		}
		function toggleExpand(node) {
			if (expandedKeyArray.value.includes(node.key)) {
				collapseNode(node);
			} else {
				expandNode(node);
			}
		}
		function setExpandedKeys(newExpandedKeyArray) {
			expandedKeyArray.value = newExpandedKeyArray;
		}
		function handleNodeClick(node, e) {
			emit(NODE_CLICK, node.data, node, e);
			handleCurrentChange(node);
			if (props.expandOnClickNode) {
				toggleExpand(node);
			}
			if (props.showCheckbox && props.checkOnClickNode && !node.disabled) {
				toggleCheckbox(node, !isChecked(node), true);
			}
		}
		function handleCurrentChange(node) {
			if (!isCurrent(node)) {
				currentKey.value = node.key;
				emit(CURRENT_CHANGE, node.data, node);
			}
		}
		function handleNodeCheck(node, checked) {
			toggleCheckbox(node, checked);
		}
		function expandNode(node) {
			if (tree.value && props.accordion) {
				const { treeNodeMap } = tree.value;
				expandedKeyArray.value.forEach(key => {
					const treeNode = treeNodeMap.get(key);
					if (node && node.level === (treeNode == null ? void 0 : treeNode.level)) {
						_.remove(expandedKeyArray.value, i => i === key);
					}
				});
			}
			expandedKeyArray.value.push(node.key);
			emit(NODE_EXPAND, node.data, node);
		}
		function collapseNode(node) {
			_.remove(expandedKeyArray.value, i => i === node.key);
			emit(NODE_COLLAPSE, node.data, node);
		}
		function isExpanded(node) {
			return expandedKeyArray.value.includes(node.key);
		}
		function isDisabled(node) {
			return !!node.disabled;
		}
		function isCurrent(node) {
			const current = currentKey.value;
			return current !== void 0 && current === node.key;
		}
		function getCurrentNode() {
			var _a2, _b;
			if (!currentKey.value) return void 0;
			return (_b = (_a2 = tree.value) == null ? void 0 : _a2.treeNodeMap.get(currentKey.value)) == null ? void 0 : _b.data;
		}
		function getCurrentKey() {
			return currentKey.value;
		}
		function setCurrentKey(key) {
			currentKey.value = key;
		}
		function setData(data) {
			nextTick(() => (tree.value = createTree(data)));
		}
		function getNode(data) {
			var _a2;
			const key = isObject(data) ? getKey(data) : data;
			return (_a2 = tree.value) == null ? void 0 : _a2.treeNodeMap.get(key);
		}
		return {
			tree,
			flattenTree,
			isNotEmpty,
			getKey,
			getChildren,
			toggleExpand,
			toggleCheckbox,
			isExpanded,
			isChecked,
			isIndeterminate,
			isDisabled,
			isCurrent,
			isForceHiddenExpandIcon,
			handleNodeClick,
			handleNodeCheck,
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
			expandedKeySet: expandedKeyArray
		};
	}

	function useCheck(props, tree) {
		const checkedKeys = ref(/* @__PURE__ */ new Set());
		const indeterminateKeys = ref(/* @__PURE__ */ new Set());
		const { emit } = getCurrentInstance();
		watch(
			[() => tree.value, () => props.defaultCheckedKeys],
			() => {
				return nextTick(() => {
					_setCheckedKeys(props.defaultCheckedKeys);
				});
			},
			{
				immediate: true
			}
		);
		const updateCheckedKeys = () => {
			if (!tree.value || !props.showCheckbox || props.checkStrictly) {
				return;
			}
			const { levelTreeNodeMap, maxLevel } = tree.value;
			const checkedKeySet = checkedKeys.value;
			const indeterminateKeySet = /* @__PURE__ */ new Set();
			for (let level = maxLevel - 1; level >= 1; --level) {
				const nodes = levelTreeNodeMap.get(level);
				if (!nodes) continue;
				nodes.forEach(node => {
					const children = node.children;
					if (children) {
						let allChecked = true;
						let hasChecked = false;
						for (const childNode of children) {
							const key = childNode.key;
							if (checkedKeySet.has(key)) {
								hasChecked = true;
							} else if (indeterminateKeySet.has(key)) {
								allChecked = false;
								hasChecked = true;
								break;
							} else {
								allChecked = false;
							}
						}
						if (allChecked) {
							checkedKeySet.add(node.key);
						} else if (hasChecked) {
							indeterminateKeySet.add(node.key);
							checkedKeySet.delete(node.key);
						} else {
							checkedKeySet.delete(node.key);
							indeterminateKeySet.delete(node.key);
						}
					}
				});
			}
			indeterminateKeys.value = indeterminateKeySet;
		};
		const isChecked = node => checkedKeys.value.has(node.key);
		const isIndeterminate = node => indeterminateKeys.value.has(node.key);
		const toggleCheckbox = (node, isChecked2, nodeClick = true) => {
			const checkedKeySet = checkedKeys.value;
			const toggle = (node2, checked) => {
				checkedKeySet[checked ? SetOperationEnum.ADD : SetOperationEnum.DELETE](node2.key);
				const children = node2.children;
				if (!props.checkStrictly && children) {
					children.forEach(childNode => {
						if (!childNode.disabled) {
							toggle(childNode, checked);
						}
					});
				}
			};
			toggle(node, isChecked2);
			updateCheckedKeys();
			if (nodeClick) {
				afterNodeCheck(node, isChecked2);
			}
		};
		const afterNodeCheck = (node, checked) => {
			const { checkedNodes, checkedKeys: checkedKeys2 } = getChecked();
			const { halfCheckedNodes, halfCheckedKeys } = getHalfChecked();
			emit(NODE_CHECK, node.data, {
				checkedKeys: checkedKeys2,
				checkedNodes,
				halfCheckedKeys,
				halfCheckedNodes
			});
			emit(NODE_CHECK_CHANGE, node.data, checked);
		};
		function getCheckedKeys(leafOnly = false) {
			return getChecked(leafOnly).checkedKeys;
		}
		function getCheckedNodes(leafOnly = false) {
			return getChecked(leafOnly).checkedNodes;
		}
		function getHalfCheckedKeys() {
			return getHalfChecked().halfCheckedKeys;
		}
		function getHalfCheckedNodes() {
			return getHalfChecked().halfCheckedNodes;
		}
		function getChecked(leafOnly = false) {
			const checkedNodes = [];
			const keys2 = [];
			if ((tree == null ? void 0 : tree.value) && props.showCheckbox) {
				const { treeNodeMap } = tree.value;
				checkedKeys.value.forEach(key => {
					const node = treeNodeMap.get(key);
					if (node && (!leafOnly || (leafOnly && node.isLeaf))) {
						keys2.push(key);
						checkedNodes.push(node.data);
					}
				});
			}
			return {
				checkedKeys: keys2,
				checkedNodes
			};
		}
		function getHalfChecked() {
			const halfCheckedNodes = [];
			const halfCheckedKeys = [];
			if ((tree == null ? void 0 : tree.value) && props.showCheckbox) {
				const { treeNodeMap } = tree.value;
				indeterminateKeys.value.forEach(key => {
					const node = treeNodeMap.get(key);
					if (node) {
						halfCheckedKeys.push(key);
						halfCheckedNodes.push(node.data);
					}
				});
			}
			return {
				halfCheckedNodes,
				halfCheckedKeys
			};
		}
		function setCheckedKeys(keys2) {
			checkedKeys.value.clear();
			indeterminateKeys.value.clear();
			_setCheckedKeys(keys2);
		}
		function setChecked(key, isChecked2) {
			if ((tree == null ? void 0 : tree.value) && props.showCheckbox) {
				const node = tree.value.treeNodeMap.get(key);
				if (node) {
					toggleCheckbox(node, isChecked2, false);
				}
			}
		}
		function _setCheckedKeys(keys2) {
			if (tree == null ? void 0 : tree.value) {
				const { treeNodeMap } = tree.value;
				if (props.showCheckbox && treeNodeMap && keys2) {
					for (const key of keys2) {
						const node = treeNodeMap.get(key);
						if (node && !isChecked(node)) {
							toggleCheckbox(node, true, false);
						}
					}
				}
			}
		}
		return {
			updateCheckedKeys,
			toggleCheckbox,
			isChecked,
			isIndeterminate,
			getCheckedKeys,
			getCheckedNodes,
			getHalfCheckedKeys,
			getHalfCheckedNodes,
			setChecked,
			setCheckedKeys
		};
	}

	function useFilter(props, tree) {
		const hiddenNodeKeySet = ref(/* @__PURE__ */ new Set([]));
		const hiddenExpandIconKeySet = ref(/* @__PURE__ */ new Set([]));
		const filterable = computed(() => {
			return _.isFunction(props.filterMethod);
		});
		function doFilter(query) {
			var _a2;
			if (!filterable.value) {
				return;
			}
			const expandKeySet = /* @__PURE__ */ new Set();
			const hiddenExpandIconKeys = hiddenExpandIconKeySet.value;
			const hiddenKeys = hiddenNodeKeySet.value;
			const family = [];
			const nodes = ((_a2 = tree.value) == null ? void 0 : _a2.treeNodes) || [];
			const filter = props.filterMethod;
			hiddenKeys.clear();
			function traverse(nodes2) {
				nodes2.forEach(node => {
					family.push(node);
					if (filter == null ? void 0 : filter(query, node.data)) {
						family.forEach(member => {
							expandKeySet.add(member.key);
						});
					} else if (node.isLeaf) {
						hiddenKeys.add(node.key);
					}
					const children = node.children;
					if (children) {
						traverse(children);
					}
					if (!node.isLeaf) {
						if (!expandKeySet.has(node.key)) {
							hiddenKeys.add(node.key);
						} else if (children) {
							let allHidden = true;
							for (const childNode of children) {
								if (!hiddenKeys.has(childNode.key)) {
									allHidden = false;
									break;
								}
							}
							if (allHidden) {
								hiddenExpandIconKeys.add(node.key);
							} else {
								hiddenExpandIconKeys.delete(node.key);
							}
						}
					}
					family.pop();
				});
			}
			traverse(nodes);
			return expandKeySet;
		}
		function isForceHiddenExpandIcon(node) {
			return hiddenExpandIconKeySet.value.has(node.key);
		}
		return {
			hiddenExpandIconKeySet,
			hiddenNodeKeySet,
			doFilter,
			isForceHiddenExpandIcon
		};
	}

	return {
		useTree,
		useCheck,
		useFilter,
		itemSize: {
			type: Number,
			default: 26
		},
		iconPropType: [String, Object, Function],
		NODE_CONTEXTMENU
	};
}
</script>
