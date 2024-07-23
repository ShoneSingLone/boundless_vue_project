<style lang="less">
.xDrawer {
	z-index: var(--xDrawerZIndex, 1);
	&::before {
		content: " ";
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000;
		opacity: 0.5;
	}
}
</style>
<template>
	<transition name="el-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave">
		<div
			class="el-drawer__wrapper xDrawer"
			tabindex="-1"
			v-show="visible"
			:style="cptDrawerWrapperStyle">
			<div
				:class="cptDrawerContainerClass"
				@click.self="handleWrapperClick"
				role="document"
				tabindex="-1">
				<div
					aria-modal="true"
					aria-labelledby="el-drawer__title"
					:aria-label="title"
					class="el-drawer"
					:class="[direction, customClass]"
					:style="cptStyle"
					ref="drawer"
					role="dialog"
					tabindex="-1">
					<header class="el-drawer__header" id="el-drawer__title" v-if="withHeader">
						<slot name="title">
							<span role="heading" :title="title">{{ title }}</span>
						</slot>
						<button
							:aria-label="cptAriaLabel"
							class="el-drawer__close-btn"
							type="button"
							v-if="showClose"
							@click="closeDrawer">
							<i class="el-dialog__close el-icon el-icon-close"></i>
						</button>
					</header>
					<section class="el-drawer__body beautiful-scroll">
						<slot>
							<component :is="currentContentComponent" />
						</slot>
					</section>
				</div>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");
	return defineComponent({
		name: "ElDrawer",
		mixins: [Popper],
		props: {
			appendToBody: {
				type: Boolean,
				default: true
			},
			beforeClose: {
				type: Function
			},
			customClass: {
				type: String,
				default: ""
			},
			closeOnPressEscape: {
				type: Boolean,
				default: true
			},
			destroyOnClose: {
				type: Boolean,
				default: false
			},
			modal: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: "rtl",
				validator(val) {
					return ["ltr", "rtl", "ttb", "btt"].indexOf(val) !== -1;
				}
			},
			modalAppendToBody: {
				type: Boolean,
				default: true
			},
			showClose: {
				type: Boolean,
				default: true
			},
			size: {
				type: [Number, String],
				default: "30%"
			},
			title: {
				type: String,
				default: ""
			},
			visible: {
				type: Boolean
			},
			wrapperClosable: {
				type: Boolean,
				default: true
			},
			withHeader: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			cptDrawerWrapperStyle() {
				return `--xDrawerZIndex: ${this.viewerZIndex}`;
			},
			cptDrawerContainerClass() {
				return {
					"el-drawer__container": true,
					"el-drawer__open": this.visible
				};
			},
			cptAriaLabel() {
				return `close ${this.title || "drawer"}`;
			},
			cptStyle() {
				const { isHorizontal, drawerSize } = this;
				return isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`;
			},
			isHorizontal() {
				return this.direction === "rtl" || this.direction === "ltr";
			},
			drawerSize() {
				return typeof this.size === "number" ? `${this.size}px` : this.size;
			}
		},
		data() {
			return {
				viewerZIndex: 1,
				rendered: false,
				closed: false,
				prevActiveElement: null,
				currentContentComponent: "div"
			};
		},
		watch: {
			visible(val) {
				if (val) {
					this.closed = false;
					this.$emit("open");
					if (this.appendToBody) {
						document.body.appendChild(this.$el);
					}
					this.prevActiveElement = document.activeElement;
				} else {
					if (!this.closed) {
						this.$emit("close");
						if (this.destroyOnClose === true) {
							this.rendered = false;
						}
					}
					this.$nextTick(() => {
						if (this.prevActiveElement) {
							this.prevActiveElement.focus();
						}
					});
				}
			}
		},
		methods: {
			afterEnter() {
				this.$emit("opened");
			},
			afterLeave() {
				this.$emit("closed");
			},
			hide(cancel) {
				if (cancel !== false) {
					this.$emit("update:visible", false);
					this.$emit("close");
					if (this.destroyOnClose === true) {
						this.rendered = false;
					}
					this.closed = true;
				}
			},
			handleWrapperClick() {
				if (this.wrapperClosable) {
					this.closeDrawer();
				}
			},
			closeDrawer() {
				if (typeof this.beforeClose === "function") {
					this.beforeClose(this.hide);
				} else {
					this.hide();
				}
			},
			handleClose() {
				// This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
				// pressing `ESC` will call this method, and also close the drawer.
				// This method also calls `beforeClose` if there was one.
				this.closeDrawer();
			}
		},
		mounted() {
			if (this.visible) {
				this.rendered = true;
				if (this.appendToBody) {
					document.body.appendChild(this.$el);
				}
			}
		},
		destroyed() {
			// if appendToBody is true, remove DOM node after destroy
			if (this.appendToBody && this.$el && this.$el.parentNode) {
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	});
}
</script>
