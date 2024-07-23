<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>录制屏幕示例</span>
			</h1>
			<video class="video" ref="myVideo" autoPlay playsInline></video>
			<xBtn @click="startCaptureScreen" :disabled="status === 'recording'"> 开始 </xBtn>
			<xBtn @click="stopRecord" :disabled="status === 'stop'">停止</xBtn>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		componentName: "RtcCamera",
		inject: ["inject_rtc"],
		components: {},
		mounted() {},
		data() {
			return {
				status: "stop"
			};
		},
		computed: {},
		methods: {
			//开始捕获桌面
			async startCaptureScreen() {
				try {
					//调用getDisplayMedia()方法，将约束设置成{video:true}即可
					this.stream = await navigator.mediaDevices.getDisplayMedia({
						//设置屏幕分辨率
						video: {
							width: 2880,
							height: 1800
						}
					});
					const video = this.$refs["myVideo"];
					//获取视频轨道
					const videoTracks = this.stream.getVideoTracks();
					//读取视频资源名称
					console.log(`视频资源名称: ${videoTracks[0].label}`);
					this.stream = this.stream;
					//将视频对象的源指定为stream
					video.srcObject = this.stream;
					this.startRecord();
				} catch (e) {
					console.log("getUserMedia错误:" + e);
				}
			},
			//开始录制
			startRecord() {
				//监听流是否处于不活动状态，用于判断用户是否停止捕获屏幕
				this.stream.addEventListener("inactive", e => {
					console.log("监听到屏幕捕获停止后停止录制!");
					this.stopRecord(e);
				});
				//录制数据
				this.recordedBlobs = [];
				try {
					//创建MediaRecorder对象，准备录制
					this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: "video/webm" });
				} catch (e) {
					console.error("创建MediaRecorder错误:", e);
					return;
				}
				//录制停止事件监听
				this.mediaRecorder.onstop = event => {
					console.log("录制停止: ", event);
					console.log("录制的Blobs数据为: ", this.recordedBlobs);
				};
				//录制数据回调事件
				this.mediaRecorder.ondataavailable = event => {
					console.log("handleDataAvailable", event);
					//判断是否有数据
					if (event.data && event.data.size > 0) {
						//记录数据
						this.recordedBlobs.push(event.data);
					}
				};
				//开始录制并指定录制时间为10秒
				this.mediaRecorder.start(10);
				console.log("MediaRecorder started", this.mediaRecorder);
				this.status = "recording";
			},
			stopRecord() {
				//停止录制
				this.mediaRecorder.stop();
				//停掉所有轨道
				this.stream.getTracks().forEach(track => track.stop());
				//将stream设置为空
				this.stream = null;
				//生成Blob文件，类型为video/webm
				const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
				//创建一个下载链接
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				//指定下载文件及类型
				a.download = "screen.webm";
				//将a标签添加至网页
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					//释放url对象
					window.URL.revokeObjectURL(url);
				}, 100);
				this.status = "stop";
			}
		},
		watch: {}
	});
}
</script>
