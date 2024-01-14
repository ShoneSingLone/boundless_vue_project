<script lang="ts">
export default async function () {
	if (!window._api.doc) {
		/*枚举选项*/
		window._api.doc = {
			allProject() {
				return _.$ajax.get("/boundless-api/project/all");
			}
		};
	}
	return window._api.doc;
}
</script>
