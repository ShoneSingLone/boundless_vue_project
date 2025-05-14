<template>
	<div
		class="el-autocomplete"
		v-clickoutside="close"
		aria-haspopup="listbox"
		role="combobox"
		:aria-expanded="suggestionVisible"
		:aria-owns="id">
		<xInput
			ref="input"
			v-bind="[$props, $attrs]"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
			@clear="handleClear"
			@keydown.up.native.prevent="highlight(highlightedIndex - 1)"
			@keydown.down.native.prevent="highlight(highlightedIndex + 1)"
			@keydown.enter.native="handleKeyEnter"
			@keydown.native.tab="close">
			<template slot="prepend" v-if="$slots.prepend">
				<slot name="prepend"></slot>
			</template>
			<template slot="append" v-if="$slots.append">
				<slot name="append"></slot>
			</template>
			<template slot="prefix" v-if="$slots.prefix">
				<slot name="prefix"></slot>
			</template>
			<template slot="suffix" v-if="$slots.suffix">
				<slot name="suffix"></slot>
			</template>
		</xInput>
		<xAutocompleteSuggestions
			visible-arrow
			ref="suggestions"
			:class="[popperClass ? popperClass : '']"
			:popper-options="popperOptions"
			:append-to-body="popperAppendToBody"
			:placement="placement"
			:id="id">
			<li
				v-for="(item, index) in suggestions"
				:key="index"
				:class="{ highlighted: highlightedIndex === index }"
				@click="select(item)"
				:id="cptId"
				role="option"
				:aria-selected="highlightedIndex === index">
				<slot :item="item">
					{{ item[valueKey] }}
				</slot>
			</li>
		</xAutocompleteSuggestions>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [{ useFocus }, Clickoutside] = await Promise.all([
		_.$importVue("/common/utils/hooks.vue"),
		_.$importVue("/common/ui-x/directive/clickoutside.vue")
	]);

	return defineComponent({
		name: "xAutocomplete",
		inheritAttrs: false,
		componentName: "xAutocomplete",
		setup(props) {
			const { focus } = useFocus(this, "input");
			return { focus };
		},
		directives: { Clickoutside },
		props: {
			valueKey: {
				type: String,
				default: "value"
			},
			popperClass: String,
			popperOptions: Object,
			placeholder: String,
			clearable: {
				type: Boolean,
				default: false
			},
			disabled: Boolean,
			name: String,
			size: String,
			value: String,
			maxlength: Number,
			minlength: Number,
			autofocus: Boolean,
			fetchSuggestions: Function,
			triggerOnFocus: {
				type: Boolean,
				default: true
			},
			customItem: String,
			selectWhenUnmatched: {
				type: Boolean,
				default: false
			},
			prefixIcon: String,
			suffixIcon: String,
			label: String,
			debounce: {
				type: Number,
				default: 300
			},
			placement: {
				type: String,
				default: "bottom-start"
			},
			hideLoading: Boolean,
			popperAppendToBody: {
				type: Boolean,
				default: true
			},
			highlightFirstItem: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				activated: false,
				suggestions: [],
				loading: false,
				highlightedIndex: -1,
				suggestionDisabled: false
			};
		},
		computed: {
			cptId() {
				const { id, index } = this;
				return `${id}-item-${index}`;
			},
			suggestionVisible() {
				const suggestions = this.suggestions;
				let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
				return (isValidData || this.loading) && this.activated;
			},
			id() {
				return `el-autocomplete-${this._uid}`;
			}
		},
		watch: {
			suggestionVisible(val) {
				let $input = this.getInput();
				if ($input) {
					this.broadcast("xAutocompleteSuggestions", "visible", [
						val,
						$input.offsetWidth
					]);
				}
			}
		},
		methods: {
			getMigratingConfig() {
				return {
					props: {
						"custom-item": "custom-item is removed, use scoped slot instead.",
						props: "props is removed, use value-key instead."
					}
				};
			},
			getData(queryString) {
				if (this.suggestionDisabled) {
					return;
				}
				this.loading = true;
				this.fetchSuggestions(queryString, suggestions => {
					this.loading = false;
					if (this.suggestionDisabled) {
						return;
					}
					if (Array.isArray(suggestions)) {
						this.suggestions = suggestions;
						this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
					} else {
						console.error(
							"[Element Error][Autocomplete]autocomplete suggestions must be an array"
						);
					}
				});
			},
			handleInput(value) {
				this.$emit("input", value);
				this.suggestionDisabled = false;
				if (!this.triggerOnFocus && !value) {
					this.suggestionDisabled = true;
					this.suggestions = [];
					return;
				}
				this.debouncedGetData(value);
			},
			handleChange(value) {
				this.$emit("change", value);
			},
			handleFocus(event) {
				this.activated = true;
				this.$emit("focus", event);
				if (this.triggerOnFocus) {
					this.debouncedGetData(this.value);
				}
			},
			handleBlur(event) {
				this.$emit("blur", event);
			},
			handleClear() {
				this.activated = false;
				this.$emit("clear");
			},
			close(e) {
				this.activated = false;
			},
			handleKeyEnter(e) {
				if (
					this.suggestionVisible &&
					this.highlightedIndex >= 0 &&
					this.highlightedIndex < this.suggestions.length
				) {
					e.preventDefault();
					this.select(this.suggestions[this.highlightedIndex]);
				} else if (this.selectWhenUnmatched) {
					this.$emit("select", { value: this.value });
					this.$nextTick(_ => {
						this.suggestions = [];
						this.highlightedIndex = -1;
					});
				}
			},
			select(item) {
				this.$emit("input", item[this.valueKey]);
				this.$emit("select", item);
				this.$nextTick(_ => {
					this.suggestions = [];
					this.highlightedIndex = -1;
				});
			},
			highlight(index) {
				if (!this.suggestionVisible || this.loading) {
					return;
				}
				if (index < 0) {
					this.highlightedIndex = -1;
					return;
				}
				if (index >= this.suggestions.length) {
					index = this.suggestions.length - 1;
				}
				const suggestion = this.$refs.suggestions.$el.querySelector(
					".el-autocomplete-suggestion__wrap"
				);
				const suggestionList = suggestion.querySelectorAll(
					".el-autocomplete-suggestion__list li"
				);

				let highlightItem = suggestionList[index];
				let scrollTop = suggestion.scrollTop;
				let offsetTop = highlightItem.offsetTop;

				if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
					suggestion.scrollTop += highlightItem.scrollHeight;
				}
				if (offsetTop < scrollTop) {
					suggestion.scrollTop -= highlightItem.scrollHeight;
				}
				this.highlightedIndex = index;
				let $input = this.getInput();
				$input.setAttribute(
					"aria-activedescendant",
					`${this.id}-item-${this.highlightedIndex}`
				);
			},
			getInput() {
				return this.$refs.input.getInput();
			}
		},
		mounted() {
			this.debouncedGetData = _.debounce(this.getData, this.debounce);
			this.$on("item-click", item => {
				this.select(item);
			});
			let $input = this.getInput();
			$input.setAttribute("role", "textbox");
			$input.setAttribute("aria-autocomplete", "list");
			$input.setAttribute("aria-controls", "id");
			$input.setAttribute(
				"aria-activedescendant",
				`${this.id}-item-${this.highlightedIndex}`
			);
		},
		beforeDestroy() {
			this.$refs.suggestions.$destroy();
		}
	});
}
</script>
<style lang="less">
.el-autocomplete {
	position: relative;
	display: inline-block;
}

