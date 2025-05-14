<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElPagination",
		props: {
			pageSize: {
				type: Number,
				default: 10
			},
			small: Boolean,
			total: Number,
			pageCount: Number,
			pagerCount: {
				type: Number,
				validator(value) {
					return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
				},
				default: 7
			},
			currentPage: {
				type: Number,
				default: 1
			},
			layout: {
				default: "prev, pager, next, jumper, ->, total"
			},
			pageSizes: {
				type: Array,
				default() {
					return [10, 20, 30, 40, 50, 100];
				}
			},
			popperClass: String,
			prevText: String,
			nextText: String,
			background: Boolean,
			disabled: Boolean,
			hideOnSinglePage: Boolean
		},
		data() {
			return {
				internalCurrentPage: 1,
				internalPageSize: 0,
				lastEmittedPage: -1,
				userChangePageSize: false
			};
		},
		render(h) {
			const layout = this.layout;
			if (!layout) return null;
			if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1))
				return null;

			let template = hDiv({
				class: [
					"el-pagination flex middle center",
					{ "is-background": this.background, "el-pagination--small": this.small }
				]
			});

			const TEMPLATE_MAP = {
				prev: h("prev", {}),
				jumper: h("jumper", {}),
				pager: h("Pager", {
					currentPage: this.internalCurrentPage,
					pageCount: this.internalPageCount,
					pagerCount: this.pagerCount,
					onChange: this.handleCurrentChange,
					disabled: this.disabled
				}),
				next: h("next", {}),
				sizes: h("sizes", {
					pageSizes: this.pageSizes
				}),
				slot: h("slot", [this.$slots.default ? this.$slots.default : ""]),
				total: h("total", {})
			};
			const components = layout.split(",").map(item => item.trim());
			const rightWrapper = hDiv({
				class: "el-pagination__rightwrapper"
			});
			let haveRightWrapper = false;
			template.children = template.children || [];
			rightWrapper.children = rightWrapper.children || [];
			components.forEach(compo => {
				if (compo === "->") {
					haveRightWrapper = true;
					return;
				}
				if (!haveRightWrapper) {
					template.children.push(TEMPLATE_MAP[compo]);
				} else {
					rightWrapper.children.push(TEMPLATE_MAP[compo]);
				}
			});
			if (haveRightWrapper) {
				template.children.unshift(rightWrapper);
			}
			return template;
		},
		components: {
			Pager: () => _.$importVue("/common/ui-x/components/data/xPagination/Pager.vue"),
			Prev: {
				render(h) {
					return h(
						"button",
						{
							type: "button",
							class: "btn-prev flex center middle",
							disabled:
								this.$parent.disabled || this.$parent.internalCurrentPage <= 1,
							onClick: this.$parent.prev
						},
						[
							this.$parent.prevText
								? hSpan([this.$parent.prevText])
								: h("xIcon", {
										class: "el-icon el-icon-arrow-left",
										icon: "arrow-left"
									})
						]
					);
				}
			},
			Next: {
				render(h) {
					return h(
						"button",
						{
							type: "button",
							class: "btn-next flex center middle",
							disabled:
								this.$parent.disabled ||
								this.$parent.internalCurrentPage ===
									this.$parent.internalPageCount ||
								this.$parent.internalPageCount === 0,
							onClick: this.$parent.next
						},
						[
							this.$parent.nextText
								? hSpan([this.$parent.nextText])
								: h("xIcon", {
										class: "el-icon el-icon-arrow-right",
										icon: "arrow-right"
									})
						]
					);
				}
			},
			Sizes: {
				props: {
					pageSizes: Array
				},
				watch: {
					pageSizes: {
						immediate: true,
						handler(newVal, oldVal) {
							if (_.$isSame(newVal, oldVal)) return;
							if (Array.isArray(newVal)) {
								this.$parent.internalPageSize =
									newVal.indexOf(this.$parent.pageSize) > -1
										? this.$parent.pageSize
										: this.pageSizes[0];
							}
						}
					}
				},
				render(h) {
					return h(
						"span",
						{
							class: "el-pagination__sizes"
						},
						[
							h(
								"xSelect",
								{
									value: this.$parent.internalPageSize,
									popperClass: this.$parent.popperClass || "",
									size: "mini",
									onInput: this.handleChange,
									disabled: this.$parent.disabled
								},
								_.map(this.pageSizes, item =>
									h(
										"xOption",
										{
											value: item,
											label: item + i18n("el.pagination.pagesize")
										},
										/* 条/页 */
										[item + i18n("el.pagination.pagesize")]
									)
								)
							)
						]
					);
				},
				methods: {
					handleChange(val) {
						if (val !== this.$parent.internalPageSize) {
							this.$parent.internalPageSize = val = parseInt(val, 10);
							this.$parent.userChangePageSize = true;
							this.$parent.$emit("update:pageSize", val);
							this.$parent.$emit("size-change", val);
						}
					}
				}
			},
			Jumper: {
				data() {
					return {
						userInput: null
					};
				},
				watch: {
					"$parent.internalCurrentPage"() {
						this.userInput = null;
					}
				},
				methods: {
					handleKeyup({ keyCode, target }) {
						// Chrome, Safari, Firefox triggers change event on Enter
						// Hack for IE: https://github.com/ElemeFE/element/issues/11710
						// Drop this method when we no longer supports IE
						if (keyCode === 13) {
							this.handleChange(target.value);
						}
					},
					handleInput(value) {
						this.userInput = value;
					},
					handleChange(value) {
						this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(value);
						this.$parent.emitChange();
						this.userInput = null;
					}
				},
				render(h) {
					return h(
						"span",
						{
							class: "el-pagination__jump flex middle center"
						},
						[
							i18n("el.pagination.goto"),
							h("xInput", {
								class: "el-pagination__editor is-in-pagination",
								min: 1,
								max: this.$parent.internalPageCount,
								value:
									this.userInput !== null
										? this.userInput
										: this.$parent.internalCurrentPage,
								type: "number",
								disabled: this.$parent.disabled,
								nativeOnKeyup: this.handleKeyup,
								onInput: this.handleInput,
								onChange: this.handleChange
							}),
							i18n("el.pagination.pageClassifier")
						]
					);
				}
			},
			Total: {
				render(h) {
					if (_.isNumber(this.$parent.total)) {
						return hSpan({
							class: "el-pagination__total",
							children: i18n("el.pagination.total", {
								total: this.$parent.total
							})
						});
					}
					return null;
				}
			},
			Pager: () => _.$importVue("/common/ui-x/components/data/xPagination/Pager.vue")
		},
		methods: {
			handleCurrentChange(val) {
				this.internalCurrentPage = this.getValidCurrentPage(val);
				this.userChangePageSize = true;
				this.emitChange();
			},
			prev() {
				if (this.disabled) return;
				const newVal = this.internalCurrentPage - 1;
				this.internalCurrentPage = this.getValidCurrentPage(newVal);
				this.$emit("prev-click", this.internalCurrentPage);
				this.emitChange();
			},
			next() {
				if (this.disabled) return;
				const newVal = this.internalCurrentPage + 1;
				this.internalCurrentPage = this.getValidCurrentPage(newVal);
				this.$emit("next-click", this.internalCurrentPage);
				this.emitChange();
			},
			getValidCurrentPage(value) {
				value = parseInt(value, 10);
				const havePageCount = typeof this.internalPageCount === "number";
				let resetValue;
				if (!havePageCount) {
					if (isNaN(value) || value < 1) resetValue = 1;
				} else {
					if (value < 1) {
						resetValue = 1;
					} else if (value > this.internalPageCount) {
						resetValue = this.internalPageCount;
					}
				}
				if (resetValue === undefined && isNaN(value)) {
					resetValue = 1;
				} else if (resetValue === 0) {
					resetValue = 1;
				}
				return resetValue === undefined ? value : resetValue;
			},
			emitChange() {
				this.$nextTick(() => {
					if (
						this.internalCurrentPage !== this.lastEmittedPage ||
						this.userChangePageSize
					) {
						this.$emit("current-change", this.internalCurrentPage);
						this.lastEmittedPage = this.internalCurrentPage;
						this.userChangePageSize = false;
					}
				});
			}
		},
		computed: {
			internalPageCount() {
				if (typeof this.total === "number") {
					return Math.max(1, Math.ceil(this.total / this.internalPageSize));
				} else if (typeof this.pageCount === "number") {
					return Math.max(1, this.pageCount);
				}
				return null;
			}
		},
		watch: {
			currentPage: {
				immediate: true,
				handler(val) {
					this.internalCurrentPage = this.getValidCurrentPage(val);
				}
			},
			pageSize: {
				immediate: true,
				handler(val) {
					this.internalPageSize = isNaN(val) ? 10 : val;
				}
			},
			internalCurrentPage: {
				immediate: true,
				handler(newVal) {
					this.$emit("update:currentPage", newVal);
					this.lastEmittedPage = -1;
				}
			},
			internalPageCount(newVal) {
				/* istanbul ignore if */
				const oldPage = this.internalCurrentPage;
				if (newVal > 0 && oldPage === 0) {
					this.internalCurrentPage = 1;
				} else if (oldPage > newVal) {
					this.internalCurrentPage = newVal === 0 ? 1 : newVal;
					this.userChangePageSize && this.emitChange();
				}
				this.userChangePageSize = false;
			}
		}
	});
}
</script>
<style lang="less">
.el-pagination--small .arrow.disabled {
	visibility: hidden;
}

