<style lang="less">
@charset "utf-8";

/* CSS Document */
:root {
	color-scheme: light;
	--ui-one: 16px;
	--ui-one-reverse: -16px;
	--ui-half: 8px;
	--ui-height: 32px;
	--ui-half-reverse: -8px;
	--ui-primary: #5e7ce0;
	--ui-primary-hover: #7693f5;
	--ui-primary-active: #344899;
	--el-color-white: #ffffff;
	--el-color-black: #000000;
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
	--ui-text-weak: #575d6c;
	--ui-aide-text: #71757f;
	--ui-aide-text-hover: #252b3a;
	--ui-aide-text-stress: #575d6c;
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
	--xItem-label-width: 120px;
}

/* gap-gap-gap-gap-gap */

/* .mr8 pr8 */

.dev {
	outline: 1px solid red;
}

/* padding16 */
@listA: 4, 8, 16, 32, 48, 64;

each(@listA, {
	.padding@{value} {
		padding: @value*1px;
	}
});
/* padding16 */

/* flex1 flex2 */
@i: 1;

/* .flex-loop (@i) when (@i <= 50) {
  .flex@{i} {
    flex: @i;
  }

  .flex-loop(@i + 1);
} */

@list: 1, 2, 3, 4, 5;

each(@list, {
	.flex@{value} {
		flex: @value;
	}
});

/* flex1 flex2 */

.gapFn(@pos; @right; @gap) {
	.m@{pos}@{gap} {
		margin-@{right}: @gap*1px;
	}

	.p@{pos}@{gap} {
		padding-@{right}: @gap*1px;
	}
}

.loopGapFn(@gap) {
	.gapFn(t; top; @gap);
	.gapFn(r; right; @gap);
	.gapFn(b; bottom; @gap);
	.gapFn(l; left; @gap);
}

.loopGapFn(4);
.loopGapFn(8);
.loopGapFn(16);
.loopGapFn(32);
/* gap-gap-gap-gap-gap */

*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
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

