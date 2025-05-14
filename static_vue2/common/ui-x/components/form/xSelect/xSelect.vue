<template>
	<div
		class="el-select"
		:class="[selectSize ? 'el-select--' + selectSize : '']"
		@click.stop="toggleMenu"
		v-clickoutside="handleClose">
		<div
			class="el-select__tags"
			v-if="multiple"
			ref="tags"
			:style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
			<span v-if="collapseTags && selected.length">
				<xTag
					:closable="!selectDisabled"
					:size="collapseTagSize"
					:hit="selected[0].hitState"
					type="info"
					@close="deleteTag($event, selected[0])"
					disable-transitions>
					<span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
				</xTag>
				<xTag
					v-if="selected.length > 1"
					:closable="false"
					:size="collapseTagSize"
					type="info"
					disable-transitions>
					<span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
				</xTag>
			</span>
			<transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
				<xTag
					v-for="item in selected"
					:key="getValueKey(item)"
					:closable="!selectDisabled"
					:size="collapseTagSize"
					:hit="item.hitState"
					type="info"
					@close="deleteTag($event, item)"
					disable-transitions>
					<span class="el-select__tags-text">{{ item.currentLabel }}</span>
				</xTag>
			</transition-group>
			<input
				type="text"
				class="el-select__input"
				:class="cptClassInput"
				:disabled="selectDisabled"
				:autocomplete="autoComplete || autocomplete"
				@focus="handleFocus"
				@blur="softFocus = false"
				@keyup="managePlaceholder"
				@keydown="resetInputState"
				@keydown.down.prevent="handleNavigate('next')"
				@keydown.up.prevent="handleNavigate('prev')"
				@keydown.enter.prevent="selectOption"
				@keydown.esc.stop.prevent="visible = false"
				@keydown.delete="deletePrevTag"
				@keydown.tab="visible = false"
				@compositionstart="handleComposition"
				@compositionupdate="handleComposition"
				@compositionend="handleComposition"
				v-model="query"
				@input="debouncedQueryChange"
				v-if="filterable"
				:style="{
					'flex-grow': '1',
					width: inputLength / (inputWidth - 32) + '%',
					'max-width': inputWidth - 42 + 'px'
				}"
				ref="input" />
		</div>
		<div class="xSelect-middle-wrapper flex middle">
			<!-- 前置元素 -->
			<div class="xSelect-middle-wrapper_prepend" v-if="$scopedSlots.prepend">
				<slot name="prepend"></slot>
			</div>
			<xInput
				ref="reference"
				v-model="selectedLabel"
				type="text"
				:placeholder="currentPlaceholder"
				:name="name"
				:id="id"
				:autocomplete="autoComplete || autocomplete"
				:size="selectSize"
				:disabled="selectDisabled"
				:readonly="readonly"
				:validate-event="false"
				:class="{ 'is-focus': visible }"
				:tabindex="multiple && filterable ? '-1' : null"
				@focus="handleFocus"
				@blur="handleBlur"
				@input="debouncedOnInputChange"
				@keydown.native.down.stop.prevent="handleNavigate('next')"
				@keydown.native.up.stop.prevent="handleNavigate('prev')"
				@keydown.native.enter.prevent="selectOption"
				@keydown.native.esc.stop.prevent="visible = false"
				@keydown.native.tab="visible = false"
				@compositionstart="handleComposition"
				@compositionupdate="handleComposition"
				@compositionend="handleComposition"
				@mouseenter.native="inputHovering = true"
				@mouseleave.native="inputHovering = false">
				<template slot="prefix" v-if="$slots.prefix">
					<slot name="prefix"></slot>
				</template>
				<template slot="suffix">
					<xIcon
						v-show="!showClose"
						:icon="state.xSelectIconArrow"
						:class="['el-select__caret el-input__icon', iconClass]" />
					<!-- el-icon-circle-close -->
					<xIcon
						v-if="showClose"
						icon="circle-close"
						class="el-select__caret el-input__icon"
						@click="handleClearClick" />
				</template>
			</xInput>
		</div>
		<transition name="el-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
			<xSelectDropdown
				ref="popper"
				:append-to-body="popperAppendToBody"
				v-show="visible && emptyText !== false">
				<xScrollbar
					tag="ul"
					wrap-class="el-select-dropdown__wrap"
					view-class="el-select-dropdown__list"
					ref="scrollbar"
					:class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
					v-show="options.length > 0 && !loading">
					<xOption :value="query" created v-if="showNewOption"> </xOption>
					<slot></slot>
				</xScrollbar>
				<template
					v-if="
						emptyText &&
						(!allowCreate || loading || (allowCreate && options.length === 0))
					">
					<slot name="empty" v-if="$slots.empty"></slot>
					<p class="el-select-dropdown__empty" v-else>
						{{ emptyText }}
					</p>
				</template>
			</xSelectDropdown>
		</transition>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [
		{ useFocus },
		{ addResizeListener, removeResizeListener },
		Clickoutside,
		NavigationMixin
	] = await Promise.all([
		_.$importVue("/common/utils/hooks.vue"),
		_.$importVue("/common/utils/utils.vue"),
		_.$importVue("/common/ui-x/directive/clickoutside.vue"),
		_.$importVue("/common/ui-x/components/form/xSelect/navigationMixin.vue")
	]);

	return defineComponent({
		setup() {
			const { focus } = useFocus(this, "reference");

			const state = reactive({
				xSelectIconArrow: "arrow-down"
			});

			(() => {
				function onThemeChange() {
					const theme = PRIVATE_GLOBAL.x_ui.theme;
					if (theme && onThemeChange.old_theme !== theme) {
						onThemeChange.old_theme = theme;

						const x_ui_collection = PRIVATE_GLOBAL.x_ui_collection || {};
						const configs = x_ui_collection[theme] || {};
						const x_select = configs.x_select || {};

						const { icon_arrow } = x_select;

						if (_.isString(icon_arrow) && icon_arrow !== state.xSelectIconArrow) {
							state.xSelectIconArrow = icon_arrow;
						} else {
							state.xSelectIconArrow = "arrow-down";
						}
					}
				}

				$(window).on(`x_ui_theme_change.${this._uid}`, onThemeChange);
				onBeforeUnmount(() =>
					$(window).off(`x_ui_theme_change.${this._uid}`, onThemeChange)
				);
				onThemeChange();
			})();

			return { focus, state };
		},
		mixins: [NavigationMixin],
		name: "xSelect",
		componentName: "xSelect",
		inject: {
			xItem: { default: {} },
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		provide() {
			return {
				select: this
			};
		},
		computed: {
			cptClassInput() {
				return [this.selectSize ? `is-${this.selectSize}` : ""];
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},

			readonly() {
				return (
					!this.filterable ||
					this.multiple ||
					(!_.$isIE() && !_.$isEdge() && !this.visible)
				);
			},

			showClose() {
				let hasValue = this.multiple
					? Array.isArray(this.value) && this.value.length > 0
					: this.value !== undefined && this.value !== null && this.value !== "";
				let criteria =
					this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
				return criteria;
			},

			iconClass() {
				if (this.remote && this.filterable) {
					return "";
				}

				return this.visible ? "is-reverse" : "";
			},

			duration() {
				return this.remote ? 300 : 0;
			},

			emptyText() {
				if (this.loading) {
					return this.loadingText || i18n("el.select.loading");
				} else {
					if (this.remote && this.query === "" && this.options.length === 0) return false;
					if (
						this.filterable &&
						this.query &&
						this.options.length > 0 &&
						this.filteredOptionsCount === 0
					) {
						return this.noMatchText || i18n("el.select.noMatch");
					}
					if (this.options.length === 0) {
						return this.noDataText || i18n("el.select.noData");
					}
				}
				return null;
			},

			showNewOption() {
				let hasExistingOption = this.options
					.filter(option => !option.created)
					.some(option => option.currentLabel === this.query);
				return (
					this.filterable && this.allowCreate && this.query !== "" && !hasExistingOption
				);
			},

			selectSize() {
				return this.size || this._elFormItemSize || PRIVATE_GLOBAL.x_ui.size;
			},

			selectDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			},

			collapseTagSize() {
				return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small";
			},
			propPlaceholder() {
				return typeof this.placeholder !== "undefined"
					? this.placeholder
					: i18n("el.select.placeholder");
			}
		},

		directives: { Clickoutside },
		props: {
			name: String,
			id: String,
			value: {
				required: true
			},
			autocomplete: {
				type: String,
				default: "off"
			},
			/** @Deprecated in next major version */
			autoComplete: {
				type: String,
				validator(val) {
					process.env.NODE_ENV !== "production" &&
						console.warn(
							"[Element Warn][Select]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
						);
					return true;
				}
			},
			selectOptions: Array,
			automaticDropdown: Boolean,
			size: String,
			disabled: Boolean,
			clearable: Boolean,
			filterable: {
				type: Boolean,
				default: true
			},
			allowCreate: Boolean,
			loading: Boolean,
			popperClass: String,
			remote: Boolean,
			loadingText: String,
			noMatchText: String,
			noDataText: String,
			remoteMethod: Function,
			filterMethod: Function,
			multiple: Boolean,
			multipleLimit: {
				type: Number,
				default: 0
			},
			placeholder: {
				type: String,
				required: false
			},
			defaultFirstOption: Boolean,
			reserveKeyword: Boolean,
			valueKey: {
				type: String,
				default: "value"
			},
			collapseTags: Boolean,
			popperAppendToBody: {
				type: Boolean,
				default: true
			}
		},

		data() {
			return {
				options: [],
				cachedOptions: [],
				createdLabel: null,
				createdSelected: false,
				selected: this.multiple ? [] : {},
				inputLength: 20,
				inputWidth: 0,
				initialInputHeight: 0,
				cachedPlaceHolder: "",
				optionsCount: 0,
				filteredOptionsCount: 0,
				visible: false,
				softFocus: false,
				selectedLabel: "",
				hoverIndex: -1,
				query: "",
				previousQuery: null,
				inputHovering: false,
				currentPlaceholder: "",
				menuVisibleOnFocus: false,
				isOnComposition: false,
				isSilentBlur: false
			};
		},

		watch: {
			selectDisabled() {
				this.$nextTick(() => {
					this.resetInputHeight();
				});
			},

			propPlaceholder(val) {
				this.cachedPlaceHolder = this.currentPlaceholder = val;
			},

			value(val, oldVal) {
				if (this.multiple) {
					this.resetInputHeight();
					if ((val && val.length > 0) || (this.$refs.input && this.query !== "")) {
						this.currentPlaceholder = "";
					} else {
						this.currentPlaceholder = this.cachedPlaceHolder;
					}
					if (this.filterable && !this.reserveKeyword) {
						this.query = "";
						this.handleQueryChange(this.query);
					}
				}
				this.setSelected();
				if (this.filterable && !this.multiple) {
					this.inputLength = 20;
				}
				if (!_.$valueEquals(val, oldVal)) {
					this.dispatch("ElFormItem", "el.form.change", val);
				}
			},

			visible(val) {
				if (!val) {
					this.broadcast("xSelectDropdown", "destroyPopper");
					if (this.$refs.input) {
						this.$refs.input.blur();
					}
					this.query = "";
					this.previousQuery = null;
					this.selectedLabel = "";
					this.inputLength = 20;
					this.menuVisibleOnFocus = false;
					this.resetHoverIndex();
					this.$nextTick(() => {
						if (
							this.$refs.input &&
							this.$refs.input.value === "" &&
							this.selected.length === 0
						) {
							this.currentPlaceholder = this.cachedPlaceHolder;
						}
					});
					if (!this.multiple) {
						if (this.selected) {
							if (
								this.filterable &&
								this.allowCreate &&
								this.createdSelected &&
								this.createdLabel
							) {
								this.selectedLabel = this.createdLabel;
							} else {
								this.selectedLabel = this.selected.currentLabel;
							}
							if (this.filterable) this.query = this.selectedLabel;
						}

						if (this.filterable) {
							this.currentPlaceholder = this.cachedPlaceHolder;
						}
					}
				} else {
					this.broadcast("xSelectDropdown", "updatePopper");
					if (this.filterable) {
						this.query = this.remote ? "" : this.selectedLabel;
						this.handleQueryChange(this.query);
						if (this.multiple) {
							this.$refs.input.focus();
						} else {
							if (!this.remote) {
								this.broadcast("xOption", "queryChange", "");
								this.broadcast("xOptionGroup", "queryChange");
							}

							if (this.selectedLabel) {
								this.currentPlaceholder = this.selectedLabel;
								this.selectedLabel = "";
							}
						}
					}
				}
				this.$emit("visible-change", val);
			},

			options() {
				if (this.$isServer) return;
				this.$nextTick(() => {
					this.broadcast("xSelectDropdown", "updatePopper");
				});
				if (this.multiple) {
					this.resetInputHeight();
				}
				let inputs = this.$el.querySelectorAll("input");
				if ([].indexOf.call(inputs, document.activeElement) === -1) {
					this.setSelected();
				}
				if (
					this.defaultFirstOption &&
					(this.filterable || this.remote) &&
					this.filteredOptionsCount
				) {
					this.checkDefaultFirstOption();
				}
			}
		},

		methods: {
			handleNavigate(direction) {
				if (this.isOnComposition) return;

				this.navigateOptions(direction);
			},
			handleComposition(event) {
				const text = event.target.value;
				if (event.type === "compositionend") {
					this.isOnComposition = false;
					this.$nextTick(_ => this.handleQueryChange(text));
				} else {
					const lastCharacter = text[text.length - 1] || "";
					this.isOnComposition = !_.$isKorean(lastCharacter);
				}
			},
			handleQueryChange(val) {
				if (this.previousQuery === val || this.isOnComposition) return;
				if (
					this.previousQuery === null &&
					(typeof this.filterMethod === "function" ||
						typeof this.remoteMethod === "function")
				) {
					this.previousQuery = val;
					return;
				}
				this.previousQuery = val;
				this.$nextTick(() => {
					if (this.visible) this.broadcast("xSelectDropdown", "updatePopper");
				});
				this.hoverIndex = -1;
				if (this.multiple && this.filterable) {
					this.$nextTick(() => {
						const length = this.$refs.input.value.length * 15 + 20;
						this.inputLength = this.collapseTags ? Math.min(50, length) : length;
						this.managePlaceholder();
						this.resetInputHeight();
					});
				}
				if (this.remote && typeof this.remoteMethod === "function") {
					this.hoverIndex = -1;
					this.remoteMethod(val);
				} else if (typeof this.filterMethod === "function") {
					this.filterMethod(val);
					this.broadcast("xOptionGroup", "queryChange");
				} else {
					this.filteredOptionsCount = this.optionsCount;
					this.broadcast("xOption", "queryChange", val);
					this.broadcast("xOptionGroup", "queryChange");
				}
				if (
					this.defaultFirstOption &&
					(this.filterable || this.remote) &&
					this.filteredOptionsCount
				) {
					this.checkDefaultFirstOption();
				}
			},

			scrollToOption(option) {
				const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
				if (this.$refs.popper && target) {
					const menu = this.$refs.popper.$el.querySelector(".el-select-dropdown__wrap");
					_.$scrollIntoView(menu, target);
				}
				this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
			},

			handleMenuEnter() {
				this.$nextTick(() => this.scrollToOption(this.selected));
			},

			emitChange(val) {
				if (!_.$valueEquals(this.value, val)) {
					this.$emit("change", val);
				}
			},

			getOption(value) {
				let option;
				const isObject =
					Object.prototype.toString.call(value).toLowerCase() === "[object object]";
				const isNull =
					Object.prototype.toString.call(value).toLowerCase() === "[object null]";
				const isUndefined =
					Object.prototype.toString.call(value).toLowerCase() === "[object undefined]";

				for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
					const cachedOption = this.cachedOptions[i];
					const isEqual = isObject
						? _.$val(cachedOption.value, this.valueKey) === _.$val(value, this.valueKey)
						: cachedOption.value === value;
					if (isEqual) {
						option = cachedOption;
						break;
					}
				}
				if (option) return option;
				const label = !isObject && !isNull && !isUndefined ? String(value) : "";
				let newOption = {
					value: value,
					currentLabel: label
				};
				if (this.multiple) {
					newOption.hitState = false;
				}
				return newOption;
			},

			setSelected() {
				if (!this.multiple) {
					let option = this.getOption(this.value);
					if (option.created) {
						this.createdLabel = option.currentLabel;
						this.createdSelected = true;
					} else {
						this.createdSelected = false;
					}
					this.selectedLabel = option.currentLabel;
					this.selected = option;
					if (this.filterable) this.query = this.selectedLabel;
					return;
				}
				let result = [];
				if (Array.isArray(this.value)) {
					this.value.forEach(value => {
						result.push(this.getOption(value));
					});
				}
				this.selected = result;
				this.$nextTick(() => {
					this.resetInputHeight();
				});
			},

			handleFocus(event) {
				if (!this.softFocus) {
					if (this.automaticDropdown || this.filterable) {
						if (this.filterable && !this.visible) {
							this.menuVisibleOnFocus = true;
						}
						this.visible = true;
					}
					this.$emit("focus", event);
				} else {
					this.softFocus = false;
				}
			},

			blur() {
				this.visible = false;
				this.$refs.reference.blur();
			},

			handleBlur(event) {
				setTimeout(() => {
					if (this.isSilentBlur) {
						this.isSilentBlur = false;
					} else {
						this.$emit("blur", event);
					}
				}, 50);
				this.softFocus = false;
			},

			handleClearClick(event) {
				this.deleteSelected(event);
			},

			doDestroy() {
				this.$refs.popper && this.$refs.popper.doDestroy();
			},

			handleClose() {
				this.visible = false;
			},

			toggleLastOptionHitState(hit) {
				if (!Array.isArray(this.selected)) return;
				const option = this.selected[this.selected.length - 1];
				if (!option) return;

				if (hit === true || hit === false) {
					option.hitState = hit;
					return hit;
				}

				option.hitState = !option.hitState;
				return option.hitState;
			},

			deletePrevTag(e) {
				if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
					const value = this.value.slice();
					value.pop();
					this.$emit("input", value);
					this.emitChange(value);
				}
			},

			managePlaceholder() {
				if (this.currentPlaceholder !== "") {
					this.currentPlaceholder = this.$refs.input.value ? "" : this.cachedPlaceHolder;
				}
			},

			resetInputState(e) {
				if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
				this.inputLength = this.$refs.input.value.length * 15 + 20;
				this.resetInputHeight();
			},

			resetInputHeight() {
				if (this.collapseTags && !this.filterable) return;
				this.$nextTick(() => {
					if (!this.$refs.reference) return;
					let inputChildNodes = this.$refs.reference.$el.childNodes;
					let input = [].filter.call(
						inputChildNodes,
						item => item.tagName === "INPUT"
					)[0];
					const tags = this.$refs.tags;
					const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
					const sizeInMap = this.initialInputHeight;
					input.style.minHeight =
						this.selected.length === 0
							? sizeInMap + "px"
							: Math.max(
									tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0,
									sizeInMap
								) + "px";
					if (this.visible && this.emptyText !== false) {
						this.broadcast("xSelectDropdown", "updatePopper");
					}
				});
			},

			resetHoverIndex() {
				setTimeout(() => {
					if (!this.multiple) {
						this.hoverIndex = this.options.indexOf(this.selected);
					} else {
						if (this.selected.length > 0) {
							this.hoverIndex = Math.min.apply(
								null,
								this.selected.map(item => this.options.indexOf(item))
							);
						} else {
							this.hoverIndex = -1;
						}
					}
				}, 300);
			},

			handleOptionSelect(option, byClick) {
				if (this.multiple) {
					const value = (this.value || []).slice();
					const optionIndex = this.getValueIndex(value, option.value);
					if (optionIndex > -1) {
						value.splice(optionIndex, 1);
					} else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
						value.push(option.value);
					}
					this.$emit("input", value);
					this.emitChange(value);
					if (option.created) {
						this.query = "";
						this.handleQueryChange("");
						this.inputLength = 20;
					}
					if (this.filterable) this.$refs.input.focus();
				} else {
					this.$emit("input", option.value);
					this.emitChange(option.value);
					this.visible = false;
				}
				this.isSilentBlur = byClick;
				this.setSoftFocus();
				if (this.visible) return;
				this.$nextTick(() => {
					this.scrollToOption(option);
				});
			},

			setSoftFocus() {
				this.softFocus = true;
				const input = this.$refs.input || this.$refs.reference;
				if (input) {
					input.focus();
				}
			},

			getValueIndex(arr = [], value) {
				const isObject =
					Object.prototype.toString.call(value).toLowerCase() === "[object object]";
				if (!isObject) {
					return arr.indexOf(value);
				} else {
					const valueKey = this.valueKey;
					let index = -1;
					arr.some((item, i) => {
						if (_.$val(item, valueKey) === _.$val(value, valueKey)) {
							index = i;
							return true;
						}
						return false;
					});
					return index;
				}
			},

			toggleMenu() {
				if (!this.selectDisabled) {
					if (this.menuVisibleOnFocus) {
						this.menuVisibleOnFocus = false;
					} else {
						this.visible = !this.visible;
					}
					if (this.visible) {
						(this.$refs.input || this.$refs.reference).focus();
					}
				}
			},

			selectOption() {
				if (!this.visible) {
					this.toggleMenu();
				} else {
					if (this.options[this.hoverIndex]) {
						this.handleOptionSelect(this.options[this.hoverIndex]);
					}
				}
			},

			deleteSelected(event) {
				event.stopPropagation();
				const value = this.multiple ? [] : "";
				this.$emit("input", value);
				this.emitChange(value);
				this.visible = false;
				this.$emit("clear");
			},

			deleteTag(event, tag) {
				let index = this.selected.indexOf(tag);
				if (index > -1 && !this.selectDisabled) {
					const value = this.value.slice();
					value.splice(index, 1);
					this.$emit("input", value);
					this.emitChange(value);
					this.$emit("remove-tag", tag.value);
				}
				event.stopPropagation();
			},

			onInputChange() {
				if (this.filterable && this.query !== this.selectedLabel) {
					this.query = this.selectedLabel;
					this.handleQueryChange(this.query);
				}
			},

			onOptionDestroy(index) {
				if (index > -1) {
					this.optionsCount--;
					this.filteredOptionsCount--;
					this.options.splice(index, 1);
				}
			},

			resetInputWidth() {
				if (_.$val(this, "$refs.reference.$el.getBoundingClientRect")) {
					this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
					this.$emit("resize", {
						inputWidth: this.inputWidth
					});
				}
			},

			handleResize() {
				this.resetInputWidth();
				if (this.multiple) this.resetInputHeight();
			},

			checkDefaultFirstOption() {
				this.hoverIndex = -1;
				// highlight the created option
				let hasCreated = false;
				for (let i = this.options.length - 1; i >= 0; i--) {
					if (this.options[i].created) {
						hasCreated = true;
						this.hoverIndex = i;
						break;
					}
				}
				if (hasCreated) return;
				for (let i = 0; i !== this.options.length; ++i) {
					const option = this.options[i];
					if (this.query) {
						// highlight first options that passes the filter
						if (!option.disabled && !option.groupDisabled && option.visible) {
							this.hoverIndex = i;
							break;
						}
					} else {
						// highlight currently selected option
						if (option.itemSelected) {
							this.hoverIndex = i;
							break;
						}
					}
				}
			},

			getValueKey(item) {
				if (
					Object.prototype.toString.call(item.value).toLowerCase() !== "[object object]"
				) {
					return item.value;
				} else {
					return _.$val(item.value, this.valueKey);
				}
			}
		},

		created() {
			this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
			if (this.multiple && !Array.isArray(this.value)) {
				this.$emit("input", []);
			}
			if (!this.multiple && Array.isArray(this.value)) {
				this.$emit("input", "");
			}

			this.debouncedOnInputChange = _.debounce(() => {
				this.onInputChange();
			}, this.duration);

			this.debouncedQueryChange = _.debounce(e => {
				this.handleQueryChange(e.target.value);
			}, this.duration);

			this.$on("handleOptionClick", this.handleOptionSelect);
			this.$on("setSelected", this.setSelected);
		},

		mounted() {
			if (_.isFunction(_.$val(this, "xItem.cptConfigs.refInnerComponent"))) {
				this.xItem.cptConfigs.refInnerComponent({ vm: this });
			}
			if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
				this.currentPlaceholder = "";
			}
			addResizeListener(this.$el, this.handleResize);

			const reference = this.$refs.reference;
			if (reference && reference.$el) {
				const sizeMap = {
					medium: 36,
					small: 32,
					mini: 28
				};
				const input = reference.$el.querySelector("input");
				this.initialInputHeight = (() => {
					const { height } = input.getBoundingClientRect();
					/* fixed:Input塌陷问题 */
					if (height < sizeMap[this.selectSize]) {
						return sizeMap[this.selectSize];
					}
					return height || sizeMap[this.selectSize];
				})();
			}
			if (this.remote && this.multiple) {
				this.resetInputHeight();
			}
			this.$nextTick(() => {
				if (reference && reference.$el) {
					this.inputWidth = reference.$el.getBoundingClientRect().width;
				}
			});
			this.setSelected();
		},

		beforeDestroy() {
			if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
		}
	});
}
</script>
<style lang="less">
.el-select {
	display: inline-block;
	position: relative;

	.el-select__tags {
		> span {
			display: contents;
		}
	}

	.el-input__inner {
		cursor: pointer;
		padding-right: 35px;
		&:focus {
			border-color: var(--el-color-primary);
		}
	}

	.el-input .el-select__caret {
		color: var(--el-text-color-disabled);
		font-size: 14px;
		-webkit-transition: -webkit-transform 0.3s;
		transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		transition:
			transform 0.3s,
			-webkit-transform 0.3s;
		-webkit-transform: rotateZ(180deg);
		transform: rotateZ(0);
		cursor: pointer;
		&.el-input__icon {
			width: 16px;
		}
	}

	.el-input {
		.el-select__caret {
			&.is-show-close {
				font-size: 14px;
				text-align: center;
				-webkit-transform: rotateZ(180deg);
				transform: rotateZ(180deg);
				border-radius: 100%;
				color: var(--el-text-color-disabled);
				-webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
				&:hover {
					color: var(--el-text-color-secondary);
				}
			}

			&.is-reverse {
				transform: rotateZ(180deg);
			}
		}
	}

	.el-input.is-disabled .el-input__inner {
		cursor: not-allowed;
	}

	.el-input.is-disabled .el-input__inner:hover {
		border-color: #e4e7ed;
	}

	.el-input.is-focus .el-input__inner {
		border-color: var(--el-color-primary);
	}

	> .el-input {
		display: block;
	}

	.el-tag {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		border-color: transparent;
		margin: 2px 0 2px 6px;
		background-color: #f0f2f5;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		max-width: 100%;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.el-tag__close.el-icon-close {
		background-color: var(--el-text-color-disabled);
		top: 0;
		color: #fff;
		-ms-flex-negative: 0;
		flex-shrink: 0;
	}

	.el-tag__close.el-icon-close:hover {
		background-color: var(--el-text-color-secondary);
	}
}

