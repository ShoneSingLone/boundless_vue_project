<script lang="ts">
export default async function () {
	if (!window._var_admin_normal) {
		/* 常量 */
		window._var_admin_normal = {
			stylesLoginFormIcon: {
				color: "rgba(0, 0, 0, 0.25)",
				width: "16px",
				height: "16px",
				margin: "auto"
			}
		};
	}
	return window._var_admin_normal;
}
</script>
