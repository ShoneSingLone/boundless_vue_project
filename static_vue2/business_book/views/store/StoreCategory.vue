<template>
	<div class="store-shelf">
		<shelf-title :title="shelfCategory.title"></shelf-title>
		<scroll :top="0" :bottom="scrollBottom" class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll" v-if="isShowList">
			<shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
		</scroll>
		<div class="store-shelf-empty-view" v-else>
			{{ $t("shelf.groupNone") }}
		</div>
		<shelf-footer></shelf-footer>
	</div>
</template>

<script lang="ts">
export default async function () {
	const ShelfTitle = await _.$importVue("../../components/shelf/ShelfTitle.vue");
	const ShelfList = await _.$importVue("../../components/shelf/ShelfList.vue");
	const ShelfFooter = await _.$importVue("../../components/shelf/ShelfFooter.vue");
	const Scroll = await _.$importVue("../../components/common/Scroll.vue");
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");

	return {
		mixins: [storeShelfMixin],
		components: {
			ShelfTitle,
			ShelfList,
			ShelfFooter,
			Scroll
		},
		data() {
			return {
				scrollBottom: 0
			};
		},
		computed: {
			isShowList() {
				return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0;
			}
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
			this.getCategoryList(this.$route.query.title);
			this.setCurrentType(2);
		}
	};
}
</script>
