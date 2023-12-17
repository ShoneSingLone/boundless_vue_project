<template>
	<div class="page-view view-icon">
		<xDev>
			<template #first>first</template>
			<template #params="props">params:{{ props.title }}</template>
		</xDev>
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
