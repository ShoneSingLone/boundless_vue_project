<template>
	<div>
		<xMd :md="mdTitle" />
		<div class="demo-image">
			<div class="block" v-for="fit in fits" :key="fit">
				<span class="demonstration">{{ fit }}</span>
				<xImg style="width: 100px; height: 100px" :src="url" :fit="fit" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。",
				fits: ["fill", "contain", "cover", "none", "scale-down"],
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
			};
		}
	});
}
</script>
<style lang="less"></style>
