<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<xForm>
				<div>
					<h2>发送</h2>
					<textarea
						ref="dataChannelSend"
						:disabled="false"
						placeholder="请输入要发送的文本..." />
					<div>
						<xBtn preset="blue" @click="call" v-if="!isCalling"> 呼叫 </xBtn>
						<xBtn @click="hangup" v-if="isCalling"> 挂断 </xBtn>
						<xBtn preset="blue" @click="sendData" v-if="isCalling"> 发送 </xBtn>
					</div>
				</div>
				<div v-if="isCalling">
					<h2>接收</h2>
					<textarea ref="dataChannelReceive" :disabled="false" />
				</div>
			</xForm>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {},
		mounted() {},
		data() {
			return {
				isCalling: false
			};
		},
		computed: {},
		methods: {
			//呼叫
			async call() {
				console.log("开始呼叫...");
				//设置ICE Server，使用Google服务器
				let configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
				//创建RTCPeerConnection对象
				this.localConnection = new RTCPeerConnection(configuration);
				console.log("创建本地PeerConnection成功:localConnection");
				//监听返回的Candidate信息
				this.localConnection.addEventListener("icecandidate", this.onLocalIceCandidate);
				//实例化发送通道
				this.sendChannel = this.localConnection.createDataChannel("webrtc-datachannel");
				//onopen事件监听
				this.sendChannel.onopen = this.onSendChannelStateChange;
				//onclose事件监听
				this.sendChannel.onclose = this.onSendChannelStateChange;
				//创建RTCPeerConnection对象
				this.remoteConnection = new RTCPeerConnection(configuration);
				console.log("创建本地PeerConnection成功:remoteConnection");
				//监听返回的Candidate信息
				this.remoteConnection.addEventListener("icecandidate", this.onRemoteIceCandidate);
				//远端连接数据到达事件监听
				this.remoteConnection.ondatachannel = this.receiveChannelCallback;
				//监听ICE状态变化
				this.localConnection.addEventListener(
					"iceconnectionstatechange",
					this.onLocalIceStateChange
				);
				//监听ICE状态变化
				this.remoteConnection.addEventListener(
					"iceconnectionstatechange",
					this.onRemoteIceStateChange
				);
				try {
					console.log("localConnection创建提议Offer开始");
					//创建提议Offer
					const offer = await this.localConnection.createOffer();
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
				this.isCalling = true;
				//localConnection创建Offer返回的SDP信息
				console.log(`localConnection创建Offer返回的SDP信息\n${desc.sdp}`);
				console.log("设置localConnection的本地描述start");
				try {
					//设置localConnection的本地描述
					await this.localConnection.setLocalDescription(desc);
					this.onSetLocalSuccess(this.localConnection);
				} catch (e) {
					this.onSetSessionDescriptionError();
				}
				console.log("remoteConnection开始设置远端描述");
				try {
					//设置remoteConnection的远端描述
					await this.remoteConnection.setRemoteDescription(desc);
					this.onSetRemoteSuccess(this.remoteConnection);
				} catch (e) {
					//创建会话描述错误
					this.onSetSessionDescriptionError();
				}
				console.log("remoteConnection开始创建应答Answer");
				try {
					//创建应答Answer
					const answer = await this.remoteConnection.createAnswer();
					//创建应答成功
					await this.onCreateAnswerSuccess(answer);
				} catch (e) {
					//创建会话描述错误
					this.onCreateSessionDescriptionError(e);
				}
			},
			//设置本地描述完成
			onSetLocalSuccess(pc) {
				console.log(`${this.getName(pc)}设置本地描述完成：setLocalDescription`);
			},
			//设置远端描述完成
			onSetRemoteSuccess(pc) {
				console.log(`${this.getName(pc)}设置远端描述完成：setRemoteDescription`);
			},
			//设置描述SD错误
			onSetSessionDescriptionError(error) {
				console.log(`设置描述SD错误: ${error.toString()}`);
			},
			getName(pc) {
				return pc === this.localConnection ? "localConnection" : "remoteConnection";
			},
			//创建应答成功
			async onCreateAnswerSuccess(desc) {
				//输出SDP信息
				console.log(`remoteConnection的应答Answer数据:\n${desc.sdp}`);
				console.log("remoteConnection设置本地描述开始:setLocalDescription");
				try {
					//设置remoteConnection的本地描述信息
					await this.remoteConnection.setLocalDescription(desc);
					this.onSetLocalSuccess(this.remoteConnection);
				} catch (e) {
					this.onSetSessionDescriptionError(e);
				}
				console.log("localConnection设置远端描述开始:setRemoteDescription");
				try {
					//设置localConnection的远端描述，即remoteConnection的应答信息
					await this.localConnection.setRemoteDescription(desc);
					this.onSetRemoteSuccess(this.localConnection);
				} catch (e) {
					this.onSetSessionDescriptionError(e);
				}
			},
			//Candidate事件回调方法
			async onLocalIceCandidate(event) {
				try {
					if (event.candidate) {
						//将localConnection的Candidate添加至remoteConnection
						await this.remoteConnection.addIceCandidate(event.candidate);
						this.onAddIceCandidateSuccess(this.remoteConnection);
					}
				} catch (e) {
					this.onAddIceCandidateError(this.remoteConnection, e);
				}
				console.log(
					`IceCandidate数据:\n${event.candidate ? event.candidate.candidate : "(null)"}`
				);
			},
			//Candidate事件回调方法
			async onRemoteIceCandidate(event) {
				try {
					if (event.candidate) {
						//将remoteConnection的Candidate添加至localConnection
						await this.localConnection.addIceCandidate(event.candidate);
						this.onAddIceCandidateSuccess(this.localConnection);
					}
				} catch (e) {
					this.onAddIceCandidateError(this.localConnection, e);
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
			//监听I,E状态变化事件回调方法
			onLocalIceStateChange(event) {
				console.log(
					`localConnection连接的ICE状态: ${this.localConnection.iceConnectionState}`
				);
				console.log("ICE状态改变事件: ", event);
			},
			//监听ICE状态变化事件回调方法
			onRemoteIceStateChange(event) {
				console.log(
					`remoteConnection连接的ICE状态: ${this.remoteConnection.iceConnectionState}`
				);
				console.log("ICE状态改变事件: ", event);
			},
			//断开连接
			hangup() {
				console.log("结束会话");
				//关闭localConnection
				this.localConnection.close();
				//关闭remoteConnection
				this.remoteConnection.close();
				//将localConnection设置为空
				this.localConnection = null;
				//将remoteConnection设置为空
				this.remoteConnection = null;
				this.isCalling = false;
			},
			sendData() {
				let dataChannelSend = this.$refs["dataChannelSend"];
				const data = dataChannelSend.value;
				this.sendChannel.send(data);
				console.log("发送的数据:" + data);
			},
			//接收通道数据到达回调方法
			receiveChannelCallback(event) {
				console.log("Receive Channel Callback");
				//实例化接收通道
				this.receiveChannel = event.channel;
				//接收消息事件监听
				this.receiveChannel.onmessage = this.onReceiveMessageCallback;
				//onopen事件监听
				this.receiveChannel.onopen = this.onReceiveChannelStateChange;
				//onclose事件监听
				this.receiveChannel.onclose = this.onReceiveChannelStateChange;
			},
			//接收消息处理
			onReceiveMessageCallback(event) {
				console.log("接收的数据:" + event.data);
				let dataChannelReceive = this.$refs["dataChannelReceive"];
				dataChannelReceive.value = event.data;
			},
			//发送通道状态变化
			onSendChannelStateChange() {
				const readyState = this.sendChannel.readyState;
				console.log("发送通道状态: " + readyState);
			},
			//接收通道状态变化
			onReceiveChannelStateChange() {
				const readyState = this.receiveChannel.readyState;
				console.log("接收通道状态:" + readyState);
			}
		},
		watch: {}
	});
}
</script>
