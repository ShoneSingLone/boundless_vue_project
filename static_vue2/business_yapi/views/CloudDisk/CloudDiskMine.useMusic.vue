<script lang="ts">
export default async function () {
	const LOOP_TYPE_NAME_ARRAY = ["playOrder", "playRandom", "playLoop", "playSingleLoop"];

	return {
		useMusic() {
			let intervalTimer;
			const stateAudio = reactive({
				currentAudio: { name: "" },
				currentAudioImg: "",
				audioArray: [],
				loopType: 0,
				isPlaying: false, //是否播放中
				isPause: false, //是否暂停
				audio: new Audio(),
				currentTime: 0,
				ended: false, //是否播放结束
				duration: 0, //总播放时长,
				isMute: false, //是否静音
				volume: 100
			});

			const cptAudioIndex = computed(() =>
				_.findIndex(stateAudio.audioArray, { _id: stateAudio.currentAudio._id })
			);

			onBeforeMount(async () => {
				stateAudio.audioArray = (await _.$idb.get("audioArray")) || [];
			});

			onMounted(() => {
				navigator.mediaSession.setActionHandler("play", () => {
					togglePlayOrPause();
				});
				navigator.mediaSession.setActionHandler("pause", () => {
					togglePlayOrPause();
				});
				navigator.mediaSession.setActionHandler("previoustrack", () => {
					palyPrevSong();
				});
				navigator.mediaSession.setActionHandler("nexttrack", () => {
					playNextSong();
				});
			});

			watch(
				() => stateAudio.ended,
				ended => {
					if (!ended) return;
					handlePlayEnd();
				}
			);

			watch(
				() => stateAudio.currentAudio?.md5,
				_.debounce(async md5 => {
					try {
						const { artwork } = await _.$idb.get(md5);
						const { src } = _.first(artwork);
						stateAudio.currentAudioImg = src;
					} catch (error) {}
				}, 1000)
			);

			watch(
				() => stateAudio.currentAudio.name,
				name => {
					_.$setDocTitle(name || "");
				}
			);

			const cptIconPlayModel = computed(() => {
				return LOOP_TYPE_NAME_ARRAY[stateAudio.loopType];
			});

			function handlePlayEnd() {
				stopSong();

				if (cptAudioIndex.value > -1) {
					playMethods[cptIconPlayModel.value](cptAudioIndex.value);
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
				if (cptAudioIndex.value > -1) {
					if (cptAudioIndex.value === 0) {
						playAudio(stateAudio.audioArray[stateAudio.audioArray.length - 1]);
					} else {
						playAudio(stateAudio.audioArray[cptAudioIndex.value - 1]);
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
				if (!stateAudio.currentAudio.name) return;
				stateAudio.isPlaying = !stateAudio.isPlaying;
				if (stateAudio.isPlaying) {
					stateAudio.audio.play();
				} else {
					stateAudio.audio.pause();
				}
			}

			function playNextSong() {
				if (cptIconPlayModel.value === "playSingleLoop") {
					if (cptAudioIndex.value > -1) {
						playMethods.playLoop(cptAudioIndex.value);
					}
				} else {
					handlePlayEnd();
				}
			}

			function playMedia(record, { resource }) {
				resource = resource || [];
				if (record.type === "audio") {
					playAudio(record);

					stateAudio.audioArray = _.uniqBy(
						[...stateAudio.audioArray, ..._.filter(resource, i => i.type === "audio")],
						"_id"
					);
					_.$idb.set("audioArray", stateAudio.audioArray);
				}
				if (record.type === "video") {
					playVideo(record);
				}
			}

			async function playVideo(record) {
				const { path, _id } = record;
				let uri = encodeURIComponent(JSON.stringify(path));

				return _.$openModal({
					title: "video player",
					url: "@/views/explore/execTools/video/VideoPlayer.dialog.vue",
					uri,
					id: _id
				});
			}

			async function playAudio(record) {
				const { name, _id } = record;
				stateAudio.currentAudio = record;

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
				stateAudio.audio.src = Vue._common_utils.appendToken(
					`${window._URL_PREFIX_4_DEV || ""}/api/resource/audio?id=${_id}`
				);
				(async () => {
					navigator.mediaSession.metadata = new MediaMetadata({
						title: record.name,
						artist: "",
						album: "",
						artwork: []
					});

					try {
						let metaInfo = await _.$idb.get(record.md5);
						if (!metaInfo) {
							const {
								data: { title, artist, album, image }
							} = await _api.yapi.audioDetail({
								id: _id
							});
							/*
							artwork 是一个包含多个图片对象的数组。每个图片对象具有 src（图片的链接）、sizes（图片尺寸）和 type（图片类型）属性。通过设置这些图片信息，可以在支持的环境中（如某些浏览器）显示与媒体相关的图片，例如专辑封面等。
							*/
							metaInfo = {
								title,
								artist,
								album,
								artwork: [{ src: image || "", sizes: "", type: "" }]
							};
							await _.$idb.set(record.md5, metaInfo);
						}
						navigator.mediaSession.metadata = new MediaMetadata(metaInfo);
					} catch (error) {
						console.error(error);
					} finally {
					}
				})();
				await canPlay();
				stateAudio.audio.play();
				stateAudio.isPlaying = true;
				const audioVolume = stateAudio.volume / 100;
				stateAudio.audio.volume = audioVolume;
			}
			const playMethods = {
				playLoop(cptAudioIndex) {
					const next = cptAudioIndex + 1;
					if (next > stateAudio.audioArray.length - 1) {
						playAudio(stateAudio.audioArray[0]);
					} else {
						playAudio(stateAudio.audioArray[next]);
					}
				},
				playRandom(cptAudioIndex) {
					let next;
					/* 如果只有一首，循环一首 */
					if (stateAudio.audioArray.length === 1) {
						next = 0;
						playAudio(stateAudio.audioArray[0]);
						return;
					}
					const max = stateAudio.audioArray.length - 1;
					const min = 0;
					const getNext = () => Math.floor(Math.random() * (max - min + 1)) + min;
					next = getNext();
					while (next === cptAudioIndex) {
						next = getNext();
					}
					playAudio(stateAudio.audioArray[next]);
				},
				playOrder(cptAudioIndex) {
					const next = cptAudioIndex + 1;
					if (next > stateAudio.audioArray.length - 1) {
						stopSong();
					} else {
						playAudio(stateAudio.audioArray[next]);
					}
				},
				playSingleLoop(cptAudioIndex) {
					playAudio(stateAudio.audioArray[cptAudioIndex]);
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
		}
	};
}
</script>
