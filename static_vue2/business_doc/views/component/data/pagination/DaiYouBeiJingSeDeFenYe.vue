<template>
	<div class="flex vertical mr">
		<xMd :md="'设置`background`属性可以为分页按钮添加背景色。'" />
		<xPagination background layout="prev, pager, next" :total="1000"> </xPagination>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
