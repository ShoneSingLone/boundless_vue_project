<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xTabs",
		components: {
			xTabNav: () => _.$importVue("/common/ui-x/components/navigation/xTabs/xTabNav.vue")
		},
		props: {
			type: String,
			activeName: String,
			closable: Boolean,
			addable: Boolean,
			value: {},
			editable: Boolean,
			tabPosition: {
				type: String,
				default: "top"
			},
			beforeLeave: Function,
			stretch: Boolean,
			slotHeaderOpr: Function
		},

		provide() {
			return {
				rootTabs: this
			};
		},

		data() {
			return {
				currentName: this.value || this.activeName,
				panes: []
			};
		},

		watch: {
			activeName(value) {
				this.setCurrentName(value);
			},
			value(value) {
				this.setCurrentName(value);
			},
			currentName(value) {
				if (this.$refs.nav) {
					this.$nextTick(() => {
						this.$refs.nav.$nextTick(_ => {
							this.$refs.nav.scrollToActiveTab();
						});
					});
				}
			}
		},

		methods: {
			calcPaneInstances(isForceUpdate = false) {
				if (this.$slots.default) {
					const paneSlots = this.$slots.default.filter(
						vnode =>
							vnode.tag &&
							vnode.componentOptions &&
							vnode.componentOptions.Ctor.options.name === "xTabPane"
					);
					// update indeed
					const panes = paneSlots.map(({ componentInstance }) => componentInstance);
					const panesChanged = !(
						panes.length === this.panes.length &&
						panes.every((pane, index) => pane === this.panes[index])
					);
					if (isForceUpdate || panesChanged) {
						this.panes = panes;
					}
				} else if (this.panes.length !== 0) {
					this.panes = [];
				}
			},
			handleTabClick(tab, tabName, event) {
				if (tab.disabled) return;
				this.setCurrentName(tabName);
				this.$emit("tab-click", { tab, event, tabName });
			},
			handleTabRemove(pane, ev) {
				if (pane.disabled) return;
				ev.stopPropagation();
				this.$emit("edit", pane.name, "remove");
				this.$emit("tab-remove", pane.name);
			},
			handleTabAdd() {
				this.$emit("edit", null, "add");
				this.$emit("tab-add");
			},
			setCurrentName(value) {
				const changeCurrentName = () => {
					this.currentName = value;
					this.$emit("input", value);
				};
				if (this.currentName !== value && this.beforeLeave) {
					const before = this.beforeLeave(value, this.currentName);
					if (before && before.then) {
						before.then(
							() => {
								changeCurrentName();
								this.$refs.nav && this.$refs.nav.removeFocus();
							},
							() => {
								// https://github.com/ElemeFE/element/pull/14816
								// ignore promise rejection in `before-leave` hook
							}
						);
					} else if (before !== false) {
						changeCurrentName();
					}
				} else {
					changeCurrentName();
				}
			}
		},

		render(h) {
			let {
				type,
				handleTabClick,
				handleTabRemove,
				handleTabAdd,
				currentName,
				panes,
				editable,
				addable,
				tabPosition,
				stretch
			} = this;

			const newButton = h(
				"span",
				{
					vIf: editable || addable,
					staticClass: "el-tabs__new-tab",
					tabindex: "0",
					on: {
						click: handleTabAdd,
						keydown: ev => {
							if (ev.keyCode === 13) {
								handleTabAdd();
							}
						}
					}
				},
				[h("i", { staticClass: "el-icon-plus" })]
			);

			const navData = {
				props: {
					currentName,
					onTabClick: handleTabClick,
					onTabRemove: handleTabRemove,
					editable,
					type,
					panes,
					stretch
				},
				ref: "nav"
			};

			const header = hDiv(
				{
					class: ["el-tabs__header", `is-${tabPosition}`]
				},
				[newButton, h("xTabNav", navData)]
			);

			const panels = h(
				"div",
				{
					staticClass: "el-tabs__content"
				},
				[this.$slots.default]
			);

			return h(
				"div",
				{
					class: {
						"el-tabs": true,
						"el-tabs--card": type === "card",
						[`el-tabs--${tabPosition}`]: true,
						"el-tabs--border-card": type === "border-card"
					}
				},
				tabPosition !== "bottom" ? [header, panels] : [panels, header]
			);
		},

		created() {
			if (!this.currentName) {
				this.setCurrentName("0");
			}
			this.$on("tab-nav-update", this.calcPaneInstances.bind(null, true));
		},
		mounted() {
			this.calcPaneInstances();
		},
		updated() {
			this.calcPaneInstances();
		}
	});
}
</script>
<style lang="less">
.el-tabs__nav-scroll {
	&.is-top {
		display: flex;
	}
	&.is-left {
		display: flex;
		flex-direction: column;
	}
}

