<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>录制Canvas示例</span>
			</h1>
			<div>
				<div class="small-canvas">
					<canvas ref="canvas"></canvas>
				</div>
				<video class="small-video" ref="video" playsInline autoPlay></video>
			</div>
			<xBtn class="button" @click="startCaptureCanvas"> 开始 </xBtn>
			<xBtn class="button" @click="stopRecord"> 停止 </xBtn>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		componentName: "RtcCamera",
		inject: ["inject_rtc"],
		components: {},
		mounted() {
			this.drawLine();
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			drawLine() {
				//获取Canvas对象
				this.canvas = this.$refs["canvas"];
				//获取Canvas的2d内容
				this.context = this.canvas.getContext("2d");
				//填充颜色
				this.context.fillStyle = "#CCC";
				//绘制Canvas背景
				this.context.fillRect(0, 0, 320, 240);
				this.context.lineWidth = 1;
				//画笔颜色
				this.context.strokeStyle = "#FF0000";
				//监听画板鼠标按下事件，开始绘画
				this.canvas.addEventListener("mousedown", this.startAction);
				//监听画板鼠标抬起事件，结束绘画
				this.canvas.addEventListener("mouseup", this.endAction);
			},
			//鼠标按下事件
			startAction(event) {
				//开始新的路径
				this.context.beginPath();
				//将画笔移动到指定坐标，类似起点
				this.context.moveTo(event.offsetX, event.offsetY);
				//开始绘制
				this.context.stroke();
				//监听鼠标移动事件
				this.canvas.addEventListener("mousemove", this.moveAction);
			},
			//鼠标移动事件
			moveAction(event) {
				//将画笔移动到结束坐标，类似终点
				this.context.lineTo(event.offsetX, event.offsetY);
				//开始绘制
				this.context.stroke();
			},
			//鼠标抬起事件
			endAction() {
				//移除鼠标移动事件
				this.canvas.removeEventListener("mousemove", this.moveAction);
			},
			//开始捕获Canvas
			async startCaptureCanvas() {
				this.stream = this.canvas.captureStream(10);
				const video = this.$refs["video"];
				//获取视频轨道
				const videoTracks = this.stream.getVideoTracks();
				//读取视频资源名称
				console.log(`视频资源名称: ${videoTracks[0].label}`);
				//将视频对象的源指定为stream
				video.srcObject = this.stream;
				//开始录制
				this.startRecord();
			},
			//开始录制
			startRecord() {
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
						//将数据记录起来
						this.recordedBlobs.push(event.data);
					}
				};
				//开始录制并指定录制时间为100毫秒
				this.mediaRecorder.start(100);
				console.log("MediaRecorder started", this.mediaRecorder);
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
				a.download = "canvas.webm";
				//将a标签添加至网页
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					//释放url对象
					window.URL.revokeObjectURL(url);
				}, 100);
			}
		},
		watch: {}
	});
}
</script>
