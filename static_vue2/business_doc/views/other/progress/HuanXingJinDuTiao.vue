<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xProgress type="circle" :percentage="0"></xProgress>
		<xProgress type="circle" :percentage="25"></xProgress>
		<xProgress type="circle" :percentage="100" status="success"></xProgress>
		<xProgress type="circle" :percentage="70" status="warning"></xProgress>
		<xProgress type="circle" :percentage="50" status="exception"></xProgress>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。",
				percentage: 20,
				customColor: "#409eff",
				customColors: [
					{ color: "#f56c6c", percentage: 20 },
					{ color: "#e6a23c", percentage: 40 },
					{ color: "#5cb87a", percentage: 60 },
					{ color: "#1989fa", percentage: 80 },
					{ color: "#6f7ad3", percentage: 100 }
				]
			};
		},
		methods: {
			customColorMethod(percentage) {
				if (percentage < 30) {
					return "#909399";
				} else if (percentage < 70) {
					return "#e6a23c";
				} else {
					return "#67c23a";
				}
			},
			increase() {
				this.percentage += 10;
				if (this.percentage > 100) {
					this.percentage = 100;
				}
			},
			decrease() {
				this.percentage -= 10;
				if (this.percentage < 0) {
					this.percentage = 0;
				}
			}
		}
	});
}
</script>
