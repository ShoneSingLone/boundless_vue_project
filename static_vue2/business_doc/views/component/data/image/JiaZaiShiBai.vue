<template>
	<div>
		<xMd :md="mdTitle" />
		<div class="demo-image__error flex">
			<div class="block">
				<span class="demonstration">默认</span>
				<xImg />
			</div>
			<div class="block">
				<span class="demonstration">自定义</span>
				<xImg>
					<div slot="error" class="image-slot">
						<i class="el-icon-picture-outline"></i>
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
