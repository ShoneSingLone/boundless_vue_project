<template>
	<div :class="cptInputClass" @mouseenter="hovering = true" @mouseleave="hovering = false">
		<template v-if="type !== 'textarea'">
			<!-- 前置元素 -->
			<div
				class="x-iniput__prepend el-input-group__prepend el-input-group__prepend-sub"
				v-if="$scopedSlots.prepend">
				<slot name="prepend"></slot>
			</div>
			<!-- <xRender :render="prependRender" /> -->
			<input
				:tabindex="tabindex"
				v-if="type !== 'textarea'"
				class="el-input__inner"
				v-bind="$attrs"
				:type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
				:disabled="inputDisabled"
				:readonly="readonly"
				:autocomplete="autoComplete || autocomplete"
				ref="input"
				@keyup.enter="handleEnter"
				@compositionstart="handleCompositionStart"
				@compositionupdate="handleCompositionUpdate"
				@compositionend="handleCompositionEnd"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@change="handleChange"
				:aria-label="label" />
			<!-- 前置内容 -->
			<span class="el-input__prefix flex middle" v-if="$scopedSlots.prefix || prefixIcon">
				<slot name="prefix"></slot>
				<i class="el-input__icon" v-if="prefixIcon" :class="prefixIcon"> </i>
			</span>
			<!-- 后置内容 -->
			<span class="el-input__suffix flex middle" v-if="getSuffixVisible()">
				<span class="el-input__suffix-inner">
					<template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
						<slot name="suffix"></slot>
						<i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"> </i>
					</template>
					<i
						v-if="showClear"
						class="el-input__icon el-icon-circle-close el-input__clear"
						@mousedown.prevent
						@click="clear"></i>
					<i
						v-if="showPwdVisible"
						class="el-input__icon el-icon-view el-input__clear"
						@click="handlePasswordVisible"></i>
					<span v-if="isWordLimitVisible" class="el-input__count">
						<span class="el-input__count-inner">
							{{ textLength }}/{{ upperLimit }}
						</span>
					</span>
				</span>
				<i
					class="el-input__icon"
					v-if="validateState"
					:class="['el-input__validateIcon', validateIcon]">
				</i>
			</span>
			<!-- 后置元素 -->
			<div class="x-iniput__append el-input-group__append" v-if="$scopedSlots.append">
				<slot name="append"></slot>
			</div>
		</template>
		<textarea
			v-else
			:tabindex="tabindex"
			class="el-textarea__inner"
			@compositionstart="handleCompositionStart"
			@compositionupdate="handleCompositionUpdate"
			@compositionend="handleCompositionEnd"
			@input="handleInput"
			ref="textarea"
			v-bind="$attrs"
			:disabled="inputDisabled"
			:readonly="readonly"
			:autocomplete="autoComplete || autocomplete"
			:style="textareaStyle"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange"
			:aria-label="label">
		</textarea>
		<span v-if="isWordLimitVisible && type === 'textarea'" class="el-input__count"
			>{{ textLength }}/{{ upperLimit }}</span
		>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { calcTextareaHeight } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return defineComponent({
		name: "xInput",
		componentName: "xInput",
		inheritAttrs: false,
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		data() {
			return {
				textareaCalcStyle: {},
				hovering: false,
				focused: false,
				isComposing: false,
				passwordVisible: false
			};
		},

		props: {
			value: [String, Number],
			size: String,
			resize: String,
			form: String,
			disabled: Boolean,
			readonly: Boolean,
			type: {
				type: String,
				default: "text"
			},
			autosize: {
				type: [Boolean, Object],
				default: false
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
							"[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
						);
					return true;
				}
			},
			validateEvent: {
				type: Boolean,
				default: true
			},
			suffixIcon: String,
			prefixIcon: String,
			label: String,
			clearable: {
				type: Boolean,
				default: false
			},
			showPassword: {
				type: Boolean,
				default: false
			},
			showWordLimit: {
				type: Boolean,
				default: false
			},
			tabindex: String
		},

		computed: {
			cptInputClass() {
				const {
					type,
					inputSize,
					inputDisabled,
					inputExceed,
					$scopedSlots,
					prefixIcon,
					suffixIcon,
					clearable,
					showPassword
				} = this;
				return [
					"xInput",
					type === "textarea" ? "el-textarea" : "el-input",
					inputSize ? "el-input--" + inputSize : "",
					{
						"is-disabled": inputDisabled,
						"is-exceed": inputExceed,
						"el-input-group": $scopedSlots.prepend || $scopedSlots.append,
						"el-input-group--append": $scopedSlots.append,
						"el-input-group--prepend": $scopedSlots.prepend,
						"el-input--prefix": $scopedSlots.prefix || prefixIcon,
						"el-input--suffix":
							$scopedSlots.suffix || suffixIcon || clearable || showPassword
					}
				];
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			validateState() {
				return this.elFormItem ? this.elFormItem.validateState : "";
			},
			needStatusIcon() {
				return this.elForm ? this.elForm.statusIcon : false;
			},
			validateIcon() {
				return {
					validating: "el-icon-loading",
					success: "el-icon-circle-check",
					error: "el-icon-circle-close"
				}[this.validateState];
			},
			textareaStyle() {
				return _.merge({}, this.textareaCalcStyle, { resize: this.resize });
			},
			inputSize() {
				return this.size || this._elFormItemSize || PRIVATE_GLOBAL.x_ui_size;
			},
			inputDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			},
			nativeInputValue() {
				return this.value === null || this.value === undefined ? "" : String(this.value);
			},
			showClear() {
				return (
					this.clearable &&
					!this.inputDisabled &&
					!this.readonly &&
					this.nativeInputValue &&
					(this.focused || this.hovering)
				);
			},
			showPwdVisible() {
				return (
					this.showPassword &&
					!this.inputDisabled &&
					!this.readonly &&
					(!!this.nativeInputValue || this.focused)
				);
			},
			isWordLimitVisible() {
				return (
					this.showWordLimit &&
					this.$attrs.maxlength &&
					(this.type === "text" || this.type === "textarea") &&
					!this.inputDisabled &&
					!this.readonly &&
					!this.showPassword
				);
			},
			upperLimit() {
				return this.$attrs.maxlength;
			},
			textLength() {
				if (typeof this.value === "number") {
					return String(this.value).length;
				}

				return (this.value || "").length;
			},
			inputExceed() {
				// show exceed style if length of initial value greater then maxlength
				return this.isWordLimitVisible && this.textLength > this.upperLimit;
			}
		},

		watch: {
			value(val) {
				this.$nextTick(this.resizeTextarea);
				if (this.validateEvent) {
					this.dispatch("ElFormItem", "el.form.change", [val]);
				}
			},
			// native input value is set explicitly
			// do not use v-model / :value in template
			// see: https://github.com/ElemeFE/element/issues/14521
			nativeInputValue() {
				this.setNativeInputValue();
			},
			// when change between <input> and <textarea>,
			// update DOM dependent value and styles
			// https://github.com/ElemeFE/element/issues/14857
			type() {
				this.$nextTick(() => {
					this.setNativeInputValue();
					this.resizeTextarea();
					this.updateIconOffset();
				});
			}
		},

		methods: {
			prependRender() {
				if (this.$scopedSlots?.prepend) {
					const [vNode] = this.$scopedSlots.prepend();
					if (vNode.text) {
						return h(
							"div",
							{
								staticClass: "el-input-group__prepend el-input-group__prepend-sub"
							},
							[vNode]
						);
					} else {
						return h("div", { staticClass: "x-iniput__prepend" }, [vNode]);
					}
				}
				return null;
			},
			focus() {
				this.getInput().focus();
			},
			blur() {
				this.getInput().blur();
			},
			getMigratingConfig() {
				return {
					props: {
						icon: "icon is removed, use suffix-icon / prefix-icon instead.",
						"on-icon-click": "on-icon-click is removed."
					},
					events: {
						click: "click is removed."
					}
				};
			},
			handleEnter(event) {
				this.focused = true;
				this.$emit("enter", event);
			},
			handleBlur(event) {
				this.focused = false;
				this.$emit("blur", event);
				if (this.validateEvent) {
					this.dispatch("ElFormItem", "el.form.blur", [this.value]);
				}
			},
			select() {
				this.getInput().select();
			},
			resizeTextarea() {
				if (this.$isServer) return;
				const { autosize, type } = this;
				if (type !== "textarea") return;
				if (!autosize) {
					this.textareaCalcStyle = {
						minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
					};
					return;
				}
				const minRows = autosize.minRows;
				const maxRows = autosize.maxRows;

				this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
			},
			setNativeInputValue() {
				const input = this.getInput();
				if (!input) return;
				if (input.value === this.nativeInputValue) return;
				input.value = this.nativeInputValue;
			},
			handleFocus(event) {
				this.focused = true;
				this.$emit("focus", event);
			},
			handleCompositionStart(event) {
				this.$emit("compositionstart", event);
				this.isComposing = true;
			},
			handleCompositionUpdate(event) {
				this.$emit("compositionupdate", event);
				const text = event.target.value;
				const lastCharacter = text[text.length - 1] || "";
				this.isComposing = !_.$isKorean(lastCharacter);
			},
			handleCompositionEnd(event) {
				this.$emit("compositionend", event);
				if (this.isComposing) {
					this.isComposing = false;
					this.handleInput(event);
				}
			},
			handleInput(event) {
				// should not emit input during composition
				// see: https://github.com/ElemeFE/element/issues/10516
				if (this.isComposing) return;

				// hack for https://github.com/ElemeFE/element/issues/8548
				// should remove the following line when we don't support IE
				if (event.target.value === this.nativeInputValue) return;

				this.$emit("input", event.target.value);

				// ensure native input value is controlled
				// see: https://github.com/ElemeFE/element/issues/12850
				this.$nextTick(this.setNativeInputValue);
			},
			handleChange(event) {
				this.$emit("change", event.target.value);
			},
			calcIconOffset(place) {
				let elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || []);
				if (!elList.length) return;
				let el = null;
				for (let i = 0; i < elList.length; i++) {
					if (elList[i].parentNode === this.$el) {
						el = elList[i];
						break;
					}
				}
				if (!el) return;
				const pendantMap = {
					suffix: "append",
					prefix: "prepend"
				};

				const pendant = pendantMap[place];
				if (this.$slots[pendant]) {
					el.style.transform = `translateX(${place === "suffix" ? "-" : ""}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
				} else {
					el.removeAttribute("style");
				}
			},
			updateIconOffset() {
				this.calcIconOffset("prefix");
				this.calcIconOffset("suffix");
			},
			clear() {
				this.$emit("input", "");
				this.$emit("change", "");
				this.$emit("clear");
			},
			handlePasswordVisible() {
				this.passwordVisible = !this.passwordVisible;
				this.$nextTick(() => {
					this.focus();
				});
			},
			getInput() {
				return this.$refs.input || this.$refs.textarea;
			},
			getSuffixVisible() {
				return (
					this.$slots.suffix ||
					this.suffixIcon ||
					this.showClear ||
					this.showPassword ||
					this.isWordLimitVisible ||
					(this.validateState && this.needStatusIcon)
				);
			}
		},

		created() {
			this.$on("inputSelect", this.select);
		},

		mounted() {
			this.setNativeInputValue();
			this.resizeTextarea();
			this.updateIconOffset();
		},

		updated() {
			this.$nextTick(this.updateIconOffset);
		}
	});
}
</script>
<style lang="less">
.xItem {
	--xItem-prepend-width: 72px;
	.el-input__prefix,
	.el-input__suffix {
		width: 30px;
	}

	.el-input__count-inner {
		padding: 0 0px;
	}

	.xInput {
		> .el-input-group__prepend {
			padding: 0;
			> .xItem-wrapper {
				width: var(--xItem-prepend-width);
			}
		}
	}
}

.xInput {
	display: flex;

	.x-iniput__append,
	.x-iniput__prepend {
		height: 32px;
		line-height: 32px;
		> * {
			margin: 0 -20px;
		}
	}
}

.xItem-wrapper[data-form-item-type="xItemInput"] {
	.xItem_controller.is-error {
		.el-input-group--prepend {
			border: 1px solid var(--el-color-error);
			border-radius: var(--border-radius);
			.el-input-group__append,
			.el-input-group__prepend {
				border: unset;
			}

			.el-input-group__prepend-sub {
				border: 1px solid transparent;
				// border-color: var(--el-color-error);
				+ .el-input__inner {
					border: unset;
					border-left: 1px solid #dcdfe6;
				}
			}
		}
	}
}

.el-input-group__prepend-sub {
	> div[data-form-item-type="xItemSelect"] {
		margin: 0 -20px;
	}
}
</style>
