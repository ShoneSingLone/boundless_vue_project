<template>
	<div>
		<div class="hot-search-title">
			<span class="label">{{ label }}</span>
			<span class="btn">{{ btn }}</span>
		</div>
		<div class="hot-search-list">
			<div class="hot-search-item" v-for="(item, index) in hotSearch" :key="index">
				<div class="icon-wrapper">
					<span class="icon-book icon" v-if="item.type === 1"></span>
					<span class="icon-search icon" v-if="item.type === 2"></span>
				</div>
				<div class="hot-search-text-wrapper">
					<div class="text" ref="searchText">{{ item.text }}</div>
					<div class="num" v-if="item.num">{{ item.num }}人搜索</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { realPx } = await _.$importVue("@/utils/utils");

	return {
		props: {
			label: String,
			btn: String,
			hotSearch: Array
		},
		mounted() {
			this.$refs.searchText.forEach(item => {
				item.style.width = window.innerWidth - realPx(20) - realPx(40) + "px";
			});
		}
	};
}
</script>
