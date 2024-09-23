<template>
	<div class="">
		<xMd :md="mdTitle" />
		<xRow>
			<xCol :span="24"><div class="grid-content bg-purple-dark"></div></xCol>
		</xRow>
		<xRow>
			<xCol :span="12"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="12"><div class="grid-content bg-purple-light"></div></xCol>
		</xRow>
		<xRow>
			<xCol :span="8"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="8"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="8"><div class="grid-content bg-purple"></div></xCol>
		</xRow>
		<xRow>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="6"><div class="grid-content bg-purple-light"></div></xCol>
		</xRow>
		<xRow>
			<xCol :span="4"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="4"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="4"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="4"><div class="grid-content bg-purple-light"></div></xCol>
			<xCol :span="4"><div class="grid-content bg-purple"></div></xCol>
			<xCol :span="4"><div class="grid-content bg-purple-light"></div></xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"通过 row 和 col 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。"
			};
		}
	});
}
</script>
<style lang="less"></style>
