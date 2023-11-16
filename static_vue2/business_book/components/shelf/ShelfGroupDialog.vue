<template>
	<ebook-dialog :title="title" ref="dialog">
		<div class="dialog-list-wrapper" v-if="!ifNewGroup">
			<div class="dialog-list-item" :class="{ 'is-add': item.edit ? item.edit === 1 : false }" v-for="(item, index) in categoryList" :key="index" @click="onGroupClick(item)">
				<div class="dialog-list-item-text">{{ item.title }}</div>
				<div class="dialog-list-icon-wrapper" v-if="isInGroup && shelfCategory.id === item.id">
					<span class="icon-check"></span>
				</div>
			</div>
		</div>
		<div class="dialog-new-group-wrapper" v-else>
			<div class="dialog-input-title-wrapper">
				<span class="dialog-input-title">{{ $t("shelf.groupName") }}</span>
			</div>
			<div class="dialog-input-wrapper">
				<div class="dialog-input-inner-wrapper">
					<input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput" />
					<div class="dialog-input-clear-wrapper" @click="clear" v-show="newGroupName.length > 0">
						<span class="icon-close-circle-fill"></span>
					</div>
				</div>
			</div>
		</div>
		<div slot="btn" class="group-dialog-btn-wrapper">
			<div class="dialog-btn" @click="hide">{{ $t("shelf.cancel") }}</div>
			<div class="dialog-btn" @click="createNewGroup" :class="{ 'is-empty': newGroupName.length === 0 }" v-if="ifNewGroup">
				{{ $t("shelf.confirm") }}
			</div>
		</div>
	</ebook-dialog>
</template>

<script>
export default async function () {
	const EbookDialog = await _.$importVue("@/common/Dialog.vue");
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	const { removeAddFromShelf, appendAddToShelf } = await _.$importVue("@/utils/store.vue");
	const { saveBookShelf } = await _.$importVue("@/utils/localStorage.vue");

	return {
		name: "group-dialog",
		mixins: [storeShelfMixin],
		components: {
			EbookDialog
		},
		props: {
			showNewGroup: {
				type: Boolean,
				default: false
			},
			groupName: String
		},
		computed: {
			isInGroup() {
				return this.currentType === 2;
			},
			defaultCategory() {
				return [
					{
						title: this.$t("shelf.newGroup"),
						edit: 1
					},
					{
						title: this.$t("shelf.groupOut"),
						edit: 2
					}
				];
			},
			category() {
				return this.shelfList.filter(item => item.type === 2);
			},
			categoryList() {
				return [...this.defaultCategory, ...this.category].filter(item => {
					return (item.edit === 2 && this.isInGroup) || item.edit !== 2 || !item.edit;
				});
			},
			title() {
				return !this.ifNewGroup ? this.$t("shelf.moveBook") : this.$t("shelf.newGroup");
			}
		},
		data() {
			return {
				ifNewGroup: false,
				newGroupName: ""
			};
		},
		methods: {
			show() {
				this.ifNewGroup = this.showNewGroup;
				if (this.groupName) {
					this.newGroupName = this.groupName;
				}

				this.$refs.dialog.show();
			},
			hide() {
				this.$refs.dialog.hide();
				setTimeout(() => {
					this.ifNewGroup = false;
				}, 200);
			},
			onGroupClick(item) {
				if (item.edit && item.edit === 1) {
					this.ifNewGroup = true;
				} else if (item.edit && item.edit === 2) {
					this.moveOutFromGroup(item);
				} else {
					this.moveToGroup(item);
				}
			},
			clear() {
				this.newGroupName = "";
			},
			moveToGroup(group) {
				this.setShelfList(
					this.shelfList.filter(book => {
						if (book.itemList) {
							book.itemList = book.itemList.filter(subBook => this.shelfSelected.indexOf(subBook) < 0);
						}
						return this.shelfSelected.indexOf(book) < 0;
					})
				).then(() => {
					if (group && group.itemList) {
						group.itemList = [...group.itemList, ...this.shelfSelected];
					}
					group.itemList.forEach((item, index) => {
						item.id = index + 1;
					});
					this.simpleToast(this.$t("shelf.moveBookInSuccess").replace("$1", group.title));
					this.onComplete();
				});
			},
			moveOutFromGroup() {
				this.moveOutOfGroup(this.onComplete);
			},
			createNewGroup() {
				if (!this.newGroupName && this.newGroupName.length === 0) {
					return;
				}
				if (this.showNewGroup) {
					this.shelfCategory.title = this.newGroupName;
					this.onComplete();
				} else {
					const group = {
						id: this.shelfList[this.shelfList.length - 2].id + 1,
						itemList: [],
						selected: false,
						title: this.newGroupName,
						type: 2
					};
					let list = removeAddFromShelf(this.shelfList);
					list.push(group);
					list = appendAddToShelf(list);
					this.setShelfList(list).then(() => {
						this.moveToGroup(group);
					});
				}
			},
			onComplete() {
				saveBookShelf(this.shelfList);
				this.hide();
				this.setIsEditMode(false);
			}
		}
	};
}
</script>
