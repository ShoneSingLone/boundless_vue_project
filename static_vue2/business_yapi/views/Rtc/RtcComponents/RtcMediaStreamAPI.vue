<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div className="container">
			<h1>
				<span>MediaStreamAPI测试</span>
			</h1>
			<video
				className="video"
				ref="myVideo"
				autoPlay
				playsInline
				id="RtcMediaStreamAPI"></video>
			<div class="flex mt">
				<xBtn @click="btnGetTracks"> 获取所有轨道 </xBtn>
				<xBtn @click="btnGetAudioTracks"> 获取音频轨道 </xBtn>
				<xBtn @click="btnGetTrackById"> 根据Id获取音频轨道 </xBtn>
				<xBtn @click="btnRemoveAudioTrack"> 删除音频轨道 </xBtn>
				<xBtn @click="btnGetVideoTracks"> 获取视频轨道 </xBtn>
				<xBtn @click="btnRemoveVideoTrack"> 删除视频轨道 </xBtn>
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
				stream: null
			};
		},
		computed: {},
		mounted() {
			this.$on("getUserMedia.success", this.openDevice);
		},
		methods: {
			//打开音视频设备
			async openDevice(stream) {
				try {
					//根据约束条件获取媒体
					this.stream = stream;
					let video = this.$refs["myVideo"];
					video.srcObject = this.stream;
				} catch (e) {
					console.log(`getUserMedia错误:` + e);
				}
			},
			//获取音频轨道列表
			btnGetAudioTracks() {
				console.log("getAudioTracks");
				//返回一个数据
				console.log(this.stream.getAudioTracks());
			},
			//根据Id获取音频轨道
			btnGetTrackById() {
				console.log("getTrackById");
				console.log(this.stream.getTrackById(this.stream.getAudioTracks()[0].id));
			},
			//删除音频轨道
			btnRemoveAudioTrack() {
				console.log("removeAudioTrack()");
				this.stream.removeTrack(this.stream.getAudioTracks()[0]);
			},
			//获取所有轨道，包括音频及视频
			btnGetTracks() {
				console.log("getTracks()");
				console.log(this.stream.getTracks());
			},
			//获取视频轨道列表
			btnGetVideoTracks() {
				console.log("getVideoTracks()");
				console.log(this.stream.getVideoTracks());
			},
			//删除视频轨道
			btnRemoveVideoTrack() {
				console.log("removeVideoTrack()");
				this.stream.removeTrack(this.stream.getVideoTracks()[0]);
			}
		},
		watch: {}
	});
}
</script>
