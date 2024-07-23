<script lang="ts">
export default async function () {
	Vue.component("ComponentTableV2Header", () =>
		_.$importVue("/common/ui-x/components/data/xTableVir/ComponentTableV2Header.vue")
	);
	Vue.component("ComponentFixedSizeGrid", () =>
		_.$importVue("/common/ui-x/components/data/xTableVir/ComponentFixedSizeGrid.vue")
	);
	Vue.component("ComponentDynamicSizeGrid", () =>
		_.$importVue("/common/ui-x/components/data/xTableVir/ComponentDynamicSizeGrid.vue")
	);

	const { useTableGrid, TableV2InjectionKey, tableV2GridProps } = _xUtils;

	/* ScrollBar */
	return defineComponent({
		name: "ComponentTableV2Grid",
		props: tableV2GridProps,
		setup(props, { expose }) {
			const { ns } = inject(TableV2InjectionKey);
			const {
				bodyRef,
				fixedRowHeight,
				gridHeight,
				hasHeader,
				headerRef,
				headerHeight,
				totalHeight,
				forceUpdate,
				itemKey,
				onItemRendered,
				resetAfterRowIndex,
				scrollTo,
				scrollToTop,
				scrollToRow
			} = useTableGrid(props);
			expose({
				forceUpdate,
				totalHeight,
				scrollTo,
				scrollToTop,
				scrollToRow,
				resetAfterRowIndex
			});
			const getColumnWidth = () => props.bodyWidth;
			return function () {
				const vm = this;
				const {
					cache: cache2,
					columns: columns2,
					data,
					fixedData,
					useIsScrolling,
					scrollbarAlwaysOn,
					scrollbarEndGap,
					scrollbarStartGap,
					style,
					rowHeight,
					bodyWidth,
					estimatedRowHeight,
					headerWidth,
					height,
					width,
					getRowHeight,
					onScroll
				} = props;
				const isDynamicRowEnabled = _.isNumber(estimatedRowHeight);
				const Grid = isDynamicRowEnabled
					? "ComponentDynamicSizeGrid"
					: "ComponentFixedSizeGrid";
				const _headerHeight = unref(headerHeight);
				return h(
					"div",
					{
						attrs: {
							role: "table"
						},
						class: [ns.e("table"), props.classV2],
						style: style
					},
					[
						h(
							Grid,
							{
								ref: bodyRef,
								attrs: {
									"data-name": Grid.name,
									"data-role": "table-main_body",
									data: data,
									useIsScrolling: useIsScrolling,
									itemKey: itemKey,
									columnCache: 0,
									columnWidth: isDynamicRowEnabled ? getColumnWidth : bodyWidth,
									totalColumn: 1,
									totalRow: data.length,
									rowCache: cache2,
									rowHeight: isDynamicRowEnabled ? getRowHeight : rowHeight,
									width: width,
									height: unref(gridHeight),
									role: "rowgroup",
									scrollbarStartGap: scrollbarStartGap,
									scrollbarEndGap: scrollbarEndGap,
									scrollbarAlwaysOn: scrollbarAlwaysOn,
									perfMode: false
								},
								class: ns.e("body"),
								on: {
									scroll: onScroll,
									itemRendered: onItemRendered
								}
							},
							[
								{
									default: params => {
										const rowData = data[params.rowIndex];
										return vm.$vSlots.row?.({
											...params,
											columns: columns2,
											rowData
										});
									}
								}
							]
						),
						(function () {
							if (unref(hasHeader)) {
								return h(
									"ComponentTableV2Header",
									{
										ref: headerRef,
										class: ns.e("header-wrapper"),
										attrs: {
											columns: columns2,
											headerData: data,
											headerHeight: props.headerHeight,
											fixedHeaderData: fixedData,
											rowWidth: headerWidth,
											rowHeight: rowHeight,
											width: width,
											height: Math.min(
												_headerHeight + unref(fixedRowHeight),
												height
											)
										}
									},
									[
										{
											dynamic: vm.$vSlots.header,
											fixed: vm.$vSlots.row
										}
									]
								);
							}
						})()
					]
				);
			};
		}
	});
}
</script>

<style lang="less">
[data-role="table-virtualized"] {
	* {
		outline: 1px solid greenyellow;
	}
}
</style>
