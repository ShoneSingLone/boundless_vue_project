<template></template>

<script lang="ts">
export default async function () {
	const { mapGetters, mapActions } = await _.$importVue("/common/libs/Vuex.vue");
	const { themeList, addCss, getReadTimeByMinute } = await _.$importVue("@/utils/book.vue");
	const { saveLocation, getBookmark, getBookShelf, saveBookShelf } = await _.$importVue("@/utils/localStorage.vue");
	const { gotoBookDetail, appendAddToShelf, removeAddFromShelf, computeId } = await _.$importVue("@/utils/store.vue");
	const { shelf } = await _.$importVue("@/api/store.vue");

	const ebookMixin = {
		computed: {
			...mapGetters([
				"fileName",
				"menuVisible",
				"settingVisible",
				"defaultFontSize",
				"defaultFontFamily",
				"fontFamilyVisible",
				"defaultTheme",
				"bookAvailable",
				"progress",
				"section",
				"isPaginating",
				"currentBook",
				"navigation",
				"cover",
				"metadata",
				"paginate",
				"pagelist",
				"offsetY",
				"isBookmark"
			]),
			themeList() {
				return themeList(this);
			},
			getSectionName() {
				if (this.section) {
					return this.navigation[this.section].label;
				}
				return "";
			}
		},
		methods: {
			...mapActions([
				"setFileName",
				"setMenuVisible",
				"setSettingVisible",
				"setDefaultFontSize",
				"setDefaultFontFamily",
				"setFontFamilyVisible",
				"setDefaultTheme",
				"setBookAvailable",
				"setProgress",
				"setSection",
				"setIsPaginating",
				"setCurrentBook",
				"setNavigation",
				"setCover",
				"setMetadata",
				"setPaginate",
				"setPagelist",
				"setOffsetY",
				"setIsBookmark"
			]),
			initGlobalStyle() {
				switch (this.defaultTheme) {
					case "Night":
						addCss(`${window.VUE_APP_RES_URL}/theme/theme_night.css`);
						break;
					case "Eye":
						addCss(`${window.VUE_APP_RES_URL}/theme/theme_eye.css`);
						break;
					case "Gold":
						addCss(`${window.VUE_APP_RES_URL}/theme/theme_gold.css`);
						break;
					default:
						addCss(`${window.VUE_APP_RES_URL}/theme/theme_default.css`);
						break;
				}
			},
			refreshLocation() {
				const currentLocation = this.currentBook.rendition.currentLocation();
				if (currentLocation && currentLocation.start) {
					const startCfi = currentLocation.start.cfi;
					const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi);
					this.setProgress(Math.floor(progress * 100));
					this.setSection(currentLocation.start.index);
					saveLocation(this.fileName, startCfi);
					const bookmark = getBookmark(this.fileName);
					if (bookmark) {
						if (bookmark.some(item => item.cfi === startCfi)) {
							this.setIsBookmark(true);
						} else {
							this.setIsBookmark(false);
						}
					} else {
						this.setIsBookmark(false);
					}
					if (this.pagelist) {
						const totalPage = this.pagelist.length;
						const currentPage = currentLocation.start.location;
						if (currentPage && currentPage > 0) {
							this.setPaginate(currentPage + " / " + totalPage);
						} else {
							this.setPaginate("");
						}
					} else {
						this.setPaginate("");
					}
				}
			},
			display(target, cb) {
				if (target) {
					this.currentBook.rendition.display(target).then(() => {
						this.refreshLocation();
						if (cb) {
							cb();
						}
					});
				} else {
					this.currentBook.rendition.display().then(() => {
						this.refreshLocation();
						if (cb) {
							cb();
						}
					});
				}
			},
			hideTitleAndMenu() {
				this.setMenuVisible(false);
				this.setSettingVisible(-1);
				this.setFontFamilyVisible(false);
			},
			getReadTimeText() {
				return this.$t("book.haveRead").replace("$1", getReadTimeByMinute(this.fileName));
			}
		}
	};

	const storeHomeMixin = {
		computed: {
			...mapGetters(["offsetY", "hotSearchOffsetY", "flapCardVisible"])
		},
		methods: {
			...mapActions(["setOffsetY", "setHotSearchOffsetY", "setFlapCardVisible"]),
			showBookDetail(book) {
				gotoBookDetail(this, book);
			}
		}
	};

	const storeShelfMixin = {
		computed: {
			...mapGetters(["isEditMode", "shelfList", "shelfSelected", "shelfTitleVisible", "offsetY", "shelfCategory", "currentType"])
		},
		methods: {
			...mapActions(["setIsEditMode", "setShelfList", "setShelfSelected", "setShelfTitleVisible", "setOffsetY", "setShelfCategory", "setCurrentType"]),
			showBookDetail(book) {
				gotoBookDetail(this, book);
			},
			getCategoryList(title) {
				this.getShelfList().then(() => {
					const categoryList = this.shelfList.filter(book => {
						return book.type === 2 && book.title === title;
					})[0];
					this.setShelfCategory(categoryList);
				});
			},
			getShelfList() {
				let shelfList = getBookShelf();
				if (!shelfList) {
					shelf().then(response => {
						if (response.status === 200 && response.data && response.data.bookList) {
							shelfList = appendAddToShelf(response.data.bookList);
							saveBookShelf(shelfList);
							return this.setShelfList(shelfList);
						}
					});
				} else {
					return this.setShelfList(shelfList);
				}
			},
			moveOutOfGroup(f) {
				let newShelfList = this.shelfList.map(book => {
					if (book.type === 2 && book.itemList) {
						book.itemList = book.itemList.filter(subBook => !subBook.selected);
					}
					return book;
				});
				this.setShelfList(newShelfList).then(() => {
					let list = removeAddFromShelf(this.shelfList);
					list = [].concat(list, ...this.shelfSelected);
					list = appendAddToShelf(list);
					list = computeId(list);
					this.setShelfList(list).then(() => {
						this.simpleToast(this.$t("shelf.moveBookOutSuccess"));
						if (f) f();
					});
				});
			}
		}
	};

	return {
		ebookMixin,
		storeHomeMixin,
		storeShelfMixin
	};
}
</script>
