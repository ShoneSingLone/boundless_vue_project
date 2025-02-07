<style lang="less">
#ViewExplore {
	background-color: var(--el-color-white);
	* {
		// outline: 1px solid yellowgreen;
	}
}
</style>
<template>
	<div class="height100 flex vertical" id="ViewExplore">
		<div class="x-padding">
			<xBreadcrumb separator="/">
				<xBreadcrumbItem class="pointer" @click="back(-1)"> root </xBreadcrumbItem>
				<xBreadcrumbItem
					class="pointer"
					v-for="(item, index) in pathStack"
					:key="index"
					@click="back(index)"
					preset="blue">
					{{ item }}
				</xBreadcrumbItem>
			</xBreadcrumb>
		</div>
		<div class="x-padding">
			<xInput v-model.lazy="searchKey" placeholder="搜索" clearable />
		</div>
		<div class="flex1 overflow-auto el-card">
			<div v-for="(item, index) in cptResource" :key="index" class="mt pl pr">
				<xBtn
					v-if="isShow(item)"
					@click="playMedia(item)"
					:preset="item.name === stateAudio.songId ? 'blue' : ''"
					class="width100"
					>{{ item.name }}-{{ item.type }}</xBtn
				>
				<xBtn v-else @click="getResource(item)" preset="text">
					<div class="flex">
						<xGap l /><span> {{ item.name }}</span>
					</div>
				</xBtn>
			</div>
		</div>
		<div class="player-opr x-padding">
			<span>{{ stateAudio.songId }}</span>
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
	const LOOP_TYPE_NAME_ARRAY = ["playOrder", "playRandom", "playLoop", "playSingleLoop"];
	return defineComponent({
		components: {
			MusicPlayerModel: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerModel.vue"),
			MusicPlayerVolume: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerVolume.vue"),
			MusicPlayerAudio: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerAudio.vue"),
			MusicPlayerOpration: () =>
				_.$importVue("@/views/explore/execTools/music/MusicPlayerOpration.vue")
		},
		setup() {
			const vm = this;
			let intervalTimer;
			const stateAudio = reactive({
				loopType: 0,
				songId: "",
				isPlaying: false, //是否播放中
				isPause: false, //是否暂停
				audio: new Audio(),
				currentTime: 0,
				ended: false, //是否播放结束
				duration: 0, //总播放时长,
				isMute: false, //是否静音
				volume: (() => {
					const volume = _.$lStorage["PLAYER-VOLUME"];
					if (volume) {
						return Number(volume) * 100;
					} else {
						return 100;
					}
				})()
			});

			watch(
				() => stateAudio.ended,
				ended => {
					if (!ended) return;
					handlePlayEnd();
				}
			);

			const cptIconPlayModel = computed(() => {
				return LOOP_TYPE_NAME_ARRAY[stateAudio.loopType];
			});

			function handlePlayEnd() {
				stopSong();
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateAudio.songId
				});

				if (currentSongIndex > -1) {
					playMethods[cptIconPlayModel.value](currentSongIndex);
				}
			}

			function setCurrentTime(val) {
				try {
					stateAudio.audio.currentTime = val;
				} catch (error) {
					console.error(error);
				} finally {
				}
			}
			function intervalCurrentTime() {
				stateAudio.currentTime = parseInt(stateAudio.audio.currentTime.toString());
				stateAudio.duration = parseInt(stateAudio.audio.duration.toString());
				stateAudio.ended = stateAudio.audio.ended;
			}

			function palyPrevSong() {
				const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
					name: stateAudio.songId
				});
				if (currentSongIndex > -1) {
					if (currentSongIndex === 0) {
						playAudio(vm.cptResourceOnlyAudio[vm.cptResourceOnlyAudio.length - 1]);
					} else {
						playAudio(vm.cptResourceOnlyAudio[currentSongIndex - 1]);
					}
				}
			}
			function stopSong() {
				stateAudio.isPlaying = false;
				stateAudio.audio.pause();
				stateAudio.audio.currentTime = 0;
				stateAudio.currentTime = 0;
			}
			function togglePlayOrPause() {
				if (!stateAudio.songId) return;
				stateAudio.isPlaying = !stateAudio.isPlaying;
				if (stateAudio.isPlaying) {
					stateAudio.audio.play();
				} else {
					stateAudio.audio.pause();
				}
			}

			function playNextSong() {
				if (cptIconPlayModel.value === "playSingleLoop") {
					const currentSongIndex = _.findIndex(vm.cptResourceOnlyAudio, {
						name: stateAudio.songId
					});
					if (currentSongIndex > -1) {
						playMethods.playLoop(currentSongIndex);
					}
				} else {
					handlePlayEnd();
				}
			}

			function playMedia(record) {
				if (record.type === "audio") {
					playAudio(record);
				}
				if (record.type === "video") {
					playVideo(record);
				}
			}

			async function playVideo(record) {
				const { path, name } = record;
				let uri = encodeURIComponent(JSON.stringify(path));

				return _.$openModal({
					title: "video player",
					url: "@/views/explore/execTools/video/VideoPlayer.dialog.vue",
					uri,
					item: record
				});
			}

			async function playAudio(record) {
				const { path, name } = record;
				stopSong();
				function canPlay() {
					return new Promise(resolve => {
						stateAudio.audio.onloadedmetadata = async event => {};
						stateAudio.audio.oncanplaythrough = async event => {
							console.log("I think I can play through the entire ", event);
						};
						stateAudio.audio.oncanplay = function (event) {
							if (intervalTimer) {
								clearInterval(intervalTimer);
							}
							intervalTimer = setInterval(intervalCurrentTime, 1000);
							resolve(stateAudio.duration);
						};
					});
				}
				let uri = encodeURIComponent(JSON.stringify(path));
				stateAudio.songId = name;
				stateAudio.audio.src = Vue._common_utils.appendToken(
					`${window._AJAX_URL_PREFIX || ""}/api/resource/audio?uri=${uri}`
				);
				await canPlay();
				stateAudio.audio.play();
				stateAudio.isPlaying = true;
				const audioVolume = stateAudio.volume / 100;
				stateAudio.audio.volume = audioVolume;
			}
			const playMethods = {
				playLoop(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > vm.cptResourceOnlyAudio.length - 1) {
						playAudio(vm.cptResourceOnlyAudio[0]);
					} else {
						playAudio(vm.cptResourceOnlyAudio[next]);
					}
				},
				playRandom(currentSongIndex) {
					let next;
					/* 如果只有一首，循环一首 */
					if (vm.cptResourceOnlyAudio.length === 1) {
						next = 0;
						playAudio(vm.cptResourceOnlyAudio[0]);
						return;
					}
					const max = vm.cptResourceOnlyAudio.length - 1;
					const min = 0;
					const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
					next = getNext();
					while (next === currentSongIndex) {
						next = getNext();
					}
					playAudio(vm.cptResourceOnlyAudio[next]);
				},
				playOrder(currentSongIndex) {
					const next = currentSongIndex + 1;
					if (next > vm.cptResourceOnlyAudio.length - 1) {
						stopSong();
					} else {
						playAudio(vm.cptResourceOnlyAudio[next]);
					}
				},
				playSingleLoop(currentSongIndex) {
					playAudio(vm.cptResourceOnlyAudio[currentSongIndex]);
				}
			};

			function toggleVolumeMute() {
				stateAudio.isMute = !stateAudio.isMute;
				stateAudio.audio.muted = stateAudio.isMute;
			}

			const cacheAudioVolume = _.debounce(function (audiovolume) {
				_.$lStorage["PLAYER-VOLUME"] = audiovolume;
			}, 1000);

			return {
				LOOP_TYPE_NAME_ARRAY,
				playAudio,
				playMedia,
				/*  */
				stateAudio,
				methodsMusicPlayer: {
					setCurrentTime,
					palyPrevSong,
					stopSong,
					togglePlayOrPause,
					playNextSong,
					toggleVolumeMute,
					setVolume(n) {
						n = n > 100 ? 100 : n;
						n = n < 0 ? 0 : n;
						stateAudio.volume = n;
						const audioVolume = n / 100;
						stateAudio.audio.volume = audioVolume;
						cacheAudioVolume(audioVolume);
					},
					async togglePlayModel() {
						stateAudio.loopType =
							(stateAudio.loopType + 1) % LOOP_TYPE_NAME_ARRAY.length;
					}
				}
			};
		},
		provide() {
			return {
				inject_explore: this
			};
		},
		data() {
			return {
				resource: _.$lStorage["VIEW_EXPLORE_PATH_STACK"] || [],
				pathStack: _.$lStorage["VIEW_EXPLORE_RESOURCE"] || [],
				searchKey: ""
			};
		},
		computed: {
			cptResource() {
				if (this.searchKey) {
					return _.filter(this.resource, item =>
						_.lowerCase(item.name).includes(this.searchKey)
					);
				}
				return this.resource;
			},
			cptResourceOnlyAudio() {
				return _.filter(this.cptResource, { type: "audio" });
			}
		},
		mounted() {
			this.getResource();
		},
		methods: {
			isShow(item) {
				console.log("🚀 ~ isShow ~ item.type:", item.type);
				return ["audio", "video"].includes(item.type);
			},
			back(index) {
				if (index === -1) {
					this.getResource({ path: [] });
				} else {
					this.getResource({ path: this.pathStack.slice(0, index + 1) });
				}
			},
			async getResource(item = {}) {
				this.pathStack = _.isArray(item?.path) ? item.path : [];
				_.$loading(true);
				try {
					const res = await _api.yapi.resourceLs({ path: this.pathStack });
					if (!res.errcode) {
						this.resource = _.orderBy(res.data, ["type"]);
					}
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		},
		watch: {
			pathStack(val) {
				_.$lStorage["VIEW_EXPLORE_PATH_STACK"] = val;
			},
			resource(val) {
				_.$lStorage["VIEW_EXPLORE_RESOURCE"] = val;
			}
		}
	});
}
</script>
