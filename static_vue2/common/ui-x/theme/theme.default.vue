<style lang="less">
/* 常用的样式类，不加样式类不影响界面展示效果 */
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

.loopGapFn(0);
.loopGapFn(4);
.loopGapFn(5);
.loopGapFn(8);
.loopGapFn(10);
.loopGapFn(15);
.loopGapFn(16);
.loopGapFn(20);
.loopGapFn(25);
.loopGapFn(32);

.x-margin {
	margin: var(--ui-one);
}

.x-padding {
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
	display: flex;

	&.inline {
		display: inline-flex;
	}

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

.flex1-overflow-auto {
	position: relative;
	flex: 1;
	height: 100%;
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

.overflow-hidden {
	overflow: hidden;
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

.opacity0 {
	opacity: 0;
}

.help-block {
	margin-bottom: 0px !important;
	color: red !important;
}
/* x-app-body只用于body元素，唯一 */
body.x-app-body {
	position: relative;
	height: 100%;
	width: 100%;

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

	/* div.app-wrapper */

	.x-app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;

		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
	}

	.x-app-main {
		width: 1px;
	}

	.warning-color {
		color: var(--xAlert-error-light-color);
	}

	.x-white-border {
		background-color: var(--color-white);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.x-disabled {
		opacity: 0.5;
		position: relative;
		pointer-events: none;

		&::before {
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
	}
}

/* ************************useXui_css_variable*********************** */
.xDataGrid,
.xTable {
	.empty {
		width: 300px;
		height: 100%;
		max-height: 150px;
	}
}

.x-app-layout-main {
	display: flex;
	height: 1px;
	flex: 1;
	flex-flow: row nowrap;
	width: 100%;
	overflow: hidden;

	> .AppLayoutLeft {
		height: 100%;
		transition: 0.3s ease-in-out;
	}

	> .AppLayoutContent {
		flex: 1;
		width: 1px;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
	}
}

.el-auto-resizer {
	width: 100%;
	height: 100%;
}

.x-page-content-middle {
	flex: 1;
	height: 1px;
	position: relative;
	min-width: 800px;

	.xDataGrid.el-auto-resizer {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
}

.position-relative {
	position: relative;
}

.all-scroll {
	cursor: all-scroll;
}
.pointer {
	cursor: pointer;

	svg {
		// color: var;
	}
}

svg.pointer {
	color: var(--el-color-primary);

	&:focus,
	&:hover,
	&:active {
		border-color: transparent;
		background-color: transparent;
	}

	&:focus,
	&:hover {
		color: var(--el-color-primary-hover);
	}

	&:active {
		color: var(--el-color-primary-active);
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

/* ------------------------ page ------------------------*/

/* ------------------------ common entry ------------------------*/

.width100 {
	width: 100%;
}

.height100 {
	height: 100%;
}

.height1px {
	height: 1px;
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

.ellipsis {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* *****************************************transition********************************** */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-short-enter-active,
.fade-short-leave-active {
	transition: opacity 0.5s;
}

.fade-short-enter,
.fade-short-leave-to {
	opacity: 0.8;
}

.slide-fade-enter-active {
	transition: all 0.4s 0.3s ease;
	position: absolute;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.3, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateX(10px);
	opacity: 0;
}

/* 左右切换 */
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
	transform: translateX(-100%);
}

/* 缩放 */
.scale-enter-active,
.scale-leave-active {
	transition: all 0.3s ease;
}
.scale-enter,
.scale-leave-to {
	transform: scale(0);
}
/* 旋转 */
.rotate-enter-active,
.rotate-leave-active {
	transition: all 0.5s ease;
}
.rotate-enter,
.rotate-leave-to {
	transform: rotate(360deg);
}
/* 上下滑动 */
.slide-up-down-enter-active,
.slide-up-down-leave-active {
	transition: all 0.3s ease;
}
.slide-up-down-enter,
.slide-up-down-leave-to {
	transform: translateY(-100%);
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

	.x-sidebar-icon-wrapper {
		transition: all 0.3s ease;
		opacity: 1;
		&.hide {
			opacity: 0;
			overflow: hidden;
			display: none;

			* {
				display: none;
			}
		}
	}

	aside.x-sidebar-menu-wrapper {
		transition: all 0.3s ease;
		position: relative;
		height: 1px;
		flex: 1;
		width: var(--left-aside-width);

		.x-sidebar-menu,
		.x-sidebar-menu-title {
			overflow: hidden;
			position: relative;
		}

		&.hide {
			.xIcon.icon_console,
			.xIcon.icon_console + .title,
			.log-title-wrapper,
			.x-sidebar-menu {
				opacity: 0;
				// display: none;
			}
		}

		.log-title-wrapper {
			position: relative;

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
			}

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

		.x-sidebar-menu {
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
							color: var(--el-color-primary) !important;
							// font-weight: 600;

							&::before {
								content: " ";
								display: block;
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
								border-right: 4px solid var(--el-color-primary) !important;
								z-index: 1;
							}
						}
					}
				}
			}
		}

		.leftmenu-toggle {
			transition: left 0.3s ease-in-out;
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

@keyframes rotating {
	0% {
		transform: rotateZ(0);
	}

	100% {
		transform: rotateZ(360deg);
	}
}
</style>
<script lang="ts">
export default async function () {}
</script>