.el-pagination {
	white-space: nowrap;
	padding: 2px 5px;
	color: var(--el-text-color-primary);
	font-weight: 700;
}

.el-pagination::after,
.el-pagination::before {
	display: table;
	content: "";
}

.el-pagination::after {
	clear: both;
}

.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
	font-size: 13px;
	min-width: 35.5px;
	height: 28px;
	line-height: 28px;
	vertical-align: top;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-pagination .el-input__inner {
	text-align: center;
	-moz-appearance: textfield;
	line-height: normal;
}

.el-pagination .el-input__suffix {
	right: 0;
	-webkit-transform: scale(0.8);
	transform: scale(0.8);
}

.el-pagination .el-select .el-input {
	width: 100px;
	margin: 0 5px;
}

.el-pagination .el-select .el-input .el-input__inner {
	padding-right: 25px;
	border-radius: var(--border-radius--small);
}

.el-pagination button {
	border: none;
	padding: 0 6px;
	background: 0 0;
}

.el-pagination button:focus {
	outline: 0;
}

.el-pagination button:hover {
	color: var(--el-color-primary);
}

.el-pagination button:disabled {
	color: var(--el-text-color-disabled);
	background-color: #fff;
	cursor: not-allowed;
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
	background: center center no-repeat #fff;
	background-size: 16px;
	cursor: pointer;
	margin: 0;
	color: var(--el-text-color-primary);
}

