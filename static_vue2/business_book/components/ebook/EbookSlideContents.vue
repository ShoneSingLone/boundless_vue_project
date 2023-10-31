<template>
	<div class="ebook-slide-contents">
		<div class="slide-contents-search-wrapper">
			<div class="slide-contents-search-input-wrapper">
				<div class="slide-contents-search-icon">
					<span class="icon-search"></span>
				</div>
				<input
					v-model="searchText"
					type="text"
					class="slide-contents-search-input"
					:placeholder="$t('book.searchHint')"
					@click="showSearchPage"
					@keyup.enter.exact="search" />
			</div>
			<div
				class="slide-contents-search-cancel"
				@click="hideSearchPage"
				v-if="searchVisible">
				{{ $t("book.cancel") }}
			</div>
		</div>
		<div class="slide-contents-book-wrapper" v-show="!searchVisible">
			<div class="slide-contents-book-img-wrapper">
				<img :src="cover" alt="" class="slide-contents-book-img" />
			</div>
			<div class="slide-contents-book-info-wrapper">
				<div class="slide-contents-book-title">
					<span class="slide-contents-book-title-text">{{
						metadata.title
					}}</span>
				</div>
				<div class="slide-contents-book-author">
					<span class="slide-contents-book-author-text">{{
						metadata.creator
					}}</span>
				</div>
			</div>
			<div class="slide-contents-book-progress-wrapper">
				<div class="slide-contents-book-progress">
					<span class="progress">{{ progress + "%" }}</span>
					<span class="progress-text">{{ $t("book.haveRead2") }}</span>
				</div>
				<div class="slide-contents-book-time">{{ getReadTimeText() }}</div>
			</div>
		</div>
		<scroll
			class="slide-contents-list"
			:top="156"
			:bottom="48"
			ref="scroll"
			v-show="!searchVisible">
			<div
				class="slide-contents-item"
				v-for="(item, index) of navigation"
				:key="index"
				@click="displayContent(item.href)">
				<span
					class="slide-contents-item-label"
					:style="contentItemStyle(item)"
					:class="{ selected: section === index }"
					>{{ item.label }}</span
				>
				<span class="slide-contents-item-page">{{ item.page }}</span>
			</div>
		</scroll>
		<scroll
			class="slide-search-list"
			:top="66"
			:bottom="48"
			v-show="searchVisible">
			<div
				class="slide-search-item"
				v-for="(item, index) of searchList"
				:key="index"
				v-html="item.excerpt"
				@click="displayContent(item.cfi, true)"></div>
		</scroll>
	</div>
</template>

<script>
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	const Scroll = await _.$importVue("@/common/Scroll.vue");
	const { px2rem } = await _.$importVue("@/utils/utils.vue");
	return {
		name: "EbookSlideContents",
		mixins: [ebookMixin],
		components: { Scroll },
		data() {
			return {
				searchVisible: false,
				searchList: null,
				searchText: ""
			};
		},
		methods: {
			doSearch(q) {
				return Promise.all(
					this.currentBook.spine.spineItems.map(item =>
						item
							.load(this.currentBook.load.bind(this.currentBook))
							.then(item.find.bind(item, q))
							.finally(item.unload.bind(item))
					)
				).then(results => Promise.resolve([].concat.apply([], results)));
			},
			showSearchPage() {
				this.searchVisible = true;
			},
			hideSearchPage() {
				this.searchVisible = false;
				this.searchText = "";
				this.searchList = null;
			},
			contentItemStyle(item) {
				return {
					marginLeft: `${px2rem(item.level * 15)}rem`
				};
			},
			displayContent(target, highlight = false) {
				this.display(target, () => {
					this.hideTitleAndMenu();
					if (highlight) {
						this.currentBook.rendition.annotations.highlight(target);
					}
				});
			},
			search() {
				if (this.searchText && this.searchText.length > 0) {
					this.doSearch(this.searchText).then(list => {
						this.searchList = list.map(item => {
							item.excerpt = item.excerpt.replace(
								this.searchText,
								`<span class="content-search-text">${this.searchText}</span>`
							);
							return item;
						});
					});
				}
			}
		}
	};
}
</script>
