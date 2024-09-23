<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="container">
			<h1>
				<span>摄像头示例</span>
			</h1>
			<div class="width100">
				<video
					class="video"
					ref="myVideo"
					autoPlay
					playsInline
					controls
					style="max-height: 500px; max-width: 500px; margin: auto"></video>
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
		mounted() {},
		data() {
			return {};
		},
		computed: {},
		methods: {},
		watch: {}
	});
}
</script>
