<style lang="less"></style>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xRow",
		componentName: "xRow",
		props: {
			tag: {
				type: String,
				default: "div"
			},
			gutter: Number,
			type: String,
			justify: {
				type: String,
				default: "start"
			},
			align: String
		},
		computed: {
			style() {
				const ret = {};

				if (this.gutter) {
					ret.marginLeft = `-${this.gutter / 2}px`;
					ret.marginRight = ret.marginLeft;
				}

				return ret;
			}
		},

		render(h) {
			return h(
				this.tag,
				{
					class: [
						"el-row xRow",
						this.justify !== "start" ? `is-justify-${this.justify}` : "",
						this.align ? `is-align-${this.align}` : "",
						{ "el-row--flex": this.type === "flex" }
					],
					style: this.style
				},
				this.$slots.default
			);
		}
	});
}
</script>
