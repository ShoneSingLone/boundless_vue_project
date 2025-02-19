<script lang="ts">
export default async function ({
	PRIVATE_GLOBAL,
	size,
	zIndex,
	bootstrap,
	x_table_vir_empty_component,
	x_table_vir_empty_component_icon,
	x_switch_width,
	x_page_title_back_icon,
	x_item_is_show_item_colon,
	x_modal_close_icon,
	x_pagination_pagination_component,
	x_pagination_position
}) {
	((/* ui 默认配置 */) => {
		/* tableVir empty 的默认组件地址 */
		PRIVATE_GLOBAL.x_ui = {
			theme: "",
			size: size || "small",
			z_index: zIndex || 2e3
		};
		PRIVATE_GLOBAL.x_table_vir_empty_component = x_table_vir_empty_component;
		PRIVATE_GLOBAL.x_table_vir_empty_component_icon =
			x_table_vir_empty_component_icon || "icon_no_data";
		PRIVATE_GLOBAL.x_switch_width = x_switch_width || 40;
		PRIVATE_GLOBAL.x_page_title_back_icon = x_page_title_back_icon || "icon_back";
		PRIVATE_GLOBAL.x_item_is_show_item_colon = x_item_is_show_item_colon || false;
		PRIVATE_GLOBAL.x_modal_close_icon = x_modal_close_icon || "icon_close";
		PRIVATE_GLOBAL.x_pagination_pagination_component =
			x_pagination_pagination_component || "PrivatePagination";
		PRIVATE_GLOBAL.x_pagination_position = x_pagination_position || "end";
	})();
	/* @ts-ignore */
	window._api = window._api || {};
	/* @ts-ignore */
	window._opts = window._opts || {};

	(function (/* common h render  */) {
		const useH = tag => (props, innerContent) => h(tag, props, innerContent);

		const hDiv = useH("div");
		PRIVATE_GLOBAL.hDiv = hDiv;

		const hSpan = useH("span");
		PRIVATE_GLOBAL.hSpan = hSpan;

		const hxBtn = useH("xBtn");
		PRIVATE_GLOBAL.hxBtn = hxBtn;

		const hxIcon = useH("xIcon");
		PRIVATE_GLOBAL.hxIcon = hxIcon;

		const hxTag = useH("xTag");
		PRIVATE_GLOBAL.hxTag = hxTag;

		const hxItem = useH("xItem");
		PRIVATE_GLOBAL.hxItem = hxItem;

		PRIVATE_GLOBAL.hTableExpandRow = children =>
			hDiv({ class: "x-table-vir-expand-row" }, children);

		PRIVATE_GLOBAL.hTipsHover = ({ msg, content, placement }) => {
			content =
				content ||
				function () {
					return hSpan(msg);
				};
			placement = placement || "right-start";
			return {
				name: "xtips",
				value: {
					content,
					trigger: "hover",
					placement
				}
			};
		};
		PRIVATE_GLOBAL.hVmSingleNode = (vm, prop, vNode) => {
			vm.____hVmSingleNode = vm.____hVmSingleNode || {};

			const vmProp = vm.____hVmSingleNode;
			if (!vmProp[prop]) {
				const ID = _.$genId("hVmSingleNode");
				vmProp[prop] = h({
					template: `<span id="${ID}"/>`,
					mounted() {
						new Vue({
							el: `#${ID}`,
							methods: {
								rerender() {
									this.vIf = false;
									this.$nextTick(() => {
										this.vIf = true;
									});
								}
							},
							data() {
								return {
									vIf: true
								};
							},
							render() {
								if (this.vIf) {
									if (_.isFunction(vNode)) {
										return vNode({ vm: this });
									} else {
										return vNode;
									}
								}
								return null;
							}
						});
					}
				});
			}
			return vmProp[prop];
		};
		PRIVATE_GLOBAL.hVal2Tag = (value, options) => {
			let item = { label: value, type: "" };
			item =
				_.find(options, item => {
					return _.$isSame(item.value, value);
				}) || item;
			if (item.type) {
				return h("xTag", { type: item.type }, [item.label]);
			} else if (item.listClass) {
				return h("xTag", { type: item.listClass }, [item.label]);
			}
			return hDiv({}, [item.label]);
		};

		PRIVATE_GLOBAL.hEllipsis = content => {
			return hDiv({ staticClass: "ellipsis", attrs: { title: content } }, [content]);
		};

		PRIVATE_GLOBAL.hBtnWithMore = props => {
			return h("xColActionAndMore", props);
		};

		PRIVATE_GLOBAL.hTipsDel = tipsString => {
			return hDiv([
				hSpan({
					staticClass: "el-icon-warning",
					style: "color:var(--ti-base-color-error-3)"
				}),
				hSpan({ staticClass: "ml4" }, tipsString)
			]);
		};

		PRIVATE_GLOBAL.hLink = props => {
			return h(
				"a",
				mergeProps4h([
					{},
					props,
					{
						props,
						attrs: props,
						class: "el-button el-button--text el-button--small ellipsis cell-link text-align-left"
					}
				]),
				[props.label]
			);
		};

		((/* xTableVir相关 */) => {
			function xTableVirModifyCellsHeight({ mergeProp, columns, cells, rowData, calStyle }) {
				if (_.isEmpty(columns)) {
					return cells;
				}
				const mergeIndex = _.findIndex(columns, { prop: mergeProp });
				const rowSpanProp = `${mergeProp}_row_span`;

				if (_.isNumber(rowData[rowSpanProp])) {
					const rowSpan = rowData[rowSpanProp];

					cells[mergeIndex] = cloneVNode(cells[mergeIndex], {
						style: calStyle({ rowSpan })
					});
				}
				return cells;
			}

			function setCurrentRowSpan({ rows, mergeProp }) {
				const allRowSpan = rows.length;
				return _.map(rows, (row, index) => {
					/* @ts-ignore */
					const rowSpan = allRowSpan - index;
					row[`${mergeProp}_row_span`] = rowSpan;
					return row;
				});
			}

			function xTableVirNewGroupSortedRows({ groupedRowObj, mergeProp, sortBy }) {
				sortBy = sortBy || Number;
				const keys = _.sortBy(Object.keys(groupedRowObj), sortBy);
				/*  */
				let dataGroupSorted = [];
				_.each(keys, key => {
					let currentArray = groupedRowObj[key];
					currentArray = setCurrentRowSpan({ rows: currentArray, mergeProp });
					dataGroupSorted = dataGroupSorted.concat(currentArray);
				});
				return dataGroupSorted;
			}

			PRIVATE_GLOBAL.xTableVirNewGroupSortedRows = xTableVirNewGroupSortedRows;
			PRIVATE_GLOBAL.xTableVirModifyCellsHeight = xTableVirModifyCellsHeight;
		})();
	})();

	/* 全局 _xUtils */
	await _.$importVue("/common/ui-x/common/xUIcomponetUtils.vue");
	/* 基础工具类 */
	await Promise.all(
		_.map(
			[
				"/common/ui-x/directive/directive.install.vue",
				"/common/ui-x/directive/xtips/xtips.vue",
				"/common/ui-x/directive/ripple.vue",
				"/common/ui-x/directive/infinitescroll.vue",
				"/common/ui-x/directive/xloading.vue",
				"/common/ui-x/directive/xmove.vue"
			],
			url => _.$importVue(url)
		)
	);

	if (_.isFunction(bootstrap)) {
		const { _xUtils } = PRIVATE_GLOBAL;
		await bootstrap(_xUtils);
	}

	await (async function lazyLoadAllComponents() {
		const ALL_COMPONENTS = await _.$importVue("/common/ui-x/allComponents.vue");
		const loadComponentByImportVue = async componentpath => {
			const NEED_FIRST_LOAD = ["xDropdownMenu", "xDropdown", "xBtn", "xTooltip", "xPopover"];
			const component_name = _.last(componentpath.split("/"));
			if (NEED_FIRST_LOAD.includes(component_name)) {
				/* xBtn 多个地方用到，但是异步加载会有bug:骨架屏不刷新 */
				const component = await _.$importVue(`/common/ui-x/${componentpath}.vue`);
				setComponentName(component, component_name);
				/* @ts-ignore */
				Vue.component(component_name, component);
			} else {
				/* 懒加载组件 */
				/* @ts-ignore */
				Vue.component(component_name, async () => {
					// if (componentName === "xCheckbox") {
					// 	debugger;
					// }
					const component = await _.$importVue(`/common/ui-x/${componentpath}.vue`);
					setComponentName(component, component_name);
					/* @ts-ignore */
					if (/^xCell/.test(component_name)) {
						/**
						 * props: ["row", "configs"], row,index,configs,prop 包含当前行、列、下标、配置信息
						 * xCell****的组件 用于列表的cell，每一个默认有带有row configs props
						 */
						component.props = ["row", "configs"];
					}
					return component;
				});
			}
		};
		await Promise.all(_.map(ALL_COMPONENTS, loadComponentByImportVue));
		function setComponentName(component, componentName) {
			if (!component.componentName) {
				component.componentName = componentName;
			}
			if (!component.name) {
				component.name = componentName;
			}
		}
	})();

	(function setDataTipsShowWhenHover() {
		/*  ellipsis */
		var inArea = {};
		$(document).on("mouseenter.setDataTipsShowWhenHover", ".ellipsis", function (event) {
			try {
				var $ele = $(this);
				var width = $ele.width();
				var $child = $(`<span style="opacity:0;position:absolute;z-index:-1;"></span>`)
					.appendTo($("body"))
					.text($ele.text());
				var widthChild = $child.width();
				$child.remove();
				if (width < widthChild - 2) {
					if (!$ele.attr("title")) {
						$ele.attr("title", $ele.text());
					}
				} else {
					if ($ele.attr("title")) {
						$ele.attr("title", "");
					}
				}
			} catch (e) {
				console.error(e);
			}
		});

		$(document).on("mouseleave.setDataTipsShowWhenHover", ".ellipsis", function (event) {});
	})();

	(function xIconUseSvgInit() {
		let $svgWrapper = $("#__SVG_SPRITE_NODE__");
		if ($svgWrapper.length !== 1) {
			const svg_icon_loading3 = `<svg id="_svg_icon_loading" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4487"><path d="M448 224a96 64 90 1 0 128 0 96 64 90 1 0-128 0Z" fill="currentColor" opacity=".9" p-id="4488"></path><path d="M448 800a96 64 90 1 0 128 0 96 64 90 1 0-128 0Z" fill="currentColor" opacity=".5" p-id="4489"></path><path d="M704 512a96 64 0 1 0 192 0 96 64 0 1 0-192 0Z" fill="currentColor" opacity=".7" p-id="4490"></path><path d="M128 512a96 64 0 1 0 192 0 96 64 0 1 0-192 0Z" fill="currentColor" opacity=".3" p-id="4491"></path><path d="M647.766905 374.606262a64 96 44.999 1 0 135.762133-135.766872 64 96 44.999 1 0-135.762133 135.766872Z" fill="currentColor" opacity=".8" p-id="4492"></path><path d="M240.470962 785.16061a64 96 44.999 1 0 135.762133-135.766872 64 96 44.999 1 0-135.762133 135.766872Z" fill="currentColor" opacity=".4" p-id="4493"></path><path d="M672.02313 760.903595a96 64 44.999 1 0 90.508088-90.511247 96 64 44.999 1 0-90.508088 90.511247Z" fill="currentColor" opacity=".6" p-id="4494"></path><path d="M261.468782 353.607652a96 64 44.999 1 0 90.508088-90.511247 96 64 44.999 1 0-90.508088 90.511247Z" fill="currentColor" opacity=".2" p-id="4495"></path></svg>`;
			$svgWrapper =
				$(`<svg id="__SVG_SPRITE_NODE__" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;position: absolute; width: 0; height: 0" aria-hidden="true">
			${svg_icon_loading3}
</svg>`).appendTo($("body"));
		}
	})();

	await (async () => {
		async function onThemeChange() {
			const theme = $("html").attr("data-theme") || "common";
			await _.$importVue("/common/ui-x/theme/theme.default.vue");

			if (onThemeChange.theme === theme) {
				return;
			}

			/* 如果不需要预设的样式 */
			if (theme === "nostyle") {
				return;
			}

			onThemeChange.theme = theme;
			const $styleArray = $(`[id*="staticcommonuiXthemestyle"]`);
			await _.$importVue(`/common/ui-x/theme/style.${theme}.vue`);

			_.each($styleArray, style => {
				const { id } = style;
				if (!new RegExp(`${theme}vue&`).test(id)) {
					$(style).remove();
				}
			});

			PRIVATE_GLOBAL.x_ui.theme = theme;
			$(window).trigger("x_ui_theme_change");
		}

		$(window).on("x_ui_theme_change", onThemeChange);

		onThemeChange();
	})();
}
</script>

