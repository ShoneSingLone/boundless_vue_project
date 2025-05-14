<template>
	<div
		ref="reference"
		:class="cptCascaderClass"
		v-clickoutside="() => toggleDropDownVisible(false)"
		@mouseenter="inputHover = true"
		@mouseleave="inputHover = false"
		@click="() => toggleDropDownVisible(readonly ? undefined : true)"
		@keydown="handleKeyDown">
		<xInput
			ref="input"
			v-model="multiple ? presentText : inputValue"
			:size="realSize"
			:placeholder="placeholder"
			:readonly="readonly"
			:disabled="isDisabled"
			:validate-event="false"
			:class="{ 'is-focus': dropDownVisible }"
			@focus="handleFocus"
			@blur="handleBlur"
			@input="handleInput">
			<template slot="suffix">
				<i
					v-if="clearBtnVisible"
					key="clear"
					class="el-input__icon el-icon-circle-close"
					@click.stop="handleClear"></i>
				<i
					v-else
					key="arrow-down"
					:class="[
						'el-input__icon',
						'el-icon-arrow-down',
						dropDownVisible && 'is-reverse'
					]"
					@click.stop="toggleDropDownVisible()"></i>
			</template>
		</xInput>

		<div v-if="multiple" class="el-cascader__tags">
			<xTag
				v-for="tag in presentTags"
				:key="tag.key"
				type="info"
				:size="tagSize"
				:hit="tag.hitState"
				:closable="tag.closable"
				disable-transitions
				@close="deleteTag(tag)">
				<span>{{ tag.text }}</span>
			</xTag>
			<input
				v-if="filterable && !isDisabled"
				v-model.trim="inputValue"
				type="text"
				class="el-cascader__search-input"
				:placeholder="presentTags.length ? '' : placeholder"
				@input="e => handleInput(inputValue, e)"
				@click.stop="toggleDropDownVisible(true)"
				@keydown.delete="handleDelete" />
		</div>

		<transition name="el-zoom-in-top" @after-leave="handleDropdownLeave">
			<div
				v-show="dropDownVisible"
				ref="popper"
				:class="['el-popper', 'el-cascader__dropdown', popperClass]">
				<xCascaderPanel
					ref="panel"
					v-show="!filtering"
					v-model="checkedValue"
					:options="options"
					:props="config"
					:border="false"
					:render-label="$scopedSlots.default"
					@expand-change="handleExpandChange"
					@close="toggleDropDownVisible(false)">
				</xCascaderPanel>
				<xScrollbar
					ref="suggestionPanel"
					v-if="filterable"
					v-show="filtering"
					tag="ul"
					class="el-cascader__suggestion-panel"
					view-class="el-cascader__suggestion-list"
					@keydown.native="handleSuggestionKeyDown">
					<template v-if="suggestions.length">
						<li
							v-for="(item, index) in suggestions"
							:key="item.uid"
							:class="['el-cascader__suggestion-item', item.checked && 'is-checked']"
							:tabindex="-1"
							@click="handleSuggestionClick(index)">
							<span>{{ item.text }}</span>
							<i v-if="item.checked" class="el-icon-check"></i>
						</li>
					</template>
					<slot v-else name="empty">
						<li class="el-cascader__empty-text">{{ i18n("el.cascader.noMatch") }}</li>
					</slot>
				</xScrollbar>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [Popper, { addResizeListener, removeResizeListener, KeyCode }, Clickoutside] =
		await _.$importVue([
			"/common/libs/VuePopper/VuePopper.vue",
			"/common/utils/utils.vue",
			"/common/ui-x/directive/clickoutside.vue"
		]);

	const InputSizeMap = {
		medium: 36,
		small: 32,
		mini: 28
	};

	const PopperMixin = {
		props: {
			placement: {
				type: String,
				default: "bottom-start"
			},
			appendToBody: Popper.props.appendToBody,
			visibleArrow: {
				type: Boolean,
				default: true
			},
			arrowOffset: Popper.props.arrowOffset,
			offset: Popper.props.offset,
			boundariesPadding: Popper.props.boundariesPadding,
			popperOptions: Popper.props.popperOptions,
			transformOrigin: Popper.props.transformOrigin
		},
		methods: Popper.methods,
		data: Popper.data,
		beforeDestroy: Popper.beforeDestroy
	};

	return defineComponent({
		name: "ElCascader",
		directives: { Clickoutside },
		mixins: [PopperMixin],
		model: {
			prop: "value",
			event: "change"
		},
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		props: {
			value: {},
			options: Array,
			props: Object,
			size: String,
			placeholder: {
				type: String,
				default: () => i18n("el.cascader.placeholder")
			},
			disabled: Boolean,
			clearable: Boolean,
			filterable: Boolean,
			filterMethod: Function,
			separator: {
				type: String,
				default: " / "
			},
			showAllLevels: {
				type: Boolean,
				default: true
			},
			collapseTags: Boolean,
			debounce: {
				type: Number,
				default: 300
			},
			beforeFilter: {
				type: Function,
				default: () => () => {}
			},
			popperClass: String
		},

		data() {
			return {
				dropDownVisible: false,
				checkedValue: this.value,
				inputHover: false,
				inputValue: null,
				presentText: null,
				presentTags: [],
				checkedNodes: [],
				filtering: false,
				suggestions: [],
				inputInitialHeight: 0,
				pressDeleteCount: 0
			};
		},

		computed: {
			cptCascaderClass() {
				return {
					"xCascader el-cascader": true,
					"is-disabled": this.isDisabled,
					[`el-cascader--${this.realSize}`]: !!this.realSize
				};
			},
			realSize() {
				const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
				return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
			},
			tagSize() {
				return ["small", "mini"].indexOf(this.realSize) > -1 ? "mini" : "small";
			},
			isDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			},
			config() {
				const config = this.props || {};
				const { $attrs } = this;
				_.each($attrs, (value, prop) => {
					config[_.camelCase(prop)] = value;
				});
				return config;
			},
			multiple() {
				return this.config.multiple;
			},
			leafOnly() {
				return !this.config.checkStrictly;
			},
			readonly() {
				return !this.filterable || this.multiple;
			},
			clearBtnVisible() {
				if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
					return false;
				}

				return this.multiple
					? !!this.checkedNodes.filter(node => !node.isDisabled).length
					: !!this.presentText;
			}
		},

		watch: {
			disabled() {
				this.computePresentContent();
			},
			value(val) {
				if (!_.isEqual(val, this.checkedValue)) {
					this.checkedValue = val;
					this.computePresentContent();
				}
			},
			checkedValue(val) {
				const { value, dropDownVisible } = this;
				const { checkStrictly, multiple } = this.config;

				if (!_.isEqual(val, value) || _.isUndefined(value)) {
					this.computePresentContent();
					// hide dropdown when single mode
					if (!multiple && !checkStrictly && dropDownVisible) {
						this.toggleDropDownVisible(false);
					}

					this.$emit("input", val);
					this.$emit("change", val);
					this.dispatch("ElFormItem", "el.form.change", [val]);
				}
			},
			options: {
				handler: function () {
					this.$nextTick(this.computePresentContent);
				},
				deep: true
			},
			presentText(val) {
				this.inputValue = val;
			},
			presentTags(val, oldVal) {
				if (this.multiple && (val.length || oldVal.length)) {
					this.$nextTick(this.updateStyle);
				}
			},
			filtering(val) {
				this.$nextTick(this.updatePopper);
			}
		},

		async mounted() {
			await _.$ensure(() => _.$val(this, "$refs.panel"));
			const { input } = this.$refs;
			if (input && input.$el) {
				this.inputInitialHeight =
					input.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
			}

			if (!(await this.isEmptyValue(this.value))) {
				this.computePresentContent();
			}

			this.filterHandler = _.debounce(() => {
				const { inputValue } = this;

				if (!inputValue) {
					this.filtering = false;
					return;
				}

				const before = this.beforeFilter(inputValue);
				if (before && before.then) {
					before.then(this.getSuggestions);
				} else if (before !== false) {
					this.getSuggestions();
				} else {
					this.filtering = false;
				}
			}, this.debounce);

			addResizeListener(this.$el, this.updateStyle);
		},

		beforeDestroy() {
			removeResizeListener(this.$el, this.updateStyle);
		},

		methods: {
			getMigratingConfig() {
				return {
					props: {
						"expand-trigger":
							"expand-trigger is removed, use `props.expandTrigger` instead.",
						"change-on-select":
							"change-on-select is removed, use `props.checkStrictly` instead.",
						"hover-threshold":
							"hover-threshold is removed, use `props.hoverThreshold` instead"
					},
					events: {
						"active-item-change": "active-item-change is renamed to expand-change"
					}
				};
			},
			toggleDropDownVisible(visible) {
				if (this.isDisabled) return;

				const { dropDownVisible } = this;
				const { input } = this.$refs;
				visible = _.$isDef(visible) ? visible : !dropDownVisible;
				if (visible !== dropDownVisible) {
					this.dropDownVisible = visible;
					if (visible) {
						this.$nextTick(() => {
							this.updatePopper();
							this.$refs.panel.scrollIntoView();
						});
					}
					input.$refs.input.setAttribute("aria-expanded", visible);
					this.$emit("visible-change", visible);
				}
			},
			handleDropdownLeave() {
				this.filtering = false;
				this.inputValue = this.presentText;
				this.doDestroy();
			},
			handleKeyDown(event) {
				switch (event.keyCode) {
					case KeyCode.enter:
						this.toggleDropDownVisible();
						break;
					case KeyCode.down:
						this.toggleDropDownVisible(true);
						this.focusFirstNode();
						event.preventDefault();
						break;
					case KeyCode.esc:
					case KeyCode.tab:
						this.toggleDropDownVisible(false);
						break;
				}
			},
			handleFocus(e) {
				this.$emit("focus", e);
			},
			handleBlur(e) {
				this.$emit("blur", e);
			},
			handleInput(val, event) {
				!this.dropDownVisible && this.toggleDropDownVisible(true);

				if (event && event.isComposing) return;
				if (val) {
					this.filterHandler();
				} else {
					this.filtering = false;
				}
			},
			handleClear() {
				this.presentText = "";
				this.$refs.panel.clearCheckedNodes();
			},
			handleExpandChange(value) {
				this.$nextTick(this.updatePopper.bind(this));
				this.$emit("expand-change", value);
				this.$emit("active-item-change", value); // Deprecated
			},
			focusFirstNode() {
				this.$nextTick(() => {
					const { filtering } = this;
					const { popper, suggestionPanel } = this.$refs;
					let firstNode = null;

					if (filtering && suggestionPanel) {
						firstNode = suggestionPanel.$el.querySelector(
							".el-cascader__suggestion-item"
						);
					} else {
						const firstMenu = popper.querySelector(".el-cascader-menu");
						firstNode = firstMenu.querySelector('.el-cascader-node[tabindex="-1"]');
					}

					if (firstNode) {
						firstNode.focus();
						!filtering && firstNode.click();
					}
				});
			},
			computePresentContent() {
				// nextTick is required, because checked nodes may not change right now
				this.$nextTick(() => {
					if (this.config.multiple) {
						this.computePresentTags();
						this.presentText = this.presentTags.length ? " " : null;
					} else {
						this.computePresentText();
					}
				});
			},
			async isEmptyValue(val) {
				await _.$ensure(() => _.$val(this, "$refs.panel"));
				const { multiple } = this;
				const { emitPath } = this.$refs.panel.config;
				if (multiple || emitPath) {
					return _.isEmpty(val);
				}
				return false;
			},
			async computePresentText() {
				const { checkedValue, config } = this;
				if (!(await this.isEmptyValue(checkedValue))) {
					const node = this.$refs.panel.getNodeByValue(checkedValue);
					if (node && (config.checkStrictly || node.isLeaf)) {
						this.presentText = node.getText(this.showAllLevels, this.separator);
						return;
					}
				}
				this.presentText = null;
			},
			computePresentTags() {
				const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this;
				const checkedNodes = this.getCheckedNodes(leafOnly);
				const tags = [];

				const genTag = node => ({
					node,
					key: node.uid,
					text: node.getText(showAllLevels, separator),
					hitState: false,
					closable: !isDisabled && !node.isDisabled
				});

				if (checkedNodes.length) {
					const [first, ...rest] = checkedNodes;
					const restCount = rest.length;
					tags.push(genTag(first));

					if (restCount) {
						if (collapseTags) {
							tags.push({
								key: -1,
								text: `+ ${restCount}`,
								closable: false
							});
						} else {
							rest.forEach(node => tags.push(genTag(node)));
						}
					}
				}

				this.checkedNodes = checkedNodes;
				this.presentTags = tags;
			},
			getSuggestions() {
				let { filterMethod } = this;

				if (!_.$confirm_importantisFunction(filterMethod)) {
					filterMethod = (node, keyword) => node.text.includes(keyword);
				}

				const suggestions = this.$refs.panel.getFlattedNodes(this.leafOnly).filter(node => {
					if (node.isDisabled) return false;
					node.text = node.getText(this.showAllLevels, this.separator) || "";
					return filterMethod(node, this.inputValue);
				});

				if (this.multiple) {
					this.presentTags.forEach(tag => {
						tag.hitState = false;
					});
				} else {
					suggestions.forEach(node => {
						node.checked = _.isEqual(this.checkedValue, node.getValueByOption());
					});
				}

				this.filtering = true;
				this.suggestions = suggestions;
				this.$nextTick(this.updatePopper);
			},
			handleSuggestionKeyDown(event) {
				const { keyCode, target } = event;
				switch (keyCode) {
					case KeyCode.enter:
						target.click();
						break;
					case KeyCode.up:
						const prev = target.previousElementSibling;
						prev && prev.focus();
						break;
					case KeyCode.down:
						const next = target.nextElementSibling;
						next && next.focus();
						break;
					case KeyCode.esc:
					case KeyCode.tab:
						this.toggleDropDownVisible(false);
						break;
				}
			},
			handleDelete() {
				const { inputValue, pressDeleteCount, presentTags } = this;
				const lastIndex = presentTags.length - 1;
				const lastTag = presentTags[lastIndex];
				this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1;

				if (!lastTag) return;

				if (this.pressDeleteCount) {
					if (lastTag.hitState) {
						this.deleteTag(lastTag);
					} else {
						lastTag.hitState = true;
					}
				}
			},
			handleSuggestionClick(index) {
				const { multiple } = this;
				const targetNode = this.suggestions[index];

				if (multiple) {
					const { checked } = targetNode;
					targetNode.doCheck(!checked);
					this.$refs.panel.calculateMultiCheckedValue();
				} else {
					this.checkedValue = targetNode.getValueByOption();
					this.toggleDropDownVisible(false);
				}
			},
			deleteTag(tag) {
				const { checkedValue } = this;
				const current = tag.node.getValueByOption();
				const val = checkedValue.find(n => _.isEqual(n, current));
				this.checkedValue = checkedValue.filter(n => !_.isEqual(n, current));
				this.$emit("remove-tag", val);
			},
			updateStyle() {
				const { $el, inputInitialHeight } = this;
				if (this.$isServer || !$el) return;

				const { suggestionPanel } = this.$refs;
				const inputInner = $el.querySelector(".el-input__inner");

				if (!inputInner) return;

				const tags = $el.querySelector(".el-cascader__tags");
				let suggestionPanelEl = null;

				if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
					const suggestionList = suggestionPanelEl.querySelector(
						".el-cascader__suggestion-list"
					);
					suggestionList.style.minWidth = inputInner.offsetWidth + "px";
				}

				if (tags) {
					const offsetHeight = Math.round(tags.getBoundingClientRect().height);
					const height = Math.max(offsetHeight + 6, inputInitialHeight) + "px";
					inputInner.style.height = height;
					if (this.dropDownVisible) {
						this.updatePopper();
					}
				}
			},

			/**
			 * public methods
			 */
			getCheckedNodes(leafOnly) {
				return this.$refs.panel.getCheckedNodes(leafOnly);
			}
		}
	});
}
</script>
<style lang="less">
.el-cascader-panel {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	border-radius: var(--border-radius);
	font-size: 14px;
}

