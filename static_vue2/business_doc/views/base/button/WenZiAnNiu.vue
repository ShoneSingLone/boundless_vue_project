<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xBtn preset="text">文字按钮</xBtn>
		<xBtn preset="text" disabled>文字按钮</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "没有边框和背景色的按钮。"
			};
		}
	});
}
</script>
<style lang="less"></style>
