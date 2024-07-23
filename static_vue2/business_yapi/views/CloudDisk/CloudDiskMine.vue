<style lang="less">
.CloudDiskMine {
	height: 1px;
	.audio-title {
		text-wrap: nowrap;
	}
	.player-playlist {
		background-color: white;
	}

	.player-opr {
		position: relative;
		background-image: var(--opr-background-image);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		backdrop-filter: blur(20px);
		// backdrop-filter: brightness(60%);
		// backdrop-filter: contrast(40%);
		// backdrop-filter: drop-shadow(4px 4px 10px blue);
		// backdrop-filter: grayscale(30%);
		// backdrop-filter: hue-rotate(120deg);
		// backdrop-filter: invert(70%);
		// backdrop-filter: opacity(20%);
		// backdrop-filter: sepia(90%);
		// backdrop-filter: saturate(80%);

		> .player-ctrl {
			position: relative;
			z-index: 1;
		}

		.player-opr_background {
			display: block;
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 0;
			border-bottom: 1rem solid var(--border-color);
			height: var(--header-height);
			padding: 0 12rem 0 24rem;
			top: 0;
			background-color: rgba(255, 255, 255, 0.664);
			backdrop-filter: blur(6px);
		}
	}
}
</style>
<template>
	<div class="CloudDiskMine flex1 flex vertical" :style="cptStylePlayerOpr">
		<div class="player-playlist flex flex1 vertical overflow-auto">
			<CloudDiskResourceAudioItem
				v-for="(item, index) in APP.stateAudio.audioArray"
				:key="index"
				:item="item"
				:checked="APP.selectedItems.includes(item._id)"
				@toggle="toggle(item)"
				@preview="preview(item)" />
		</div>
		<div class="player-opr x-padding">
			<div class="player-opr_background" />
			<div class="overflow-auto width100 player-ctrl">
				<span class="flex middle audio-title"> {{ APP.stateAudio.currentAudio.name }}</span>
			</div>
			<MusicPlayerAudio class="player-ctrl" />
			<div class="flex middle player-ctrl">
				<MusicPlayerVolume class="flex1" />
				<MusicPlayerModel />
				<xGap l="4" />
				<MusicPlayerOpration />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			CloudDiskResourceAudioItem: () =>
				_.$importVue("@/views/CloudDisk/CloudDiskResourceAudioItem.vue"),
			MusicPlayerModel: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerModel.vue"),
			MusicPlayerVolume: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerVolume.vue"),
			MusicPlayerAudio: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerAudio.vue"),
			MusicPlayerOpration: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerOpration.vue")
		},
		provide() {
			return { inject_explore: this.APP };
		},
		data() {
			return {
				activeName: "second"
			};
		},
		computed: {
			cptStylePlayerOpr() {
				if (!this.APP.stateAudio.currentAudioImg) {
					return {};
				}
				return {
					"--opr-background-image": `url(${this.APP.stateAudio.currentAudioImg})`
				};
			},
			cloudDiskSizeUsed() {
				return this.APP.user.cloudDiskSizeUsed || 0;
			},
			cloudDiskSizeTotal() {
				return this.APP.user.cloudDiskSizeTotal || 0;
			},
			cptPercent() {
				if (!this.cloudDiskSizeTotal) {
					return 0;
				}
				return Number(this.cloudDiskSizeUsed / this.cloudDiskSizeTotal).toFixed(2);
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	});
}
</script>
