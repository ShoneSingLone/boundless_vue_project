<template>
	<div class="card-JianDanKaPian">
		<xMd :md="md" />
		<xRow class="demo-avatar demo-basic">
			<xCol :span="12">
				<div class="sub-title">circle</div>
				<div class="flex middle">
					<div class="avatar-block"><xAvatar :size="50" :src="circleUrl"></xAvatar></div>
					<div class="avatar-block" v-for="size in sizeList" :key="size">
						<xAvatar :size="size" :src="circleUrl"></xAvatar>
					</div>
				</div>
			</xCol>
			<xCol :span="12">
				<div class="sub-title">square</div>
				<div class="flex middle">
					<div class="avatar-block">
						<xAvatar shape="square" :size="50" :src="squareUrl"></xAvatar>
					</div>
					<div class="avatar-block" v-for="size in sizeList" :key="size">
						<xAvatar shape="square" :size="size" :src="squareUrl"></xAvatar>
					</div>
				</div>
			</xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过 `shape` 和 `size` 设置头像的形状和大小。",
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
				sizeList: ["large", "medium", "small"]
			};
		}
	});
}
</script>
<style lang="less"></style>