.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
	display: block;
	font-size: 12px;
	font-weight: 700;
}

.el-pagination .btn-prev {
	padding-right: 12px;
}

.el-pagination .btn-next {
	padding-left: 12px;
}

.el-pagination .el-pager li.disabled {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-pager li,
.el-pager li.btn-quicknext:hover,
.el-pager li.btn-quickprev:hover {
	cursor: pointer;
}

.el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li.btn-quicknext,
.el-pagination--small .el-pager li.btn-quickprev,
.el-pagination--small .el-pager li:last-child {
	border-color: transparent;
	font-size: 12px;
	line-height: 22px;
	height: 22px;
	min-width: 22px;
}

.el-pagination--small .more::before,
.el-pagination--small li.more::before {
	line-height: 24px;
}

.el-pagination--small button,
.el-pagination--small span:not([class*="suffix"]) {
	height: 22px;
	line-height: 22px;
}

.el-pagination--small .el-pagination__editor,
.el-pagination--small .el-pagination__editor.el-input .el-input__inner {
	height: 22px;
}

.el-pagination__sizes {
	margin: 0 10px 0 0;
	font-weight: 400;
	color: var(--el-text-color-regular);

	.el-input {
		.el-input__inner {
			font-size: 13px;
			padding-left: 8px;
		}

		.el-input__inner:hover {
			border-color: var(--el-color-primary);
		}
	}
}

.el-pagination__total {
	margin-right: 10px;
	font-weight: 400;
	color: var(--el-text-color-regular);
}

.el-pagination__jump {
	margin-left: 24px;
	font-weight: 400;
	color: var(--el-text-color-regular);
}

.el-pagination__jump .el-input__inner {
	padding: 0 3px;
}

.el-pagination__rightwrapper {
	float: right;
}

.el-pagination__editor {
	line-height: 18px;
	padding: 0 2px;
	height: 28px;
	text-align: center;
	margin: 0 2px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border-radius: var(--border-radius--small);
}

.el-pager,
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev {
	padding: 0;
}

.el-pagination__editor.el-input {
	width: 50px;
}

.el-pagination__editor.el-input .el-input__inner {
	height: 28px;
}

.el-pagination__editor .el-input__inner::-webkit-inner-spin-button,
.el-pagination__editor .el-input__inner::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
	margin: 0 5px;
	background-color: var(--el-color-info-light-9);
	color: var(--el-text-color-regular);
	min-width: 30px;
	border-radius: var(--border-radius--mini);
}

