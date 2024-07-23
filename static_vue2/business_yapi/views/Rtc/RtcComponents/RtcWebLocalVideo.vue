<style lang="less"></style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div :key="id" :style="small">
			<video ref="id" :id="id" autoPlay playsInline :muted="muted" />
			<xIcon icon="_VideocamOffIcon" v-if="muted" :style="videoMuteIcon" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		componentName: "RtcCamera",
		props: ["id", "stream", "muted"],
		inject: ["inject_rtc"],
		components: {},
		mounted() {
			//获取到视频对象
			let video = this.$refs["id"];
			//指定视频的源为stream
			video.srcObject = this.stream;
			//当获取到MetaData数据后开始播放
			video.onloadedmetadata = e => {
				video.play();
			};
		},
		data() {
			return {};
		},
		computed: {
			small() {
				//本地小视频样式
				return {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					//绝对定位
					position: "absolute",
					//指定宽
					width: "192px",
					//指定高
					height: "108px",
					//底部
					bottom: "60px",
					//右侧
					right: "10px",
					//边框宽度
					borderWidth: "2px",
					//边框样式
					borderStyle: "solid",
					//边框颜色
					borderColor: "#ffffff",
					//溢出隐藏
					overflow: "hidden",
					//设置此属性可以使得视频在最上层
					zIndex: 99,
					//边框弧度
					borderRadius: "4px"
				};
			},
			videoMuteIcon() {
				//禁止视频图标样式
				return {
					position: "absolute",
					color: "#fff"
				};
			}
		},
		methods: {},
		watch: {}
	});
}
</script>
