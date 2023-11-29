<script>
export default async function UTILS() {
	if (!Vue._utils) {
		Vue._utils = {
			firstUpperCase: str => {
				return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
			}
		};
	}
	return Vue._utils;
}
</script>
