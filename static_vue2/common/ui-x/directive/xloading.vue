<script lang="ts">
export default async function () {
	/* v-loading 已在element-ui中使用
	 * 所以叫 v-xloading */
	return Vue.directive("xloading", {
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
	});
}
</script>

<style></style>
