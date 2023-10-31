<template>
	<div
		class="shelf-search-wrapper"
		:class="{ 'search-top': ifInputClicked, 'hide-shadow': ifHideShadow }">
		<div class="shelf-search" :class="{ 'search-top': ifInputClicked }">
			<div class="search-wrapper">
				<div class="icon-search-wrapper">
					<span class="icon-search icon"></span>
				</div>
				<div class="search-input-wrapper">
					<input
						type="text"
						class="search-input"
						:placeholder="$t('shelf.search')"
						@click="onSearchClick"
						v-model="searchText" />
				</div>
				<div
					class="icon-clear-wrapper"
					v-show="searchText.length > 0"
					@click="clearSearchText">
					<span class="icon-close-circle-fill"></span>
				</div>
			</div>
			<div
				class="icon-locale-wrapper"
				v-show="!ifInputClicked"
				@click="switchLocale">
				<span class="icon-cn icon" v-if="lang === 'cn'"></span>
				<span class="icon-en icon" v-else></span>
			</div>
			<div
				class="cancle-btn-wrapper"
				@click="onCancelClick"
				v-show="ifInputClicked">
				<span class="cancle-text">{{ $t("shelf.cancel") }}</span>
			</div>
		</div>
		<transition name="hot-search-move">
			<div class="shelf-search-tab-wrapper" v-show="ifInputClicked">
				<div
					class="shelf-search-tab-item"
					v-for="item in tabs"
					:key="item.id"
					@click="onTabClick(item.id)">
					<span
						class="shelf-search-tab-text"
						:class="{ 'is-selected': item.id === selectedTab }"
						>{{ item.text }}
					</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default async function () {
	const { setLocalStorage } = await _.$importVue("@/utils/localStorage.vue");
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [storeShelfMixin],
		data() {
			return {
				ifInputClicked: false,
				searchText: "",
				selectedTab: 1,
				ifHideShadow: true
			};
		},
		watch: {
			offsetY(offsetY) {
				if (offsetY > 0 && this.ifInputClicked) {
					this.ifHideShadow = false;
				} else {
					this.ifHideShadow = true;
				}
			}
		},
		computed: {
			lang() {
				return this.$i18n.locale;
			},
			tabs() {
				return [
					{
						id: 1,
						text: this.$t("shelf.default")
					},
					{
						id: 2,
						text: this.$t("shelf.progress")
					},
					{
						id: 3,
						text: this.$t("shelf.purchase")
					}
				];
			}
		},
		methods: {
			onTabClick(id) {
				this.selectedTab = id;
			},
			clearSearchText() {
				this.searchText = "";
			},
			switchLocale() {
				if (this.lang === "en") {
					this.$i18n.locale = "cn";
				} else {
					this.$i18n.locale = "en";
				}
				setLocalStorage("locale", this.$i18n.locale);
			},
			onSearchClick() {
				this.ifInputClicked = true;
				this.setShelfTitleVisible(false);
			},
			onCancelClick() {
				this.ifInputClicked = false;
				this.setShelfTitleVisible(true);
			}
		}
	};
}
</script>
