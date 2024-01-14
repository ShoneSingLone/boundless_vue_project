<template>
	<div class="shelf-item" :class="{ 'shelf-item-shadow': data.type === 1 || data.type === 2 }" @click="onItemClick">
		<component :is="oneOfComponent" :data="data" class="shelf-item-comp" :class="{ 'is-edit': isEditMode && data.type == 2 }"></component>
		<div class="icon-selected" :class="{ 'is-selected': data.selected }" v-show="isEditMode && data.type === 1"></div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	const { gotoStoreHome } = await _.$importVue("@/utils/store.vue");

	return {
		components: {
			ShelfBook: () => _.$importVue("@/components/shelf/ShelfItemBook.vue"),
			ShelfCategory: () => _.$importVue("@/components/shelf/ShelfItemCategory.vue"),
			ShelfAdd: () => _.$importVue("@/components/shelf/ShelfItemAdd.vue")
		},
		mixins: [storeShelfMixin],
		props: {
			data: Object
		},
		data() {
			return {};
		},
		computed: {
			oneOfComponent() {
				let component = null;
				switch (this.data.type) {
					case 1:
						component = "ShelfBook";
						break;
					case 2:
						component = "ShelfCategory";
						break;
					default:
						component = "ShelfAdd";
						break;
				}
				return component;
			}
		},
		methods: {
			onItemClick() {
				if (this.isEditMode) {
					this.data.selected = !this.data.selected;
					if (this.data.selected && this.shelfSelected.indexOf(this.data) === -1 && this.data.type === 1) {
						this.shelfSelected.push(this.data);
					} else if (!this.data.selected) {
						this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id));
					}
				} else {
					if (this.data.type === 1) {
						this.showBookDetail(this.data);
					} else if (this.data.type === 2) {
						this.$router.push({
							path: "/store/category",
							query: {
								title: this.data.title
							}
						});
					} else {
						gotoStoreHome(this);
					}
				}
			}
		}
	};
}
</script>
