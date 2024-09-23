<template>
	<div class="card-JianDanKaPian">
		<xMd :md="md" />
		<xAvatar :size="60" src="https://empty" @error="errorHandler">
			<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
		</xAvatar>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "当展示类型为图片的时候，图片加载失败的 fallback 行为"
			};
		},
		methods: {
			errorHandler() {
				return true;
			}
		}
	});
}
</script>
<style lang="less"></style>
