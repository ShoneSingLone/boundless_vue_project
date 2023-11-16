<script>
export default async function () {
	if (!Vue._opts) {
		Vue._opts = {};
	}
	return Vue._opts;
}
</script>
