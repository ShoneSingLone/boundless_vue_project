<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>摄像头示例</span>
			</h1>
			<div class="width100">
				<video class="video" ref="myVideo" autoPlay playsInline controls></video>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { useGetMediaHander } = await _.$importVue("@/views/Rtc/reuse/reuseRtc.vue");
	return defineComponent({
		componentName: "RtcCamera",
		inject: ["inject_rtc"],
		components: {},
		data() {
			return {};
		},
		computed: {},
		setup() {
			useGetMediaHander(this);
		},
		methods: {
			handleSuccess(stream) {
				const video = this.$refs["myVideo"];
				const videoTracks = stream.getVideoTracks();
				console.log("通过设置限制条件获取到流:", this.inject_rtc.constraints);
				console.log(`使用的视频设备: ${videoTracks[0].label}`);
				//使得浏览器能访问到stream
				video.srcObject = stream;
			},
			handleError(error) {
				if (error.name === "ConstraintNotSatisfiedError") {
					const v = this.inject_rtc.constraints.video;
					//宽高尺寸错误
					_.$msgError(`宽:${v.width.exact} 高:${v.height.exact} 设备不支持`);
				} else if (error.name === "PermissionDeniedError") {
					_.$msgError("没有摄像头和麦克风使用权限，请点击允许按钮");
				}
				_.$msgError(`getUserMedia错误: ${error.name}`, error);
			}
		},
		watch: {}
	});
}
</script>
