<style lang="less"></style>
<template>
	<div class="flex middle x-padding">
		<xBtn class="volume flex horizon" @click="methodsMusicPlayer.toggleVolumeMute">
			<xIcon :icon="cptIconSound" />
		</xBtn>
		<!-- <xGap l />
		<div class="flex1">
			<xSlider id="test" v-model="stateAudio.volume" :tooltip-visible="isTooltipVisible" @change="changeVolume" />
		</div> -->
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_explore"],
		data() {
			return {
				isTooltipVisible: false
			};
		},
		computed: {
			cptIconSound() {
				return this.stateAudio.isMute ? "_soundMute" : "_sound";
			},
			stateAudio() {
				return this.inject_explore.stateAudio;
			},
			methodsMusicPlayer() {
				return this.inject_explore.methodsMusicPlayer;
			}
		},
		methods: {
			changeVolume(val) {
				if (!this.isTooltipVisible) {
					this.isTooltipVisible = true;
				}
				this.delayHideIsTooltipVisible();
				this.methodsMusicPlayer.setVolume(val);
			},
			delayHideIsTooltipVisible: _.debounce(function () {
				this.isTooltipVisible = false;
			}, 1000 * 3)
		}
	});
}
</script>
