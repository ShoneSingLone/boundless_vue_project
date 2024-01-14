<template>
	<div class="bottom-wrapper" :class="{ 'hide-play': !showPlay }">
		<div class="bottom-playing-wrapper" @click.stop.prevent="onPlayingCardClick" v-if="showPlay">
			<div class="bottom-playing-left">
				<div class="icon-play-wrapper" @click.stop.prevent="togglePlay">
					<span class="icon-play_go" v-if="!isPlaying"></span>
					<span class="icon-play_pause" v-else></span>
				</div>
			</div>
			<div class="bottom-playing-right">
				<div class="bottom-playing-chapter-text">
					<span class="chapter-label">{{ chapter ? chapter.label : "" }}</span>
					<span class="bottom-playing-page-text" v-if="currentSectionIndex && currentSectionTotal">( {{ currentSectionIndex }} / {{ currentSectionTotal }} )</span>
				</div>
				<div class="bottom-playing-page-text">
					{{ playInfo ? playInfo.currentMinute : "00" }}:{{ playInfo ? playInfo.currentSecond : "00" }} / {{ playInfo ? playInfo.totalMinute : "00" }}:{{
						playInfo ? playInfo.totalSecond : "00"
					}}
				</div>
			</div>
		</div>
		<div class="bottom-btn-wrapper">
			<span class="bottom-btn-text">{{ $t("detail.addOrRemoveShelf") }}</span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: {
			chapter: Object,
			currentSectionIndex: Number,
			currentSectionTotal: Number,
			showPlay: Boolean,
			isPlaying: Boolean,
			playInfo: Object
		},
		methods: {
			togglePlay() {
				this.$parent.togglePlay();
			},
			onPlayingCardClick() {
				this.$emit("onPlayingCardClick");
			}
		}
	};
}
</script>
