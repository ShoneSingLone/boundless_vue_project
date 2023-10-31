<script>
export default async function (options) {
	if (!window.ELEMENT) {
		await _.$globalVar("ELEMENT", "/common/ui-element/index.min.js");
		await _.$globalVar(
			"ELEMENT.lang",
			`/common/ui-element/i18n/${options.i18nLanguage}.js`
		);
		const LOCALE_MAP = {
			"zh-CN": ELEMENT.lang.zhCN,
			"en-US": ELEMENT.lang.en
		};
		ELEMENT.locale(LOCALE_MAP[i18nLanguage]);

		Vue.prototype.$ELEMENT = options;
	}
	return window.ELEMENT;
}
</script>
<style lang="less">
@font-face {
	font-family: element-icons;
	src:
		url(/common/ui-element/fonts/element-icons.woff) format("woff"),
		url(/common/ui-element/fonts/element-icons.ttf) format("truetype");
	font-weight: 400;
	font-display: "auto";
	font-style: normal;
}

@import url("/common/ui-element/index.less");
</style>
