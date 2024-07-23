<script lang="ts">
export default async function () {
	if (!window._api.doc) {
		/*枚举选项*/
		window._api.doc = {
			allProject() {
				return _.$ajax.get("/boundless-api/project/all");
			},
			projectsUpsert(data) {
				return _.$ajax.post("/boundless-api/project/update_info", { data });
			},
			cmd(data) {
				window.APP_WS.emit("self", data);
				// return _.$ajax.post("/boundless-api/project/command", { data });
			}
		};
	}
	return window._api.doc;
}
</script>
