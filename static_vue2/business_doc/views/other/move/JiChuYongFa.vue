<template>
	<div class="flex move-demo">
		<div class="border1" :style="borderStyle" ref="refBorder1" />
		<div class="gap" v-xmove="moveOptions" />
		<div class="border2" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const refBorder1 = ref();
			const borderStyle = reactive({ width: "500px" });
			return {
				refBorder1,
				borderStyle,
				moveOptions: {
					left: 0,
					width: 0,
					onStart() {
						this.width = refBorder1.value.clientWidth;
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetLeft = movingEvent.clientX - clickEvent.clientX;
						borderStyle.width = `${this.width + offsetLeft}px`;
					}
				}
			};
		}
	});
}
</script>
<style lang="less">
.move-demo {
	.border1 {
		border: 1px solid red;
		height: 500px;
	}
	.gap {
		background-color: black;
		height: 500px;
		width: 10px;

		&:hover {
			cursor: ew-resize;
		}
	}
	.border2 {
		height: 500px;
		width: 100px;
		border: 1px solid green;
	}
}
</style>
