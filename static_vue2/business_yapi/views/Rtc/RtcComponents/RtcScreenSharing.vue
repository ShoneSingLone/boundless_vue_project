<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>共享屏幕示例</span>
			</h1>
			<div class="width100">
				<video
					id="RtcScreenSharing"
					class="video"
					ref="myVideo"
					autoPlay
					playsInline
					controls
					style="max-height: 500px; max-width: 500px; margin: auto"></video>
			</div>
			<xBtn @click="startScreenShare">开始共享</xBtn>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	/**
	 * 共享屏幕示例
	 */
	return defineComponent({
		componentName: "RtcScreenSharing",
		inject: ["inject_rtc"],
		components: {},
		data() {
			return {};
		},
		computed: {},
		methods: {
			//开始捕获桌面
			async startScreenShare(e) {
				try {
					//调用getDisplayMedia()方法，约束设置成{video:true}即可
					const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
					console.log("handleSuccess:");
					this.handleSuccess(stream);
				} catch (e) {
					this.handleError(e);
				}
			},
			//成功捕获，返回视频流
			handleSuccess(stream) {
				const video = this.$refs["myVideo"];
				//获取视频轨道
				const videoTracks = stream.getVideoTracks();
				//读取视频资源名称
				console.log(`视频资源名称: ${videoTracks[0].label}`);
				//将视频对象的源指定为stream
				video.srcObject = stream;
			},
			//错误处理
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
		}
	});
}
</script>
