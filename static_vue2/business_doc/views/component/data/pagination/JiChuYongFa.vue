<template>
	<div class="flex vertical mr">
		<xMd
			:md="'设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。\n\n`prev`表示上一页，`next`为下一页，`pager`表示页码列表。\n\n除此以外还提供了`jumper`和`total`，`sizes`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`sizes`用于设置每页显示的页码数量。'" />
		<div class="block mt">
			<xMd md="### 页数较少时的效果" />
			<xPagination layout="prev, pager, next" :total="50"> </xPagination>
		</div>
		<div class="block">
			<xMd md="### 大于 7 页时的效果" />
			<xPagination layout="prev, pager, next" :total="1000"> </xPagination>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
