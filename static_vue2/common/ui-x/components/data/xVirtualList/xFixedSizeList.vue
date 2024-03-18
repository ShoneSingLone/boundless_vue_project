<script lang="ts">
export default async function () {
	const { createList, getScrollDir, isHorizontal, useWheel, SMART_ALIGNMENT, AUTO_ALIGNMENT, CENTERED_ALIGNMENT, START_ALIGNMENT, END_ALIGNMENT } = await _.$importVue(
		"/common/ui-x/components/data/xVirtualList/xBuildList.vue"
	);
	return createList({
		name: "xFixedSizeList",
		getItemOffset: ({ itemSize: itemSize2 }, index) => index * itemSize2,
		getItemSize: ({ itemSize: itemSize2 }) => itemSize2,
		getEstimatedTotalSize: ({ total: total2, itemSize: itemSize2 }) => itemSize2 * total2,
		getOffset: ({ height, total: total2, itemSize: itemSize2, layout: layout2, width }, index, alignment, scrollOffset) => {
			const size = isHorizontal(layout2) ? width : height;
			const lastItemOffset = Math.max(0, total2 * itemSize2 - size);
			const maxOffset = Math.min(lastItemOffset, index * itemSize2);
			const minOffset = Math.max(0, (index + 1) * itemSize2 - size);
			if (alignment === SMART_ALIGNMENT) {
				if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
					alignment = AUTO_ALIGNMENT;
				} else {
					alignment = CENTERED_ALIGNMENT;
				}
			}
			switch (alignment) {
				case START_ALIGNMENT: {
					return maxOffset;
				}
				case END_ALIGNMENT: {
					return minOffset;
				}
				case CENTERED_ALIGNMENT: {
					const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
					if (middleOffset < Math.ceil(size / 2)) {
						return 0;
					} else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
						return lastItemOffset;
					} else {
						return middleOffset;
					}
				}
				case AUTO_ALIGNMENT:
				default: {
					if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
						return scrollOffset;
					} else if (scrollOffset < minOffset) {
						return minOffset;
					} else {
						return maxOffset;
					}
				}
			}
		},
		getStartIndexForOffset: ({ total: total2, itemSize: itemSize2 }, offset) => Math.max(0, Math.min(total2 - 1, Math.floor(offset / itemSize2))),
		getStopIndexForStartIndex: ({ height, total: total2, itemSize: itemSize2, layout: layout2, width }, startIndex, scrollOffset) => {
			const offset = startIndex * itemSize2;
			const size = isHorizontal(layout2) ? width : height;
			const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize2);
			return Math.max(0, Math.min(total2 - 1, startIndex + numVisibleItems - 1));
		},
		initCache() {
			return void 0;
		},
		clearCache: true,
		validateProps() {}
	});
}
</script>
