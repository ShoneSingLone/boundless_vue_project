<template>
	<div class="shelf-list" :style="{ top: shelfListTop }">
		<transition-group name="list" tag="div" id="shelf-list">
			<div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
				<shelf-item :data="item" :style="{ height: itemHeight }"></shelf-item>
				<div class="shelf-list-title-wrapper">
					<div class="shelf-list-title title-small">{{ item.title }}</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { storeShelfMixin } = await _.$importVue("@/utils/mixin.vue");
	const ShelfItem = await _.$importVue("@/components/shelf/ShelfItem.vue");
	const { realPx, px2rem } = await _.$importVue("@/utils/utils.vue");
	return {
		mixins: [storeShelfMixin],
		props: {
			top: {
				type: Number,
				default: 94
			},
			data: Array
		},
		components: {
			ShelfItem
		},
		computed: {
			shelfListTop() {
				return px2rem(this.top) + "rem";
			},
			itemHeight() {
				return ((window.innerWidth - realPx(120)) / 3 / 250) * 350 + "px";
			}
		}
	};
}
</script>
