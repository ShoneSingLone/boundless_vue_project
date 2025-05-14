<template>
	<div :class="cptCascaderPanelClass" @keydown="handleKeyDown">
		<xCascaderMenu
			ref="menu"
			v-for="(menu, index) in menus"
			:index="index"
			:key="index"
			:nodes="menu"></xCascaderMenu>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [{ KeyCode }] = await _.$importVue(["/common/utils/utils.vue"]);

	let uid = 0;

	class Node {
		data;
		config;
		parent;
		level;
		uid;
		value;
		label;
		pathNodes;
		path;
		pathLabels;
		loading;
		loaded;
		hasChildren;
		children;
		checked;
		indeterminate;

		constructor(data, config, parentNode = null) {
			this.data = data;
			this.config = config;
			this.parent = parentNode;
			this.level = !this.parent ? 1 : this.parent.level + 1;
			this.uid = uid++;

			this.initState();
			this.initChildren();
		}

		initState() {
			const { value: valueKey, label: labelKey } = this.config;

			this.value = this.data[valueKey];
			this.label = this.data[labelKey];
			this.pathNodes = this.calculatePathNodes();
			this.path = this.pathNodes.map(node => node.value);
			this.pathLabels = this.pathNodes.map(node => node.label);

			// lazy load
			this.loading = false;
			this.loaded = false;
		}

		initChildren() {
			const { config } = this;
			const childrenKey = config.children;
			const childrenData = this.data[childrenKey];
			this.hasChildren = Array.isArray(childrenData);
			this.children = (childrenData || []).map(child => new Node(child, config, this));
		}

		get isDisabled() {
			const { data, parent, config } = this;
			const disabledKey = config.disabled;
			const { checkStrictly } = config;
			return data[disabledKey] || (!checkStrictly && parent && parent.isDisabled);
		}

		get isLeaf() {
			const { data, loaded, hasChildren, children } = this;
			const { lazy, leaf: leafKey } = this.config;
			if (lazy) {
				const isLeaf = _.$isDef(data[leafKey])
					? data[leafKey]
					: loaded
						? !children.length
						: false;
				this.hasChildren = !isLeaf;
				return isLeaf;
			}
			return !hasChildren;
		}

		calculatePathNodes() {
			const nodes = [this];
			let parent = this.parent;

			while (parent) {
				nodes.unshift(parent);
				parent = parent.parent;
			}

			return nodes;
		}

		getPath() {
			return this.path;
		}

		getValue() {
			return this.value;
		}

		getValueByOption() {
			return this.config.emitPath ? this.getPath() : this.getValue();
		}

		getText(allLevels, separator) {
			return allLevels ? this.pathLabels.join(separator) : this.label;
		}

		isSameNode(checkedValue) {
			const value = this.getValueByOption();
			return this.config.multiple && Array.isArray(checkedValue)
				? checkedValue.some(val => _.isEqual(val, value))
				: _.isEqual(checkedValue, value);
		}

		broadcast(event, ...args) {
			const handlerName = `onParent${_.capitalize(event)}`;

			this.children.forEach(child => {
				if (child) {
					// bottom up
					child.broadcast(event, ...args);
					child[handlerName] && child[handlerName](...args);
				}
			});
		}

		emit(event, ...args) {
			const { parent } = this;
			const handlerName = `onChild${_.capitalize(event)}`;
			if (parent) {
				parent[handlerName] && parent[handlerName](...args);
				parent.emit(event, ...args);
			}
		}

		onParentCheck(checked) {
			if (!this.isDisabled) {
				this.setCheckState(checked);
			}
		}

		onChildCheck() {
			const { children } = this;
			const validChildren = children.filter(child => !child.isDisabled);
			const checked = validChildren.length
				? validChildren.every(child => child.checked)
				: false;

			this.setCheckState(checked);
		}

		setCheckState(checked) {
			const totalNum = this.children.length;
			const checkedNum = this.children.reduce((c, p) => {
				const num = p.checked ? 1 : p.indeterminate ? 0.5 : 0;
				return c + num;
			}, 0);

			this.checked = checked;
			this.indeterminate = checkedNum !== totalNum && checkedNum > 0;
		}

		syncCheckState(checkedValue) {
			const checked = this.isSameNode(checkedValue);
			this.doCheck(checked);
		}

		doCheck(checked) {
			if (this.checked !== checked) {
				if (this.config.checkStrictly) {
					this.checked = checked;
				} else {
					// bottom up to unify the calculation of the indeterminate state
					this.broadcast("check", checked);
					this.setCheckState(checked);
					this.emit("check");
				}
			}
		}
	}

	class Store {
		nodes;
		config;
		flattedNodes;
		leafNodes;
		constructor(data, config) {
			this.config = config;
			this.initNodes(data);
		}

		initNodes(data) {
			data = _.$coerceTruthyValueToArray(data);
			this.nodes = data.map(nodeData => new Node(nodeData, this.config));
			this.flattedNodes = this.getFlattedNodes(false, false);
			this.leafNodes = this.getFlattedNodes(true, false);
		}

		appendNode(nodeData, parentNode) {
			const node = new Node(nodeData, this.config, parentNode);
			const children = parentNode ? parentNode.children : this.nodes;

			children.push(node);
		}

		appendNodes(nodeDataList, parentNode) {
			nodeDataList = _.$coerceTruthyValueToArray(nodeDataList);
			nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode));
		}

		getNodes() {
			return this.nodes;
		}

		getFlattedNodes(leafOnly, cached = true) {
			const cachedNodes = leafOnly ? this.leafNodes : this.flattedNodes;
			return cached ? cachedNodes : _.$flatNodes(this.nodes, leafOnly);
		}

		getNodeByValue(value) {
			const nodes = this.getFlattedNodes(false, !this.config.lazy).filter(
				node => _.$valueEquals(node.path, value) || node.value === value
			);
			return nodes && nodes.length ? nodes[0] : null;
		}
	}

	const DefaultProps = {
		expandTrigger: "click", // or hover
		multiple: false,
		checkStrictly: false, // whether all nodes can be selected
		emitPath: true, // wether to emit an array of all levels value in which node is located
		lazy: false,
		lazyLoad: _.$doNoting,
		value: "value",
		label: "label",
		children: "children",
		leaf: "leaf",
		disabled: "disabled",
		hoverThreshold: 500
	};

	const isLeaf = el => !el.getAttribute("aria-owns");

	const getSibling = (el, distance) => {
		const { parentNode } = el;
		if (parentNode) {
			const siblings = parentNode.querySelectorAll('.el-cascader-node[tabindex="-1"]');
			const index = Array.prototype.indexOf.call(siblings, el);
			return siblings[index + distance] || null;
		}
		return null;
	};

	const getMenuIndex = el => {
		if (!el) return;
		const pieces = el.id.split("-");
		return Number(pieces[pieces.length - 2]);
	};

	const focusNode = el => {
		if (!el) return;
		el.focus();
		!isLeaf(el) && el.click();
	};

	const checkNode = el => {
		if (!el) return;

		const input = el.querySelector("input");
		if (input) {
			input.click();
		} else if (isLeaf(el)) {
			el.click();
		}
	};

	return defineComponent({
		name: "ElCascaderPanel",
		components: {
			xCascaderMenu: () =>
				_.$importVue(
					"/common/ui-x/components/form/xCascader/xCascaderPanel/xCascaderMenu.vue"
				)
		},
		props: {
			value: {},
			options: Array,
			props: Object,
			border: {
				type: Boolean,
				default: true
			},
			renderLabel: Function
		},
		provide() {
			return {
				panel: this
			};
		},
		data() {
			return {
				checkedValue: null,
				checkedNodePaths: [],
				store: [],
				menus: [],
				activePath: [],
				loadCount: 0
			};
		},
		computed: {
			cptCascaderPanelClass() {
				return {
					"el-cascader-panel": true,
					"is-bordered": !!this.border
				};
			},
			config() {
				return _.merge({}, DefaultProps, this.props || {});
			},
			multiple() {
				return this.config.multiple;
			},
			checkStrictly() {
				return this.config.checkStrictly;
			},
			leafOnly() {
				return !this.checkStrictly;
			},
			isHoverMenu() {
				return this.config.expandTrigger === "hover";
			},
			renderLabelFn() {
				return this.renderLabel || this.$scopedSlots.default;
			}
		},

		watch: {
			value() {
				this.syncCheckedValue();
				this.checkStrictly && this.calculateCheckedNodePaths();
			},
			options: {
				handler: function () {
					this.initStore();
				},
				immediate: true,
				deep: true
			},
			checkedValue: {
				immediate: true,
				handler(val, oldVal) {
					if (!_.isEqual(val, this.value)) {
						this.checkStrictly && this.calculateCheckedNodePaths();
						this.$emit("input", val);
						this.$emit("change", val);
					}
				}
			}
		},

		mounted() {
			if (!this.isEmptyValue(this.value)) {
				this.syncCheckedValue();
			}
		},

		methods: {
			initStore() {
				const { config, options } = this;
				if (config.lazy && _.isEmpty(options)) {
					this.lazyLoad();
				} else {
					this.store = new Store(options, config);
					this.menus = [this.store.getNodes()];
					this.syncMenuState();
				}
			},
			syncCheckedValue() {
				const { value, checkedValue } = this;
				if (!_.isEqual(value, checkedValue)) {
					this.activePath = [];
					this.checkedValue = value;
					this.syncMenuState();
				}
			},
			syncMenuState() {
				const { multiple, checkStrictly } = this;
				this.syncActivePath();
				multiple && this.syncMultiCheckState();
				checkStrictly && this.calculateCheckedNodePaths();
				this.$nextTick(this.scrollIntoView);
			},
			syncMultiCheckState() {
				const nodes = this.getFlattedNodes(this.leafOnly);

				nodes.forEach(node => {
					node.syncCheckState(this.checkedValue);
				});
			},
			isEmptyValue(val) {
				const { multiple, config } = this;
				const { emitPath } = config;
				if (multiple || emitPath) {
					return _.isEmpty(val);
				}
				return false;
			},
			syncActivePath() {
				const { store, multiple, activePath, checkedValue } = this;

				if (!_.isEmpty(activePath)) {
					const nodes = activePath.map(node => this.getNodeByValue(node.getValue()));
					this.expandNodes(nodes);
				} else if (!this.isEmptyValue(checkedValue)) {
					const value = multiple ? checkedValue[0] : checkedValue;
					const checkedNode = this.getNodeByValue(value) || {};
					const nodes = (checkedNode.pathNodes || []).slice(0, -1);
					this.expandNodes(nodes);
				} else {
					this.activePath = [];
					this.menus = [store.getNodes()];
				}
			},
			expandNodes(nodes) {
				nodes.forEach(node => this.handleExpand(node, true /* silent */));
			},
			calculateCheckedNodePaths() {
				const { checkedValue, multiple } = this;
				const checkedValues = multiple
					? _.$coerceTruthyValueToArray(checkedValue)
					: [checkedValue];
				this.checkedNodePaths = checkedValues.map(v => {
					const checkedNode = this.getNodeByValue(v);
					return checkedNode ? checkedNode.pathNodes : [];
				});
			},
			handleKeyDown(e) {
				const { target, keyCode } = e;

				switch (keyCode) {
					case KeyCode.up:
						const prev = getSibling(target, -1);
						focusNode(prev);
						break;
					case KeyCode.down:
						const next = getSibling(target, 1);
						focusNode(next);
						break;
					case KeyCode.left:
						const preMenu = this.$refs.menu[getMenuIndex(target) - 1];
						if (preMenu) {
							const expandedNode = preMenu.$el.querySelector(
								'.el-cascader-node[aria-expanded="true"]'
							);
							focusNode(expandedNode);
						}
						break;
					case KeyCode.right:
						const nextMenu = this.$refs.menu[getMenuIndex(target) + 1];
						if (nextMenu) {
							const firstNode = nextMenu.$el.querySelector(
								'.el-cascader-node[tabindex="-1"]'
							);
							focusNode(firstNode);
						}
						break;
					case KeyCode.enter:
						checkNode(target);
						break;
					case KeyCode.esc:
					case KeyCode.tab:
						this.$emit("close");
						break;
					default:
						return;
				}
			},
			handleExpand(node, silent) {
				const { activePath } = this;
				const { level } = node;
				const path = activePath.slice(0, level - 1);
				const menus = this.menus.slice(0, level);

				if (!node.isLeaf) {
					path.push(node);
					menus.push(node.children);
				}

				this.activePath = path;
				this.menus = menus;

				if (!silent) {
					const pathValues = path.map(node => node.getValue());
					const activePathValues = activePath.map(node => node.getValue());
					if (!_.$valueEquals(pathValues, activePathValues)) {
						this.$emit("active-item-change", pathValues); // Deprecated
						this.$emit("expand-change", pathValues);
					}
				}
			},
			handleCheckChange(value) {
				this.checkedValue = value;
			},
			lazyLoad(node, onFullfiled) {
				const { config } = this;
				if (!node) {
					node = node || { root: true, level: 0 };
					this.store = new Store([], config);
					this.menus = [this.store.getNodes()];
				}
				node.loading = true;
				const resolve = dataList => {
					const parent = node.root ? null : node;
					dataList && dataList.length && this.store.appendNodes(dataList, parent);
					node.loading = false;
					node.loaded = true;

					// dispose default value on lazy load mode
					if (Array.isArray(this.checkedValue)) {
						const nodeValue = this.checkedValue[this.loadCount++];
						const valueKey = this.config.value;
						const leafKey = this.config.leaf;

						if (
							Array.isArray(dataList) &&
							dataList.filter(item => item[valueKey] === nodeValue).length > 0
						) {
							const checkedNode = this.store.getNodeByValue(nodeValue);

							if (!checkedNode.data[leafKey]) {
								this.lazyLoad(checkedNode, () => {
									this.handleExpand(checkedNode);
								});
							}

							if (this.loadCount === this.checkedValue.length) {
								this.$parent.computePresentText();
							}
						}
					}

					onFullfiled && onFullfiled(dataList);
				};
				config.lazyLoad(node, resolve);
			},

			/**
			 * public methods
			 */
			calculateMultiCheckedValue() {
				this.checkedValue = this.getCheckedNodes(this.leafOnly).map(node =>
					node.getValueByOption()
				);
			},
			async scrollIntoView() {
				_.each(this.$refs.menu, menu => {
					const menuElement = menu.$el;
					if (menuElement) {
						const container = menuElement.querySelector(".el-scrollbar__wrap");
						const activeNode =
							menuElement.querySelector(".el-cascader-node.is-active") ||
							menuElement.querySelector(".el-cascader-node.in-active-path");

						if (container && activeNode) {
							_.$scrollIntoView(container, activeNode);
						}
					}
				});
			},
			getNodeByValue(val) {
				return this.store.getNodeByValue(val);
			},
			getFlattedNodes(leafOnly) {
				const cached = !this.config.lazy;
				return this.store.getFlattedNodes(leafOnly, cached);
			},
			getCheckedNodes(leafOnly) {
				const { checkedValue, multiple } = this;
				if (multiple) {
					const nodes = this.getFlattedNodes(leafOnly);
					return nodes.filter(node => node.checked);
				} else {
					return this.isEmptyValue(checkedValue)
						? []
						: [this.getNodeByValue(checkedValue)];
				}
			},
			clearCheckedNodes() {
				const { config, leafOnly } = this;
				const { multiple, emitPath } = config;
				if (multiple) {
					this.getCheckedNodes(leafOnly)
						.filter(node => !node.isDisabled)
						.forEach(node => node.doCheck(false));
					this.calculateMultiCheckedValue();
				} else {
					this.checkedValue = emitPath ? [] : null;
				}
			}
		}
	});
}
</script>
