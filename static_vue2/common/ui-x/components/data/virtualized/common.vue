<script lang="ts">
export default async function () {
	const virtualizedListProps = buildProps({
		cache,
		estimatedItemSize,
		layout,
		initScrollOffset,
		total,
		itemSize,
		...virtualizedProps
	});
	return {
		virtualizedListProps
	};
}
</script>
