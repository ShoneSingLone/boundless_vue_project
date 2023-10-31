<script>
export default async function () {
	return {
		abstract: true,
		setup() {
			const id = `GH_FRAGMENT_${this._uid}`;
			return function (h) {
				return h("div", { attrs: { fragment: id } }, this.$slots.default);
			};
		}
	};
}
</script>
