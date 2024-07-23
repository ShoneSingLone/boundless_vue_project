<script lang="ts">
export default async function ({
	PRIVATE_GLOBAL,
	size,
	zIndex,
	bootstrap,
	x_table_vir_empty_component,
	x_switch_width,
	x_page_title_back_icon,
	x_item_is_show_item_colon,
	x_modal_close_icon,
	x_pagination_pagination_component,
	x_pagination_position
}) {
	((/* ui 默认配置 */) => {
		/* tableVir empty 的默认组件地址 */
		PRIVATE_GLOBAL.x_ui_size = size || "small";
		PRIVATE_GLOBAL.x_ui_z_index = zIndex || 2e3;
		PRIVATE_GLOBAL.x_table_vir_empty_component = x_table_vir_empty_component;
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

	/* 全局 _xUtils */
	await _.$importVue("/common/ui-x/common/xUIcomponetUtils.vue");
	/* 基础工具类 */
	await Promise.all(
		_.map(
			[
				"/common/ui-x/directive/directive.install.vue",
				"/common/ui-x/directive/xtips/xtips.vue",
				"/common/ui-x/directive/ripple.vue",
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
			const componentName = _.last(componentpath.split("/"));
			if (
				["xDropdownMenu", "xDropdown", "xBtn", "xTooltip", "xPopover"].includes(
					componentName
				)
			) {
				/* xBtn 多个地方用到，但是异步加载会有bug:骨架屏不刷新 */
				const component = await _.$importVue(`/common/ui-x/${componentpath}.vue`);
				setComponentName(component, componentName);
				/* @ts-ignore */
				Vue.component(componentName, component);
			} else {
				/* 懒加载组件 */
				/* @ts-ignore */
				Vue.component(componentName, async () => {
					// if (componentName === "xCheckbox") {
					// 	debugger;
					// }
					const component = await _.$importVue(`/common/ui-x/${componentpath}.vue`);
					setComponentName(component, componentName);
					/* @ts-ignore */
					if (/^xCell/.test(componentName)) {
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

	function setDataTipsShowWhenHover() {
		/*  ellipsis */
		var inArea = {};
		$(document).on("mouseenter.layer_tips", "[data-tips]", function (event) {
			try {
				var $ele = $(this);
				var width = $ele.width();
				var $child = $(`<span style="opacity:0;position:absolute;z-index:-1;"></span>`)
					.appendTo($("body"))
					.text($ele.text());
				var widthChild = $child.width();
				$child.remove();
				if (width < widthChild - 2) {
					const vlayerIndex = layer.tips(
						`<div style="overflow: auto;">${$ele.text()}</div>`,
						this,
						{
							tips: [1, "#fff"],
							time: 1000 * 60 * 1
						}
					);
					$ele.attr("data-tips", vlayerIndex);
				}
			} catch (e) {
				console.error(e);
			}
		});

		$(document).on("mouseleave.layer_tips", "[data-tips]", function (event) {
			try {
				var $ele = $(this);
				var vlayerIndex = Number($ele.attr("data-tips"));
				if (vlayerIndex > -1) {
					layer.close(vlayerIndex);
				}
			} catch (e) {
				console.error(e);
			}
		});
	}

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
		/* 设置样式 */

		await _.$importVue("/common/ui-x/theme/theme.default.vue");
		async function setThemeCss() {
			const currentTheme = $("html").attr("data-theme");
			if (currentTheme === "tiny") {
				await _.$importVue("/common/ui-x/theme/theme.tiny.vue");
			}
		}
		await setThemeCss();

		$(window).on("xUiThemeChange", setThemeCss);
	})();
}
</script>
