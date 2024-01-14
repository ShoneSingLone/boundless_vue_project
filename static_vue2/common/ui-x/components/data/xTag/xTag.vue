<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElTag",
		props: {
			text: String,
			closable: Boolean,
			type: String,
			hit: Boolean,
			disableTransitions: Boolean,
			color: String,
			size: String,
			effect: {
				type: String,
				default: "light",
				validator(val) {
					return ["dark", "light", "plain"].indexOf(val) !== -1;
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
				return this.size || (this.$ELEMENT || {}).size;
			}
		},
		render(h) {
			const { type, tagSize, hit, effect } = this;
			const classes = ["el-tag", type ? `el-tag--${type}` : "", tagSize ? `el-tag--${tagSize}` : "", effect ? `el-tag--${effect}` : "", hit && "is-hit"];
			const tagEl = h(
				"span",
				{
					class: classes,
					style: {
						backgroundColor: this.color
					},
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

			return this.disableTransitions ? tagEl : h("transition", { props: { name: "el-zoom-in-center" } }, [tagEl]);
		}
	});
}
</script>
<style lang="less"></style>
