<script>
export default async function () {
	if (!Vue._api) {
		/*枚举选项*/
		Vue._api = {
			allProject() {
				return _.$ajax.get("/boundless-api/project/all");
			}
		};
	}
	return Vue._api;
}
</script>
