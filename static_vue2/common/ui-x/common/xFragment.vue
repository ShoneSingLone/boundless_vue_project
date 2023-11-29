<script>
export default async function () {
	return {
		abstract: true,
		setup() {
			const id = `X_FRAGMENT_${this._uid}`;
			return function (h) {
				return h("div", { attrs: { fragment: id } }, this.$slots.default);
			};
		}
	};
}
</script>
