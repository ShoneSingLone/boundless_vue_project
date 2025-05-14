<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		onLoadSFC() {
			if (!PRIVATE_GLOBAL.x_ui_collection) {
				PRIVATE_GLOBAL.x_ui_collection = {};
			}
			PRIVATE_GLOBAL.x_ui_collection.tiny = {
				x_select: {
					icon_arrow: "caret-bottom"
				},
				x_card: {
					defaultClass: ""
				}
			};
			$(window).trigger("x_ui_theme_change");
		}
	};
}
</script>
<style lang="less">
@charset "utf-8";

*,
body {
	font-family: YouNeverKnow;
}

/* 默认风格，一旦引入，会影响界面主题 */
/* CSS Document */
:root {
	color-scheme: light;
	--ui-card-body-padding: 20px;
	--el-color-white: #ffffff;
	--el-color-black: #000000;
	--ui-one: 16px;
	--ui-one-reverse: -16px;
	--ui-half: 8px;
	--ui-half-reverse: -8px;
	--ui-height: 32px;
	/*  */
	--el-color-primary-hover: #7693f5;
	--el-color-primary-active: #344899;
	/*  */
	--el-color-primary: #5e7ce0;
	--el-color-primary-light-3: #8ea3e9;
	--el-color-primary-light-5: #afbef0;
	--el-color-primary-light-7: #cfd8f6;
	--el-color-primary-light-8: #dfe5f9;
	--el-color-primary-light-9: #eff2fc;
	--el-color-primary-dark-2: #4b63b3;
	--el-color-success: #67c23a;
	--el-color-success-light-3: #95d475;
	--el-color-success-light-5: #b3e19d;
	--el-color-success-light-7: #d1edc4;
	--el-color-success-light-8: #e1f3d8;
	--el-color-success-light-9: #f0f9eb;
	--el-color-success-dark-2: #529b2e;
	--el-color-warning: #e6a23c;
	--el-color-warning-light-3: #eebe77;
	--el-color-warning-light-5: #f3d19e;
	--el-color-warning-light-7: #f8e3c5;
	--el-color-warning-light-8: #faecd8;
	--el-color-warning-light-9: #fdf6ec;
	--el-color-warning-dark-2: #b88230;
	--el-color-danger: #f66f6a;
	--el-color-danger-light-3: #f99a97;
	--el-color-danger-light-5: #fbb7b5;
	--el-color-danger-light-7: #fcd4d2;
	--el-color-danger-light-8: #fde2e1;
	--el-color-danger-light-9: #fef1f0;
	--el-color-danger-dark-2: #c55955;
	--el-color-error: #f56c6c;
	--el-color-error-light-3: #f89898;
	--el-color-error-light-5: #fab6b6;
	--el-color-error-light-7: #fcd3d3;
	--el-color-error-light-8: #fde2e2;
	--el-color-error-light-9: #fef0f0;
	--el-color-error-dark-2: #c45656;
	--el-color-info: #909399;
	--el-color-info-light-3: #b1b3b8;
	--el-color-info-light-5: #c8c9cc;
	--el-color-info-light-7: #dedfe0;
	--el-color-info-light-8: #e9e9eb;
	--el-color-info-light-9: #f4f4f5;
	--el-color-info-dark-2: #73767a;
	--el-bg-color: #ffffff;
	--el-bg-color-page: #f2f3f5;
	--el-bg-color-overlay: #ffffff;
	--el-text-color-primary: #303133;
	--el-text-color-regular: #606266;
	--el-text-color-secondary: #909399;
	--el-text-color-placeholder: #a8abb2;
	--el-text-color-disabled: #c0c4cc;
	--el-border-color: #dcdfe6;
	--el-border-color-light: #e4e7ed;
	--el-border-color-lighter: #e6ebf5;
	--el-border-color-extra-light: #f2f6fc;
	--el-border-color-dark: #d4d7de;
	--el-border-color-darker: #cdd0d6;
	--el-fill-color: #f0f2f5;
	--el-fill-color-light: #f5f7fa;
	--el-fill-color-lighter: #fafafa;
	--el-fill-color-extra-light: #fafcff;
	--el-fill-color-dark: #ebedf0;
	--el-fill-color-darker: #e6e8eb;
	--el-fill-color-blank: #ffffff;
	--ui-thumb: rgba(144, 147, 153, 0.5);
	--ui-thumb-hover: rgba(144, 147, 153, 0.3);
	--el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
	--el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.12);
	--el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.12);
	--el-box-shadow-dark:
		0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12),
		0px 8px 16px -8px rgba(0, 0, 0, 0.16);
	--el-disabled-bg-color: var(--el-fill-color-light);
	--el-disabled-text-color: var(--el-text-color-placeholder);
	--el-disabled-border-color: var(--el-border-color-light);
	--el-overlay-color: rgba(0, 0, 0, 0.8);
	--el-overlay-color-light: rgba(0, 0, 0, 0.7);
	--el-overlay-color-lighter: rgba(0, 0, 0, 0.5);
	--el-mask-color: rgba(255, 255, 255, 0.9);
	--el-mask-color-extra-light: rgba(255, 255, 255, 0.3);
	--el-border-width: 1px;
	--el-border-style: solid;
	--el-border-color-hover: var(--el-text-color-disabled);
	--el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
	--el-svg-monochrome-grey: var(--el-border-color);
	--border-radius: 4px;
	--border-radius--small: 3px;
	--border-radius--mini: 2px;
	/*  */
	--ui-global-bg: #f6f6f8;
	--ui-glass-morphism-bg: rgba(245, 246, 248, 0.9);
	--ui-global-bg-normal: #ffffff;
	--ui-base-bg: #ffffff;
	--ui-base-bg-dark: #252b3a;
	--ui-brand: #5e7ce0;
	--ui-brand-hover: #7693f5;
	--ui-brand-active: #526ecc;
	--ui-brand-foil: #f2f2f3;
	--ui-brand-active-focus: #344899;
	--ui-contrast: #c7000b;
	--ui-text: #252b3a;
	--ui-base-color-5: #575d6c;
	--ui-aide-text: #71757f;
	--ui-aide-text-hover: #252b3a;
	--ui-placeholder: #babbc0;
	--ui-light-text: #ffffff;
	--ui-dark-text: #252b3a;
	--ui-link: #526ecc;
	--ui-link-active: #526ecc;
	--ui-link-light: #96adfa;
	--ui-link-light-active: #beccfa;
	--ui-line: #d7d8da;
	--ui-dividing-line: #f2f2f3;
	--ui-block: #ffffff;
	--ui-area: #f5f5f5;
	--ui-danger: #f66f6a;
	--ui-warning: #fac20a;
	--ui-waiting: #beccfa;
	--ui-success: #50d4ab;
	--ui-info: #5e7ce0;
	--ui-initial: #e9edfa;
	--ui-unavailable: #f5f5f5;
	--ui-shadow: rgba(37, 43, 58, 0.24);
	--ui-light-shadow: rgba(37, 43, 58, 0.12);
	--ui-connected-overlay-shadow: rgba(37, 43, 58, 0.16);
	--ui-feedback-overlay-shadow: rgba(37, 43, 58, 0.2);
	--ui-icon-text: #71757f;
	--ui-icon-bg: #ffffff;
	--ui-icon-fill: #71757f;
	--ui-icon-fill-weak: #babbc0;
	--ui-icon-fill-hover: #252b3a;
	--ui-icon-fill-active: #252b3a;
	--ui-icon-fill-active-hover: #252b3a;
	--ui-shape-icon-fill: #d7d8da;
	--ui-shape-icon-fill-hover: #babbc0;
	--ui-shape-icon-fill-active: #babbc0;
	--ui-shape-icon-fill-disabled: #f5f5f5;
	--ui-form-control-line: #d7d8da;
	--ui-form-control-bg: #ffffff;
	--ui-form-control-line-hover: #9b9fa8;
	--ui-form-control-line-active: #5e7ce0;
	--ui-form-control-interactive-outline: rgba(94, 124, 224, 0.08);
	--ui-form-control-line-active-hover: #344899;
	--ui-list-item-active-bg: #f2f5fc;
	--ui-list-item-active-text: #252b3a;
	--ui-list-item-active-hover-bg: #f2f5fc;
	--ui-list-item-hover-bg: #f2f2f3;
	--ui-list-item-hover-text: #252b3a;
	--ui-list-item-selected-bg: #f2f5fc;
	--ui-list-item-strip-bg: #f2f5fc;
	--ui-disabled-bg: #f5f5f5;
	--ui-disabled-line: #dfe1e6;
	--ui-disabled-text: #cfd0d3;
	--el-color-primary-disabled: #beccfa;
	--ui-icon-fill-active-disabled: #beccfa;
	--ui-label-bg: #e9edfa;
	--ui-connected-overlay-bg: #ffffff;
	--ui-connected-overlay-line: #526ecc;
	--ui-fullscreen-overlay-bg: #ffffff;
	--ui-feedback-overlay-bg: #464d6e;
	--ui-feedback-overlay-text: #dfe1e6;
	--ui-embed-search-bg: #f2f2f3;
	--ui-embed-search-bg-hover: #eef0f5;
	--ui-float-block-shadow: rgba(94, 124, 224, 0.3);
	--ui-highlight-overlay: rgba(255, 255, 255, 0.8);
	--ui-range-item-hover-bg: #e9edfa;
	--ui-gray-form-control-bg: #f5f5f5;
	--ui-gray-form-control-hover-bg: #ebebeb;
	--ui-nav-expand-bg: #fbfbfc;
	--ui-contrast-hover: #d64a52;
	--ui-contrast-active: #b12220;
	--ui-danger-line: #f66f6a;
	--ui-danger-bg: #ffd5d4;
	--ui-warning-line: #fa9841;
	--ui-warning-bg: #ffe1c7;
	--ui-info-bg: #e9edfa;
	--ui-success-line: #50d4ab;
	--ui-success-bg: #cffcee;
	--el-color-primary-bg: #f2f5fc;
	--ui-default-bg: #f7f8fa;
	--ui-shadow-length-base: 0 2px 6px 0;
	--ui-shadow-length-slide-left: -2px 0 8px 0;
	--ui-shadow-length-slide-right: 2px 0 8px 0;
	--ui-shadow-length-connected-overlay: 0 2px 12px 0;
	--ui-shadow-length-hover: 0 4px 16px 0;
	--ui-shadow-length-feedback-overlay: 0 8px 16px 0;
	--ui-shadow-length-fullscreen-overlay: 0 10px 24px 0;
	--ui-border-radius-feedback: 4px;
	--ui-border-radius-card: 8px;
	--ui-border-radius-full: 100px;
	--ui-font-size: 14px;
	--ui-font-size-card-title: 16px;
	--ui-font-size-page-title: 16px;
	--ui-font-size-modal-title: 18px;
	--ui-font-size-price: 20px;
	--ui-font-size-data-overview: 24px;
	--ui-font-size-icon: 16px;
	--ui-font-size-sm: 12px;
	--ui-font-size-md: 14px;
	--ui-font-size-lg: 14px;
	--ui-font-title-weight: bold;
	--ui-font-content-weight: normal;
	--ui-line-height-base: 1.5;
	--ui-animation-ease-in-smooth: cubic-bezier(0.645, 0.045, 0.355, 1);
	--ui-animation-duration-slow: 300ms;
	--ui-animation-duration-base: 200ms;
	--ui-animation-duration-fast: 100ms;
	--ui-animation-ease-in: cubic-bezier(0.5, 0, 0.84, 0.25);
	--ui-animation-ease-out: cubic-bezier(0.16, 0.75, 0.5, 1);
	--ui-animation-ease-in-out: cubic-bezier(0.5, 0.05, 0.5, 0.95);
	--ui-animation-ease-in-out-smooth: cubic-bezier(0.645, 0.045, 0.355, 1);
	--ui-animation-linear: cubic-bezier(0, 0, 1, 1);
	--ui-z-index-full-page-overlay: 1080;
	--ui-z-index-pop-up: 1060;
	--ui-z-index-dropdown: 1052;
	--ui-z-index-modal: 1050;
	--ui-z-index-drawer: 1040;
	--ui-z-index-framework: 1000;
	--ui-btn-sm-padding: 0 12px;
	--ui-btn-padding: 0 16px;
	--ui-btn-lg-padding: 0 20px;
	--ui-btn-common-bg: #ebebeb;
	--ui-btn-common-border-color: transparent;
	--ui-btn-common-bg-hover: #d1d1d1;
	--ui-btn-common-color-hover: #252b3a;
	--ui-btn-common-border-color-hover: transparent;
	--ui-btn-common-bg-active: #bdbdbd;
	--ui-btn-common-color-active: #252b3a;
	--ui-btn-common-border-color-active: transparent;
	--ui-btn-common-border-disabled: transparent;
	--ui-icon-hover-bg: #ebebeb;
	--ui-icon-active-bg: #d1d1d1;
	--normal-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	/* xUI */
	/* xItem */
	--xItem-error-bg: var(--el-bg-color);
	/* xAlert */
	--xAlert-border-radius: var(--border-radius);
	--xAlert-color: var(--el-color-white);
	--xAlert-close-btn-color: var(--el-text-color-disabled);
	--xAlert-info-light-bg-color: var(--el-color-info-light-9);
	--xAlert-info-light-color: var(--el-text-color-secondary);

	--xAlert-success-light-bg-color: var(--el-color-success-light-9);
	--xAlert-success-light-color: var(--el-color-success);

	--xAlert-error-light-bg-color: var(--el-color-error-light-9);
	--xAlert-error-light-color: var(--el-color-error);

	--xAlert-warning-light-bg-color: var(--el-color-warning-light-9);
	--xAlert-warning-light-color: var(--el-color-warning);
}

