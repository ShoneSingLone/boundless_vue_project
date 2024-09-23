<script lang="ts">
export default async function () {
	const [{ createList, isHorizontal, getOffset }] = await _.$importVue([
		"/common/ui-x/components/data/xVirtualList/xBuildList.vue"
	]);

	return createList({
		name: "xFixedSizeList",
		getItemOffset: ({ itemSize: itemSize2 }, index) => index * itemSize2,
		getOffset,
		getItemSize: ({ itemSize: itemSize2 }) => itemSize2,
		getEstimatedTotalSize: ({ total: total2, itemSize: itemSize2 }) => itemSize2 * total2,
		getStartIndexForOffset: ({ total: total2, itemSize: itemSize2 }, offset) =>
			Math.max(0, Math.min(total2 - 1, Math.floor(offset / itemSize2))),
		getStopIndexForStartIndex: (
			{ height, total: total2, itemSize: itemSize2, layout: layout2, width },
			startIndex,
			scrollOffset
		) => {
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
