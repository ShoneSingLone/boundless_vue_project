<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>Canvas发送至远端示例</span>
			</h1>
			<div class="small-canvas">
				<canvas ref="canvas"></canvas>
			</div>
			<video class="small-video" ref="remoteVideo" playsInline autoPlay></video>
			<div>
				<Button ref="callButton" @click="call"> 呼叫 </Button>
				<Button ref="hangupButton" @click="hangup"> 挂断 </Button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {},
		mounted() {
			//初始化远端视频对象
			this.remoteVideo = this.$refs["remoteVideo"];
			//初始化Canvas对象
			this.canvas = this.$refs["canvas"];
			this.startCaptureCanvas();
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			//开始捕获Canvas
			async startCaptureCanvas() {
				this.localStream = this.canvas.captureStream(10);
				this.drawLine();
			},
			//画线
			drawLine() {
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
			//呼叫
			async call() {
				console.log("开始呼叫...");
				//视频轨道
				const videoTracks = this.localStream.getVideoTracks();
				//音频轨道
				const audioTracks = this.localStream.getAudioTracks();
				//判断视频轨道是否有值
				if (videoTracks.length > 0) {
					//输出摄像头的名称
					console.log(`使用的视频设备为: ${videoTracks[0].label}`);
				}
				//判断音频轨道是否有值
				if (audioTracks.length > 0) {
					//输出麦克风的名称
					console.log(`使用的音频设备为: ${audioTracks[0].label}`);
				}
				//设置ICE Server，使用Google服务器
				let configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
				//创建RTCPeerConnection对象
				this.peerConnA = new RTCPeerConnection(configuration);
				console.log("创建本地PeerConnection成功:peerConnA");
				//监听返回的Candidate信息
				this.peerConnA.addEventListener("icecandidate", this.onIceCandidateA);
				//创建RTCPeerConnection对象
				this.peerConnB = new RTCPeerConnection(configuration);
				console.log("创建本地PeerConnection成功:peerConnB");
				//监听返回的Candidate信息
				this.peerConnB.addEventListener("icecandidate", this.onIceCandidateB);
				//监听ICE状态变化
				this.peerConnA.addEventListener("iceconnectionstatechange", this.onIceStateChangeA);
				//监听ICE状态变化
				this.peerConnB.addEventListener("iceconnectionstatechange", this.onIceStateChangeB);
				//监听track事件，可以获取到远端视频流
				this.peerConnB.addEventListener("track", this.gotRemoteStream);
				//peerConnA.addStream(localStream);
				//循环迭代本地流的所有轨道
				this.localStream.getTracks().forEach(track => {
					//把音视频轨道添加到连接中
					this.peerConnA.addTrack(track, this.localStream);
				});
				console.log("将本地流添加到peerConnA里");
				try {
					console.log("peerConnA创建提议Offer开始");
					//创建提议Offer
					const offer = await this.peerConnA.createOffer();
					//创建Offer成功
					await this.onCreateOfferSuccess(offer);
				} catch (e) {
					//创建Offer失败
					this.onCreateSessionDescriptionError(e);
				}
			},
			//创建会话描述错误
			onCreateSessionDescriptionError(error) {
				console.log(`创建会话描述SD错误: ${error.toString()}`);
			},
			//创建提议Offer成功
			async onCreateOfferSuccess(desc) {
				//peerConnA创建Offer返回的SDP信息
				console.log(`peerConnA创建Offer返回的SDP信息\n${desc.sdp}`);
				console.log("设置peerConnA的本地描述start");
				try {
					//设置peerConnA的本地描述
					await this.peerConnA.setLocalDescription(desc);
					this.onSetLocalSuccess(this.peerConnA);
				} catch (e) {
					this.onSetSessionDescriptionError();
				}
				console.log("peerConnB开始设置远端描述");
				try {
					//设置peerConnB的远端描述
					await this.peerConnB.setRemoteDescription(desc);
					this.onSetRemoteSuccess(this.peerConnB);
				} catch (e) {
					//创建会话描述错误
					this.onSetSessionDescriptionError();
				}
				console.log("peerConnB开始创建应答Answer");
				try {
					//创建应答Answer
					const answer = await this.peerConnB.createAnswer();
					//创建应答成功
					await this.onCreateAnswerSuccess(answer);
				} catch (e) {
					//创建会话描述错误
					this.onCreateSessionDescriptionError(e);
				}
			},
			//设置本地描述完成
			onSetLocalSuccess(pc) {
				console.log(`${this.getName(pc)}设置本地描述完成:setLocalDescription`);
			},
			//设置远端描述完成
			onSetRemoteSuccess(pc) {
				console.log(`${this.getName(pc)}设置远端描述完成:setRemoteDescription`);
			},
			//设置描述SD错误
			onSetSessionDescriptionError(error) {
				console.log(`设置描述SD错误: ${error.toString()}`);
			},
			getName(pc) {
				return pc === this.peerConnA ? "peerConnA" : "peerConnB";
			},
			//获取到远端视频流
			gotRemoteStream(e) {
				if (this.remoteVideo.srcObject !== e.streams[0]) {
					//取集合第一个元素
					this.remoteVideo.srcObject = e.streams[0];
					console.log("peerConnB开始接收远端流");
				}
			},
			//创建应答成功
			async onCreateAnswerSuccess(desc) {
				//输出SDP信息
				console.log(`peerConnB的应答Answer数据:\n${desc.sdp}`);
				console.log("peerConnB设置本地描述开始:setLocalDescription");
				try {
					//设置peerConnB的本地描述信息
					await this.peerConnB.setLocalDescription(desc);
					this.onSetLocalSuccess(this.peerConnB);
				} catch (e) {
					this.onSetSessionDescriptionError(e);
				}
				console.log("peerConnA设置远端描述开始:setRemoteDescription");
				try {
					//设置peerConnA的远端描述，即peerConnB的应答信息
					await this.peerConnA.setRemoteDescription(desc);
					this.onSetRemoteSuccess(this.peerConnA);
				} catch (e) {
					this.onSetSessionDescriptionError(e);
				}
			},
			//Candidate事件回调方法
			async onIceCandidateA(event) {
				try {
					if (event.candidate) {
						//将peerConnA的Candidate添加至peerConnB
						await this.peerConnB.addIceCandidate(event.candidate);
						this.onAddIceCandidateSuccess(this.peerConnB);
					}
				} catch (e) {
					this.onAddIceCandidateError(this.peerConnB, e);
				}
				console.log(
					`IceCandidate数据:\n${event.candidate ? event.candidate.candidate : "(null)"}`
				);
			},
			//Candidate事件回调方法
			async onIceCandidateB(event) {
				try {
					if (event.candidate) {
						//将peerConnB的Candidate添加至peerConnA里
						await this.peerConnA.addIceCandidate(event.candidate);
						this.onAddIceCandidateSuccess(this.peerConnA);
					}
				} catch (e) {
					this.onAddIceCandidateError(this.peerConnA, e);
				}
				console.log(
					`IceCandidate数据:\n${event.candidate ? event.candidate.candidate : "(null)"}`
				);
			},
			//添加Candidate成功
			onAddIceCandidateSuccess(pc) {
				console.log(`${this.getName(pc)}添加IceCandidate成功`);
			},
			//添加Candidate失败
			onAddIceCandidateError(pc, error) {
				console.log(`${this.getName(pc)}添加IceCandidate失败: ${error.toString()}`);
			},
			//监听ICE状态变化事件回调方法
			onIceStateChangeA(event) {
				console.log(`peerConnA连接的ICE状态: ${this.peerConnA.iceConnectionState}`);
				console.log("ICE状态改变事件: ", event);
			},
			//监听ICE状态变化事件回调方法
			onIceStateChangeB(event) {
				console.log(`peerConnB连接的ICE状态: ${this.peerConnB.iceConnectionState}`);
				console.log("ICE状态改变事件: ", event);
			},
			//断开连接
			hangup() {
				console.log("结束会话");
				//关闭peerConnA
				this.peerConnA.close();
				//关闭peerConnB
				this.peerConnB.close();
				//将peerConnA设置为空
				this.peerConnA = null;
				//将peerConnB设置为空
				this.peerConnB = null;
			}
		},
		watch: {}
	});
}
</script>