body {
	color: var(--el-text-color-primary);
	font-size: 13px;
	padding: 0;
	margin: 0;
	background-color: var(--body-bg-color, var(--ui-embed-search-bg-hover));
}
ul,
li {
	padding: 0;
	margin: 0;
	list-style: none;
}

a {
	text-decoration: none;
	color: var(--el-color-primary);
	cursor: pointer;
}

a:hover,
a:visited,
a:link,
a:active {
	color: #333;
}

*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

a[disabled] {
	cursor: not-allowed;
	opacity: 0.5;
}

/* *****************************************transition********************************** */

html,
body,
#app {
	position: relative;
	height: 100%;
	width: 100%;
	overflow: auto;
	display: flex;
	flex-flow: column nowrap;
}

:root[data-theme="tiny"] {
	--ti-base-color-white: #fff;
	--ti-base-color-transparent: transparent;
	--ti-base-color-brand-6: #5e7ce0;
	--ti-base-color-brand-8: #344899;
	--ti-base-color-brand-7: #526ecc;
	--ti-base-color-brand-5: #7693f5;
	--ti-base-color-brand-4: #96adfa;
	--ti-base-color-brand-3: #beccfa;
	--ti-base-color-brand-2: #e9edfa;
	--ti-base-color-brand-1: #f2f5fc;
	--ti-base-color-common-9: #181818;
	--ti-base-color-common-8: #282b33;
	--ti-base-color-common-7: #252b3a;
	--ti-base-color-common-6: #464c59;
	--ti-base-color-common-5: #575d6c;
	--ti-base-color-common-4: #5c6173;
	--ti-base-color-common-3: #8a8e99;
	--ti-base-color-common-2: #adb0b8;
	--ti-base-color-common-1: #dfe1e6;
	--ti-base-color-bg-9: #b12220;
	--ti-base-color-bg-8: #c7000b;
	--ti-base-color-bg-7: #d64a52;
	--ti-base-color-bg-6: #eef0f5;
	--ti-base-color-bg-5: #f5f5f6;
	--ti-base-color-bg-4: #fafafa;
	--ti-base-color-bg-3: #ffffff;
	--ti-base-color-bg-2: #ffffff;
	--ti-base-color-bg-1: #ffffff;
	--ti-base-color-error-4: #de504e;
	--ti-base-color-error-3: #f66f6a;
	--ti-base-color-error-2: #ffbcba;
	--ti-base-color-error-1: #ffeeed;
	--ti-base-color-success-4: #3ac295;
	--ti-base-color-success-3: #50d4ab;
	--ti-base-color-success-2: #acf2dc;
	--ti-base-color-success-1: #edfff9;
	--ti-base-color-warn-5: #e37d29;
	--ti-base-color-warn-4: #fa9841;
	--ti-base-color-warn-3: #fac20a;
	--ti-base-color-warn-2: #ffd0a6;
	--ti-base-color-warn-1: #fff3e8;
	--ti-base-color-prompt-4: var(--ti-base-color-brand-7);
	--ti-base-color-prompt-3: var(--ti-base-color-brand-6);
	--ti-base-color-prompt-2: var(--ti-base-color-brand-3);
	--ti-base-color-prompt-1: #ebf6ff;
	--ti-base-color-prompt-icon-from: #7769e8;
	--ti-base-color-prompt-icon-to: #58bbff;
	--ti-base-color-icon-info: #6cbfff;
	--ti-base-color-data-3: #a6dd82;
	--ti-base-color-data-4: #f3689a;
	--ti-base-color-data-5: #a97af8;
	--ti-common-color-transparent: var(--ti-base-color-transparent);
	--ti-common-color-light: #fff;
	--ti-common-color-dark: #000;
	--ti-common-color-success: var(--ti-base-color-success-3);
	--ti-common-color-text-success: var(--ti-base-color-success-4);
	--ti-common-color-success-bg: var(--ti-base-color-success-1);
	--ti-common-color-success-border: var(--ti-base-color-success-2);
	--ti-common-color-error: var(--ti-base-color-error-3);
	--ti-common-color-error-text: var(--ti-base-color-error-4);
	--ti-common-color-error-bg: var(--ti-base-color-error-1);
	--ti-common-color-error-border: var(--ti-base-color-error-3);
	--ti-common-color-error-border-secondary: var(--ti-base-color-error-2);
	--ti-common-color-info: var(--ti-base-color-common-7);
	--ti-common-color-info-text: var(--ti-base-color-common-7);
	--ti-common-color-info-bg: rgba(51, 51, 51, 0.06);
	--ti-common-color-info-border: #d3d4d6;
	--ti-common-color-warn: var(--ti-base-color-warn-4);
	--ti-common-color-warn-text: var(--ti-base-color-warn-5);
	--ti-common-color-warn-bg: var(--ti-base-color-warn-1);
	--ti-common-color-warn-border: var(--ti-base-color-warn-2);
	--ti-common-color-warn-secondary: var(--ti-base-color-warn-3);
	--ti-common-color-prompt: var(--ti-base-color-prompt-3);
	--ti-common-color-prompt-text: var(--ti-base-color-prompt-4);
	--ti-common-color-prompt-bg: var(--ti-base-color-prompt-1);
	--ti-common-color-prompt-border: var(--ti-base-color-prompt-2);
	--ti-common-color-prompt-icon-from: var(--ti-base-color-prompt-icon-from);
	--ti-common-color-prompt-icon-to: var(--ti-base-color-prompt-icon-to);
	--ti-common-color-primary-normal: var(--ti-base-color-brand-6);
	--ti-common-color-primary-hover: var(--ti-base-color-brand-5);
	--ti-common-color-primary-active: var(--ti-base-color-brand-5);
	--ti-common-color-primary-disabled: #a0cfff;
	--ti-common-color-primary-disabled-bgcolor: var(--ti-common-color-bg-disabled);
	--ti-common-color-primary-disabled-border: var(--ti-common-color-line-disabled);
	--ti-common-color-primary-disabled-text: var(--ti-common-color-text-disabled);
	--ti-common-color-primary-plain-disabled-bg-color: rgba(191, 191, 191, 0.1);
	--ti-common-color-success-normal: var(--ti-common-color-success);
	--ti-common-color-success-hover: var(--ti-common-color-success-border);
	--ti-common-color-success-active: var(--ti-common-color-success-border);
	--ti-common-color-success-disabled: #a6c3b9;
	--ti-common-color-success-disabled-bgcolor: var(--ti-common-color-bg-disabled);
	--ti-common-color-success-disabled-border: var(--ti-common-color-line-disabled);
	--ti-common-color-success-disabled-text: var(--ti-common-color-text-disabled);
	--ti-common-color-success-plain-disabled-bg-color: rgba(166, 195, 185, 0.1);
	--ti-common-color-warning-normal: var(--ti-common-color-warn);
	--ti-common-color-warning-hover: var(--ti-common-color-warn-secondary);
	--ti-common-color-warning-active: var(--ti-common-color-warn-secondary);
	--ti-common-color-warning-disabled: #d3c6a2;
	--ti-common-color-warning-disabled-bgcolor: var(--ti-common-color-bg-disabled);
	--ti-common-color-warning-disabled-border: var(--ti-common-color-line-disabled);
	--ti-common-color-warning-disabled-text: var(--ti-common-color-text-disabled);
	--ti-common-color-warning-plain-disabled-bg-color: rgba(211, 198, 162, 0.1);
	--ti-common-color-danger-normal: var(--ti-common-bg-primary);
	--ti-common-color-danger-hover: var(--ti-common-bg-primary-hover);
	--ti-common-color-danger-active: var(--ti-common-bg-primary-active);
	--ti-common-color-danger-disabled: #d8bab5;
	--ti-common-color-danger-disabled-bgcolor: var(--ti-common-color-bg-disabled);
	--ti-common-color-danger-disabled-border: var(--ti-common-color-line-disabled);
	--ti-common-color-danger-disabled-text: var(--ti-common-color-text-disabled);
	--ti-common-color-danger-plain-disabled-bg-color: rgba(216, 186, 181, 0.1);
	--ti-common-color-info-normal: var(--ti-base-color-common-7);
	--ti-common-color-info-hover: var(--ti-base-color-common-4);
	--ti-common-color-info-active: var(--ti-base-color-common-4);
	--ti-common-color-info-disabled: #bfbfbf;
	--ti-common-color-info-disabled-bgcolor: var(--ti-common-color-bg-disabled);
	--ti-common-color-info-disabled-border: var(--ti-common-color-line-disabled);
	--ti-common-color-info-disabled-text: var(--ti-common-color-text-disabled);
	--ti-common-color-info-plain-disabled-bg-color: rgba(191, 191, 191, 0.1);
	--ti-common-color-text-primary: var(--ti-base-color-common-7);
	--ti-common-color-text-secondary: var(--ti-base-color-common-5);
	--ti-common-color-text-weaken: var(--ti-base-color-common-3);
	--ti-common-color-text-disabled: var(--ti-base-color-common-2);
	--ti-common-color-text-darkbg: var(--ti-base-color-common-2);
	--ti-common-color-text-darkbg-disabled: var(--ti-base-color-common-5);
	--ti-common-color-text-link: var(--ti-base-color-brand-7);
	--ti-common-color-text-link-hover: var(--ti-base-color-brand-8);
	--ti-common-color-text-link-darkbg: var(--ti-base-color-brand-4);
	--ti-common-color-text-link-darkbg-hover: var(--ti-base-color-brand-3);
	--ti-common-color-text-highlight: var(--ti-base-color-brand-7);
	--ti-common-color-text-white: var(--ti-base-color-white);
	--ti-common-color-text-gray: var(--ti-base-color-white);
	--ti-common-color-text-gray-disabled: var(--ti-base-color-common-4);
	--ti-common-color-text-important: var(--ti-base-color-error-4);
	--ti-common-color-placeholder: var(--ti-base-color-common-2);
	--ti-common-color-selected-text-color: var(--ti-common-color-light);
	--ti-common-color-icon-normal: var(--ti-base-color-common-5);
	--ti-common-color-icon-hover: var(--ti-base-color-brand-6);
	--ti-common-color-icon-active: var(--ti-base-color-brand-6);
	--ti-common-color-icon-disabled: var(--ti-base-color-common-2);
	--ti-common-color-icon-white: var(--ti-base-color-white);
	--ti-common-color-icon-graybg-normal: var(--ti-base-color-common-2);
	--ti-common-color-icon-graybg-hover: var(--ti-base-color-brand-6);
	--ti-common-color-icon-graybg-active: var(--ti-base-color-brand-6);
	--ti-common-color-icon-graybg-disabled: var(--ti-base-color-common-1);
	--ti-common-color-icon-darkbg-normal: var(--ti-base-color-common-2);
	--ti-common-color-icon-darkbg-hover: var(--ti-base-color-brand-5);
	--ti-common-color-icon-darkbg-active: var(--ti-base-color-brand-5);
	--ti-common-color-icon-darkbg-disabled: var(--ti-base-color-common-5);
	--ti-common-color-icon-info: var(--ti-base-color-icon-info);
	--ti-common-color-bg-normal: var(--ti-base-color-bg-6);
	--ti-common-color-bg-emphasize: var(--ti-base-color-brand-6);
	--ti-common-color-bg-disabled: var(--ti-base-color-bg-5);
	--ti-common-color-bg-hover: var(--ti-base-color-brand-8);
	--ti-common-color-bg-gray: var(--ti-base-color-bg-4);
	--ti-common-color-bg-secondary: var(--ti-base-color-common-2);
	--ti-common-bg-primary: var(--ti-base-color-bg-8);
	--ti-common-bg-primary-hover: var(--ti-base-color-bg-7);
	--ti-common-bg-primary-active: var(--ti-base-color-bg-9);
	--ti-common-bg-minor: var(--ti-base-color-bg-2);
	--ti-common-bg-minor-hover: var(--ti-base-color-bg-1);
	--ti-common-bg-minor-active: var(--ti-base-color-bg-3);
	--ti-common-color-bg-white-normal: var(--ti-base-color-white);
	--ti-common-color-bg-white-emphasize: var(--ti-base-color-brand-1);
	--ti-common-color-bg-light-normal: var(--ti-base-color-brand-2);
	--ti-common-color-bg-light-emphasize: var(--ti-base-color-brand-3);
	--ti-common-color-bg-dark-normal: var(--ti-base-color-common-6);
	--ti-common-color-bg-dark-emphasize: var(--ti-base-color-common-4);
	--ti-common-color-bg-dark-active: var(--ti-common-color-bg-normal);
	--ti-common-color-bg-dark-deep: var(--ti-base-color-common-6);
	--ti-common-color-bg-dark-disabled: var(--ti-base-color-common-1);
	--ti-common-color-bg-navigation: var(--ti-base-color-common-8);
	--ti-common-color-bg-dark-select: var(--ti-base-color-common-9);
	--ti-common-color-selected-background: var(--ti-base-color-brand-6);
	--ti-common-color-hover-background: var(--ti-base-color-brand-1);
	--ti-common-color-data-1: var(--ti-base-color-success-3);
	--ti-common-color-data-2: var(--ti-base-color-icon-info);
	--ti-common-color-data-3: var(--ti-base-color-data-3);
	--ti-common-color-data-4: var(--ti-base-color-data-4);
	--ti-common-color-data-5: var(--ti-base-color-data-5);
	--ti-common-color-data-6: var(--ti-base-color-warn-3);
	--ti-common-color-data-7: var(--ti-base-color-warn-4);
	--ti-common-color-data-8: var(--ti-base-color-error-3);
	--ti-common-line-height-number: 1.5;
	--ti-common-line-height-base: 12px;
	--ti-common-line-height-1: 14px;
	--ti-common-line-height-2: 16px;
	--ti-common-line-height-3: 18px;
	--ti-common-line-height-4: 20px;
	--ti-common-line-height-5: 24px;
	--ti-common-line-height-6: 32px;
	--ti-common-line-height-7: 36px;
	--ti-common-space-base: 4px;
	--ti-common-space-2x: calc(var(--ti-common-space-base) * 2);
	--ti-common-space-3x: calc(var(--ti-common-space-base) * 3);
	--ti-common-space-4x: calc(var(--ti-common-space-base) * 4);
	--ti-common-space-5x: calc(var(--ti-common-space-base) * 5);
	--ti-common-space-6x: calc(var(--ti-common-space-base) * 6);
	--ti-common-space-8x: calc(var(--ti-common-space-base) * 8);
	--ti-common-space-10x: calc(var(--ti-common-space-base) * 10);
	--ti-common-space-0: 0px;
	--ti-common-space-1: 1px;
	--ti-common-space-6: 6px;
	--ti-common-space-10: 10px;
	--ti-common-dropdown-gap: 2px;
	--ti-common-shadow-none: none;
	--ti-common-shadow-1-up: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);
	--ti-common-shadow-1-down: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
	--ti-common-shadow-1-left: -1px 0px 4px 0 rgba(0, 0, 0, 0.1);
	--ti-common-shadow-1-right: 1px 0px 4px 0 rgba(0, 0, 0, 0.1);
	--ti-common-shadow-2-up: 0 -2px 8px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-2-down: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-2-left: -2px 0 8px 0 rgba(238, 10, 10, 0.2);
	--ti-common-shadow-2-right: 2px 0 8px 0 rgba(252, 5, 5, 0.2);
	--ti-common-shadow-3-up: 0 -4px 16px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-3-down: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-3-left: -4px 0 16px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-3-right: 4px 0 16px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-4-up: 0 -8px 40px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-4-down: 0 8px 40px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-4-left: -8px 0 40px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-4-right: 8px 0 40px 0 rgba(0, 0, 0, 0.2);
	--ti-common-shadow-error: 0 1px 3px 0 rgba(199, 54, 54, 0.25);
	--ti-common-shadow-warn: 0 1px 3px 0 rgba(204, 100, 20, 0.25);
	--ti-common-shadow-prompt: 0 1px 3px 0 rgba(70, 94, 184, 0.25);
	--ti-common-shadow-success: 0 1px 3px 0 rgba(39, 176, 128, 0.25);
	--ti-common-font-family:
		"Helvetica", "Arial", "PingFangSC-Regular", "Hiragino Sans GB", "Microsoft YaHei",
		"微软雅黑", "Microsoft JhengHei";
	--ti-common-font-size-base: 12px;
	--ti-common-font-size-1: 14px;
	--ti-common-font-size-2: 16px;
	--ti-common-font-size-3: 18px;
	--ti-common-font-size-4: 20px;
	--ti-common-font-size-5: 24px;
	--ti-common-font-size-6: 32px;
	--ti-common-font-size-7: 36px;
	--ti-common-font-weight-1: 100;
	--ti-common-font-weight-2: 200;
	--ti-common-font-weight-3: 300;
	--ti-common-font-weight-4: normal;
	--ti-common-font-weight-5: 500;
	--ti-common-font-weight-6: 600;
	--ti-common-font-weight-7: bold;
	--ti-common-font-weight-8: 800;
	--ti-common-font-weight-9: 900;
	--ti-common-font-weight-bold: 700;
	--ti-common-color-line-normal: var(--ti-base-color-common-2);
	--ti-common-color-line-hover: var(--ti-base-color-common-5);
	--ti-common-color-line-active: var(--ti-base-color-brand-6);
	--ti-common-color-line-disabled: var(--ti-base-color-common-1);
	--ti-common-color-line-dividing: var(--ti-base-color-common-1);
	--ti-common-color-dash-line-normal: var(--ti-base-color-common-5);
	--ti-common-color-dash-line-hover: var(--ti-base-color-brand-7);
	--ti-common-color-border: var(--ti-base-color-common-2);
	--ti-common-color-border-hover: var(--ti-base-color-common-5);
	--ti-common-border-weight-normal: 1px;
	--ti-common-border-weight-1: 2px;
	--ti-common-border-weight-2: 3px;
	--ti-common-border-style-dashed: dashed;
	--ti-common-border-style-dotted: dotted;
	--ti-common-border-style-solid: solid;
	--ti-common-border-radius-normal: 2px;
	--ti-common-border-radius-0: 0px;
	--ti-common-border-radius-1: 4px;
	--ti-common-border-radius-2: 8px;
	--ti-common-border-radius-3: 50%;
	--ti-common-size-base: 4px;
	--ti-common-size-2x: calc(var(--ti-common-size-base) * 2);
	--ti-common-size-3x: calc(var(--ti-common-size-base) * 3);
	--ti-common-size-4x: calc(var(--ti-common-size-base) * 4);
	--ti-common-size-5x: calc(var(--ti-common-size-base) * 5);
	--ti-common-size-6x: calc(var(--ti-common-size-base) * 6);
	--ti-common-size-7x: calc(var(--ti-common-size-base) * 7);
	--ti-common-size-8x: calc(var(--ti-common-size-base) * 8);
	--ti-common-size-9x: calc(var(--ti-common-size-base) * 9);
	--ti-common-size-10x: calc(var(--ti-common-size-base) * 10);
	--ti-common-size-11x: calc(var(--ti-common-size-base) * 11);
	--ti-common-size-12x: calc(var(--ti-common-size-base) * 12);
	--ti-common-size-13x: calc(var(--ti-common-size-base) * 13);
	--ti-common-size-14x: calc(var(--ti-common-size-base) * 14);
	--ti-common-size-15x: calc(var(--ti-common-size-base) * 15);
	--ti-common-size-16x: calc(var(--ti-common-size-base) * 16);
	--ti-common-size-17x: calc(var(--ti-common-size-base) * 17);
	--ti-common-size-18x: calc(var(--ti-common-size-base) * 18);
	--ti-common-size-19x: calc(var(--ti-common-size-base) * 19);
	--ti-common-size-20x: calc(var(--ti-common-size-base) * 20);
	--ti-common-size-21x: calc(var(--ti-common-size-base) * 21);
	--ti-common-size-22x: calc(var(--ti-common-size-base) * 22);
	--ti-common-size-23x: calc(var(--ti-common-size-base) * 23);
	--ti-common-size-24x: calc(var(--ti-common-size-base) * 24);
	--ti-common-size-25x: calc(var(--ti-common-size-base) * 25);
	--ti-common-size-26x: calc(var(--ti-common-size-base) * 26);
	--ti-common-size-27x: calc(var(--ti-common-size-base) * 27);
	--ti-common-size-28x: calc(var(--ti-common-size-base) * 28);
	--ti-common-size-29x: calc(var(--ti-common-size-base) * 29);
	--ti-common-size-30x: calc(var(--ti-common-size-base) * 30);
	--ti-common-size-31x: calc(var(--ti-common-size-base) * 31);
	--ti-common-size-32x: calc(var(--ti-common-size-base) * 32);
	--ti-common-size-33x: calc(var(--ti-common-size-base) * 33);
	--ti-common-size-34x: calc(var(--ti-common-size-base) * 34);
	--ti-common-size-35x: calc(var(--ti-common-size-base) * 35);
	--ti-common-size-36x: calc(var(--ti-common-size-base) * 36);
	--ti-common-size-37x: calc(var(--ti-common-size-base) * 37);
	--ti-common-size-38x: calc(var(--ti-common-size-base) * 38);
	--ti-common-size-39x: calc(var(--ti-common-size-base) * 39);
	--ti-common-size-40x: calc(var(--ti-common-size-base) * 40);
	--ti-common-size-41x: calc(var(--ti-common-size-base) * 41);
	--ti-common-size-42x: calc(var(--ti-common-size-base) * 42);
	--ti-common-size-43x: calc(var(--ti-common-size-base) * 43);
	--ti-common-size-44x: calc(var(--ti-common-size-base) * 44);
	--ti-common-size-45x: calc(var(--ti-common-size-base) * 45);
	--ti-common-size-46x: calc(var(--ti-common-size-base) * 46);
	--ti-common-size-47x: calc(var(--ti-common-size-base) * 47);
	--ti-common-size-48x: calc(var(--ti-common-size-base) * 48);
	--ti-common-size-49x: calc(var(--ti-common-size-base) * 49);
	--ti-common-size-50x: calc(var(--ti-common-size-base) * 50);
	--ti-common-size-0: 0px;
	--ti-common-size-auto: auto;
	--ti-common-size-width-large: var(--ti-common-size-33x);
	--ti-common-size-width-medium: var(--ti-common-size-30x);
	--ti-common-size-width-normal: var(--ti-common-size-20x);
	--ti-common-size-height-large: var(--ti-common-size-12x);
	--ti-common-size-height-medium: var(--ti-common-size-10x);
	--ti-common-size-height-small: var(--ti-common-size-8x);
	--ti-common-size-height-normal: var(--ti-common-size-7x);
	--ti-common-size-height-mini: var(--ti-common-size-6x);
	--ti-common-scrollbar-width: 4px;
	--ti-common-scrollbar-height: 4px;
	--ti-common-scrollbar-track-piece-bg-color: var(--ti-base-color-bg-4);
	--ti-common-scrollbar-thumb-bg-color: #bfbfbf;
	--ti-common-scrollbar-thumb-border-radius: 6px;
	--ti-common-scrollbar-thumb-hover-bg-color: #999999;
	--ti-common-scrollbar-thumb-active-bg-color: #999999;

	--border-radius: 0;
	--border-radius--small: 0;
	--border-radius--mini: 0;

	--normal-box-shadow: unset;

	.el-select__caret {
		&.el-input__icon {
			&.el-icon-arrow-up {
				color: var(--ui-base-color-5);
				&::before {
					content: "\e78f";
					// content: "\e790";
				}
			}
		}
	}
}

