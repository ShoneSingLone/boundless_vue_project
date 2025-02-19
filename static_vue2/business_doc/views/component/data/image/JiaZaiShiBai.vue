<template>
	<div>
		<xMd :md="mdTitle" />
		<div class="flex middle">
			<div class="">
				<span class="demonstration">默认</span>
				<xImg class="demo-image__error" />
			</div>
			<xGap l />
			<div class="">
				<span class="demonstration">自定义</span>
				<xImg class="demo-image__error">
					<div slot="error" class="image-slot">
						<xIcon icon="picture-filled" style="height: 30px; width: 30px" />
					</div>
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
				mdTitle: "可通过`slot = error`可自定义加载失败内容"
			};
		}
	});
}
</script>
<style lang="less"></style>
