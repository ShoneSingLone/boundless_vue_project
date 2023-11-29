<script>
export default async function () {
	if (!Vue._var) {
		/* 常量 */
		Vue._var = {
			stylesLoginFormIcon: {
				color: "rgba(0, 0, 0, 0.25)",
				width: "16px",
				height: "16px",
				margin: "auto"
			}
		};
	}
	return Vue._var;
}
</script>
