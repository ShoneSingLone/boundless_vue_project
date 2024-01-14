<template>
	<div class="category">
		<title-view :label="$t('home.category')" :btn="$t('home.seeAll')" @onClick="showBookList"></title-view>
		<div class="category-list">
			<div class="category-item-wrapper" v-for="(item, index) in data" :key="index" @click="showBookCategory(item)">
				<div class="category-item">
					<div class="content-wrapper">
						<div class="title title-medium">
							{{ categoryText(item.category) }}
						</div>
						<div class="num sub-title-tiny">
							{{ item.num + " " + $t("home.books") }}
						</div>
					</div>
					<div class="img-wrapper">
						<div class="img-group">
							<img class="img" :src="item.img1" />
							<img class="img2" :src="item.img2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const TitleView = await _.$importVue("./Title.vue");
	const { categoryText, getCategoryName } = await _.$importVue("../../utils/store");

	return {
		components: {
			TitleView
		},
		props: {
			data: Array
		},
		methods: {
			showBookCategory(item) {
				this.$router.push({
					path: "/store/list",
					query: {
						category: getCategoryName(item.category),
						categoryText: this.categoryText(item.category)
					}
				});
			},
			categoryText(category) {
				return categoryText(category, this);
			},
			showBookList() {
				this.$router.push("/store/list");
			}
		}
	};
}
</script>
