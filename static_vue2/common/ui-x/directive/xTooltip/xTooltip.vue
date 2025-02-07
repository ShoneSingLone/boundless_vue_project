<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");

	return defineComponent({
		name: "xTooltip",
		mixins: [Popper],
		props: {
			openDelay: {
				type: Number,
				default: 0
			},
			disabled: Boolean,
			manual: Boolean,
			effect: {
				type: String,
				default: "dark"
			},
			arrowOffset: {
				type: Number,
				default: 0
			},
			popperClass: String,
			content: [String, Object],
			visibleArrow: {
				default: true
			},
			transition: {
				type: String,
				default: "el-fade-in-linear"
			},
			popperOptions: {
				default() {
					return {
						boundariesPadding: 10,
						gpuAcceleration: false
					};
				}
			},
			enterable: {
				type: Boolean,
				default: true
			},
			hideAfter: {
				type: Number,
				default: 0
			},
			tabindex: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				tooltipId: _.$genId("el-tooltip"),
				timeoutPending: null,
				focusing: false
			};
		},
		setup() {
			const vm = this;
			function handleClosePopper() {
				if ((vm.enterable && vm.expectedState) || vm.manual) return;
				clearTimeout(vm.timeout);

				if (vm.timeoutPending) {
					clearTimeout(vm.timeoutPending);
				}
				vm.showPopper = false;

				if (vm.disabled) {
					vm.doDestroy();
				}
			}
			vm.handleClosePopper = handleClosePopper;
			vm.debounceClose = _.debounce(handleClosePopper, 200);
		},
		beforeCreate() {
			this.popperVM = new Vue({
				data: { node: "" },
				render(h) {
					return this.node;
				}
			}).$mount();
		},
		render() {
			if (this.popperVM) {
				this.popperVM.node = h(
					"transition",
					{
						name: this.transition,
						onAfterLeave: this.doDestroy
					},
					[
						h(
							"div",
							{
								onMouseleave: () => {
									this.setExpectedState(false);
									this.debounceClose();
								},
								onMouseenter: () => {
									this.setExpectedState(true);
								},
								ref: "popper",
								role: "tooltip",
								id: this.tooltipId,
								"aria-hidden": this.disabled || !this.showPopper ? "true" : "false",
								class: [
									`el-tooltip__popper is-${this.effect}`,
									this.isShowPopover ? this.popperClass : "display-none"
								]
							},
							[this.$slots.content || this.content]
						)
					]
				);
			}

			const firstElement = this.getFirstElement();
			if (!firstElement) return null;

			const data = (firstElement.data = firstElement.data || {});
			data.staticClass = this.addTooltipClass(data.staticClass);

			return firstElement;
		},

		mounted() {
			this.referenceElm = this.$el;
			if (this.$el.nodeType === 1) {
				this.$el.setAttribute("aria-describedby", this.tooltipId);
				this.$el.setAttribute("tabindex", this.tabindex);

				$(this.referenceElm)
					.on("mouseenter", this.show)
					.on("mouseleave", this.hide)
					.on("focus", () => {
						if (!this.$slots.default || !this.$slots.default.length) {
							this.handleFocus();
							return;
						}
						const instance = this.$slots.default[0].componentInstance;
						if (instance && instance.focus) {
							instance.focus();
						} else {
							this.handleFocus();
						}
					})
					.on("blur", this.handleBlur)
					.on("click", this.removeFocusing);
			}
			// fix issue https://github.com/ElemeFE/element/issues/14424
			if (this.value && this.popperVM) {
				this.popperVM.$nextTick(() => {
					if (this.value) {
						this.updatePopper();
					}
				});
			}
		},
		watch: {
			isShowPopover() {
				this.popperVM.$nextTick(() => {
					this.updatePopper();
				});
			},
			focusing(val) {
				if (val) {
					$(this.referenceElm).addClass("focusing");
				} else {
					$(this.referenceElm).removeClass("focusing");
				}
			}
		},
		methods: {
			show() {
				this.setExpectedState(true);
				this.handleShowPopper();
			},

			hide() {
				this.setExpectedState(false);
				this.debounceClose();
			},
			handleFocus() {
				this.focusing = true;
				this.show();
			},
			handleBlur() {
				this.focusing = false;
				this.hide();
			},
			removeFocusing() {
				this.focusing = false;
			},

			addTooltipClass(prev) {
				if (!prev) {
					return "el-tooltip";
				} else {
					return "el-tooltip " + prev.replace("el-tooltip", "");
				}
			},

			handleShowPopper() {
				if (!this.expectedState || this.manual) return;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.showPopper = true;
				}, this.openDelay);

				if (this.hideAfter > 0) {
					this.timeoutPending = setTimeout(() => {
						this.showPopper = false;
					}, this.hideAfter);
				}
			},

			setExpectedState(expectedState) {
				if (expectedState === false) {
					clearTimeout(this.timeoutPending);
				}
				this.expectedState = expectedState;
			},

			getFirstElement() {
				const slots = this.$slots.default;
				if (!Array.isArray(slots)) return null;
				let element = null;
				for (let index = 0; index < slots.length; index++) {
					if (slots[index] && slots[index].tag) {
						element = slots[index];
						break;
					}
				}
				return element;
			}
		},
		computed: {
			isShowPopover() {
				return !this.disabled && this.showPopper;
			}
		},
		beforeDestroy() {
			this.popperVM && this.popperVM.$destroy();
		},

		destroyed() {
			if (this.referenceElm?.nodeType === 1) {
				$(this.referenceElm)
					.off("mouseenter", this.show)
					.off("mouseleave", this.hide)
					.off("focus", this.handleFocus)
					.off("blur", this.handleBlur)
					.off("click", this.removeFocusing);
			}
		}
	});
}
</script>

