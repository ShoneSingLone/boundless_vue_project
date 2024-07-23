<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>音频录制{{ timeStamp }}</span>
			</h1>
			<audio ref="audioPlayer" controls autoPlay></audio>
			<div>
				<xBtn class="button" :disabled="status != 'start'" @click="startClickHandler">
					打开麦克风
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
				status: "start",
				timeStamp: ""
			};
		},
		computed: {},
		mounted() {
			//获取音频播放器
			this.audioPlayer = this.$refs["audioPlayer"];
		},
		methods: {
			//点击打开麦克风按钮
			async startClickHandler() {
				try {
					//获取音频数据流
					const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
					console.log("获取音频stream:", stream);
					//将stream与window.stream绑定
					window.stream = stream;
					//设置当前状态为startRecord
					this.status = "startRecord";
				} catch (e) {
					//发生错误
					console.error("navigator.getUserMedia error:", e);
				}
			},
			//开始录制
			startRecordButtonClickHandler(e) {
				this.recordedBlobs = [];
				//媒体类型
				let options = { mineType: "audio/ogg;" };
				try {
					//初始化MediaRecorder对象，传入音频流及媒体类型
					this.mediaRecorder = new MediaRecorder(window.stream, options);
				} catch (e) {
					console.error("MediaRecorder创建失败:", e);
					return;
				}
				//录制停止事件回调
				this.mediaRecorder.onstop = event => {
					console.log("Recorder stopped: ", event);
					console.log("Recorded Blobs: ", this.recordedBlobs);
				};
				//当数据有效时触发的事件，可以把数据存储到缓存区里
				this.mediaRecorder.ondataavailable = this.handleDataAvailable;
				//录制10秒
				this.mediaRecorder.start(10);
				console.log("MediaRecorder started", this.mediaRecorder);
				//设置当前状态为stopRecord
				this.status = "stopRecord";
			},
			//停止录制
			stopRecordButtonClickHandler(e) {
				this.mediaRecorder.stop();
				//设置当前状态为play
				this.status = "play";
			},
			//播放录制的数据
			playButtonClickHandler(e) {
				//生成Blob文件，类型为audio/ogg
				const blob = new Blob(this.recordedBlobs, { type: "audio/ogg" });
				this.audioPlayer.src = null;
				//根据Blob文件生成播放器的数据源
				this.audioPlayer.src = window.URL.createObjectURL(blob);
				//播放声音
				this.audioPlayer.play();
				//设置当前状态为download
				this.status = "download";
			},
			//下载录制的文件
			downloadButtonClickHandler(e) {
				//生成Blob文件，类型为audio/ogg
				const blob = new Blob(this.recordedBlobs, { type: "audio/ogg" });
				//URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL
				const url = window.URL.createObjectURL(blob);
				//创建a标签
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				//设置下载文件
				a.download = "test.ogg";
				//将a标签添加至网页
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					document.body.removeChild(a);
					//URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL.
					//window.URL.revokeObjectURL(url);
				}, 100);
				//设置当前状态为start
				this.status = "start";
			},
			//录制数据回调事件
			handleDataAvailable(event) {
				console.log("handleDataAvailable", event);
				//判断是否有数据
				if (event.data && event.data.size > 0) {
					this.timeStamp = event.timeStamp;
					//记录数据
					this.recordedBlobs.push(event.data);
				}
			}
		},
		watch: {}
	});
}
</script>