.el-tabs__header {
	padding: 0;
	position: relative;
	margin: 0 0 15px;
}

.el-tabs__active-bar {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2px;
	background-color: var(--el-color-primary);
	z-index: 1;
	-webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition:
		transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
		-webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	list-style: none;
}

.el-tabs__new-tab {
	float: right;
	border: 1px solid #d3dce6;
	height: 18px;
	width: 18px;
	line-height: 18px;
	margin: 12px 0 9px 10px;
	border-radius: var(--border-radius--small);
	text-align: center;
	font-size: 12px;
	color: #d3dce6;
	cursor: pointer;
	-webkit-transition: all 0.15s;
	transition: all 0.15s;
}

.el-tabs__nav-scroll {
	&.is-center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: row nowrap;
	}
}
.el-tabs__nav {
	white-space: nowrap;
	position: relative;
	transition: transform 0.3s;
	float: left;
	z-index: 2;
	&.is-center {
		margin: auto;
	}
}

.el-tabs__new-tab .el-icon-plus {
	-webkit-transform: scale(0.8, 0.8);
	transform: scale(0.8, 0.8);
}

.el-tabs__new-tab:hover {
	color: var(--el-color-primary);
}

.el-tabs__nav-wrap {
	overflow: hidden;
	margin-bottom: -1px;
	position: relative;
}

.el-tabs__nav-wrap::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 2px;
	background-color: #e4e7ed;
	z-index: 1;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__nav-wrap::after,
.el-tabs--card > .el-tabs__header .el-tabs__nav-wrap::after {
	content: none;
}