<style lang="less">
.el-tooltip__popper {
	position: absolute;
	border-radius: var(--border-radius);
	padding: 10px;
	z-index: 2000;
	font-size: 12px;
	line-height: 1.2;
	min-width: 10px;
	word-wrap: break-word;
}

.el-tooltip__popper .popper__arrow,
.el-tooltip__popper .popper__arrow::after {
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
}

.el-tooltip__popper .popper__arrow {
	border-width: 6px;
}

.el-tooltip__popper .popper__arrow::after {
	content: " ";
	border-width: 5px;
}

.el-tooltip__popper[x-placement^="top"] {
	margin-bottom: 12px;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow {
	bottom: -6px;
	border-top-color: var(--el-text-color-primary);
	border-bottom-width: 0;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
	bottom: 1px;
	margin-left: -5px;
	border-top-color: var(--el-text-color-primary);
	border-bottom-width: 0;
}

.el-tooltip__popper[x-placement^="bottom"] {
	margin-top: 12px;
}

.el-tooltip__popper[x-placement^="bottom"] .popper__arrow {
	top: -6px;
	border-top-width: 0;
	border-bottom-color: var(--el-text-color-primary);
}

.el-tooltip__popper[x-placement^="bottom"] .popper__arrow::after {
	top: 1px;
	margin-left: -5px;
	border-top-width: 0;
	border-bottom-color: var(--el-text-color-primary);
}

.el-tooltip__popper[x-placement^="right"] {
	margin-left: 12px;
}

.el-tooltip__popper[x-placement^="right"] .popper__arrow {
	left: -6px;
	border-right-color: var(--el-text-color-primary);
	border-left-width: 0;
}

.el-tooltip__popper[x-placement^="right"] .popper__arrow::after {
	bottom: -5px;
	left: 1px;
	border-right-color: var(--el-text-color-primary);
	border-left-width: 0;
}

.el-tooltip__popper[x-placement^="left"] {
	margin-right: 12px;
}

.el-tooltip__popper[x-placement^="left"] .popper__arrow {
	right: -6px;
	border-right-width: 0;
	border-left-color: var(--el-text-color-primary);
}

.el-tooltip__popper[x-placement^="left"] .popper__arrow::after {
	right: 1px;
	bottom: -5px;
	margin-left: -5px;
	border-right-width: 0;
	border-left-color: var(--el-text-color-primary);
}

.el-tooltip__popper.is-dark {
	background: var(--el-text-color-primary);
	color: #fff;
}

.el-tooltip__popper.is-light {
	background: #fff;
	border: 1px solid var(--el-text-color-primary);
}

.el-tooltip__popper.is-light[x-placement^="top"] .popper__arrow {
	border-top-color: var(--el-text-color-primary);
}

.el-tooltip__popper.is-light[x-placement^="top"] .popper__arrow::after {
	border-top-color: #fff;
}

.el-tooltip__popper.is-light[x-placement^="bottom"] .popper__arrow {
	border-bottom-color: var(--el-text-color-primary);
}

.el-tooltip__popper.is-light[x-placement^="bottom"] .popper__arrow::after {
	border-bottom-color: #fff;
}

.el-tooltip__popper.is-light[x-placement^="left"] .popper__arrow {
	border-left-color: var(--el-text-color-primary);
}

.el-tooltip__popper.is-light[x-placement^="left"] .popper__arrow::after {
	border-left-color: #fff;
}

.el-tooltip__popper.is-light[x-placement^="right"] .popper__arrow {
	border-right-color: var(--el-text-color-primary);
}

.el-tooltip__popper.is-light[x-placement^="right"] .popper__arrow::after {
	border-right-color: #fff;
}
</style>
