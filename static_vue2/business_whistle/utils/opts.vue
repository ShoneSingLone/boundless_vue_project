<script lang="ts">
export default async function () {
	if (!window._opts.whistle) {
		/*枚举选项*/
		window._opts.whistle = {
			normal: [
				{ label: i18n("一般"), value: "4" },
				{ label: i18n("紧急"), value: "3" },
				{ label: i18n("非常紧急"), value: "2" },
				{ label: i18n("立即解决"), value: "1" }
			]
		};
	}
	return window._opts.whistle;
}
</script>
