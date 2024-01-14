<template>
	<div class="featured">
		<title-view :label="titleText" :btn="btnText" v-if="titleVisible && data && data.length > 0"></title-view>
		<div class="featured-list">
			<div class="featured-item-wrapper">
				<div class="featured-item" v-for="(item, index) in data" :key="index" @click="showBookDetail(item)">
					<div class="img-wrapper">
						<img class="img" :src="item.cover" />
					</div>
					<div class="content-wrapper">
						<div class="title title-small" ref="title">{{ item.title }}</div>
						<div class="author sub-title-tiny" ref="author">
							{{ item.author }}
						</div>
						<div class="category third-title-tiny" ref="category">
							{{ categoryText(item.category) }}
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
	const { realPx } = await _.$importVue("@/utils/utils");
	const { categoryText } = await _.$importVue("../../utils/store");
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");

	return {
		mixins: [storeHomeMixin],
		components: {
			TitleView
		},
		props: {
			data: Array,
			titleVisible: {
				type: Boolean,
				default: true
			},
			titleText: {
				type: String
			},
			btnText: {
				type: String
			}
		},
		computed: {
			width() {
				return window.innerWidth - realPx(20) - realPx(60) + "px";
			}
		},
		methods: {
			categoryText(category) {
				return categoryText(category, this);
			},
			resize() {
				this.$nextTick(() => {
					this.$refs.title.forEach(item => {
						item.style.width = this.width;
					});
					this.$refs.author.forEach(item => {
						item.style.width = this.width;
					});
					this.$refs.category.forEach(item => {
						item.style.width = this.width;
					});
				});
			}
		}
	};
}
</script>
