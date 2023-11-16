<template>
	<div>
		<div class="search-bar" :class="{ 'hide-title': !titleVisible, 'hide-shadow': !shadowVisible }">
			<transition name="title-move">
				<div class="search-bar-title-wrapper" v-show="titleVisible">
					<div class="title-text-wrapper">
						<span class="title-text title">{{ $t("home.title") }}</span>
					</div>
					<div class="title-icon-shake-wrapper" @click="showFlapCard">
						<span class="icon-shake icon"></span>
					</div>
				</div>
			</transition>
			<div class="title-icon-back-wrapper" :class="{ 'hide-title': !titleVisible }" @click="back">
				<span class="icon-back icon"></span>
			</div>
			<div class="search-bar-input-wrapper" :class="{ 'hide-title': !titleVisible }">
				<div class="search-bar-blank" :class="{ 'hide-title': !titleVisible }"></div>
				<div class="search-bar-input">
					<span class="icon-search icon"></span>
					<input class="input" type="text" :placeholder="$t('home.hint')" v-model="searchText" @click="showHotSearch" @keyup.13.exact="search" />
				</div>
			</div>
		</div>
		<hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
	</div>
</template>

<script>
export default async function () {
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");
	const HotSearchList = await _.$importVue("./HotSearchList.vue");

	return {
		components: { HotSearchList },
		mixins: [storeHomeMixin],
		data() {
			return {
				searchText: "",
				titleVisible: true,
				shadowVisible: false,
				hotSearchVisible: false
			};
		},
		watch: {
			offsetY(offsetY) {
				if (offsetY > 0) {
					this.hideTitle();
					this.showShadow();
				} else {
					this.showTitle();
					this.hideShadow();
				}
			},
			hotSearchOffsetY(offsetY) {
				if (offsetY > 0) {
					this.showShadow();
				} else {
					this.hideShadow();
				}
			}
		},
		methods: {
			search() {
				this.$router.push({
					path: "/store/list",
					query: {
						keyword: this.searchText
					}
				});
			},
			showFlapCard() {
				this.setFlapCardVisible(true);
			},
			back() {
				if (this.offsetY > 0) {
					this.showShadow();
				} else {
					this.hideShadow();
				}
				if (this.hotSearchVisible) {
					this.hideHotSearch();
				} else {
					this.$router.push("/store/shelf");
				}
			},
			showHotSearch() {
				this.hideTitle();
				this.hideShadow();
				this.hotSearchVisible = true;
				this.$nextTick(() => {
					this.$refs.hotSearch.reset();
				});
			},
			hideHotSearch() {
				this.hotSearchVisible = false;
				if (this.offsetY > 0) {
					this.hideTitle();
					this.showShadow();
				} else {
					this.showTitle();
					this.hideShadow();
				}
			},
			hideTitle() {
				this.titleVisible = false;
			},
			showTitle() {
				this.titleVisible = true;
			},
			hideShadow() {
				this.shadowVisible = false;
			},
			showShadow() {
				this.shadowVisible = true;
			}
		}
	};
}
</script>
