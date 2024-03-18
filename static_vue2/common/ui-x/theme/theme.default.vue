<style lang="less">
@charset "utf-8";

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
	--ui-primary: #5e7ce0;
	--ui-primary-hover: #7693f5;
	--ui-primary-active: #344899;
	--ui-primary-light-3: #8ea3e9;
	--ui-primary-light-5: #afbef0;
	--ui-primary-light-7: #cfd8f6;
	--ui-primary-light-8: #dfe5f9;
	--ui-primary-light-9: #eff2fc;
	--ui-primary-dark-2: #4b63b3;
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
	--el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);
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
	--ui-brand-foil: #f2f2f3;
	--ui-brand-hover: #7693f5;
	--ui-brand-active: #526ecc;
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
	--ui-primary-disabled: #beccfa;
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
	--ui-primary-bg: #f2f5fc;
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
	--xItem-wrapper-width: 200px;
	--xItem-label-width: 120px;
	--xItem-label-position: flex-end;
	--xItem-error-bg: var(--el-bg-color);

	/* xAlert */
}

/* xAlert */

:root {
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

/* gap-gap-gap-gap-gap */

/* .mr8 pr8 */
/* padding */
@listA: 5, 10, 15, 20, 4, 8, 16, 32, 48, 64;

each(@listA, {
	.padding@{value} {
		padding: @value*1px;
	}
});

each(@listA, {
	.margin@{value} {
		margin: @value*1px;
	}
});

@list: 1, 2, 3, 4, 5;

each(@list, {
	.flex@{value} {
		flex: @value;
	}
});

/* flex1 flex2 */

.gapFn(@type; @position; @gap) {
	.m@{type}@{gap} {
		margin-@{position}: @gap*1px;
	}

	.p@{type}@{gap} {
		padding-@{position}: @gap*1px;
	}
}

.loopGapFn(@gap) {
	.gapFn(t; top; @gap);
	.gapFn(r; right; @gap);
	.gapFn(b; bottom; @gap);
	.gapFn(l; left; @gap);
}

.loopGapFn(4);
.loopGapFn(5);
.loopGapFn(8);
.loopGapFn(10);
.loopGapFn(15);
.loopGapFn(16);
.loopGapFn(20);
.loopGapFn(25);
.loopGapFn(32);

.margin {
	margin: var(--ui-one);
}
.padding {
	padding: var(--ui-one);
}

.mpFn(@type;@position) {
	.m@{type} {
		margin-@{position}: var(--ui-one);
	}

	.p@{type} {
		padding-@{position}: var(--ui-one);
	}
}

.mpFn(t; top;);
.mpFn(r; right;);
.mpFn(b; bottom;);
.mpFn(l; left;);

/* gap-gap-gap-gap-gap */

/* padding */
/* flex1 flex2 @i: 1;*/
/* .flex-loop (@i) when (@i <= 50) { .flex@{i} { flex: @i; } .flex-loop(@i + 1); } */

.flex {
	display: flex !important;
	&.like-float {
		flex-flow: row wrap;

		.el-button + .el-button {
			margin-left: 0;
		}

		.xItem-wrapper + .xItem-wrapper {
			margin-top: 0;
		}
	}
	&.vertical {
		flex-flow: column nowrap;
		&.start {
			align-items: flex-start;
		}
	}
	&.horizon {
		flex-flow: row nowrap;
	}
	&.between {
		justify-content: space-between;
	}
	&.start {
		justify-content: flex-start;
	}
	&.end {
		justify-content: flex-end;
	}
	&.center {
		justify-content: center;
	}

	&.middle {
		align-items: center;
	}

	&.top {
		align-items: flex-start;
	}

	&.baseline {
		align-items: baseline;
	}
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

.flex1-overflow-auto {
	flex: 1;
	height: 1px;
	overflow: auto;
}

.color-secondary {
	color: var(--el-text-color-secondary);
}
.dialog-content-wrapper {
	border: 1px solid var(--el-border-color-lighter);
	padding: var(--ui-one);
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
}
.dev {
	outline: 1px solid red;
}

.display-none {
	display: none;
}

.cursor {
	cursor: pointer;
}

.overflow-auto {
	overflow: auto;
}

.text-align-center {
	text-align: center;
}
.text-align-left {
	text-align: left;
}
.text-align-right {
	text-align: left;
}

.clearfix:before,
.clearfix:after {
	content: "";
	display: table;
}

.clearfix:after {
	clear: both;
}

.clear {
	clear: both;
	overflow: hidden;
}

body {
	color: var(--el-text-color-primary);
	font-size: 13px;
	padding: 0;
	margin: 0;
	background-color: var(--ui-embed-search-bg-hover) !important;
}

.opacity0 {
	opacity: 0;
}

ul,
li {
	padding: 0;
	margin: 0;
	list-style: none;
}

.help-block {
	margin-bottom: 0px !important;
	color: red !important;
}

a {
	text-decoration: none;
	color: var(--ui-primary);
	cursor: pointer;
}

a:hover,
a:visited,
a:link,
a:active {
	color: #333;
}

.pointer {
	&:hover {
		cursor: pointer;
	}

	svg {
		color: var;
	}
}

svg.pointer {
	color: var(--ui-primary);
	&:focus,
	&:hover,
	&:active {
		border-color: transparent;
		background-color: transparent;
	}

	&:focus,
	&:hover {
		color: var(--ui-primary-hover);
	}

	&:active {
		color: var(--ui-primary-active);
	}

	&.is-disabled,
	&.is-disabled:focus,
	&.is-disabled:hover,
	&:active {
		border-color: transparent;
	}

	&.is-disabled {
		color: var(--el-button-disabled-text-color);
		background-color: transparent;
	}
}

.red {
	color: #d9534f !important;
}

.blue {
	color: #2bbc0f !important;
}

.box {
	width: 50px;
	text-align: center;
	height: 16px;
	line-height: 16px;
	color: #fff;
	margin: 0 auto;
	font-size: 12px;
}

/* ------------------------ page ------------------------*/

/* ------------------------ common entry ------------------------*/

.width100 {
	width: 100%;
}

.height100 {
	height: 100%;
}

/* grid */
.grid {
	display: grid;

	&.col1 {
		grid-template-columns: repeat(1, 1fr);
	}

	&.col2 {
		grid-template-columns: repeat(2, 1fr);
	}

	&.col3 {
		grid-template-columns: repeat(3, 1fr);
	}

	&.col4 {
		grid-template-columns: repeat(4, 1fr);
	}

	&.col5 {
		grid-template-columns: repeat(5, 1fr);
	}

	&.col11 {
		grid-template-columns: 1fr 1fr;
	}

	&.col12 {
		grid-template-columns: 1fr 2fr;
	}

	&.col211 {
		grid-template-columns: 2fr 1fr 1fr;
	}

	&.row11 {
		grid-template-rows: 1fr 1fr;
	}

	&.row45 {
		grid-template-rows: 4fr 5fr;
	}
	&.row55 {
		grid-template-columns: 50% 50%;
	}
	&.row514 {
		grid-template-columns: 50% 10% 40%;
	}
	&.row64 {
		grid-template-columns: 60% 40%;
	}
	&.row73 {
		grid-template-columns: 70% 30%;
	}
	&.row37 {
		grid-template-columns: 30% 70%;
	}
}

.flex025 {
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
}

.flex024,
.flex025 {
	-webkit-box-flex: 0;
}

.flex024 {
	-ms-flex: 0 0 24%;
	flex: 0 0 24%;
}

.ellipsis {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.layui-layer.layui-layer-tips .layui-layer-content {
	/*overflow: auto;*/
	color: black;
}

.layui-layer[type="page"] {
	display: flex;
	flex-flow: column nowrap;
}

.layui-layer[type="page"] .layui-layer-content {
	flex: 1;
}

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

/* 美化滑动条 */
div,
ul,
code,
html,
body,
#app,
.beautiful-scroll {
	&::-webkit-scrollbar {
		transition: 1s all ease;
		width: 8px;
		height: 8px;
		background-color: white;
		/* or add it to the track */
	}
	&::-webkit-scrollbar-thumb {
		background: transparent;
		// background: var(--ui-thumb-hover);
		border-radius: var(--border-radius);
		border: 1px solid white;
		transition: all 120ms ease-out;
	}
	&:hover {
		&::-webkit-scrollbar-thumb {
			background: var(--ui-thumb-hover);
		}
	}
}

.warning-color {
	color: red;
}

.x-loading {
	min-height: 48px;
	position: relative;
	overflow: hidden;
	pointer-events: none;
}

.x-loading::before {
	pointer-events: auto;
	content: " ";
	display: block;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	position: absolute;
	background: url(/common/assets/svg/x-loading.svg) center no-repeat;
	// background-color: red;
	z-index: 9999999998;
}
.x-disabled {
	opacity: 0.5;
	position: relative;
	pointer-events: none;
}

.x-disabled::before {
	pointer-events: auto;
	content: " ";
	display: block;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	position: absolute;
	z-index: 9999999999;
}

.white-border {
	background-color: var(--color-white);
	border-radius: var(--border-radius);
	overflow: hidden;
}

/* ************************useXui_css_variable*********************** */
.xDataGrid,
.xTable {
	.empty {
		width: 300px;
		height: 150px;
		padding: 40px;
		padding-bottom: 20px;
	}
}

.AppLayoutMain {
	display: flex;
	height: 1px;
	flex: 1;
	flex-flow: row nowrap;
	width: 100%;
	overflow: hidden;

	> .AppLayoutLeft {
		height: 100%;
	}

	> .AppLayoutContent {
		flex: 1;
		width: 1px;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
	}
}

.page-content-middle {
	flex: 1;
	height: 1px;
}
.width80 {
	width: 80%;
}
.width90 {
	width: 90%;
}
.marginAuto {
	margin: 0 auto;
}

/* *************************** */
#AppLayoutLeft {
	width: var(--left-aside-width);
	position: relative;
	background-color: #ffffff;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	box-shadow: var(--normal-box-shadow);

	&.close {
		> .padding {
			padding: 0;
			overflow: hidden;
		}
	}

	aside.sidebar-menu-wrapper {
		position: relative;
		height: 1px;
		flex: 1;
		width: var(--left-aside-width);

		&.hide {
			.log-title-wrapper,
			.sidebar-menu {
				display: none;
			}
		}

		.log-title-wrapper {
			> .xIcon {
				width: 48px;
				height: 48px;
				margin: 30px 30px 0;
			}

			> .title {
				position: relative;
				font-size: 20px;
				padding-bottom: 30px;
				font-weight: 700;
				background: var(--el-color-white);
				text-align: left;

				&::before {
					content: " ";
					display: block;
					position: absolute;
					left: 4px;
					right: 8px;
					bottom: 10px;
					border-bottom: 1px dashed var(--el-text-color-placeholder);
					z-index: 1;
				}
			}
		}

		.sidebar-menu {
			overflow: auto;
			flex: 1;

			.el-menu {
				border-right: unset;

				.el-submenu {
					.el-submenu__title {
						--height: 48px;
						height: var(--height);
						line-height: var(--height);
					}
				}

				&.active {
					.el-submenu {
						.el-submenu__title {
							background-color: #ecf5ff;
							color: var(--ui-primary) !important;
							// font-weight: 600;

							&::before {
								content: " ";
								display: block;
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
								border-right: 4px solid var(--ui-primary) !important;
								z-index: 1;
							}
						}
					}
				}
			}
		}

		.leftmenu-toggle {
			--app-toggle-width: 10px;
			position: absolute;
			top: 50%;
			left: var(--left-aside-width);
			background-color: var(--el-color-white);
			border-radius: 0 var(--app-toggle-width) var(--app-toggle-width) 0;
			cursor: pointer;
			height: 80px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: var(--app-toggle-width);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1;

			&:hover {
				box-shadow: var(--el-box-shadow);
			}
		}
	}
}
</style>

<script lang="ts">
export default async function () {}
</script>
