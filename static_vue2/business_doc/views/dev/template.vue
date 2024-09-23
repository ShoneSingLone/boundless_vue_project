<template>
	<div class="x-page-view view-icon">
		<xDev>
			<template #first>first</template>
			<template #params="props">params:{{ props.title }}</template>
		</xDev>
		<xExcalidraw />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {};
		}
	};
}
</script>

<style lang="less"></style>
