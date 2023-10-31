<template>
	<div class="shelf-footer" v-show="isEditMode">
		<div
			class="shelf-footer-tab-wrapper"
			v-for="item in tabs"
			:key="item.index"
			@click="onTabClick(item)"
			:class="{ 'is-selected': isSelected }">
			<div class="shelf-footer-tab">
				<div
					class="icon-private tab-icon"
					v-if="item.index === 1 && !isPrivate"></div>
				<div
					class="icon-private-see tab-icon"
					v-if="item.index === 1 && isPrivate"></div>

				<div
					class="icon-download tab-icon"
					v-if="item.index === 2 && !isDownload"></div>
				<div
					class="icon-download-remove tab-icon"
					v-if="item.index === 2 && isDownload"></div>

				<div class="icon-move tab-icon" v-if="item.index === 3"></div>
				<div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
				<div class="tab-text" :class="{ 'remove-text': item.index === 4 }">
					{{ label(item) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default async function () {
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	const { saveBookShelf, removeLocalStorage } = await _.$importVue(
		"@/utils/localStorage.vue"
	);
	const { download } = await _.$importVue("@/api/store.vue");
	const { removeLocalForage } = await _.$importVue("@/utils/localForage.vue");

	return {
		mixins: [storeShelfMixin],
		computed: {
			isSelected() {
				return this.shelfSelected && this.shelfSelected.length > 0;
			},
			tabs() {
				return [
					{
						label: this.$t("shelf.private"),
						label2: this.$t("shelf.noPrivate"),
						index: 1
					},
					{
						label: this.$t("shelf.download"),
						label2: this.$t("shelf.delete"),
						index: 2
					},
					{
						label: this.$t("shelf.move"),
						index: 3
					},
					{
						label: this.$t("shelf.remove"),
						index: 4
					}
				];
			},
			isPrivate() {
				if (!this.isSelected) {
					return false;
				}
				return this.shelfSelected.every(item => item.private);
			},
			isDownload() {
				if (!this.isSelected) {
					return false;
				}
				return this.shelfSelected.every(item => item.cache);
			}
		},
		data() {
			return {
				popupMenu: null
			};
		},
		methods: {
			async downloadSelectedBook() {
				for (let i = 0; i < this.shelfSelected.length; i++) {
					await this.downloadBook(this.shelfSelected[i]).then(book => {
						book.cache = true;
					});
				}
			},
			removeSelectedBook() {
				Promise.all(this.shelfSelected.map(book => this.removeBook(book))).then(
					books => {
						books.map(book => {
							book.cache = false;
						});
						saveBookShelf(this.shelfList);
						this.simpleToast(this.$t("shelf.removeDownloadSuccess"));
					}
				);
			},
			removeBook(book) {
				return new Promise((resolve, reject) => {
					removeLocalStorage(`${book.categoryText}/${book.fileName}-info`);
					removeLocalForage(`${book.fileName}`, resolve, reject);
					resolve(book);
				});
			},
			downloadBook(book) {
				let text = "";
				const toast = this.toast({
					text
				});
				toast.continueShow();
				return new Promise((resolve, reject) => {
					download(
						book,
						book => {
							toast.remove();
							resolve(book);
						},
						reject,
						progressEvent => {
							const progress =
								Math.floor((progressEvent.loaded / progressEvent.total) * 100) +
								"%";
							const text = this.$t("shelf.progressDownload").replace(
								"$1",
								`${book.fileName}.epub(${progress})`
							);
							toast.updateText(text);
						}
					);
				});
			},
			onComplete() {
				this.hidePopup();
				this.setIsEditMode(false);
				saveBookShelf(this.shelfList);
			},
			hidePopup() {
				this.popupMenu.hide();
			},
			setPrivate() {
				let isPrivate;
				if (this.isPrivate) {
					isPrivate = false;
				} else {
					isPrivate = true;
				}
				this.shelfSelected.forEach(book => {
					book.private = isPrivate;
				});
				this.onComplete();
				if (isPrivate) {
					this.simpleToast(this.$t("shelf.setPrivateSuccess"));
				} else {
					this.simpleToast(this.$t("shelf.closePrivateSuccess"));
				}
			},
			async setDownload() {
				this.onComplete();
				if (this.isDownload) {
					this.removeSelectedBook();
				} else {
					await this.downloadSelectedBook();
					saveBookShelf(this.shelfList);
					this.simpleToast(this.$t("shelf.setDownloadSuccess"));
				}
			},
			removeSelected() {
				this.shelfSelected.forEach(selected => {
					this.setShelfList(this.shelfList.filter(book => book !== selected));
				});
				this.setShelfSelected([]);
				this.onComplete();
			},
			showPrivate() {
				this.popupMenu = this.popup({
					title: this.isPrivate
						? this.$t("shelf.closePrivateTitle")
						: this.$t("shelf.setPrivateTitle"),
					btn: [
						{
							text: this.isPrivate
								? this.$t("shelf.close")
								: this.$t("shelf.open"),
							click: () => {
								this.setPrivate();
							}
						},
						{
							text: this.$t("shelf.cancel"),
							click: () => {
								this.hidePopup();
							}
						}
					]
				}).show();
			},
			showDownload() {
				this.popupMenu = this.popup({
					title: this.isDownload
						? this.$t("shelf.removeDownloadTitle")
						: this.$t("shelf.setDownloadTitle"),
					btn: [
						{
							text: this.isDownload
								? this.$t("shelf.delete")
								: this.$t("shelf.open"),
							click: () => {
								this.setDownload();
							}
						},
						{
							text: this.$t("shelf.cancel"),
							click: () => {
								this.hidePopup();
							}
						}
					]
				}).show();
			},
			showRemove() {
				let title;
				if (this.shelfSelected.length === 1) {
					title = this.$t("shelf.removeBookTitle").replace(
						"$1",
						`《${this.shelfSelected[0].title}》`
					);
				} else {
					title = this.$t("shelf.removeBookTitle").replace(
						"$1",
						this.$t("shelf.selectedBooks")
					);
				}

				this.popupMenu = this.popup({
					title: title,
					btn: [
						{
							text: this.$t("shelf.removeBook"),
							type: "danger",
							click: () => {
								this.removeSelected();
							}
						},
						{
							text: this.$t("shelf.cancel"),
							click: () => {
								this.hidePopup();
							}
						}
					]
				}).show();
			},
			onTabClick(item) {
				if (!this.isSelected) {
					return;
				}
				switch (item.index) {
					case 1:
						this.showPrivate();
						break;
					case 2:
						this.showDownload();
						break;
					case 3:
						this.dialog().show();
						break;
					case 4:
						this.showRemove();
						break;
					default:
						break;
				}
			},
			label(item) {
				switch (item.index) {
					case 1:
						return this.isPrivate ? item.label2 : item.label;
					case 2:
						return this.isDownload ? item.label2 : item.label;
					default:
						return item.label;
				}
			}
		}
	};
}
</script>
