<template>
	<transition :name="transition" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
		<div
			class="el-popover el-popper x-xtips"
			:class="[popperClass, content && 'el-popover--plain']"
			ref="popper"
			v-show="!disabled && showPopper"
			:style="cptStyle"
			role="tooltip"
			:id="tooltipId"
			:aria-hidden="disabled || !showPopper ? 'true' : 'false'">
			<div class="el-popover__title" v-if="title" v-text="title"></div>
			<div ref="refRender">
				<xRender :render="content" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");
	const PopperJS = await _.$appendScript("/common/libs/VuePopper/popper.js", "Popper");

	return defineComponent({
		name: "xPopover",
		watch: {
			visible: {
				immediate: true,
				handler(val) {
					this.showPopper = val;
				}
			},
			showPopper(val) {
				if (this.disabled) {
					return;
				}
				val ? this.$emit("show") : this.$emit("hide");
				val ? this.updatePopper() : this.destroyPopper();
				this.$parent.onPopoverChange[this.refId](val);
			}
		},
		setup(props) {
			const { useResizeObserver } = _useXui;

			let resizerStopper;
			this.popperJsUpdate = _.debounce(() => {
				if (this.popperJS) {
					this.popperJS.update();
					if (!this.opacity) {
						setTimeout(() => {
							this.opacity = 1;
						}, 32);
					}
				}
			}, 100);
			onMounted(() => {
				resizerStopper = useResizeObserver(this.$refs.refRender, ([entry]) => {
					this.popperJsUpdate();
				}).stop;
			});
			onBeforeUnmount(() => {
				resizerStopper?.();
			});
		},
		data() {
			return {
				opacity: 0,
				options: {},
				showPopper: false,
				currentPlacement: ""
			};
		},
		computed: {
			tooltipId() {
				return `el-popover-${this.refId}`;
			},
			trigger() {
				return this.options.trigger || "click";
			},
			openDelay() {
				return this.options.openDelay || 0;
			},
			closeDelay() {
				return this.options.closeDelay || 200;
			},
			title() {
				return this.options.title || "";
			},
			disabled() {
				return this.options.disabled || "";
			},
			content() {
				return this.options.content || "";
			},
			popperClass() {
				return this.options.popperClass || "";
			},
			cptStyle() {
				return {
					...(this.options.style || {}),
					opacity: this.opacity
				};
			},
			arrowOffset() {
				return this.options.arrowOffset || 0;
			},
			transition() {
				if (_.isObject(this.options.content)) {
					return "fade-in-linear";
				}
				return this.options.content || "fade-in-linear";
			},
			tabindex() {
				return this.options.tabindex || 0;
			},
			$reference() {
				return this.options.$reference;
			},
			transformOrigin() {
				return hasOwn(this.options, "transformOrigin") ? this.options.transformOrigin : true;
			},
			placement() {
				return this.options.placement || "bottom";
			},
			boundariesPadding() {
				return this.options.boundariesPadding || 5;
			},
			offset() {
				return this.options.offset || 0;
			},
			visible() {
				return this.options.visible || false;
			},
			visibleArrow() {
				return hasOwn(this.options, "visibleArrow") ? this.options.visibleArrow : true;
			},
			arrowOffset() {
				return this.options.arrowOffset || 35;
			},
			appendToBody() {
				return hasOwn(this.options, "appendToBody") ? this.options.appendToBody : true;
			},
			popperOptions() {
				return (
					this.options.popperOptions || {
						gpuAcceleration: false
					}
				);
			}
		},
		mounted() {
			// 可访问性
			this.$reference
				.addClass("el-popover__reference")
				.attr({
					"aria-describedby": this.tooltipId,
					// tab序列
					tabindex: this.tabindex
				})
				.on("keydown", this.handleKeydown)
				.on("click", this.handleClick);

			const popper = this.popper || this.$refs.popper;
			this.$popper = $(popper);

			this.$popper.attr({ tabindex: 0 });

			if (this.trigger !== "click") {
				this.$reference.on("focusin", this.handleFocus).on("focusout", this.handleBlur);
				this.$popper.on("focusin", this.handleFocus).on("focusout", this.handleBlur);
			}
			if (this.trigger === "click") {
				this.$reference.on("click", this.doToggle);
				_.$single.doc.on("click", this.handleDocumentClick);
			} else if (this.trigger === "hover") {
				this.$reference.on("mouseenter", this.handleMouseEnter).on("mouseleave", this.handleMouseLeave);

				this.$popper.on("mouseenter", this.handleMouseEnter).on("mouseleave", this.handleMouseLeave);
			} else if (this.trigger === "focus") {
				if (this.tabindex < 0) {
					console.warn("[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key");
				}

				if (this.$reference.find("input, textarea").length) {
					this.$reference.on("focusin", this.doShow).on("focusout", this.doClose);
				} else {
					this.$reference.on("mousedown", this.doShow).on("mouseup", this.doClose);
				}
			}
		},
		beforeDestroy() {
			this.cleanup();
		},
		deactivated() {
			this.cleanup();
		},
		methods: {
			createPopper() {
				const options = this.popperOptions;
				const popper = (this.popperElm = this.popperElm || this.popper || this.$refs.popper);
				let reference = this.$reference[0];

				if (!popper || !reference) return;
				if (this.visibleArrow) this.appendArrow(popper);
				if (this.appendToBody) document.body.appendChild(this.popperElm);
				if (this.popperJS && this.popperJS.destroy) {
					this.popperJS.destroy();
				}
				this.currentPlacement = this.currentPlacement || this.placement;

				options.placement = this.currentPlacement;
				options.offset = this.offset;
				options.arrowOffset = this.arrowOffset;
				this.popperJS = new PopperJS(reference, popper, options);
				this.popperJS.onCreate(_ => {
					this.$emit("created", this);
					this.resetTransformOrigin();
					this.$nextTick(this.updatePopper);
				});
				if (typeof options.onUpdate === "function") {
					this.popperJS.onUpdate(options.onUpdate);
				}
				this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
				this.popperElm.addEventListener("click", stop);
			},
			updatePopper() {
				const popperJS = this.popperJS;
				if (popperJS) {
					popperJS.update();
					if (popperJS._popper) {
						popperJS._popper.style.zIndex = PopupManager.nextZIndex();
					}
				} else {
					this.createPopper();
				}
			},

			doDestroy(forceDestroy) {
				/* istanbul ignore if */
				if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
				this.popperJS.destroy();
				this.popperJS = null;
			},

			destroyPopper() {
				if (this.popperJS) {
					this.resetTransformOrigin();
				}
			},

			resetTransformOrigin() {
				if (!this.transformOrigin) return;
				let placementMap = {
					top: "bottom",
					bottom: "top",
					left: "right",
					right: "left"
				};
				let placement = this.popperJS._popper.getAttribute("x-placement").split("-")[0];
				let origin = placementMap[placement];
				this.popperJS._popper.style.transformOrigin =
					typeof this.transformOrigin === "string" ? this.transformOrigin : ["top", "bottom"].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
			},

			appendArrow(element) {
				let hash;
				if (this.appended) {
					return;
				}

				this.appended = true;

				for (let item in element.attributes) {
					if (/^_v-/.test(element.attributes[item].name)) {
						hash = element.attributes[item].name;
						break;
					}
				}

				const arrow = document.createElement("div");

				if (hash) {
					arrow.setAttribute(hash, "");
				}
				arrow.setAttribute("x-arrow", "");
				arrow.className = "popper__arrow";
				element.appendChild(arrow);
			},
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
				this.$reference.addClass("focusing");
				if (this.trigger === "click" || this.trigger === "focus") this.showPopper = true;
			},
			handleClick() {
				this.$reference.removeClass("focusing");
			},
			handleBlur() {
				this.$reference.removeClass("focusing");
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
				let reference = this.$reference[0];
				const popper = this.popper || this.$refs.popper;

				if (!this.$el || !reference || this.$el.contains(e.target) || reference.contains(e.target) || !popper || popper.contains(e.target)) return;
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
		beforeDestroy() {
			this.doDestroy(true);
			if (this.popperElm && this.popperElm.parentNode === document.body) {
				this.popperElm.removeEventListener("click", stop);
				document.body.removeChild(this.popperElm);
			}
		},
		destroyed() {
			this.$reference
				.off("click", this.doToggle)
				.off("mouseup", this.doClose)
				.off("mousedown", this.doShow)
				.off("focusin", this.doShow)
				.off("focusout", this.doClose)
				.off("mousedown", this.doShow)
				.off("mouseup", this.doClose)
				.off("mouseleave", this.handleMouseLeave)
				.off("mouseenter", this.handleMouseEnter);

			_.$single.doc.off("click", this.handleDocumentClick);
		}
	});
}
</script>
<style lang="less">
.el-popover.x-xtips {
	--min-width: unset;
	min-width: var(--min-width);
}
</style>
