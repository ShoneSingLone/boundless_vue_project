<style lang="less">
.tags-view-scroll-pane-wrapper {
	width: 100%;
	.el-scrollbar__view {
		display: flex;
		justify-content: flex-start;
	}
}
</style>
<template>
	<xScrollbar
		ref="scrollContainer"
		:vertical="false"
		class="scroll-container tags-view-scroll-pane-wrapper"
		@wheel.native.prevent="handleScroll">
		<slot />
	</xScrollbar>
</template>
<script lang="ts">
export default async function () {
	const TAG_AND_TAG_SPACING = 4; // tagAndTagSpacing
	return defineComponent({
		name: "ScrollPane",
		data() {
			return {
				left: 0,
				isLoaded: false
			};
		},
		computed: {
			scrollWrapper() {
				return this.$refs.scrollContainer.$refs.wrap;
			}
		},
		async mounted() {
			await _.$ensure(() => this.$refs?.scrollContainer?.$refs?.wrap);
			this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
			this.isLoaded = true;
		},
		beforeDestroy() {
			this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
		},
		methods: {
			handleScroll(e) {
				const eventDelta = e.wheelDelta || -e.deltaY * 40;
				const $scrollWrapper = this.scrollWrapper;
				$scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
			},
			emitScroll() {
				this.$emit("scroll");
			},
			moveToTarget(currentTag) {
				const $container = this.$refs.scrollContainer.$el;
				const $containerWidth = $container.offsetWidth;
				const $scrollWrapper = this.scrollWrapper;
				const tagList = this.$parent.$refs.tag;

				let firstTag = null;
				let lastTag = null;

				// find first tag and last tag
				if (tagList.length > 0) {
					firstTag = tagList[0];
					lastTag = tagList[tagList.length - 1];
				}

				if (firstTag === currentTag) {
					$scrollWrapper.scrollLeft = 0;
				} else if (lastTag === currentTag) {
					$scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
				} else {
					// find preTag and nextTag
					const currentIndex = tagList.findIndex(item => item === currentTag);
					const prevTag = tagList[currentIndex - 1];
					const nextTag = tagList[currentIndex + 1];

					// the tag's offsetLeft after of nextTag
					const afterNextTagOffsetLeft =
						nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + TAG_AND_TAG_SPACING;

					// the tag's offsetLeft before of prevTag
					const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - TAG_AND_TAG_SPACING;

					if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
						$scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
					} else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
						$scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
					}
				}
			}
		}
	});
}
</script>