.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
	color: var(--el-text-color-disabled);
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
	color: var(--el-color-primary);
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: var(--el-color-primary);
	color: #fff;
}

.el-dialog,
.el-pager li {
	background: #fff;
	-webkit-box-sizing: border-box;
}

.el-pagination.is-background.el-pagination--small .btn-next,
.el-pagination.is-background.el-pagination--small .btn-prev,
.el-pagination.is-background.el-pagination--small .el-pager li {
	margin: 0 3px;
	min-width: 22px;
}

.el-pager,
.el-pager li {
	vertical-align: top;
	margin: 0;
	display: inline-block;
}

.el-pager {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	list-style: none;
	font-size: 0;
}
.el-backtop,
.el-page-header {
	display: -webkit-box;
	display: -ms-flexbox;
}

.el-pager .more::before {
	line-height: 30px;
}

.el-pager li {
	padding: 0 4px;
	font-size: 13px;
	min-width: 35.5px;
	height: 28px;
	line-height: 28px;
	box-sizing: border-box;
	text-align: center;
}

.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
	min-width: 200px;
}

.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
	line-height: 28px;
	color: var(--el-text-color-primary);
}

.el-pager li.btn-quicknext.disabled,
.el-pager li.btn-quickprev.disabled {
	color: var(--el-text-color-disabled);
}

.el-pager li.active + li {
	border-left: 0;
}

.el-pager li:hover {
	color: var(--el-color-primary);
}

.el-pager li.active {
	color: var(--el-color-primary);
	cursor: default;
}

.el-page-header {
	display: flex;
	line-height: 24px;
}

.el-page-header__left {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	cursor: pointer;
	margin-right: 40px;
	position: relative;
}

.el-page-header__left::after {
	content: "";
	position: absolute;
	width: 1px;
	height: 16px;
	right: -20px;
	top: 50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	background-color: #dcdfe6;
}
.el-page-header__left .el-icon-back {
	font-size: 18px;
	margin-right: 6px;
	-ms-flex-item-align: center;
	align-self: center;
}

.el-page-header__title {
	font-size: 14px;
	font-weight: 500;
}

.el-page-header__content {
	font-size: 18px;
	color: var(--el-text-color-primary);
}
</style>
