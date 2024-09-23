<script lang="ts">
export default async function () {
	const [
		{
			getItemFromCache,
			createGrid,
			getOffset,
			findItem,
			getEstimatedTotalHeight,
			getEstimatedTotalWidth,
			DEFAULT_DYNAMIC_LIST_ITEM_SIZE
		}
	] = await _.$importVue(["/common/ui-x/components/data/xVirtualList/xBuildList.vue"]);

	const options = {
		name: "ElDynamicSizeGrid",
		getColumnPosition: (props, idx, cache2) => {
			const item = getItemFromCache(props, idx, cache2, "column");
			return [item.size, item.offset];
		},
		getRowPosition: (props, idx, cache2) => {
			const item = getItemFromCache(props, idx, cache2, "row");
			return [item.size, item.offset];
		},
		getColumnOffset: (props, columnIndex, alignment, scrollLeft, cache2, scrollBarWidth2) => {
			return getOffset(
				props,
				columnIndex,
				alignment,
				scrollLeft,
				cache2,
				"column",
				scrollBarWidth2
			);
		},
		getRowOffset: (props, rowIndex, alignment, scrollTop, cache2, scrollBarWidth2) => {
			return getOffset(props, rowIndex, alignment, scrollTop, cache2, "row", scrollBarWidth2);
		},
		getColumnStartIndexForOffset: (props, scrollLeft, cache2) => {
			return findItem(props, cache2, scrollLeft, "column");
		},
		getColumnStopIndexForStartIndex: (props, startIndex, scrollLeft, cache2) => {
			const item = getItemFromCache(props, startIndex, cache2, "column");
			const maxOffset = scrollLeft + props.width;
			let offset = item.offset + item.size;
			let stopIndex = startIndex;
			while (stopIndex < props.totalColumn - 1 && offset < maxOffset) {
				stopIndex++;
				offset += getItemFromCache(props, startIndex, cache2, "column").size;
			}
			return stopIndex;
		},
		getEstimatedTotalHeight,
		getEstimatedTotalWidth,
		getRowStartIndexForOffset: (props, scrollTop, cache2) => {
			return findItem(props, cache2, scrollTop, "row");
		},
		getRowStopIndexForStartIndex: (props, startIndex, scrollTop, cache2) => {
			const { totalRow, height } = props;
			const item = getItemFromCache(props, startIndex, cache2, "row");
			const maxOffset = scrollTop + height;
			let offset = item.size + item.offset;
			let stopIndex = startIndex;
			while (stopIndex < totalRow - 1 && offset < maxOffset) {
				stopIndex++;
				offset += getItemFromCache(props, stopIndex, cache2, "row").size;
			}
			return stopIndex;
		},
		injectToInstance: (instance, cache2) => {
			const resetAfter = ({ columnIndex, rowIndex }, forceUpdate) => {
				var _a2, _b;
				forceUpdate = _.isUndefined(forceUpdate) ? true : forceUpdate;
				if (_.isNumber(columnIndex)) {
					cache2.value.lastVisitedColumnIndex = Math.min(
						cache2.value.lastVisitedColumnIndex,
						columnIndex - 1
					);
				}
				if (_.isNumber(rowIndex)) {
					cache2.value.lastVisitedRowIndex = Math.min(
						cache2.value.lastVisitedRowIndex,
						rowIndex - 1
					);
				}
				(_a2 = instance.exposed) == null
					? void 0
					: _a2.getItemStyleCache.value(-1, null, null);
				if (forceUpdate) (_b = instance.proxy) == null ? void 0 : _b.$forceUpdate();
			};
			const resetAfterColumnIndex = (columnIndex, forceUpdate) => {
				resetAfter({ columnIndex }, forceUpdate);
			};
			const resetAfterRowIndex = (rowIndex, forceUpdate) => {
				resetAfter({ rowIndex }, forceUpdate);
			};
			Object.assign(instance.proxy, {
				resetAfterColumnIndex,
				resetAfterRowIndex,
				resetAfter
			});
		},
		initCache: ({
			estimatedColumnWidth = DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
			estimatedRowHeight = DEFAULT_DYNAMIC_LIST_ITEM_SIZE
		}) => {
			const cache2 = {
				column: {},
				estimatedColumnWidth,
				estimatedRowHeight,
				lastVisitedColumnIndex: -1,
				lastVisitedRowIndex: -1,
				row: {}
			};
			return cache2;
		},
		clearCache: false,
		validateProps: ({ columnWidth, rowHeight }) => {
			return;
		}
	};
	const DynamicSizeGrid = createGrid(options);
	return DynamicSizeGrid;
}
</script>
