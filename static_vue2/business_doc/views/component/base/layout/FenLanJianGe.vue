<template>
	<div class="">
		<xMd :md="mdTitle" />
		<xRow :gutter="20">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
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
					"分栏之间存在间隔。\n\nRow 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。"
			};
		}
	});
}
</script>
<style lang="less"></style>
