<script lang="ts">
export default async function () {
	const { addResizeListener, removeResizeListener } =
		await _.$importVue("/common/utils/utils.vue");
	const scrollbarWidth = await _.$importVue(
		"/common/ui-x/components/other/xScrollbar/scrollbarWidth.vue"
	);

	return defineComponent({
		name: "xScrollbar",
		components: { Bar: () => _.$importVue("/common/ui-x/components/other/xScrollbar/Bar.vue") },
		props: {
			vertical: {
				type: Boolean,
				default: true
			},
			native: Boolean,
			wrapStyle: {},
			wrapClass: {},
			viewClass: {},
			viewStyle: {},
			noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
			tag: {
				type: String,
				default: "div"
			}
		},
		data() {
			return {
				sizeWidth: "0",
				sizeHeight: "0",
				moveX: 0,
				moveY: 0
			};
		},
		computed: {
			wrap() {
				return this.$refs.wrap;
			}
		},
		render(h) {
			let gutter = scrollbarWidth();
			let style = this.wrapStyle;

			if (gutter) {
				const gutterWith = `-${gutter}px`;
				const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

				if (Array.isArray(this.wrapStyle)) {
					style = Vue.toObject(this.wrapStyle);
					style.marginRight = style.marginBottom = gutterWith;
				} else if (typeof this.wrapStyle === "string") {
					style += gutterStyle;
				} else {
					style = gutterStyle;
				}
			}
			const view = h(
				this.tag,
				{
					class: ["el-scrollbar__view", this.viewClass],
					style: this.viewStyle,
					ref: "resize"
				},
				this.$slots.default
			);

			const wrap = h(
				this.tag,
				{
					ref: "wrap",
					class: [
						this.wrapClass,
						"el-scrollbar__wrap",
						gutter ? "" : "el-scrollbar__wrap--hidden-default"
					],
					style,
					onScroll: this.handleScroll
				},
				[view]
			);

			let nodes;
			if (!this.native) {
				nodes = [
					/* body */
					wrap,
					/* horizon */
					h("Bar", { size: this.sizeWidth, move: this.moveX }),
					/* vertical */
					h("Bar", { vertical: this.vertical, size: this.sizeHeight, move: this.moveY })
				];
			} else {
				nodes = [
					h(
						"div",
						{
							class: [this.wrapClass, "el-scrollbar__wrap"],
							style,
							ref: "wrap"
						},
						[view]
					)
				];
			}
			return hDiv({ class: "el-scrollbar" }, nodes);
		},

		methods: {
			handleScroll() {
				const wrap = this.wrap;

				this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
				this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
			},

			update() {
				let heightPercentage, widthPercentage;
				const wrap = this.wrap;
				if (!wrap) return;

				heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
				widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

				this.sizeHeight = heightPercentage < 100 ? heightPercentage + "%" : "";
				this.sizeWidth = widthPercentage < 100 ? widthPercentage + "%" : "";
			}
		},

		mounted() {
			if (this.native) return;
			this.$nextTick(this.update);

			!this.noresize && addResizeListener(this.$refs.resize, this.update);
		},

		beforeDestroy() {
			if (this.native) return;
			!this.noresize && removeResizeListener(this.$refs.resize, this.update);
		}
	});
}
</script>
<style lang="less">
.el-scrollbar {
	overflow: hidden;
	position: relative;
}

.el-scrollbar:active > .el-scrollbar__bar,
.el-scrollbar:focus > .el-scrollbar__bar,
.el-scrollbar:hover > .el-scrollbar__bar {
	opacity: 1;
	-webkit-transition: opacity 340ms ease-out;
	transition: opacity 340ms ease-out;
}

.el-scrollbar__wrap {
	overflow: scroll;
	height: 100%;
}

.el-scrollbar__wrap--hidden-default {
	scrollbar-width: none;
}

.el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
	width: 0;
	height: 0;
}

.el-scrollbar__bar {
	position: absolute;
	right: 2px;
	bottom: 2px;
	z-index: 1;
	border-radius: var(--border-radius);
	opacity: 0;
	transition: opacity 120ms ease-out;
}

.el-scrollbar__bar.is-vertical {
	width: 6px;
	top: 2px;
}

.el-scrollbar__bar.is-vertical > div {
	width: 100%;
}

.el-scrollbar__bar.is-horizontal {
	height: 6px;
	left: 2px;
}

.el-scrollbar__bar.is-horizontal > div {
	height: 100%;
}
</style>
