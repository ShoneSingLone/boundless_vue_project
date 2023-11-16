<script>
export default async function () {
	/**
	 * 如果有COL_MULTIPLE ，就必须有vm.selectedBy:"id", selected：[]
	 */

	return defineComponent({
		props: ["configs"],
		setup(props) {
			const { useAutoResize } = useXui;
			const { height, width, sizer: refxTable } = useAutoResize(props);

			const setColActionWidthImmediate = () => {
				try {
					if (this?.configs?.data?.list?.length > 0) {
						const $xColActions = $(refxTable.value.$el).find(".xColActions")[0];
						/* TODO: 列表中最长的操作 */
						if ($xColActions && $xColActions.children && $xColActions.children.length > 0) {
							const WORD_WIDTH = 12;

							let cellWidth = _.reduce(
								$xColActions.children,
								(_width, childDom) => {
									// const textString = $(childDom).text();
									// const textStringWidth = textString.length * WORD_WIDTH;
									const offsetWidth = Number(childDom.offsetWidth) || 0;
									_width += offsetWidth + WORD_WIDTH * 2;
									return _width;
								},
								0
							);

							let currentWidth = this.configs.colInfo.COL_ACTIONS.width || 100;

							const isResetWidth = currentWidth < cellWidth || currentWidth > cellWidth + WORD_WIDTH;
							if (isResetWidth) {
								currentWidth = cellWidth;
							}

							if (currentWidth !== this.configs.colInfo.COL_ACTIONS.width) {
								_.$val(this, "configs.colInfo.COL_ACTIONS.width", currentWidth);
							}
						}
					}
				} catch (error) {}
			};
			this.setColActionWidthImmediate = setColActionWidthImmediate;
			this.setColActionWidth = _.debounce(setColActionWidthImmediate, 200);

			return function () {
				const vm = this;
				const TableProps = {
					...this.cptTableProps,
					ref: refxTable,
					"data-width": width,
					"data-height": height
				};

				if (width.value && hasOwn(this.$attrs, "auto-resize")) {
					TableProps.height = height.value;
				}

				return h("el-table", TableProps, [
					{
						/* 无数据显示 */
						empty: () =>
							h("div", { staticClass: "flex vertical middle center" }, [
								h(
									"xIcon",
									{
										icon: "icon_no_data",
										staticClass: "empty"
									},
									[]
								),
								h("span", {}, [i18n("暂无数据")])
							]),
						/* 列信息 */
						default: () => {
							const genChildByProp = prop => {
								const child = {
									/* 列头 */
									header: (params = {}) => {
										const { $index, column, store, _self } = params;
										const isCheckBoxCol = this.isCheckBoxCol(prop);
										/*  */
										const staticClass = (() => {
											if (isCheckBoxCol) {
												return "fixed-right table-header";
											}
											return "table-header";
										})();
										/*  */
										const child = (() => {
											if (isCheckBoxCol) {
												return h(
													"xTableColSelected",
													{
														slotname: "header",
														configs: this.configs,
														type: prop
													},
													[]
												);
											}
											return this.getLabelBy(prop);
										})();

										return h("div", { staticClass }, [child]);
									},
									/* 列 cell */
									default: (params = {}) => {
										const { $index, column, store, _self, row } = params;
										const [tag, tableCellProps, children] = (function () {
											const configsProps = {
												prop,
												row,
												index: $index,
												col: vm.allColInfo[prop],
												column
											};

											/* 单选多选列 */
											if (vm.isCheckBoxCol(prop)) {
												const componentProps = {
													...configsProps,
													slotname: "default",
													type: prop,
													configs: vm.configs
												};
												return [
													"div",
													{
														staticClass: "fixed-right"
													},
													[h("xTableColSelected", componentProps, [])]
												];
											}
											/* component 属性 */
											if (vm.isUseComponent(prop)) {
												const componentProps = {
													...configsProps,
													configs: configsProps,
													key: prop
												};
												return [vm.useComponent(prop), componentProps, []];
											}
											/* 操作列 */
											if (vm.isACTION(prop)) {
												const componentProps = {
													configs: {
														...configsProps,
														COL_ACTIONS: vm.allColInfo.COL_ACTIONS
													}
												};
												return ["xColActions", componentProps, []];
											}
											/* html 模板字符串 */
											if (_.isFunction(vm.allColInfo[prop].html)) {
												return [
													"div",
													{
														innerHTML: vm.allColInfo[prop].html(row, $index)
													},
													[]
												];
											}

											/* 默认*/
											return [
												"xRender",
												{
													key: prop,
													render: vm.allColInfo[prop].render || row[prop],
													payload: configsProps
												},
												[]
											];
										})();

										tableCellProps.key = prop;
										tableCellProps.dataColProp = prop;
										tableCellProps.dataRowIndex = $index;
										return h(tag, tableCellProps, children);
									}
								};

								const tableColumnProps = (() => {
									return {
										key: prop,
										prop: prop,
										width: this.getWidthBy(prop),
										type: this.getColTypeBy(prop),
										fixed: this.getFixedBy(prop)
									};
								})();

								return h("el-table-column", tableColumnProps, [child]);
							};

							return _.map(vm.displayProps, genChildByProp);
						}
					}
				]);
			};
		},
		data() {
			return {
				fixedLeft: false,
				fixedRight: false,
				count: 0,
				size: {
					width: 100,
					height: 100
				}
			};
		},
		methods: {
			onResize({ width, height }) {
				console.log(width, height);
			},
			/* ***************** */
			isCheckBoxCol(prop) {
				return ["COL_MULTIPLE", "COL_SINGLE"].includes(prop);
			},
			isACTION(prop) {
				return ["COL_ACTIONS"].includes(prop);
			},
			/* configs 配置优先级最高 */
			getLabelBy(prop) {
				const configsCol = this.allColInfo[prop];
				if (configsCol) {
					if (configsCol.label) {
						return configsCol.label;
					}
					if (prop === "COL_ACTIONS") {
						return i18n("Operation");
					}
					return "";
				}
				return "";
			},
			getWidthBy(prop) {
				const configsCol = this.allColInfo[prop];
				if (configsCol?.width) {
					return configsCol.width;
				}

				if (["COL_SINGLE", "COL_MULTIPLE"].includes(prop)) {
					return "48";
				}
				return "";
			},
			getColTypeBy(prop) {
				const configsCol = this.allColInfo[prop];
				if (configsCol?.type) {
					return configsCol.type;
				}
				return "";
			},
			getFixedBy(prop) {
				const configsCol = this.allColInfo[prop];

				if (configsCol) {
					if (configsCol.fixed) {
						return configsCol.fixed;
					}
				}

				if (["COL_SINGLE", "COL_MULTIPLE"].includes(prop)) {
					return "left";
				}
				if (["COL_ACTIONS"].includes(prop)) {
					const configsCol = this.allColInfo["COL_ACTIONS"];
					if (configsCol.fixed) {
						return configsCol.fixed;
					}
					return "right";
				}
				return false;
			},
			/* ***************** */
			isUseComponent(prop) {
				const colInfo = this.allColInfo[prop];
				let isUse = !!colInfo?.component;
				if (!isUse) {
					for (const prop in colInfo) {
						if (/^xCell/.test(prop)) {
							isUse = true;
							const componentOptions = colInfo[prop].call(colInfo, {
								xCell: colInfo
							});

							if (prop === "xCellSelect" && componentOptions.options === undefined) {
								componentOptions.options = [];
							}
							_.$val(colInfo, "componentOptions", componentOptions);
							colInfo.component = prop;
							break;
						}
					}
				}

				return isUse;
			},
			useComponent(prop) {
				const colInfo = this.allColInfo[prop];
				return colInfo?.component || "div";
			},
			log(prop, col) {}
		},
		watch: {
			"configs.data.list": {
				immediate: true,
				handler(list) {
					if (list.length > 0) {
						this.setColActionWidth();
					}
				}
			}
		},
		computed: {
			cptxAutoResizerProps() {
				return merge_hFnProps([
					{
						class: "xTableWrapper",
						attrs: { "data-table-resizer-id": this._uid }
					},
					{
						class: this?.configs?.class
					},
					this.$attrs
				]);
			},
			cptTableProps() {
				const props = merge_hFnProps([
					{
						class: "xTable",
						ref: "xTable",
						"data-count": this.count
					},
					this.configs,
					this.$attrs,
					this.$props
				]);
				props.data = this.configs.data.list;
				return props;
			},
			allColInfo() {
				return this.configs.colInfo;
			},
			displayProps() {
				return _.reduce(
					this.allColInfo,
					(target, item, prop) => {
						if (!item) {
							console.error(prop + "不存在");
						}
						if (["COL_SINGLE", "COL_MULTIPLE", "COL_ACTIONS"].includes(prop) || item.isShow) {
							target.push(prop);
						}
						return target;
					},
					[]
				);
			},
			colLength() {
				return Object.keys(this.configs.colInfo).length;
			},
			isFixBody() {
				return !!this.tbodyHeight.height;
			},
			tbodyHeight() {
				let style = {};
				if (this.configs.tbodyHeight) {
					style = {
						height: this.configs.tbodyHeight + "px",
						"overflow-y": "auto"
					};
				}
				return style;
			}
		},
		updated() {
			this.setColActionWidthImmediate();
		}
	});
}
</script>

