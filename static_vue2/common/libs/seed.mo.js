(function () {
	const moLang = new URLSearchParams(location.search).get("locale");
	const i18nMap = {
		"zh-cn": "zh-CN",
		"en-us": "en-US"
	};
	const xLanguage = i18nMap[moLang] || "en-US";
	localStorage["X-Language"] = xLanguage;
	const domHtml = document.querySelector("html");
	domHtml.dataset.lang = xLanguage;
	domHtml.dataset.moLang = moLang;
})();
