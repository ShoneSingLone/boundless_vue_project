<style lang="less"></style>
<template>
	<div class="flex middle center">
		<xBtn :configs="btnPre" />
		<xGap l="4" />
		<xBtn :configs="btnStop" />
		<xGap l="4" />
		<xBtn :configs="playOrPause" />
		<xGap l="4" />
		<xBtn :configs="btnNext" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_explore"],
		computed: {
			stateAudio() {
				return this.inject_explore.stateAudio;
			},
			methodsMusicPlayer() {
				return this.inject_explore.methodsMusicPlayer;
			},
			btnPre() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_prevsong"
						}),
					onClick: this.methodsMusicPlayer.palyPrevSong
				};
			},
			btnStop() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_stopsong"
						}),
					onClick: this.methodsMusicPlayer.stopSong
				};
			},
			btnNext() {
				return {
					label: () =>
						h("xIcon", {
							icon: "_nextsong"
						}),
					onClick: this.methodsMusicPlayer.playNextSong
				};
			},
			playOrPause() {
				const vm = this;
				return {
					label: () =>
						vm.stateAudio.isPlaying
							? h("xIcon", { icon: "_pausesong" })
							: h("xIcon", { icon: "_playsong" }),
					onClick() {
						vm.methodsMusicPlayer.togglePlayOrPause();
					}
				};
			}
		}
	});
}
</script>