.el-tabs__nav-wrap.is-scrollable {
	padding: 0 20px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-tabs__nav-scroll {
	overflow: hidden;
}

.el-tabs__nav-next,
.el-tabs__nav-prev {
	position: absolute;
	cursor: pointer;
	line-height: 44px;
	font-size: 12px;
	color: var(--el-text-color-secondary);
}

.el-tabs__nav-next {
	right: 0;
}

.el-tabs__nav-prev {
	left: 0;
}

.el-tabs__nav.is-stretch {
	min-width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}

.el-tabs__nav.is-stretch > * {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
}

.el-tabs__item {
	padding: 0 20px;
	height: 40px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 40px;
	display: inline-block;
	list-style: none;
	font-size: 14px;
	font-weight: 500;
	color: var(--el-text-color-primary);
	position: relative;
}

.el-tabs__item:focus,
.el-tabs__item:focus:active {
	outline: 0;
}

.el-tabs__item:focus.is-active.is-focus:not(:active) {
	-webkit-box-shadow: 0 0 2px 2px var(--el-color-primary) inset;
	box-shadow: 0 0 2px 2px var(--el-color-primary) inset;
	border-radius: var(--border-radius--small);
}

.el-tabs__item .el-icon-close {
	border-radius: 50%;
	text-align: center;
	-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	margin-left: 5px;
}

.el-tabs__item .el-icon-close:before {
	-webkit-transform: scale(0.9);
	transform: scale(0.9);
	display: inline-block;
}

.el-tabs__item .el-icon-close:hover {
	background-color: var(--el-text-color-disabled);
	color: #fff;
}

.el-tabs__item.is-active {
	color: var(--el-color-primary);
}

.el-tabs__item:hover {
	color: var(--el-color-primary);
	cursor: pointer;
}

.el-tabs__item.is-disabled {
	color: var(--el-text-color-disabled);
	cursor: default;
}

.el-tabs__content {
	overflow: hidden;
	position: relative;
}

.el-tabs--card > .el-tabs__header {
	border-bottom: 1px solid #e4e7ed;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
	border: 1px solid #e4e7ed;
	border-bottom: none;
	border-radius: 4px 4px 0 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-tabs--card > .el-tabs__header .el-tabs__active-bar {
	display: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
	position: relative;
	font-size: 12px;
	width: 0;
	height: 14px;
	vertical-align: middle;
	line-height: 15px;
	overflow: hidden;
	top: -1px;
	right: -2px;
	-webkit-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable .el-icon-close,
.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover .el-icon-close {
	width: 14px;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
	border-bottom: 1px solid transparent;
	border-left: 1px solid #e4e7ed;
	-webkit-transition:
		color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
		padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition:
		color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
		padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
	border-left: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover {
	padding-left: 13px;
	padding-right: 13px;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
	border-bottom-color: #fff;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
	padding-left: 20px;
	padding-right: 20px;
}

.el-tabs--border-card {
	background: #fff;
	border: 1px solid #dcdfe6;
	-webkit-box-shadow:
		0 2px 4px 0 rgba(0, 0, 0, 0.12),
		0 0 6px 0 rgba(0, 0, 0, 0.04);
	box-shadow:
		0 2px 4px 0 rgba(0, 0, 0, 0.12),
		0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.el-tabs--border-card > .el-tabs__content {
	padding: 15px;
}

.el-tabs--border-card > .el-tabs__header {
	background-color: var(--el-fill-color-light);
	border-bottom: 1px solid #e4e7ed;
	margin: 0;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
	-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	border: 1px solid transparent;
	margin-top: -1px;
	color: var(--el-text-color-secondary);
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item + .el-tabs__item,
.el-tabs--border-card > .el-tabs__header .el-tabs__item:first-child {
	margin-left: -1px;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
	color: var(--el-color-primary);
	background-color: #fff;
	border-right-color: #dcdfe6;
	border-left-color: #dcdfe6;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
	color: var(--el-color-primary);
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-disabled {
	color: var(--el-text-color-disabled);
}

.el-tabs--border-card > .el-tabs__header .is-scrollable .el-tabs__item:first-child {
	margin-left: 0;
}

.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
	padding-left: 0;
}

.el-tabs--bottom .el-tabs__item.is-bottom:last-child,
.el-tabs--bottom .el-tabs__item.is-top:last-child,
.el-tabs--top .el-tabs__item.is-bottom:last-child,
.el-tabs--top .el-tabs__item.is-top:last-child {
	padding-right: 0;
}

.el-tabs--bottom .el-tabs--left > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--bottom .el-tabs--right > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--bottom.el-tabs--border-card > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--bottom.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--top .el-tabs--left > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--top .el-tabs--right > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:nth-child(2),
.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2) {
	padding-left: 20px;
}

.el-tabs--bottom .el-tabs--left > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--bottom .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--border-card > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--bottom.el-tabs--card > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top .el-tabs--left > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top .el-tabs--right > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:last-child,
.el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
	padding-right: 20px;
}

.el-tabs--bottom .el-tabs__header.is-bottom {
	margin-bottom: 0;
	margin-top: 10px;
}

.el-tabs--bottom.el-tabs--border-card .el-tabs__header.is-bottom {
	border-bottom: 0;
	border-top: 1px solid #dcdfe6;
}

.el-tabs--bottom.el-tabs--border-card .el-tabs__nav-wrap.is-bottom {
	margin-top: -1px;
	margin-bottom: 0;
}

.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom:not(.is-active) {
	border: 1px solid transparent;
}

.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom {
	margin: 0 -1px -1px;
}

.el-tabs--left,
.el-tabs--right {
	overflow: hidden;
}

.el-tabs--left .el-tabs__header.is-left,
.el-tabs--left .el-tabs__header.is-right,
.el-tabs--left .el-tabs__nav-scroll,
.el-tabs--left .el-tabs__nav-wrap.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-right,
.el-tabs--right .el-tabs__header.is-left,
.el-tabs--right .el-tabs__header.is-right,
.el-tabs--right .el-tabs__nav-scroll,
.el-tabs--right .el-tabs__nav-wrap.is-left,
.el-tabs--right .el-tabs__nav-wrap.is-right {
	height: 100%;
}

.el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__active-bar.is-right,
.el-tabs--right .el-tabs__active-bar.is-left,
.el-tabs--right .el-tabs__active-bar.is-right {
	top: 0;
	bottom: auto;
	width: 2px;
	height: auto;
}

.el-tabs--left .el-tabs__nav-wrap.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-right,
.el-tabs--right .el-tabs__nav-wrap.is-left,
.el-tabs--right .el-tabs__nav-wrap.is-right {
	margin-bottom: 0;
}

.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-next,
.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-next,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-next,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-next,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev {
	height: 30px;
	line-height: 30px;
	width: 100%;
	text-align: center;
	cursor: pointer;
}

.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-next i,
.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev i,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-next i,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev i,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-next i,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev i,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-next i,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev i {
	-webkit-transform: rotateZ(90deg);
	transform: rotateZ(90deg);
}

.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-prev,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-prev {
	left: auto;
	top: 0;
}

.el-tabs--left .el-tabs__nav-wrap.is-left > .el-tabs__nav-next,
.el-tabs--left .el-tabs__nav-wrap.is-right > .el-tabs__nav-next,
.el-tabs--right .el-tabs__nav-wrap.is-left > .el-tabs__nav-next,
.el-tabs--right .el-tabs__nav-wrap.is-right > .el-tabs__nav-next {
	right: auto;
	bottom: 0;
}

.el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
	right: 0;
	left: auto;
}

.el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable,
.el-tabs--left .el-tabs__nav-wrap.is-right.is-scrollable,
.el-tabs--right .el-tabs__nav-wrap.is-left.is-scrollable,
.el-tabs--right .el-tabs__nav-wrap.is-right.is-scrollable {
	padding: 30px 0;
}

.el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
	height: 100%;
	width: 2px;
	bottom: auto;
	top: 0;
}

.el-tabs--left .el-tabs__nav.is-left,
.el-tabs--left .el-tabs__nav.is-right,
.el-tabs--right .el-tabs__nav.is-left,
.el-tabs--right .el-tabs__nav.is-right {
	float: none;
}

.el-tabs--left .el-tabs__item.is-left,
.el-tabs--left .el-tabs__item.is-right,
.el-tabs--right .el-tabs__item.is-left,
.el-tabs--right .el-tabs__item.is-right {
	display: block;
}

.el-tabs--left.el-tabs--card .el-tabs__active-bar.is-left,
.el-tabs--right.el-tabs--card .el-tabs__active-bar.is-right {
	display: none;
}

.el-tabs--left .el-tabs__header.is-left {
	float: left;
	margin-bottom: 0;
	margin-right: 10px;
}

.el-tabs--left .el-tabs__nav-wrap.is-left {
	margin-right: -1px;
}

.el-tabs--left .el-tabs__item.is-left {
	text-align: right;
}

.el-tabs--left.el-tabs--card .el-tabs__item.is-left {
	border-left: none;
	border-right: 1px solid #e4e7ed;
	border-bottom: none;
	border-top: 1px solid #e4e7ed;
	text-align: left;
}

.el-tabs--left.el-tabs--card .el-tabs__item.is-left:first-child {
	border-right: 1px solid #e4e7ed;
	border-top: none;
}

.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active {
	border: 1px solid #e4e7ed;
	border-right-color: #fff;
	border-left: none;
	border-bottom: none;
}

.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:first-child {
	border-top: none;
}

.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:last-child {
	border-bottom: none;
}

.el-tabs--left.el-tabs--card .el-tabs__nav {
	border-radius: 4px 0 0 4px;
	border-bottom: 1px solid #e4e7ed;
	border-right: none;
}

.el-tabs--left.el-tabs--card .el-tabs__new-tab {
	float: none;
}

.el-tabs--left.el-tabs--border-card .el-tabs__header.is-left {
	border-right: 1px solid #dfe4ed;
}

.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
	border: 1px solid transparent;
	margin: -1px 0 -1px -1px;
}

.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active {
	border-color: #d1dbe5 transparent;
}

.el-tabs--right .el-tabs__header.is-right {
	float: right;
	margin-bottom: 0;
	margin-left: 10px;
}

.el-tabs--right .el-tabs__nav-wrap.is-right {
	margin-left: -1px;
}

.el-tabs--right .el-tabs__nav-wrap.is-right::after {
	left: 0;
	right: auto;
}

.el-tabs--right .el-tabs__active-bar.is-right {
	left: 0;
}

.el-tabs--right.el-tabs--card .el-tabs__item.is-right {
	border-bottom: none;
	border-top: 1px solid #e4e7ed;
}

.el-tabs--right.el-tabs--card .el-tabs__item.is-right:first-child {
	border-left: 1px solid #e4e7ed;
	border-top: none;
}

.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active {
	border: 1px solid #e4e7ed;
	border-left-color: #fff;
	border-right: none;
	border-bottom: none;
}

.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:first-child {
	border-top: none;
}

.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:last-child {
	border-bottom: none;
}

.el-tabs--right.el-tabs--card .el-tabs__nav {
	border-radius: 0 4px 4px 0;
	border-bottom: 1px solid #e4e7ed;
	border-left: none;
}

.el-tabs--right.el-tabs--border-card .el-tabs__header.is-right {
	border-left: 1px solid #dfe4ed;
}

.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right {
	border: 1px solid transparent;
	margin: -1px -1px -1px 0;
}

.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right.is-active {
	border-color: #d1dbe5 transparent;
}
</style>
