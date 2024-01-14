<script lang="ts">
export default async function () {
	const BAR_MAP = {
		vertical: {
			offset: "offsetHeight",
			scroll: "scrollTop",
			scrollSize: "scrollHeight",
			size: "height",
			key: "vertical",
			axis: "Y",
			client: "clientY",
			direction: "top"
		},
		horizontal: {
			offset: "offsetWidth",
			scroll: "scrollLeft",
			scrollSize: "scrollWidth",
			size: "width",
			key: "horizontal",
			axis: "X",
			client: "clientX",
			direction: "left"
		}
	};

	return defineComponent({
		name: "Bar",
		props: {
			vertical: Boolean,
			size: String,
			move: Number
		},
		computed: {
			height() {
				return this.$parent.sizeHeight;
			},
			width() {
				return this.$parent.sizeWidth;
			},
			bar() {
				const type = this.vertical ? "vertical" : "horizontal";
				return BAR_MAP[type];
			},
			wrap() {
				return this.$parent.wrap;
			}
		},

		render(h) {
			const { size, move, bar } = this;
			const style = this.renderThumbStyle({ size, move, bar });

			return h(
				"div",
				{
					class: ["el-scrollbar__bar", "is-" + bar.key],
					on: {
						mousedown: this.clickTrackHandler
					}
				},
				[
					h("div", {
						ref: "thumb",
						class: "el-scrollbar__thumb",
						style,
						on: {
							mousedown: this.clickThumbHandler
						}
					})
				]
			);
		},

		methods: {
			renderThumbStyle({ move, bar }) {
				const style = {};
				const translate = `translate${bar.axis}(${move}%)`;
				if (bar.size === "height") {
					style.height = this.height;
				} else {
					style.width = this.width;
				}
				style.transform = translate;
				style.msTransform = translate;
				style.webkitTransform = translate;

				return style;
			},
			clickThumbHandler(e) {
				// prevent click event of right button
				if (e.ctrlKey || e.button === 2) {
					return;
				}
				this.startDrag(e);
				this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
			},

			clickTrackHandler(e) {
				const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
				const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
				const thumbPositionPercentage = ((offset - thumbHalf) * 100) / this.$el[this.bar.offset];

				this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
			},

			startDrag(e) {
				e.stopImmediatePropagation();
				this.cursorDown = true;

				$(document).on("mousemove", this.mouseMoveDocumentHandler).on("mouseup", this.mouseUpDocumentHandler);

				document.onselectstart = () => false;
			},

			mouseMoveDocumentHandler(e) {
				if (this.cursorDown === false) return;
				const prevPage = this[this.bar.axis];

				if (!prevPage) return;

				const offset = (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1;
				const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
				const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset];

				this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
			},

			mouseUpDocumentHandler(e) {
				this.cursorDown = false;
				this[this.bar.axis] = 0;
				$(document).off("mousemove", this.mouseMoveDocumentHandler);
				document.onselectstart = null;
			}
		},

		destroyed() {
			$(document).off("mouseup", this.mouseUpDocumentHandler);
		}
	});
}
</script>
