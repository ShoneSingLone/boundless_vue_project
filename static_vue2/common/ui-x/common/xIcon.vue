<template>
	<img v-if="cptImg" :src="cptImgSrc" @click="handleClick" :data-origin-img-src="cptImg" />
	<svg
		v-else
		:data-icon-name="cptIconName"
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
		/* 是否开启图片缓存 通过url保存为blob */
		props: {
			icon: String,
			color: String,
			/*  */
			img: String,
			iscache: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			//
			return {
				cachedImgSrc: "",
				isLoaded: false
			};
		},
		computed: {
			cptCurrentImgProp({ cptImg }) {
				return `CACHED_IMG_${_.camelCase(cptImg)}`;
			},

			cptFill() {
				return this.useCurrentColor ? "currentColor" : "inherit";
			},
			useCurrentColor() {
				return _.$isInput(this.$attrs.useCurrentColor) && this.$attrs.useCurrentColor;
			},
			cptNeedRotation() {
				return this.cptHref === "#_svg_icon_loading";
			},
			cptImg() {
				if (this.img) {
					return _.$resolvePath(this.img || this.$attrs.img || "");
				} else {
					return "";
				}
			},
			cptImgSrc({ iscache, cachedImgSrc, cptImg }) {
				if (cachedImgSrc) {
					return cachedImgSrc;
				}

				if (iscache && !cachedImgSrc) {
					return cptImg;
				}
				return cptImg;
			},
			cptIconUrl() {
				const url = _.$resolveSvgIcon(this.cptOriginIconName);
				return _.$resolvePath(url);
			},
			cptColor() {
				return this.color || this.$attrs.color || $(this.$el).css("color") || "inherit";
			},
			cptOriginIconName() {
				return this.icon || this.$attrs.icon || "loading";
			},
			cptIconName() {
				let iconName = this.cptOriginIconName;

				if (/^http/gi.test(iconName)) {
					return _.snakeCase(iconName);
				}
				return iconName;
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
		},
		watch: {
			cptImg: {
				immediate: true,
				handler() {
					this.doCacheImg(this);
				}
			},
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
			async doCacheImg({ cptImg, iscache, cptCurrentImgProp }) {
				if (cptImg && iscache) {
					const cachedImgSrc = await _.$idb.get(cptCurrentImgProp);

					if (!cachedImgSrc) {
						try {
							const blob = await new Promise(resolve => {
								_.$ajax.downloadOctetStream({
									url: cptImg,
									resolveResult: blob => {
										resolve(blob);
									}
								});
							});
							const reader = new FileReader();
							reader.onload = () => {
								const base64Data = reader.result;
								_.$idb.set(cptCurrentImgProp, base64Data);
								this.cachedImgSrc = base64Data;
							};
							reader.readAsDataURL(blob);
						} catch (error) {
							console.error(error);
						}
					}

					this.cachedImgSrc = cachedImgSrc;
				}
			},

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
					// 校验关键变量是否有效
					if (!this.cptSelector || !this.cptIconUrl) {
						console.error("cptSelector 或 cptIconUrl 无效");
						return false;
					}

					let isLoaded = false;

					try {
						const $svg = $(this.cptSelector);

						// 如果目标 SVG 已存在，直接返回成功
						if ($svg.length > 0) {
							isLoaded = true;
						} else {
							/* useXui xIconUseSvgInit 保证 $("#__SVG_SPRITE_NODE__")*/
							// 确保 SVG 容器存在
							const $svgWrapper = $("#__SVG_SPRITE_NODE__");
							if (!$svgWrapper.length) {
								console.error("__SVG_SPRITE_NODE__ 不存在");
								return false;
							}

							// 加载 SVG 内容
							const svgContent = await _.$loadText(this.cptIconUrl);
							if (!svgContent.includes("<svg ")) {
								console.warn("加载的 SVG 内容无效");
								return false;
							}

							// 解析并处理 SVG 内容
							const $svgContent = $(svgContent);
							const width = $svgContent.attr("width") || "";
							const height = $svgContent.attr("height") || "";

							$svgContent
								.attr({
									id: this.cptId,
									fill: "inherit",
									viewBox: width && height ? `0 0 ${width} ${height}` : undefined
								})
								.removeAttr("width")
								.removeAttr("height");

							// 将 SVG 内容追加到容器中
							$svgWrapper.append($svgContent);

							// 如果是加载图标，添加旋转效果
							if (this.cptIconName === "loading") {
								const rotationElement = rotationIndefinite(3);
								if (rotationElement) {
									$svgWrapper.append(rotationElement);
								}
							}

							isLoaded = true;
						}
					} catch (error) {
						console.error("加载 SVG 时发生错误:", error.message);
						return false; // 明确返回失败状态
					}

					return isLoaded;
				})();
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
