<template>
	<div class="ebook-slide-bookmark">
		<div class="slide-bookmark-title">{{ $t("book.bookmark") }} · {{ bookmark ? bookmark.length : 0 }}</div>
		<scroll class="slide-bookmark-list" :top="48" :bottom="48">
			<div class="slide-bookmark-item" v-for="(item, index) in bookmark" :key="index" @click="displayBookmark(item.cfi)">
				<div class="slide-bookmark-item-icon">
					<div class="icon-bookmark"></div>
				</div>
				<div class="slide-bookmark-item-text">{{ item.text }}</div>
			</div>
		</scroll>
	</div>
</template>

<script>
export default async function () {
	const Scroll = await _.$importVue("@/common/Scroll.vue");
	const { getBookmark } = await _.$importVue("../../utils/localStorage");
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");

	return {
		name: "EbookSlideBookmark",
		mixins: [ebookMixin],
		components: {
			Scroll
		},
		data() {
			return {
				bookmark: null
			};
		},
		methods: {
			displayBookmark(target) {
				this.display(target, () => {
					this.hideTitleAndMenu();
				});
			}
		},
		mounted() {
			this.bookmark = getBookmark(this.fileName);
		}
	};
}
</script>
