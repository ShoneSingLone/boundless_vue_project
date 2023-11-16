<template>
	<div class="ebook-bookmark" ref="bookmark">
		<div class="ebook-bookmark-text-wrapper">
			<div class="ebook-bookmark-down-wrapper" ref="iconDown">
				<div class="icon-down"></div>
			</div>
			<div class="ebook-bookmark-text">{{ text }}</div>
		</div>
		<div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
			<book-mark :color="color" :width="15" :height="39" />
		</div>
	</div>
</template>

<script>
export default async function () {
	const { realPx } = await _.$importVue("@/utils/utils.vue");
	const BookMark = await _.$importVue("@/common/BookMark.vue");
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	const { getBookmark, saveBookmark } = await _.$importVue("@/utils/localStorage.vue");
	const BLUE = "#346cbc";
	const WHITE = "#fff";
	return {
		mixins: [ebookMixin],
		data() {
			return {
				text: "",
				color: WHITE,
				isFixed: false
			};
		},
		components: {
			BookMark
		},
		computed: {
			height() {
				return realPx(35);
			},
			threshold() {
				return realPx(55);
			},
			fixedStyle() {
				return {
					position: "fixed",
					top: 0
				};
			}
		},
		watch: {
			offsetY(v) {
				if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
					return;
				}
				if (v >= this.height && v < this.threshold) {
					this.beforeThreshold(v);
				} else if (v >= this.threshold) {
					this.afterThreshold(v);
				} else if (v > 0 && v < this.height) {
					this.beforeHeight(v);
				} else if (v === 0) {
					this.restore();
				}
			},
			isBookmark(isBookmark) {
				this.isFixed = isBookmark;
				if (isBookmark) {
					this.color = BLUE;
				} else {
					this.color = WHITE;
				}
			}
		},
		methods: {
			addBookmark() {
				this.bookmark = getBookmark(this.fileName);
				if (!this.bookmark) {
					this.bookmark = [];
				}
				const currentLocation = this.currentBook.rendition.currentLocation();
				const cfibase = currentLocation.start.cfi.replace(/!.*/, "");
				const cfistart = currentLocation.start.cfi.replace(/.*!/, "").replace(/\)$/, "");
				const cfiend = currentLocation.end.cfi.replace(/.*!/, "").replace(/\)$/, "");
				const cfirange = `${cfibase}!,${cfistart},${cfiend})`;
				this.currentBook.getRange(cfirange).then(range => {
					const text = range.toString().replace(/\s\s/g, "");
					this.bookmark.push({
						cfi: currentLocation.start.cfi,
						text: text
					});
					saveBookmark(this.fileName, this.bookmark);
				});
			},
			removeBookmark() {
				const currentLocation = this.currentBook.rendition.currentLocation();
				const cfi = currentLocation.start.cfi;
				this.bookmark = getBookmark(this.fileName);
				if (this.bookmark) {
					this.bookmark = this.bookmark.filter(item => {
						return item.cfi !== cfi;
					});
					saveBookmark(this.fileName, this.bookmark);
					this.setIsBookmark(false);
				}
			},
			restore() {
				// 状态4：归为
				setTimeout(() => {
					this.$refs.bookmark.style.top = `${-this.height}`;
				}, 200);
				if (this.isFixed) {
					this.setIsBookmark(true);
					this.addBookmark();
				} else {
					this.setIsBookmark(false);
					this.removeBookmark();
				}
			},
			beforeHeight() {
				// 状态1： 未超过书签的高度
				if (this.isBookmark) {
					this.text = this.$t("book.pulldownDeleteMark");
					this.color = BLUE;
					this.isFixed = true;
				} else {
					this.text = this.$t("book.pulldownAddMark");
					this.color = WHITE;
					this.isFixed = false;
				}
			},
			beforeThreshold(v) {
				//状态2 ：未到达临界状态
				this.$refs.bookmark.style.top = `${-v}px`;
				const iconDown = this.$refs.iconDown;
				iconDown.style.transform = "";
			},
			afterThreshold(v) {
				// 状态3： 达到极限值
				this.$refs.bookmark.style.top = `${-v}px`;
				if (this.isBookmark) {
					this.text = this.$t("book.releaseDeleteMark");
					this.color = WHITE;
					this.isFixed = false;
				} else {
					this.text = this.$t("book.releaseAddMark");
					this.color = BLUE;
					this.isFixed = true;
				}

				const iconDown = this.$refs.iconDown;
				if (iconDown.style.transform === "") {
					iconDown.style.transform = "rotate(180deg)";
				}
			}
		}
	};
}
</script>
