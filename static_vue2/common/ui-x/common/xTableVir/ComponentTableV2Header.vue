<script>
export default async function () {
	const { castArray, enforceUnit, useNamespace, tableV2HeaderProps } = useXui;

	return defineComponent({
		name: "ComponentTableV2Header",
		props: tableV2HeaderProps,
		setup(props, { expose }) {
			slots = this.$vSlots;
			const ns = useNamespace("table-v2");
			const headerRef = ref();
			const headerStyle = computed(() => {
				return enforceUnit({
					width: props.width,
					height: props.height
				});
			});
			const rowStyle = computed(() =>
				enforceUnit({
					width: props.rowWidth,
					height: props.height
				})
			);
			const headerHeights = computed(() => castArray(unref(props.headerHeight)));
			const scrollToLeft = left => {
				const headerEl = unref(headerRef);
				nextTick(() => {
					headerEl?.scroll &&
						headerEl.scroll({
							left
						});
				});
			};
			const renderFixedRows = () => {
				const fixedRowClassName = ns.e("fixed-header-row");
				const { columns: columns2, fixedHeaderData, rowHeight } = props;
				return fixedHeaderData?.map((fixedRowData, fixedRowIndex) => {
					const style = enforceUnit({
						height: rowHeight,
						width: "100%"
					});
					return slots.fixed?.({
						class: fixedRowClassName,
						columns: columns2,
						rowData: fixedRowData,
						rowIndex: -(fixedRowIndex + 1),
						style
					});
				});
			};
			const renderDynamicRows = () => {
				const dynamicRowClassName = ns.e("dynamic-header-row");
				const { columns: columns2 } = props;
				return unref(headerHeights).map((rowHeight, rowIndex) => {
					const style = enforceUnit({
						width: "100%",
						height: rowHeight
					});
					return slots.dynamic?.({
						class: dynamicRowClassName,
						columns: columns2,
						headerIndex: rowIndex,
						style
					});
				});
			};
			expose({
				scrollToLeft
			});
			return function () {
				if (props.height <= 0) {
					return;
				}
				return h(
					"div",
					{
						ref: headerRef,
						class: props.classV2,
						style: unref(headerStyle),
						attrs: {
							role: "rowgroup"
						}
					},
					[
						h(
							"div",
							{
								style: unref(rowStyle),
								class: ns.e("header")
							},
							[renderDynamicRows(), renderFixedRows()]
						)
					]
				);
			};
		}
	});
}
</script>

<style lang="less"></style>
