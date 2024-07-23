<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>录制视频示例</span>
			</h1>
			<video class="small-video" ref="videoPreview" playsInline autoPlay muted></video>
			<video class="small-video" ref="videoPlayer" playsInline loop></video>
			<div>
				<xBtn class="button" @click="startClickHandler" :disabled="status != 'start'">
					capture 共享屏幕示例
				</xBtn>
				<xBtn
					class="button"
					:disabled="status != 'startRecord'"
					@click="startRecordButtonClickHandler">
					开始录制
				</xBtn>
				<xBtn
					class="button"
					:disabled="status != 'stopRecord'"
					@click="stopRecordButtonClickHandler">
					停止录制
				</xBtn>
				<xBtn class="button" :disabled="status != 'play'" @click="playButtonClickHandler">
					播放
				</xBtn>
				<xBtn
					class="button"
					:disabled="status != 'download'"
					@click="downloadButtonClickHandler">
					下载
				</xBtn>
			</div>
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
			return {
				status: "start"
			};
		},
		computed: {},
		mounted() {
			//视频预览对象
			this.videoPreview = this.$refs["videoPreview"];
			//视频回放对象
			this.videoPlayer = this.$refs["videoPlayer"];
		},
		methods: {
			//打开摄像头并预览视频
			async startClickHandler(e) {
				//约束条件
				let constraints = {
					//开启音频
					audio: true,
					//设置视频分辨率为1280*720
					video: {
						width: 1280,
						height: 720
					}
				};
				console.log("约束条件为:", constraints);
				try {
					//获取音视频流
					//源视频对象
					let sourceVideo = $("#RtcScreenSharing")[0];
					//MediaStream对象
					let stream;
					//捕获帧率
					const fps = 128;
					//进行浏览器兼容判断，捕获媒体流
					if (sourceVideo.captureStream) {
						stream = sourceVideo.captureStream(fps);
					} else {
						console.error("captureStream不支持");
						stream = null;
					}
					this.stream = stream;
					//将视频预览对象源指定为stream
					this.videoPreview.srcObject = stream;
					this.status = "startRecord";
				} catch (e) {
					console.error("navigator.getUserMedia error:", e);
				}
			},
			//开始录制
			startRecordButtonClickHandler(e) {
				//录制数据
				this.recordedBlobs = [];
				//指定mimeType类型，依次判断是否支持vp9、vp8编码格式
				let options = { mimeType: "video/webm;codecs=vp9" };
				if (!MediaRecorder.isTypeSupported(options.mimeType)) {
					console.error("video/webm;codecs=vp9不支持");
					options = { mimeType: "video/webm;codecs=vp8" };
					if (!MediaRecorder.isTypeSupported(options.mimeType)) {
						console.error("video/webm;codecs=vp8不支持");
						options = { mimeType: "video/webm" };
						if (!MediaRecorder.isTypeSupported(options.mimeType)) {
							console.error(`video/webm不支持`);
							options = { mimeType: "" };
						}
					}
				}
				try {
					//创建MediaRecorder对象，准备录制
					this.mediaRecorder = new MediaRecorder(this.stream, options);
				} catch (e) {
					console.error("创建MediaRecorder错误:", e);
					return;
				}
				//录制停止事件监听
				this.mediaRecorder.onstop = event => {
					console.log("录制停止: ", event);
					console.log("录制的Blobs数据为: ", this.recordedBlobs);
				};
				this.mediaRecorder.ondataavailable = this.handleDataAvailable;
				//开始录制并指定录制时间为10秒
				this.mediaRecorder.start(10);
				console.log("MediaRecorder started", this.mediaRecorder);
				//设置录制状态
				this.status = "stopRecord";
			},
			stopRecordButtonClickHandler(e) {
				//停止录制
				this.mediaRecorder.stop();
				//设置录制状态
				this.status = "play";
			},
			//回放录制视频
			playButtonClickHandler(e) {
				//生成Blob文件，类型为video/webm
				const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
				this.videoPlayer.src = null;
				this.videoPlayer.srcObject = null;
				//URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL
				this.videoPlayer.src = window.URL.createObjectURL(blob);
				//显示播放器控件
				this.videoPlayer.controls = true;
				//开始播放
				this.videoPlayer.play();
				//设置录制状态
				this.status = "download";
			},
			//点击下载录制文件
			downloadButtonClickHandler(e) {
				//生成Blob文件，类型为video/webm
				const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				//指定下载文件及类型
				a.download = "test.webm";
				//将a标签添加至网页
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					//URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL.
					//window.URL.revokeObjectURL(url);
				}, 100);
				//设置录制状态
				this.status = "start";
			},
			//录制数据回调事件
			handleDataAvailable(event) {
				console.log("handleDataAvailable", event);
				//判断是否有数据
				if (event.data && event.data.size > 0) {
					//记录数据
					this.recordedBlobs.push(event.data);
				}
			}
		},
		watch: {}
	});
}
</script>
