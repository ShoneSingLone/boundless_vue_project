<script lang="ts">
export default async function () {
	if (!Vue._common_utils) {
		Vue._common_utils = {
			appendToken(url) {
				const _url = new URL(String(url).replace("#", ""), location.origin);
				_.each(_.$lStorage.x_token, (v, k) => {
					_url.searchParams.set(k, v);
				});
				const { href } = _url;
				return href;
			}
		};
	}
	return Vue._common_utils;
}
</script>
