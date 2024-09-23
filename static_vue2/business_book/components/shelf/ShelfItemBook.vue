<template>
	<div class="shelf-item-book">
		<img class="shelf-item-book-cover" :src="data.cover" />
		<div class="private-wrapper" v-show="data.private"></div>
		<div class="private-icon-wrapper" v-show="data.private">
			<span class="icon-private"></span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: {
			data: Object
		}
	};
}
</script>
