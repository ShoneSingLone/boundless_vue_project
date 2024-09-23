<template></template>

<script lang="ts">
export default async function () {
	const { getReadTime } = await _.$importVue("@/utils/localStorage.vue");
	const { realPx } = await _.$importVue("@/utils/utils.vue");

	const FONT_SIZE_LIST = [
		{
			fontSize: 12
		},
		{
			fontSize: 14
		},
		{
			fontSize: 16
		},
		{
			fontSize: 18
		},
		{
			fontSize: 20
		},
		{
			fontSize: 22
		},
		{
			fontSize: 24
		}
	];

	const FONT_FAMILY = [
		{
			font: "Default"
		},
		{
			font: "Cabin"
		},
		{
			font: "Days One"
		},
		{
			font: "Montserrat"
		},
		{
			font: "Tangerine"
		}
	];

	function themeList(vue) {
		return [
			{
				alias: vue.$t("book.themeDefault"),
				name: "Default",
				style: {
					body: {
						color: "#4c5059",
						background: "#cecece",
						"padding-top": `${realPx(48)}px !important`,
						"padding-bottom": `${realPx(48)}px !important`
					}
				}
			},
			{
				alias: vue.$t("book.themeGold"),
				name: "Gold",
				style: {
					body: {
						color: "#5c5b56",
						background: "#c6c2b6",
						"padding-top": `${realPx(48)}px !important`,
						"padding-bottom": `${realPx(48)}px !important`
					}
				}
			},
			{
				alias: vue.$t("book.themeEye"),
				name: "Eye",
				style: {
					body: {
						color: "#404c42",
						background: "#a9c1a9",
						"padding-top": `${realPx(48)}px !important`,
						"padding-bottom": `${realPx(48)}px !important`
					}
				}
			},
			{
				alias: vue.$t("book.themeNight"),
				name: "Night",
				style: {
					body: {
						color: "#cecece",
						background: "#000000",
						"padding-top": `${realPx(48)}px !important`,
						"padding-bottom": `${realPx(48)}px !important`
					}
				}
			}
		];
	}

	const addCss = (function () {
		let link = null;
		let head = document.getElementsByTagName("head")[0];
		return function (href) {
			if (!link) {
				link = document.createElement("link");
			}
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("type", "text/css");
			link.setAttribute("href", href);
			head.appendChild(link);
		};
	})();

	function getReadTimeByMinute(fileName) {
		const readTime = getReadTime(fileName);
		if (!readTime) {
			return 0;
		} else {
			return Math.ceil(readTime / 60);
		}
	}

	function flatten(array) {
		return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))));
	}

	return {
		FONT_SIZE_LIST,
		FONT_FAMILY,
		themeList,
		addCss,
		getReadTimeByMinute,
		flatten
	};
}
</script>
