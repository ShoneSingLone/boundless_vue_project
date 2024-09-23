<script lang="ts">
export default async function () {
	return {
		abstract: true,
		setup() {
			const id = `X_FRAGMENT_${this._uid}`;
			let $elEnd;
			onMounted(() => {
				$el = $(this.$el);
				$elEnd = $("<template />", { "fragment-end": id, style: "display:none;" });
				$el.after($elEnd);
				$elEnd.before(this.$el.children);
			});
			onUpdated(() => {
				$elEnd.before(this.$el.children);
			});
			onBeforeUnmount(() => {
				$elEnd.remove();
			});

			return function (h) {
				return h(
					"template",
					{ attrs: { "fragment-start": id }, style: { display: "none" } },
					this.$slots.default
				);
			};
		}
	};
}
</script>
