<style lang="less"></style>
<template>
	<div className="container">
		<h1>
			<span>麦克风示例</span>
		</h1>
		<!-- 音频对象，可播放声音 -->
		<audio ref="audio" controls autoPlay></audio>
		<p className="warning">警告: 如果没有使用头戴式耳机，声音会反馈到扬声器。</p>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { useGetMediaHander } = await _.$importVue("@/views/Rtc/reuse/reuseRtc.vue");

	return defineComponent({
		componentName: "RtcMicrophone",
		components: {},
		provide() {
			return {
				inject_rtc: this
			};
		},
		data() {
			return {};
		},
		computed: {},
		setup() {
			useGetMediaHander(this);
		},
		methods: {
			handleSuccess(stream) {
				//获取audio对象
				let audio = this.$refs["audio"];
				//获取音频轨道
				const audioTracks = stream.getAudioTracks();
				//获取音频设备名称
				console.log("获取的音频设备为: " + audioTracks[0].label);
				//不活动状态
				stream.oninactive = () => {
					console.log("Stream停止");
				};
				//将audio播放源指定为stream
				audio.srcObject = stream;
			},
			handleError(error) {
				console.log(
					"navigator.MediaDevices.getUserMedia error: ",
					error.message,
					error.name
				);
			}
		},
		watch: {}
	});
}
</script>
