<script>
export default async function () {
	/* v-loading 已在element-ui中使用 */

	/* 所以叫v-xloading */
	var xloadingDirective = {
		inserted(el, binding) {
			if (binding.value) {
				$(el).addClass("x-loading");
			} else {
				$(el).removeClass("x-loading");
			}
		},
		update(el, binding) {
			if (binding.value) {
				$(el).addClass("x-loading");
			} else {
				$(el).removeClass("x-loading");
			}
		}
	};
	return xloadingDirective;
}
</script>

<style></style>
