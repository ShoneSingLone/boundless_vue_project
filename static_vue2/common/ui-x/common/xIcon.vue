<template>
	<img v-if="cptImgUrl" :src="cptImgUrl" />
	<svg
		v-else
		:class="['xIcon', cptIconName]"
		v-bind="$attrs"
		@click="handleClick"
		:fill="cptFill">
		<use :xlink:href="cptHref" />
		<animateTransform
			attributeName="transform"
			type="rotate"
			from="0 0 0"
			to="360 0 0"
			dur="3s"
			repeatCount="indefinite"
			v-if="cptNeedRotation" />
	</svg>
</template>
<script lang="ts">
export default async function () {
	/* icon对应 /assets/svg 文件夹下的文件名*/
	/* color 可以改变svg color 没有就继承父元素的color */
	const rotationIndefinite = (dur = 1.2) =>
		`<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${dur}s" repeatCount="indefinite" />`;
	return {
		props: ["icon", "color"],
		data() {
			//
			return {
				isLoaded: false
			};
		},
		watch: {
			cptIconName: {
				immediate: true,
				handler(iconName) {
					this.loadSVG();
				}
			},
			cptColor: {
				immediate: true,
				handler(cptColor) {
					this.resetIconColor();
				}
			}
		},
		methods: {
			resetIconColor() {
				// $(this.$el).css("color", this.cptColor);
			},
			handleClick(event) {
				if (this.$listeners.click) {
					this.$listeners.click(event);
				}
			},
			async loadSVG() {
				this.isLoaded = await (async () => {
					let isLoaded;
					try {
						const $svg = $(this.cptSelector);
						if ($svg.length === 0) {
							/*  */
							/* useXui xIconUseSvgInit 保证 $("#__SVG_SPRITE_NODE__")*/
							const $svgWrapper = $("#__SVG_SPRITE_NODE__");
							const svgContent = await _.$loadText(this.cptIconUrl);
							if (svgContent.includes("<svg ")) {
								const $svgContent = $(svgContent);
								const width = $svgContent.attr("width");
								const height = $svgContent.attr("height");

								$svgContent
									.attr({
										id: this.cptId,
										fill: "inherit"
									})
									.removeAttr("width")
									.removeAttr("height");

								if (width && height) {
									$svgContent.attr({
										viewBox: `0 0 ${width} ${height}`
									});
								}
								$svgWrapper.append($svgContent);
								if (this.cptIconName === "loading") {
									/* 需要旋转 */
									$svgWrapper.append(rotationIndefinite(3));
								}
								isLoaded = true;
							} else {
								isLoaded = false;
							}
						} else {
							isLoaded = true;
						}
					} catch (error) {
						console.warn(error);
					}
					return isLoaded;
				})();
			}
		},
		computed: {
			cptFill() {
				return this.useCurrentColor ? "currentColor" : "inherit";
			},
			useCurrentColor() {
				return _.$isInput(this.$attrs.useCurrentColor) && this.$attrs.useCurrentColor;
			},
			cptNeedRotation() {
				return this.cptHref === "#_svg_icon_loading";
			},
			cptImgUrl() {
				if (this.$attrs.img) {
					return _.$resolvePath(this.$attrs.img);
				} else {
					return "";
				}
			},
			cptIconUrl() {
				const url = _.$resolveSvgIcon(this.cptIconName);
				return _.$resolvePath(url);
			},
			cptColor() {
				return this.color || this.$attrs.color || $(this.$el).css("color") || "inherit";
			},
			cptIconName() {
				return this.icon || this.$attrs.icon || "loading";
			},
			cptHref() {
				if (!this.isLoaded) {
					return "#_svg_icon_loading";
				}
				return this.cptSelector;
			},
			cptSelector() {
				return `#_svg_icon_${this.cptIconName}`;
			},
			cptId() {
				return `_svg_icon_${this.cptIconName}`;
			}
		}
	};
}
</script>

<style lang="less">
.xIcon {
	display: inline-block;
	width: 16px;
	height: 16px;
}
</style>
