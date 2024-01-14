<template>
	<div class="book-list-wrapper">
		<detail-title :title="title" :showShelf="true" @back="back" ref="title"></detail-title>
		<scroll class="book-list-scroll-wrapper" :top="42" @onScroll="onScroll" ref="scroll">
			<featured :data="value" :titleText="titleText ? titleText : getCategoryText(key)" :btnText="''" v-for="(value, key, index) in list" :key="index"></featured>
		</scroll>
	</div>
</template>

<script lang="ts">
export default async function () {
	const DetailTitle = await _.$importVue("../../components/detail/DetaiTitle.vue");
	const Scroll = await _.$importVue("../../components/common/Scroll.vue");
	const Featured = await _.$importVue("../../components/home/Featured.vue");
	const { realPx } = await _.$importVue("@/utils/utils.vue");
	const { list } = await _.$importVue("@/api/store.vue");
	const { categoryList, categoryText } = await _.$importVue("@/utils/store.vue");

	return {
		components: {
			DetailTitle,
			Scroll,
			Featured
		},
		computed: {
			title() {
				if (this.list) {
					return this.total && this.$t("home.allBook").replace("$1", this.totalNumber);
				} else {
					return null;
				}
			},
			totalNumber() {
				let num = 0;
				Object.keys(this.list).forEach(key => {
					num += this.list[key].length;
				});
				return num;
			}
		},
		data() {
			return {
				list: null,
				total: null
			};
		},
		methods: {
			getCategoryText(key) {
				return `${categoryText(categoryList[key], this)}(${this.list[key].length})`;
			},
			back() {
				this.$router.go(-1);
			},
			onScroll(offsetY) {
				if (offsetY > realPx(42)) {
					this.$refs.title.showShadow();
				} else {
					this.$refs.title.hideShadow();
				}
			},
			getList() {
				list().then(response => {
					this.list = response.data.data;
					this.total = response.data.total;
					const category = this.$route.query.category;
					const keyword = this.$route.query.keyword;
					if (category) {
						const key = Object.keys(this.list).filter(item => item === category)[0];
						const data = this.list[key];
						this.list = {};
						this.list[key] = data;
					} else if (keyword) {
						Object.keys(this.list).filter(key => {
							this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0);
							return this.list[key].length > 0;
						});
					}
				});
			}
		},
		created() {
			this.getList();
			this.titleText = this.$route.query.categoryText;
		}
	};
}
</script>
