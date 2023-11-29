<template>
	<div class="page-view view-icon">
		<xDevTest>
			<template #first>first</template>
			<template #params="props">params:{{ props.title }}</template>
		</xDevTest>
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {};
		}
	};
}
</script>

<style lang="less"></style>
