<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>捕获Canvas作为媒体流示例</span>
			</h1>
			<div>
				<xBtn @click="setVideoStream">setVideoStream</xBtn>
				<div class="small-canvas mb mt">
					<div class="mb">画布Canvas容器</div>
					<canvas ref="canvas"></canvas>
				</div>
				<div>
					<video ref="video" playsInline autoPlay controls class="small-video"></video>
				</div>
			</div>
			<xMd :md="md" />
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
				//MediaStream对象
				stream: null,
				//画布对象
				canvas: null,
				//画布2d内容
				context: null,

				md: `>如果要实现视频会议或远程教育中的电子白板绘制功能，可以参考这个示例。电子白板的多方同步问题有两种解决方案。
- 一种方案是使用canvas.captureStream（）方法获取到stream后，再通过RTCPeerConnection转发出去，在远端播放此视频流即可。
- 另一种方案是使用RTCDataChannel转发坐标及操作命令，远端接收到转发的信息后同步绘制内容即可，同样可以实现电子白板同步功能。`
			};
		},
		computed: {},
		mounted() {
			this.canvas = this.$refs["canvas"];
			this.startCaptureCanvas();
			/**
			 * 捕获Canvas作为媒体流示例
			 */
		},
		methods: {
			//开始捕获Canvas
			async startCaptureCanvas(e) {
				this.setVideoStream();
				this.drawLine();
			},
			setVideoStream() {
				this.stream = this.canvas.captureStream(128);
				const video = this.$refs["video"];
				//将视频对象的源指定为stream
				video.srcObject = this.stream;
			},
			//画线
			drawLine() {
				//获取Canvas的2d内容
				this.context = this.canvas.getContext("2d");
				//填充颜色
				this.context.fillStyle = "#000";
				//绘制Canvas背景
				this.context.fillRect(0, 0, 320, 240);
				this.context.lineWidth = 1;
				//画笔颜色
				this.context.strokeStyle = "green";
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
			}
		},
		watch: {}
	});
}
</script>
