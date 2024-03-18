<template>
	<div class="flex vertical mr">
		<xMd :md="'在空间有限的情况下，可以使用简单的小型分页。\n\n只需要一个`small`属性，它接受一个`Boolean`，默认为`false`，设为`true`即可启用。'" />
		<xPagination small layout="prev, pager, next" :total="50"> </xPagination>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
