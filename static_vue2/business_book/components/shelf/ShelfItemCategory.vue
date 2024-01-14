<template>
	<div class="shelf-item-category">
		<div class="shelf-item-category-list" v-if="data.itemList.length > 0">
			<div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
				<img :src="item.cover" alt="cover" class="shelf-item-category-img" />
			</div>
		</div>
		<div class="shelf-item-category-bg" v-else>
			<span class="icon-book2"></span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "ShelfItemCategory",
		props: {
			data: Object
		}
	};
}
</script>
