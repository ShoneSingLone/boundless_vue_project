<style lang="less"></style>
<template>
	<div :key="id" :style="style">
		<video ref="id" :id="id" autoPlay playsInline />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		componentName: "RtcCamera",
		props: ["id", "stream"],
		inject: ["inject_rtc"],
		components: {},
		setup() {
			/**
			 * 远端视频组件
			 */
			class RemoteVideoView {
				//组件加载完成
			}
		},
		mounted() {
			//获取到视频对象
			let video = this.$refs["id"];
			//指定视频的源为stream
			video.srcObject = this.stream;
			//当获取到MetaData数据后开始播放
			video.onloadedmetadata = e => {
				video.play();
			};
		},
		data() {
			return {};
		},
		computed: {
			style() {
				return {
					//绝对定位
					position: "absolute",
					//上下左右为0px表示撑满整个容器
					left: "0px",
					right: "0px",
					top: "0px",
					bottom: "0px",
					//背景色
					backgroundColor: "#323232",
					//远端大视频放在底部
					zIndex: 0
				};
			}
		},
		methods: {},
		watch: {}
	});
}
</script>
