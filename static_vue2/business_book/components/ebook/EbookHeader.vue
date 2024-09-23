<template>
	<div class="ebook-header">
		<span class="ebook-header-text">{{ getSectionName }}</span>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");

	return { mixins: [ebookMixin] };
}
</script>