<style lang="less">
.xTable {
	margin-top: var(--ui-half);

	&[flex1] {
		flex: 1;
		height: 1px;
	}

	&.el-table td.el-table__cell,
	&.el-table th.el-table__cell.is-leaf {
		border-bottom: unset;
	}

	&.el-table--border::after,
	&.el-table--group::after,
	&.el-table::before {
		background-color: transparent;
		display: none;
	}

	.el-table__fixed-right::before,
	.el-table__fixed::before {
		background-color: transparent;
		display: none;
	}

	.el-table__row + .el-table__row {
		position: relative;

		&::after {
			content: " ";
			position: absolute;
			top: 0;
			height: 1px;
			right: 0;
			left: 0;
			background-color: var(--el-border-color-lighter);
			// border-bottom: 1px solid var(--el-border-color-lighter);
		}
	}

	&.border {
		border: 1px solid var(--el-border-color-lighter);
		border-radius: var(--border-radius);
		overflow: hidden;

		.el-table__fixed-right::before,
		.el-table__fixed::before {
			background-color: transparent;
			display: none;
		}

		.el-table--border::after,
		.el-table--group::after,
		.el-table::before {
			background-color: transparent;
			display: none;
		}
	}

	.empty {
		width: 300px;
		height: 150px;
		padding: 40px;
		padding-bottom: 20px;
	}

	.fixed-right {
		text-align: center;
	}

	&.el-table th.el-table__cell {
		background: var(--el-border-color-lighter);
	}

	.el-table__cell.el-table__expanded-cell {
		padding-left: var(--ui-one);
		padding-right: var(--ui-one);
	}
}
</style>
