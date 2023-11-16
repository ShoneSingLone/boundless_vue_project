<template>
	<div class="category-book">
		<title-view :label="categoryText(data.category)" :btn="$t('home.seeAll')" @onClick="showBookCategory"></title-view>
		<div class="category-book-list">
			<div class="category-book-item" v-for="(item, index) in data.list" :key="index" @click="showBookDetail(item)">
				<div class="img-wrapper">
					<img class="img" :src="item.cover" />
				</div>
				<div class="content-wrapper">
					<div class="title title-small" ref="title">{{ item.title }}</div>
					<div class="num sub-title-tiny" ref="author">{{ item.author }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default async function () {
	const TitleView = await _.$importVue("./Title.vue");
	const { categoryText, getCategoryName } = await _.$importVue("../../utils/store");
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");

	return {
		mixins: [storeHomeMixin],
		components: {
			TitleView
		},
		props: {
			data: Object
		},
		methods: {
			showBookCategory() {
				this.$router.push({
					path: "/store/list",
					query: {
						category: getCategoryName(this.data.category),
						categoryText: this.categoryText(this.data.category)
					}
				});
			},
			categoryText(category) {
				return categoryText(category, this);
			}
		}
	};
}
</script>
