<template>
	<div class="">
		<xMd :md="mdTitle" />
		<xRow :gutter="20">
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6" :offset="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow :gutter="20">
			<xCol :span="6" :offset="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6" :offset="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow :gutter="20">
			<xCol :span="12" :offset="6"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"支持偏移指定的栏数。\n\n通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。"
			};
		}
	});
}
</script>
<style lang="less"></style>
