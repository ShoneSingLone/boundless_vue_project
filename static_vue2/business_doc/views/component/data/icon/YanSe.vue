<template>
	<div>
		<xMd :md="md" />
		<div class="flex vertical">
			<div>{{ count }}</div>
			<xIcon icon="icon_loading" class="empty" :style="{ color: color1 }" />
			<div class="flex" style="background-color: beige">
				<div v-for="(color, index) in colorArray" :key="index" :style="{ color: index === count ? color : '', margin: '10px' }">{{ color }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const colorArray = ["red", "yellow", "blue", "green", "pink"];
	return defineComponent({
		data() {
			return {
				md: `
- 首先保证.svg文件里面的\`fill: currentColor;\`

\`\`\`html
<svg style="fill: currentColor;..." viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ...
</svg>
\`\`\`
- 用\`style\`的\`color\`属性\`style="color:red;"\`
\`\`\`html
<xIcon icon="icon_loading" class="empty" :style="{ color: color1 }" />
\`\`\`
`,
				colorArray,
				count: 0,
				color1: "red",
				color2: "yellow"
			};
		},
		setup() {
			let timmer;
			onMounted(() => {
				timmer = setInterval(() => {
					const count = ++this.count % colorArray.length;
					this.color1 = colorArray[count];
					this.color2 = colorArray[(1 + count) % colorArray.length];
					this.count = count;
				}, 1000);
			});
			onBeforeUnmount(() => {
				clearInterval(timmer);
			});
		}
	});
}
</script>
<style lang="less"></style>