/* xAlert */
:root[data-theme="tiny"] {
	--xAlert-border-radius: var(--border-radius);
	--xAlert-color: var(--ti-base-color-common-7);
	--xAlert-color-desc: var(--el-text-color-secondary);
	--xAlert-close-btn-color: var(--el-text-color-disabled);

	--xAlert-info-light-bg-color: var(--ti-base-color-prompt-1);
	--xAlert-info-light-border-color: var(--ti-base-color-brand-3);
	--xAlert-info-light-color: var(--ti-base-color-brand-6);

	--xAlert-success-light-bg-color: var(--ti-base-color-success-1);
	--xAlert-success-light-border-color: var(--ti-base-color-success-2);
	--xAlert-success-light-color: var(--ti-base-color-success-3);

	--xAlert-error-light-bg-color: var(--ti-base-color-error-1);
	--xAlert-error-light-border-color: var(--ti-base-color-error-2);
	--xAlert-error-light-color: var(--ti-base-color-error-3);

	--xAlert-warning-light-bg-color: var(--ti-base-color-warn-1);
	--xAlert-warning-light-border-color: var(--ti-base-color-warn-2);
	--xAlert-warning-light-color: var(--ti-base-color-warn-3);

	--xMessage-success-border-color: var(--xAlert-success-light-border-color);

	.el-alert {
		border: 1px solid transparent;
		.el-alert__title {
			color: var(--xAlert-color);
		}

		.el-alert__description {
			color: var(--xAlert-color-desc);
		}

		&.el-alert--info {
			&.is-light {
				border-color: var(--xAlert-info-light-border-color);
				background-color: var(--xAlert-info-light-bg-color);
			}

			&.is-dark {
				border-color: var(--xAlert-info-light-border-color);
				background-color: var(--xAlert-info-light-bg-color);
			}
			.el-alert__icon,
			.el-alert__closebtn {
				color: var(--xAlert-info-light-color);
			}
		}
		&.el-alert--success {
			&.is-light {
				border-color: var(--xAlert-success-light-border-color);
				background-color: var(--xAlert-success-light-bg-color);
			}

			&.is-dark {
				border-color: var(--xAlert-success-light-border-color);
				background-color: var(--xAlert-success-light-bg-color);
			}
			.el-alert__icon,
			.el-alert__closebtn {
				color: var(--xAlert-success-light-color);
			}
		}
		&.el-alert--warning {
			&.is-light {
				border-color: var(--xAlert-warning-light-border-color);
				background-color: var(--xAlert-warning-light-bg-color);
			}

			&.is-dark {
				border-color: var(--xAlert-warning-light-border-color);
				background-color: var(--xAlert-warning-light-bg-color);
			}
			.el-alert__icon,
			.el-alert__closebtn {
				color: var(--xAlert-warning-light-color);
			}
		}
		&.el-alert--error {
			&.is-light {
				border-color: var(--xAlert-error-light-border-color);
				background-color: var(--xAlert-error-light-bg-color);
			}

			&.is-dark {
				border-color: var(--xAlert-error-light-border-color);
				background-color: var(--xAlert-error-light-bg-color);
			}
			.el-alert__icon,
			.el-alert__closebtn {
				color: var(--xAlert-error-light-color);
			}
		}
	}

	.el-message {
		--xMessage-info-border-color: var(--xAlert-info-light-border-color);
		--xMessage-success-border-color: var(--xAlert-success-light-border-color);
		--xMessage-warning-border-color: var(--xAlert-warning-light-border-color);
		--xMessage-error-border-color: var(--xAlert-error-light-border-color);

		--xMessage-info-icon-color: var(--xAlert-info-light-color);
		--xMessage-success-icon-color: var(--xAlert-success-light-color);
		--xMessage-warning-icon-color: var(--xAlert-warning-light-color);
		--xMessage-error-icon-color: var(--xAlert-error-light-color);

		--xMessage-content-color: var(--xAlert-color);

		/* icon */
		/* info */
		--el-text-color-secondary: var(--xMessage-info-icon-color);
		/* success */
		--el-color-success: var(--xMessage-success-icon-color);
		/* warning */
		--el-color-warning: var(--xMessage-warning-icon-color);
		/* error */
		--el-color-error: var(--xMessage-error-icon-color);

		.el-message__content {
			color: var(--xMessage-content-color);
		}

		.el-message__icon {
			font-size: 16px;
		}
	}

	.xNotification {
		border-radius: 0;
		.el-icon-success {
			color: var(--ti-base-color-success-4);
		}
		&.success {
			border-color: var(--xAlert-success-light-border-color);
			background-color: var(--xAlert-success-light-bg-color);
		}
		&.info {
			border-color: var(--xAlert-info-light-border-color);
			background-color: var(--xAlert-info-light-bg-color);
			.el-icon-info {
				color: var(--xAlert-info-light-color);
			}
		}
		&.warning {
			border-color: var(--xAlert-warning-light-border-color);
			background-color: var(--xAlert-warning-light-bg-color);
		}
		&.error {
			border-color: var(--xAlert-error-light-border-color);
			background-color: var(--xAlert-error-light-bg-color);
		}
	}

	.el-input-group__append,
	.el-input-group__prepend {
		background-color: transparent;
	}
}

/* *************** */
/* oc */
</style>
