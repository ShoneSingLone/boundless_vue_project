<template>
	<div class="ebook-footer">
		<!-- <span class="ebook-footer-text">{{ this.progress + "%" }}</span> -->
		<span class="ebook-footer-text">{{ this.paginate }}</span>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");

	return { mixins: [ebookMixin] };
}
</script>
