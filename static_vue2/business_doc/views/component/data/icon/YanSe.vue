<template>
	<div>
		<xMd :md="md" />
		<!-- <div class="flex" style="background-color: beige">
			<div v-for="(color, index) in colorArray" :key="index" :style="{ color: index === count ? color : '', margin: '10px' }">{{ color }}</div>
		</div> -->
		<div class="flex vertical">
			<xMd :md="md2" />
			<xIcon icon="icon_loading" class="empty" :style="{ color: color1 }" />
			<xMd :md="md3" />
			<div :style="{ color: color2 }">
				<div>
					<div>
						<xIcon icon="icon_loading" class="empty" />
					</div>
				</div>
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
`,
				colorArray,
				count: 0,
				color1: "red",
				color2: "yellow"
			};
		},
		computed: {
			md2() {
				return `- 用\`color\`属性\`style="color:red;"\`
- 直接加在元素\`xIcon\`上
\`\`\`html
<xIcon icon="icon_loading" class="empty" style="color:${this.color1}" />
\`\`\`
`;
			},
			md3() {
				return `- 加在\`xIcon\`的parents上，作用范围与字体颜色一致。
\`\`\`html
<div style="color:${this.color2}"">
		<div>
			<div>
				<xIcon icon="icon_loading" class="empty" />
			</div>
		</div>
	</div>
\`\`\`
`;
			}
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
