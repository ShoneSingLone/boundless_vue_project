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
	const ON_CHECK = "check";
	const ON_CHECK_CHANGE = "check-change";
	const ON_NODE_CONTEXTMENU = "node-contextmenu";

	function useTree(props, emit, injectRootTree) {
		const expandedKeySet = ref(new Set());
		const currentKey = ref();
		const tree = shallowRef();
		watch(
			() => props.expandedKeys,
			expandedKeys => {
				expandedKeySet.value = new Set(expandedKeys);
			},
			{
				immediate: true
			}
		);
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
		const {
			isIndeterminate,
			isChecked,
			toggleCheckbox,
			getCheckedKeys,
			getCheckedNodes,
			getHalfCheckedKeys,
			getHalfCheckedNodes,
			setChecked,
			setCheckedKeys,
			checkedKeysSet
		} = useCheck(props, tree, injectRootTree);
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
			/* vue2 未处理  Set 响应，用于触发computed 更新*/
			injectRootTree.countExpand;
			const expandedKeys = expandedKeySet.value;
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
					if (expandedKeys.has(node.key)) {
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
						label: "",
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
				expandedKeySet.value = keys2;
				injectRootTree.updateByToggleExpand();
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
			const expandedKeys = expandedKeySet.value;
			if (expandedKeys.has(node.key)) {
				collapseNode(node);
			} else {
				expandNode(node);
			}
			injectRootTree.updateByToggleExpand();
		}
		function setExpandedKeys(keys2) {
			expandedKeySet.value = new Set(keys2);
		}
		function handleNodeClick(node, e) {
			emit(NODE_CLICK, node.data, node, e);

			if (props.showCheckbox) {
				if (props.checkOnClickNode && !node.disabled) {
					toggleCheckbox(node, !isChecked(node), true);
				}
			} else {
				handleCurrentChange(node);
			}

			if (props.expandOnClickNode) {
				toggleExpand(node);
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
			const keySet = expandedKeySet.value;
			if (tree.value && props.accordion) {
				const { treeNodeMap } = tree.value;
				keySet.forEach(key => {
					const treeNode = treeNodeMap.get(key);
					if (node && node.level === _.$val(treeNode, "level")) {
						keySet.delete(key);
					}
				});
			}
			keySet.add(node.key);
			emit(NODE_EXPAND, node.data, node);
		}
		function collapseNode(node) {
			expandedKeySet.value.delete(node.key);
			emit(NODE_COLLAPSE, node.data, node);
		}
		function isExpanded(node) {
			return expandedKeySet.value.has(node.key);
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
			return (_b =
				(_a2 = tree.value) == null ? void 0 : _a2.treeNodeMap.get(currentKey.value)) == null
				? void 0
				: _b.data;
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
			checkedKeysSet,
			filter,
			setData,
			getNode,
			expandNode,
			collapseNode,
			setExpandedKeys,
			expandedKeySet
		};
	}

	function useCheck(props, tree, injectRootTree) {
		const checkedKeysSet = ref(new Set());
		const indeterminateKeys = ref(new Set());
		watch(
			[() => tree.value, () => props.checkedKeys],
			() => {
				return nextTick(() => {
					_setCheckedKeys(props.checkedKeys);
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
			const checkedKeySet = checkedKeysSet.value;
			const indeterminateKeySet = new Set();
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
			injectRootTree.updateByCheckedChange();
		};
		const isChecked = node => checkedKeysSet.value.has(node.key);
		const isIndeterminate = node => indeterminateKeys.value.has(node.key);
		const toggleCheckbox = (node, isChecked2, nodeClick = true) => {
			const checkedKeySet = checkedKeysSet.value;
			const toggle = (node2, checked) => {
				checkedKeySet[checked ? "add" : "delete"](node2.key);
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
			injectRootTree.$emit(ON_CHECK, node.data, {
				checkedKeys: checkedKeys2,
				checkedNodes,
				halfCheckedKeys,
				halfCheckedNodes
			});
			injectRootTree.$emit(ON_CHECK_CHANGE, node.data, checked);
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
			if (_.$val(tree, "value") && props.showCheckbox) {
				const { treeNodeMap } = tree.value;
				checkedKeysSet.value.forEach(key => {
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
			if (_.$val(tree, "value") && props.showCheckbox) {
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
			checkedKeysSet.value.clear();
			indeterminateKeys.value.clear();
			_setCheckedKeys(keys2);
		}
		function setChecked(key, isChecked2) {
			if (_.$val(tree, "value") && props.showCheckbox) {
				const node = tree.value.treeNodeMap.get(key);
				if (node) {
					toggleCheckbox(node, isChecked2, false);
				}
			}
		}
		function _setCheckedKeys(keys2) {
			if (_.$val(tree, "value")) {
				const { treeNodeMap } = tree.value;
				if (props.showCheckbox && treeNodeMap && keys2) {
					try {
						if (_.$isArrayFill(keys2)) {
							for (const key of keys2) {
								const node = treeNodeMap.get(key);
								if (node && !isChecked(node)) {
									toggleCheckbox(node, true, false);
								}
							}
						} else {
							/* 清空 */
							treeNodeMap.forEach(node => {
								if (node && isChecked(node)) {
									toggleCheckbox(node, false, false);
								}
							});
						}
					} catch (error) {
						// console.log(error);
						/* TODO: */
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
			setCheckedKeys,
			checkedKeysSet
		};
	}

	function useFilter(props, tree) {
		const hiddenNodeKeySet = ref(/* @__PURE__ */ new Set([]));
		const hiddenExpandIconKeySet = ref(/* @__PURE__ */ new Set([]));
		const filterable = computed(() => {
			return _.isFunction(props.filterHandler);
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
			const filter = props.filterHandler;
			hiddenKeys.clear();
			function traverse(allNodeTree) {
				_.each(allNodeTree, node => {
					family.push(node);
					if (_.isFunction(filter) && filter(query, node.data)) {
						_.each(family, member => {
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
		ON_NODE_CONTEXTMENU
	};
}
</script>
