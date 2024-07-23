<template>
	<div class="card-JianDanKaPian">
		<xMd :md="md" />
		<div class="flex">
			<div class="avatar-block mr flex middle" v-for="fit in fits" :key="fit">
				<span class="title mr">{{ fit }}</span>
				<xAvatar shape="square" :size="100" :fit="fit" :src="url"></xAvatar>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。",
				fits: ["fill", "contain", "cover", "none", "scale-down"],
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
			};
		}
	});
}
</script>
<style lang="less"></style>
