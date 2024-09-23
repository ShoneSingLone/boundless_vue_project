<style lang="less">
.CloudDiskMine {
	height: 1px;
}
</style>
<template>
	<div class="CloudDiskMine flex1 flex vertical">
		<div class="play-list flex1">
			<div>{{ cptPercent }}</div>
			<div>{{ _.$bytesToSize(cloudDiskSizeUsed) }}</div>
			<div>{{ _.$bytesToSize(cloudDiskSizeTotal) }}</div>
			<div class="flex flex1 vertical overflow-auto">
				<CloudDiskResourceAudioItem
					v-for="(item, index) in APP.stateAudio.audioArray"
					:key="index"
					:item="item"
					:checked="APP.selectedItems.includes(item._id)"
					@toggle="toggle(item)"
					@preview="preview(item)" />
			</div>
		</div>
		<div class="player-opr x-padding">
			<span>{{ APP.stateAudio.currentAudio.name }}</span>
			<MusicPlayerAudio />
			<div class="flex middle">
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
