<template>
	<div class="">
		<xMd :md="mdTitle" />
		<xRow type="flex" class="row-bg">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow type="flex" class="row-bg" justify="center">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow type="flex" class="row-bg" justify="end">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow type="flex" class="row-bg" justify="space-between">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow type="flex" class="row-bg" justify="space-around">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"通过 `flex` 布局来对分栏进行灵活的对齐。\n\n将 `type` 属性赋值为 'flex'，可以启用 flex 布局，并可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。"
			};
		}
	});
}
</script>
<style lang="less"></style>
