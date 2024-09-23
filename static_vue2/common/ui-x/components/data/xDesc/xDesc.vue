<style lang="less">
.xDesc {
	--xItem-label-width: 120px;
}
</style>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	/* 目前是一个弃案 */
	/* @deprecated */
	return defineComponent({
		props: ["itemWidth"],
		provide() {
			const X_DESC = this;
			return {
				X_DESC
			};
		},
		render() {
			return h("xAutoResizer", [
				{
					default: ({ width, height }) => {
						if (width) {
							/* const col = this.getCol(width, Math.ceil(width / this.itemWidth));
							if (this.col != col) {
								this.col = col;
							} */
							return h("xForm", { staticClass: "xDesc" }, this.$slots.default);
						}
					}
				}
			]);
		}
	});
}
</script>
