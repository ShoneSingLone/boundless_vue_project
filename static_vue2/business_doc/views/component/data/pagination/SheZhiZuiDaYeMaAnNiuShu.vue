<template>
	<div class="flex vertical mr">
		<xMd :md="'默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过`pager-count`属性可以设置最大页码按钮数。'" />
		<xPagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"> </xPagination>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