<style lang="less">
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
	border-color: var(--el-color-error);
	background-color: var(--xItem-error-bg);
}

.el-dropdown .el-dropdown-selfdefine:focus:active,
.el-dropdown .el-dropdown-selfdefine:focus:not(.focusing),
.el-message__closeBtn:focus,
.el-message__content:focus,
.el-popover:focus,
.el-popover:focus:active,
.el-popover__reference:focus:hover,
.el-popover__reference:focus:not(.focusing),
.el-rate:active,
.el-rate:focus,
.el-tooltip:focus:hover,
.el-tooltip:focus:not(.focusing),
.el-upload-list__item.is-success:active,
.el-upload-list__item.is-success:not(.focusing):focus {
	outline-width: 0;
}

.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
	border-color: var(--el-color-error);
	background-color: var(--xItem-error-bg);
}
.el-checkbox-button__inner,
.el-empty__image img,
.el-radio {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}
.el-avatar,
.el-drawer {
	-webkit-box-sizing: border-box;
	overflow: hidden;
}

.el-image-viewer__btn,
.el-step__icon-inner {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}
.el-dropdown .el-dropdown-selfdefine:focus:active,
.el-dropdown .el-dropdown-selfdefine:focus:not(.focusing),
.el-message__closeBtn:focus,
.el-message__content:focus,
.el-popover:focus,
.el-popover:focus:active,
.el-popover__reference:focus:hover,
.el-popover__reference:focus:not(.focusing),
.el-rate:active,
.el-rate:focus,
.el-tooltip:focus:hover,
.el-tooltip:focus:not(.focusing),
.el-upload-list__item.is-success:active,
.el-upload-list__item.is-success:not(.focusing):focus {
	outline-width: 0;
}
.el-popover,
.el-time-panel {
	-webkit-box-shadow: var(--normal-box-shadow);
}
.el-popover,
.el-radio-button:first-child:last-child .el-radio-button__inner {
	border-radius: var(--border-radius);
}