.el-cascader-panel.is-bordered {
	border: 1px solid #e4e7ed;
	border-radius: var(--border-radius);
}

.el-cascader-menu {
	min-width: 180px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #606266;
	border-right: solid 1px #e4e7ed;
}

.el-cascader-menu:last-child {
	border-right: none;
}

.el-cascader-menu:last-child .el-cascader-node {
	padding-right: 20px;
}

.el-cascader-menu__wrap {
	height: 204px;
}

.el-cascader-menu__list {
	position: relative;
	min-height: 100%;
	margin: 0;
	padding: 6px 0;
	list-style: none;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.el-cascader-menu__hover-zone {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.el-cascader-menu__empty-text {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	text-align: center;
	color: var(--el-text-color-disabled);
}
.el-cascader {
	display: inline-block;
	position: relative;
	font-size: 14px;
	line-height: 40px;
}

.el-cascader:not(.is-disabled):hover .el-input__inner {
	cursor: pointer;
	border-color: var(--el-text-color-disabled);
}

.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
	border-color: var(--el-color-primary);
}

.el-cascader .el-input {
	cursor: pointer;
}

.el-cascader .el-input .el-input__inner {
	text-overflow: ellipsis;
}

.el-cascader .el-input .el-icon-arrow-down {
	-webkit-transition: -webkit-transform 0.3s;
	transition: -webkit-transform 0.3s;
	transition: transform 0.3s;
	transition:
		transform 0.3s,
		-webkit-transform 0.3s;
	font-size: 14px;
}

.el-cascader .el-input .el-icon-arrow-down.is-reverse {
	-webkit-transform: rotateZ(180deg);
	transform: rotateZ(180deg);
}

.el-cascader .el-input .el-icon-circle-close:hover {
	color: var(--el-text-color-secondary);
}

.el-cascader--medium {
	font-size: 14px;
	line-height: 36px;
}

.el-cascader--small {
	font-size: 13px;
	line-height: var(--ui-height);
}

.el-cascader--mini {
	font-size: 12px;
	line-height: 28px;
}

.el-cascader.is-disabled .el-cascader__label {
	z-index: 2;
	color: var(--el-text-color-disabled);
}

.el-cascader__dropdown {
	margin: 5px 0;
	font-size: 14px;
	background: #fff;
	border: 1px solid #e4e7ed;
	border-radius: var(--border-radius);
	-webkit-box-shadow: var(--normal-box-shadow);
	box-shadow: var(--normal-box-shadow);
}

.el-cascader__tags {
	position: absolute;
	left: 0;
	right: 30px;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	line-height: normal;
	text-align: left;
	box-sizing: border-box;
}

.el-cascader__tags .el-tag {
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	max-width: 100%;
	margin: 2px 0 2px 6px;
	text-overflow: ellipsis;
	background: #f0f2f5;
}

.el-cascader__tags .el-tag:not(.is-hit) {
	border-color: transparent;
}

.el-cascader__tags .el-tag > span {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
}

.el-cascader__tags .el-tag .el-icon-close {
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
	background-color: var(--el-text-color-disabled);
	color: #fff;
}

.el-cascader__tags .el-tag .el-icon-close:hover {
	background-color: var(--el-text-color-secondary);
}

.el-cascader__suggestion-panel {
	border-radius: var(--border-radius);
}

.el-cascader__suggestion-list {
	max-height: 204px;
	margin: 0;
	padding: 6px 0;
	font-size: 14px;
	color: #606266;
	text-align: center;
}

.el-cascader__suggestion-item {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 34px;
	padding: 0 15px;
	text-align: left;
	outline: 0;
	cursor: pointer;
}

.el-cascader__suggestion-item:focus,
.el-cascader__suggestion-item:hover {
	background: var(--el-fill-color-light);
}

.el-cascader__suggestion-item.is-checked {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-cascader__suggestion-item > span {
	margin-right: 10px;
}

.el-cascader__empty-text {
	margin: 10px 0;
	color: var(--el-text-color-disabled);
}

.el-cascader__search-input {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	height: 24px;
	min-width: 60px;
	margin: 2px 0 2px 15px;
	padding: 0;
	color: #606266;
	border: none;
	outline: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-cascader__search-input::-webkit-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-cascader__search-input:-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-cascader__search-input::-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-cascader__search-input::placeholder {
	color: var(--el-text-color-disabled);
}

.el-cascader-menu__hover-zone {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.el-cascader-menu__empty-text {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	text-align: center;
	color: var(--el-text-color-disabled);
}

.el-cascader-node {
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 0 30px 0 20px;
	height: 34px;
	line-height: 34px;
	outline: 0;
}

.el-cascader-node.is-selectable.in-active-path {
	color: #606266;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-cascader-node:not(.is-disabled) {
	cursor: pointer;
}

.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
	background: var(--el-fill-color-light);
}

.el-cascader-node.is-disabled {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-cascader-node__prefix {
	position: absolute;
	left: 10px;
}

.el-cascader-node__postfix {
	position: absolute;
	right: 10px;
}

.el-cascader-node__label {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	padding: 0 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.el-cascader-node > .el-radio .el-radio__label {
	padding-left: 0;
}
</style>
