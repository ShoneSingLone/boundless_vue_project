<style lang="less"></style>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElTimeline",
		props: {
			reverse: {
				type: Boolean,
				default: false
			}
		},
		provide() {
			return {
				timeline: this
			};
		},
		render() {
			const reverse = this.reverse;
			const classes = {
				xTimeline: true,
				"el-timeline": true,
				"is-reverse": reverse
			};
			let slots = this.$slots.default || [];
			if (reverse) {
				slots = slots.reverse();
			}
			return h(
				"ul",
				{
					class: classes
				},
				slots
			);
		}
	});
}
</script>
