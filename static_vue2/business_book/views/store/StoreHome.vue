<template>
	<div class="store-home">
		<search-bar />
		<flap-card :data="random" />
		<scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
			<div class="banner-wrapper">
				<div class="banner-img" :style="{ backgroundImage: `url(${banner})` }"></div>
			</div>
			<guess-you-like :data="guessYouLike" />
			<recommend :data="recommend" :class="recommend" />
			<featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured" />
			<div class="category-list-wrapper" v-for="item of categoryList" :key="item.category">
				<category-book :data="item"></category-book>
			</div>
			<category :data="categories" class="category"></category>
		</scroll>
	</div>
</template>

<script lang="ts">
export default async function () {
	const SearchBar = await _.$importVue("../../components/home/SearchBar.vue");
	const FlapCard = await _.$importVue("../../components/home/FlapCard.vue");
	const Scroll = await _.$importVue("../../components/common/Scroll.vue");
	const GuessYouLike = await _.$importVue("../../components/home/GuessYouLike.vue");
	const Recommend = await _.$importVue("../../components/home/Recommend.vue");
	const Featured = await _.$importVue("../../components/home/Featured.vue");
	const CategoryBook = await _.$importVue("../../components/home/CategoryBook.vue");
	const Category = await _.$importVue("../../components/home/Category.vue");
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");
	const { home } = await _.$importVue("@/api/store.vue");
	return {
		mixins: [storeHomeMixin],
		components: {
			SearchBar,
			FlapCard,
			Scroll,
			GuessYouLike,
			Recommend,
			Featured,
			CategoryBook,
			Category
		},
		data() {
			return {
				scrollTop: 94,
				random: null,
				banner: "",
				guessYouLike: null,
				recommend: null,
				featured: null,
				categoryList: null,
				categories: null
			};
		},
		methods: {
			onScroll(offsetY) {
				this.setOffsetY(offsetY);
				if (offsetY > 0) {
					this.scrollTop = 52;
				} else {
					this.scrollTop = 94;
				}
				this.$refs.scroll.refresh();
			}
		},
		mounted() {
			home().then(response => {
				if (response && response.status === 200) {
					const data = response.data;
					const randomIndex = Math.floor(Math.random() * data.random.length);
					this.random = data.random[randomIndex];
					this.banner = data.banner;
					this.guessYouLike = data.guessYouLike;
					this.recommend = data.recommend;
					this.featured = data.featured;
					this.categoryList = data.categoryList;
					this.categories = data.categories;
				}
			});
		}
	};
}
</script>