.ellipsis {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

a {
	text-decoration: none;
	color: #6c92fa;
	cursor: pointer;
}

a:hover,
a:visited,
a:link,
a:active {
	color: #333;
}

/*

textarea {
    border: 1px solid #ddd;
    height: 56px;
    line-height: 28px;
    width: 200px;
    color: var(--el-text-color-primary);
    padding: 0 5px
}

input[type="number"] {
    border: 1px solid #ddd;
    height: 28px;
    line-height: 28px;
    width: 200px;
    color: var(--el-text-color-primary);
    padding: 0 5px
}

input[type="password"] {
    border: 1px solid #ddd;
    height: 28px;
    line-height: 28px;
    width: 200px;
    color: var(--el-text-color-primary);
    padding: 0 5px
}

input[type="text"] {
    border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    width: 200px;
    color: var(--el-text-color-primary);
    padding: 0 5px
}

input[type="date"] {
    border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    color: var(--el-text-color-primary);
    width: 200px;
}

input[type="checkbox"] {
    border: 1px solid #ddd;
}
*/

.pointer {
	&:hover {
		cursor: pointer;
	}
}

select {
	border: 1px solid #ddd;
	height: 30px;
	line-height: 30px;
	color: #788087;
	padding-left: 5px;
	width: 200px;
	color: var(--el-text-color-primary);
}

img {
	vertical-align: middle;
	padding-right: 5px;
	cursor: pointer;
}

.red {
	color: #d9534f !important;
}

.blue {
	color: #2bbc0f !important;
}

.p28 {
	font-size: 28px;
}

.fleft {
	float: left;
}

.fright {
	float: right;
}

.btn_blue {
	min-width: 70px;
	border: 1px solid #6c92fa;
	background-color: #6c92fa;
	font-size: 13px;
	color: #ffffff;
	line-height: 28px;
	text-align: center;
	height: 30px;
	border-radius: 3px;
	padding: 0 10px;
	cursor: pointer;
}

.btn_white {
	min-width: 70px;
	border: 1px solid #e1e2e8;
	background-color: #fff;
	font-size: 13px;
	color: #252529;
	line-height: 28px;
	text-align: center;
	height: 30px;
	border-radius: 3px;
	padding: 0 10px;
	cursor: pointer;
}

.btn_blue:hover {
	background-color: var(--ui-primary);
}

.btn.btn_blue:hover {
	color: white;
}

.btn_border {
	min-width: 70px;
	border: 1px solid #e1e2e8;
	background-color: #fff;
	color: #252529;
	line-height: 28px;
	height: 30px;
	vertical-align: middle;
	border-radius: 3px;
	padding: 0 10px;
	cursor: pointer;
}

.btn_none {
	font-size: 13px;
	color: #6b6b6b;
	line-height: 18px;
	height: 24px;
	border: none;
	background-color: #ffffff;
}

.btn_check {
	width: 45px;
	border: 1px solid #2c93ce;
	background-color: #2c93ce;
	font-size: 12px;
	color: #ffffff;
	line-height: 16px;
	height: 18px;
	border-radius: 10px;
	cursor: pointer;
}

.btn_gray {
	font-size: 13px;
	color: #6b6b6b;
	border: none;
	background-color: #ededed;
	border: 1px solid #ededed;
	line-height: 18px;
	height: 24px;
	width: 70px;
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

.pd_r5 {
	padding-right: 5px;
}

.pd_r15 {
	padding-right: 15px;
}

.mg_t20 {
	margin-top: 20px;
}

.pd_t5 {
	padding-top: 5px;
}

.mgl {
	margin-left: 15px;
}

.swidth {
	width: 80px !important;
}

.mwidth {
	width: 80% !important;
}

.w120 {
	width: 140px !important;
}

/* menu */
.sidebar {
	padding-top: 10px;
}

/* ------------------------ page ------------------------*/
.pd_r20 {
	padding-right: 20px;
}

.pd_l {
	padding-left: 20px;
}

.pd_t5 {
	padding-top: 5px;
}

.pd_b {
	padding-bottom: 15px;
}

.line {
	border-top: 2px dotted #c1c8d4;
	margin: 20px 0;
}

.red {
	color: #ed4949;
}

.text {
	color: #7e8890;
}

.text span {
	padding-right: 30px;
	line-height: 30px;
}

.title {
	font-size: 18px;
	padding: 20px 30px 0 30px;
	color: var(--el-text-color-primary);
}

.samebox {
	background-color: #f7f7fc;
	padding: 20px;
	margin-bottom: 15px;
	position: relative;
	margin-top: 10px;
}

.sametitle {
	font-size: 18px;
	position: relative;
	padding-bottom: 10px;
}

.sametitle i {
	background-color: #dddddd;
	width: 16px;
	height: 16px;
	position: absolute;
	border-radius: 20px;
	top: 6px;
}

.sametitle span {
	padding-left: 24px;
}

/* ------------------------ come entry ------------------------*/
.entry {
	display: table;
	width: 100%;
}

.entry_row {
	display: table-row;
}

.entry_caption {
	display: caption;
	font-size: 16px;
	padding: 20px 0 5px 0;
}

.entry_lcell {
	display: table-cell;
	text-align: left;
	padding: 8px 0;
	color: #252529;
	width: 120px;
}

.entry_rcell {
	display: table-cell;
	text-align: left;
	padding: 8px 30px 8px 30px;
	position: relative;
	color: #252529;
}

/*.wd{ width:500px}*/
.entry_lcell.small {
	min-width: 80px;
}

.entry_lcell.top {
	vertical-align: top;
}

.entry_rcell span {
	padding-right: 30px;
}

.smallinput {
	width: 160px !important;
}

.pad {
	padding: 10px;
}

.form-control {
	border: 1px solid #dcdfe6 !important;
}

.form-control.x-checkbox-group {
	border: unset;
	box-shadow: unset;
}

.form-control.x-datetime {
	border: unset !important;
	box-shadow: unset;
	padding: 0;
}

.form-control.x-time {
	border: unset !important;
	box-shadow: unset;
	padding: 0;
}

.form-control.x-checkbox-group [type="checkbox"] {
	margin: 0;
	margin-left: 4px;
}

.flex {
	display: -webkit-flex;
	display: flex;
	-webkit-justify-content: flex-start;
	justify-content: flex-start;
}

.flexcon {
	padding-right: 20px;
}

.mart {
	margin-top: 8px;
}

.user {
	width: 64px;
	height: 64px;
	border-radius: 64px;
	background-color: #f4f6f9;
	text-align: center;
	padding-top: 5px;
}

.search {
}

.search ul {
}

.search ul li {
	float: left;
	line-height: 30px;
	display: block;
}

.search ul li.th {
	padding-right: 10px;
}

.search ul li.td {
	padding-right: 30px;
}

.comtitle {
	font-size: 15px;
	line-height: 30px;
}

.dk_options ul li {
	float: none !important;
	line-height: normal !important;
}

/* 分页 */
.ui-paging-container {
	font-size: 12px;
	margin-top: 10px;
}

.ui-paging-container ul {
	overflow: hidden;
	text-align: center;
}

.ui-paging-container ul,
.ui-paging-container li {
	list-style: none;
}

.ui-paging-container li {
	display: inline-block;
	margin-left: 5px;
	color: #989898;
}

.ui-paging-container li.ui-pager {
	cursor: pointer;
	border: 1px solid #ddd;
	padding: 5px 12px;
	border-radius: 2px;
}

.ui-paging-container li.ui-pager:hover,
.ui-paging-container li.focus {
	color: #d9534f;
}

.ui-paging-container li.ui-paging-ellipse {
	border: none;
}

.ui-paging-container li.ui-paging-toolbar {
	padding: 0;
}

.ui-paging-container li.ui-paging-toolbar select {
	height: 30px;
	border: 1px solid #ddd;
	color: #989898;
}

.ui-paging-container li.ui-paging-toolbar input {
	border: 1px solid #ddd;
	text-align: center;
	margin: 0 0 0 5px;
	vertical-align: middle;
	width: 35px;
	height: 27px;
	color: #989898;
}

.ui-paging-container li.ui-paging-toolbar a {
	vertical-align: middle;
	text-decoration: none;
	display: inline-block;
	height: 28px;
	border: 1px solid #ddd;
	vertical-align: top;
	border-radius: 2px;
	line-height: 28px;
	padding: 0 10px;
	cursor: pointer;
	margin-left: 5px;
	color: #989898;
}

.cursor {
	cursor: pointer;
}

.ui-paging-container li.ui-paging-toolbar a:hover {
	background-color: #f6f6f6;
	cursor: pointer;
}

.ui-paging-container li.ui-pager-disabled,
.ui-paging-container li.ui-pager-disabled:hover {
	background-color: #f6f6f6;
	cursor: default;
	border: none;
	color: #ddd;
}

.usespan {
	padding-right: 2px !important;
}

/*  */

.width100 {
	width: 100%;
}

.height100 {
	height: 100%;
}

.width50 {
	width: 50px;
}

.width70 {
	width: 70px;
}

.width80 {
	width: 80px;
}

.width120 {
	width: 120px;
}

.width150 {
	width: 150px;
}

.width180 {
	width: 180px;
}

.width240 {
	width: 240px !important;
}

.width360 {
	width: 360px;
}

.width501 {
	width: 50%;
}

.pt5 {
	padding-top: 5px;
}

.pr5 {
	padding-right: 5px;
}

.pb5 {
	padding-bottom: 5px;
}

.mt5 {
	margin-top: 5px;
}

.mr5 {
	margin-right: 5px;
}

.mb5 {
	margin-bottom: 5px;
}

.mb8 {
	margin-bottom: 8px;
}

.ml4 {
	margin-left: 4px;
}

.ml5 {
	margin-left: 5px;
}

.mt10 {
	margin-top: 10px;
}

.mt20 {
	margin-top: 20px;
}

.mr10 {
	margin-right: 10px;
}

.mb10 {
	margin-bottom: 10px;
}

.ml10 {
	margin-left: 10px;
}

.mt20 {
	margin-top: 20px;
}

.mr20 {
	margin-right: 20px;
}

.mb20 {
	margin-bottom: 20px;
}

.m20 {
	margin-left: 20px;
}

.padding16 {
	padding: 16px;
}

.tr {
	text-align: right;
}

.mlt {
	margin-left: 10px;
	margin-top: 10px;
}

/*  */
/* grid */
.grid {
	display: grid;
}

.grid.col1 {
	grid-template-columns: repeat(1, 1fr);
}

.grid.col2 {
	grid-template-columns: repeat(2, 1fr);
}

.grid.col3 {
	grid-template-columns: repeat(3, 1fr);
}

.grid.col4 {
	grid-template-columns: repeat(4, 1fr);
}

.grid.col5 {
	grid-template-columns: repeat(5, 1fr);
}

.grid.col11 {
	grid-template-columns: 1fr 1fr;
}

.grid.col12 {
	grid-template-columns: 1fr 2fr;
}

.grid.col211 {
	grid-template-columns: 2fr 1fr 1fr;
}

.grid.row11 {
	grid-template-rows: 1fr 1fr;
}

.grid.row45 {
	grid-template-rows: 4fr 5fr;
}

.x-form-horizontal {
	margin-top: 15px;
}

.x-form-horizontal .form-item {
	margin-bottom: 15px;
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

.flex.vertical {
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-flow: column nowrap;
	flex-flow: column nowrap;
}

.flex.like-float {
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-flow: row wrap;
	flex-flow: row wrap;
}

.flex.like-float .el-button + .el-button {
	margin-left: 0;
}

.flex.between {
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.flex.start {
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
}

.flex.end {
	-webkit-box-pack: end;
	-ms-flex-pack: end;
	justify-content: flex-end;
}

.flex.center {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.flex.middle {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.flex.top {
	align-items: flex-start;
}

.flex.baseline {
	-webkit-box-align: baseline;
	-ms-flex-align: baseline;
	align-items: baseline;
}

.xTransfer {
	margin: 20px 0;
}

.xTransfer .card-body {
	min-width: 246px;
	height: 246px;
	overflow: auto;
}

.xTransfer .card {
	box-shadow: 0 3px 8px rgb(0 0 0 / 15%);
	border-radius: 2px;
	border: 0px solid var(--el-text-color-primary);
	padding: 10px;
	background-color: #ffff;
}

.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.search > ul > li.th.item {
	width: 196px;
}

tr.normal-list > td {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

tr.normal-list > th {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.operateCss a {
	color: var(--ui-primary) !important;
	text-decoration: none;
}

.operateCss a:hover {
	text-decoration: underline;
}

a[disabled] {
	cursor: not-allowed;
	opacity: 0.5;
}

.page_table tr td div {
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
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-flow: column nowrap;
}

ol.list-style-number > li {
	list-style: auto;
}

.x-table {
	width: 100%;
}

.table-container {
	position: relative;
	overflow: auto;
}

.x-table table tr {
	position: relative;
}

.x-table table td {
	border-bottom: 1px solid var(--el-border-color-lighter);
	padding-top: 5px;
	/*   height: 38px; */
	/*   font-size: 14px; */
	/*   color: #666; */
	font-size: 12px;
	color: #606266;
}

.page_table {
	border-collapse: collapse;
	width: 100%;
	background: #ffffff;
	margin-top: 10px;
}

.page_table-header {
	height: 35px;
	overflow: hidden;
	box-sizing: border-box;
	padding-top: -1px;
	margin: 0;
}

.page_table-header .page_table {
	margin-top: 0;
}

.page_table th,
.has-gutter th {
	background-color: var(--el-border-color-lighter) !important;
	height: 35px;
	text-align: left;
	color: var(--el-text-color-primary);
	font-size: 13px;
	font-weight: normal;
	border-bottom: 1px solid #ecedf2;
	padding-left: 8px;
}

.page_table td {
	height: 35px;
	border-bottom: 1px solid #ecedf2;
	border-collapse: collapse;
	text-align: left;
	padding: 0 8px;
	color: var(--el-text-color-primary);
}

.x-table .table-container [data-prop^="COL_"] {
	position: sticky;
	left: 0;
	background-color: #fff;
	overflow: visible;
}

.x-table .table-container [data-prop="COL_ACTIONS"] {
	position: sticky;
	right: 0;
}

.x-table .table-container .box-shadow_left td[data-prop^="COL_"]:first-child::after {
	position: absolute;
	top: 0;
	left: 0;
	right: 0px;
	bottom: -1%;
	transition: box-shadow 0.3s;
	content: "";
	pointer-events: none;
	box-shadow: rgba(0, 0, 0, 0.12) 10px 0px 8px -8px;
}

.x-table .table-container .box-shadow_right td[data-prop^="COL_"]:last-child::after {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: -1%;
	transition: box-shadow 0.3s;
	content: "";
	pointer-events: none;
	box-shadow: rgba(0, 0, 0, 0.12) 10px 0px 8px -8px inset;
}

/* 美化滑动条 */
.beautiful-scroll::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: white;
	/* or add it to the track */
}

.beautiful-scroll::-webkit-scrollbar-thumb {
	background: rgba(144, 147, 153, 0.5);
	border-radius: var(--border-radius);
	border: 1px solid white;
}

div::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: white;
	/* or add it to the track */
}

div::-webkit-scrollbar-thumb {
	background: rgba(144, 147, 153, 0.5);
	border-radius: var(--border-radius);
	border: 1px solid white;
}

ul::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: white;
	/* or add it to the track */
}

ul::-webkit-scrollbar-thumb {
	background: rgba(144, 147, 153, 0.5);
	border-radius: var(--border-radius);
	border: 1px solid white;
}

.warning-color {
	color: red;
}

.page-view {
	display: flex;
	flex-flow: column nowrap;
	height: 100%;
	justify-content: center;
}

.x-loading {
	min-height: 48px;
	position: relative;
	filter: blur(1px);
	overflow: hidden;
	pointer-events: none;
}

.x-loading::before {
	pointer-events: none;
	content: " ";
	display: block;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	position: absolute;
	background: url(/common/assets/svg/x-loading.svg) center no-repeat;
	// background-color: red;
	z-index: 9999999999;
}
</style>

<script>
export default async function () {
	(function addDirective() {
		[
			{ name: "ripple", url: "/common/ui-x/directive/ripple.vue" },
			{ name: "xloading", url: "/common/ui-x/directive/xloading.vue" }
		].forEach(async ({ url, name }) => {
			const directive = await _.$importVue(url);
			Vue.directive(name, directive);
		});
	})();

	(function useXui() {
		const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
		const ITEM_RENDER_EVT = "itemRendered";
		const SCROLL_EVT = "scroll";
		const FORWARD = "forward";
		const BACKWARD = "backward";
		const AUTO_ALIGNMENT = "auto";
		const SMART_ALIGNMENT = "smart";
		const START_ALIGNMENT = "start";
		const CENTERED_ALIGNMENT = "center";
		const END_ALIGNMENT = "end";
		const HORIZONTAL = "horizontal";
		const VERTICAL = "vertical";
		const RTL = "rtl";
		const RTL_OFFSET_NAG = "negative";
		const RTL_OFFSET_POS_ASC = "positive-ascending";
		const RTL_OFFSET_POS_DESC = "positive-descending";
		const ScrollbarDirKey = { [HORIZONTAL]: "left", [VERTICAL]: "top" };
		const TableV2InjectionKey = Symbol("tableV2");
		const SCROLLBAR_MIN_SIZE = 20;
		const BAR_MAP = {
			vertical: {
				offset: "offsetHeight",
				scroll: "scrollTop",
				scrollSize: "scrollHeight",
				size: "height",
				key: "vertical",
				axis: "Y",
				client: "clientY",
				direction: "top"
			},
			horizontal: {
				offset: "offsetWidth",
				scroll: "scrollLeft",
				scrollSize: "scrollWidth",
				size: "width",
				key: "horizontal",
				axis: "X",
				client: "clientX",
				direction: "left"
			}
		};

		const epPropKey = "__epPropKey";
		const isEpProp = val => _.isPlainObject(val) && !!val[epPropKey];
		const buildProp = (prop, key) => {
			if (!_.isPlainObject(prop) || isEpProp(prop)) return prop;
			const { values, required, default: defaultValue, type, validator } = prop;
			const _validator =
				values || validator
					? val => {
							let valid = false;
							let allowedValues = [];
							if (values) {
								allowedValues = Array.from(values);
								if (hasOwn(prop, "default")) {
									allowedValues.push(defaultValue);
								}
								valid ||= allowedValues.includes(val);
							}
							if (validator) valid ||= validator(val);
							if (!valid && allowedValues.length > 0) {
								const allowValuesText = [...new Set(allowedValues)].map(value => JSON.stringify(value)).join(", ");
								warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
							}
							return valid;
					  }
					: void 0;
			const epProp = {
				type,
				required: !!required,
				validator: _validator,
				[epPropKey]: true
			};
			if (hasOwn(prop, "default")) epProp.default = defaultValue;
			return epProp;
		};
		const mutable = val => val;

		function fromPairs(pairs) {
			var index = -1,
				length = pairs == null ? 0 : pairs.length,
				result = {};
			while (++index < length) {
				var pair = pairs[index];
				result[pair[0]] = pair[1];
			}
			return result;
		}

		const buildProps = props => {
			return fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option, key)]));
		};
		const definePropType = val => val;
		const defaultNamespace = "el";
		const namespaceContextKey = Symbol("namespaceContextKey");
		const useGetDerivedNamespace = namespaceOverrides => {
			const derivedNamespace = namespaceOverrides || inject(namespaceContextKey, ref(defaultNamespace));
			const namespace = computed(() => {
				return unref(derivedNamespace) || defaultNamespace;
			});
			return namespace;
		};

		const noop = () => {};
		const statePrefix = "is-";
		const _bem = (namespace, block, blockSuffix, element, modifier) => {
			let cls = `${namespace}-${block}`;
			if (blockSuffix) {
				cls += `-${blockSuffix}`;
			}
			if (element) {
				cls += `__${element}`;
			}
			if (modifier) {
				cls += `--${modifier}`;
			}
			return cls;
		};
		function renderThumbStyle({ move, size, bar }, layout2) {
			const style = {};
			const translate2 = `translate${bar.axis}(${move}px)`;
			style[bar.size] = size;
			style.transform = translate2;
			style.msTransform = translate2;
			style.webkitTransform = translate2;
			if (layout2 === "horizontal") {
				style.height = "100%";
			} else {
				style.width = "100%";
			}
			return style;
		}
		/**
		 * css 变量命名
		 */
		const useNamespace = (block, namespaceOverrides) => {
			const namespace = useGetDerivedNamespace(namespaceOverrides);
			const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
			const e = element => (element ? _bem(namespace.value, block, "", element, "") : "");
			const m = modifier => (modifier ? _bem(namespace.value, block, "", "", modifier) : "");
			const be = (blockSuffix, element) => (blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "");
			const em = (element, modifier) => (element && modifier ? _bem(namespace.value, block, "", element, modifier) : "");
			const bm = (blockSuffix, modifier) => (blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "");
			const bem = (blockSuffix, element, modifier) => (blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "");
			const is = (name, ...args) => {
				const state = args.length >= 1 ? args[0] : true;
				return name && state ? `${statePrefix}${name}` : "";
			};
			const cssVar = object => {
				const styles = {};
				for (const key in object) {
					if (object[key]) {
						styles[`--${namespace.value}-${key}`] = object[key];
					}
				}
				return styles;
			};
			const cssVarBlock = object => {
				const styles = {};
				for (const key in object) {
					if (object[key]) {
						styles[`--${namespace.value}-${block}-${key}`] = object[key];
					}
				}
				return styles;
			};
			const cssVarName = name => `--${namespace.value}-${name}`;
			const cssVarBlockName = name => `--${namespace.value}-${block}-${name}`;

			return {
				namespace,
				b,
				e,
				m,
				be,
				em,
				bm,
				bem,
				is,
				cssVar,
				cssVarName,
				cssVarBlock,
				cssVarBlockName
			};
		};

		/*****************/

		var columns = {
			type: definePropType(Array),
			required: true
		};
		var fixedDataType = {
			type: definePropType(Array)
		};
		var dataType = {
			...fixedDataType,
			required: true
		};
		var expandColumnKey = String;
		var expandKeys = {
			type: definePropType(Array),
			default: () => mutable([])
		};
		var requiredNumber = {
			type: Number,
			required: true
		};
		var rowKey = {
			type: definePropType([String, Number, Symbol]),
			default: "id"
		};
		var styleType = {
			type: definePropType(Object)
		};

		const itemSize = buildProp({
			type: definePropType([Number, Function]),
			required: true
		});
		const estimatedItemSize = buildProp({
			type: Number
		});
		const cache = buildProp({
			type: Number,
			default: 2
		});
		const direction = buildProp({
			type: String,
			values: ["ltr", "rtl"],
			default: "ltr"
		});
		const initScrollOffset = buildProp({
			type: Number,
			default: 0
		});
		const total = buildProp({
			type: Number,
			required: true
		});
		const layout = buildProp({
			type: String,
			values: ["horizontal", "vertical"],
			default: VERTICAL
		});
		const virtualizedProps = buildProps({
			className: {
				type: String,
				default: ""
			},
			containerElement: {
				type: definePropType([String, Object]),
				default: "div"
			},
			data: {
				type: definePropType(Array),
				default: () => mutable([])
			},
			direction,
			height: {
				type: [String, Number],
				required: true
			},
			innerElement: {
				type: [String, Object],
				default: "div"
			},
			styleV2: {
				type: definePropType([Object, String, Array])
			},
			useIsScrolling: {
				type: Boolean,
				default: false
			},
			width: {
				type: [Number, String],
				required: false
			},
			perfMode: {
				type: Boolean,
				default: true
			},
			scrollbarAlwaysOn: {
				type: Boolean,
				default: false
			}
		});
		const virtualizedListProps = buildProps({
			cache,
			estimatedItemSize,
			layout,
			initScrollOffset,
			total,
			itemSize,
			...virtualizedProps
		});
		const scrollbarSize = {
			type: Number,
			default: 6
		};
		const startGap = { type: Number, default: 0 };
		const endGap = { type: Number, default: 2 };
		const virtualizedScrollbarProps = buildProps({
			alwaysOn: Boolean,
			classV2: String,
			layout,
			total,
			ratio: {
				type: Number,
				required: true
			},
			clientSize: {
				type: Number,
				required: true
			},
			scrollFrom: {
				type: Number,
				required: true
			},
			scrollbarSize,
			startGap,
			endGap,
			visible: Boolean
		});

		const virtualizedGridProps = buildProps({
			columnCache: cache,
			columnWidth: itemSize,
			estimatedColumnWidth: estimatedItemSize,
			estimatedRowHeight: estimatedItemSize,
			initScrollLeft: initScrollOffset,
			initScrollTop: initScrollOffset,
			itemKey: {
				type: definePropType(Function),
				default: ({ columnIndex, rowIndex }) => `${rowIndex}:${columnIndex}`
			},
			rowCache: cache,
			rowHeight: itemSize,
			totalColumn: total,
			totalRow: total,
			hScrollbarSize: scrollbarSize,
			vScrollbarSize: scrollbarSize,
			scrollbarStartGap: startGap,
			scrollbarEndGap: endGap,
			role: String,
			...virtualizedProps
		});

		var requiredNumberType = {
			type: Number,
			required: true
		};
		var tableV2HeaderProps = buildProps({
			classV2: String,
			columns,
			fixedHeaderData: {
				type: definePropType(Array)
			},
			headerData: {
				type: definePropType(Array),
				required: true
			},
			headerHeight: {
				type: definePropType([Number, Array]),
				default: 50
			},
			rowWidth: requiredNumberType,
			rowHeight: {
				type: Number,
				default: 50
			},
			height: requiredNumberType,
			width: requiredNumberType
		});

		var columnsStyles = {
			type: definePropType(Object),
			required: true
		};

		var tableV2RowProps = buildProps({
			classV2: String,
			columns,
			columnsStyles,
			depth: Number,
			expandColumnKey,
			estimatedRowHeight: {
				...virtualizedGridProps.estimatedRowHeight,
				default: void 0
			},
			isScrolling: Boolean,
			onRowExpand: {
				type: definePropType(Function)
			},
			onRowHover: {
				type: definePropType(Function)
			},
			onRowHeightChange: {
				type: definePropType(Function)
			},
			rowData: {
				type: definePropType(Object),
				required: true
			},
			rowEventHandlers: {
				type: definePropType(Object)
			},
			rowIndex: {
				type: Number,
				required: true
			},
			rowKey,
			styleV2: {
				type: definePropType(Object)
			}
		});

		var tableV2GridProps = buildProps({
			columns,
			data: dataType,
			fixedData: fixedDataType,
			estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
			width: requiredNumber,
			height: requiredNumber,
			headerWidth: requiredNumber,
			headerHeight: tableV2HeaderProps.headerHeight,
			bodyWidth: requiredNumber,
			rowHeight: requiredNumber,
			cache: virtualizedListProps.cache,
			useIsScrolling: Boolean,
			scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
			scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
			scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,
			classV2: String,
			styleV2: styleType,
			containerStyle: styleType,
			getRowHeight: {
				type: definePropType(Function),
				required: true
			},
			rowKey: tableV2RowProps.rowKey,
			onRowsRendered: {
				type: definePropType(Function)
			},
			onScroll: {
				type: definePropType(Function)
			}
		});
		var tableV2Props = buildProps({
			/* Vue2 不支持class style作为props传入 */
			classV2: String,
			styleV2: {
				type: definePropType(Object)
			},
			cache: tableV2GridProps.cache,
			estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
			rowKey,
			headerClass: {
				type: definePropType([String, Function])
			},
			headerProps: {
				type: definePropType([Object, Function])
			},
			headerCellProps: {
				type: definePropType([Object, Function])
			},
			headerHeight: tableV2HeaderProps.headerHeight,
			footerHeight: {
				type: Number,
				default: 0
			},
			rowClass: {
				type: definePropType([String, Function])
			},
			rowProps: {
				type: definePropType([Object, Function])
			},
			rowHeight: {
				type: Number,
				default: 50
			},
			cellProps: {
				type: definePropType([Object, Function])
			},
			columns,
			data: dataType,
			dataGetter: {
				type: definePropType(Function)
			},
			fixedData: fixedDataType,
			expandColumnKey: tableV2RowProps.expandColumnKey,
			expandedRowKeys: expandKeys,
			defaultExpandedRowKeys: expandKeys,
			fixed: Boolean,
			width: requiredNumber,
			height: requiredNumber,
			maxHeight: Number,
			useIsScrolling: Boolean,
			indentSize: {
				type: Number,
				default: 12
			},
			iconSize: {
				type: Number,
				default: 12
			},
			hScrollbarSize: virtualizedGridProps.hScrollbarSize,
			vScrollbarSize: virtualizedGridProps.vScrollbarSize,
			scrollbarAlwaysOn: virtualizedScrollbarProps.alwaysOn,
			sortBy: {
				type: definePropType(Object),
				default: () => ({})
			},
			sortState: {
				type: definePropType(Object),
				default: void 0
			},
			onColumnSort: {
				type: definePropType(Function)
			},
			onExpandedRowsChange: {
				type: definePropType(Function)
			},
			onEndReached: {
				type: definePropType(Function)
			},
			onRowExpand: tableV2RowProps.onRowExpand,
			onScroll: tableV2GridProps.onScroll,
			onRowsRendered: tableV2GridProps.onRowsRendered,
			rowEventHandlers: tableV2RowProps.rowEventHandlers
		});

		const isStringNumber = val => {
			if (!_.isString(val)) {
				return false;
			}
			return !Number.isNaN(Number(val));
		};

		function addUnit(value, defaultUnit = "px") {
			if (!value) return "";
			if (_.isNumber(value) || isStringNumber(value)) {
				return `${value}${defaultUnit}`;
			} else if (_.isString(value)) {
				return value;
			}
		}

		const useCache = () => {
			const vm = getCurrentInstance();
			const props = vm.proxy.$props;
			return computed(() => {
				const _getItemStyleCache = (_, __, ___) => ({});
				return props.perfMode ? memoize(_getItemStyleCache) : memoizeOne(_getItemStyleCache);
			});
		};
		const useTableRow = props => {
			const { isScrolling } = inject(TableV2InjectionKey);
			const measured = ref(false);
			const rowRef = ref();
			const measurable = computed(() => {
				return _.isNumber(props.estimatedRowHeight) && props.rowIndex >= 0;
			});
			const doMeasure = (isInit = false) => {
				const $rowRef = unref(rowRef);
				if (!$rowRef) return;
				const { columns: columns2, onRowHeightChange, rowKey: rowKey2, rowIndex, style } = props;
				const { height } = $rowRef.getBoundingClientRect();
				measured.value = true;
				nextTick(() => {
					if (isInit || height !== Number.parseInt(style.height)) {
						const firstColumn = columns2[0];
						const isPlaceholder = firstColumn?.placeholderSign === placeholderSign;
						onRowHeightChange?.(
							{
								rowKey: rowKey2,
								height,
								rowIndex
							},
							firstColumn && !isPlaceholder && firstColumn.fixed
						);
					}
				});
			};
			const eventHandlers = computed(() => {
				const { rowData, rowIndex, rowKey: rowKey2, onRowHover } = props;
				const handlers = props.rowEventHandlers || {};
				const eventHandlers2 = {};
				Object.entries(handlers).forEach(([eventName, handler]) => {
					if (_.isFunction(handler)) {
						eventHandlers2[eventName] = event => {
							handler({
								event,
								rowData,
								rowIndex,
								rowKey: rowKey2
							});
						};
					}
				});
				if (onRowHover) {
					[
						{
							name: "onMouseleave",
							hovered: false
						},
						{
							name: "onMouseenter",
							hovered: true
						}
					].forEach(({ name, hovered }) => {
						const existedHandler = eventHandlers2[name];
						eventHandlers2[name] = event => {
							onRowHover({
								event,
								hovered,
								rowData,
								rowIndex,
								rowKey: rowKey2
							});
							existedHandler?.(event);
						};
					});
				}
				return eventHandlers2;
			});
			const onExpand = expanded => {
				const { onRowExpand, rowData, rowIndex, rowKey: rowKey2 } = props;
				onRowExpand?.({
					expanded,
					rowData,
					rowIndex,
					rowKey: rowKey2
				});
			};
			onMounted(() => {
				if (unref(measurable)) {
					doMeasure(true);
				}
			});
			return {
				isScrolling,
				measurable,
				measured,
				rowRef,
				eventHandlers,
				onExpand
			};
		};

		const createGrid = ({
			name,
			clearCache,
			getColumnPosition,
			getColumnStartIndexForOffset,
			getColumnStopIndexForStartIndex,
			getEstimatedTotalHeight: getEstimatedTotalHeight2,
			getEstimatedTotalWidth: getEstimatedTotalWidth2,
			getColumnOffset,
			getRowOffset,
			getRowPosition,
			getRowStartIndexForOffset,
			getRowStopIndexForStartIndex,
			initCache,
			injectToInstance,
			validateProps
		}) => {
			return defineComponent({
				name: name || "ElVirtualList",
				props: virtualizedGridProps,
				emits: [ITEM_RENDER_EVT, SCROLL_EVT],
				components: {
					/* 循环引用 => 异步加载 */
					ComponentVirtualScrollBar: () => _.$importVue("/common/ui-x/common/xTableVir/ComponentVirtualScrollBar.vue")
				},
				setup(props, { emit, expose, slots }) {
					const ns = useNamespace("vl");
					validateProps(props);
					const instance = getCurrentInstance();
					const cache2 = ref(initCache(props, instance));
					injectToInstance?.(instance, cache2);
					const windowRef = ref();
					const hScrollbar = ref();
					const vScrollbar = ref();
					const innerRef = ref(null);
					const states = ref({
						isScrolling: false,
						scrollLeft: _.isNumber(props.initScrollLeft) ? props.initScrollLeft : 0,
						scrollTop: _.isNumber(props.initScrollTop) ? props.initScrollTop : 0,
						updateRequested: false,
						xAxisScrollDir: FORWARD,
						yAxisScrollDir: FORWARD
					});
					const getItemStyleCache = useCache();
					const parsedHeight = computed(() => Number.parseInt(`${props.height}`, 10));
					const parsedWidth = computed(() => Number.parseInt(`${props.width}`, 10));
					const columnsToRender = computed(() => {
						const { totalColumn, totalRow, columnCache } = props;
						const { isScrolling, xAxisScrollDir, scrollLeft } = unref(states);
						if (totalColumn === 0 || totalRow === 0) {
							return [0, 0, 0, 0];
						}
						const startIndex = getColumnStartIndexForOffset(props, scrollLeft, unref(cache2));
						const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, unref(cache2));
						const cacheBackward = !isScrolling || xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
						const cacheForward = !isScrolling || xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;
						return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)), startIndex, stopIndex];
					});
					const rowsToRender = computed(() => {
						const { totalColumn, totalRow, rowCache } = props;
						const { isScrolling, yAxisScrollDir, scrollTop } = unref(states);
						if (totalColumn === 0 || totalRow === 0) {
							return [0, 0, 0, 0];
						}
						const startIndex = getRowStartIndexForOffset(props, scrollTop, unref(cache2));
						const stopIndex = getRowStopIndexForStartIndex(props, startIndex, scrollTop, unref(cache2));
						const cacheBackward = !isScrolling || yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
						const cacheForward = !isScrolling || yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;
						return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)), startIndex, stopIndex];
					});
					const estimatedTotalHeight = computed(() => getEstimatedTotalHeight2(props, unref(cache2)));
					const estimatedTotalWidth = computed(() => getEstimatedTotalWidth2(props, unref(cache2)));
					const windowStyle = computed(() => [
						{
							position: "relative",
							overflow: "hidden",
							WebkitOverflowScrolling: "touch",
							willChange: "transform"
						},
						{
							direction: props.direction,
							height: _.isNumber(props.height) ? `${props.height}px` : props.height,
							width: _.isNumber(props.width) ? `${props.width}px` : props.width
						},
						props.styleV2 ?? {}
					]);
					const innerStyle = computed(() => {
						const width = `${unref(estimatedTotalWidth)}px`;
						const height = `${unref(estimatedTotalHeight)}px`;
						return {
							height,
							pointerEvents: unref(states).isScrolling ? "none" : void 0,
							width
						};
					});
					const emitEvents = () => {
						const { totalColumn, totalRow } = props;
						if (totalColumn > 0 && totalRow > 0) {
							const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = unref(columnsToRender);
							const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = unref(rowsToRender);
							emit(ITEM_RENDER_EVT, {
								columnCacheStart,
								columnCacheEnd,
								rowCacheStart,
								rowCacheEnd,
								columnVisibleStart,
								columnVisibleEnd,
								rowVisibleStart,
								rowVisibleEnd
							});
						}
						const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = unref(states);
						emit(SCROLL_EVT, {
							xAxisScrollDir,
							scrollLeft,
							yAxisScrollDir,
							scrollTop,
							updateRequested
						});
					};
					const onScroll = e => {
						const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget;
						const _states = unref(states);
						if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) {
							return;
						}
						let _scrollLeft = scrollLeft;
						if (isRTL(props.direction)) {
							switch (getRTLOffsetType()) {
								case RTL_OFFSET_NAG:
									_scrollLeft = -scrollLeft;
									break;
								case RTL_OFFSET_POS_DESC:
									_scrollLeft = scrollWidth - clientWidth - scrollLeft;
									break;
							}
						}
						states.value = {
							..._states,
							isScrolling: true,
							scrollLeft: _scrollLeft,
							scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
							updateRequested: true,
							xAxisScrollDir: getScrollDir(_states.scrollLeft, _scrollLeft),
							yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop)
						};
						nextTick(() => resetIsScrolling());
						onUpdated();
						emitEvents();
					};
					const onVerticalScroll = (distance, totalSteps) => {
						const height = unref(parsedHeight);
						const offset = ((estimatedTotalHeight.value - height) / totalSteps) * distance;
						scrollTo({
							scrollTop: Math.min(estimatedTotalHeight.value - height, offset)
						});
					};
					const onHorizontalScroll = (distance, totalSteps) => {
						const width = unref(parsedWidth);
						const offset = ((estimatedTotalWidth.value - width) / totalSteps) * distance;
						scrollTo({
							scrollLeft: Math.min(estimatedTotalWidth.value - width, offset)
						});
					};
					const { onWheel } = useGridWheel(
						{
							atXStartEdge: computed(() => states.value.scrollLeft <= 0),
							atXEndEdge: computed(() => states.value.scrollLeft >= estimatedTotalWidth.value - unref(parsedWidth)),
							atYStartEdge: computed(() => states.value.scrollTop <= 0),
							atYEndEdge: computed(() => states.value.scrollTop >= estimatedTotalHeight.value - unref(parsedHeight))
						},
						(x, y) => {
							hScrollbar.value?.onMouseUp?.();
							vScrollbar.value?.onMouseUp?.();
							const width = unref(parsedWidth);
							const height = unref(parsedHeight);
							scrollTo({
								scrollLeft: Math.min(states.value.scrollLeft + x, estimatedTotalWidth.value - width),
								scrollTop: Math.min(states.value.scrollTop + y, estimatedTotalHeight.value - height)
							});
						}
					);
					const scrollTo = ({ scrollLeft = states.value.scrollLeft, scrollTop = states.value.scrollTop }) => {
						scrollLeft = Math.max(scrollLeft, 0);
						scrollTop = Math.max(scrollTop, 0);
						const _states = unref(states);
						if (scrollTop === _states.scrollTop && scrollLeft === _states.scrollLeft) {
							return;
						}
						states.value = {
							..._states,
							xAxisScrollDir: getScrollDir(_states.scrollLeft, scrollLeft),
							yAxisScrollDir: getScrollDir(_states.scrollTop, scrollTop),
							scrollLeft,
							scrollTop,
							updateRequested: true
						};
						nextTick(() => resetIsScrolling());
						onUpdated();
						emitEvents();
					};
					const scrollToItem = (rowIndex = 0, columnIdx = 0, alignment = AUTO_ALIGNMENT) => {
						const _states = unref(states);
						columnIdx = Math.max(0, Math.min(columnIdx, props.totalColumn - 1));
						rowIndex = Math.max(0, Math.min(rowIndex, props.totalRow - 1));
						const scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
						const _cache = unref(cache2);
						const estimatedHeight = getEstimatedTotalHeight2(props, _cache);
						const estimatedWidth = getEstimatedTotalWidth2(props, _cache);
						scrollTo({
							scrollLeft: getColumnOffset(props, columnIdx, alignment, _states.scrollLeft, _cache, estimatedWidth > props.width ? scrollBarWidth2 : 0),
							scrollTop: getRowOffset(props, rowIndex, alignment, _states.scrollTop, _cache, estimatedHeight > props.height ? scrollBarWidth2 : 0)
						});
					};
					const getItemStyle = (rowIndex, columnIndex) => {
						const { columnWidth, direction: direction2, rowHeight } = props;
						const itemStyleCache = getItemStyleCache.value(clearCache && columnWidth, clearCache && rowHeight, clearCache && direction2);
						const key = `${rowIndex},${columnIndex}`;
						if (hasOwn(itemStyleCache, key)) {
							return itemStyleCache[key];
						} else {
							const [, left] = getColumnPosition(props, columnIndex, unref(cache2));
							const _cache = unref(cache2);
							const rtl = isRTL(direction2);
							const [height, top] = getRowPosition(props, rowIndex, _cache);
							const [width] = getColumnPosition(props, columnIndex, _cache);
							itemStyleCache[key] = {
								position: "absolute",
								left: rtl ? void 0 : `${left}px`,
								right: rtl ? `${left}px` : void 0,
								top: `${top}px`,
								height: `${height}px`,
								width: `${width}px`
							};
							return itemStyleCache[key];
						}
					};
					const resetIsScrolling = () => {
						states.value.isScrolling = false;
						nextTick(() => {
							getItemStyleCache.value(-1, null, null);
						});
					};
					onMounted(() => {
						if (!isClient) return;
						const { initScrollLeft, initScrollTop } = props;
						const windowElement = unref(windowRef);
						if (windowElement) {
							if (_.isNumber(initScrollLeft)) {
								windowElement.scrollLeft = initScrollLeft;
							}
							if (_.isNumber(initScrollTop)) {
								windowElement.scrollTop = initScrollTop;
							}
						}
						emitEvents();
					});
					const onUpdated = () => {
						const { direction: direction2 } = props;
						const { scrollLeft, scrollTop, updateRequested } = unref(states);
						const windowElement = unref(windowRef);
						if (updateRequested && windowElement) {
							if (direction2 === RTL) {
								switch (getRTLOffsetType()) {
									case RTL_OFFSET_NAG: {
										windowElement.scrollLeft = -scrollLeft;
										break;
									}
									case RTL_OFFSET_POS_ASC: {
										windowElement.scrollLeft = scrollLeft;
										break;
									}
									default: {
										const { clientWidth, scrollWidth } = windowElement;
										windowElement.scrollLeft = scrollWidth - clientWidth - scrollLeft;
										break;
									}
								}
							} else {
								windowElement.scrollLeft = Math.max(0, scrollLeft);
							}
							windowElement.scrollTop = Math.max(0, scrollTop);
						}
					};
					const { resetAfterColumnIndex, resetAfterRowIndex, resetAfter } = instance.proxy;
					expose({
						windowRef,
						innerRef,
						getItemStyleCache,
						scrollTo,
						scrollToItem,
						states,
						resetAfterColumnIndex,
						resetAfterRowIndex,
						resetAfter
					});
					const renderScrollbars = () => {
						const { scrollbarAlwaysOn, scrollbarStartGap, scrollbarEndGap, totalColumn, totalRow } = props;
						const width = unref(parsedWidth);
						const height = unref(parsedHeight);
						const estimatedWidth = unref(estimatedTotalWidth);
						const estimatedHeight = unref(estimatedTotalHeight);
						const { scrollLeft, scrollTop } = unref(states);
						const horizontalScrollbar = h("ComponentVirtualScrollBar", {
							ref: hScrollbar,
							alwaysOn: scrollbarAlwaysOn,
							startGap: scrollbarStartGap,
							endGap: scrollbarEndGap,
							class: ns.e("horizontal"),
							clientSize: width,
							layout: "horizontal",
							onScroll: onHorizontalScroll,
							ratio: (width * 100) / estimatedWidth,
							scrollFrom: scrollLeft / (estimatedWidth - width),
							total: totalRow,
							visible: true
						});
						const verticalScrollbar = h("ComponentVirtualScrollBar", {
							ref: vScrollbar,
							alwaysOn: scrollbarAlwaysOn,
							startGap: scrollbarStartGap,
							endGap: scrollbarEndGap,
							class: ns.e("vertical"),
							clientSize: height,
							layout: "vertical",
							onScroll: onVerticalScroll,
							ratio: (height * 100) / estimatedHeight,
							scrollFrom: scrollTop / (estimatedHeight - height),
							total: totalColumn,
							visible: true
						});
						return {
							horizontalScrollbar,
							verticalScrollbar
						};
					};
					const renderItems = () => {
						const $vSlots = this.$vSlots;
						const [columnStart, columnEnd] = unref(columnsToRender);
						const [rowStart, rowEnd] = unref(rowsToRender);
						const { data, totalColumn, totalRow, useIsScrolling, itemKey } = props;
						const children = [];
						if (totalRow > 0 && totalColumn > 0) {
							for (let row = rowStart; row <= rowEnd; row++) {
								for (let column = columnStart; column <= columnEnd; column++) {
									if (_.isFunction($vSlots.default)) {
										const params = {
											columnIndex: column,
											data,
											key: itemKey({
												columnIndex: column,
												data,
												rowIndex: row
											}),
											isScrolling: useIsScrolling ? unref(states).isScrolling : void 0,
											style: getItemStyle(row, column),
											rowIndex: row
										};
										const child = $vSlots.default(params);
										children.push(child);
									}
								}
							}
						}
						return children;
					};
					const renderInner = () => {
						const Inner = props.innerElement;
						const children = renderItems();
						return [
							createEmptyVNode("renderInner: " + Inner),
							h(
								Inner,
								{
									style: unref(innerStyle),
									ref: innerRef
								},
								(function () {
									if (_.isString(Inner)) {
										return children;
									} else {
										return { default: () => children };
									}
								})()
							),
							createEmptyVNode("renderInner: " + Inner)
						];
					};
					const renderWindow = () => {
						const Container = props.containerElement;
						const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();
						const Inner = renderInner();
						return h(
							"div",
							{
								key: 0,
								class: ns.e("wrapper"),
								role: props.role
							},
							[
								createEmptyVNode("renderWindow: " + Container),
								h(
									Container,
									{
										class: props.classV2,
										style: unref(windowStyle),
										onScroll,
										onWheel,
										ref: windowRef
									},
									(function () {
										if (_.isString(Container)) {
											return Inner;
										} else {
											return { default: () => Inner };
										}
									})()
								),
								createEmptyVNode("renderWindow: " + Container),
								horizontalScrollbar,
								verticalScrollbar
							]
						);
					};
					return renderWindow;
				}
			});
		};

		const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }, onWheelDelta) => {
			let frameHandle = null;
			let xOffset = 0;
			let yOffset = 0;
			const hasReachedEdge = (x, y) => {
				const xEdgeReached = (x <= 0 && atXStartEdge.value) || (x >= 0 && atXEndEdge.value);
				const yEdgeReached = (y <= 0 && atYStartEdge.value) || (y >= 0 && atYEndEdge.value);
				return xEdgeReached && yEdgeReached;
			};
			const onWheel = e => {
				cAF(frameHandle);
				let x = e.deltaX;
				let y = e.deltaY;
				if (Math.abs(x) > Math.abs(y)) {
					y = 0;
				} else {
					x = 0;
				}
				if (e.shiftKey && y !== 0) {
					x = y;
					y = 0;
				}
				if (hasReachedEdge(xOffset, yOffset) && hasReachedEdge(xOffset + x, yOffset + y)) return;
				xOffset += x;
				yOffset += y;
				e.preventDefault();
				frameHandle = rAF(() => {
					onWheelDelta(xOffset, yOffset);
					xOffset = 0;
					yOffset = 0;
				});
			};
			return {
				hasReachedEdge,
				onWheel
			};
		};

		const useTableGrid = props => {
			const headerRef = ref();
			const bodyRef = ref();
			const totalHeight = computed(() => {
				const { data, rowHeight, estimatedRowHeight } = props;
				if (estimatedRowHeight) {
					return;
				}
				return data.length * rowHeight;
			});
			const fixedRowHeight = computed(() => {
				const { fixedData, rowHeight } = props;
				return (fixedData?.length || 0) * rowHeight;
			});
			const headerHeight = computed(() => sum(props.headerHeight));
			const gridHeight = computed(() => {
				const { height } = props;
				return Math.max(0, height - unref(headerHeight) - unref(fixedRowHeight));
			});
			const hasHeader = computed(() => {
				return unref(headerHeight) + unref(fixedRowHeight) > 0;
			});
			const itemKey = ({ data, rowIndex }) => data[rowIndex][props.rowKey];

			function onItemRendered({ rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd }) {
				props.onRowsRendered?.({
					rowCacheStart,
					rowCacheEnd,
					rowVisibleStart,
					rowVisibleEnd
				});
			}

			function resetAfterRowIndex(index, forceUpdate2) {
				bodyRef.value?.resetAfterRowIndex(index, forceUpdate2);
			}

			function scrollTo(leftOrOptions, top) {
				const header$ = unref(headerRef);
				const body$ = unref(bodyRef);
				if (!header$ || !body$) return;
				if (_.isPlainObject(leftOrOptions)) {
					header$.scrollToLeft(leftOrOptions.scrollLeft);
					body$.scrollTo(leftOrOptions);
				} else {
					header$.scrollToLeft(leftOrOptions);
					body$.scrollTo({
						scrollLeft: leftOrOptions,
						scrollTop: top
					});
				}
			}

			function scrollToTop(scrollTop) {
				unref(bodyRef)?.scrollTo({
					scrollTop
				});
			}

			function scrollToRow(row, strategy) {
				unref(bodyRef)?.scrollToItem(row, 1, strategy);
			}

			function forceUpdate() {
				unref(bodyRef)?.$forceUpdate();
				unref(headerRef)?.$forceUpdate();
			}

			return {
				bodyRef,
				forceUpdate,
				fixedRowHeight,
				gridHeight,
				hasHeader,
				headerHeight,
				headerRef,
				totalHeight,
				itemKey,
				onItemRendered,
				resetAfterRowIndex,
				scrollTo,
				scrollToTop,
				scrollToRow
			};
		};

		const sumReducer = (sum2, num) => sum2 + num;

		const sum = listLike => {
			return _.isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
		};
		const tryCall = (fLike, params, defaultRet = {}) => {
			return _.isFunction(fLike) ? fLike(params) : fLike ?? defaultRet;
		};
		const enforceUnit = style => {
			if (_.isArray(style)) {
				style = _.merge.apply(_, [{}, ...style]);
			}
			["width", "maxWidth", "minWidth", "height"].forEach(key => {
				style[key] = addUnit(style[key]);
			});
			return style;
		};
		const componentToSlot = ComponentLike => (isVNode(ComponentLike) ? props => h(ComponentLike, props) : ComponentLike);

		function castArray() {
			if (!arguments.length) {
				return [];
			}
			var value = arguments[0];
			return _.isArray(value) ? value : [value];
		}
		const isClient = typeof window !== "undefined";
		const rAF = fn => (isClient ? window.requestAnimationFrame(fn) : setTimeout(fn, 16));
		const cAF = handle => (isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle));

		const getScrollDir = (prev, cur) => (prev < cur ? FORWARD : BACKWARD);
		const isRTL = dir => dir === RTL;

		var safeIsNaN =
			Number.isNaN ||
			function ponyfill(value) {
				return typeof value === "number" && value !== value;
			};

		function isEqual(first, second) {
			if (first === second) {
				return true;
			}
			if (safeIsNaN(first) && safeIsNaN(second)) {
				return true;
			}
			return false;
		}

		function areInputsEqual(newInputs, lastInputs) {
			if (newInputs.length !== lastInputs.length) {
				return false;
			}
			for (var i = 0; i < newInputs.length; i++) {
				if (!isEqual(newInputs[i], lastInputs[i])) {
					return false;
				}
			}
			return true;
		}

		function memoizeOne(resultFn, isEqual2) {
			if (isEqual2 === void 0) {
				isEqual2 = areInputsEqual;
			}
			var cache2 = null;

			function memoized() {
				var newArgs = [];
				for (var _i = 0; _i < arguments.length; _i++) {
					newArgs[_i] = arguments[_i];
				}
				if (cache2 && cache2.lastThis === this && isEqual2(newArgs, cache2.lastArgs)) {
					return cache2.lastResult;
				}
				var lastResult = resultFn.apply(this, newArgs);
				cache2 = {
					lastResult,
					lastArgs: newArgs,
					lastThis: this
				};
				return lastResult;
			}

			memoized.clear = function clear() {
				cache2 = null;
			};
			return memoized;
		}

		function resolveUnref(r) {
			return typeof r === "function" ? r() : unref(r);
		}

		function identity(arg) {
			return arg;
		}

		function tryOnScopeDispose(fn) {
			if (getCurrentScope()) {
				onScopeDispose(fn);
				return true;
			}
			return false;
		}

		function tryOnMounted(fn, sync = true) {
			if (getCurrentInstance()) onMounted(fn);
			else if (sync) fn();
			else nextTick(fn);
		}

		function unrefElement(elRef) {
			var _a2;
			const plain = resolveUnref(elRef);
			return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
		}

		const defaultWindow = isClient ? window : void 0;

		function useEventListener(...args) {
			let target;
			let event;
			let listener;
			let options;
			if (_.isString(args[0])) {
				[event, listener, options] = args;
				target = defaultWindow;
			} else {
				[target, event, listener, options] = args;
			}
			if (!target) return noop;
			let cleanup = noop;
			const stopWatch = watch(
				() => unrefElement(target),
				el => {
					cleanup();
					if (!el) return;
					el.addEventListener(event, listener, options);
					cleanup = () => {
						el.removeEventListener(event, listener, options);
						cleanup = noop;
					};
				},
				{ immediate: true, flush: "post" }
			);
			const stop = () => {
				stopWatch();
				cleanup();
			};
			tryOnScopeDispose(stop);
			return stop;
		}

		function useSupported(callback, sync = false) {
			const isSupported = ref();
			const update = () => (isSupported.value = Boolean(callback()));
			update();
			tryOnMounted(update, sync);
			return isSupported;
		}

		function useResizeObserver(target, callback, options = {}) {
			const _a2 = options,
				{ window: window2 = defaultWindow } = _a2,
				observerOptions = __objRest(_a2, ["window"]);
			let observer;
			const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
			const cleanup = () => {
				if (observer) {
					observer.disconnect();
					observer = void 0;
				}
			};
			const stopWatch = watch(
				() => unrefElement(target),
				el => {
					cleanup();
					if (isSupported.value && window2 && el) {
						observer = new ResizeObserver(callback);
						observer.observe(el, observerOptions);
					}
				},
				{ immediate: true, flush: "post" }
			);
			const stop = () => {
				cleanup();
				stopWatch();
			};
			tryOnScopeDispose(stop);
			return {
				isSupported,
				stop
			};
		}

		const useAutoResize = props => {
			const sizer = ref();
			const width$ = ref(0);
			const height$ = ref(0);
			let resizerStopper;
			onMounted(() => {
				resizerStopper = useResizeObserver(sizer, ([entry]) => {
					const { width, height } = entry.contentRect;
					const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(entry.target);
					const left = Number.parseInt(paddingLeft) || 0;
					const right = Number.parseInt(paddingRight) || 0;
					const top = Number.parseInt(paddingTop) || 0;
					const bottom = Number.parseInt(paddingBottom) || 0;
					width$.value = width - left - right;
					height$.value = height - top - bottom;
				}).stop;
			});
			onBeforeUnmount(() => {
				resizerStopper?.();
			});
			watch([width$, height$], ([width, height]) => {
				props.onResize?.({
					width,
					height
				});
			});
			return {
				sizer,
				width: width$,
				height: height$
			};
		};

		const tableV2HeaderRowProps = buildProps({
			classV2: String,
			columns,
			columnsStyles,
			headerIndex: Number,
			styleV2: { type: definePropType(Object) }
		});

		const autoResizerProps = buildProps({
			disableWidth: Boolean,
			disableHeight: Boolean,
			onResize: {
				type: definePropType(Function)
			}
		});

		var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
		var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
		var __objRest = (source, exclude) => {
			var target = {};
			for (var prop in source) if (hasOwnProperty.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
			if (source != null && __getOwnPropSymbols$f)
				for (var prop of __getOwnPropSymbols$f(source)) {
					if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop)) target[prop] = source[prop];
				}
			return target;
		};

		/*****************************************/
		Vue.useXui = {
			globalConfigs: {},
			resolveUnref,
			identity,
			tryOnScopeDispose,
			tryOnMounted,
			unrefElement,
			useEventListener,
			useSupported,
			autoResizerProps,
			tableV2HeaderRowProps,
			useResizeObserver,
			useAutoResize,
			useTableRow,
			isEqual,
			areInputsEqual,
			memoizeOne,
			getScrollDir,
			isRTL,
			rAF,
			cAF,
			isClient,
			castArray,
			sumReducer,
			sum,
			tryCall,
			enforceUnit,
			componentToSlot,
			TableV2InjectionKey,
			useTableGrid,
			useGridWheel,
			useCache,
			useNamespace,
			isStringNumber,
			addUnit,
			createGrid,
			noop,
			mutable,
			ScrollbarDirKey,
			renderThumbStyle,
			/* **************** */
			definePropType,
			buildProp,
			buildProps,
			columns,
			virtualizedScrollbarProps,
			virtualizedGridProps,
			tableV2HeaderProps,
			tableV2GridProps,
			tableV2Props,
			/* ************** */
			ITEM_RENDER_EVT,
			SCROLLBAR_MIN_SIZE,
			DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
			SCROLL_EVT,
			FORWARD,
			BACKWARD,
			AUTO_ALIGNMENT,
			SMART_ALIGNMENT,
			START_ALIGNMENT,
			CENTERED_ALIGNMENT,
			END_ALIGNMENT,
			HORIZONTAL,
			VERTICAL,
			BAR_MAP,
			RTL,
			RTL_OFFSET_NAG,
			RTL_OFFSET_POS_ASC,
			RTL_OFFSET_POS_DESC
		};
	})();

	(function lazyLoadAllComponents() {
		const ALL_COMPONENTS = [
			"xAutoResizer",
			"xBtn",
			"xBtnGroup",
			"xCard",
			"xCellBtnGroup",
			"xCellDate",
			"xCellEllipsis",
			"xCellInput",
			"xCellOptions",
			"xCellRate",
			"xCellSelect",
			"xCellSelectSearch",
			"xCellSelectOrInput",
			"xCellText",
			"xColActions",
			"xDialog",
			"xForm",
			"xFragment",
			"xIcon",
			"xInfoCard",
			"xInfoCardItem",
			"xInquire",
			"xItem",
			"xItemCheckboxGroup",
			"xItemDatetime",
			"xItemInput",
			"xItemIpPart",
			"xItemNameUrl",
			"xItemRadioGroup",
			"xItemSelect",
			"xItemSwitch",
			"xMenuTreeItem",
			"xOprWithMore",
			"xPageContent",
			"xPageTitle",
			"xPagination",
			"xRender",
			"xSearchList",
			"xTable",
			"xTablebar",
			"xTableColSelected",
			"xTableColumn",
			"xTableFilter",
			"xTableVir",
			"xTableDiv",
			"xTransfer"
		];

		Vue.ALL_COMPONENTS = ALL_COMPONENTS;
		const load = async componentName => {
			const component = await _.$importVue(`/common/ui-x/common/${componentName}.vue`);
			if (/^xCell/.test(componentName)) {
				/**
				 * props: ["row", "configs"], row,index,configs,prop 包含当前行、列、下标、配置信息
				 * xCell****的组件 用于列表的cell，每一个默认有带有row configs props
				 */
				component.props = ["row", "configs"];
			}
			return component;
		};
		_.each(ALL_COMPONENTS, componentName => {
			/* 懒加载组件 */
			Vue.component(componentName, async () => load(componentName));
		});
	})();

	function setDataTipsShowWhenHover() {
		/*  ellipsis */
		var inArea = {};
		$(document).on("mouseenter.layer_tips", "[data-tips]", function (event) {
			try {
				var $ele = $(this);
				var width = $ele.width();
				var $child = $(`<span style="opacity:0;position:absolute;z-index:-1;"></span>`).appendTo($("body")).text($ele.text());
				var widthChild = $child.width();
				$child.remove();
				if (width < widthChild - 2) {
					const vlayerIndex = layer.tips(`<div style="overflow: auto;">${$ele.text()}</div>`, this, {
						tips: [1, "#fff"],
						time: 1000 * 60 * 1
					});
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
			$svgWrapper =
				$(`<svg id="__SVG_SPRITE_NODE__" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" aria-hidden="true">
			<svg  id="_svg_icon_loading" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"> <g> <path d="M 27.020,22.82A0.182,0.182 1080 1 0 27.384,22.82A0.182,0.182 1080 1 0 27.020,22.82zM 23.002,26.966A0.362,0.362 1080 1 0 23.726,26.966A0.362,0.362 1080 1 0 23.002,26.966zM 17.586,29.1A0.544,0.544 1080 1 0 18.674,29.1A0.544,0.544 1080 1 0 17.586,29.1zM 11.756,28.814A0.724,0.724 1080 1 0 13.204,28.814A0.724,0.724 1080 1 0 11.756,28.814zM 6.584,26.16A0.906,0.906 1080 1 0 8.396,26.16A0.906,0.906 1080 1 0 6.584,26.16zM 3.002,21.648A1.088,1.088 1080 1 0 5.178,21.648A1.088,1.088 1080 1 0 3.002,21.648zM 1.658,16.108A1.268,1.268 1080 1 0 4.194,16.108A1.268,1.268 1080 1 0 1.658,16.108zM 2.764,10.604A1.45,1.45 1080 1 0 5.664,10.604A1.45,1.45 1080 1 0 2.764,10.604zM 6.082,6.166A1.632,1.632 1080 1 0 9.346,6.166A1.632,1.632 1080 1 0 6.082,6.166zM 10.954,3.624A1.812,1.812 1080 1 0 14.578,3.624A1.812,1.812 1080 1 0 10.954,3.624zM 16.426,3.466A1.994,1.994 1080 1 0 20.414,3.466A1.994,1.994 1080 1 0 16.426,3.466zM 21.436,5.72A2.174,2.174 1080 1 0 25.784,5.72A2.174,2.174 1080 1 0 21.436,5.72zM 24.996,9.954A2.356,2.356 1080 1 0 29.708,9.954A2.356,2.356 1080 1 0 24.996,9.954zM 26.412,15.438A2.538,2.538 1080 1 0 31.488,15.438A2.538,2.538 1080 1 0 26.412,15.438z"> </path> </g> </svg>
</svg>`).appendTo($("body"));
		}
	})();
}
</script>