.el-autocomplete-suggestion {
	margin: 5px 0;
	-webkit-box-shadow: var(--normal-box-shadow);
	box-shadow: var(--normal-box-shadow);
	border-radius: var(--border-radius);
	border: 1px solid #e4e7ed;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
}

.el-autocomplete-suggestion__wrap {
	max-height: 280px;
	padding: 10px 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-autocomplete-suggestion__list {
	margin: 0;
	padding: 0;
}

.el-autocomplete-suggestion li {
	padding: 0 20px;
	margin: 0;
	line-height: 34px;
	cursor: pointer;
	color: #606266;
	font-size: 14px;
	list-style: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
	background-color: var(--el-fill-color-light);
}

.el-autocomplete-suggestion li.divider {
	margin-top: 6px;
	border-top: 1px solid #000;
}

.el-autocomplete-suggestion li.divider:last-child {
	margin-bottom: -6px;
}

.el-autocomplete-suggestion.is-loading li {
	text-align: center;
	height: 100px;
	line-height: 100px;
	font-size: 20px;
	color: #999;
}

.el-autocomplete-suggestion.is-loading li::after {
	display: inline-block;
	content: "";
	height: 100%;
	vertical-align: middle;
}

.el-autocomplete-suggestion.is-loading li:hover {
	background-color: #fff;
}

.el-autocomplete-suggestion.is-loading .el-icon-loading {
	vertical-align: middle;
}
</style>
