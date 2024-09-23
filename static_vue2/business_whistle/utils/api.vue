<script lang="ts">
export default async function () {
	if (!window._api.whistle) {
		/*枚举选项*/
		window._api.whistle = {};
	}
	return window._api.whistle;
}
</script>
