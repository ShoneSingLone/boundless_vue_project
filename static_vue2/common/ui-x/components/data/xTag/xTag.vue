<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "ElTag",
		props: {
			text: String,
			closable: Boolean,
			type: String,
			hit: Boolean,
			disableTransitions: Boolean,
			color: String,
			textColor: String,
			size: String,
			effect: {
				type: String,
				default: "light",
				validator(val) {
					return ["dark", "light", "plain", ""].indexOf(val) !== -1;
				}
			}
		},
		methods: {
			handleClose(event) {
				event.stopPropagation();
				this.$emit("close", event);
			},
			handleClick(event) {
				this.$emit("click", event);
			}
		},
		computed: {
			tagSize() {
				return this.size || PRIVATE_GLOBAL.x_ui.size;
			},
			cptStyle() {
				const style = {
					backgroundColor: this.color
				};
				if (this.textColor) {
					style.color = this.textColor;
				}
				return style;
			}
		},
		render(h) {
			let { type, tagSize, hit, effect, cptStyle } = this;
			effect = effect || "empty";
			const classes = [
				"el-tag",
				type ? `el-tag--${type}` : "",
				tagSize ? `el-tag--${tagSize}` : "",
				effect ? `el-tag--${effect}` : "",
				hit && "is-hit"
			];
			const tagEl = h(
				"span",
				{
					class: classes,
					style: cptStyle,
					on: {
						click: this.handleClick
					}
				},
				[
					this.$slots.default,
					h("i", {
						vIf: this.closable,
						class: "el-tag__close el-icon-close",
						on: {
							click: this.handleClose
						}
					})
				]
			);

			return this.disableTransitions
				? tagEl
				: h("transition", { props: { name: "el-zoom-in-center" } }, [tagEl]);
		}
	});
}
</script>
<style lang="less"></style>