.el-popover,
.el-time-panel {
	-webkit-box-shadow: var(--normal-box-shadow);
}
.el-cascader-node > .el-radio,
.el-radio:last-child {
	margin-right: 0;
}
.el-cascader__tags,
.el-tag {
	-webkit-box-sizing: border-box;
}

.el-upload-list--picture .el-progress {
	position: relative;
	top: -7px;
}

.el-upload-list--picture-card .el-progress {
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	bottom: auto;
	width: 126px;
}

.el-upload-list--picture-card .el-progress .el-progress__text {
	top: 50%;
}
.el-upload-list--picture-card .el-upload-list__item:hover .el-progress__text {
	display: block;
}

.el-upload-list__item:hover .el-progress__text {
	display: none;
}

.el-upload-list__item .el-progress {
	position: absolute;
	top: 20px;
	width: 100%;
}

.el-upload-list__item .el-progress__text {
	position: absolute;
	right: 0;
	top: -13px;
}

.el-upload-list__item .el-progress-bar {
	margin-right: 0;
	padding-right: 0;
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
	padding-bottom: 15px;
}
.el-picker-panel,
.el-table-filter {
	-webkit-box-shadow: var(--normal-box-shadow);
}

.el-scrollbar__thumb {
	position: relative;
	display: block;
	width: 0;
	height: 0;
	cursor: pointer;
	border-radius: inherit;
	background-color: var(--ui-thumb-hover);
	transition: 0.3s background-color;
	&:hover {
		background-color: var(--ui-thumb);
	}
}

