<template>
	<transition name="fade">
		<div class="shelf-title" :class="{ 'hide-shadow': ifHideShadown }" v-show="shelfTitleVisible">
			<div class="shelf-title-text-wrapper">
				<span class="shelf-title-text">{{ title }}</span>
				<span class="shelf-title-sub-text" v-show="isEditMode">{{ selectedText }}</span>
			</div>
			<div class="shelf-title-btn-wrapper shelf-title-left" v-if="showClear">
				<span class="shelf-title-btn-text" @click="clearCache">{{ $t("shelf.clearCache") }}</span>
			</div>
			<div class="shelf-title-btn-wrapper shelf-title-right" v-if="showEdit">
				<span class="shelf-title-btn-text" @click="onEditClick">{{ isEditMode ? $t("shelf.cancel") : $t("shelf.edit") }}</span>
			</div>
			<div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
				<span class="icon-back" @click="back"></span>
			</div>
			<div
				class="shelf-title-btn-wrapper"
				:class="{
					'shelf-title-left': changeGroupLeft,
					'shelf-title-right': changeGroupRight
				}"
				@click="changeGroup"
				v-if="showChangeGroup">
				<span class="shelf-title-btn-text">{{ $t("shelf.editGroup") }}</span>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	const { clearLocalStorage, saveBookShelf } = await _.$importVue("@/utils/localStorage.vue");
	const { clearLocalForage } = await _.$importVue("@/utils/localForage.vue");

	return {
		mixins: [storeShelfMixin],
		props: {
			title: String
		},
		data() {
			return {
				ifHideShadown: true
			};
		},
		watch: {
			offsetY(offsetY) {
				if (offsetY > 0) {
					this.ifHideShadown = false;
				} else {
					this.ifHideShadown = true;
				}
			}
		},
		computed: {
			emptyCategory() {
				return !this.shelfCategory || !this.shelfCategory.itemList || this.shelfCategory.itemList.length === 0;
			},
			showEdit() {
				return this.currentType === 1 || !this.emptyCategory;
			},
			showClear() {
				return this.currentType === 1;
			},
			showBack() {
				return this.currentType === 2 && !this.isEditMode;
			},
			showChangeGroup() {
				return this.currentType === 2 && (this.isEditMode || this.emptyCategory);
			},
			changeGroupLeft() {
				return !this.emptyCategory;
			},
			changeGroupRight() {
				return this.emptyCategory;
			},
			selectedText() {
				const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0;

				return selectedNumber <= 0
					? this.$t("shelf.selectBook")
					: selectedNumber === 1
						? this.$t("shelf.haveSelectedBook").replace("$1", selectedNumber)
						: this.$t("shelf.haveSelectedBooks").replace("$1", selectedNumber);
			},
			popupCancelBtn() {
				return this.createPopupBtn(this.$t("shelf.cancel"), () => {
					this.hidePopup();
				});
			}
		},
		methods: {
			onComplete() {
				this.hidePopup();
				this.setShelfList(this.shelfList.filter(book => book.id !== this.shelfCategory.id)).then(() => {
					saveBookShelf(this.shelfList);
					this.$router.go(-1);
					this.setIsEditMode(false);
				});
			},
			deleteGroup() {
				if (!this.emptyCategory) {
					this.setShelfSelected(this.shelfCategory.itemList);
					this.moveOutOfGroup(this.onComplete);
				} else {
					this.onComplete();
				}
			},
			changeGroupName() {
				this.hidePopup();
				this.dialog({
					showNewGroup: true,
					groupName: this.shelfCategory.title
				}).show();
			},
			hidePopup() {
				this.popupMenu.hide();
			},
			createPopupBtn(text, onClick, type = "normal") {
				return {
					text: text,
					type: type,
					click: onClick
				};
			},
			showDeleteGroup() {
				this.hidePopup();
				setTimeout(() => {
					this.popupMenu = this.popup({
						title: this.$t("shelf.deleteGroupTitle"),
						btn: [
							this.createPopupBtn(
								this.$t("shelf.confirm"),
								() => {
									this.deleteGroup();
								},
								"danger"
							),
							this.popupCancelBtn
						]
					}).show();
				}, 200);
			},
			changeGroup() {
				this.popupMenu = this.popup({
					btn: [
						this.createPopupBtn(this.$t("shelf.editGroupName"), () => {
							this.changeGroupName();
						}),
						this.createPopupBtn(
							this.$t("shelf.deleteGroup"),
							() => {
								this.showDeleteGroup();
							},
							"danger"
						),
						this.popupCancelBtn
					]
				}).show();
			},
			back() {
				this.$router.go(-1);
				this.setIsEditMode(false);
			},
			onEditClick() {
				if (!this.isEditMode) {
					this.setShelfSelected([]);
					this.shelfList.forEach(item => {
						item.selected = false;
						if (item.itemList) {
							item.itemList.forEach(subItem => {
								subItem.selected = false;
							});
						}
					});
				}
				this.setIsEditMode(!this.isEditMode);
			},
			clearCache() {
				clearLocalStorage();
				clearLocalForage();
				this.setShelfList([]);
				this.setShelfSelected([]);
				this.getShelfList();
				this.simpleToast(this.$t("shelf.clearCacheSuccess"));
			}
		}
	};
}
</script>
