<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<div>
				<form id="fileInfo">
					<input type="file" ref="fileInput" name="files" />
				</form>
				<div>
					<h2>发送</h2>
					<progress ref="sendProgress" max="0" value="0"></progress>
				</div>
				<div>
					<h2>接收</h2>
					<progress ref="receiveProgress" max="0" value="0"></progress>
				</div>
			</div>
			<a ref="download"></a>
			<div>
				<Button @click="startSendFile"> 发送 </Button>
				<Button @click="cancleSendFile"> 取消 </Button>
				<Button @click="closeChannel"> 关闭 </Button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {},
		mounted() {
			this.sendProgress = this.$refs["sendProgress"];
			this.receiveProgress = this.$refs["receiveProgress"];
			this.fileInput = this.$refs["fileInput"];
			//监听change事件，判断文件是否选择
			this.fileInput.addEventListener("change", async () => {
				const file = this.fileInput.files[0];
				if (!file) {
					console.log("没有选择文件");
				} else {
					console.log("选择的文件是:" + file.name);
				}
			});
		},
		setup() {
			const vm = this;
			class RtcDataChannelFile {
				//本地连接对象
				localConnection;
				//远端连接对象
				remoteConnection;
				//发送通道
				sendChannel;
				//接收通道
				receiveChannel;
				//文件读取
				fileReader;
				//接收数据缓存
				receiveBuffer = [];
				//接收到的数据大小
				receivedSize = 0;
				//文件选择
				fileInput;
				//发送进度条
				sendProgress;
				//接收进度条
				receiveProgress;

				//建立对等连接并发送文件
				startSendFile = async () => {
					//创建RTCPeerConnection对象
					vm.localConnection = new RTCPeerConnection();
					console.log("创建本地PeerConnection成功:localConnection");
					//监听返回的Candidate信息
					vm.localConnection.addEventListener("icecandidate", vm.onLocalIceCandidate);
					//实例化发送通道
					vm.sendChannel = vm.localConnection.createDataChannel("webrtc-datachannel");
					//数据类型为二进制
					vm.sendChannel.binaryType = "arraybuffer";
					//onopen事件监听
					vm.sendChannel.addEventListener("open", vm.onSendChannelStateChange);
					//onclose事件监听
					vm.sendChannel.addEventListener("close", vm.onSendChannelStateChange);
					//创建RTCPeerConnection对象
					vm.remoteConnection = new RTCPeerConnection();
					console.log("创建本地PeerConnection成功:remoteConnection");
					//监听返回的Candidate信息
					vm.remoteConnection.addEventListener("icecandidate", vm.onRemoteIceCandidate);
					//远端连接数据到达事件监听
					vm.remoteConnection.addEventListener("datachannel", event =>
						vm.receiveChannelCallback(event)
					);
					//监听ICE状态变化
					vm.localConnection.addEventListener(
						"iceconnectionstatechange",
						vm.onLocalIceStateChange
					);
					//监听ICE状态变化
					vm.remoteConnection.addEventListener(
						"iceconnectionstatechange",
						vm.onRemoteIceStateChange
					);
					try {
						console.log("localConnection创建提议Offer开始");
						//创建提议Offer
						const offer = await vm.localConnection.createOffer();
						//创建Offer成功
						await vm.onCreateOfferSuccess(offer);
					} catch (e) {
						//创建Offer失败
						vm.onCreateSessionDescriptionError(e);
					}
				};
				//创建会话描述错误
				onCreateSessionDescriptionError = error => {
					console.log(`创建会话描述SD错误: ${error.toString()}`);
				};
				//创建提议Offer成功
				onCreateOfferSuccess = async desc => {
					//localConnection创建Offer返回的SDP信息
					console.log(`localConnection创建Offer返回的SDP信息\n${desc.sdp}`);
					console.log("设置localConnection的本地描述start");
					try {
						//设置localConnection的本地描述
						await vm.localConnection.setLocalDescription(desc);
						vm.onSetLocalSuccess(vm.localConnection);
					} catch (e) {
						vm.onSetSessionDescriptionError();
					}
					console.log("remoteConnection开始设置远端描述");
					try {
						//设置remoteConnection的远端描述
						await vm.remoteConnection.setRemoteDescription(desc);
						vm.onSetRemoteSuccess(vm.remoteConnection);
					} catch (e) {
						//创建会话描述错误
						vm.onSetSessionDescriptionError();
					}
					console.log("remoteConnection开始创建应答Answer");
					try {
						//创建应答Answer
						const answer = await vm.remoteConnection.createAnswer();
						//创建应答成功
						await vm.onCreateAnswerSuccess(answer);
					} catch (e) {
						//创建会话描述错误
						vm.onCreateSessionDescriptionError(e);
					}
				};
				//设置本地描述完成
				onSetLocalSuccess = pc => {
					console.log(`${vm.getName(pc)}设置本地描述完成：setLocalDescription`);
				};
				//设置远端描述完成
				onSetRemoteSuccess = pc => {
					console.log(`${vm.getName(pc)}设置远端描述完成：setRemoteDescription`);
				};
				//设置描述SD错误
				onSetSessionDescriptionError = error => {
					console.log(`设置描述SD错误: ${error.toString()}`);
				};
				getName = pc => {
					return pc === vm.localConnection ? "localConnection" : "remoteConnection";
				};
				//创建应答成功
				onCreateAnswerSuccess = async desc => {
					//输出SDP信息
					console.log(`remoteConnection的应答Answer数据：\n${desc.sdp}`);
					console.log("remoteConnection设置本地描述开始：setLocalDescription");
					try {
						//设置remoteConnection的本地描述信息
						await vm.remoteConnection.setLocalDescription(desc);
						vm.onSetLocalSuccess(vm.remoteConnection);
					} catch (e) {
						vm.onSetSessionDescriptionError(e);
					}
					console.log("localConnection设置远端描述开始：setRemoteDescription");
					try {
						//设置localConnection的远端描述，即remoteConnection的应答信息
						await vm.localConnection.setRemoteDescription(desc);
						vm.onSetRemoteSuccess(vm.localConnection);
					} catch (e) {
						vm.onSetSessionDescriptionError(e);
					}
				};
				//Candidate事件回调方法
				onLocalIceCandidate = async event => {
					try {
						if (event.candidate) {
							//将localConnection的Candidate添加至remoteConnection
							await vm.remoteConnection.addIceCandidate(event.candidate);
							vm.onAddIceCandidateSuccess(vm.remoteConnection);
						}
					} catch (e) {
						vm.onAddIceCandidateError(vm.remoteConnection, e);
					}
					console.log(
						`IceCandidate数据:\n${event.candidate ? event.candidate.candidate : "(null)"}`
					);
				};
				//Candidate事件回调方法
				onRemoteIceCandidate = async event => {
					try {
						if (event.candidate) {
							//将remoteConnection的Candidate添加至localConnection
							await vm.localConnection.addIceCandidate(event.candidate);
							vm.onAddIceCandidateSuccess(vm.localConnection);
						}
					} catch (e) {
						vm.onAddIceCandidateError(vm.localConnection, e);
					}
					console.log(
						`IceCandidate数据:\n${event.candidate ? event.candidate.candidate : "(null)"}`
					);
				};
				//添加Candidate成功
				onAddIceCandidateSuccess = pc => {
					console.log(`${vm.getName(pc)}添加IceCandidate成功`);
				};
				//添加Candidate失败
				onAddIceCandidateError = (pc, error) => {
					console.log(`${vm.getName(pc)}添加IceCandidate失败: ${error.toString()}`);
				};
				//监听ICE状态变化事件回调方法
				onLocalIceStateChange = event => {
					console.log(
						`localConnection连接的ICE状态: ${vm.localConnection.iceConnectionState}`
					);
					console.log("ICE状态改变事件: ", event);
				};
				//监听ICE状态变化事件回调方法
				onRemoteIceStateChange = event => {
					console.log(
						`remoteConnection连接的ICE状态: ${vm.remoteConnection.iceConnectionState}`
					);
					console.log("ICE状态改变事件: ", event);
				};
				//关闭数据通道
				closeChannel = () => {
					console.log("关闭数据通道");
					vm.sendChannel.close();
					if (vm.receiveChannel) {
						vm.receiveChannel.close();
					}
					//关闭localConnection
					vm.localConnection.close();
					//关闭remoteConnection
					vm.remoteConnection.close();
					//将localConnection设置为空
					vm.localConnection = null;
					//将remoteConnection设置为空
					vm.remoteConnection = null;
				};
				//发送数据
				sendData = () => {
					let file = vm.fileInput.files[0];
					console.log(`文件是: ${[file.name, file.size, file.type].join(" ")}`);
					//设置发送进度条的最大值
					vm.sendProgress.max = file.size;
					//设置接收进度条的最大值
					vm.receiveProgress.max = file.size;
					//文件切片大小，即每次读取的文件大小
					let chunkSize = 16384;
					//实例化文件读取对象
					vm.fileReader = new FileReader();
					//偏移量可用于表示进度
					let offset = 0;
					//监听error事件
					vm.fileReader.addEventListener("error", error => {
						console.error("读取文件出错:", error);
					});
					//监听abort事件
					vm.fileReader.addEventListener("abort", event => {
						console.log("读取文件取消:", event);
					});
					//监听load事件
					vm.fileReader.addEventListener("load", e => {
						console.log("文件加载完成 ", e);
						//使用发送通道开始发送文件数据
						vm.sendChannel.send(e.target.result);
						//使用文件二进制数据长度作为偏移量
						offset += e.target.result.byteLength;
						//使用偏移量作为发送进度
						vm.sendProgress.value = offset;
						console.log("当前文件发送进度为:", offset);
						//判断偏移量是否小于文件大小
						if (offset < file.size) {
							//继续读取
							readSlice(offset);
						}
					});
					//读取切片大小
					let readSlice = o => {
						console.log("readSlice ", o);
						//将文件的某一段切割下来，从offset到offset + chunkSize位置切下
						let slice = file.slice(offset, o + chunkSize);
						//读取切片的二进制数据
						vm.fileReader.readAsArrayBuffer(slice);
					};
					//首次读取0到chunkSize大小的切片数据
					readSlice(0);
				};
				//接收通道数据到达回调方法
				receiveChannelCallback = event => {
					//实例化接收通道
					vm.receiveChannel = event.channel;
					//数据类型为二进制
					vm.receiveChannel.binaryType = "arraybuffer";
					//接收消息事件监听
					vm.receiveChannel.onmessage = event => vm.onReceiveMessageCallback(event);
					//onopen事件监听
					vm.receiveChannel.onopen = vm.onReceiveChannelStateChange;
					//onclose事件监听
					vm.receiveChannel.onclose = vm.onReceiveChannelStateChange;
					vm.receivedSize = 0;
				};
				//接收消息处理
				onReceiveMessageCallback = event => {
					console.log(`接收的数据 ${event.data.byteLength}`);
					//将接收到的数据添加到接收缓存里
					vm.receiveBuffer.push(event.data);
					//设置当前接收文件的大小
					vm.receivedSize += event.data.byteLength;
					//使用接收文件的大小表示当前接收进度
					vm.receiveProgress.value = vm.receivedSize;
					const file = vm.fileInput.files[0];
					//判断当前接收的文件大小是否等于文件的大小
					if (vm.receivedSize === file.size) {
						//根据缓存数据生成Blob文件
						const received = new Blob(vm.receiveBuffer);
						//将缓存数据设置为空
						vm.receiveBuffer = [];
						//获取下载连接对象
						let download = vm.$refs["download"];
						//创建下载文件对象及链接
						download.href = URL.createObjectURL(received);
						download.download = file.name;
						download.textContent = `点击下载'${file.name}'(${file.size} bytes)`;
						download.style.display = "block";
					}
				};

				//发送通道状态变化
				onSendChannelStateChange = () => {
					const readyState = vm.sendChannel.readyState;
					console.log("发送通道状态: " + readyState);
					if (readyState === "open") {
						vm.sendData();
					}
				};
				//接收通道状态变化
				onReceiveChannelStateChange = () => {
					const readyState = vm.receiveChannel.readyState;
					console.log("接收通道状态:" + readyState);
				};
				//取消发送文件
				cancleSendFile = () => {
					if (vm.fileReader && vm.fileReader.readyState === 1) {
						console.log("取消发送文件");
						vm.fileReader.abort();
					}
				};
			}
			return new RtcDataChannelFile();
		},
		computed: {},
		methods: {},
		watch: {}
	});
}
</script>
