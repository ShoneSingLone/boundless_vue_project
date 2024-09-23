<template>
	<div class="">
		<xMd :md="mdTitle" />
		<xRow :gutter="10">
			<xCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
				><div class="grid-content bg-purple"></div
			></xCol>
			<xCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
				><div class="grid-content bg-purple-light"></div
			></xCol>
			<xCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
				><div class="grid-content bg-purple"></div
			></xCol>
			<xCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
				><div class="grid-content bg-purple-light"></div
			></xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。\n\n"
			};
		}
	});
}
</script>
<style lang="less"></style>
