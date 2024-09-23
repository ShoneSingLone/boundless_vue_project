<style lang="less"></style>
<template>
	<div class="height100 flex vertical">
		<div>
			<xForm>
				<div span="full">
					<xBtn @click="init">getUserMedia</xBtn>
					<xGap b />
					<xItem :configs="form.camera" v-model="constraints.video" />
					<xGap b />
					<xItem :configs="form.microphone" v-model="constraints.audio" />
				</div>
				<RtcScreenSharing />
				<RtcRecordScreen />
				<RtcRecordVideo />
				<RtcRecordAudio />
				<RtcRecordCanvas />
				<RtcMediaStreamAPI v-if="constraints.video || constraints.audio" />
				<RtcCamera v-if="constraints.video" />
				<RtcMicrophone v-if="constraints.audio" />
				<RtcCaptureVideo />
				<RtcCaptureCanvas />
			</xForm>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {
			RtcCamera: () => _.$importVue("@/views/Rtc/RtcComponents/RtcCamera.vue"),
			RtcRecordCanvas: () => _.$importVue("@/views/Rtc/RtcComponents/RtcRecordCanvas.vue"),
			RtcRecordVideo: () => _.$importVue("@/views/Rtc/RtcComponents/RtcRecordVideo.vue"),
			RtcRecordScreen: () => _.$importVue("@/views/Rtc/RtcComponents/RtcRecordScreen.vue"),
			RtcRecordAudio: () => _.$importVue("@/views/Rtc/RtcComponents/RtcRecordAudio.vue"),
			RtcCaptureCanvas: () => _.$importVue("@/views/Rtc/RtcComponents/RtcCaptureCanvas.vue"),
			RtcCaptureVideo: () => _.$importVue("@/views/Rtc/RtcComponents/RtcCaptureVideo.vue"),
			RtcMediaStreamAPI: () =>
				_.$importVue("@/views/Rtc/RtcComponents/RtcMediaStreamAPI.vue"),
			RtcScreenSharing: () => _.$importVue("@/views/Rtc/RtcComponents/RtcScreenSharing.vue"),
			RtcMicrophone: () => _.$importVue("@/views/Rtc/RtcComponents/RtcMicrophone.vue")
		},
		provide() {
			return {
				inject_rtc: this
			};
		},
		data() {
			return {
				form: defItems({
					camera: {
						label: "camera",
						itemType: "xItemSwitch"
					},
					microphone: {
						label: "microphone",
						itemType: "xItemSwitch"
					}
				}),
				constraints: {
					//禁用音频
					audio: true,
					//启用视频
					video: true
				}
			};
		},
		methods: {
			//打开摄像头
			async init() {
				try {
					//根据约束条件获取媒体
					const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
					this.broadcastChildren("getUserMedia.success", stream);
				} catch (e) {
					this.broadcastChildren("getUserMedia.error", e);
				}
			},
			broadcastChildren(eventName, payload) {
				["RtcMicrophone", "RtcCamera", "RtcMediaStreamAPI"].forEach(componentName => {
					this.broadcast(componentName, eventName, payload);
				});
			}
		},
		watch: {}
	});
}
</script>
