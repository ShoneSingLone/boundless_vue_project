<script>
export default async function () {
	if (!Vue._reuse) {
		Vue._reuse = {};
	}
	return Vue._reuse;
}
</script>
