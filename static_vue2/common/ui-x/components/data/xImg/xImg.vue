<style lang="less"></style>
<template>
	<div class="el-image">
		<slot v-if="loading" name="placeholder">
			<div class="el-image__placeholder"></div>
		</slot>
		<slot v-else-if="error" name="error">
			<div class="el-image__error">{{ i18n("el.image.error") }}</div>
		</slot>
		<img
			v-else
			class="el-image__inner"
			v-bind="$attrs"
			v-on="$listeners"
			@click="clickHandler"
			:src="src"
			:style="imageStyle"
			:class="{
				'el-image__inner--center': alignCenter,
				'el-image__preview': preview
			}" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;
	const ObjectFit = {
		NONE: "none",
		CONTAIN: "contain",
		COVER: "cover",
		FILL: "fill",
		SCALE_DOWN: "scale-down"
	};

	const getStyle = function (element, styleName) {
		if (!element || !styleName) return null;
		styleName = _.camelCase(styleName);
		if (styleName === "float") {
			styleName = "cssFloat";
		}
		try {
			var computed = document.defaultView.getComputedStyle(element, "");
			return element.style[styleName] || computed ? computed[styleName] : null;
		} catch (e) {
			return element.style[styleName];
		}
	};

	const isScroll = (el, vertical = false) => {
		const determinedDirection = vertical !== null && vertical !== undefined;
		const overflow = determinedDirection ? (vertical ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x")) : getStyle(el, "overflow");

		return overflow.match(/(scroll|auto|overlay)/);
	};

	const isInContainer = (el, container) => {
		const elRect = el.getBoundingClientRect();
		let containerRect;

		if ([window, document, document.documentElement, null, undefined].includes(container)) {
			containerRect = {
				top: 0,
				right: window.innerWidth,
				bottom: window.innerHeight,
				left: 0
			};
		} else {
			containerRect = container.getBoundingClientRect();
		}

		return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
	};

	const getScrollContainer = (el, vertical = false) => {
		let parent = el;
		while (parent) {
			if ([window, document, document.documentElement].includes(parent)) {
				return window;
			}
			if (isScroll(parent, vertical)) {
				return parent;
			}
			parent = parent.parentNode;
		}

		return parent;
	};

	function isHtmlElement(node) {
		return node && node.nodeType === Node.ELEMENT_NODE;
	}

	const SCROLL = "scroll.xImgVue";

	return defineComponent({
		name: "xImg",
		inheritAttrs: false,
		props: {
			src: String,
			fit: String,
			lazy: Boolean,
			scrollContainer: {},
			previewSrcList: {
				type: Array,
				default: () => []
			},
			initialIndex: Number
		},

		data() {
			return {
				loading: true,
				error: false,
				show: !this.lazy,
				imageWidth: 0,
				imageHeight: 0
			};
		},

		computed: {
			imageStyle() {
				const { fit } = this;
				if (!this.$isServer && fit) {
					return isSupportObjectFit() ? { "object-fit": fit } : this.getImageStyle(fit);
				}
				return {};
			},
			alignCenter() {
				return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
			},
			preview() {
				const { previewSrcList } = this;
				return Array.isArray(previewSrcList) && previewSrcList.length > 0;
			},
			imageIndex() {
				let previewIndex = 0;
				const initialIndex = this.initialIndex;
				if (initialIndex >= 0) {
					previewIndex = initialIndex;
					return previewIndex;
				}
				const srcIndex = this.previewSrcList.indexOf(this.src);
				if (srcIndex >= 0) {
					previewIndex = srcIndex;
					return previewIndex;
				}
				return previewIndex;
			}
		},

		watch: {
			src(val) {
				this.show && this.loadImage();
			},
			show(val) {
				val && this.loadImage();
			}
		},

		mounted() {
			if (this.lazy) {
				this.addLazyLoadListener();
			} else {
				this.loadImage();
			}
		},

		beforeDestroy() {
			this.lazy && this.removeLazyLoadListener();
		},

		methods: {
			loadImage() {
				if (this.$isServer) return;

				// reset status
				this.loading = true;
				this.error = false;

				const img = new Image();
				img.onload = e => this.handleLoad(e, img);
				img.onerror = this.handleError.bind(this);

				// bind html attrs
				// so it can behave consistently
				Object.keys(this.$attrs).forEach(key => {
					const value = this.$attrs[key];
					img.setAttribute(key, value);
				});
				img.src = this.src;
			},
			handleLoad(e, img) {
				this.imageWidth = img.width;
				this.imageHeight = img.height;
				this.loading = false;
				this.error = false;
			},
			handleError(e) {
				this.loading = false;
				this.error = true;
				this.$emit("error", e);
			},
			handleLazyLoad() {
				if (isInContainer(this.$el, this._scrollContainer)) {
					this.show = true;
					this.removeLazyLoadListener();
				}
			},
			addLazyLoadListener() {
				if (this.$isServer) return;

				const { scrollContainer } = this;
				let _scrollContainer = null;

				if (isHtmlElement(scrollContainer)) {
					_scrollContainer = scrollContainer;
				} else if (_.isString(scrollContainer)) {
					_scrollContainer = document.querySelector(scrollContainer);
				} else {
					_scrollContainer = getScrollContainer(this.$el);
				}

				if (_scrollContainer) {
					this._scrollContainer = _scrollContainer;
					this._lazyLoadHandler = _.throttle(this.handleLazyLoad, 200);
					$(_scrollContainer).on(SCROLL, this._lazyLoadHandler);
					this.handleLazyLoad();
				}
			},
			removeLazyLoadListener() {
				const { _scrollContainer, _lazyLoadHandler } = this;
				if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;
				$(_scrollContainer).off(SCROLL, _lazyLoadHandler);
				this._scrollContainer = null;
				this._lazyLoadHandler = null;
			},
			/**
			 * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
			 */
			getImageStyle(fit) {
				const { imageWidth, imageHeight } = this;
				const { clientWidth: containerWidth, clientHeight: containerHeight } = this.$el;

				if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

				const imageAspectRatio = imageWidth / imageHeight;
				const containerAspectRatio = containerWidth / containerHeight;

				if (fit === ObjectFit.SCALE_DOWN) {
					const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
					fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
				}

				switch (fit) {
					case ObjectFit.NONE:
						return { width: "auto", height: "auto" };
					case ObjectFit.CONTAIN:
						return imageAspectRatio < containerAspectRatio ? { width: "auto" } : { height: "auto" };
					case ObjectFit.COVER:
						return imageAspectRatio < containerAspectRatio ? { height: "auto" } : { width: "auto" };
					default:
						return {};
				}
			},
			clickHandler() {
				// don't show viewer when preview is false
				if (!this.preview) {
					return;
				} else {
					_.$previewImgs({
						urlList: this.previewSrcList,
						index: this.imageIndex
					});
				}
			}
		}
	});
}
</script>
