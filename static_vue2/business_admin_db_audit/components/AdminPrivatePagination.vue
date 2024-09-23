<style lang="less">
.admin-pagination {
	position: relative;
	width: 100%;
	.el-pager {
		li {
			background-color: transparent;
			&.number {
				width: 28px;
				min-width: unset;
				height: 28px;
				padding: 0;
				&.active {
					border: 1px solid var(--el-color-primary);
					border-radius: 6px;
				}
			}
		}
	}
}

.admin-pagination__total {
	position: absolute;
	left: 0;
	top: 0;
}

.admin-pagination-icon {
	padding: 4px;
	&.admin-pagination-icon_prev {
		transform: rotate(180deg);
	}
}
</style>
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
			const layout = "total, prev, pager, next";
			if (!layout) return null;
			if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1))
				return null;

			let template = h("div", {
				class: [
					"admin-pagination flex middle center",
					{ "is-background": this.background, "admin-pagination--small": this.small }
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
				class: "admin-pagination__rightwrapper"
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
						"xBtn",
						{
							preset: "text",
							disabled:
								this.$parent.disabled || this.$parent.internalCurrentPage <= 1,
							onClick: this.$parent.prev
						},
						[
							h("xIcon", {
								class: "admin-pagination-icon admin-pagination-icon_prev mr4",
								icon: "_icon_pagination_next"
							})
						]
					);
				}
			},
			Next: {
				render(h) {
					return h(
						"xBtn",
						{
							preset: "text",
							disabled:
								this.$parent.disabled ||
								this.$parent.internalCurrentPage ===
									this.$parent.internalPageCount ||
								this.$parent.internalPageCount === 0,
							onClick: this.$parent.next
						},
						[
							h("xIcon", {
								class: "admin-pagination-icon admin-pagination-icon_next ml4",
								icon: "_icon_pagination_next"
							})
						]
					);
				}
			},
			Total: {
				render(h) {
					if (_.isNumber(this.$parent.total)) {
						return h("span", {
							class: "admin-pagination__total",
							children: [
								this.$parent.currentPage && `第 ${this.$parent.currentPage} 页/`,
								`总共 ${this.$parent.total} 条`
							]
						});
					}
					return null;
				}
			}
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
