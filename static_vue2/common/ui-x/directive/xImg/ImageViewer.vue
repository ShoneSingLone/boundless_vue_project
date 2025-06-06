<template>
	<transition name="viewer-fade">
		<div
			tabindex="-1"
			ref="el-image-viewer__wrapper"
			class="el-image-viewer__wrapper"
			:style="{ 'z-index': viewerZIndex }">
			<div
				class="el-image-viewer__mask"
				@click.self="handleMaskClick"
				:style="styleViewerMask"></div>
			<!-- CLOSE -->
			<span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
				<xIcon class="el-icon-close" icon="icon_close" />
			</span>
			<!-- ARROW -->
			<template v-if="!isSingle">
				<span
					class="el-image-viewer__btn el-image-viewer__prev"
					:class="{ 'is-disabled': !infinite && isFirst }"
					@click="prev">
					<xIcon class="el-icon-arrow-left" icon="arrow-left" />
				</span>
				<span
					class="el-image-viewer__btn el-image-viewer__next"
					:class="{ 'is-disabled': !infinite && isLast }"
					@click="next">
					<xIcon class="el-icon-arrow-right" icon="arrow-right" />
				</span>
			</template>
			<!-- ACTIONS -->
			<div class="el-image-viewer__btn el-image-viewer__actions">
				<div class="el-image-viewer__actions__inner">
					<xIcon
						class="el-icon-zoom-out"
						icon="zoom-out"
						@click="handleActions('zoomOut')"></xIcon>
					<xIcon
						class="el-icon-zoom-in"
						icon="zoom-in"
						@click="handleActions('zoomIn')"></xIcon>
					<xIcon :class="mode.icon" :icon="mode.icon" @click="toggleMode"></xIcon>
					<xIcon
						class="el-icon-refresh-left"
						icon="refresh-left"
						@click="handleActions('anticlocelise')"></xIcon>
					<xIcon
						class="el-icon-refresh-right"
						icon="refresh-right"
						@click="handleActions('clocelise')"></xIcon>
				</div>
			</div>
			<!-- CANVAS -->
			<div class="el-image-viewer__canvas">
				<img
					ref="img"
					class="el-image-viewer__img"
					:src="currentImg"
					:style="imgStyle"
					@load="handleImgLoad"
					@error="handleImgError"
					@mousedown="handleMouseDown" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	let prevOverflow = "";

	const KEY_DOWN = "keydown.xImgVue";
	const MOUSE_WHEEL = "mousewheel.xImgVue";
	const MOUSE_MOVE = "mousemove.xImgVue";
	const MOUSE_UP = "mouseup.xImgVue";

	const Mode = {
		CONTAIN: {
			name: "contain",
			icon: "full-screen"
		},
		ORIGINAL: {
			name: "original",
			icon: "scale-to-original"
		}
	};

	return defineComponent({
		name: "xImageViewer",
		data() {
			return {
				index: 0,
				urlList: [],
				styleViewerMask: {},
				zIndex: 0,
				onSwitch: () => {},
				onClose: () => {},
				appendToBody: true,
				maskClosable: true,
				viewerZIndex: 0,
				isShow: false,
				infinite: true,
				loading: false,
				mode: Mode.CONTAIN,
				transform: {
					scale: 1,
					deg: 0,
					offsetX: 0,
					offsetY: 0,
					enableTransition: false
				}
			};
		},
		computed: {
			isSingle() {
				return this.urlList.length <= 1;
			},
			isFirst() {
				return this.index === 0;
			},
			isLast() {
				return this.index === this.urlList.length - 1;
			},
			currentImg() {
				return this.urlList[this.index];
			},
			imgStyle() {
				const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
				const style = {
					transform: `scale(${scale}) rotate(${deg}deg)`,
					transition: enableTransition ? "transform .3s" : "",
					"margin-left": `${offsetX}px`,
					"margin-top": `${offsetY}px`
				};
				if (this.mode === Mode.CONTAIN) {
					style.maxWidth = style.maxHeight = "80%";
				}
				return style;
			}
		},
		watch: {
			index: {
				handler: function (val) {
					this.reset();
					this.onSwitch(val);
				}
			},
			currentImg(val) {
				this.$nextTick(_ => {
					const $img = this.$refs.img;
					if (!$img.complete) {
						this.loading = true;
					}
				});
			}
		},
		methods: {
			hide() {
				this.deviceSupportUninstall();
				this.onClose();
				setTimeout(() => {
					this.$destroy();
				}, 100);
			},
			deviceSupportInstall() {
				this._keyDownHandler = e => {
					e.stopPropagation();
					const keyCode = e.keyCode;
					switch (keyCode) {
						// ESC
						case 27:
							this.hide();
							break;
						// SPACE
						case 32:
							this.toggleMode();
							break;
						// LEFT_ARROW
						case 37:
							this.prev();
							break;
						// UP_ARROW
						case 38:
							this.handleActions("zoomIn");
							break;
						// RIGHT_ARROW
						case 39:
							this.next();
							break;
						// DOWN_ARROW
						case 40:
							this.handleActions("zoomOut");
							break;
					}
				};
				this._mouseWheelHandler = _.$rafThrottle(({ originalEvent: e }) => {
					const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
					if (delta > 0) {
						this.handleActions("zoomIn", {
							zoomRate: 0.015,
							enableTransition: false
						});
					} else {
						this.handleActions("zoomOut", {
							zoomRate: 0.015,
							enableTransition: false
						});
					}
				});
				_.$single.doc
					.on(KEY_DOWN, this._keyDownHandler)
					.on(MOUSE_WHEEL, this._mouseWheelHandler);
			},
			deviceSupportUninstall() {
				_.$single.doc
					.off(KEY_DOWN, this._keyDownHandler)
					.off(MOUSE_WHEEL, this._mouseWheelHandler);
				this._keyDownHandler = null;
				this._mouseWheelHandler = null;
			},
			handleImgLoad(e) {
				this.loading = false;
			},
			handleImgError(e) {
				this.loading = false;
				e.target.alt = i18n("el.image.error");
			},
			handleMouseDown(e) {
				if (this.loading || e.button !== 0) return;

				const { offsetX, offsetY } = this.transform;
				const startX = e.pageX;
				const startY = e.pageY;
				this._dragHandler = _.$rafThrottle(ev => {
					this.transform.offsetX = offsetX + ev.pageX - startX;
					this.transform.offsetY = offsetY + ev.pageY - startY;
				});
				_.$single.doc.on(MOUSE_MOVE, this._dragHandler).on(MOUSE_UP, ev => {
					_.$single.doc.off(MOUSE_MOVE, this._dragHandler);
				});

				e.preventDefault();
			},
			handleMaskClick() {
				if (this.maskClosable) {
					this.hide();
				}
			},
			reset() {
				this.transform = {
					scale: 1,
					deg: 0,
					offsetX: 0,
					offsetY: 0,
					enableTransition: false
				};
			},
			toggleMode() {
				if (this.loading) return;

				const modeNames = Object.keys(Mode);
				const modeValues = Object.values(Mode);
				const index = modeValues.indexOf(this.mode);
				const nextIndex = (index + 1) % modeNames.length;
				this.mode = Mode[modeNames[nextIndex]];
				this.reset();
			},
			prev() {
				if (this.isFirst && !this.infinite) return;
				const len = this.urlList.length;
				this.index = (this.index - 1 + len) % len;
			},
			next() {
				if (this.isLast && !this.infinite) return;
				const len = this.urlList.length;
				this.index = (this.index + 1) % len;
			},
			handleActions(action, options = {}) {
				if (this.loading) return;
				const { zoomRate, rotateDeg, enableTransition } = {
					zoomRate: 0.2,
					rotateDeg: 90,
					enableTransition: true,
					...options
				};
				const { transform } = this;
				switch (action) {
					case "zoomOut":
						if (transform.scale > 0.2) {
							transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
						}
						break;
					case "zoomIn":
						transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
						break;
					case "clocelise":
						transform.deg += rotateDeg;
						break;
					case "anticlocelise":
						transform.deg -= rotateDeg;
						break;
				}
				transform.enableTransition = enableTransition;
			}
		},
		mounted() {
			this.deviceSupportInstall();
			if (this.appendToBody) {
				document.body.appendChild(this.$el);
			}
			// add tabindex then wrapper can be focusable via Javascript
			// focus wrapper so arrow key can't cause inner scroll behavior underneath
			this.$refs["el-image-viewer__wrapper"].focus();

			// prevent body scroll
			prevOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
		},
		destroyed() {
			document.body.style.overflow = prevOverflow;
			// if appendToBody is true, remove DOM node after destroy
			if (this.appendToBody && this.$el && this.$el.parentNode) {
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	});
}
</script>
