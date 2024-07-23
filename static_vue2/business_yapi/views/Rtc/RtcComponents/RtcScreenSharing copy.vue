<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>截取视频示例</span>
			</h1>
			<div>
				<video class="small-video" ref="video" playsInline autoPlay></video>
				{/* 画布Canvas */}
				<canvas class="small-canvas" ref="canvas"></canvas>
			</div>
			<Button class="button" @click="takeSnap"> 截屏 </Button>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { useGetMediaHander } = await _.$importVue("@/views/Rtc/reuse/reuseRtc.vue");

	return defineComponent({
		componentName: "RtcScreenSharing",
		inject: ["inject_rtc"],
		components: {},
		data() {
			return {};
		},
		computed: {},
		mounted() {
			//获取video对象
			//根据约束获取视频流
			navigator.mediaDevices
				.getUserMedia(this.inject_rtc.constraints)
				.then(this.handleSuccess)
				.catch(this.handleError);
		},
		setup() {
			useGetMediaHander(this);
		},
		methods: {
			//获取视频成功
			handleSuccess(stream) {
				//将视频源指定为视频流
				this.$refs.video.srcObject = stream;
			},
			//截屏处理
			async takeSnap(e) {
				//获取画布对象
				let canvas = this.refs["canvas"];
				//设置画面宽度
				canvas.width = this.$refs.video.videoWidth;
				//设置画面高度
				canvas.height = this.$refs.video.videoHeight;
				//根据视频对象、xy坐标、画布宽、画布高绘图
				canvas
					.getContext("2d")
					.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
			},
			//错误处理
			handleError(error) {
				console.log(
					"navigator.MediaDevices.getUserMedia error: ",
					error.message,
					error.name
				);
			}
		}
	});
}
</script>