.el-select-dropdown {
	position: absolute;
	z-index: 1001;
	border: 1px solid #e4e7ed;
	border-radius: var(--border-radius);
	background-color: #fff;
	-webkit-box-shadow: var(--normal-box-shadow);
	box-shadow: var(--normal-box-shadow);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin: 5px 0;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {
	padding-right: 40px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
	color: var(--el-color-primary);
	background-color: #fff;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
	background-color: var(--el-fill-color-light);
}

.x-select-selected-icon {
	position: absolute;
	right: 20px;
	width: 12px;
	// font-weight: 700;
	height: 100%;
}

.el-select-dropdown {
	.el-scrollbar {
		&.is-empty {
			.el-select-dropdown__list {
				padding: 0;
			}
		}
	}
}

.el-select-dropdown__empty {
	padding: 10px;
	margin: 0;
	text-align: center;
	color: #999;
	font-size: 14px;
}

.el-select-dropdown__wrap {
	max-height: 274px;
	width: 100%;
}

.el-select-dropdown__list {
	list-style: none;
	padding: 6px 0;
	margin: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-select-dropdown__item {
	font-size: 14px;
	padding: 0 20px;
	position: relative;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--el-text-color-regular);
	height: 34px;
	line-height: 34px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	cursor: pointer;
}

.el-select-dropdown__item.is-disabled {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-select-dropdown__item.is-disabled:hover {
	background-color: #fff;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
	background-color: var(--el-fill-color-light);
}

.el-select-dropdown__item.selected {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-select-group {
	margin: 0;
	padding: 0;
}

.el-select-group__wrap {
	position: relative;
	list-style: none;
	margin: 0;
	padding: 0;
}

.el-select-group__wrap:not(:last-of-type) {
	padding-bottom: 24px;
}

.el-select-group__wrap:not(:last-of-type)::after {
	content: "";
	position: absolute;
	display: block;
	left: 20px;
	right: 20px;
	bottom: 12px;
	height: 1px;
	background: #e4e7ed;
}

.el-select-group__title {
	padding-left: 20px;
	font-size: 12px;
	color: var(--el-text-color-secondary);
	line-height: 30px;
}

.el-select-group .el-select-dropdown__item {
	padding-left: 20px;
}

.el-select:hover .el-input__inner {
	border-color: var(--el-text-color-disabled);
}

.el-select__input {
	border: none;
	outline: 0;
	padding: 0;
	margin-left: 15px;
	color: #666;
	font-size: 14px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	height: 28px;
	background-color: transparent;
}

.el-select__input.is-mini {
	height: 14px;
}

.el-select__close {
	cursor: pointer;
	position: absolute;
	top: 8px;
	z-index: 1000;
	right: 25px;
	color: var(--el-text-color-disabled);
	line-height: 18px;
	font-size: 14px;
	&:hover {
		color: var(--el-text-color-secondary);
	}
}

.el-select__tags {
	position: absolute;
	line-height: normal;
	white-space: normal;
	z-index: 1;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
}

.el-select__tags-text {
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
