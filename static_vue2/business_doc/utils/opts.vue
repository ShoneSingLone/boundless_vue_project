<script>
export default async function () {
	if (!Vue._opts) {
		/*枚举选项*/
		Vue._opts = {
			normal: [
				{ label: i18n("一般"), value: "4" },
				{ label: i18n("紧急"), value: "3" },
				{ label: i18n("非常紧急"), value: "2" },
				{ label: i18n("立即解决"), value: "1" }
			]
		};
	}
	return Vue._opts;
}
</script>