.el-card,
.el-message {
	border-radius: var(--border-radius);
	/* overflow: hidden; */
}

.el-pagination--small .arrow.disabled,
.el-table .el-table__cell.is-hidden > *,
.el-table .hidden-columns,
.el-table--hidden {
	visibility: hidden;
}

.el-dropdown .el-dropdown-selfdefine:focus:active,
.el-dropdown .el-dropdown-selfdefine:focus:not(.focusing),
.el-message__closeBtn:focus,
.el-message__content:focus,
.el-popover:focus,
.el-popover:focus:active,
.el-popover__reference:focus:hover,
.el-popover__reference:focus:not(.focusing),
.el-rate:active,
.el-rate:focus,
.el-tooltip:focus:hover,
.el-tooltip:focus:not(.focusing),
.el-upload-list__item.is-success:active,
.el-upload-list__item.is-success:not(.focusing):focus {
	outline-width: 0;
}

.el-input__suffix,
.el-tree.is-dragging .el-tree-node__content * {
	pointer-events: none;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
	font-family: element-icons !important;
	speak: none;
	font-style: normal;
	font-weight: 400;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	vertical-align: baseline;
	display: inline-block;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.el-date-table,
.el-table th.el-table__cell {
	-webkit-user-select: none;
	-moz-user-select: none;
}

.el-drawer,
.el-empty,
.el-result {
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
}

.el-backtop,
.el-calendar-table td.is-today {
	color: var(--el-color-primary);
}

.el-backtop,
.el-page-header {
	display: -webkit-box;
	display: -ms-flexbox;
}

@keyframes v-modal-in {
	0% {
		opacity: 0;
	}
}

@keyframes v-modal-out {
	100% {
		opacity: 0;
	}
}

.el-dropdown-menu,
.el-menu--collapse .el-submenu .el-menu {
	z-index: 10;
	box-shadow: var(--normal-box-shadow);
}

.el-popover,
.el-radio-button:first-child:last-child .el-radio-button__inner {
	border-radius: var(--border-radius);
}

.el-select .el-tag__close.el-icon-close::before {
	display: block;
	-webkit-transform: translate(0, 0.5px);
	transform: translate(0, 0.5px);
}

.el-progress-bar__inner::after,
.el-row::after,
.el-row::before,
.el-slider::after,
.el-slider::before,
.el-slider__button-wrapper::after,
.el-upload-cover::after {
	content: "";
}

.el-image__error,
.el-image__placeholder {
	background: var(--el-fill-color-light);
}

.el-image__error,
.el-image__inner,
.el-image__placeholder {
	width: 100%;
	height: 100%;
}

.el-image {
	position: relative;
	display: inline-block;
	overflow: hidden;
}

.el-image__inner {
	vertical-align: top;
}

.el-image__inner--center {
	position: relative;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	display: block;
}

.el-image__error {
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	font-size: 14px;
	color: var(--el-text-color-disabled);
	vertical-align: middle;
}

.el-image__preview {
	cursor: pointer;
}

.el-image-viewer__wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.el-image-viewer__btn {
	position: absolute;
	z-index: 1;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	border-radius: 50%;
	opacity: 0.8;
	cursor: pointer;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	user-select: none;
}

.el-image-viewer__close {
	top: 40px;
	right: 40px;
	width: 40px;
	height: 40px;
	font-size: 24px;
	color: #fff;
	background-color: #606266;
}

.el-image-viewer__canvas {
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.el-image-viewer__actions {
	left: 50%;
	bottom: 30px;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	width: 282px;
	height: 44px;
	padding: 0 23px;
	background-color: #606266;
	border-color: #fff;
	border-radius: 22px;
}

.el-image-viewer__actions__inner {
	width: 100%;
	height: 100%;
	text-align: justify;
	cursor: default;
	font-size: 23px;
	color: #fff;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: distribute;
	justify-content: space-around;
}

.el-image-viewer__next,
.el-image-viewer__prev {
	top: 50%;
	width: 44px;
	height: 44px;
	font-size: 24px;
	color: #fff;
	background-color: #606266;
	border-color: #fff;
}

.el-image-viewer__prev {
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	left: 40px;
}

.el-image-viewer__next {
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	right: 40px;
	text-indent: 2px;
}

.el-image-viewer__mask {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0.5;
	background: #000;
}

.el-image__error,
.el-timeline-item__dot {
	display: -webkit-box;
	display: -ms-flexbox;
}

.el-input__suffix,
.el-tree.is-dragging .el-tree-node__content * {
	pointer-events: none;
}

@keyframes v-modal-in {
	0% {
		opacity: 0;
	}
}

@keyframes v-modal-out {
	100% {
		opacity: 0;
	}
}

@keyframes msgbox-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@keyframes msgbox-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

@keyframes slideInRight-enter {
	0% {
		opacity: 0;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
	}

	to {
		opacity: 1;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
}

@keyframes slideInRight-leave {
	0% {
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(0);
		transform: translateX(0);
		opacity: 1;
	}

	100% {
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(100%);
		transform: translateX(100%);
		opacity: 0;
	}
}

@keyframes slideInLeft-enter {
	0% {
		opacity: 0;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%);
	}

	to {
		opacity: 1;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
}

@keyframes slideInLeft-leave {
	0% {
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(0);
		transform: translateX(0);
		opacity: 1;
	}

	100% {
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: translateX(-100%);
		transform: translateX(-100%);
		opacity: 0;
	}
}

@keyframes loading-rotate {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes loading-dash {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -40px;
	}

	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -120px;
	}
}

@keyframes progress {
	0% {
		background-position: 0 0;
	}

	100% {
		background-position: 32px 0;
	}
}

@keyframes rotate {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}

	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}

@keyframes viewer-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@keyframes viewer-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

@keyframes el-drawer-fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes rtl-drawer-in {
	0% {
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}

	100% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}
}

@keyframes rtl-drawer-out {
	0% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}

	100% {
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
}

@keyframes ltr-drawer-in {
	0% {
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100%, 0);
	}

	100% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}
}

@keyframes ltr-drawer-out {
	0% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}

	100% {
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100%, 0);
	}
}

@keyframes ttb-drawer-in {
	0% {
		-webkit-transform: translate(0, -100%);
		transform: translate(0, -100%);
	}

	100% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}
}

@keyframes ttb-drawer-out {
	0% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}

	100% {
		-webkit-transform: translate(0, -100%);
		transform: translate(0, -100%);
	}
}

@keyframes btt-drawer-in {
	0% {
		-webkit-transform: translate(0, 100%);
		transform: translate(0, 100%);
	}

	100% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}
}

@keyframes btt-drawer-out {
	0% {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
	}

	100% {
		-webkit-transform: translate(0, 100%);
		transform: translate(0, 100%);
	}
}

@keyframes el-skeleton-loading {
	0% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0 50%;
	}
}
</style>
