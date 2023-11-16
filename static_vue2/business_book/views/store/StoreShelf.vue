<template>
	<div class="store-shelf">
		<shelf-title :title="$t('shelf.title')"></shelf-title>
		<scroll :top="0" :bottom="scrollBottom" class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll">
			<shelf-search></shelf-search>
			<shelf-list :data="shelfList"></shelf-list>
		</scroll>
		<shelf-footer></shelf-footer>
	</div>
</template>

<script>
export default async function () {
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [storeShelfMixin],
		components: {
			ShelfTitle: () => _.$importVue("@/components/shelf/ShelfTitle.vue"),
			ShelfSearch: () => _.$importVue("@/components/shelf/ShelfSearch.vue"),
			ShelfList: () => _.$importVue("@/components/shelf/ShelfList.vue"),
			ShelfFooter: () => _.$importVue("@/components/shelf/ShelfFooter.vue"),
			Scroll: () => _.$importVue("@/components/common/Scroll.vue")
		},
		data() {
			return {
				scrollBottom: 0
			};
		},
		watch: {
			isEditMode(isEditMode) {
				this.scrollBottom = isEditMode ? 48 : 0;
				this.$nextTick(() => {
					this.$refs.scroll.refresh();
				});
			}
		},
		methods: {
			onScroll(offsetY) {
				this.setOffsetY(offsetY);
			}
		},
		mounted() {
			this.getShelfList();
			this.setShelfCategory([]);
			this.setCurrentType(1);
		}
	};
}
</script>
