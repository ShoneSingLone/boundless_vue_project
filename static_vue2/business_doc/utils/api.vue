<script>
export default async function () {
	if (!Vue._api) {
		Vue._api = {};
	}
	return Vue._api;
}
</script>
