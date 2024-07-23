<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div className="container">
			<h1>
				<span>捕获 共享屏幕示例 作为媒体流示例</span>
			</h1>
			<xMd md=">captureStream只能捕获影像，不能捕获声音。" />
			<xBtn @click="canPlay">捕获</xBtn>
			<xGap t />
			<video ref="playerVideo" playsInline autoPlay controls loop muted></video>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		componentName: "RtcCamera",
		inject: ["inject_rtc"],
		components: {},
		data() {
			return {};
		},
		computed: {},
		methods: {
			canPlay() {
				//源视频对象
				let sourceVideo = $("#RtcScreenSharing")[0];
				//播放视频对象
				let playerVideo = this.$refs["playerVideo"];
				//MediaStream对象
				let stream;
				//捕获帧率
				const fps = 0;
				//进行浏览器兼容判断，捕获媒体流
				if (sourceVideo.captureStream) {
					stream = sourceVideo.captureStream(fps);
				} else {
					console.error("captureStream不支持");
					stream = null;
				}
				//将播放器源指定为stream
				playerVideo.srcObject = stream;
			}
		},
		watch: {}
	});
}
</script>
