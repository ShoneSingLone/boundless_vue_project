<template>
	<transition name="fade">
		<div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
			<transition name="fade-slide-right">
				<div class="content" v-if="settingVisible === 3">
					<div class="content-page-wrapper" v-if="bookAvailable">
						<div class="content-page">
							<component :is="currentTab === 1 ? content : bookmark"></component>
						</div>
						<div class="content-page-tab">
							<div
								class="content-page-tab-item"
								:class="{ selected: currentTab === 1 }"
								@click="selectTab(1)">
								{{ $t("book.navigation") }}
							</div>
							<div
								class="content-page-tab-item"
								:class="{ selected: currentTab === 2 }"
								@click="selectTab(2)">
								{{ $t("book.bookmark") }}
							</div>
						</div>
					</div>
					<div class="content-empty">
						<ebook-loading />
					</div>
				</div>
			</transition>

			<div class="content-bg" @click="hideTitleAndMenu"></div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	const EbookSlideContents = await _.$importVue("./EbookSlideContents.vue");
	const EbookSlideBookmark = await _.$importVue("./EbookSlideBookmark.vue");
	const EbookLoading = await _.$importVue("./EbookLoading.vue");
	return {
		mixins: [ebookMixin],
		components: {
			EbookLoading
		},
		data() {
			return {
				currentTab: 1,
				content: EbookSlideContents,
				bookmark: EbookSlideBookmark
			};
		},
		methods: {
			selectTab(tab) {
				this.currentTab = tab;
			}
		}
	};
}
</script>
