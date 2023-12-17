<template>
	<img v-if="cpt_imgURL" :src="cpt_imgURL" />
	<svg v-else :class="['xIcon', cpt_iconName]" v-bind="$attrs" @click="handleClick">
		<use :xlink:href="cpt_href"></use>
	</svg>
</template>
<script>
export default async function () {
	/* icon对应 /assets/svg 文件夹下的文件名*/
	/* color 可以改变svg color 没有就继承父元素的color */
	return {
		props: ["icon"],
		data() {
			//
			return {
				isLoad: false
			};
		},
		watch: {
			cpt_iconName: {
				immediate: true,
				handler() {
					this.loadSVG();
				}
			}
		},
		methods: {
			handleClick(event) {
				if (this.$listeners.click) {
					this.$listeners.click(event);
				}
			},
			async loadSVG() {
				try {
					const $svg = $(this.cpt_selector);
					if ($svg.length !== 1) {
						/*  */
						/* useXui xIconUseSvgInit 保证 $("#__SVG_SPRITE_NODE__")*/
						const $svgWrapper = $("#__SVG_SPRITE_NODE__");
						const svgContent = await _.$loadText(this.cpt_iconURL);
						const $svgContent = $(svgContent)
							.attr({
								id: this.cpt_id,
								fill: "inherit"
							})
							.removeAttr("width")
							.removeAttr("height");
						$svgWrapper.append($svgContent);
					}

					this.$watch(
						"cptColor",
						() => {
							$(this.$el).css("color", this.cptColor);
						},
						{ immediate: true }
					);
					this.isLoad = true;
				} catch (error) {
					console.error(error);
				}
			}
		},
		computed: {
			cpt_imgURL() {
				if (this.$attrs.img) {
					return _.$resolvePath(this.$attrs.img);
				} else {
					return "";
				}
			},
			cpt_iconURL() {
				let url = `/common/assets/svg/${this.cpt_iconName}.svg`;
				if (/^_/.test(this.cpt_iconName)) {
					iconName = String(this.cpt_iconName).replace(/^_/, "");
					url = `@/assets/svg/${iconName}.svg`;
				}
				return _.$resolvePath(url);
			},
			cptColor() {
				let iconColor = this.$attrs.color || "inherit";
				return iconColor;
			},
			cpt_iconName() {
				let iconName = this.icon || this.$attrs.icon || "loading";
				return iconName;
			},
			cpt_href() {
				if (!this.isLoad) {
					return "#_svg_icon_loading";
				}
				return this.cpt_selector;
			},
			cpt_selector() {
				return `#_svg_icon_${this.cpt_iconName}`;
			},
			cpt_id() {
				return `_svg_icon_${this.cpt_iconName}`;
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
