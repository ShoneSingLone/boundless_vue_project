<style lang="less"></style>
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
			if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null;
			let template = h("div", {
				class: [
					"el-pagination",
					{
						"is-background": this.background,
						"el-pagination--small": this.small
					}
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
			const rightWrapper = h("div", {
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
							class: "btn-prev",
							disabled: this.$parent.disabled || this.$parent.internalCurrentPage <= 1,
							onClick: this.$parent.prev
						},
						[
							this.$parent.prevText
								? h("span", [this.$parent.prevText])
								: h("i", {
										class: "el-icon el-icon-arrow-left"
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
							class: "btn-next",
							disabled: this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0,
							onClick: this.$parent.next
						},
						[
							this.$parent.nextText
								? h("span", [this.$parent.nextText])
								: h("i", {
										class: "el-icon el-icon-arrow-right"
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
								this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1 ? this.$parent.pageSize : this.pageSizes[0];
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
									h("xOption", {
										value: item,
										label: item + i18n("el.pagination.pagesize")
									})
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
							class: "el-pagination__jump"
						},
						[
							i18n("el.pagination.goto"),
							h("xInput", {
								class: "el-pagination__editor is-in-pagination",
								min: 1,
								max: this.$parent.internalPageCount,
								value: this.userInput !== null ? this.userInput : this.$parent.internalCurrentPage,
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
					return typeof this.$parent.total === "number"
						? h("span", {
								class: "el-pagination__total",
								children: i18n("el.pagination.total", {
									total: this.$parent.total
								})
							})
						: "";
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
					if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
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
