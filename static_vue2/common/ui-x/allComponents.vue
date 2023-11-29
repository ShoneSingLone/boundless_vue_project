<script>
export default async function () {
	Vue.prototype.isKorean = function (text) {
		const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
		return reg.test(text);
	};

	return [
		/* *************** */
		"components/navigation/xTabs/xTabs",
		"components/navigation/xTabs/xTabPane",
		"components/data/xTag/xTag",
		"components/data/xTableVir/xTableVir",
		"components/form/xInput/xInput",
		/* *************** */
		"common/xFormItemWrapper",
		"common/xAutoResizer",
		"common/xBtn",
		"common/xBtnGroup",
		"common/xCard",
		"common/xCellBtnGroup",
		"common/xCellDate",
		"common/xCellEllipsis",
		"common/xCellInput",
		"common/xCellOptions",
		"common/xCellRate",
		"common/xCellSelect",
		"common/xCellSelectSearch",
		"common/xCellSelectOrInput",
		"common/xCellText",
		"common/xColActions",
		"common/xDialog",
		"common/xForm",
		"common/xFragment",
		"common/xIcon",
		"common/xInfoCard",
		"common/xInfoCardItem",
		"common/xInquire",
		"common/xItem",
		"common/xItemCheckboxGroup",
		"common/xItemDatetime",
		"common/xItemInput",
		"common/xItemIpPart",
		"common/xItemNameUrl",
		"common/xItemRadioGroup",
		"common/xItemSelect",
		"common/xItemSwitch",
		"common/xMenuTreeItem",
		"common/xOprWithMore",
		"common/xPageContent",
		"common/xPageTitle",
		"common/xPagination",
		"common/xRender",
		"common/xSearchList",
		"common/xTable",
		"common/xTablebar",
		"common/xTableColSelected",
		"common/xTableColumn",
		"common/xTableFilter",
		"common/xTableDiv",
		"common/xTransfer",
		"common/xGap",
		"common/xDevTest"
	];
}
</script>
