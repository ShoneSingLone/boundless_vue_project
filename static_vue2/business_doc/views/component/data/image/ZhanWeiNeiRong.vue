<template>
	<div>
		<xMd :md="mdTitle" />
		<div class="demo-image__placeholder flex">
			<div class="block">
				<span class="demonstration">默认</span>
				<xImg :src="src"/>
			</div>
			<div class="block">
				<span class="demonstration">自定义</span>
				<xImg :src="src">
					<div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
				</xImg>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "可通过`slot = placeholder`可自定义占位内容",
				src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
			};
		}
	});
}
</script>
<style lang="less"></style>
