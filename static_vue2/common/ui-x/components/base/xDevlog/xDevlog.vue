<style lang="less">
.x-devlog {
	position: fixed;
	background-color: #607d8b38;
	width: 300px;
	max-height: 300px;
	border: 1px solid var(--el-border-color-lighter);
}
</style>
<template>
	<div v-if="isShow" class="x-devlog flex vertical" ref="refBorder1" :style="borderStyle">
		<div class="flex middle ml">
			<div v-xmove="moveOptions" class="all-scroll">{{ label }}</div>
			<xGap f />
			<xIcon icon="close" class="mt8 mr8 pointer" @click="onClose" />
		</div>
		<div class="x-padding flex1 overflow-auto">{{ info }}</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

	return defineComponent({
		props: ["label", "info"],
		setup() {
			const refBorder1 = ref();
			const borderStyle = reactive({
				left: "0",
				top: "0",
				zIndex: PopupManager.nextZIndex()
			});

			return {
				refBorder1,
				borderStyle,
				moveOptions: {
					left: 0,
					top: 0,
					onStart() {
						this.top = Number(borderStyle.top.replace("px", ""));
						this.left = Number(borderStyle.left.replace("px", ""));
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetTop = movingEvent.clientY - clickEvent.clientY;
						const offsetLeft = movingEvent.clientX - clickEvent.clientX;
						borderStyle.top = `${this.top + offsetTop}px`;
						borderStyle.left = `${this.left + offsetLeft}px`;
					}
				},
				onClose() {
					borderStyle.top = `0`;
					borderStyle.left = `0`;
				}
			};
		},
		data() {
			return {
				isShow: localStorage.isShowDevlog || false
			};
		}
	});
}
</script>
