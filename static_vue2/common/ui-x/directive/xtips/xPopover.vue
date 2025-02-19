<template>
	<span>
		<transition
			:name="transition"
			@after-enter="handleAfterEnter"
			@after-leave="handleAfterLeave">
			<div
				class="el-popover el-popper"
				:class="[popperClass, content && 'el-popover--plain']"
				ref="popper"
				v-show="!disabled && showPopper"
				:style="{ width: width + 'px' }"
				role="tooltip"
				:id="tooltipId"
				:aria-hidden="disabled || !showPopper ? 'true' : 'false'">
				<div class="el-popover__title" v-if="title" v-text="title"></div>
				<slot>
					<xRender :render="content" />
				</slot>
			</div>
		</transition>
		<span class="el-popover__reference-wrapper" ref="wrapper">
			<slot name="reference"></slot>
		</span>
	</span>
</template>
<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");

	const { on, off, addClass, removeClass } = _xUtils;

	const { directive } = (() => {
		const getReference = (el, binding, vnode) => {
			const _ref = binding.expression ? binding.value : binding.arg;
			const popper = vnode.context.$refs[_ref];
			if (popper) {
				if (Array.isArray(popper)) {
					popper[0].$refs.reference = el;
				} else {
					popper.$refs.reference = el;
				}
			}
		};

		const directive = {
			bind(el, binding, vnode) {
				getReference(el, binding, vnode);
			},
			inserted(el, binding, vnode) {
				getReference(el, binding, vnode);
			}
		};

		Vue.directive("popover", directive);

		return {
			directive
		};
	})();

	return defineComponent({
		name: "xPopover",
		directive,
		mixins: [Popper],
		props: {
			trigger: {
				type: String,
				default: "click",
				validator: value => ["click", "focus", "hover", "manual"].indexOf(value) > -1
			},
			openDelay: {
				type: Number,
				default: 0
			},
			closeDelay: {
				type: Number,
				default: 200
			},
			title: String,
			disabled: Boolean,
			content: {
				type: [String, Object]
				// validator: value => { debugger; return typeof value === "string" || isVNode(value); }
			},
			reference: {},
			popperClass: String,
			width: {},
			visibleArrow: {
				default: true
			},
			arrowOffset: {
				type: Number,
				default: 0
			},
			transition: {
				type: String,
				default: "fade-in-linear"
			},
			tabindex: {
				type: Number,
				default: 0
			}
		},

		computed: {
			tooltipId() {
				return _.$genId("el-popover");
			}
		},
		watch: {
			showPopper(val) {
				if (this.disabled) {
					return;
				}
				val ? this.$emit("show") : this.$emit("hide");
			}
		},

		async mounted() {
			let reference = (this.referenceElm = this.reference || this.$refs.reference);
			// let reference = await _.$ensure(() => (this.referenceElm = this.reference || this.$refs.reference));
			const popper = this.popper || this.$refs.popper;

			if (!reference && this.$refs.wrapper.children) {
				reference = this.referenceElm = this.$refs.wrapper.children[0];
			}
			// 可访问性
			if (reference) {
				addClass(reference, "el-popover__reference");
				reference.setAttribute("aria-describedby", this.tooltipId);
				reference.setAttribute("tabindex", this.tabindex); // tab序列
				popper.setAttribute("tabindex", 0);

				if (this.trigger !== "click") {
					on(reference, "focusin", () => {
						this.handleFocus();
						const instance = reference.__vue__;
						if (instance && typeof instance.focus === "function") {
							instance.focus();
						}
					});
					on(popper, "focusin", this.handleFocus);
					on(reference, "focusout", this.handleBlur);
					on(popper, "focusout", this.handleBlur);
				}
				on(reference, "keydown", this.handleKeydown);
				on(reference, "click", this.handleClick);
				if (this.trigger === "click") {
					on(reference, "click", this.doToggle);
					on(document, "click", this.handleDocumentClick);
				} else if (this.trigger === "hover") {
					on(reference, "mouseenter", this.handleMouseEnter);
					on(popper, "mouseenter", this.handleMouseEnter);
					on(reference, "mouseleave", this.handleMouseLeave);
					on(popper, "mouseleave", this.handleMouseLeave);
				} else if (this.trigger === "focus") {
					if (this.tabindex < 0) {
						console.warn(
							"[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key"
						);
					}
					if (reference.querySelector("input, textarea")) {
						on(reference, "focusin", this.doShow);
						on(reference, "focusout", this.doClose);
					} else {
						on(reference, "mousedown", this.doShow);
						on(reference, "mouseup", this.doClose);
					}
				}
			} else {
			}
		},

		beforeDestroy() {
			this.cleanup();
		},

		deactivated() {
			this.cleanup();
		},

		methods: {
			doToggle() {
				this.showPopper = !this.showPopper;
			},
			doShow() {
				this.showPopper = true;
			},
			doClose() {
				this.showPopper = false;
			},
			handleFocus() {
				addClass(this.referenceElm, "focusing");
				if (this.trigger === "click" || this.trigger === "focus") this.showPopper = true;
			},
			handleClick() {
				removeClass(this.referenceElm, "focusing");
			},
			handleBlur() {
				removeClass(this.referenceElm, "focusing");
				if (this.trigger === "click" || this.trigger === "focus") this.showPopper = false;
			},
			handleMouseEnter() {
				clearTimeout(this._timer);
				if (this.openDelay) {
					this._timer = setTimeout(() => {
						this.showPopper = true;
					}, this.openDelay);
				} else {
					this.showPopper = true;
				}
			},
			handleKeydown(ev) {
				if (ev.keyCode === 27 && this.trigger !== "manual") {
					// esc
					this.doClose();
				}
			},
			handleMouseLeave() {
				clearTimeout(this._timer);
				if (this.closeDelay) {
					this._timer = setTimeout(() => {
						this.showPopper = false;
					}, this.closeDelay);
				} else {
					this.showPopper = false;
				}
			},
			handleDocumentClick(e) {
				let reference = this.reference || this.$refs.reference;
				const popper = this.popper || this.$refs.popper;

				if (!reference && this.$refs.wrapper.children) {
					reference = this.referenceElm = this.$refs.wrapper.children[0];
				}
				if (
					!this.$el ||
					!reference ||
					this.$el.contains(e.target) ||
					reference.contains(e.target) ||
					!popper ||
					popper.contains(e.target)
				)
					return;
				this.showPopper = false;
			},
			handleAfterEnter() {
				this.$emit("after-enter");
			},
			handleAfterLeave() {
				this.$emit("after-leave");
				this.doDestroy();
			},
			cleanup() {
				if (this.openDelay || this.closeDelay) {
					clearTimeout(this._timer);
				}
			}
		},

		destroyed() {
			const reference = this.reference;
			off(reference, "click", this.doToggle);
			off(reference, "mouseup", this.doClose);
			off(reference, "mousedown", this.doShow);
			off(reference, "focusin", this.doShow);
			off(reference, "focusout", this.doClose);
			off(reference, "mousedown", this.doShow);
			off(reference, "mouseup", this.doClose);
			off(reference, "mouseleave", this.handleMouseLeave);
			off(reference, "mouseenter", this.handleMouseEnter);
			off(document, "click", this.handleDocumentClick);
		}
	});
}
</script>
<style lang="less">
.el-popover:focus,
.el-popover:focus:active,
.el-popover__reference:focus:hover,
.el-popover__reference:focus:not(.focusing) {
	outline-width: 0;
}

.el-popover,
.el-radio-button:first-child:last-child .el-radio-button__inner {
	border-radius: var(--border-radius);
}
.el-popover {
	position: absolute;
	background: #fff;
	min-width: 150px;
	border: 1px solid var(--el-border-color-lighter);
	padding: 12px;
	z-index: 2000;
	color: var(--el-text-color-regular);
	line-height: 1.4;
	text-align: justify;
	font-size: 14px;
	box-shadow: var(--normal-box-shadow);
	word-break: break-all;
}

.el-popover--plain {
	padding: 18px 20px;
}

.el-popover__title {
	color: var(--el-text-color-primary);
	font-size: 16px;
	line-height: 1;
	margin-bottom: 12px;
}
</style>
